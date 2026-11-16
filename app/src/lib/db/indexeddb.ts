import { DEFAULT_SETTINGS, EMPTY_PROGRESS, EMPTY_STREAK, type LocalDatabase, type Progress, type ReviewEntry, type Settings, type Snapshot, type StoredCard, type StreakData } from "./types";

const DB_NAME = "nihongo";
const VERSION = 1;

/** Transforme une requête IndexedDB en promesse. */
function done<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function finished(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
      if (!db.objectStoreNames.contains("cards")) db.createObjectStore("cards", { keyPath: "id" });
      if (!db.objectStoreNames.contains("reviews")) db.createObjectStore("reviews", { autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("Base bloquée par un autre onglet."));
  });
}

/** Stockage dans IndexedDB, la base intégrée au navigateur. */
export class IndexedDbDatabase implements LocalDatabase {
  readonly kind = "IndexedDB";
  private db: Promise<IDBDatabase>;

  constructor() {
    this.db = open();
  }

  static available() {
    return typeof indexedDB !== "undefined";
  }

  /** Vérifie que la base s'ouvre vraiment (elle peut être bloquée en navigation privée). */
  async ready() {
    await this.db;
  }

  async loadAll(): Promise<Snapshot> {
    const db = await this.db;
    const tx = db.transaction(["kv", "cards", "reviews"], "readonly");
    const [progress, settings, cards, reviews, streak] = await Promise.all([
      done(tx.objectStore("kv").get("progress")) as Promise<Progress | undefined>,
      done(tx.objectStore("kv").get("settings")) as Promise<Partial<Settings> | undefined>,
      done(tx.objectStore("cards").getAll()) as Promise<StoredCard[]>,
      done(tx.objectStore("reviews").getAll()) as Promise<ReviewEntry[]>,
      done(tx.objectStore("kv").get("streak")) as Promise<StreakData | undefined>,
    ]);
    return {
      progress: { ...EMPTY_PROGRESS, ...progress },
      settings: { ...DEFAULT_SETTINGS, ...settings, reminder: { ...DEFAULT_SETTINGS.reminder, ...settings?.reminder }, cloudBackup: { ...DEFAULT_SETTINGS.cloudBackup, ...settings?.cloudBackup } },
      streak: { ...EMPTY_STREAK, ...streak },
      cards,
      reviews,
    };
  }

  private async write(stores: string[], fn: (tx: IDBTransaction) => void) {
    const db = await this.db;
    const tx = db.transaction(stores, "readwrite");
    fn(tx);
    await finished(tx);
  }

  saveProgress(progress: Progress) {
    return this.write(["kv"], (tx) => tx.objectStore("kv").put(progress, "progress"));
  }

  saveSettings(settings: Settings) {
    return this.write(["kv"], (tx) => tx.objectStore("kv").put(settings, "settings"));
  }

  saveStreak(streak: StreakData) {
    return this.write(["kv"], (tx) => tx.objectStore("kv").put(streak, "streak"));
  }

  putCards(cards: StoredCard[]) {
    return this.write(["cards"], (tx) => cards.forEach((c) => tx.objectStore("cards").put(c)));
  }

  deleteCards(ids: string[]) {
    return this.write(["cards"], (tx) => ids.forEach((id) => tx.objectStore("cards").delete(id)));
  }

  addReview(entry: ReviewEntry) {
    return this.write(["reviews"], (tx) => tx.objectStore("reviews").add(entry));
  }

  replaceAll(snapshot: Snapshot) {
    return this.write(["kv", "cards", "reviews"], (tx) => {
      const kv = tx.objectStore("kv");
      const cards = tx.objectStore("cards");
      const reviews = tx.objectStore("reviews");
      kv.clear();
      cards.clear();
      reviews.clear();
      kv.put(snapshot.progress, "progress");
      kv.put(snapshot.settings, "settings");
      kv.put(snapshot.streak, "streak");
      snapshot.cards.forEach((c) => cards.put(c));
      snapshot.reviews.forEach((r) => reviews.add(r));
    });
  }
}

import { DEFAULT_SETTINGS, EMPTY_PROGRESS, EMPTY_STREAK, type LocalDatabase, type Snapshot } from "./types";

/** Repli quand aucun stockage n'est disponible (navigation privée stricte) : rien n'est gardé après la visite. */
export class MemoryDatabase implements LocalDatabase {
  readonly kind = "mémoire (non conservé)";
  private data: Snapshot = { progress: EMPTY_PROGRESS, cards: [], reviews: [], settings: DEFAULT_SETTINGS, streak: EMPTY_STREAK };

  async loadAll() {
    return structuredClone(this.data);
  }
  async saveProgress(progress: Snapshot["progress"]) {
    this.data.progress = progress;
  }
  async saveSettings(settings: Snapshot["settings"]) {
    this.data.settings = settings;
  }
  async saveStreak(streak: Snapshot["streak"]) {
    this.data.streak = streak;
  }
  async putCards(cards: Snapshot["cards"]) {
    const byId = new Map(this.data.cards.map((c) => [c.id, c]));
    cards.forEach((c) => byId.set(c.id, c));
    this.data.cards = [...byId.values()];
  }
  async deleteCards(ids: string[]) {
    this.data.cards = this.data.cards.filter((c) => !ids.includes(c.id));
  }
  async addReview(entry: Snapshot["reviews"][number]) {
    this.data.reviews.push(entry);
  }
  async replaceAll(snapshot: Snapshot) {
    this.data = structuredClone(snapshot);
  }
}

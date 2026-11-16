import { IndexedDbDatabase } from "./indexeddb";
import { MemoryDatabase } from "./memory";
import type { LocalDatabase } from "./types";

export * from "./types";

let instance: Promise<LocalDatabase> | null = null;

/**
 * Le stockage local de l'appareil. C'est le seul endroit à changer pour passer à SQLite
 * dans l'appli native (Capacitor) : il suffira de renvoyer une autre réalisation de `LocalDatabase`.
 */
export function getDatabase(): Promise<LocalDatabase> {
  instance ??= (async () => {
    if (IndexedDbDatabase.available()) {
      try {
        const db = new IndexedDbDatabase();
        await db.ready();
        return db;
      } catch {
        /* IndexedDB refusé : repli en mémoire */
      }
    }
    return new MemoryDatabase();
  })();
  return instance;
}

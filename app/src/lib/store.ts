"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_SETTINGS, EMPTY_PROGRESS, EMPTY_STREAK, getDatabase,
  type Backup, type Progress, type ReviewEntry, type Settings, type Snapshot, type StoredCard, type StreakData,
} from "./db";

/**
 * État de l'utilisateur en mémoire, chargé une fois depuis le stockage local puis gardé à jour.
 * Chaque modification met à jour la mémoire tout de suite (l'écran réagit) et l'écrit sur l'appareil.
 */

export type AppState = Snapshot & {
  /** Faux tant que les données ne sont pas lues (premier affichage). */
  ready: boolean;
  cardsById: Record<string, StoredCard>;
  storage: string;
};

const INITIAL: AppState = {
  ready: false, progress: EMPTY_PROGRESS, cards: [], reviews: [], settings: DEFAULT_SETTINGS, streak: EMPTY_STREAK, cardsById: {}, storage: "",
};

let state: AppState = INITIAL;
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();

const LEGACY_KEY = "nihongo-progress-v1";

function emit(next: Partial<AppState>) {
  const merged = { ...state, ...next };
  if (next.cards) merged.cardsById = Object.fromEntries(next.cards.map((c) => [c.id, c]));
  state = merged;
  listeners.forEach((l) => l());
}

/** Lit l'ancienne progression (localStorage) une seule fois et la reprend dans la base. */
function readLegacy(): Progress | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    return raw ? { ...EMPTY_PROGRESS, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

/** Les écritures partent dans l'ordre, l'une après l'autre. */
let queue: Promise<unknown> = Promise.resolve();
function persist(task: (db: Awaited<ReturnType<typeof getDatabase>>) => Promise<void>) {
  queue = queue.then(async () => {
    try {
      await task(await getDatabase());
    } catch (error) {
      console.error("[nihongo] écriture impossible", error);
    }
  });
  return queue;
}

export function load(): Promise<void> {
  loading ??= (async () => {
    const db = await getDatabase();
    let snapshot: Snapshot;
    try {
      snapshot = await db.loadAll();
    } catch {
      snapshot = { progress: EMPTY_PROGRESS, cards: [], reviews: [], settings: DEFAULT_SETTINGS, streak: EMPTY_STREAK };
    }
    const legacy = readLegacy();
    if (legacy && Object.keys(snapshot.progress.seen).length === 0 && Object.keys(snapshot.progress.items).length === 0) {
      snapshot.progress = legacy;
      await db.saveProgress(legacy).catch(() => {});
    }
    if (legacy) {
      try {
        localStorage.removeItem(LEGACY_KEY);
      } catch {
        /* rien */
      }
    }
    emit({ ...snapshot, ready: true, storage: db.kind });
    onLoaded.forEach((fn) => fn());
  })();
  return loading;
}

/** Actions à lancer une fois les données chargées (ex. créer les cartes des leçons déjà vues). */
const onLoaded: (() => void)[] = [];
export function whenLoaded(fn: () => void) {
  if (state.ready) fn();
  else {
    onLoaded.push(fn);
    void load();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  void load();
  return () => listeners.delete(listener);
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, () => state, () => INITIAL);
}

export function getState() {
  return state;
}

export function setProgress(progress: Progress) {
  emit({ progress });
  void persist((db) => db.saveProgress(progress));
}

export function setSettings(settings: Settings) {
  emit({ settings });
  void persist((db) => db.saveSettings(settings));
}

export function setStreak(streak: StreakData) {
  emit({ streak });
  void persist((db) => db.saveStreak(streak));
}

export function putCards(cards: StoredCard[]) {
  if (cards.length === 0) return;
  const byId = { ...state.cardsById };
  cards.forEach((c) => (byId[c.id] = c));
  emit({ cards: Object.values(byId) });
  void persist((db) => db.putCards(cards));
}

export function deleteCards(ids: string[]) {
  if (ids.length === 0) return;
  const remove = new Set(ids);
  emit({ cards: state.cards.filter((c) => !remove.has(c.id)) });
  void persist((db) => db.deleteCards(ids));
}

export function addReview(entry: ReviewEntry) {
  emit({ reviews: [...state.reviews, entry] });
  void persist((db) => db.addReview(entry));
}

export function exportBackup(): Backup {
  const { progress, cards, reviews, settings, streak } = state;
  return { app: "nihongo", version: 1, exportedAt: new Date().toISOString(), progress, cards, reviews, settings, streak };
}

/** Vérifie un fichier de sauvegarde avant de remplacer les données. */
export function parseBackup(text: string): Backup {
  const data = JSON.parse(text);
  if (data?.app !== "nihongo" || data?.version !== 1 || !Array.isArray(data.cards) || !Array.isArray(data.reviews) || typeof data.progress !== "object") {
    throw new Error("Ce fichier n'est pas une sauvegarde Nihongo.");
  }
  return data as Backup;
}

export async function replaceAll(snapshot: Snapshot) {
  const clean: Snapshot = {
    progress: { ...EMPTY_PROGRESS, ...snapshot.progress },
    settings: { ...DEFAULT_SETTINGS, ...snapshot.settings, reminder: { ...DEFAULT_SETTINGS.reminder, ...snapshot.settings?.reminder }, cloudBackup: { ...DEFAULT_SETTINGS.cloudBackup, ...snapshot.settings?.cloudBackup } },
    streak: { ...EMPTY_STREAK, ...snapshot.streak },
    cards: snapshot.cards,
    reviews: snapshot.reviews,
  };
  emit(clean);
  await persist((db) => db.replaceAll(clean));
}

export function resetAll() {
  return replaceAll({ progress: EMPTY_PROGRESS, cards: [], reviews: [], settings: state.settings, streak: EMPTY_STREAK });
}

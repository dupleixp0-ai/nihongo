import { EMPTY_STREAK, type StreakData, type StreakNotice } from "./db/types";

/**
 * Règles de la flamme d'apprentissage (fonctions pures, testées par scripts/check-streak.ts).
 *
 * - Un jour compte quand l'objectif du jour est atteint (ou quand il a été rattrapé).
 * - La flamme compte les jours d'affilée.
 * - De 1 à 3 jours manqués : la flamme vacille. Un exercice de rattrapage par jour manqué la sauve,
 *   à faire le jour du retour.
 * - Plus de 3 jours manqués : la flamme s'éteint, on repart de zéro (le record est gardé).
 * - Un omamori (amulette, gagnée en atteignant un but de série) couvre un jour manqué, tout seul,
 *   le jour du retour. Le jour couvert garde la flamme mais n'ajoute pas de jour à la série.
 * - But de série : tenir 7, 14, 25 ou 50 jours d'affilée à partir du jour du choix.
 */

export const MAX_REPAIRABLE = 3;

/** « 2026-11-15 » pour une date, en heure locale. */
export function dayKey(time: number | Date) {
  const d = new Date(time);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Ajoute des jours à une clé (calcul à midi : pas d'effet des changements d'heure). */
export function shiftDay(key: string, delta: number) {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d + delta, 12));
}

export function daysBetween(from: string, to: string) {
  const [a, b] = [from, to].map((k) => {
    const [y, m, d] = k.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  });
  return Math.round((b - a) / 86_400_000);
}

export type FlameStatus =
  /** Jamais encore allumée. */
  | "nouvelle"
  /** Objectif du jour atteint. */
  | "allumee"
  /** Allumée jusqu'à hier : il faut étudier aujourd'hui. */
  | "en-attente"
  /** 1 à 3 jours manqués : rattrapage possible aujourd'hui. */
  | "vacille"
  /** Plus de 3 jours manqués. */
  | "eteinte";

export type Flame = {
  status: FlameStatus;
  /** Jours d'affilée qui comptent aujourd'hui. */
  count: number;
  /** Jours manqués à rattraper (statut « vacille »), du plus ancien au plus récent. */
  missed: string[];
  /** Série en jeu : sauvée par le rattrapage, perdue sinon. */
  atStake: number;
  /** Série perdue (statut « eteinte »). */
  lost: number;
  best: number;
};

/** Données d'une ancienne version : on complète les champs ajoutés depuis. */
export const normalize = (data: Partial<StreakData>): StreakData => ({ ...EMPTY_STREAK, ...data });

const isProtected = (data: StreakData, key: string) => data.protected.includes(key);
/** Le jour garde la flamme : objectif atteint, rattrapé ou couvert par un omamori. */
const worked = (data: StreakData, key: string) => Boolean(data.days[key]?.met) || data.repaired.includes(key) || isProtected(data, key);

/** Jours de la série qui se terminent le jour `key` (les jours d'omamori font le lien sans compter). */
function runEndingAt(data: StreakData, key: string) {
  let n = 0;
  for (let k = key; worked(data, k); k = shiftDay(k, -1)) if (!isProtected(data, k)) n++;
  return n;
}

/** Dernier jour qui garde la flamme, strictement avant `today`. */
function lastWorkedBefore(data: StreakData, today: string) {
  const keys = [...Object.keys(data.days).filter((k) => data.days[k].met), ...data.repaired, ...data.protected].filter((k) => k < today).sort();
  return keys.at(-1) ?? null;
}

/** Plus longue série de l'historique. */
function longestRun(data: StreakData) {
  const keys = [...new Set([...Object.keys(data.days).filter((k) => data.days[k].met), ...data.repaired, ...data.protected])].sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const k of keys) {
    const step = isProtected(data, k) ? 0 : 1;
    run = prev && daysBetween(prev, k) === 1 ? run + step : step;
    best = Math.max(best, run);
    prev = k;
  }
  return best;
}

export function computeFlame(data: StreakData, today: string): Flame {
  const doneToday = worked(data, today);
  const last = lastWorkedBefore(data, today);
  const base = { missed: [] as string[], atStake: 0, lost: 0 };
  const withBest = (f: Omit<Flame, "best">): Flame => ({ ...f, best: Math.max(data.best, f.count, longestRun(data)) });

  if (!last) return withBest({ ...base, status: doneToday ? "allumee" : "nouvelle", count: doneToday ? 1 : 0 });

  const gap = daysBetween(last, today) - 1;
  const run = runEndingAt(data, last);

  if (gap === 0) return withBest({ ...base, status: doneToday ? "allumee" : "en-attente", count: run + (doneToday ? 1 : 0) });

  if (gap <= MAX_REPAIRABLE) {
    const missed = Array.from({ length: gap }, (_, i) => shiftDay(last, i + 1));
    return withBest({ ...base, status: "vacille", count: doneToday ? 1 : 0, missed, atStake: run + gap + (doneToday ? 1 : 0) });
  }

  return withBest({ ...base, status: doneToday ? "allumee" : "eteinte", count: doneToday ? 1 : 0, lost: doneToday ? 0 : run });
}

/** Ajoute des points à la journée et note si l'objectif est atteint. */
export function addPoints(data: StreakData, today: string, points: number, goal: number): StreakData {
  const prev = data.days[today] ?? { points: 0, met: false };
  const next = { points: prev.points + points, met: prev.met || prev.points + points >= goal };
  const updated = { ...data, days: { ...data.days, [today]: next } };
  return settle({ ...updated, best: Math.max(updated.best, computeFlame(updated, today).count) }, today);
}

/** Rattrape le plus ancien jour manqué (après un exercice réussi). */
export function repairOne(data: StreakData, today: string): StreakData {
  const flame = computeFlame(data, today);
  if (flame.status !== "vacille" || flame.missed.length === 0) return data;
  const updated = { ...data, repaired: [...data.repaired, flame.missed[0]] };
  return settle({ ...updated, best: Math.max(updated.best, computeFlame(updated, today).count) }, today);
}

/* ———————————————— Buts de série et omamori ———————————————— */

export const GOAL_TIERS = [
  { days: 7, label: "Facile", reward: 1 },
  { days: 14, label: "Moyen", reward: 1 },
  { days: 25, label: "Difficile", reward: 2 },
  { days: 50, label: "Très difficile", reward: 3 },
] as const;

/** Réserve maximale d'omamori. */
export const OMAMORI_MAX = 5;

/** Jours comptés pour le but : jours de la série en cours, à partir du jour du choix. */
export function goalProgress(data: StreakData, today: string) {
  if (!data.goal) return 0;
  const flame = computeFlame(data, today);
  const end = worked(data, today) ? today : lastWorkedBefore(data, today);
  if (!end || flame.status === "eteinte" || (flame.status === "nouvelle" && !worked(data, today))) return 0;
  let n = 0;
  for (let k = end; worked(data, k) && k >= data.goal.chosenAt; k = shiftDay(k, -1)) if (!isProtected(data, k)) n++;
  return n;
}

export function chooseGoal(data: StreakData, today: string, days: number): StreakData {
  return { ...data, goal: { days, chosenAt: today } };
}

/** Le palier conseillé : un cran au-dessus du dernier but atteint. */
export function suggestedTier(data: StreakData) {
  const last = data.goalsDone.at(-1)?.days ?? 0;
  return GOAL_TIERS.find((t) => t.days > last)?.days ?? GOAL_TIERS.at(-1)!.days;
}

/**
 * À lancer à chaque ouverture et après chaque activité :
 * 1. un omamori couvre les jours manqués (s'il sauve vraiment la flamme) ;
 * 2. un but atteint donne sa récompense.
 */
export function settle(data: StreakData, today: string): StreakData {
  let next = data;
  const notices: StreakNotice[] = [];

  // 1. Omamori
  const last = lastWorkedBefore(next, today);
  if (last && next.omamori > 0) {
    const gap = daysBetween(last, today) - 1;
    const used = Math.min(gap, next.omamori);
    // Inutile de le dépenser si la flamme s'éteint quand même.
    if (gap > 0 && gap - used <= MAX_REPAIRABLE) {
      const days = Array.from({ length: used }, (_, i) => shiftDay(last, i + 1));
      next = { ...next, protected: [...next.protected, ...days], omamori: next.omamori - used };
      notices.push({ kind: "protected", days, at: today });
    }
  }

  // 2. But atteint
  if (next.goal && goalProgress(next, today) >= next.goal.days) {
    const tier = GOAL_TIERS.find((t) => t.days === next.goal!.days);
    const reward = tier?.reward ?? 1;
    next = {
      ...next,
      omamori: Math.min(OMAMORI_MAX, next.omamori + reward),
      goalsDone: [...next.goalsDone, { days: next.goal.days, at: today }],
      goal: null,
    };
    notices.push({ kind: "goal", days: tier?.days ?? 0, reward, at: today });
  }

  if (next === data) return data;
  return { ...next, notices: [...next.notices, ...notices], best: Math.max(next.best, computeFlame(next, today).count) };
}

import type { Progress, ReviewEntry, StoredCard, StreakData } from "./db/types";
import { computeFlame, dayKey, shiftDay } from "./streak-rules";

/**
 * Statistiques d'apprentissage, calculées sur l'appareil à partir des cartes (FSRS), de l'historique
 * des réponses, des leçons ouvertes et de la flamme. Rien n'est envoyé nulle part.
 */

export type StatItem = { id: string; kind: "hiragana" | "katakana" | "kanji" | "verbe" | "mot"; level?: string };
export type Mastery = "new" | "learning" | "fragile" | "acquired";
export type Tally = Record<Mastery, number> & { total: number };

/** Une carte est ancrée quand l'intervalle dépasse trois semaines (même règle que les révisions). */
const anchored = (c: StoredCard) => c.state === 2 && c.scheduled_days >= 21;
/** Fragile : réapprise après un oubli, ou déjà oubliée au moins deux fois et pas encore ancrée. */
const fragile = (c: StoredCard) => c.state === 3 || c.lapses >= 2;

export function masteryOf(card: StoredCard | undefined): Mastery {
  if (!card || card.reps === 0) return "new";
  if (anchored(card)) return "acquired";
  if (fragile(card)) return "fragile";
  return "learning";
}

const empty = (): Tally => ({ new: 0, learning: 0, fragile: 0, acquired: 0, total: 0 });

export type DayStat = { key: string; reviews: number; good: number };

export type Stats = {
  byKind: Record<StatItem["kind"], Tally>;
  byLevel: Record<"N5" | "N4", Tally>;
  /** Cartes à fragiliser en priorité : les plus souvent oubliées. */
  fragileIds: string[];
  days: DayStat[];
  totalReviews: number;
  /** Réponses « Bien » ou « Facile » sur 30 jours, en % (null sans réponse). */
  retention30: number | null;
  reviews30: number;
  activeDays30: number;
  streak: number;
  bestStreak: number;
  firstDay: string | null;
  dueNow: number;
  lessonsOpened: number;
};

type Data = { cards: StoredCard[]; reviews: ReviewEntry[]; progress: Progress; streak: StreakData };

export function computeStats(data: Data, items: StatItem[], now: number, window = 14): Stats {
  const today = dayKey(now);
  const cardById = new Map(data.cards.map((c) => [c.id, c]));
  const byKind = { hiragana: empty(), katakana: empty(), kanji: empty(), verbe: empty(), mot: empty() };
  const byLevel = { N5: empty(), N4: empty() };
  const fragileCards: StoredCard[] = [];
  const ids = new Set(items.map((i) => i.id));
  for (const it of items) {
    const card = cardById.get(it.id);
    const s = masteryOf(card);
    byKind[it.kind][s]++;
    byKind[it.kind].total++;
    const lv = it.level === "N5" ? "N5" : it.level === "N4" ? "N4" : null;
    if (lv) {
      byLevel[lv][s]++;
      byLevel[lv].total++;
    }
    if (s === "fragile" && card) fragileCards.push(card);
  }
  fragileCards.sort((a, b) => b.lapses - a.lapses);

  const perDay = new Map<string, DayStat>();
  for (const r of data.reviews) {
    const k = dayKey(r.at);
    const d = perDay.get(k) ?? { key: k, reviews: 0, good: 0 };
    d.reviews++;
    if (r.rating >= 3) d.good++;
    perDay.set(k, d);
  }
  const days = Array.from({ length: window }, (_, i) => {
    const key = shiftDay(today, i - (window - 1));
    return perDay.get(key) ?? { key, reviews: 0, good: 0 };
  });

  const since30 = shiftDay(today, -29);
  const last30 = data.reviews.filter((r) => dayKey(r.at) >= since30);
  const active = new Set<string>();
  for (let i = 0; i < 30; i++) {
    const k = shiftDay(today, -i);
    if (perDay.has(k) || (data.streak.days[k]?.points ?? 0) > 0) active.add(k);
  }
  const firstReview = data.reviews.length ? dayKey(Math.min(...data.reviews.map((r) => r.at))) : null;
  const firstSeen = Object.values(data.progress.seen).length ? dayKey(Math.min(...Object.values(data.progress.seen))) : null;
  const firstDay = [firstReview, firstSeen].filter((k): k is string => !!k).sort()[0] ?? null;

  return {
    byKind,
    byLevel,
    fragileIds: fragileCards.map((c) => c.id).filter((id) => ids.has(id)),
    days,
    totalReviews: data.reviews.length,
    retention30: last30.length ? Math.round((last30.filter((r) => r.rating >= 3).length / last30.length) * 100) : null,
    reviews30: last30.length,
    activeDays30: active.size,
    streak: computeFlame(data.streak, today).count,
    bestStreak: data.streak.best,
    firstDay,
    dueNow: data.cards.filter((c) => ids.has(c.id) && c.reps > 0 && c.due <= now).length,
    lessonsOpened: Object.keys(data.progress.seen).length,
  };
}

/** Prochaine leçon à ouvrir : la première qui n'a pas encore été vue, dans l'ordre donné. */
export function nextLesson(order: string[], progress: Progress): string | null {
  return order.find((href) => !progress.seen[href]) ?? null;
}

import type { Progress, ReviewEntry, StoredCard, StreakData } from "./db/types";
import { dayKey, shiftDay } from "./streak-rules";

/** Bilan d'une semaine (lundi → dimanche), calculé à partir des données de l'appareil. */

export type WeekReport = {
  start: string;
  end: string;
  daysMet: number;
  points: number;
  reviews: number;
  /** Part des réponses « Bien » ou « Facile », en %. */
  good: number;
  newCards: number;
  lessons: number;
  kanji: number;
  bestDay: { key: string; points: number } | null;
};

/** Lundi de la semaine qui contient `key`. */
export function mondayOf(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const weekday = (new Date(y, m - 1, d, 12).getDay() + 6) % 7;
  return shiftDay(key, -weekday);
}

type Data = { reviews: ReviewEntry[]; progress: Progress; cards: StoredCard[]; streak: StreakData };

export function weekReport({ reviews, progress, cards, streak }: Data, monday: string): WeekReport {
  const end = shiftDay(monday, 6);
  const inWeek = (time: number) => {
    const k = dayKey(time);
    return k >= monday && k <= end;
  };
  const days = Array.from({ length: 7 }, (_, i) => shiftDay(monday, i));
  const weekReviews = reviews.filter((r) => inWeek(r.at));
  const seen = Object.entries(progress.seen).filter(([, t]) => inWeek(t));
  const best = days
    .map((k) => ({ key: k, points: streak.days[k]?.points ?? 0 }))
    .sort((a, b) => b.points - a.points)[0];
  return {
    start: monday,
    end,
    daysMet: days.filter((k) => streak.days[k]?.met || streak.repaired.includes(k)).length,
    points: days.reduce((n, k) => n + (streak.days[k]?.points ?? 0), 0),
    reviews: weekReviews.length,
    good: weekReviews.length ? Math.round((weekReviews.filter((r) => r.rating >= 3).length / weekReviews.length) * 100) : 0,
    newCards: cards.filter((c) => inWeek(c.added)).length,
    lessons: seen.length,
    kanji: seen.filter(([id]) => id.startsWith("/kanji/")).length,
    bestDay: best && best.points > 0 ? best : null,
  };
}

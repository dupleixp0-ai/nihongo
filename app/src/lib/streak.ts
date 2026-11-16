"use client";

import { addPoints, chooseGoal, computeFlame, dayKey, goalProgress, repairOne, settle, type Flame } from "./streak-rules";
import { getState, setStreak, useAppState, whenLoaded } from "./store";

/**
 * La flamme dans l'appli : chaque réponse (révision ou quiz) et chaque nouvelle leçon rapporte un point.
 * Quand les points du jour atteignent l'objectif, la journée compte pour la flamme.
 */

export type { Flame };
export { dayKey };

type GoalListener = (flame: Flame) => void;
const goalListeners = new Set<GoalListener>();

/** Prévient quand l'objectif du jour vient d'être atteint (pour la petite fête à l'écran). */
export function onGoalReached(listener: GoalListener) {
  goalListeners.add(listener);
  return () => {
    goalListeners.delete(listener);
  };
}

export function earn(points = 1) {
  whenLoaded(() => {
    const { streak, settings } = getState();
    const today = dayKey(Date.now());
    const before = streak.days[today]?.met ?? false;
    const next = addPoints(streak, today, points, settings.dailyGoal);
    setStreak(next);
    if (!before && next.days[today].met) {
      const flame = computeFlame(next, today);
      goalListeners.forEach((l) => l(flame));
    }
  });
}

/** Un exercice de rattrapage réussi : le plus ancien jour manqué est sauvé. */
export function repairDay() {
  const { streak } = getState();
  setStreak(repairOne(streak, dayKey(Date.now())));
}

/** Omamori et but de série : à vérifier à l'ouverture et chaque minute (changement de jour). */
export function settleNow() {
  whenLoaded(() => {
    const { streak } = getState();
    const next = settle(streak, dayKey(Date.now()));
    if (next !== streak) setStreak(next);
  });
}

export function chooseStreakGoal(days: number) {
  const { streak } = getState();
  setStreak(chooseGoal(streak, dayKey(Date.now()), days));
}

/** Bonus du kanji du jour : un point, une fois par jour. */
export function claimKanjiOfTheDayBonus() {
  whenLoaded(() => {
    const { streak } = getState();
    const today = dayKey(Date.now());
    if (streak.kotdBonus === today) return;
    setStreak({ ...streak, kotdBonus: today });
    earn(1);
  });
}

export function dismissWeeklySummary(monday: string) {
  const { streak } = getState();
  setStreak({ ...streak, summarySeen: monday });
}

export function dismissNotices() {
  const { streak } = getState();
  if (streak.notices.length) setStreak({ ...streak, notices: [] });
}

export type FlameView = Flame & { ready: boolean; today: string; points: number; goal: number };

export function useFlame(now: number): FlameView {
  const { ready, streak, settings } = useAppState();
  const today = now ? dayKey(now) : "";
  const flame = computeFlame(streak, today || "1970-01-01");
  return {
    ...flame,
    ready: ready && now > 0,
    today,
    points: streak.days[today]?.points ?? 0,
    goal: settings.dailyGoal,
  };
}

/** Le but de série en cours et sa progression. */
export function useStreakGoal(now: number) {
  const { streak } = useAppState();
  const today = now ? dayKey(now) : "1970-01-01";
  return { goal: streak.goal, progress: goalProgress(streak, today), omamori: streak.omamori, goalsDone: streak.goalsDone, notices: streak.notices };
}

if (typeof window !== "undefined") {
  whenLoaded(() => {
    // Première ouverture avec la flamme : on reprend les jours de révision déjà faits.
    const { streak, reviews, settings } = getState();
    if (Object.keys(streak.days).length === 0 && reviews.length > 0) {
      let data = streak;
      for (const r of [...reviews].sort((a, b) => a.at - b.at)) data = addPoints(data, dayKey(r.at), 1, settings.dailyGoal);
      setStreak({ ...data, notices: [] });
    }
    settleNow();
  });
}

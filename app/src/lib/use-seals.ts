"use client";

import { computeSeals, type LessonGroups } from "./achievements";
import { useAppState } from "./store";
import { useFlame } from "./streak";

/** Les sceaux de l'utilisateur et le nombre déjà gagnés. */
export function useSeals(groups: LessonGroups, now: number) {
  const app = useAppState();
  const flame = useFlame(now);
  const seals = computeSeals({ progress: app.progress, cards: app.cards, reviews: app.reviews, streak: app.streak, best: flame.best, groups });
  return { seals, earned: seals.filter((s) => s.value >= s.target).length };
}

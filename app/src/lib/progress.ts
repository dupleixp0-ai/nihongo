"use client";

import { type ItemStats, type Progress } from "./db";
import { getState, setProgress, useAppState, whenLoaded } from "./store";
import { addCards, isLessonId } from "./srs";
import { isFreeId } from "@/data/access";
import { isPremiumNow } from "./billing";
import { earn } from "./streak";

/**
 * Progression : leçons vues et réponses aux quiz. Gardée sur l'appareil (voir lib/db), rien n'est envoyé.
 */

export type { ItemStats, Progress };

export function useProgress(): Progress {
  return useAppState().progress;
}

export function markSeen(id: string) {
  // Une leçon de la version complète, non débloquée, ne compte pas (l'aperçu n'est pas une leçon suivie).
  if (!isFreeId(id) && !isPremiumNow()) return;
  whenLoaded(() => {
    const { progress, settings } = getState();
    if (!progress.seen[id]) {
      setProgress({ ...progress, seen: { ...progress.seen, [id]: Date.now() } });
      earn(1);
    }
    // Une leçon ouverte entre dans les révisions (sauf si l'option est coupée).
    if (settings.autoAdd && isLessonId(id) && !progress.seen[id]) addCards([id]);
  });
}

export function recordAnswer(id: string, correct: boolean) {
  whenLoaded(() => {
    const p = getState().progress;
    const prev = p.items[id] ?? { correct: 0, wrong: 0, streak: 0, last: 0 };
    const stats: ItemStats = {
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      streak: correct ? prev.streak + 1 : 0,
      last: Date.now(),
    };
    setProgress({ ...p, items: { ...p.items, [id]: stats } });
    earn(1);
  });
}

/** Un caractère est « su » après deux bonnes réponses d'affilée au quiz. */
export const isMastered = (stats?: ItemStats) => Boolean(stats && stats.streak >= 2);

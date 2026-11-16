"use client";

import { useMemo } from "react";
import { isFreeId } from "@/data/access";
import { usePremium } from "@/lib/billing";
import { QuizLauncher, type QuizItem } from "@/components/quiz/quiz";
import { useMessages } from "@/i18n/use-lang";

type Tag = NonNullable<QuizItem["x"]>;
const tag = (items: QuizItem[], x: Tag): QuizItem[] => items.map((i) => ({ ...i, x }));

/**
 * Révision express : tous les exercices de l'appli mélangés pendant 5 minutes.
 * Chaque type d'exercice puise dans les leçons ouvertes ; un type qui n'a pas assez d'éléments ouverts (moins de 4) est laissé de côté.
 */
export function ExpressStart({ kana, kanji, words, verbs, lookalikes }: { kana: QuizItem[]; kanji: QuizItem[]; words: QuizItem[]; verbs: QuizItem[]; lookalikes: QuizItem[] }) {
  const m = useMessages();
  const e = m.pages.express;
  const premium = usePremium();

  const items = useMemo(() => {
    if (premium === null) return [];
    const open = (list: QuizItem[]) => list.filter((i) => premium === true || isFreeId(i.id));
    const k = open(kana), kj = open(kanji), w = open(words), v = open(verbs), s = open(lookalikes);
    const all = [
      ...tag(k, "kana"), ...tag(k, "ecouteSon"),
      ...tag(kj, "kanji"),
      ...tag([...w, ...v], "mots"),
      ...tag(s, "sosies"),
      ...tag(w, "ecouteMot"), ...tag([...w, ...v], "ecouteSens"), ...tag(w, "ecoute"),
    ];
    const counts = new Map<string, number>();
    for (const i of all) counts.set(i.x!, (counts.get(i.x!) ?? 0) + 1);
    return all.filter((i) => (counts.get(i.x!) ?? 0) >= 4);
  }, [premium, kana, kanji, words, verbs, lookalikes]);

  if (premium === null) return <div className="h-14" aria-busy="true" />;
  if (items.length < 8) return <p className="text-muted">{e.notEnough}</p>;
  return <QuizLauncher items={items} mode="express" title={e.title} label={e.start} glyph="急" large autoOpenParam="go" />;
}

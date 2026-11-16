"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { CatalogSection } from "@/data/catalog";
import type { QuizItem } from "@/components/quiz/quiz";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";
import { ScriptExplorer } from "./script-explorer";
import { cn } from "@/lib/utils";

type Level = "N5" | "N4";

/** Choix du niveau JLPT (N5, N4), puis les groupes thématiques du niveau. */
export function KanjiLevels({ levels, extraQuiz }: { levels: Record<Level, CatalogSection[]>; extraQuiz: { items: QuizItem[] } }) {
  const m = useMessages();
  const [level, setLevel] = useState<Level>("N5");

  useEffect(() => {
    // Le niveau se lit dans l'adresse (#n4-…) après le premier rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.location.hash.startsWith("#n4-")) setLevel("N4");
  }, []);

  const count = (l: Level) => levels[l][0].cells.filter(Boolean).length;

  return (
    <div>
      <div role="tablist" aria-label={m.lists.jlptAria} className="mb-6 inline-flex rounded-2xl border border-line bg-sheet p-1">
        {(["N5", "N4"] as const).map((l) => (
          <button
            key={l}
            role="tab"
            aria-selected={level === l}
            onClick={() => {
              setLevel(l);
              window.history.replaceState(null, "", `#${levels[l][0].id}`);
            }}
            className={cn("relative rounded-xl px-5 py-2.5 text-left transition-colors", level === l ? "text-on-indigo" : "text-muted hover:text-ink")}
          >
            {level === l ? <motion.span layoutId="level-pill" className="absolute inset-0 rounded-xl bg-indigo" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
            <span className="relative block text-lg font-semibold leading-tight">JLPT {l}</span>
            <span className="relative block text-xs opacity-80"><T m={(x) => x.lists.kanjiCount(count(l))} /></span>
          </button>
        ))}
      </div>
      <ScriptExplorer key={level} script="kanji" sections={levels[level]} extraQuiz={level === "N5" ? extraQuiz : undefined} />
    </div>
  );
}

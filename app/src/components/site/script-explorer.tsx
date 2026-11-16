"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CatalogSection, Script } from "@/data/catalog";
import { CharacterGrid } from "./character-grid";
import { QuizLauncher, type QuizItem } from "@/components/quiz/quiz";
import { isMastered, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { AddManyButton } from "@/components/srs/card-toggle";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";
import type { Messages } from "@/i18n/messages";

/** Onglets des sections d'une écriture (Base, Dakuten…), avec la grille de la section choisie. */
/** Titre et description d'une section dans une langue (le texte du catalogue en repli). */
const sectionText = (m: Messages, script: Script, s: CatalogSection) => m.catalog.sections[`${script}.${s.id}`] ?? { title: s.title, description: s.description };

export function ScriptExplorer({ script, sections, extraQuiz }: { script: Script; sections: CatalogSection[]; extraQuiz?: { items: QuizItem[] } }) {
  const kanji = script === "kanji";
  const [active, setActive] = useState(sections[0].id);
  const progress = useProgress();
  const m = useMessages();

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    // L'onglet se lit dans l'adresse après le premier rendu (pas de différence serveur/client).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sections.some((s) => s.id === fromHash)) setActive(fromHash);
  }, [sections]);

  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    // Fait défiler la rangée d'onglets (et seulement elle) pour garder l'onglet choisi visible.
    const tab = document.getElementById(`tab-${active}`);
    const row = tab?.closest<HTMLElement>(".overflow-x-auto");
    if (tab && row) row.scrollTo({ left: tab.offsetLeft - row.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const section = sections.find((s) => s.id === active) ?? sections[0];
  const count = section.cells.filter(Boolean).length;
  const lessons = section.cells.filter((c) => c?.href) as NonNullable<CatalogSection["cells"][number]>[];
  const seen = lessons.filter((c) => progress.seen[c.href!]).length;
  const mastered = lessons.filter((c) => isMastered(progress.items[c.href!])).length;
  const quizItems: QuizItem[] = lessons.map((c) =>
    kanji
      ? { id: c.href!, prompt: c.character, answer: c.reading ?? c.label, answerSub: c.romaji, meaning: c.label, meaningTr: c.labelTr, accept: c.readings }
      : { id: c.href!, prompt: c.character, answer: c.label },
  );

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div role="tablist" aria-label={m.lists.sectionsAria} className="inline-flex gap-1 rounded-full border border-line bg-sheet p-1 md:flex-wrap md:rounded-3xl">
          {sections.map((s) => {
            const selected = s.id === section.id;
            return (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`panel-${s.id}`}
                onClick={() => select(s.id)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selected ? "text-on-contrast" : "text-muted hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="section-pill"
                    className="absolute inset-0 rounded-full bg-contrast"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative"><T m={(x) => sectionText(x, script, s).title} /></span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          id={`panel-${section.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${section.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="mt-8"
        >
          <p className="max-w-prose text-lg leading-relaxed text-muted">
            <T m={(x) => sectionText(x, script, section).description} /> <span className="whitespace-nowrap text-ink"><T m={(x) => x.lists.characters(count)} /></span>
          </p>
          <div className="mb-6 mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            {quizItems.length >= 4 ? (
              <QuizLauncher items={quizItems} mode={kanji ? "kanji" : "kana"} title={m.lists.quizTitle(sectionText(m, script, section).title)} label={m.lists.test} />
            ) : null}
            {extraQuiz ? <QuizLauncher items={extraQuiz.items} mode="sosies" title={m.lists.lookalikeQuiz} label={m.lists.lookalikeQuiz} /> : null}
            <AddManyButton ids={lessons.map((c) => c.href!)} label={m.lists.reviewTab} />
            <span className="flex items-center gap-4 text-sm text-muted" aria-live="polite">
              <span className="flex items-center gap-1.5"><span aria-hidden="true" className="size-2.5 rounded-full border-2 border-indigo" />{seen} <T m={(x) => x.lists.seen} /></span>
              <span className="flex items-center gap-1.5"><span aria-hidden="true" className="size-2.5 rounded-full bg-emerald-500" />{mastered} <T m={(x) => x.lists.known} /></span>
            </span>
          </div>
          <CharacterGrid cells={section.cells} columns={section.columns} label={sectionText(m, script, section).title} kanji={kanji} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

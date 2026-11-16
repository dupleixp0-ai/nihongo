"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { isFreeWord } from "@/data/access";
import { usePremium } from "@/lib/billing";
import { LockBadge, useCanOpen } from "@/components/site/gate";
import { AnimatePresence, motion } from "framer-motion";
import type { VocabTheme, Word } from "@/data/vocab";
import { wordCardId } from "@/data/vocab";
import { SpeakButton } from "@/components/kana/speak-button";
import { AddManyButton, CardToggle } from "@/components/srs/card-toggle";
import { QuizLauncher, type QuizItem } from "@/components/quiz/quiz";
import { cn } from "@/lib/utils";
import { L, T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[～~-]/g, "");

function WordCard({ word }: { word: Word }) {
  const open = useCanOpen(wordCardId(word.slug));
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      className="flex flex-col rounded-2xl border border-line bg-sheet p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p lang="ja" className="font-kana text-3xl leading-tight text-brush">{word.jp}</p>
          {word.jp !== word.kana ? <p lang="ja" className="font-kana text-base text-indigo-deep">{word.kana}</p> : null}
          <p className="text-sm text-muted">{word.romaji}</p>
        </div>
        {open ? <SpeakButton text={word.kana.replace(/^～/, "")} /> : <LockBadge id={wordCardId(word.slug)} />}
      </div>
      <p className="mt-2 flex-1 text-[15px] font-medium leading-snug"><L v={{ fr: word.fr, ...word.tr }} /></p>
      <div className="mt-3">
        {open ? <CardToggle id={wordCardId(word.slug)} compact /> : <span className="inline-block h-9" aria-hidden="true" />}
      </div>
    </motion.li>
  );
}

/** Le vocabulaire par thème, avec recherche (français, kana, rōmaji, kanji). */
export function VocabList({ words, themes }: { words: Word[]; themes: VocabTheme[] }) {
  const m = useMessages();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<string>("all");
  const [level, setLevel] = useState<"N5" | "N4" | "all">("N5");
  const deferred = useDeferredValue(query);
  const premium = usePremium();
  const usable = (w: Word) => premium === true || isFreeWord(w.slug);

  useEffect(() => {
    // Lien depuis une carte de révision : /vocabulaire?q=いぬ
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      // Lu dans l'adresse après le premier rendu (pas de différence serveur/client).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(q);
      setLevel("all");
    }
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(deferred.trim());
    return words.filter((w) => (level === "all" || w.level === level) && (theme === "all" || w.theme === theme) && (!q || [w.jp, w.kana, w.romaji, w.fr, w.tr?.en ?? "", w.tr?.de ?? ""].some((f) => normalize(f).includes(q))));
  }, [words, deferred, theme, level]);
  const count = (l: "N5" | "N4") => words.filter((w) => w.level === l).length;

  const sections = themes
    .map((t) => ({ theme: t, words: filtered.filter((w) => w.theme === t.id) }))
    .filter((s) => s.words.length > 0);

  return (
    <div>
      <div role="tablist" aria-label={m.lists.levelAria} className="mb-4 inline-flex gap-1 rounded-2xl border border-line bg-sheet p-1">
        {(["N5", "N4", "all"] as const).map((l) => (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={level === l}
            onClick={() => setLevel(l)}
            className={cn("rounded-xl px-5 py-2.5 text-left transition-colors", level === l ? "bg-indigo text-on-indigo" : "text-muted hover:text-ink")}
          >
            <span className="block text-base font-semibold">{l === "all" ? "N5 + N4" : `JLPT ${l}`}</span>
            <span className={cn("block text-xs", level === l ? "text-on-indigo/80" : "text-muted")}><T m={(x) => x.lists.wordCount(l === "all" ? words.length : count(l))} /></span>
          </button>
        ))}
      </div>

      <div className="sticky top-16 z-20 -mx-5 border-b border-line/60 bg-paper/90 px-5 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <label className="relative block">
          <span className="sr-only"><T m={(x) => x.lists.searchWord} /></span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m13 13 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={m.lists.wordPlaceholder}
            className="w-full rounded-full border border-line bg-sheet py-2.5 pl-10 pr-4 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-indigo"
          />
        </label>
        <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          <button
            type="button"
            onClick={() => setTheme("all")}
            aria-pressed={theme === "all"}
            className={cn("shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors", theme === "all" ? "bg-contrast text-on-contrast" : "border border-line bg-sheet text-muted hover:border-indigo hover:text-ink")}
          >
            <T m={(x) => x.lists.allThemes} />
          </button>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              aria-pressed={theme === t.id}
              className={cn("flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors", theme === t.id ? "bg-contrast text-on-contrast" : "border border-line bg-sheet text-muted hover:border-indigo hover:text-ink")}
            >
              <span lang="ja" aria-hidden="true" className="font-kana">{t.glyph}</span>
              <T m={(x) => x.catalog.themes[t.id] ?? t.title} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          <T m={(x) => x.lists.wordCount(filtered.length)} />
        </p>
        {filtered.filter(usable).length >= 4 ? (
          <QuizLauncher
            items={filtered.filter(usable).map((w) => ({ id: wordCardId(w.slug), prompt: w.jp, answer: w.kana, answerSub: w.romaji, meaning: w.fr, meaningTr: w.tr, speak: w.kana.replace(/^～/, "") }))}
            mode="ecoute"
            title={m.lists.listenWrite}
            label={m.lists.listenWrite}
            glyph="聞"
          />
        ) : null}
      </div>

      {sections.length === 0 ? (
        <p className="py-16 text-center text-muted"><T m={(x) => x.lists.noWord} /></p>
      ) : (
        sections.map(({ theme: t, words: list }) => {
          const quiz: QuizItem[] = list.filter(usable).map((w) => ({ id: wordCardId(w.slug), prompt: w.jp, answer: w.kana, answerSub: w.romaji, meaning: w.fr, meaningTr: w.tr, group: t.id }));
          return (
            <section key={t.id} aria-labelledby={`theme-${t.id}`} className="mt-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id={`theme-${t.id}`} className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
                  <span lang="ja" className="font-kana text-3xl text-seal">{t.glyph}</span>
                  <T m={(x) => x.catalog.themes[t.id] ?? t.title} />
                  <span className="text-sm font-normal text-muted">
                    <span lang="ja" className="font-kana">{t.glyph} {t.kana}</span> · {t.romaji} · <T m={(x) => x.lists.wordCount(list.length)} />
                  </span>
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {quiz.length >= 4 ? <QuizLauncher items={quiz} mode="mots" title={m.lists.quizTitle(m.catalog.themes[t.id] ?? t.title)} label={m.lists.test} /> : null}
                  <AddManyButton ids={list.filter(usable).map((w) => wordCardId(w.slug))} label={m.lists.reviewTheme} />
                </div>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence initial={false}>
                  {list.map((w) => <WordCard key={w.slug} word={w} />)}
                </AnimatePresence>
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}

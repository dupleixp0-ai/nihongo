"use client";

import { useMemo } from "react";
import { isFreeId } from "@/data/access";
import { usePremium } from "@/lib/billing";
import { useHasJapaneseVoice } from "@/lib/japanese-speech";
import { QuizLauncher, type QuizItem } from "@/components/quiz/quiz";
import { ShadowLauncher } from "@/components/ecoute/shadow";
import Link from "next/link";
import { LockIcon } from "@/components/site/gate";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";
import type { Messages } from "@/i18n/messages";

type Card =
  | { id: "word" | "meaning" | "write" | "sound" | "verbs"; glyph: string; mode: "ecouteMot" | "ecouteSens" | "ecoute" | "ecouteSon"; source: "words" | "kana" | "verbs" }
  | { id: "repeat"; glyph: string; mode: "shadow"; source: "wordsAndVerbs" };

/** Les deux exercices d'essai : gratuits (avec les leçons ouvertes). Les quatre autres demandent la version complète. */
const FREE_EXERCISES = new Set<Card["id"]>(["word", "sound"]);

const CARDS: Card[] = [
  { id: "word", glyph: "耳", mode: "ecouteMot", source: "words" },
  { id: "meaning", glyph: "意", mode: "ecouteSens", source: "words" },
  { id: "write", glyph: "聞", mode: "ecoute", source: "words" },
  { id: "sound", glyph: "音", mode: "ecouteSon", source: "kana" },
  { id: "verbs", glyph: "動", mode: "ecouteSens", source: "verbs" },
  { id: "repeat", glyph: "声", mode: "shadow", source: "wordsAndVerbs" },
];

/** Les exercices d'écoute : chacun puise dans les leçons ouvertes (gratuites, ou tout avec la version complète). */
export function EcouteHub({ words, verbs, kana }: { words: QuizItem[]; verbs: QuizItem[]; kana: QuizItem[] }) {
  const m = useMessages();
  const l = m.pages.listen;
  const premium = usePremium();
  const hasVoice = useHasJapaneseVoice();
  const usable = useMemo(() => {
    const open = (items: QuizItem[]) => items.filter((i) => premium === true || isFreeId(i.id));
    const w = open(words);
    const v = open(verbs);
    return { words: w, verbs: v, kana: open(kana), wordsAndVerbs: [...w, ...v] };
  }, [premium, words, verbs, kana]);

  return (
    <div>
      {hasVoice ? null : (
        <p className="mb-6 rounded-2xl border border-line bg-sheet px-5 py-4 text-[15px] text-muted">{m.quiz.noVoice}</p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => {
          const items = usable[c.source];
          const ready = items.length >= 4;
          const locked = premium !== true && !FREE_EXERCISES.has(c.id);
          const text = l.cards[c.id as keyof Messages["pages"]["listen"]["cards"]];
          return (
            <li key={c.id} className="relative flex flex-col gap-4 rounded-2xl border border-line bg-sheet p-5">
              {locked ? (
                <span role="img" aria-label={m.premium.lockedAria} title={m.premium.lockedAria} className="absolute right-3 top-3 inline-grid size-5 place-items-center rounded-full bg-contrast/85 text-on-contrast">
                  <LockIcon className="size-3" />
                </span>
              ) : null}
              <div className="flex gap-4">
                <span lang="ja" aria-hidden="true" className="font-kana text-4xl leading-none text-indigo">{c.glyph}</span>
                <div>
                  <h2 className="font-semibold"><T m={(x) => x.pages.listen.cards[c.id].title} /></h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted"><T m={(x) => x.pages.listen.cards[c.id].text} /></p>
                </div>
              </div>
              <div className="mt-auto">
                {locked ? (
                  <Link href="/reglages#version-complete" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[15px] font-semibold text-muted transition-colors hover:border-indigo hover:text-ink">
                    <LockIcon className="size-4" />
                    {m.premium.lockedCard}
                  </Link>
                ) : !ready ? (
                  <p className="text-sm text-muted">{l.locked}</p>
                ) : c.mode === "shadow" ? (
                  <ShadowLauncher items={items} label={l.start} glyph={c.glyph} />
                ) : (
                  <QuizLauncher items={items} mode={c.mode} title={text.title} label={l.start} glyph={c.glyph} />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

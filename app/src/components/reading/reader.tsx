"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReadingText, Sentence, Token } from "@/domain/reading";
import { SpeakButton } from "@/components/kana/speak-button";
import { cn } from "@/lib/utils";
import { SPEAKERS } from "@/data/readings";
import { T } from "@/i18n/t";
import { useLang, useMessages } from "@/i18n/use-lang";
import { speakerLabel } from "@/i18n/content/speakers";

const HAS_KANJI = /[一-鿿々]/;

export const sentenceText = (s: Sentence) => s.tokens.map((t) => t.t).join("");
export const sentenceKana = (s: Sentence) => s.tokens.map((t) => t.r ?? t.t).join("");

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-sheet py-1.5 pl-1.5 pr-4 text-sm font-medium transition-colors hover:border-indigo"
    >
      <span className={cn("relative h-6 w-10 rounded-full transition-colors", checked ? "bg-indigo" : "bg-line")}>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 34 }}
          className={cn("absolute top-0.5 size-5 rounded-full bg-sheet shadow", checked ? "right-0.5" : "left-0.5")}
        />
      </span>
      {label}
    </button>
  );
}

function Word({ token, forceReading }: { token: Token; forceReading: boolean }) {
  const [open, setOpen] = useState(false);
  const m = useMessages();
  if (!token.r || !HAS_KANJI.test(token.t)) return <span>{token.t}</span>;
  const shown = open || forceReading;
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-pressed={shown}
      aria-label={m.pages.reading.wordAria(token.t, token.r)}
      className={cn(
        "rounded-md px-0.5 transition-colors",
        shown ? "bg-indigo/10 text-indigo-deep" : "decoration-indigo/40 decoration-dotted underline-offset-[0.3em] hover:bg-indigo/5 [text-decoration-line:underline]",
      )}
    >
      <ruby>
        {token.t}
        <rt className={cn("font-sans text-[0.42em] font-medium tracking-wide text-indigo transition-opacity duration-200", shown ? "opacity-100" : "opacity-0")}>
          {token.r}
        </rt>
      </ruby>
    </button>
  );
}

function SentenceBlock({ sentence, index, showReadings, showKana }: { sentence: Sentence; index: number; showReadings: boolean; showKana: boolean }) {
  const [open, setOpen] = useState(false);
  const m = useMessages();
  const lang = useLang();
  const expanded = open || showKana;
  return (
    <li className="group/sentence relative">
      <div className={cn("flex items-start gap-3", sentence.speaker && "sm:gap-4")}>
        {sentence.speaker ? (
          <span className="mt-2 flex w-16 shrink-0 flex-col items-end text-right leading-tight sm:w-20">
            <ruby lang="ja" className="font-kana text-sm text-seal sm:text-base">
              {sentence.speaker}
              {/[\u4e00-\u9fff]/.test(sentence.speaker) ? <rt className="text-[0.6em]">{SPEAKERS[sentence.speaker]?.reading}</rt> : null}
            </ruby>
            <span className="text-[11px] text-muted">{speakerLabel(sentence.speaker, SPEAKERS[sentence.speaker]?.label ?? sentence.speaker, lang)}</span>
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p lang="ja" className="font-kana text-[1.4rem] leading-[2.3] text-ink sm:text-[1.9rem] sm:leading-[2.4]">
            {sentence.tokens.map((token, i) => (
              <Word key={i} token={token} forceReading={showReadings} />
            ))}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={expanded}
              aria-label={m.pages.reading.sentenceAria(index + 1)}
              className={cn(
                "font-sans ml-2 inline-grid size-8 translate-y-[-0.2em] place-items-center rounded-full border align-middle text-sm transition-colors",
                expanded ? "border-indigo bg-indigo text-on-indigo" : "border-line bg-sheet text-muted hover:border-indigo hover:text-indigo",
              )}
            >
              <span lang="ja" className="font-kana">あ</span>
            </button>
          </p>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mb-3 flex items-start gap-3 rounded-xl border border-line bg-sheet p-3 sm:p-4">
                  <div className="min-w-0 flex-1">
                    <p lang="ja" className="font-kana text-lg leading-relaxed text-ink">{sentenceKana(sentence)}</p>
                    <p className="mt-1 text-[15px] text-muted">{sentence.romaji}</p>
                  </div>
                  <SpeakButton text={sentenceKana(sentence)} />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}

/** Le texte, interactif : toucher un kanji affiche sa lecture, le bouton あ affiche la phrase en kana et en rōmaji. */
export function Reader({ text }: { text: ReadingText }) {
  const [showReadings, setShowReadings] = useState(false);
  const [showKana, setShowKana] = useState(false);
  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 flex flex-nowrap gap-2 border-b border-line/60 bg-paper/85 px-5 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:border sm:px-3">
        <Switch checked={showReadings} onChange={setShowReadings} label={<T m={(x) => x.pages.reading.switchReadings} />} />
        <Switch checked={showKana} onChange={setShowKana} label={<T m={(x) => x.pages.reading.switchKana} />} />
      </div>
      <p className="mt-5 text-[15px] text-muted">
        <T m={(x) => x.pages.reading.hintBefore} /><span lang="ja" className="font-kana">あ</span><T m={(x) => x.pages.reading.hintAfter} />
      </p>
      <ol className={cn("mt-6", text.kind === "dialogue" ? "space-y-2" : "space-y-0")}>
        {text.sentences.map((s, i) => (
          <SentenceBlock key={i} sentence={s} index={i} showReadings={showReadings} showKana={showKana} />
        ))}
      </ol>
    </div>
  );
}

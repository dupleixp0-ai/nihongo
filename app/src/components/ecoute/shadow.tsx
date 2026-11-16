"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playFeedback } from "@/lib/feedback";
import { speakJapanese, useHasJapaneseVoice } from "@/lib/japanese-speech";
import type { QuizItem } from "@/components/quiz/quiz";
import { useLang, useMessages } from "@/i18n/use-lang";
import { pick } from "@/i18n/meanings";
import { useLocalFlag } from "@/lib/local-flag";
import { cn } from "@/lib/utils";

const SESSION_SIZE = 8;

const shuffled = <T,>(list: T[]) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * « Répète après moi » : le mot est prononcé, tu le répètes à voix haute, puis tu vérifies avec le texte.
 * Pas de reconnaissance vocale (peu fiable en japonais dans un navigateur, et ce serait envoyer ta voix à un serveur) :
 * c'est toi qui juges si c'était bon ; un mot « à refaire » revient en fin de séance.
 */
function ShadowSession({ items, onClose }: { items: QuizItem[]; onClose: () => void }) {
  const m = useMessages();
  const lang = useLang();
  const s = m.pages.listen.shadow;
  const qz = m.quiz;
  const hasVoice = useHasJapaneseVoice();
  const [showRomaji, setShowRomaji] = useLocalFlag("nihongo.romaji", true);
  const [queue, setQueue] = useState(() => shuffled(items).slice(0, SESSION_SIZE));
  const [total] = useState(queue.length);
  const [good, setGood] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [round, setRound] = useState(0);
  const current = queue[0];
  const [speaking, setSpeaking] = useState(false);

  const play = (slow = false) => {
    if (!current) return;
    speakJapanese(current.speak ?? current.answer, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false), rate: slow ? 0.55 : undefined });
  };
  useEffect(() => {
    // Chaque nouveau mot est prononcé dès qu'il s'affiche.
    if (current) speakJapanese(current.speak ?? current.answer);
  }, [current?.id, round]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = (ok: boolean) => {
    setRevealed(false);
    if (ok) {
      playFeedback("correct");
      setGood((g) => g + 1);
      if (queue.length === 1) playFeedback("complete");
      setQueue((q) => q.slice(1));
    } else {
      setQueue((q) => [...q.slice(1), q[0]]);
      setRound((r) => r + 1);
    }
  };
  const restart = () => {
    setQueue(shuffled(items).slice(0, SESSION_SIZE));
    setGood(0);
    setRevealed(false);
    setRound((r) => r + 1);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{m.pages.listen.cards.repeat.title}</p>
        <button
          type="button"
          aria-pressed={showRomaji}
          onClick={() => setShowRomaji(!showRomaji)}
          className={cn("ml-auto whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium transition-colors", showRomaji ? "border-indigo/50 bg-indigo-soft text-indigo-deep" : "border-line text-muted hover:text-ink")}
        >
          {qz.romaji}
        </button>
        <button type="button" onClick={onClose} aria-label={qz.close} className="grid size-9 place-items-center rounded-full border border-line text-lg text-muted hover:border-indigo hover:text-ink">×</button>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/60" aria-hidden="true">
        <motion.div className="h-full rounded-full bg-indigo" animate={{ width: `${(good / total) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
      </div>

      {!current ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
          <p lang="ja" className="font-kana text-6xl">上手</p>
          <p className="text-3xl font-semibold">{good} / {total}</p>
          <p className="max-w-xs text-muted">{s.done(total)}</p>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={restart} className="rounded-full bg-indigo px-5 py-2.5 font-semibold text-on-indigo active:scale-[0.97]">{qz.newQuiz}</button>
            <button type="button" onClick={onClose} className="rounded-full border border-line bg-sheet px-5 py-2.5 font-semibold active:scale-[0.97]">{qz.close}</button>
          </div>
        </div>
      ) : !hasVoice ? (
        <p className="m-auto max-w-xs px-4 text-center text-sm text-muted">{qz.noVoice}</p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={`${current.id}-${round}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col py-5">
            <p className="text-sm text-muted">{qz.question(Math.min(good + 1, total), total)}</p>
            <p className="mt-1 text-lg font-medium">{s.instruction}</p>
            <div className="my-5 grid place-items-center gap-3 rounded-2xl border border-line bg-genko px-4 py-6">
              {revealed ? (
                <div className="text-center">
                  <p lang="ja" className="font-kana text-5xl leading-tight">{current.prompt}</p>
                  {current.answer !== current.prompt ? <p lang="ja" className="font-kana text-xl text-indigo-deep">{current.answer}</p> : null}
                  {showRomaji && current.answerSub ? <p className="text-muted">{current.answerSub}</p> : null}
                  {current.meaning ? <p className="mt-2 text-lg font-medium">{pick(current.meaning, current.meaningTr, lang)}</p> : null}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => play()}
                  aria-label={qz.listenWord}
                  className={cn("grid size-24 place-items-center rounded-full bg-indigo text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] transition-transform active:scale-95", speaking && "ring-4 ring-indigo/30")}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-10">
                    <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                    <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
              <div className="flex gap-3 text-sm font-medium">
                <button type="button" onClick={() => play()} className="text-indigo-deep hover:underline">{qz.replay}</button>
                <button type="button" onClick={() => play(true)} className="text-muted hover:text-ink hover:underline">{qz.slower}</button>
              </div>
            </div>
            <div className="mt-auto pt-5">
              {revealed ? (
                <div className="grid grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => advance(false)} className="rounded-xl border-2 border-line bg-sheet px-3 py-3.5 font-semibold active:scale-[0.97]">{s.again}</button>
                  <button type="button" onClick={() => advance(true)} autoFocus className="rounded-xl border-2 border-indigo bg-indigo px-3 py-3.5 font-semibold text-on-indigo active:scale-[0.97]">{s.ok}</button>
                </div>
              ) : (
                <button type="button" onClick={() => setRevealed(true)} className="w-full rounded-xl border-2 border-line bg-sheet px-3 py-3.5 font-semibold active:scale-[0.97]">{s.reveal}</button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/** Bouton qui ouvre « Répète après moi » dans un panneau (plein écran sur téléphone). */
export function ShadowLauncher({ items, label, glyph = "声" }: { items: QuizItem[]; label: string; glyph?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-2.5 text-[15px] font-semibold text-on-indigo shadow-[0_10px_22px_-12px_rgba(44,74,140,0.8)] transition-transform active:scale-[0.97]"
      >
        <span lang="ja" aria-hidden="true" className="font-kana">{glyph}</span>
        {label}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="flex h-[92dvh] w-full max-w-lg flex-col rounded-t-3xl border border-line bg-paper p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:h-auto sm:min-h-[36rem] sm:rounded-3xl sm:p-7"
            >
              <ShadowSession items={items} onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

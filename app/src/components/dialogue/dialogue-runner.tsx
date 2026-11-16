"use client";

import { playFeedback } from "@/lib/feedback";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SpeakButton } from "@/components/kana/speak-button";
import { markSeen, recordAnswer } from "@/lib/progress";
import { L, T } from "@/i18n/t";
import { cn } from "@/lib/utils";

type L3 = { fr: string; en?: string; de?: string };
export type RLine = { jp: string; kana: string; romaji: string; fr: L3; words?: { jp: string; kana: string; romaji: string; fr: L3 }[] };
export type RTurn =
  | ({ kind: "say" } & RLine)
  | { kind: "reply"; prompt: L3; choices: (RLine & { ok?: true; why?: L3 })[] };
export type RDialogue = { slug: string; partner: L3; turns: RTurn[] };

const plain = (s: string) => s.replace(/[\s_]/g, "");

function Line({ line, big }: { line: RLine; big?: boolean }) {
  const reading = line.kana.replace(/_/g, "");
  return (
    <div>
      <p lang="ja" className={cn("font-kana leading-snug", big ? "text-xl sm:text-2xl" : "text-lg sm:text-xl")}>{line.jp}</p>
      {plain(line.kana) !== plain(line.jp) ? <p lang="ja" className="font-kana text-sm text-indigo-deep">{reading}</p> : null}
      <p className="text-sm text-muted">{line.romaji}</p>
    </div>
  );
}

function Words({ words }: { words: NonNullable<RLine["words"]> }) {
  return (
    <details className="mt-2 text-sm">
      <summary className="cursor-pointer text-indigo hover:text-indigo-deep"><T m={(m) => m.dialogue.words} /></summary>
      <ul className="mt-1.5 grid gap-1">
        {words.map((w) => (
          <li key={w.jp + w.kana}>
            <span lang="ja" className="font-kana text-base">{w.jp}</span>{" "}
            <span className="text-muted">{w.kana !== w.jp ? <><span lang="ja" className="font-kana">{w.kana}</span> · </> : null}{w.romaji} · </span>
            <L v={w.fr} />
          </li>
        ))}
      </ul>
    </details>
  );
}

export function DialogueRunner({ dialogue }: { dialogue: RDialogue }) {
  const { turns, slug, partner } = dialogue;
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState<number | null>(null);
  const [firstTry, setFirstTry] = useState(0);
  const [showTr, setShowTr] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const replies = turns.filter((t) => t.kind === "reply").length;
  const finished = step >= turns.length;

  useEffect(() => {
    if (finished) {
      markSeen(`/dialogue/${slug}`);
      playFeedback("complete");
    }
  }, [finished, slug]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [step, solved, wrong.length]);

  const pick = (turn: Extract<RTurn, { kind: "reply" }>, i: number) => {
    if (solved !== null || wrong.includes(i)) return;
    if (turn.choices[i].ok) {
      setSolved(i);
      playFeedback("correct");
      const first = wrong.length === 0;
      if (first) setFirstTry((n) => n + 1);
      recordAnswer(`dialogue:${slug}:${step}`, first);
    } else {
      setWrong((w) => [...w, i]);
      playFeedback("wrong");
    }
  };
  const next = () => {
    setStep((s) => s + 1);
    setWrong([]);
    setSolved(null);
  };
  const restart = () => {
    setStep(0);
    setWrong([]);
    setSolved(null);
    setFirstTry(0);
  };

  const shown = turns.slice(0, Math.min(step + 1, turns.length));
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted"><T m={(m) => m.dialogue.progress(Math.min(step, turns.length), turns.length)} /></p>
        <button type="button" role="switch" aria-checked={showTr} onClick={() => setShowTr(!showTr)} className="rounded-full border border-line bg-sheet px-4 py-1.5 text-sm font-medium hover:border-indigo">
          <T m={(m) => (showTr ? m.dialogue.hideTranslations : m.dialogue.showTranslations)} />
        </button>
      </div>
      <ol className="mt-4 grid gap-3">
        {shown.map((turn, i) => {
          const current = i === step;
          if (turn.kind === "say") {
            return (
              <li key={i} className="max-w-[92%] sm:max-w-[85%] justify-self-start">
                <div className="rounded-2xl rounded-bl-sm border border-line bg-sheet px-4 py-3">
                  <p className="text-xs font-medium text-seal"><L v={partner} /></p>
                  <div className="mt-1 flex items-start gap-2">
                    <div className="flex-1"><Line line={turn} big /></div>
                    <SpeakButton text={turn.kana.replace(/_/g, "")} />
                  </div>
                  {showTr ? <p className="mt-1.5 text-[15px]"><L v={turn.fr} /></p> : null}
                  {turn.words ? <Words words={turn.words} /> : null}
                </div>
              </li>
            );
          }
          const done = !current || solved !== null;
          const chosen = current ? solved : turn.choices.findIndex((c) => c.ok);
          return (
            <li key={i} className="grid gap-2">
              <p className="text-sm font-medium text-indigo-deep"><T m={(m) => m.dialogue.yourTurn} /> <L v={turn.prompt} /></p>
              {done && chosen !== null && chosen >= 0 && !current ? (
                <div className="max-w-[92%] sm:max-w-[85%] justify-self-end rounded-2xl rounded-br-sm bg-indigo-soft px-4 py-3">
                  <Line line={turn.choices[chosen]} big />
                  {showTr ? <p className="mt-1.5 text-[15px]"><L v={turn.choices[chosen].fr} /></p> : null}
                </div>
              ) : (
                <ul className="grid gap-2">
                  {turn.choices.map((c, ci) => {
                    const isWrong = wrong.includes(ci);
                    const isRight = solved === ci;
                    return (
                      <li key={ci}>
                        <button
                          type="button"
                          onClick={() => pick(turn, ci)}
                          disabled={solved !== null || isWrong}
                          className={cn(
                            "w-full rounded-xl border-2 px-4 py-3 text-left transition-colors",
                            !isWrong && !isRight && solved === null && "border-line bg-sheet hover:border-indigo",
                            isRight && "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
                            isWrong && "border-seal bg-seal-soft",
                            solved !== null && !isRight && !isWrong && "border-line bg-sheet opacity-60",
                          )}
                        >
                          <Line line={c} />
                          {(solved !== null || isWrong) && showTr ? <p className="mt-1 text-[15px]"><L v={c.fr} /></p> : null}
                        </button>
                        {isWrong && c.why ? <p role="status" className="mt-1 px-1 text-sm text-seal"><L v={c.why} /></p> : null}
                        {isRight && c.words ? <Words words={c.words} /> : null}
                      </li>
                    );
                  })}
                </ul>
              )}
              {current && solved !== null ? (
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-emerald-700 dark:text-emerald-300"><T m={(m) => m.dialogue.correct} /></p>
                  <button type="button" onClick={next} autoFocus className="rounded-full bg-indigo px-5 py-2 font-semibold text-on-indigo active:scale-[0.97]"><T m={(m) => (step + 1 < turns.length ? m.dialogue.next : m.dialogue.finish)} /></button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {!finished && turns[step].kind === "say" ? (
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={next} autoFocus className="rounded-full bg-indigo px-5 py-2 font-semibold text-on-indigo active:scale-[0.97]"><T m={(m) => m.dialogue.reply} /></button>
        </div>
      ) : null}
      {finished ? (
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-3xl bg-contrast p-6 text-on-contrast">
          <h2 className="text-xl font-semibold"><T m={(m) => m.dialogue.doneTitle} /></h2>
          <p className="mt-2"><T m={(m) => m.dialogue.score(firstTry, replies)} /></p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={restart} className="rounded-full bg-paper px-5 py-2 font-semibold text-ink active:scale-[0.97]"><T m={(m) => m.dialogue.replay} /></button>
            <Link href="/dialogue" className="rounded-full border border-paper/50 px-5 py-2 font-medium"><T m={(m) => m.dialogue.all} /></Link>
          </div>
        </motion.section>
      ) : null}
      <div ref={endRef} className="scroll-mb-32" />
    </div>
  );
}

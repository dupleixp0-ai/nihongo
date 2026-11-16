"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SrsItem } from "@/data/srs-items";
import { Quiz, type QuizItem } from "@/components/quiz/quiz";
import { useNow } from "@/components/srs/use-now";
import { useAppState } from "@/lib/store";
import { repairDay, useFlame, type FlameView } from "@/lib/streak";
import { daysBetween, MAX_REPAIRABLE, shiftDay } from "@/lib/streak-rules";
import { cn } from "@/lib/utils";
import { FlameIcon } from "./flame";
import { OmamoriIcon } from "./omamori";
import { WeeklySummary } from "./weekly-summary";
import { OmamoriPanel, SealsPanel, StreakGoalPanel, StreakNotices } from "./flame-rewards";
import type { LessonGroups } from "@/lib/achievements";
import { useMessages } from "@/i18n/use-lang";
import type { Messages } from "@/i18n/messages";

/** Bonnes réponses nécessaires sur 10 pour valider un exercice de rattrapage. */
const PASS = 8;

const fmtDay = (key: string, locale: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString(locale, opts);
};

function headline(f: FlameView, t: Messages["flame"]) {
  switch (f.status) {
    case "allumee":
      return { title: t.inARow(f.count), text: t.litText };
    case "en-attente":
      return { title: t.inARow(f.count), text: t.waitingText(Math.max(1, f.goal - f.points)) };
    case "vacille":
      return { title: t.flickerTitle, text: t.flickerText(f.missed.length, f.atStake) };
    case "eteinte":
      return { title: t.outTitle, text: t.outText(MAX_REPAIRABLE, f.lost ?? 0) };
    default:
      return { title: t.newTitle, text: t.newText(f.goal) };
  }
}

export function FlameCenter({ items, groups }: { items: SrsItem[]; groups: LessonGroups }) {
  const now = useNow();
  const flame = useFlame(now);
  const t = useMessages().flame;
  if (!flame.ready) return <div className="h-96" aria-busy="true" />;
  const h = headline(flame, t);
  const big = flame.status === "vacille" ? flame.atStake : flame.status === "eteinte" ? 0 : flame.count;

  return (
    <div className="grid gap-6">
      <StreakNotices />
      <section aria-labelledby="flame-title" className="grid items-center gap-8 rounded-3xl border border-line bg-sheet p-7 sm:p-10 md:grid-cols-[auto_1fr]">
        <div className="relative mx-auto grid size-44 place-items-center rounded-full bg-paper sm:size-52">
          <FlameIcon status={flame.status} className="h-28 w-20 sm:h-32 sm:w-24" />
          <span className="absolute -bottom-3 rounded-full bg-contrast px-4 py-1 text-2xl font-semibold tabular-nums text-on-contrast">{big}</span>
        </div>
        <div>
          <h2 id="flame-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">{h.title}</h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">{h.text}</p>
          <GoalBar flame={flame} />
          <p className="mt-4 text-sm text-muted">
            {t.record(flame.best, flame.goal)}{" "}
            <Link href="/reglages#flamme" className="font-medium text-indigo hover:underline">{t.change}</Link>
          </p>
        </div>
      </section>

      {flame.status === "vacille" ? <RepairPanel flame={flame} items={items} /> : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <StreakGoalPanel now={now} />
        <OmamoriPanel />
      </div>

      <WeeklySummary now={now} variant="full" />

      <Calendar flame={flame} />

      <SealsPanel groups={groups} now={now} />

      <section aria-labelledby="rules-title" className="rounded-3xl border border-line bg-sheet p-6 sm:p-8">
        <h2 id="rules-title" className="text-xl font-semibold tracking-tight">{t.rulesTitle}</h2>
        <ul className="mt-4 grid gap-3 text-[15px] leading-relaxed md:grid-cols-2">
          {t.rules(PASS, MAX_REPAIRABLE).map(([strong, rest]) => (
            <li key={strong}><strong>{strong}</strong>{rest}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function GoalBar({ flame }: { flame: FlameView }) {
  const t = useMessages().flame;
  const ratio = Math.min(1, flame.points / flame.goal);
  return (
    <div className="mt-6 max-w-md">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{t.today}</span>
        <span className="tabular-nums text-muted">{t.ofPoints(Math.min(flame.points, flame.goal), flame.goal)}</span>
      </div>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-line/50" aria-hidden="true">
        <motion.div className="h-full rounded-full bg-seal" initial={false} animate={{ width: `${ratio * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
      </div>
      {ratio < 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/revisions" className="rounded-full bg-indigo px-5 py-2.5 font-semibold text-on-indigo transition-transform active:scale-[0.97]">{t.review}</Link>
          <Link href="/" className="rounded-full border border-line bg-paper px-5 py-2.5 font-semibold transition-colors hover:border-indigo">{t.newLesson}</Link>
        </div>
      ) : null}
    </div>
  );
}

/** Les éléments déjà étudiés, en questions de quiz (avec de quoi compléter si on débute). */
function useRepairPool(items: SrsItem[]): QuizItem[] {
  const { cardsById, progress } = useAppState();
  return useMemo(() => {
    const studied = items.filter((i) => cardsById[i.id] || progress.seen[i.id]);
    const pool = studied.length >= 12 ? studied : [...studied, ...items.filter((i) => i.kind === "hiragana").slice(0, 46)];
    return pool.map((i) =>
      i.kind === "hiragana" || i.kind === "katakana"
        ? { id: i.id, prompt: i.front, answer: i.reading.romaji, group: i.kind }
        : { id: i.id, prompt: i.front, answer: i.reading.kana, answerSub: i.reading.romaji, meaning: i.meaning, meaningTr: i.meaningTr, group: i.kind, accept: i.answers },
    );
  }, [items, cardsById, progress.seen]);
}

function RepairPanel({ flame, items }: { flame: FlameView; items: SrsItem[] }) {
  const pool = useRepairPool(items);
  const [running, setRunning] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const { streak } = useAppState();
  const m = useMessages();
  const t = m.flame;
  // Tous les jours de l'écart (depuis le dernier jour vraiment étudié) : déjà rattrapés, puis ceux qui restent.
  const lastMet = Object.keys(streak.days).filter((k) => streak.days[k].met && k < flame.today).sort().at(-1);
  const gap = lastMet ? daysBetween(lastMet, flame.today) - 1 : 0;
  const all = (gap > 0 ? Array.from({ length: gap }, (_, i) => shiftDay(lastMet!, i + 1)) : flame.missed).filter((d) => !streak.protected.includes(d)).slice(-MAX_REPAIRABLE);
  const remaining = flame.missed.length;
  const steps = all.length;

  const finish = (score: number, total: number) => {
    setRunning(false);
    setResult({ score, total });
    if (score >= PASS) repairDay();
  };

  return (
    <section aria-labelledby="repair-title" className="relative overflow-hidden rounded-3xl bg-contrast p-7 text-on-contrast sm:p-9">
      <h2 id="repair-title" className="text-2xl font-semibold tracking-tight">{t.repairTitle}</h2>
      <p className="mt-2 max-w-prose text-on-contrast/75">{t.repairText(PASS)}</p>
      <ol className="mt-5 flex flex-wrap gap-3">
        {all.map((d) => {
          const done = !flame.missed.includes(d);
          return (
            <li key={d} className={cn("flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm", done ? "border-on-contrast/0 bg-on-contrast/15" : "border-on-contrast/30")}>
              <FlameIcon status={done ? "allumee" : "eteinte"} className="h-4 w-3" />
              <span className="first-letter:uppercase">{fmtDay(d, m.locale)}</span>
              <span className="text-on-contrast/60">{done ? t.repaired : t.toRepair}</span>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        {running ? (
          <motion.div key={`quiz-${attempt}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 rounded-2xl bg-paper p-5 text-ink sm:p-6">
            <Quiz items={pool} mode="kanji" title={t.exercise(steps - remaining + 1, steps)} onClose={() => setRunning(false)} onFinish={finish} />
          </motion.div>
        ) : (
          <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            {result ? (
              <p className="mb-4 text-lg" role="status">
                {result.score >= PASS ? t.passed(result.score, result.total, remaining === 0) : t.failed(result.score, result.total, PASS)}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setAttempt((a) => a + 1);
                setRunning(true);
              }}
              className="rounded-full bg-on-contrast px-6 py-3.5 font-semibold text-contrast transition-transform active:scale-[0.97]"
            >
              {result && result.score < PASS ? t.retry : t.start(steps - remaining + 1, steps)}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Les cinq dernières semaines, lundi en premier. */
function Calendar({ flame }: { flame: FlameView }) {
  const { streak } = useAppState();
  const msg = useMessages();
  const t = msg.flame;
  const [y, m, d] = flame.today.split("-").map(Number);
  const weekday = (new Date(y, m - 1, d, 12).getDay() + 6) % 7; // 0 = lundi
  const start = shiftDay(flame.today, -weekday - 28);
  const days = Array.from({ length: 35 }, (_, i) => shiftDay(start, i));
  const label = t.weekdays;

  return (
    <section aria-labelledby="cal-title" className="rounded-3xl border border-line bg-sheet p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="cal-title" className="text-xl font-semibold tracking-tight">{t.calendar}</h2>
        <p className="flex flex-wrap gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5"><FlameIcon status="allumee" className="h-4 w-3" /> {t.legendMet}</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-full border-2 border-dashed border-seal" /> {t.legendRepaired}</span>
          <span className="flex items-center gap-1.5"><OmamoriIcon className="h-4 w-3" /> {t.legendOmamori}</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-seal/25" /> {t.legendSome}</span>
        </p>
      </div>
      <div className="mt-5 grid max-w-xl grid-cols-7 gap-1.5 sm:gap-2">
        {label.map((l, i) => <span key={i} className="pb-1 text-center text-xs font-semibold text-muted">{l}</span>)}
        {days.map((k) => {
          const a = streak.days[k];
          const repaired = streak.repaired.includes(k);
          const kept = streak.protected.includes(k);
          const future = k > flame.today;
          const day = Number(k.slice(8));
          return (
            <div
              key={k}
              title={t.dayTitle(fmtDay(k, msg.locale), a?.points ?? 0, repaired, kept)}
              className={cn(
                "relative grid aspect-square place-items-center rounded-xl border text-xs",
                future ? "border-transparent text-muted/40" : "border-line/70 bg-paper",
                k === flame.today && "ring-2 ring-indigo ring-offset-2 ring-offset-sheet",
                repaired && "border-2 border-dashed border-seal",
              )}
            >
              {kept ? (
                <OmamoriIcon className="h-[55%] w-[38%]" />
              ) : a?.met || repaired ? (
                <FlameIcon status={a?.met ? "allumee" : "en-attente"} className="h-[55%] w-[42%]" />
              ) : a && a.points > 0 ? (
                <span className="size-2.5 rounded-full bg-seal/25" />
              ) : null}
              <span className={cn("absolute left-1.5 top-1 text-[10px] tabular-nums text-muted/70", (a?.met || repaired || kept) && "hidden sm:block")}>{day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

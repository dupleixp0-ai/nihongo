"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LessonGroups } from "@/lib/achievements";
import { useSeals } from "@/lib/use-seals";
import { FLAMES, INKS } from "@/lib/palettes";
import Link from "next/link";
import { useAppState } from "@/lib/store";
import { chooseStreakGoal, dismissNotices, useStreakGoal } from "@/lib/streak";
import { GOAL_TIERS, OMAMORI_MAX, suggestedTier } from "@/lib/streak-rules";
import { cn } from "@/lib/utils";
import { FlameIcon } from "./flame";
import { OmamoriIcon } from "./omamori";
import { useLang, useMessages } from "@/i18n/use-lang";

const fmtDay = (key: string, locale: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
};

/** Annonces : omamori utilisé, but atteint. */
export function StreakNotices({ compact = false }: { compact?: boolean }) {
  const { streak } = useAppState();
  const m = useMessages();
  const r = m.rewards;
  if (streak.notices.length === 0) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label={r.news}
      className={cn("flex flex-wrap items-center gap-4 rounded-3xl border-2 border-seal/50 bg-seal-soft px-5 py-4", compact ? "mt-4" : "")}
    >
      <ul className="grid flex-1 gap-1.5">
        {streak.notices.map((n, i) => (
          <li key={i} className="flex items-center gap-3">
            {n.kind === "protected" ? <OmamoriIcon className="h-8 w-6 shrink-0" /> : <FlameIcon status="allumee" className="h-8 w-6 shrink-0" />}
            <span>
              {n.kind === "protected" ? (
                <>
                  <strong>{r.protected}</strong>
                  {r.covered(n.days.map((d) => fmtDay(d, m.locale)).join(", "), n.days.length)}
                </>
              ) : (
                <>
                  <strong>{r.goalReached(n.days)}</strong>
                  {r.reward(n.reward)}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={dismissNotices} className="rounded-full bg-contrast px-4 py-2 text-sm font-semibold text-on-contrast">
        {r.ok}
      </button>
    </motion.section>
  );
}

/** Le but de série : en choisir un, puis suivre sa progression. */
export function StreakGoalPanel({ now }: { now: number }) {
  const { streak } = useAppState();
  const { goal, progress } = useStreakGoal(now);
  const [changing, setChanging] = useState(false);
  const r = useMessages().rewards;
  const suggested = suggestedTier(streak);
  const tier = goal ? GOAL_TIERS.find((t) => t.days === goal.days) : null;
  const showChooser = !goal || changing;

  return (
    <section aria-labelledby="goal-title" className="rounded-3xl border border-line bg-sheet p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="goal-title" className="text-xl font-semibold tracking-tight">{r.goalTitle}</h2>
        {streak.goalsDone.length ? (
          <p className="text-sm text-muted">{r.goalsDone(streak.goalsDone.length)}</p>
        ) : null}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {showChooser ? (
          <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="mt-2 text-muted">
              {goal ? r.changeResets : r.chooseText}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {GOAL_TIERS.map((t) => {
                const recommended = t.days === suggested;
                return (
                  <button
                    key={t.days}
                    type="button"
                    onClick={() => {
                      chooseStreakGoal(t.days);
                      setChanging(false);
                    }}
                    className={cn(
                      "relative flex flex-col items-start rounded-2xl border-2 px-4 py-4 text-left transition-[border-color,transform] active:scale-[0.98]",
                      recommended ? "border-seal bg-seal-soft" : "border-line bg-paper hover:border-seal/50",
                    )}
                  >
                    {recommended ? <span className="absolute -top-2.5 right-3 rounded-full bg-seal px-2 py-0.5 text-xs font-semibold text-white">{r.recommended}</span> : null}
                    <span className="text-3xl font-semibold tabular-nums">{t.days}</span>
                    <span className="text-sm font-medium">{r.daysTier(r.tier[t.days])}</span>
                    <span className="mt-2 flex items-center gap-1 text-sm text-muted">
                      {Array.from({ length: t.reward }, (_, i) => <OmamoriIcon key={i} className="h-5 w-3.5" />)}
                      <span className="ml-1">{r.omamoriCount(t.reward)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {goal ? (
              <button type="button" onClick={() => setChanging(false)} className="mt-4 text-sm font-medium text-muted hover:text-ink">{r.keep}</button>
            ) : null}
          </motion.div>
        ) : (
          <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4">
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-4xl font-semibold tabular-nums">{progress}</span>
              <span className="text-lg text-muted">{r.outOf(goal!.days, tier ? r.tier[tier.days] : "")}</span>
            </p>
            <div className="mt-3 flex gap-1" aria-label={r.progress(progress, goal!.days)} role="img">
              {Array.from({ length: goal!.days }, (_, i) => (
                <span key={i} className={cn("h-3 flex-1 rounded-full", i < progress ? "bg-seal" : "bg-line/50")} />
              ))}
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[15px]">
              {r.rewardLabel} {Array.from({ length: tier?.reward ?? 1 }, (_, i) => <OmamoriIcon key={i} className="h-5 w-3.5" />)}
              {r.left(tier?.reward ?? 1, Math.max(0, goal!.days - progress))}
            </p>
            <button type="button" onClick={() => setChanging(true)} className="mt-3 text-sm font-medium text-muted hover:text-ink">{r.change}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** La réserve d'omamori. */
export function OmamoriPanel() {
  const { streak } = useAppState();
  const r = useMessages().rewards;
  return (
    <section aria-labelledby="omamori-title" className="rounded-3xl border border-line bg-sheet p-6 sm:p-8">
      <h2 id="omamori-title" className="text-xl font-semibold tracking-tight">
        Omamori <span lang="ja" className="font-kana text-base font-normal text-muted">{r.omamoriReading}</span>
      </h2>
      <div className="mt-4 flex items-end gap-2" aria-label={r.omamoriOf(streak.omamori, OMAMORI_MAX)} role="img">
        {Array.from({ length: OMAMORI_MAX }, (_, i) => (
          <OmamoriIcon key={i} empty={i >= streak.omamori} className="h-14 w-10" />
        ))}
      </div>
      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
        {r.omamoriText(OMAMORI_MAX)}
      </p>
    </section>
  );
}

/** Les sceaux : récompenses personnelles. */
export function SealsPanel({ groups, now }: { groups: LessonGroups; now: number }) {
  const { seals, earned } = useSeals(groups, now);
  const r = useMessages().rewards;
  const lang = useLang();
  const next = [...FLAMES, ...INKS].filter((p) => p.seals > earned).sort((a, b) => a.seals - b.seals)[0];

  return (
    <section aria-labelledby="seals-title" className="rounded-3xl border border-line bg-sheet p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="seals-title" className="text-xl font-semibold tracking-tight">
          {r.sealsTitle} <span lang="ja" className="font-kana text-base font-normal text-muted">印 · いん · in</span>
        </h2>
        <p className="text-sm text-muted">{r.sealsOf(earned, seals.length)}</p>
      </div>
      <p className="mt-2 text-[15px] text-muted">
        {r.sealsText}{" "}
        <Link href="/reglages#apparence" className="font-medium text-indigo hover:underline">{r.sealsLink}</Link>.
        {next ? r.nextColor(next[lang], next.seals) : r.allColors}
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {seals.map((s, i) => {
          const done = s.value >= s.target;
          return (
            <li key={s.id} className={cn("flex flex-col items-center rounded-2xl border p-4 text-center", done ? "border-seal/40 bg-paper" : "border-line/70 bg-paper/50")}>
              <span
                lang="ja"
                className={cn(
                  "font-kana grid size-16 place-items-center rounded-[6px] text-4xl",
                  done ? "bg-seal text-white shadow-[inset_0_0_0_3px_rgba(255,255,255,0.25)]" : "border-2 border-dashed border-line text-line",
                )}
                style={done ? { transform: `rotate(${(i % 3) * 3 - 3}deg)` } : undefined}
              >
                {s.glyph}
              </span>
              <span className="mt-3 font-semibold leading-tight">{r.seals[s.id]?.title ?? s.title}</span>
              <span lang="ja" className="font-kana mt-1 text-sm">{s.word}{s.kana !== s.word ? <> <span className="text-indigo-deep">{s.kana}</span></> : null}</span>
              <span className="text-xs text-muted">{s.romaji}</span>
              <span className="mt-2 text-xs leading-snug text-muted">{r.seals[s.id]?.text ?? s.text}</span>
              {done ? null : (
                <span className="mt-2 w-full">
                  <span className="block h-1.5 overflow-hidden rounded-full bg-line/50">
                    <span className="block h-full rounded-full bg-indigo" style={{ width: `${Math.min(100, (s.value / s.target) * 100)}%` }} />
                  </span>
                  <span className="mt-1 block text-xs tabular-nums text-muted">{Math.min(s.value, s.target)} / {s.target}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

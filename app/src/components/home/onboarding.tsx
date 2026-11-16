"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { setSettings, useAppState } from "@/lib/store";
import { getNotifier } from "@/lib/reminders";
import { DAILY_GOALS } from "@/lib/daily-goals";
import type { Settings } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import { useMessages } from "@/i18n/use-lang";
import { LanguagePicker } from "@/components/site/language-picker";

type Level = NonNullable<Settings["startLevel"]>;

const LEVELS: { id: Level; glyph: string }[] = [
  { id: "debutant", glyph: "あ" },
  { id: "hiragana", glyph: "ア" },
  { id: "kana", glyph: "日" },
  { id: "n4", glyph: "N4" },
];

const STEPS = ["bienvenue", "niveau", "objectif", "rappel"] as const;

/**
 * Présentation de départ : niveau, objectif quotidien et rappel, puis la première leçon adaptée.
 * Affichée au premier lancement (et depuis les réglages pour la revoir).
 */
export function Onboarding({ firstLesson }: { firstLesson: Record<Level, { href: string; character: string; label: string }> }) {
  const { settings } = useAppState();
  const m = useMessages();
  const o = m.onboarding;
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<Level>(settings.startLevel ?? "debutant");
  const [goal, setGoal] = useState(settings.dailyGoal);
  const [reminder, setReminder] = useState(settings.reminder);
  const [notice, setNotice] = useState<string | null>(null);

  const finish = (go: boolean) => {
    setSettings({ ...settings, onboarded: true, startLevel: level, dailyGoal: goal, reminder });
    if (go) router.push(firstLesson[level].href);
  };

  const toggleReminder = async (on: boolean) => {
    setNotice(null);
    if (on) {
      const notifier = getNotifier();
      const answer = notifier.permission() === "granted" ? "granted" : await notifier.request();
      if (answer !== "granted") {
        setNotice(answer === "unsupported" ? o.unsupported : o.denied);
        return;
      }
    }
    setReminder({ ...reminder, enabled: on });
  };

  const current = STEPS[step];
  const glyph = LEVELS.find((l) => l.id === level)!.glyph;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-paper" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="mx-auto flex min-h-full w-full max-w-xl flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-8 sm:pt-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1.5" aria-label={o.steps(step + 1, STEPS.length)}>
            {STEPS.map((s, i) => (
              <span key={s} className={cn("h-1.5 w-8 rounded-full transition-colors", i <= step ? "bg-indigo" : "bg-line")} />
            ))}
          </div>
          <button type="button" onClick={() => finish(false)} className="text-sm font-medium text-muted hover:text-ink">
            {m.common.skip}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="flex flex-1 flex-col pt-10 sm:pt-14"
          >
            {current === "bienvenue" ? (
              <>
                <div className="bg-genko inline-grid place-items-center self-start rounded-2xl border border-line px-5 pb-3 pt-5">
                  <ruby lang="ja" className="font-kana text-5xl text-brush">
                    日本語
                    <rt className="text-[0.3em] text-indigo">にほんご</rt>
                  </ruby>
                </div>
                <p className="mt-6 text-sm text-muted">
                  <span lang="ja" className="font-kana text-base text-seal">ようこそ</span> · yōkoso · {o.welcome}
                </p>
                <h1 id="onboarding-title" className="mt-1 text-4xl font-semibold tracking-tight">{o.title}</h1>
                <ul className="mt-6 grid gap-3 text-lg leading-relaxed text-muted">
                  {o.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <p className="mt-6 text-muted">{o.three}</p>
                <div className="mt-6">
                  <p className="mb-2 text-sm font-medium">{o.language}</p>
                  <LanguagePicker label={o.language} />
                </div>
              </>
            ) : current === "niveau" ? (
              <>
                <h1 id="onboarding-title" className="text-3xl font-semibold tracking-tight">{o.levelTitle}</h1>
                <p className="mt-2 text-muted">{o.levelText}</p>
                <div className="mt-6 grid gap-2.5" role="radiogroup" aria-label={o.levelLabel}>
                  {LEVELS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      role="radio"
                      aria-checked={level === l.id}
                      onClick={() => setLevel(l.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors",
                        level === l.id ? "border-indigo bg-indigo-soft" : "border-line bg-sheet hover:border-indigo/50",
                      )}
                    >
                      <span lang={l.glyph === "N4" ? undefined : "ja"} className={cn("grid size-12 shrink-0 place-items-center rounded-xl bg-paper text-2xl", l.glyph !== "N4" ? "font-kana" : "font-semibold")}>{l.glyph}</span>
                      <span>
                        <span className="block font-semibold">{o.levels[l.id].title}</span>
                        <span className="block text-sm text-muted">{o.levels[l.id].text}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : current === "objectif" ? (
              <>
                <h1 id="onboarding-title" className="text-3xl font-semibold tracking-tight">{o.goalTitle}</h1>
                <p className="mt-2 text-muted">{o.goalText}</p>
                <div className="mt-6 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label={o.goalLabel}>
                  {DAILY_GOALS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      role="radio"
                      aria-checked={goal === g.value}
                      onClick={() => setGoal(g.value)}
                      className={cn(
                        "rounded-2xl border-2 px-4 py-3.5 text-left transition-colors",
                        goal === g.value ? "border-indigo bg-indigo-soft" : "border-line bg-sheet hover:border-indigo/50",
                      )}
                    >
                      <span className="block font-semibold">{m.goals[g.value].label}</span>
                      <span className="block text-sm text-indigo-deep">{m.common.points(g.value)}</span>
                      <span className="mt-1 block text-sm text-muted">{m.goals[g.value].example}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 id="onboarding-title" className="text-3xl font-semibold tracking-tight">{o.reminderTitle}</h1>
                <p className="mt-2 text-muted">{o.reminderText}</p>
                <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-sheet p-4">
                  <label className="flex items-center justify-between gap-4">
                    <span className="font-medium">{o.reminderOn}</span>
                    <input
                      type="checkbox"
                      role="switch"
                      checked={reminder.enabled}
                      onChange={(e) => void toggleReminder(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-indigo", reminder.enabled ? "bg-indigo" : "bg-line")}
                    >
                      <span className={cn("absolute top-0.5 size-6 rounded-full bg-white shadow transition-[left]", reminder.enabled ? "left-[1.375rem]" : "left-0.5")} />
                    </span>
                  </label>
                  <label className={cn("flex items-center justify-between gap-4", !reminder.enabled && "opacity-50")}>
                    <span className="font-medium">{o.reminderTime}</span>
                    <input
                      type="time"
                      value={reminder.time}
                      disabled={!reminder.enabled}
                      onChange={(e) => e.target.value && setReminder({ ...reminder, time: e.target.value })}
                      className="rounded-xl border border-line bg-paper px-3 py-2 text-base tabular-nums"
                    />
                  </label>
                </div>
                {notice ? <p className="mt-3 text-sm text-seal" role="status">{notice}</p> : null}
                <p className="mt-3 text-sm text-muted">{o.reminderNote}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 grid gap-2">
          {current === "rappel" ? (
            <button type="button" onClick={() => finish(true)} className="flex items-center justify-center gap-3 rounded-2xl bg-indigo py-4 text-lg font-semibold text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] active:scale-[0.98]">
              <span lang={glyph === "N4" ? undefined : "ja"} className={cn("grid size-8 place-items-center rounded-lg bg-on-indigo/15", glyph === "N4" ? "text-sm" : "font-kana text-xl")}>{glyph}</span>
              {o.begin(o.firstLessons[level])}
            </button>
          ) : (
            <button type="button" onClick={() => setStep((s) => s + 1)} className="rounded-2xl bg-indigo py-4 text-lg font-semibold text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] active:scale-[0.98]">
              {step === 0 ? o.start : m.common.continue}
            </button>
          )}
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="py-2 text-sm font-medium text-muted hover:text-ink">
              {m.common.back}
            </button>
          ) : null}
          {current === "rappel" ? (
            <button type="button" onClick={() => finish(false)} className="py-2 text-sm font-medium text-muted hover:text-ink">
              {o.homeFirst}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

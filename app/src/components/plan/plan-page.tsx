"use client";

import Link from "next/link";
import { isFreeId } from "@/data/access";
import { usePremium } from "@/lib/billing";
import { LockBadge } from "@/components/site/gate";
import { useMemo, useState } from "react";
import type { PlanStep } from "@/data/plan";
import { computePlan, markStep, type StepStatus } from "@/lib/plan";
import { addCards } from "@/lib/srs";
import { setSettings, useAppState } from "@/lib/store";
import { useMessages } from "@/i18n/use-lang";
import { useNow } from "@/components/srs/use-now";
import { cn } from "@/lib/utils";

const isCardId = (id: string) => /^(mot|verbe):/.test(id);

export function PlanPage({ steps }: { steps: PlanStep[] }) {
  const app = useAppState();
  const now = useNow(60_000);
  const m = useMessages();
  const p = m.plan;
  const [notice, setNotice] = useState<string | null>(null);
  const plan = useMemo(() => (app.ready && now ? computePlan(steps, app, now) : null), [app, steps, now]);
  const premium = usePremium();
  const cardIds = useMemo(() => new Set(app.cards.map((c) => c.id)), [app.cards]);
  if (!plan) return <div className="h-96" aria-busy="true" />;

  const titleOf = (s: PlanStep) => (s.kind === "review" ? p.steps.revision : p.steps[s.id as keyof typeof p.steps]);
  const set = (id: string, as: "done" | "skipped" | "open") => setSettings(markStep(app.settings, id, as));

  return (
    <div>
      <div className="max-w-md">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">{p.progress(plan.percent)}</span>
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-line/50" role="progressbar" aria-valuenow={plan.percent} aria-valuemin={0} aria-valuemax={100} aria-label={p.progress(plan.percent)}>
          <div className="h-full rounded-full bg-indigo" style={{ width: `${plan.percent}%` }} />
        </div>
      </div>
      {!plan.current ? <p className="mt-6 rounded-2xl border border-line bg-sheet p-5">{p.allDone} <Link href="/examen" className="font-medium text-indigo hover:text-indigo-deep">{p.exam}</Link></p> : null}
      <ol className="mt-8 grid gap-3">
        {plan.steps.map((st) => (
          <li key={st.step.id}>
            <Step st={st} index={plan.steps.indexOf(st) + 1} />
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">{p.reviewNote}</p>
      {notice ? <p role="status" className="sr-only">{notice}</p> : null}
    </div>
  );

  function Step({ st, index }: { st: StepStatus; index: number }) {
    const { step, state } = st;
    const t = titleOf(step);
    const current = state === "current";
    const missing = step.ids.filter((id) => isCardId(id) && !cardIds.has(id) && (premium === true || isFreeId(id)));
    const lockedId = premium === false ? step.ids.find((id) => !isFreeId(id)) : undefined;
    const covered = step.covers?.map((c) => p.steps[c as keyof typeof p.steps].title).join(" · ");
    return (
      <div className={cn("rounded-2xl border p-4 sm:p-5", current ? "border-transparent bg-contrast text-on-contrast" : "border-line bg-sheet", state === "todo" && "opacity-80")}>
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className={cn("mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums", current ? "bg-paper text-ink" : state === "todo" ? "border border-line text-muted" : "bg-emerald-600 text-white")}>
            {state === "done" || state === "auto" || state === "skipped" ? "✓" : index}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="flex items-center gap-2 text-lg font-semibold leading-snug">{t.title}{lockedId ? <LockBadge id={lockedId} /> : null}</h2>
            <p className={cn("mt-0.5 text-[15px]", current ? "opacity-90" : "text-muted")}>{t.text}</p>
            {covered ? <p className={cn("mt-1 text-sm", current ? "opacity-80" : "text-muted")}>{covered}</p> : null}
            <p className={cn("mt-1.5 text-sm", current ? "opacity-80" : "text-muted")}>
              <span className="sr-only">{p.states[state] ?? p.current} : </span>
              {step.kind === "review" ? p.due(st.due) : state === "auto" || state === "skipped" ? p.states[state] : p.count(st.met, st.total)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {current ? (
                <>
                  <Link href={step.href} className="rounded-full bg-paper px-5 py-2 font-semibold text-ink active:scale-[0.97]">{step.kind === "review" ? p.review : st.met > 0 ? p.keepGoing : p.start}</Link>
                  {missing.length ? (
                    <button type="button" onClick={() => { addCards(missing); setNotice(p.added(missing.length)); }} className="rounded-full border border-paper/50 px-4 py-2 font-medium active:scale-[0.97]">{p.addCards(missing.length)}</button>
                  ) : null}
                  {step.kind === "review" ? <button type="button" onClick={() => set(step.id, "done")} className="rounded-full border border-paper/50 px-4 py-2 font-medium active:scale-[0.97]">{p.markDone}</button> : null}
                  <button type="button" onClick={() => set(step.id, "skipped")} className="px-3 py-2 text-sm underline-offset-2 hover:underline">{p.skip}</button>
                </>
              ) : state === "skipped" || state === "done" ? (
                <>
                  <Link href={step.href} className="rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:border-indigo">{step.kind === "review" ? p.review : p.start}</Link>
                  {app.settings.plan?.skipped.includes(step.id) || app.settings.plan?.done.includes(step.id) ? <button type="button" onClick={() => set(step.id, "open")} className="px-3 py-1.5 text-sm text-muted underline-offset-2 hover:text-ink hover:underline">{p.reopen}</button> : null}
                </>
              ) : (
                <>
                  <Link href={step.href} className="rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:border-indigo">{step.kind === "review" ? p.review : p.start}</Link>
                  <button type="button" onClick={() => set(step.id, "skipped")} className="px-3 py-1.5 text-sm text-muted underline-offset-2 hover:text-ink hover:underline">{p.skip}</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

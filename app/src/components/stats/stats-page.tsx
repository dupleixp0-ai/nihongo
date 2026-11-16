"use client";

import Link from "next/link";
import { useMemo } from "react";
import { nextLesson, computeStats, type Mastery, type StatItem, type Tally } from "@/lib/stats";
import { useAppState } from "@/lib/store";
import { useMessages } from "@/i18n/use-lang";
import { cn } from "@/lib/utils";
import type { Messages } from "@/i18n/messages";
import { useNow } from "@/components/srs/use-now";

export type StatsItem = StatItem & { front: string; href: string };
export type StatsLesson = { href: string; character: string };

const ORDER: Mastery[] = ["acquired", "learning", "fragile", "new"];
const TONE: Record<Mastery, string> = {
  acquired: "bg-emerald-600 dark:bg-emerald-500",
  learning: "bg-indigo",
  fragile: "bg-seal",
  new: "bg-line",
};
const KINDS: StatItem["kind"][] = ["hiragana", "katakana", "kanji", "mot", "verbe"];

export function StatsPage({ items, lessons }: { items: StatsItem[]; lessons: StatsLesson[] }) {
  const app = useAppState();
  const now = useNow(60_000);
  const m = useMessages();
  const s = m.stats;
  const frontById = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const stats = useMemo(() => (app.ready && now ? computeStats(app, items, now) : null), [app, items, now]);

  if (!stats) return <div className="h-96" aria-busy="true" />;

  const date = (key: string, opts: Intl.DateTimeFormatOptions) => new Date(`${key}T12:00:00`).toLocaleDateString(m.locale, opts);
  const hasData = app.cards.length > 0 || stats.totalReviews > 0 || stats.lessonsOpened > 0;
  if (!hasData) return <p className="rounded-2xl border border-line bg-sheet p-6 text-muted">{s.empty}</p>;

  const next = nextLesson(lessons.map((l) => l.href), app.progress);
  const nextInfo = lessons.find((l) => l.href === next);
  const max = Math.max(1, ...stats.days.map((d) => d.reviews));
  const fragile = stats.fragileIds.slice(0, 12).map((id) => frontById.get(id)).filter((i): i is StatsItem => !!i);

  const facts: [string, string][] = [
    [s.summary.streak, s.unit.days(stats.streak)],
    [s.summary.best, s.unit.days(stats.bestStreak)],
    [s.summary.active, `${stats.activeDays30} / 30`],
    [s.summary.retention, stats.retention30 === null ? s.unit.none : `${stats.retention30} %`],
    [s.summary.total, String(stats.totalReviews)],
    [s.summary.lessons, String(stats.lessonsOpened)],
  ];

  return (
    <div className="grid gap-10">
      <section aria-label={s.title}>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line bg-sheet px-4 py-3.5">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="mt-0.5 text-2xl font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
        {stats.firstDay ? <p className="mt-3 text-sm text-muted">{s.since(date(stats.firstDay, { day: "numeric", month: "long", year: "numeric" }))}</p> : null}
      </section>

      <section aria-labelledby="st-next" className="rounded-3xl bg-contrast p-6 text-on-contrast sm:p-8">
        <h2 id="st-next" className="text-xl font-semibold">{s.nextTitle}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {stats.dueNow > 0 ? (
            <>
              <p>{s.nextReview(stats.dueNow)}</p>
              <Link href="/revisions" className="rounded-full bg-paper px-5 py-2.5 font-semibold text-ink active:scale-[0.97]">{s.nextReviewGo}</Link>
            </>
          ) : nextInfo ? (
            <>
              <p>{s.nextLesson}</p>
              <Link href={nextInfo.href} className="rounded-full bg-paper px-5 py-2.5 text-xl text-ink active:scale-[0.97]">
                <span lang="ja" className="font-kana">{nextInfo.character}</span>
              </Link>
            </>
          ) : (
            <p>{s.nextDone}</p>
          )}
        </div>
      </section>

      <section aria-labelledby="st-scripts">
        <h2 id="st-scripts" className="text-2xl font-semibold tracking-tight">{s.scriptsTitle}</h2>
        <Legend s={s} />
        <ul className="mt-4 grid gap-4">
          {KINDS.map((k) => (
            <li key={k}>
              <TallyBar s={s} label={m.kinds[k]} tally={stats.byKind[k]} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="st-levels">
        <h2 id="st-levels" className="text-2xl font-semibold tracking-tight">{s.levelsTitle}</h2>
        <p className="mt-1 text-sm text-muted">{s.levelsNote}</p>
        <ul className="mt-4 grid gap-4">
          {(["N5", "N4"] as const).map((lv) => (
            <li key={lv}>
              <TallyBar s={s} label={lv} tally={stats.byLevel[lv]} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="st-days">
        <h2 id="st-days" className="text-2xl font-semibold tracking-tight">{s.daysTitle}</h2>
        <ul className="mt-4 flex h-40 items-end gap-1.5 sm:gap-2">
          {stats.days.map((d, i) => {
            const label = s.dayLabel(date(d.key, { weekday: "long", day: "numeric", month: "long" }), d.reviews, d.good);
            return (
              <li key={d.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1" aria-label={label} title={label}>
                <div className="flex w-full flex-1 items-end">
                  <div className="flex w-full flex-col justify-end overflow-hidden rounded-t-md bg-seal/30" style={{ height: `${(d.reviews / max) * 100}%`, minHeight: d.reviews ? 4 : 0 }}>
                    <div className="w-full bg-indigo" style={{ height: d.reviews ? `${(d.good / d.reviews) * 100}%` : 0 }} />
                  </div>
                </div>
                <span aria-hidden="true" className={cn("text-[11px] tabular-nums text-muted", i % 2 === (stats.days.length - 1) % 2 ? "" : "invisible sm:visible")}>
                  {date(d.key, { day: "numeric" })}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="st-fragile">
        <h2 id="st-fragile" className="text-2xl font-semibold tracking-tight">{s.fragileTitle}</h2>
        <p className="mt-1 text-sm text-muted">{s.fragileText}</p>
        {fragile.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {fragile.map((i) => (
              <li key={i.id}>
                <Link href={i.href} className="block rounded-lg border border-seal/40 bg-seal-soft px-3 py-1.5 text-xl hover:border-seal">
                  <span lang="ja" className="font-kana">{i.front}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-muted">{s.fragileNone}</p>
        )}
      </section>
    </div>
  );
}

function Legend({ s }: { s: Messages["stats"] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {ORDER.map((k) => (
        <li key={k} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-3 rounded-sm", TONE[k])} />
          {s.mastery[k]}
        </li>
      ))}
    </ul>
  );
}

function TallyBar({ s, label, tally }: { s: Messages["stats"]; label: string; tally: Tally }) {
  const started = tally.acquired + tally.learning + tally.fragile;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-medium">{label}</span>
        <span className="text-sm tabular-nums text-muted">{s.count(started, tally.total)}</span>
      </div>
      <div
        role="img"
        aria-label={`${label} : ${ORDER.map((k) => `${s.mastery[k]} ${tally[k]}`).join(", ")}`}
        className="mt-1.5 flex h-3.5 overflow-hidden rounded-full bg-line/50"
      >
        {ORDER.filter((k) => k !== "new").map((k) => (tally[k] ? <div key={k} className={TONE[k]} style={{ width: `${(tally[k] / Math.max(1, tally.total)) * 100}%` }} /> : null))}
      </div>
      <p className="mt-1 text-sm tabular-nums text-muted">
        {ORDER.filter((k) => k !== "new").map((k) => `${s.mastery[k]} ${tally[k]}`).join(" · ")}
      </p>
    </div>
  );
}

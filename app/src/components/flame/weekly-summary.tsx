"use client";

import { useAppState } from "@/lib/store";
import { dismissWeeklySummary } from "@/lib/streak";
import { dayKey, shiftDay } from "@/lib/streak-rules";
import { mondayOf, weekReport, type WeekReport } from "@/lib/weekly";
import { cn } from "@/lib/utils";
import { useMessages } from "@/i18n/use-lang";
import type { Messages } from "@/i18n/messages";

const fmt = (key: string, locale: string, opts: Intl.DateTimeFormatOptions) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString(locale, opts);
};

function trend(now: number, before: number, w: Messages["weekly"]) {
  if (before === 0) return now > 0 ? w.firstWeek : "";
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) return w.same;
  return w.versus(pct);
}

function sentence(r: WeekReport, w: Messages["weekly"]) {
  if (r.points === 0) return w.calm;
  if (r.daysMet === 7) return w.perfect;
  if (r.daysMet >= 5) return w.solid;
  if (r.daysMet >= 3) return w.rhythm;
  return w.start;
}

/**
 * Bilan de la semaine.
 * - « dashboard » : sur l'accueil, le dimanche (semaine en cours) et le lundi (semaine passée), jusqu'à fermeture.
 * - « full » : sur la page Flamme, toujours visible.
 */
export function WeeklySummary({ now, variant }: { now: number; variant: "dashboard" | "full" }) {
  const app = useAppState();
  const m = useMessages();
  const w = m.weekly;
  if (!app.ready || !now) return null;
  const today = dayKey(now);
  const weekday = (new Date(now).getDay() + 6) % 7; // 0 = lundi, 6 = dimanche
  const thisMonday = mondayOf(today);
  const monday = variant === "dashboard" && weekday === 0 ? shiftDay(thisMonday, -7) : thisMonday;

  if (variant === "dashboard") {
    if (weekday !== 6 && weekday !== 0) return null;
    if (app.streak.summarySeen === monday) return null;
  }

  const report = weekReport(app, monday);
  const previous = weekReport(app, shiftDay(monday, -7));
  if (variant === "dashboard" && report.points === 0 && previous.points === 0) return null;

  const stats = [
    { value: `${report.daysMet}/7`, label: w.daysMet },
    { value: report.points, label: w.points },
    { value: report.reviews, label: w.reviews(report.reviews ? report.good : null) },
    { value: report.lessons, label: w.lessons(report.kanji) },
    { value: report.newCards, label: w.newCards },
  ];
  const title = monday === thisMonday ? w.thisWeek : w.lastWeek;
  const tr = trend(report.points, previous.points, w);

  return (
    <section aria-labelledby={`week-${variant}`} className={cn("rounded-3xl border border-line bg-sheet p-6 sm:p-8", variant === "dashboard" && "mt-4")}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`week-${variant}`} className="text-xl font-semibold tracking-tight">
          {title} <span className="text-base font-normal text-muted">{w.range(fmt(report.start, m.locale, { day: "numeric", month: "long" }), fmt(report.end, m.locale, { day: "numeric", month: "long" }))}</span>
        </h2>
        {variant === "dashboard" ? (
          <button type="button" onClick={() => dismissWeeklySummary(monday)} className="text-sm font-medium text-muted hover:text-ink">
            {w.close}
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-[15px]">{sentence(report, w)} {tr ? <span className="text-muted">{w.pointsTrend(tr)}</span> : null}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-paper px-4 py-3">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="text-2xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      {report.bestDay ? (
        <p className="mt-4 text-sm text-muted">
          {w.bestDay(fmt(report.bestDay.key, m.locale, { weekday: "long", day: "numeric", month: "long" }), report.bestDay.points)}
        </p>
      ) : null}
    </section>
  );
}

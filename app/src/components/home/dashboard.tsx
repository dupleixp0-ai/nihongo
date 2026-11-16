"use client";

import Link from "next/link";
import { isFreeId } from "@/data/access";
import { usePremium } from "@/lib/billing";
import { UnlockBanner } from "@/components/site/gate";
import { useMemo } from "react";
import type { Script } from "@/data/catalog";
import type { SrsItem } from "@/data/srs-items";
import { useAppState } from "@/lib/store";
import { buildQueue, formatDelay, isAnchored, nextDue } from "@/lib/srs";
import { claimKanjiOfTheDayBonus, useFlame, useStreakGoal } from "@/lib/streak";
import { WeeklySummary } from "@/components/flame/weekly-summary";
import { OmamoriIcon } from "@/components/flame/omamori";
import { StreakNotices } from "@/components/flame/flame-rewards";
import { dayKey, shiftDay } from "@/lib/streak-rules";
import { FlameIcon } from "@/components/flame/flame";
import { CardToggle } from "@/components/srs/card-toggle";
import { useNow } from "@/components/srs/use-now";
import { Onboarding } from "./onboarding";
import type { PlanStep } from "@/data/plan";
import { computePlan } from "@/lib/plan";
import { L, T } from "@/i18n/t";
import { useLang, useMessages } from "@/i18n/use-lang";
import { cn } from "@/lib/utils";

type Lesson = { href: string; character: string; label: string; labelTr?: { en?: string; de?: string } };
type Props = { items: SrsItem[]; order: Record<Script, Lesson[]>; plan: PlanStep[] };

const DAY = 86_400_000;

function greeting(hour: number) {
  if (hour < 11) return { jp: "おはよう", romaji: "ohayō", key: "morning" as const };
  if (hour < 18) return { jp: "こんにちは", romaji: "konnichiwa", key: "day" as const };
  return { jp: "こんばんは", romaji: "konbanwa", key: "evening" as const };
}

export function Dashboard({ items: allItems, order: allOrder, plan }: Props) {
  const app = useAppState();
  const premium = usePremium();
  // Sans la version complète, les suggestions du jour se limitent au contenu gratuit.
  const items = useMemo(() => (premium === true ? allItems : allItems.filter((i) => isFreeId(i.id))), [allItems, premium]);
  const order = useMemo(() => (premium === true ? allOrder : (Object.fromEntries(Object.entries(allOrder).map(([k, v]) => [k, v.filter((l) => isFreeId(l.href))])) as Props["order"])), [allOrder, premium]);
  const m = useMessages();
  const now = useNow();
  const ready = app.ready && now > 0;
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const cards = useMemo(() => app.cards.filter((c) => byId.has(c.id)), [app.cards, byId]);
  const started = cards.length > 0 || Object.keys(app.progress.seen).length > 0;
  // Présentation : au tout premier lancement, ou à la demande depuis les réglages.
  const showOnboarding = app.ready && (app.settings.onboarded === false || (app.settings.onboarded === undefined && !started));
  const firstLesson = useMemo(() => {
    const kanjiN5 = order.kanji.find((l) => byId.get(l.href)?.level === "N5") ?? order.kanji[0];
    const kanjiN4 = order.kanji.find((l) => byId.get(l.href)?.level === "N4") ?? kanjiN5;
    const one = (l: Lesson, label: string) => ({ href: l.href, character: l.character, label });
    return {
      debutant: one(order.hiragana[0], "les hiragana"),
      hiragana: one(order.katakana[0], "les katakana"),
      kana: one(kanjiN5, "les kanji N5"),
      n4: one(kanjiN4, "les kanji N4"),
    };
  }, [order, byId]);

  const hello = ready ? greeting(new Date(now).getHours()) : null;
  const today = ready ? new Date(now).toLocaleDateString(m.locale, { weekday: "long", day: "numeric", month: "long" }) : "";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
      {showOnboarding ? <Onboarding firstLesson={firstLesson} /> : null}
      <header className="flex min-h-[5.5rem] flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          {hello ? (
            <>
              <p lang="ja" className="font-kana text-xl text-seal">
                {hello.jp} <span lang="fr" className="font-sans text-base text-muted">· {hello.romaji}</span>
              </p>
              <h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{started ? m.home.hello[hello.key] : m.home.welcome}</h1>
            </>
          ) : (
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Nihongo</h1>
          )}
        </div>
        <p className="text-lg text-muted first-letter:uppercase">{today}</p>
      </header>

      <StreakNotices compact />
      <WeeklySummary now={now} variant="dashboard" />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <TodayPanel ready={ready} started={started} now={now} />
        <FlamePanel now={now} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <KanjiOfTheDay items={items} now={now} />
        <ProgressPanel items={items} order={order} />
      </div>

      <PlanPanel plan={plan} />
      <UnlockBanner className="mt-4" />
      <ContinuePanel order={order} />

      <nav aria-label={m.home.more.title} className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight"><T m={(x) => x.home.more.title} /></h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/vocabulaire", glyph: "単", key: "words" as const },
            { href: "/grammaire", glyph: "文", key: "grammar" as const },
            { href: "/verbes", glyph: "動", key: "verbs" as const },
            { href: "/lecture", glyph: "読", key: "reading" as const },
            { href: "/ecoute", glyph: "聞", key: "listen" as const },
            { href: "/examen", glyph: "試", key: "exam" as const },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex h-full gap-4 rounded-2xl border border-line bg-sheet p-5 transition-[border-color,transform] hover:border-indigo active:scale-[0.985]">
                <span lang="ja" aria-hidden="true" className="font-kana text-4xl leading-none text-indigo transition-transform duration-300 group-hover:-rotate-6">{l.glyph}</span>
                <span>
                  <span className="block font-semibold"><T m={(x) => x.home.more[l.key].title} /></span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted"><T m={(x) => x.home.more[l.key].text} /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

/* Le bloc principal : ce qu'il y a à faire aujourd'hui. */
function TodayPanel({ ready, started, now }: { ready: boolean; started: boolean; now: number }) {
  const { cards, reviews, settings } = useAppState();
  const m = useMessages();
  const lang = useLang();
  const queue = ready ? buildQueue(cards, reviews, settings.newPerDay, now) : null;
  const waiting = queue ? queue.due.length + queue.fresh.length : 0;
  const next = ready ? nextDue(cards, now) : null;

  return (
    <section aria-labelledby="today-title" className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-contrast p-7 text-on-contrast sm:p-9">
      <span aria-hidden="true" lang="ja" className="font-kana pointer-events-none absolute -bottom-12 -right-4 text-[14rem] leading-none text-on-contrast/[0.06]">今日</span>
      {!ready ? (
        <div className="h-40" aria-busy="true" />
      ) : !started ? (
        <div className="relative max-w-lg">
          <h2 id="today-title" className="text-3xl font-semibold tracking-tight">{m.home.first.title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-on-contrast/75">{m.home.first.text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/hiragana/a" className="inline-flex rounded-full bg-on-contrast px-6 py-3.5 font-semibold text-contrast transition-transform active:scale-[0.97]">
              {m.home.first.start}
            </Link>
            <Link href="/grammaire/structure-de-la-phrase" className="inline-flex rounded-full border border-on-contrast/30 px-6 py-3.5 font-semibold transition-colors hover:border-on-contrast">
              {m.home.first.sentence}
            </Link>
          </div>
        </div>
      ) : waiting > 0 ? (
        <div className="relative">
          <p className="text-on-contrast/70"><span lang="ja" className="font-kana text-on-contrast">今日</span> きょう · kyō · {m.home.today}</p>
          <h2 id="today-title" className="mt-1 flex flex-wrap items-baseline gap-x-3">
            <span className="text-7xl font-semibold tabular-nums tracking-tight sm:text-8xl">{waiting}</span>
            <span className="text-2xl font-semibold">{m.home.due.cards(waiting)}</span>
          </h2>
          <p className="mt-2 text-on-contrast/75">
            {m.home.due.detail(queue!.due.length, queue!.fresh.length, Math.max(1, Math.round(waiting * 0.15)))}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/revisions" className="inline-flex rounded-full bg-on-contrast px-7 py-3.5 font-semibold text-contrast transition-transform active:scale-[0.97]">
              {m.home.due.start}
            </Link>
            <Link href="/express?go=1" className="inline-flex items-center gap-2 rounded-full border border-on-contrast/30 px-6 py-3.5 font-semibold transition-colors hover:border-on-contrast active:scale-[0.97]">
              <span lang="ja" aria-hidden="true" className="font-kana">急</span>
              {m.review.express}
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative max-w-lg">
          <p className="text-on-contrast/70"><span lang="ja" className="font-kana text-on-contrast">今日</span> きょう · kyō · {m.home.today}</p>
          <h2 id="today-title" className="mt-1 text-4xl font-semibold tracking-tight">{m.home.done.title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-on-contrast/75">
            {next ? m.home.done.next(formatDelay(next - now, lang)) : ""} {m.home.done.lesson}
          </p>
          <Link href="/revisions" className="mt-6 inline-flex rounded-full border border-on-contrast/30 px-6 py-3 font-semibold transition-colors hover:border-on-contrast">
            {m.home.done.cards}
          </Link>
        </div>
      )}
    </section>
  );
}

/* Un kanji différent chaque jour, avec sa lecture. */
function KanjiOfTheDay({ items, now }: { items: SrsItem[]; now: number }) {
  const kanji = useMemo(() => items.filter((i) => i.kind === "kanji"), [items]);
  const { streak } = useAppState();
  const m = useMessages();
  if (!now || kanji.length === 0) return <section className="min-h-72 rounded-3xl border border-line bg-sheet" aria-hidden="true" />;
  const local = now - new Date(now).getTimezoneOffset() * 60_000;
  // Pas de 37 : on parcourt tous les kanji sans suivre l'ordre des leçons.
  const k = kanji[(Math.floor(local / DAY) * 37) % kanji.length];
  const bonusTaken = streak.kotdBonus === dayKey(now);
  return (
    <section aria-labelledby="kotd-title" className="flex flex-col rounded-3xl border border-line bg-sheet p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 id="kotd-title" className="text-sm font-semibold text-muted">{m.home.kotd.title}</h2>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", bonusTaken ? "bg-line/40 text-muted" : "bg-seal-soft text-seal")}>
          {bonusTaken ? m.home.kotd.bonusTaken : m.home.kotd.bonus}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <Link href={k.href} onClick={claimKanjiOfTheDayBonus} className="bg-genko grid size-28 shrink-0 place-items-center rounded-2xl border border-line transition-transform hover:-rotate-2" aria-label={m.home.kotd.open(k.front)}>
          <span lang="ja" className="font-kana text-7xl leading-none text-brush">{k.front}</span>
        </Link>
        <div>
          <p>
            <span lang="ja" className="font-kana text-2xl text-indigo-deep">{k.reading.kana}</span>{" "}
            <span className="font-semibold">{k.reading.romaji}</span>
          </p>
          <p className="mt-0.5 text-lg">{k.meaning ? <L v={{ fr: k.meaning, ...k.meaningTr }} /> : null}</p>
          {k.level ? <p className="mt-1 text-sm text-muted">JLPT {k.level}</p> : null}
        </div>
      </div>
      {k.example ? (
        <p className="mt-4 text-sm">
          <span lang="ja" className="font-kana text-base">{k.example.jp}</span>{" "}
          <span lang="ja" className="font-kana text-indigo-deep">{k.example.kana}</span>
          <span className="text-muted"> · {k.example.romaji} · <L v={{ fr: k.example.fr, ...k.example.tr }} /></span>
        </p>
      ) : null}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-4">
        <CardToggle id={k.id} onAdd={claimKanjiOfTheDayBonus} />
        {bonusTaken ? null : <span className="text-xs text-muted">{m.home.kotd.hint}</span>}
      </div>
    </section>
  );
}

/* L'étape en cours du parcours guidé. */
function PlanPanel({ plan }: { plan: PlanStep[] }) {
  const app = useAppState();
  const now = useNow(60_000);
  const m = useMessages();
  const p = m.plan;
  const state = useMemo(() => (app.ready && now ? computePlan(plan, app, now) : null), [app, plan, now]);
  if (!state) return <div className="mt-4 h-28 rounded-3xl bg-paper" aria-hidden="true" />;
  const cur = state.current;
  const t = cur ? (cur.step.kind === "review" ? p.steps.revision : p.steps[cur.step.id as keyof typeof p.steps]) : null;
  return (
    <section aria-labelledby="plan-title" className="mt-4 rounded-3xl bg-contrast p-6 text-on-contrast">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="plan-title" className="text-xl font-semibold tracking-tight">{p.homeTitle}</h2>
        <span className="text-sm opacity-80">{p.progress(state.percent)}</span>
      </div>
      {cur && t ? (
        <>
          <p className="mt-3 font-medium">{t.title}</p>
          <p className="mt-0.5 text-[15px] opacity-90">{t.text}</p>
        </>
      ) : (
        <p className="mt-3">{p.allDone}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {cur ? <Link href={cur.step.href} className="rounded-full bg-paper px-5 py-2 font-semibold text-ink active:scale-[0.97]">{cur.step.kind === "review" ? p.review : cur.met > 0 ? p.keepGoing : p.start}</Link> : null}
        <Link href="/parcours" className="rounded-full border border-paper/50 px-5 py-2 font-medium active:scale-[0.97]">{p.homeAll}</Link>
      </div>
    </section>
  );
}

/* La prochaine leçon pas encore ouverte, pour chaque écriture. */
function ContinuePanel({ order }: { order: Record<Script, Lesson[]> }) {
  const { ready, progress } = useAppState();
  const m = useMessages();
  const rows = (["hiragana", "katakana", "kanji"] as const).map((script) => {
    const list = order[script];
    const index = list.findIndex((l) => !progress.seen[l.href]);
    return { script, lesson: index >= 0 ? list[index] : null, position: index + 1, total: list.length };
  });
  const title: Record<Script, string> = { hiragana: m.nav.hiragana, katakana: m.nav.katakana, kanji: m.nav.kanji };
  return (
    <section aria-labelledby="continue-title" className="mt-4 rounded-3xl border border-line bg-sheet p-6">
      <h2 id="continue-title" className="text-xl font-semibold tracking-tight"><T m={(x) => x.home.continue.title} /></h2>
      <ul className="mt-4 grid gap-2 md:grid-cols-3">
        {rows.map(({ script, lesson, position, total }) => (
          <li key={script}>
            {!ready ? (
              <div className="h-16 rounded-2xl bg-paper" />
            ) : lesson ? (
              <Link href={lesson.href} className="group flex items-center gap-4 rounded-2xl border border-transparent bg-paper px-4 py-3 transition-colors hover:border-indigo">
                <span lang="ja" className="font-kana grid size-11 shrink-0 place-items-center rounded-xl bg-sheet text-2xl">{lesson.character}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">{m.home.continue.position(title[script], position, total)}</span>
                  <span className="block truncate font-medium"><L v={{ fr: lesson.label, ...lesson.labelTr }} /></span>
                </span>
                <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-0.5">›</span>
              </Link>
            ) : (
              <p className="rounded-2xl bg-paper px-4 py-3 text-sm text-muted">{m.home.continue.done(title[script])}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Leçons ouvertes et cartes ancrées, par écriture. */
function ProgressPanel({ items, order }: Omit<Props, "plan">) {
  const { ready, progress, cardsById } = useAppState();
  const m = useMessages();
  const levelOf = useMemo(() => new Map(items.map((i) => [i.id, i.level])), [items]);
  const kanjiN5 = order.kanji.filter((l) => levelOf.get(l.href) === "N5");
  const kanjiN4 = order.kanji.filter((l) => levelOf.get(l.href) !== "N5");
  const verbIds = items.filter((i) => i.kind === "verbe").map((i) => i.id);
  const wordIds = items.filter((i) => i.kind === "mot").map((i) => i.id);

  const rows = [
    { label: m.nav.hiragana, href: "/hiragana", ids: order.hiragana.map((l) => l.href), unit: "seen" as const },
    { label: m.nav.katakana, href: "/katakana", ids: order.katakana.map((l) => l.href), unit: "seen" as const },
    { label: m.home.progress.kanjiN5, href: "/kanji", ids: kanjiN5.map((l) => l.href), unit: "seen" as const },
    { label: m.home.progress.kanjiN4, href: "/kanji#n4-tous", ids: kanjiN4.map((l) => l.href), unit: "seen" as const },
    { label: m.home.progress.verbs, href: "/verbes", ids: verbIds, unit: "cards" as const },
    { label: m.home.progress.words, href: "/vocabulaire", ids: wordIds, unit: "cards" as const },
  ].map((r) => {
    const touched = r.ids.filter((id) => (r.unit === "seen" ? progress.seen[id] : cardsById[id])).length;
    const anchored = r.ids.filter((id) => cardsById[id] && isAnchored(cardsById[id])).length;
    return { ...r, total: r.ids.length, touched, anchored };
  });

  return (
    <section aria-labelledby="progress-title" className="rounded-3xl border border-line bg-sheet p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="progress-title" className="text-xl font-semibold tracking-tight"><T m={(x) => x.home.progress.title} /></h2>
        <p className="flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5"><span aria-hidden="true" className="h-2 w-4 rounded-full bg-indigo/35" /><T m={(x) => x.home.progress.studied} /></span>
          <span className="flex items-center gap-1.5"><span aria-hidden="true" className="h-2 w-4 rounded-full bg-emerald-500" /><T m={(x) => x.home.progress.anchored} /></span>
        </p>
      </div>
      <ul className="mt-5 grid gap-4">
        {rows.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="group grid grid-cols-[6rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[6.5rem_1fr_12.5rem]">
              <span className="font-medium group-hover:text-indigo">{r.label}</span>
              <span className="relative h-2.5 overflow-hidden rounded-full bg-line/50" aria-hidden="true">
                <span className="absolute inset-y-0 left-0 rounded-full bg-indigo/35 transition-[width] duration-700" style={{ width: ready ? `${(r.touched / r.total) * 100}%` : 0 }} />
                <span className="absolute inset-y-0 left-0 rounded-full bg-emerald-500 transition-[width] duration-700" style={{ width: ready ? `${(r.anchored / r.total) * 100}%` : 0 }} />
              </span>
              <span className="col-start-2 text-sm tabular-nums text-muted sm:col-start-3 sm:text-right">
                {ready ? m.home.progress.line(r.touched, r.total, r.unit, r.anchored) : " "}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* La flamme : jours d'affilée, objectif du jour et la semaine en cours. */
function FlamePanel({ now }: { now: number }) {
  const flame = useFlame(now);
  const { streak } = useAppState();
  const { goal, progress } = useStreakGoal(now);
  const m = useMessages();
  if (!flame.ready) return <section className="min-h-72 rounded-3xl border border-line bg-sheet" aria-hidden="true" />;
  const shown = flame.status === "vacille" ? flame.atStake : flame.count;
  const ratio = Math.min(1, flame.points / flame.goal);
  const weekday = (new Date(now).getDay() + 6) % 7;
  const week = Array.from({ length: 7 }, (_, i) => shiftDay(flame.today, i - weekday));
  const message =
    flame.status === "allumee" ? m.home.flame.met
    : flame.status === "en-attente" ? m.home.flame.waiting(Math.max(1, flame.goal - flame.points))
    : flame.status === "vacille" ? m.home.flame.flicker(flame.missed.length)
    : flame.status === "eteinte" ? m.home.flame.out
    : m.home.flame.fresh(flame.goal);

  return (
    <section aria-labelledby="flame-panel-title" className={cn("flex flex-col rounded-3xl border bg-sheet p-6", flame.status === "vacille" ? "border-seal" : "border-line")}>
      <div className="flex items-center gap-4">
        <FlameIcon status={flame.status} className="h-16 w-12 shrink-0" />
        <div>
          <h2 id="flame-panel-title" className="text-sm font-semibold text-muted">{m.home.flame.title}</h2>
          <p className="text-3xl font-semibold tabular-nums tracking-tight">
            {shown} <span className="text-lg font-medium">{m.common.days(shown).replace(/^\d+\s*/, "")}</span>
          </p>
        </div>
      </div>
      <p className="mt-3 text-[15px]">{message}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line/50" aria-label={m.home.flame.today(Math.min(flame.points, flame.goal), flame.goal)} role="img">
        <div className="h-full rounded-full bg-seal transition-[width] duration-700" style={{ width: `${ratio * 100}%` }} />
      </div>
      <ol className="mt-4 grid grid-cols-7 gap-1" aria-label={m.home.flame.week}>
        {week.map((k, i) => {
          const met = streak.days[k]?.met || streak.repaired.includes(k);
          return (
            <li key={k} className="flex flex-col items-center gap-1">
              <span className={cn("text-xs", k === flame.today ? "font-semibold text-ink" : "text-muted")}>{m.home.flame.weekdays[i]}</span>
              <span className={cn("grid size-8 place-items-center rounded-full", k === flame.today ? "bg-paper ring-2 ring-indigo" : "bg-paper")}>
                {streak.protected.includes(k) ? <OmamoriIcon className="h-5 w-3.5" /> : met ? <FlameIcon status="allumee" className="h-5 w-4" /> : k < flame.today ? <span className="size-1.5 rounded-full bg-line" /> : null}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted">{goal ? m.home.flame.goal(progress, goal.days) : m.home.flame.chooseGoal}</span>
        <span className="flex items-center gap-1 text-muted" title={m.home.flame.omamori}>
          <OmamoriIcon className="h-5 w-3.5" empty={streak.omamori === 0} /> {streak.omamori}
        </span>
      </p>
      <Link
        href="/flamme"
        className={cn(
          "mt-auto pt-3 text-sm font-semibold",
          flame.status === "vacille" ? "text-seal" : "text-indigo",
        )}
      >
        {flame.status === "vacille" ? m.home.flame.repair : m.home.flame.see}
      </Link>
    </section>
  );
}

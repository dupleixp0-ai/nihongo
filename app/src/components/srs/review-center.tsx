"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SrsItem } from "@/data/srs-items";
import type { StoredCard } from "@/lib/db";
import { setSettings, useAppState } from "@/lib/store";
import { readingMatches } from "@/lib/kana-input";
import { KANA_FORM, KanaAnswer } from "./kana-answer";
import { answer, buildQueue, formatDelay, isAnchored, nextDue, previewIntervals, Rating, State, type Grade } from "@/lib/srs";
import { SpeakButton } from "@/components/kana/speak-button";
import { cn } from "@/lib/utils";
import { useNow } from "./use-now";
import { useLang, useMessages } from "@/i18n/use-lang";
import type { Messages } from "@/i18n/messages";
import { playFeedback } from "@/lib/feedback";
import { L } from "@/i18n/t";

const GRADES: { grade: Grade; label: keyof Messages["review"]["grades"]; key: string; tone: string }[] = [
  { grade: Rating.Again, label: "again", key: "1", tone: "border-seal/40 text-seal hover:bg-seal-soft" },
  { grade: Rating.Hard, label: "hard", key: "2", tone: "border-line text-ink hover:border-ink" },
  { grade: Rating.Good, label: "good", key: "3", tone: "border-indigo/50 text-indigo-deep hover:bg-indigo-soft" },
  { grade: Rating.Easy, label: "easy", key: "4", tone: "border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40" },
];


export function ReviewCenter({ items }: { items: SrsItem[] }) {
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const app = useAppState();
  const now = useNow(15_000);
  const m = useMessages();
  const lang = useLang();
  const r = m.review;
  const [inSession, setInSession] = useState(false);
  const [done, setDone] = useState<{ count: number; good: number } | null>(null);

  // Cartes dont l'élément existe encore dans l'appli.
  const cards = useMemo(() => app.cards.filter((c) => byId.has(c.id)), [app.cards, byId]);
  const queue = app.ready && now ? buildQueue(cards, app.reviews, app.settings.newPerDay, now) : null;
  const waiting = queue ? queue.due.length + queue.fresh.length : 0;

  if (!app.ready || !now) return <div className="h-96" aria-busy="true" />;

  if (inSession) {
    return (
      <Session
        byId={byId}
        cards={cards}
        onEnd={(summary) => {
          setInSession(false);
          setDone(summary);
        }}
      />
    );
  }

  const next = nextDue(cards, now);
  return (
    <div className="grid gap-10">
      <section aria-labelledby="today" className="relative overflow-hidden rounded-3xl bg-contrast p-7 text-on-contrast sm:p-10">
        <span aria-hidden="true" lang="ja" className="font-kana pointer-events-none absolute -right-6 -top-10 text-[13rem] leading-none text-on-contrast/[0.06]">復</span>
        {done ? (
          <p className="relative mb-6 inline-flex rounded-full bg-on-contrast/10 px-4 py-1.5 text-sm">
            {r.sessionDone(done.count, Math.round((done.good / Math.max(1, done.count)) * 100))}
          </p>
        ) : null}
        {cards.length === 0 ? (
          <div className="relative max-w-xl">
            <h2 id="today" className="text-3xl font-semibold tracking-tight">{r.empty}</h2>
            <p className="mt-3 text-lg leading-relaxed text-on-contrast/75">{r.emptyText}</p>
            <Link href="/hiragana/a" className="mt-6 inline-flex rounded-full bg-on-contrast px-6 py-3 font-semibold text-contrast transition-transform active:scale-[0.97]">
              {r.firstLesson}
            </Link>
          </div>
        ) : waiting > 0 ? (
          <div className="relative">
            <h2 id="today" className="flex items-baseline gap-3">
              <span className="text-7xl font-semibold tabular-nums tracking-tight sm:text-8xl">{waiting}</span>
              <span className="text-2xl font-semibold">{m.home.due.cards(waiting)}</span>
            </h2>
            <p className="mt-3 text-lg text-on-contrast/75">
              {r.detail(queue!.due.length, queue!.fresh.length, Math.max(1, Math.round(waiting * 0.15)))}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                autoFocus
                onClick={() => {
                  setDone(null);
                  setInSession(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-on-contrast px-7 py-3.5 text-base font-semibold text-contrast transition-transform active:scale-[0.97]"
              >
                {m.home.due.start}
              </button>
              <Link href="/express?go=1" className="inline-flex items-center gap-2 rounded-full border border-on-contrast/30 px-6 py-3.5 text-base font-semibold transition-colors hover:border-on-contrast active:scale-[0.97]">
                <span lang="ja" aria-hidden="true" className="font-kana">急</span>
                {r.express}
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative max-w-xl">
            <h2 id="today" className="text-3xl font-semibold tracking-tight">{r.upToDate}</h2>
            <p className="mt-3 text-lg leading-relaxed text-on-contrast/75">
              {next ? m.home.done.next(formatDelay(next - now, lang)) : r.noneScheduled}
              {app.cards.some((c) => c.state === State.New) ? r.newSeen : ""}
            </p>
          </div>
        )}
      </section>

      {cards.length > 0 ? <Stats cards={cards} byId={byId} /> : null}
      <p className="border-t border-line pt-6 text-muted">
        {r.settingsHint}{" "}
        <Link href="/reglages#revisions" className="font-medium text-indigo hover:underline">{r.settingsLink}</Link>.
      </p>
    </div>
  );
}

/* ———————————————————— Séance ———————————————————— */

function Session({ byId, cards, onEnd }: { byId: Map<string, SrsItem>; cards: StoredCard[]; onEnd: (s: { count: number; good: number }) => void }) {
  const app = useAppState();
  const m = useMessages();
  const lang = useLang();
  const r = m.review;
  const t = m.typing;
  const [revealed, setRevealed] = useState(false);
  /** Réponse tapée au clavier et verdict (null : pas de saisie pour cette carte). */
  const [typed, setTyped] = useState<{ text: string; ok: boolean } | null>(null);
  const [tally, setTally] = useState({ count: 0, good: 0 });
  // Instant de référence : figé pendant qu'une carte est affichée (les délais ne bougent pas sous les yeux).
  const [clock, setClock] = useState(() => Date.now());
  const liveCards = useMemo(() => app.cards.filter((c) => byId.has(c.id)), [app.cards, byId]);
  const queue = buildQueue(liveCards.length ? liveCards : cards, app.reviews, app.settings.newPerDay, clock);
  const current = queue.due[0] ?? queue.fresh[0] ?? queue.learning[0] ?? null;
  const item = current ? byId.get(current.id) : undefined;
  const intervals = current ? previewIntervals(current, clock) : null;
  const remaining = queue.due.length + queue.fresh.length + queue.learning.length;
  const total = tally.count + remaining;

  const endRef = useRef(onEnd);
  useEffect(() => {
    endRef.current = onEnd;
  });
  useEffect(() => {
    if (!current) {
      if (tally.count > 0) playFeedback("complete");
      endRef.current(tally);
    }
  }, [current, tally]);

  const rate = (grade: Grade) => {
    if (!current) return;
    // Sans saisie au clavier, c'est la note choisie qui dit juste ou faux (avec saisie, le verdict a déjà sonné).
    if (!typed) playFeedback(grade >= Rating.Good ? "correct" : "wrong");
    answer(current, grade, Date.now());
    setTally((t) => ({ count: t.count + 1, good: t.good + (grade >= Rating.Good ? 1 : 0) }));
    setRevealed(false);
    setTyped(null);
    setClock(Date.now());
  };
  const rateRef = useRef(rate);
  const wrongRef = useRef(false);
  const typingRef = useRef(false);
  useEffect(() => {
    rateRef.current = rate;
    wrongRef.current = Boolean(typed && !typed.ok);
    typingRef.current = app.settings.typeAnswers !== false && Boolean(item?.answers.length);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!revealed && typingRef.current) return;
      if (!revealed && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && wrongRef.current) {
        if (e.key === " " || e.key === "Enter" || e.key === "1") {
          e.preventDefault();
          rateRef.current(Rating.Again);
        }
      } else if (revealed) {
        const g = GRADES.find((x) => x.key === e.key);
        if (g) rateRef.current(g.grade);
        else if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          rateRef.current(Rating.Good);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed]);

  if (!current || !item) return <div className="h-96" />;

  const typing = app.settings.typeAnswers !== false && item.answers.length > 0;
  const checkTyped = (text: string) => {
    const ok = readingMatches(text, item.answers);
    setTyped({ text, ok });
    if (text) playFeedback(ok ? "correct" : "wrong");
    setRevealed(true);
  };
  // Réponse fausse : seul « À revoir » est proposé, sauf si l'on corrige une faute de frappe.
  const wrong = revealed && typed && !typed.ok;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="button" onClick={() => onEnd(tally)} className="whitespace-nowrap text-sm font-medium text-muted hover:text-ink">
          {r.stop}
        </button>
        <button
          type="button"
          aria-pressed={app.settings.typeAnswers !== false}
          title={app.settings.typeAnswers !== false ? t.keyboardOn : t.keyboardOff}
          onClick={() => setSettings({ ...app.settings, typeAnswers: app.settings.typeAnswers === false })}
          className={cn(
            "whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium transition-colors",
            app.settings.typeAnswers !== false ? "border-indigo/50 bg-indigo-soft text-indigo-deep" : "border-line text-muted hover:text-ink",
          )}
        >
          <span aria-hidden="true">⌨ </span>{t.keyboard}
        </button>
        <div className="ml-auto flex items-center gap-3 whitespace-nowrap text-sm" aria-label={r.left}>
          <span className="text-indigo">{r.fresh(queue.fresh.length)}</span>
          <span className="text-seal">{r.learning(queue.learning.length + queue.due.filter((c) => c.state !== State.Review).length)}</span>
          <span className="text-emerald-700 dark:text-emerald-400">{r.due(queue.due.filter((c) => c.state === State.Review).length)}</span>
        </div>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line/60" aria-hidden="true">
        <motion.div className="h-full bg-indigo" animate={{ width: `${(tally.count / Math.max(1, total)) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={`${current.id}-${tally.count}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.12 } }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-6 overflow-hidden rounded-3xl border border-line bg-sheet shadow-[0_28px_60px_-40px_rgba(23,35,58,0.6)]"
        >
          <div className="flex items-center justify-between px-6 pt-5 text-sm text-muted">
            <span>{m.kinds[item.kind]}{item.level ? ` · ${item.level}` : ""}</span>
            {current.state === State.New ? <span className="rounded-full bg-indigo-soft px-2.5 py-0.5 text-xs font-semibold text-indigo-deep">{r.isNew}</span> : null}
          </div>
          <div className="grid grid-cols-1 place-items-center px-6 pb-6 pt-4">
            <div className="bg-genko grid min-h-44 min-w-44 place-items-center rounded-2xl border border-line/80 px-6">
              <span lang="ja" className={cn("font-kana leading-none text-brush", item.front.length > 3 ? "text-6xl" : item.front.length > 1 ? "text-7xl" : "text-[7.5rem]")}>
                {item.front}
              </span>
            </div>
            {!revealed && typing ? <KanaAnswer key={current.id} mode={item.input} onSubmit={checkTyped} onSkip={() => checkTyped("")} /> : null}
            {!revealed && !typing ? <p className="mt-5 text-muted">{r.prompt[item.kind]}</p> : null}
          </div>

          <div aria-live="polite">
            {revealed ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-line bg-paper/60 px-6 py-6">
                {typed ? <Verdict typed={typed} item={item} /> : null}
                <Answer item={item} />
              </motion.div>
            ) : null}
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] -mx-2 mt-5 rounded-3xl bg-paper/85 p-2 backdrop-blur-md md:bottom-4">
        {!revealed && typing ? (
          <button
            type="submit"
            form={KANA_FORM}
            className="w-full rounded-2xl bg-indigo py-4 text-lg font-semibold text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] transition-transform active:scale-[0.98]"
          >
            {t.check} <span className="ml-1 hidden text-sm font-normal opacity-70 md:inline">{t.enter}</span>
          </button>
        ) : wrong ? (
          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => rate(Rating.Again)}
              className="w-full rounded-2xl bg-seal py-4 text-lg font-semibold text-white transition-transform active:scale-[0.98]"
            >
              {r.grades.again} <span className="ml-1 text-sm font-normal opacity-80">{intervals ? formatDelay(intervals[Rating.Again], lang) : ""}</span>
            </button>
            {typed.text ? (
              <button type="button" onClick={() => setTyped({ ...typed, ok: true })} className="text-sm font-medium text-muted hover:text-ink">
                {t.typo}
              </button>
            ) : null}
          </div>
        ) : !revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="w-full rounded-2xl bg-indigo py-4 text-lg font-semibold text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] transition-transform active:scale-[0.98]"
          >
            {r.show} <span className="ml-1 hidden text-sm font-normal opacity-70 md:inline">{r.space}</span>
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2" role="group" aria-label={r.yourAnswer}>
            {GRADES.map((g) => (
              <button
                key={g.grade}
                type="button"
                onClick={() => rate(g.grade)}
                className={cn("flex flex-col items-center rounded-2xl border bg-sheet py-3 font-semibold transition-[transform,background-color] active:scale-[0.96]", g.tone)}
              >
                <span className="text-[15px]">{r.grades[g.label]}</span>
                <span className="text-xs font-normal opacity-80">{intervals ? formatDelay(intervals[g.grade], lang) : ""}</span>
              </button>
            ))}
          </div>
        )}
        {revealed && !wrong ? <p className="mt-2 hidden text-center text-xs text-muted md:block">{r.keys}</p> : null}
      </div>
    </div>
  );
}

function Verdict({ typed, item }: { typed: { text: string; ok: boolean }; item: SrsItem }) {
  const t = useMessages().typing;
  if (!typed.text) return <p className="mb-4 font-semibold text-seal">{t.hereIs}</p>;
  return (
    <p className={cn("mb-4 flex flex-wrap items-baseline gap-x-2 rounded-xl px-4 py-2.5 font-semibold", typed.ok ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-seal-soft text-seal")}>
      <span>{typed.ok ? t.right : t.wrong}</span>
      <span className="font-normal">
        {t.youTyped} <span lang={item.input === "latin" ? undefined : "ja"} className={cn(item.input !== "latin" && "font-kana", !typed.ok && "line-through")}>{typed.text}</span>
      </span>
      {typed.ok && item.kind === "mot" ? <span className="font-normal text-ink">{t.checkMeaning}</span> : null}
    </p>
  );
}

function Answer({ item }: { item: SrsItem }) {
  const m = useMessages();
  return (
    <div className="grid gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span lang="ja" className="font-kana text-3xl text-indigo-deep">{item.reading.kana}</span>
            <span className="text-2xl font-semibold">{item.reading.romaji}</span>
          </p>
          {item.meaning ? <p className="mt-1 text-lg"><L v={{ fr: item.meaning, ...item.meaningTr }} /></p> : null}
        </div>
        <SpeakButton text={item.speak} />
      </div>
      {item.extra.length ? (
        <ul className="flex flex-wrap gap-2">
          {item.extra.map((e) => (
            <li key={`${e.label}-${e.reading.kana}`} className="rounded-xl border border-line bg-sheet px-3 py-1.5 text-sm">
              <span className="text-muted">{m.forms[e.label] ?? e.label} </span>
              {e.jp ? <span lang="ja" className="font-kana">{e.jp} </span> : null}
              <span lang="ja" className="font-kana text-indigo-deep">{e.reading.kana}</span>
              <span className="text-muted"> · {e.reading.romaji}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {item.example ? (
        <div className="rounded-xl border border-line bg-sheet px-4 py-3">
          <p lang="ja" className="font-kana text-lg">{item.example.jp}</p>
          {item.example.kana && item.example.kana !== item.example.jp ? <p lang="ja" className="font-kana text-sm text-indigo-deep">{item.example.kana}</p> : null}
          <p className="text-sm text-muted">{item.example.romaji}</p>
          <p className="text-[15px]"><L v={{ fr: item.example.fr, ...item.example.tr }} /></p>
        </div>
      ) : null}
      <Link href={item.href} className="text-sm font-medium text-indigo hover:underline">{m.review.lesson}</Link>
    </div>
  );
}

/* ———————————————————— Statistiques ———————————————————— */

function Stats({ cards, byId }: { cards: StoredCard[]; byId: Map<string, SrsItem> }) {
  const m = useMessages();
  const kinds = (["hiragana", "katakana", "kanji", "verbe", "mot"] as const).map((kind) => {
    const list = cards.filter((c) => byId.get(c.id)?.kind === kind);
    return {
      kind,
      total: list.length,
      fresh: list.filter((c) => c.state === State.New).length,
      learning: list.filter((c) => c.state !== State.New && !isAnchored(c)).length,
      anchored: list.filter(isAnchored).length,
    };
  });
  return (
    <section aria-labelledby="stats-title">
      <h2 id="stats-title" className="text-2xl font-semibold tracking-tight">{m.review.cardsTitle}</h2>
      <p className="mt-1 text-muted">{m.review.cardsText}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kinds.map((k) => (
          <li key={k.kind} className="rounded-2xl border border-line bg-sheet p-5">
            <p className="flex items-baseline justify-between">
              <span className="font-semibold">{m.kinds[k.kind]}</span>
              <span className="text-2xl font-semibold tabular-nums">{k.total}</span>
            </p>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-line/50" aria-hidden="true">
              <span className="bg-emerald-500" style={{ width: `${(k.anchored / Math.max(1, k.total)) * 100}%` }} />
              <span className="bg-indigo" style={{ width: `${(k.learning / Math.max(1, k.total)) * 100}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">
              {m.review.cardsLine(k.anchored, k.learning, k.fresh)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { playFeedback } from "@/lib/feedback";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ExamPassage } from "@/data/exam-n5";
import { estimate, particleDistractors, readingDistractors, shuffleWith, spellingDistractors, type ExamScore, type Rng, type SectionId } from "@/lib/exam";
import { kanaToHepburn } from "@/lib/romaji";
import { speakJapanese, useHasJapaneseVoice } from "@/lib/japanese-speech";
import { getState, setProgress, useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useLang, useMessages } from "@/i18n/use-lang";
import { pick, type Tr } from "@/i18n/meanings";
import { T } from "@/i18n/t";
import type { Messages } from "@/i18n/messages";

/* ------------------------------------------------------------------ */
/* Données et questions                                                 */
/* ------------------------------------------------------------------ */

type ExamWord = { id: string; jp: string; kana: string; romaji: string; fr: string; tr?: Tr; theme: string };
/** Un passage de lecture traduit : titre, texte en clair, questions et choix (dans l'ordre des originaux). */
type PassageText = { title: string; fr: string; questions: { question: string; choices: string[] }[] };
type ExamToken = { t: string; r?: string; rm?: string; particle: boolean };
export type ExamData = {
  words: ExamWord[];
  sentences: { id: string; fr: string; tr?: Tr; tokens: ExamToken[] }[];
  passages: (ExamPassage & { tr?: Partial<Record<"en" | "de", PassageText>> })[];
  lookalikes: string[][];
  kanjiPool: string[];
};

type Choice = { label: string; sub?: string; lang: string };
type Question = {
  id: string;
  section: SectionId;
  instruction: string;
  choices: Choice[];
  answer: number;
  /** Ce que montre la question, selon son type. */
  body:
    | { kind: "word"; jp: string; kana?: string; romaji?: string }
    | { kind: "sentence"; jp: string; kana: string; romaji: string }
    | { kind: "passage"; passage: ExamPassage; question: string }
    | { kind: "listen"; speak: string };
  /** Affiché à la correction. */
  solution: string;
};

const SECTIONS: { id: SectionId; jp: string; kana: string; romaji: string }[] = [
  { id: "vocabulaire", jp: "文字・語彙", kana: "もじ・ごい", romaji: "moji goi" },
  { id: "grammaire", jp: "文法", kana: "ぶんぽう", romaji: "bunpō" },
  { id: "lecture", jp: "読解", kana: "どっかい", romaji: "dokkai" },
  { id: "ecoute", jp: "聴解", kana: "ちょうかい", romaji: "chōkai" },
];

const HAN = /[一-鿿々]/;
const HIRAGANA_ONLY = /^[ぁ-ゖー]+$/;
const ro = (kana: string) => kanaToHepburn(kana, { capitalize: false });
const PARTICLE_ROMAJI: Record<string, string> = { は: "wa", へ: "e", を: "o" };
const particleRomaji = (p: string) => PARTICLE_ROMAJI[p] ?? ro(p);
const PUNCT: Record<string, string> = { "。": ".", "、": ",", "？": "?", "！": "!", "「": "“", "」": "”" };

function sentenceLines(tokens: ExamToken[], blank: number) {
  const jp = tokens.map((t, i) => (i === blank ? "（　）" : t.t)).join("");
  const kana = tokens.map((t, i) => (i === blank ? "（　）" : t.r ?? t.t)).join("");
  let romaji = "";
  tokens.forEach((t, i) => {
    if (i === blank) romaji += " ( ___ )";
    else if (PUNCT[t.t]) romaji += PUNCT[t.t];
    else if (t.rm) romaji += ` ${t.rm}`;
  });
  romaji = romaji.trim();
  return { jp, kana, romaji: romaji.charAt(0).toUpperCase() + romaji.slice(1) };
}

const pickChoices = (correct: Choice, wrong: Choice[], rng: Rng) => {
  const all = shuffleWith([correct, ...wrong], rng);
  return { choices: all, answer: all.indexOf(correct) };
};

/** Tire un examen au hasard : 13 questions de vocabulaire, 8 de grammaire, 4 de lecture, 6 d'écoute. */
function buildExam(data: ExamData, rng: Rng, withListening: boolean, m: Messages): Question[] {
  const x = m.exam;
  const withKanji = data.words.filter((w) => HAN.test(w.jp) && HIRAGANA_ONLY.test(w.kana));
  const readings = data.words.map((w) => w.kana);
  const pool = shuffleWith(withKanji, rng);
  const used = new Set<string>();
  const take = (n: number, list: ExamWord[]) => {
    const out: ExamWord[] = [];
    for (const w of list) {
      if (out.length === n) break;
      if (!used.has(w.id)) {
        used.add(w.id);
        out.push(w);
      }
    }
    return out;
  };
  // Les mots qui partagent l'écriture ou la lecture ne doivent pas devenir de fausses réponses.
  const sameJp = (w: ExamWord) => data.words.filter((o) => o.jp === w.jp).map((o) => o.kana);
  const sameKana = (w: ExamWord) => data.words.filter((o) => o.kana === w.kana).map((o) => o.jp);

  const questions: Question[] = [];

  for (const w of take(5, pool)) {
    const wrong = readingDistractors(w.kana, readings, rng, sameJp(w));
    questions.push({
      id: `lecture-${w.id}`, section: "vocabulaire", instruction: x.readWord,
      body: { kind: "word", jp: w.jp },
      ...pickChoices({ label: w.kana, sub: ro(w.kana), lang: "ja" }, wrong.map((k) => ({ label: k, sub: ro(k), lang: "ja" as const })), rng),
      solution: x.solReading(w.jp, w.kana, w.romaji, w.fr),
    });
  }
  for (const w of take(4, pool)) {
    const wrong = spellingDistractors(w.jp, data.lookalikes, data.kanjiPool, rng, sameKana(w));
    questions.push({
      id: `ecriture-${w.id}`, section: "vocabulaire", instruction: x.writeWord,
      body: { kind: "word", jp: w.kana, romaji: w.romaji },
      ...pickChoices({ label: w.jp, lang: "ja" }, wrong.map((k) => ({ label: k, lang: "ja" as const })), rng),
      solution: x.solWriting(w.kana, w.romaji, w.jp, w.fr),
    });
  }
  for (const w of take(4, shuffleWith(data.words, rng))) {
    const others = shuffleWith(data.words.filter((o) => o.theme === w.theme && o.fr !== w.fr && o.id !== w.id), rng);
    const fallback = shuffleWith(data.words.filter((o) => o.fr !== w.fr), rng);
    const wrong = [...new Map([...others, ...fallback].map((o) => [o.fr, o])).values()].slice(0, 3);
    questions.push({
      id: `sens-${w.id}`, section: "vocabulaire", instruction: x.meaning,
      body: { kind: "word", jp: w.jp, kana: w.jp !== w.kana ? w.kana : undefined, romaji: w.romaji },
      ...pickChoices({ label: w.fr, lang: m.locale.slice(0, 2) }, wrong.map((o) => ({ label: o.fr, lang: m.locale.slice(0, 2) })), rng),
      solution: x.solMeaning(w.jp, w.kana, w.romaji, w.fr),
    });
  }

  for (const s of shuffleWith(data.sentences, rng).slice(0, 8)) {
    const blanks = s.tokens.map((t, i) => (t.particle ? i : -1)).filter((i) => i >= 0);
    // は revient dans presque chaque phrase : on préfère une autre particule quand il y en a une.
    const varied = blanks.filter((i) => s.tokens[i].t !== "は");
    const choice = varied.length ? varied : blanks;
    const blank = choice[Math.floor(rng() * choice.length)];
    const correct = s.tokens[blank].t;
    const lines = sentenceLines(s.tokens, blank);
    questions.push({
      id: `particule-${s.id}-${blank}`, section: "grammaire", instruction: x.particle,
      body: { kind: "sentence", ...lines },
      ...pickChoices(
        { label: correct, sub: particleRomaji(correct), lang: "ja" },
        particleDistractors(correct, rng).map((p) => ({ label: p, sub: particleRomaji(p), lang: "ja" as const })),
        rng,
      ),
      solution: `${correct} (${particleRomaji(correct)}) — « ${s.fr} »`,
    });
  }

  const here = m.locale.slice(0, 2);
  for (const passage of data.passages) {
    for (const q of passage.questions) {
      const correct = { label: q.choices[q.answer], lang: here };
      questions.push({
        id: q.id, section: "lecture", instruction: x.passage,
        body: { kind: "passage", passage, question: q.question },
        ...pickChoices(correct, q.choices.filter((_, i) => i !== q.answer).map((c) => ({ label: c, lang: here })), rng),
        solution: x.solTranslation(passage.fr),
      });
    }
  }

  if (withListening) {
    const audible = shuffleWith(data.words.filter((w) => HIRAGANA_ONLY.test(w.kana) && w.kana.length >= 3), rng);
    for (const w of take(6, audible)) {
      const wrong = readingDistractors(w.kana, readings, rng, sameJp(w));
      questions.push({
        id: `ecoute-${w.id}`, section: "ecoute", instruction: x.listen,
        body: { kind: "listen", speak: w.kana },
        ...pickChoices({ label: w.kana, sub: ro(w.kana), lang: "ja" }, wrong.map((k) => ({ label: k, sub: ro(k), lang: "ja" as const })), rng),
        solution: x.solListen(w.kana, w.romaji, w.jp, w.fr),
      });
    }
  }
  return questions;
}

/* ------------------------------------------------------------------ */
/* Écran                                                                */
/* ------------------------------------------------------------------ */

const fmt = (seconds: number, m: Messages) => m.exam.time(Math.floor(seconds / 60), String(seconds % 60).padStart(2, "0"));

export function ExamRunner({ data }: { data: ExamData }) {
  const hasVoice = useHasJapaneseVoice();
  const { progress } = useAppState();
  const m = useMessages();
  const lang = useLang();
  const x = m.exam;
  const [exam, setExam] = useState<{ questions: Question[]; started: number } | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState<{ seconds: number } | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!exam || finished) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [exam, finished]);

  const start = () => {
    // Mots, phrases et textes dans la langue choisie.
    const words = data.words.map((w) => ({ ...w, fr: pick(w.fr, w.tr, lang) }));
    const sentences = data.sentences.map((s) => ({ ...s, fr: pick(s.fr, s.tr, lang) }));
    const passages = data.passages.map((p) => {
      const t = lang === "fr" ? undefined : p.tr?.[lang];
      if (!t) return p;
      return { ...p, title: t.title, fr: t.fr, questions: p.questions.map((q, i) => ({ ...q, question: t.questions[i].question, choices: t.questions[i].choices })) };
    });
    const questions = buildExam({ ...data, words, sentences, passages }, Math.random, hasVoice, m);
    setExam({ questions, started: Date.now() });
    setAnswers(questions.map(() => null));
    setIndex(0);
    setFinished(null);
    setNow(Date.now());
    window.scrollTo({ top: 0 });
  };

  const finish = () => {
    if (!exam) return;
    const seconds = Math.round((Date.now() - exam.started) / 1000);
    setFinished({ seconds });
    playFeedback("complete");
    const scores = scoreOf(exam.questions, answers);
    const current = getState().progress;
    setProgress({ ...current, exams: [...(current.exams ?? []), { date: Date.now(), level: "N5" as const, seconds, scores }].slice(-20) });
    window.scrollTo({ top: 0 });
  };

  if (!exam) return <Intro onStart={start} hasVoice={hasVoice} history={progress.exams ?? []} />;
  if (finished) return <Results questions={exam.questions} answers={answers} seconds={finished.seconds} onRestart={start} />;

  const q = exam.questions[index];
  const section = SECTIONS.find((s) => s.id === q.section)!;
  const answeredCount = answers.filter((a) => a !== null).length;
  const last = index === exam.questions.length - 1;
  const elapsed = Math.max(0, Math.round((now - exam.started) / 1000));

  const go = (to: number) => {
    const target = exam.questions[to];
    // Le clic sur « Suivant » autorise le navigateur à parler : on lance l'écoute tout de suite.
    if (target?.body.kind === "listen") speakJapanese(target.body.speak);
    setIndex(to);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
        <p>
          <span lang="ja" className="font-kana font-semibold">{section.jp}</span>{" "}
          <span lang="ja" className="font-kana text-muted">{section.kana}</span> <span className="text-muted">· {section.romaji} · {x.sections[section.id]}</span>
        </p>
        <p className="tabular-nums text-muted" aria-label={x.elapsed}>{fmt(elapsed, m)}</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/60" aria-hidden="true">
        <motion.div className="h-full rounded-full bg-indigo" animate={{ width: `${(answeredCount / exam.questions.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18 }}
          className="mt-6"
          aria-label={x.question(index + 1, exam.questions.length)}
        >
          <p className="text-sm text-muted">{x.question(index + 1, exam.questions.length)}</p>
          <h2 className="mt-1 text-xl font-semibold">{q.instruction}</h2>
          <QuestionBody q={q} />
          <div className={cn("mt-5 grid gap-2.5", q.choices.every((c) => c.lang === "ja" && c.label.length <= 4) ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2")}>
            {q.choices.map((c, i) => {
              const selected = answers[index] === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAnswers((a) => a.map((x, j) => (j === index ? i : x)))}
                  className={cn(
                    "flex items-baseline gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors",
                    selected ? "border-indigo bg-indigo-soft" : "border-line bg-sheet hover:border-indigo/60",
                  )}
                >
                  <span className={cn("grid size-6 shrink-0 place-items-center self-center rounded-full border text-xs font-semibold", selected ? "border-indigo bg-indigo text-on-indigo" : "border-line text-muted")}>{i + 1}</span>
                  <span>
                    <span lang={c.lang} className={cn(c.lang === "ja" ? "font-kana text-2xl" : "text-base font-medium")}>{c.label}</span>
                    {c.sub ? <span className="ml-2 text-sm text-muted">{c.sub}</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.section>
      </AnimatePresence>

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] mt-8 flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper/95 p-2 backdrop-blur md:bottom-4">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className="rounded-full px-4 py-2.5 font-medium text-muted hover:text-ink disabled:opacity-40">
          {x.previous}
        </button>
        {last ? (
          <button type="button" onClick={finish} className="rounded-full bg-indigo px-6 py-2.5 font-semibold text-on-indigo active:scale-[0.97]">
            {x.finish(answeredCount, exam.questions.length)}
          </button>
        ) : (
          <button type="button" onClick={() => go(index + 1)} className="rounded-full bg-indigo px-6 py-2.5 font-semibold text-on-indigo active:scale-[0.97]">
            {answers[index] === null ? x.skip : x.next}
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionBody({ q }: { q: Question }) {
  const b = q.body;
  if (b.kind === "word") {
    return (
      <div className="mt-4 grid place-items-center rounded-2xl border border-line bg-genko px-4 py-8 text-center">
        <p lang="ja" className="font-kana text-6xl leading-none text-brush">{b.jp}</p>
        {b.kana || b.romaji ? (
          <p className="mt-3 text-muted">
            {b.kana ? <span lang="ja" className="font-kana">{b.kana} · </span> : null}
            {b.romaji}
          </p>
        ) : null}
      </div>
    );
  }
  if (b.kind === "sentence") {
    return (
      <div className="mt-4 rounded-2xl border border-line bg-genko px-5 py-6">
        <p lang="ja" className="font-kana text-2xl leading-relaxed">{b.jp}</p>
        <p lang="ja" className="font-kana mt-2 text-indigo-deep">{b.kana}</p>
        <p className="mt-1 text-sm text-muted">{b.romaji}</p>
      </div>
    );
  }
  if (b.kind === "passage") {
    return (
      <div className="mt-4 grid gap-4">
        <div className="rounded-2xl border border-line bg-genko px-5 py-5">
          <p className="text-sm font-medium text-muted">{b.passage.title}</p>
          <div className="mt-3 grid gap-3">
            {b.passage.lines.map((l, i) => (
              <div key={i}>
                <p lang="ja" className="font-kana text-xl leading-relaxed">{l.jp}</p>
                <p className="text-sm text-muted">
                  {l.kana !== l.jp ? <span lang="ja" className="font-kana">{l.kana} · </span> : null}
                  {l.romaji}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-lg font-medium">{b.question}</p>
      </div>
    );
  }
  return <ListenBody speak={b.speak} />;
}

function ListenBody({ speak }: { speak: string }) {
  const m = useMessages();
  const [speaking, setSpeaking] = useState(false);
  const play = (slow = false) => speakJapanese(speak, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false), rate: slow ? 0.55 : undefined });
  return (
    <div className="mt-4 grid place-items-center gap-3 rounded-2xl border border-line bg-genko px-4 py-8">
      <button
        type="button"
        onClick={() => play()}
        aria-label={m.exam.listenAria}
        className={cn("grid size-24 place-items-center rounded-full bg-indigo text-on-indigo transition-transform active:scale-95", speaking && "ring-4 ring-indigo/30")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-10">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex gap-3 text-sm font-medium">
        <button type="button" onClick={() => play()} className="text-indigo-deep hover:underline">{m.quiz.replay}</button>
        <button type="button" onClick={() => play(true)} className="text-muted hover:text-ink hover:underline">{m.quiz.slower}</button>
      </div>
    </div>
  );
}

function scoreOf(questions: Question[], answers: (number | null)[]): ExamScore[] {
  return SECTIONS.map((s) => {
    const qs = questions.map((q, i) => ({ q, a: answers[i] })).filter((x) => x.q.section === s.id);
    return { section: s.id, score: qs.filter((x) => x.a === x.q.answer).length, total: qs.length };
  }).filter((s) => s.total > 0);
}

function Intro({ onStart, hasVoice, history }: { onStart: () => void; hasVoice: boolean; history: { date: number; seconds: number; scores: { section: string; score: number; total: number }[] }[] }) {
  const recent = [...history].reverse().slice(0, 5);
  const m = useMessages();
  return (
    <div className="grid gap-6">
      <p className="max-w-prose text-xl leading-relaxed text-muted"><T m={(x) => x.exam.intro} /></p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {SECTIONS.map((s) => {
          const off = s.id === "ecoute" && !hasVoice;
          return (
            <li key={s.id} className={cn("rounded-2xl border border-line bg-sheet p-4", off && "opacity-60")}>
              <p>
                <span lang="ja" className="font-kana text-lg font-semibold">{s.jp}</span> <span lang="ja" className="font-kana text-sm text-muted">{s.kana}</span>
              </p>
              <p className="text-sm text-muted">{s.romaji} · <T m={(x) => x.exam.sections[s.id]} /></p>
              <p className="mt-2 text-[15px]">{off ? <T m={(x) => x.exam.noVoice} /> : <T m={(x) => x.exam.counts[s.id]} />}</p>
            </li>
          );
        })}
      </ul>
      <p className="max-w-prose text-sm text-muted"><T m={(x) => x.exam.duration} /></p>
      <div>
        <button type="button" onClick={onStart} className="rounded-full bg-indigo px-7 py-3.5 text-lg font-semibold text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] active:scale-[0.98]">
          <T m={(x) => x.exam.start} />
        </button>
      </div>
      {recent.length ? (
        <div>
          <h2 className="text-lg font-semibold">{m.exam.history}</h2>
          <ul className="mt-3 grid gap-2">
            {recent.map((r) => {
              const e = estimate(r.scores as ExamScore[]);
              return (
                <li key={r.date} className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-line bg-sheet px-4 py-3">
                  <span>{new Date(r.date).toLocaleDateString(m.locale, { day: "numeric", month: "long" })}</span>
                  <span className="tabular-nums">
                    <span className="font-semibold">{e.points}</span> / {e.outOf}{" "}
                    <span className={e.passed ? "text-emerald-700 dark:text-emerald-300" : "text-seal"}>{e.passed ? m.exam.passed : m.exam.notYet}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Results({ questions, answers, seconds, onRestart }: { questions: Question[]; answers: (number | null)[]; seconds: number; onRestart: () => void }) {
  const scores = scoreOf(questions, answers);
  const e = estimate(scores);
  const mistakes = questions.map((q, i) => ({ q, a: answers[i] })).filter((x) => x.a !== x.q.answer);
  const m = useMessages();
  const x = m.exam;
  return (
    <div className="grid gap-8">
      <div className="rounded-3xl border border-line bg-sheet p-6 sm:p-8">
        <p className="text-sm text-muted">{x.estimate(fmt(seconds, m))}</p>
        <p className="mt-2 text-5xl font-semibold tabular-nums">
          {e.points} <span className="text-2xl font-normal text-muted">/ {e.outOf}</span>
        </p>
        <p className={cn("mt-2 text-lg font-semibold", e.passed ? "text-emerald-700 dark:text-emerald-300" : "text-seal")}>
          {e.passed ? (
            <>
              <span lang="ja" className="font-kana">合格</span> <span lang="ja" className="font-kana text-base">ごうかく</span> <span className="text-base font-normal">· gōkaku · {x.passedWord}</span>
            </>
          ) : (
            x.failed
          )}
        </p>
        <p className="mt-1 text-sm text-muted">
          {x.rules}
          {e.listening.total ? null : x.noListening}
        </p>
        <ul className="mt-6 grid gap-3">
          {scores.map((s) => {
            const meta = SECTIONS.find((sec) => sec.id === s.section)!;
            return (
              <li key={s.section}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span>
                    <span lang="ja" className="font-kana font-semibold">{meta.jp}</span> <span className="text-muted">· {x.sections[meta.id]}</span>
                  </span>
                  <span className="tabular-nums">{s.score} / {s.total}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-line/60">
                  <div className="h-full rounded-full bg-indigo" style={{ width: `${(s.score / s.total) * 100}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {mistakes.length ? (
        <div>
          <h2 className="text-xl font-semibold">{x.toReview(mistakes.length)}</h2>
          <ul className="mt-3 grid gap-3">
            {mistakes.map(({ q, a }) => (
              <li key={q.id} className="rounded-2xl border border-line bg-sheet p-4">
                <p className="text-sm text-muted">{q.instruction}</p>
                <MistakePrompt q={q} />
                <p className="mt-2 text-[15px]">
                  {a === null ? <span className="text-muted">{x.noAnswer}</span> : (
                    <span className="text-seal">
                      {x.yours} <span lang={q.choices[a].lang} className={cn(q.choices[a].lang === "ja" && "font-kana")}>{q.choices[a].label}</span>
                      {q.choices[a].sub ? ` (${q.choices[a].sub})` : ""}.{" "}
                    </span>
                  )}
                  <span className="text-emerald-700 dark:text-emerald-300">
                    {x.right} <span lang={q.choices[q.answer].lang} className={cn(q.choices[q.answer].lang === "ja" && "font-kana")}>{q.choices[q.answer].label}</span>
                    {q.choices[q.answer].sub ? ` (${q.choices[q.answer].sub})` : ""}.
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted">{q.solution}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg">{x.noMistake}</p>
      )}

      <div>
        <button type="button" onClick={onRestart} className="rounded-full bg-indigo px-6 py-3 font-semibold text-on-indigo active:scale-[0.98]">
          {x.again}
        </button>
      </div>
    </div>
  );
}

function MistakePrompt({ q }: { q: Question }) {
  const m = useMessages();
  const b = q.body;
  if (b.kind === "word") return <p lang="ja" className="font-kana mt-1 text-2xl">{b.jp}</p>;
  if (b.kind === "sentence") {
    return (
      <div className="mt-1">
        <p lang="ja" className="font-kana text-lg">{b.jp}</p>
        <p className="text-sm text-muted">{b.romaji}</p>
      </div>
    );
  }
  if (b.kind === "passage") return <p className="mt-1 font-medium">{b.passage.title} : {b.question}</p>;
  return <p className="mt-1 font-medium">{m.exam.heard}</p>;
}

"use client";

import { playFeedback } from "@/lib/feedback";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { recordAnswer } from "@/lib/progress";
import { readingMatches, romajiToKana } from "@/lib/kana-input";
import { speakJapanese, useHasJapaneseVoice } from "@/lib/japanese-speech";
import { setSettings, useAppState } from "@/lib/store";
import { KanaAnswer } from "@/components/srs/kana-answer";
import { useNow } from "@/components/srs/use-now";
import { useLocalFlag } from "@/lib/local-flag";
import { cn } from "@/lib/utils";
import { useLang, useMessages } from "@/i18n/use-lang";
import { pick, type Tr } from "@/i18n/meanings";

/** Consignes : la clé du texte, choisi dans la langue au moment de l'affichage. */
type QuestionKey = "whichOne" | "wordMeaning" | "kanjiMeaning" | "wordReading" | "charReading" | "listen" | "typeKanji" | "hearWord" | "hearMeaning" | "hearSound";

/** Un élément à réviser : un caractère, sa réponse attendue et de quoi fabriquer les mauvaises réponses. */
export type QuizItem = {
  id: string;
  /** Ce qu'on montre (caractère). */
  prompt: string;
  /** Réponse principale (rōmaji pour un kana, lecture en kana pour un kanji). */
  answer: string;
  /** Précision sous la réponse (rōmaji d'une lecture). */
  answerSub?: string;
  /** Sens en français (kanji). */
  meaning?: string;
  /** Sens en anglais et en allemand. */
  meaningTr?: Tr;
  /** Pour les sosies : les caractères parmi lesquels choisir. */
  options?: string[];
  /** Pour les sosies : la consigne (sens + lecture du caractère à trouver). */
  clue?: string;
  clueTr?: Tr;
  /** Famille (hiragana, kanji…) : les mauvaises réponses viennent de la même famille. */
  group?: string;
  /** Autres lectures acceptées quand on tape la réponse (toutes les lectures d'un kanji). */
  accept?: string[];
  /** Texte prononcé dans l'exercice d'écoute (par défaut : la réponse). */
  speak?: string;
  /** Séance express : le type d'exercice dans lequel cet élément est posé. */
  x?: Exclude<Mode, "express">;
};

/** ecoute : écouter puis taper. ecouteMot / ecouteSens / ecouteSon : écouter puis choisir parmi quatre (le mot, son sens, sa lecture). */
type Mode = "kana" | "kanji" | "sosies" | "mots" | "ecoute" | "ecouteMot" | "ecouteSens" | "ecouteSon" | "express";
/** express : tous les exercices mélangés, qui s'enchaînent pendant 5 minutes (chaque élément porte son type dans `x`). */
export const EXPRESS_MS = 5 * 60 * 1000;
const isHearMode = (mode: Mode) => mode === "ecouteMot" || mode === "ecouteSens" || mode === "ecouteSon";

type Question = {
  item: QuizItem;
  /** reading/meaning/pick : quatre choix. type : taper la lecture. listen : écouter puis taper. */
  kind: "reading" | "meaning" | "pick" | "type" | "listen" | "hear";
  /** Questions « hear » : ce que disent les choix (sens, mot en kana, lecture en lettres latines). */
  labels?: "meaning" | "kana" | "latin";
  /** Questions tapées : ce que montre le champ et les réponses acceptées. */
  input?: "latin" | "hiragana" | "katakana";
  accepted?: string[];
  prompt: string;
  promptSub?: string;
  question: QuestionKey;
  choices: { label: string; sub?: string; correct: boolean }[];
};

const shuffle = <T,>(list: T[]) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const KANA_ONLY = /^[～〜]?[ぁ-ゖァ-ヺー・\s]+$/;
const KATAKANA_ONLY = /^[～〜]?[ァ-ヺー・\s]+$/;

/** Une question où l'on tape la lecture, si l'élément s'y prête (lecture en kana ou rōmaji simple). */
function typedQuestion(item: QuizItem, mode: Mode): Question | null {
  const accepted = [item.answer, item.answerSub, ...(item.accept ?? [])].filter((a): a is string => Boolean(a));
  // Réponse descriptive (« petit tsu ») : pas de saisie possible, on garde les choix.
  if (!KANA_ONLY.test(romajiToKana(item.answer, { final: true }).replace(/[-']/g, ""))) return null;
  const single = item.group === "hiragana" || item.group === "katakana" || mode === "kana";
  const listen = mode === "ecoute";
  // Mot déjà écrit en kana : taper sa lecture ne demanderait rien. On garde la question sur le sens.
  if (!listen && !single && item.prompt === item.answer) return null;
  return {
    item,
    kind: listen ? "listen" : "type",
    prompt: item.prompt,
    question: listen ? "listen" : single ? "charReading" : item.prompt.length > 1 ? "wordReading" : "typeKanji",
    choices: [],
    input: single && !listen ? "latin" : KATAKANA_ONLY.test(item.answer) ? "katakana" : "hiragana",
    accepted,
  };
}

function buildQuestions(items: QuizItem[], mode: Mode, count: number, typing: boolean): Question[] {
  if (mode === "express") {
    const tags = [...new Set(items.map((i) => i.x).filter((x): x is NonNullable<QuizItem["x"]> => Boolean(x)))];
    const per = Math.max(2, Math.ceil(count / Math.max(1, tags.length)));
    return shuffle(tags.flatMap((t) => buildQuestions(items.filter((i) => i.x === t), t, per, typing)));
  }
  const distinct = [...new Map(items.map((i) => [i.id, i])).values()];
  items = distinct;
  const hear = isHearMode(mode);
  const hearKey = (o: QuizItem) => (mode === "ecouteSens" ? o.meaning : o.answer);
  const pool = shuffle(mode === "ecoute" ? items.filter((i) => typedQuestion(i, mode)) : hear ? items.filter((i) => hearKey(i)) : items).slice(0, Math.min(count, items.length));
  return pool.map((item, i) => {
    if (hear) {
      const labels = mode === "ecouteSens" ? "meaning" : mode === "ecouteMot" ? "kana" : "latin";
      const candidates = items.filter((o) => o.id !== item.id && hearKey(o) && hearKey(o) !== hearKey(item));
      const sameGroup = candidates.filter((o) => o.group === item.group);
      const unique = new Map<string, QuizItem>();
      for (const o of shuffle(item.group && sameGroup.length >= 3 ? sameGroup : candidates)) {
        if (!unique.has(hearKey(o)!)) unique.set(hearKey(o)!, o);
        if (unique.size === 3) break;
      }
      const make = (o: QuizItem, correct: boolean) =>
        labels === "meaning" ? { label: o.meaning!, correct } : labels === "kana" ? { label: o.answer, sub: o.answerSub, correct } : { label: o.answer, correct };
      return {
        item, kind: "hear" as const, labels, prompt: item.prompt,
        question: mode === "ecouteSens" ? "hearMeaning" as const : mode === "ecouteMot" ? "hearWord" as const : "hearSound" as const,
        choices: shuffle([make(item, true), ...[...unique.values()].map((o) => make(o, false))]),
      };
    }
    if ((typing && mode !== "sosies") || mode === "ecoute") {
      const typed = typedQuestion(item, mode);
      if (typed) return typed;
    }
    if (mode === "sosies" && item.options) {
      return {
        item, kind: "pick", prompt: item.clue ?? "", question: "whichOne",
        choices: shuffle(item.options).map((o) => ({ label: o, correct: o === item.prompt })),
      };
    }
    // Vocabulaire : toujours le sens (la lecture est affichée sous le mot).
    const kind = (mode === "mots" && item.meaning) || (mode === "kanji" && i % 3 === 2 && item.meaning) ? "meaning" : "reading";
    const candidates = items.filter((o) => o.id !== item.id && (kind === "meaning" ? o.meaning && o.meaning !== item.meaning : o.answer !== item.answer));
    const sameGroup = candidates.filter((o) => o.group === item.group);
    const others = shuffle(item.group && sameGroup.length >= 3 ? sameGroup : candidates);
    const unique = new Map<string, QuizItem>();
    for (const o of others) {
      const key = kind === "meaning" ? o.meaning! : o.answer;
      if (!unique.has(key)) unique.set(key, o);
      if (unique.size === 3) break;
    }
    const wrong = [...unique.values()];
    const make = (o: QuizItem, correct: boolean) =>
      kind === "meaning" ? { label: o.meaning!, correct } : { label: o.answer, sub: o.answerSub, correct };
    return {
      item, kind,
      prompt: item.prompt,
      promptSub: kind === "meaning" ? [item.answer, item.answerSub].filter(Boolean).join(" · ") : undefined,
      question: kind === "meaning" ? (mode === "mots" || item.prompt.length > 1 ? "wordMeaning" : "kanjiMeaning") : item.prompt.length > 1 && item.group !== "hiragana" && item.group !== "katakana" ? "wordReading" : "charReading",
      choices: shuffle([make(item, true), ...wrong.map((o) => make(o, false))]),
    };
  });
}

export function Quiz({ items: initialItems, mode, title, deadline, onClose, onFinish }: {
  items: QuizItem[];
  mode: Mode;
  title: string;
  /** Séance express : l'instant (ms) où les 5 minutes se terminent. */
  deadline?: number;
  onClose: () => void;
  /** Appelé à la fin d'une série (exercice de rattrapage) : la page affiche alors son propre résultat. */
  onFinish?: (score: number, total: number) => void;
}) {
  // Liste figée à l'ouverture : la progression qui change pendant le quiz ne doit pas regénérer les questions.
  const lang = useLang();
  // Le quiz s'ouvre après un geste de l'utilisateur : la langue est connue, les sens sont choisis une fois.
  const [items] = useState(() =>
    initialItems.map((i) => ({
      ...i,
      meaning: i.meaning === undefined ? undefined : pick(i.meaning, i.meaningTr, lang),
      clue: i.clue === undefined ? undefined : pick(i.clue, i.clueTr, lang),
    })),
  );
  const { settings } = useAppState();
  const m = useMessages();
  const qz = m.quiz;
  const typing = settings.quizTyping === true;
  const express = mode === "express";
  const canType = mode !== "sosies" && mode !== "ecoute" && !isHearMode(mode) && !express;
  const [showRomaji, setShowRomaji] = useLocalFlag("nihongo.romaji", true);
  const hasVoice = useHasJapaneseVoice();
  const [round, setRound] = useState(0);
  const [retry, setRetry] = useState<QuizItem[] | null>(null);
  const questions = useMemo(() => (express ? Array.from({ length: 12 }, () => buildQuestions(items, mode, 24, typing)).flat() : buildQuestions(retry ?? items, mode, retry ? retry.length : 10, typing)), [items, mode, retry, round, typing, express]); // eslint-disable-line react-hooks/exhaustive-deps
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  /** Réponse tapée (questions « type » et « listen »). */
  const [typed, setTyped] = useState<{ text: string; ok: boolean } | null>(null);
  const [mistakes, setMistakes] = useState<QuizItem[]>([]);
  const [score, setScore] = useState(0);
  // Séance express : le temps qui reste, le nombre de réponses données, et l'arrêt demandé par « Terminer ».
  const tick = useNow(1000);
  const timeLeft = express && deadline && tick ? Math.max(0, deadline - tick) : EXPRESS_MS;
  const timeUp = express && Boolean(deadline) && tick > 0 && tick >= (deadline ?? 0);
  const [stopped, setStopped] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const done = stopped || timeUp || (express ? questions.length === 0 : index >= questions.length);
  const total = express ? answeredCount : questions.length;
  // Express : la liste est longue et l'indice boucle par sécurité, la séance ne s'arrête que par le temps ou « Terminer ».
  const q = questions[express && questions.length ? index % questions.length : index];
  const hearing = q?.kind === "hear" || q?.kind === "listen";
  const hideRomaji = hearing && !showRomaji;
  const showRomajiToggle = mode === "ecoute" || mode === "ecouteMot" || mode === "ecouteSens" || express;
  // Écoute : le premier mot est prononcé dès l'ouverture (les suivants au clic sur « Suivant »).
  const firstListen = index === 0 && (q?.kind === "listen" || q?.kind === "hear") ? q.item : null;
  useEffect(() => {
    if (firstListen) speakJapanese(firstListen.speak ?? firstListen.answer);
  }, [firstListen]);
  const finishRef = useRef(onFinish);
  useEffect(() => {
    finishRef.current = onFinish;
  });
  useEffect(() => {
    if (done) {
      playFeedback("complete");
      finishRef.current?.(score, total);
    }
  }, [done, score, total]);

  const answered = picked !== null || typed !== null;
  const correct = typed ? typed.ok : picked !== null && q?.choices[picked]?.correct;
  const record = (ok: boolean) => {
    recordAnswer(q.item.id, ok);
    setAnsweredCount((n) => n + 1);
    if (ok) setScore((s) => s + 1);
    else setMistakes((m) => (m.some((x) => x.id === q.item.id) ? m : [...m, q.item]));
  };
  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    playFeedback(q.choices[i].correct ? "correct" : "wrong");
    record(q.choices[i].correct);
  };
  const submitTyped = (text: string) => {
    if (answered) return;
    const ok = Boolean(text) && readingMatches(text, q.accepted ?? []);
    setTyped({ text, ok });
    playFeedback(ok ? "correct" : "wrong");
    record(ok);
  };
  /** Faute de frappe : on compte la réponse comme juste. */
  const overrule = () => {
    if (!typed || typed.ok) return;
    setTyped({ ...typed, ok: true });
    playFeedback("correct");
    setScore((s) => s + 1);
    setMistakes((m) => m.filter((x) => x.id !== q.item.id));
    recordAnswer(q.item.id, true);
  };
  const next = () => {
    setPicked(null);
    setTyped(null);
    const following = questions[express && questions.length ? (index + 1) % questions.length : index + 1];
    // Le clic sur « Suivant » autorise le navigateur à parler : on lance le mot suivant tout de suite.
    if (following?.kind === "listen" || following?.kind === "hear") speakJapanese(following.item.speak ?? following.item.answer);
    setIndex((i) => i + 1);
  };
  const restart = (only?: QuizItem[]) => {
    setRetry(only ?? null);
    setRound((r) => r + 1);
    setIndex(0);
    setPicked(null);
    setTyped(null);
    setMistakes([]);
    setScore(0);
    setAnsweredCount(0);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{title}</p>
        {canType ? (
          <button
            type="button"
            aria-pressed={typing}
            title={typing ? m.typing.keyboardOn : m.typing.keyboardOff}
            onClick={() => {
              setSettings({ ...settings, quizTyping: !typing });
              restart();
            }}
            className={cn(
              "ml-auto whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium transition-colors",
              typing ? "border-indigo/50 bg-indigo-soft text-indigo-deep" : "border-line text-muted hover:text-ink",
            )}
          >
            <span aria-hidden="true">⌨ </span>{m.typing.keyboard}
          </button>
        ) : null}
        <button type="button" onClick={onClose} aria-label={qz.close} className="grid size-9 place-items-center rounded-full border border-line text-lg text-muted hover:border-indigo hover:text-ink">×</button>
      </div>
      {(express || showRomajiToggle) && !done ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {express ? (
            <span role="timer" className={cn("rounded-full border px-3 py-1 text-sm font-semibold tabular-nums", timeLeft < 30_000 ? "border-seal/50 text-seal" : "border-line text-muted")}>
              <span lang="ja" aria-hidden="true" className="font-kana">急</span> {Math.floor(timeLeft / 60000)}:{String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, "0")}
            </span>
          ) : null}
          {showRomajiToggle ? (
            <button
              type="button"
              aria-pressed={showRomaji}
              onClick={() => setShowRomaji(!showRomaji)}
              className={cn("whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium transition-colors", showRomaji ? "border-indigo/50 bg-indigo-soft text-indigo-deep" : "border-line text-muted hover:text-ink")}
            >
              {qz.romaji}
            </button>
          ) : null}
          {express ? (
            <button type="button" onClick={() => setStopped(true)} className="ml-auto whitespace-nowrap rounded-full bg-contrast px-4 py-1.5 text-sm font-semibold text-on-contrast active:scale-[0.97]">
              {qz.finish}
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/60" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-indigo"
          animate={{ width: express ? `${(1 - timeLeft / EXPRESS_MS) * 100}%` : `${(Math.min(index, questions.length) / questions.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="end" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            {(() => {
              const verdict = total > 0 && score === total
                ? { jp: "満点", kana: "まんてん", romaji: "manten", fr: qz.perfect }
                : score >= total * 0.7 && total > 0
                  ? { jp: "上手", kana: "じょうず", romaji: "jōzu", fr: qz.skilled }
                  : { jp: "練習", kana: "れんしゅう", romaji: "renshū", fr: qz.practice };
              return (
                <div>
                  <ruby lang="ja" className="font-kana text-6xl">
                    {verdict.jp}
                    <rt className="text-[0.28em] text-indigo">{verdict.kana}</rt>
                  </ruby>
                  <p className="mt-1 text-sm text-muted">{verdict.romaji} · {verdict.fr}</p>
                </div>
              );
            })()}
            <p className="mt-4 text-3xl font-semibold">{score} / {total}</p>
            <p className="mt-2 max-w-xs text-muted">
              {total > 0 && score === total ? qz.allRight : total > 0 && score >= total * 0.7 ? qz.good : qz.keepGoing}
            </p>
            {mistakes.length ? (
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {mistakes.map((m) => (
                  <li key={m.id} className="rounded-lg border border-seal/40 bg-seal-soft px-3 py-1.5 text-center">
                    <span lang="ja" className="font-kana block text-2xl">{m.prompt}</span>
                    <span className="text-xs text-muted">{[m.answer, m.answerSub].filter(Boolean).join(" · ")}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {express ? (
                <button type="button" onClick={onClose} className="rounded-full bg-indigo px-5 py-2.5 font-semibold text-on-indigo active:scale-[0.97]">
                  {qz.close}
                </button>
              ) : null}
              {!express && mistakes.length ? (
                <button type="button" onClick={() => restart(mistakes)} className="rounded-full bg-indigo px-5 py-2.5 font-semibold text-on-indigo active:scale-[0.97]">
                  {qz.retryMistakes}
                </button>
              ) : null}
              {!express ? (
                <button type="button" onClick={() => restart()} className="rounded-full border border-line bg-sheet px-5 py-2.5 font-semibold active:scale-[0.97]">
                  {qz.newQuiz}
                </button>
              ) : null}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`${round}-${index}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
            className="flex flex-1 flex-col py-5"
          >
            <p className="text-sm text-muted">{express ? qz.questionN(answeredCount + 1) : qz.question(index + 1, questions.length)}</p>
            <p className="mt-1 text-lg font-medium">{qz[q.question]}</p>
            <div className="my-5 grid place-items-center rounded-2xl border border-line bg-genko py-6">
              {q.kind === "pick" ? (
                <p className="px-4 text-center text-2xl font-semibold">{q.prompt}</p>
              ) : q.kind === "listen" || q.kind === "hear" ? (
                <ListenPrompt item={q.item} revealed={answered} hasVoice={hasVoice} showRomaji={showRomaji} />
              ) : (
                <>
                  <p lang="ja" className="font-kana text-7xl leading-none sm:text-8xl">{q.prompt}</p>
                  {q.promptSub ? <p className="mt-3 text-muted">{q.promptSub}</p> : null}
                </>
              )}
            </div>
            {q.kind === "type" || q.kind === "listen" ? (
              answered ? null : (
                <KanaAnswer key={`${round}-${index}`} mode={q.input ?? "hiragana"} onSubmit={submitTyped} onSkip={() => submitTyped("")} withButton />
              )
            ) : (
              <div className={cn("grid gap-2.5", q.kind === "pick" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2")}>
                {q.choices.map((c, i) => {
                  const state = picked === null ? "idle" : c.correct ? "right" : picked === i ? "wrong" : "dim";
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                      whileTap={picked === null ? { scale: 0.96 } : undefined}
                      animate={state === "wrong" ? { x: [0, -8, 8, -5, 5, 0] } : state === "right" ? { scale: [1, 1.04, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className={cn(
                        "rounded-xl border-2 px-3 py-3.5 text-center transition-colors",
                        state === "idle" && "border-line bg-sheet hover:border-indigo",
                        state === "right" && "border-emerald-500 bg-emerald-500/12",
                        state === "wrong" && "border-seal bg-seal-soft",
                        state === "dim" && "border-line bg-sheet opacity-50",
                      )}
                    >
                      <span
                        lang={q.kind === "meaning" || q.labels === "meaning" ? lang : q.labels === "latin" ? undefined : "ja"}
                        className={cn(q.kind === "meaning" || q.labels === "meaning" ? "text-base font-medium" : q.labels === "latin" ? "text-2xl font-semibold" : "font-kana text-2xl", q.kind === "pick" && "text-4xl")}
                      >
                        {c.label}
                      </span>
                      {c.sub && !hideRomaji ? <span className="block text-sm text-muted">{c.sub}</span> : null}
                    </motion.button>
                  );
                })}
              </div>
            )}
            <div className="mt-auto pt-5">
              {answered ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-3">
                  <div className={cn("text-[15px]", correct ? "text-emerald-700 dark:text-emerald-300" : "text-seal")}>
                    {typed?.text ? (
                      <p>
                        {typed.ok ? m.typing.right : m.typing.wrong}{" "}
                        <span className="text-muted">{m.typing.youTyped} </span>
                        <span lang={q.input === "latin" ? undefined : "ja"} className={cn(q.input !== "latin" && "font-kana", !typed.ok && "line-through")}>{typed.text}</span>
                      </p>
                    ) : correct ? <p>{qz.correct}</p> : null}
                    {!correct || q.kind === "listen" || q.kind === "hear" ? (
                      <p className={cn(correct && "text-ink")}>
                        {correct ? qz.itWas : qz.answer}{" "}
                        <span lang="ja" className="font-kana">{q.item.prompt}</span> = {[q.item.answer !== q.item.prompt ? q.item.answer : null, hideRomaji ? null : q.item.answerSub, q.item.meaning].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                    {typed?.text && !typed.ok ? (
                      <button type="button" onClick={overrule} className="mt-1 text-sm font-medium text-muted underline-offset-2 hover:text-ink hover:underline">
                        {m.typing.typo}
                      </button>
                    ) : null}
                  </div>
                  <button type="button" onClick={next} autoFocus className="shrink-0 rounded-full bg-indigo px-5 py-2.5 font-semibold text-on-indigo active:scale-[0.97]">
                    {index + 1 < questions.length ? qz.next : qz.result}
                  </button>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Exercice d'écoute : bouton pour (ré)entendre le mot ; le mot écrit n'apparaît qu'après la réponse. */
function ListenPrompt({ item, revealed, hasVoice, showRomaji }: { item: QuizItem; revealed: boolean; hasVoice: boolean; showRomaji: boolean }) {
  const qz = useMessages().quiz;
  const [speaking, setSpeaking] = useState(false);
  const text = item.speak ?? item.answer;
  const play = (slow = false) =>
    speakJapanese(text, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false), rate: slow ? 0.55 : undefined });

  if (!hasVoice) {
    return (
      <p className="max-w-xs px-4 text-center text-sm text-muted">
        {qz.noVoice}
      </p>
    );
  }
  return (
    <div className="grid place-items-center gap-3 px-4">
      {revealed ? (
        <div className="text-center">
          <p lang="ja" className="font-kana text-5xl leading-none text-brush sm:text-6xl">{item.prompt}</p>
          {item.answer !== item.prompt && item.group !== "hiragana" && item.group !== "katakana" && /[ぁ-ゖァ-ヺ]/.test(item.answer) ? <p lang="ja" className="font-kana mt-2 text-xl text-indigo-deep">{item.answer}</p> : null}
          {showRomaji && item.answerSub ? <p className="mt-1 text-muted">{item.answerSub}</p> : null}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => play()}
          aria-label={qz.listenWord}
          className={cn("grid size-24 place-items-center rounded-full bg-indigo text-on-indigo shadow-[0_16px_30px_-18px_rgba(44,74,140,0.9)] transition-transform active:scale-95", speaking && "ring-4 ring-indigo/30")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-10">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <div className="flex gap-3 text-sm font-medium">
        <button type="button" onClick={() => play()} className="text-indigo-deep hover:underline">{qz.replay}</button>
        <button type="button" onClick={() => play(true)} className="text-muted hover:text-ink hover:underline">{qz.slower}</button>
      </div>
    </div>
  );
}

/** Bouton qui ouvre un quiz dans un panneau (plein écran sur téléphone). */
export function QuizLauncher({ items, mode, title, label, glyph = "問", autoOpenParam, large }: { items: QuizItem[]; mode: Mode; title: string; label: string; glyph?: string; /** Ouvre le quiz tout de suite si l'adresse contient ?<nom>=1 (lien « Express »). */ autoOpenParam?: string; large?: boolean }) {
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const launch = () => {
    if (mode === "express") setDeadline(Date.now() + EXPRESS_MS);
    setOpen(true);
  };
  useEffect(() => {
    if (autoOpenParam && new URLSearchParams(window.location.search).get(autoOpenParam) === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeadline(Date.now() + EXPRESS_MS);
      setOpen(true);
    }
  }, [autoOpenParam]);
  return (
    <>
      <button
        type="button"
        onClick={launch}
        className={cn("inline-flex items-center gap-2 rounded-full bg-indigo font-semibold text-on-indigo shadow-[0_10px_22px_-12px_rgba(44,74,140,0.8)] transition-transform active:scale-[0.97]", large ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-[15px]")}
      >
        <span lang="ja" aria-hidden="true" className="font-kana">{glyph}</span>
        {label}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="flex h-[92dvh] w-full max-w-lg flex-col rounded-t-3xl border border-line bg-paper p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:h-auto sm:min-h-[36rem] sm:rounded-3xl sm:p-7"
            >
              <Quiz items={items} mode={mode} title={title} deadline={mode === "express" ? deadline : undefined} onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

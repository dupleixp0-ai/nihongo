import type { Metadata } from "next";
import { Gate } from "@/components/site/gate";
import { vocab } from "@/data/vocab";
import { readings as texts } from "@/data/readings";
import { kanjiList } from "@/data/kanji";
import { LOOKALIKES } from "@/data/kanji-notes";
import { EXAM_PASSAGES, type ExamPassage } from "@/data/exam-n5";
import { ctext, sentenceDe } from "@/i18n/content";
import { PARTICLES } from "@/lib/exam";
import { ExamRunner, type ExamData } from "@/components/exam/exam-runner";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Examen blanc N5 · Nihongo",
  description: "Un examen blanc sur le modèle du JLPT N5 : vocabulaire, grammaire, lecture et écoute, avec une estimation du résultat.",
};

/** Un passage de lecture dans une langue : titre, traduction, questions et choix. */
function passageText(p: ExamPassage, lang: "en" | "de") {
  return { title: ctext(p.title, lang), fr: ctext(p.fr, lang), questions: p.questions.map((q) => ({ question: ctext(q.question, lang), choices: q.choices.map((c) => ctext(c, lang)) })) };
}

/** Les données de l'examen, préparées au build : le navigateur tire les questions au hasard. */
function examData(): ExamData {
  const words = vocab
    .filter((w) => w.level === "N5")
    .map((w) => ({ id: w.slug, jp: w.jp, kana: w.kana, romaji: w.romaji, fr: w.fr, tr: w.tr, theme: w.theme }));
  const particles = new Set<string>(PARTICLES);
  const sentences = texts
    .filter((t) => t.level === "N5")
    .flatMap((t) =>
      t.sentences.map((s, i) => ({
        id: `${t.slug}-${i}`,
        fr: s.fr,
        tr: { en: s.en, de: sentenceDe(s.romaji) },
        tokens: s.tokens.map((tok) => ({ t: tok.t, r: tok.r, rm: tok.rm, particle: Boolean(tok.g && !tok.m && particles.has(tok.t)) })),
      })),
    )
    .filter((s) => s.tokens.some((tok) => tok.particle) && s.tokens.length >= 4);
  return {
    words,
    sentences,
    passages: EXAM_PASSAGES.map((p) => ({ ...p, tr: { en: passageText(p, "en"), de: passageText(p, "de") } })),
    lookalikes: LOOKALIKES.map((g) => g.items.map((i) => i.character)),
    kanjiPool: kanjiList.filter((k) => k.level === "N5").map((k) => k.character),
  };
}

export default function ExamPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="exam" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">試</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.exam.title} /></h1>
          <p className="mt-1 text-muted">
            <span lang="ja" className="font-kana text-ink">模擬試験</span> <span lang="ja" className="font-kana">もぎしけん</span> · mogi shiken · <T m={(m) => m.exam.reading} />
          </p>
        </div>
      </div>
      <div className="mt-8">
        <Gate id="/examen" subHeading glyph="試" title={<T m={(m) => m.exam.title} />}>
          <ExamRunner data={examData()} />
        </Gate>
      </div>
    </main>
  );
}

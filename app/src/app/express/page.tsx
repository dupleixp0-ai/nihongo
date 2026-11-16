import type { Metadata } from "next";
import { catalog } from "@/data/catalog";
import { vocab, wordCardId } from "@/data/vocab";
import { verbs } from "@/data/verbs";
import { lessonOrder, verbCardId } from "@/data/srs-items";
import { lookalikeItems } from "@/data/lookalike-items";
import type { QuizItem } from "@/components/quiz/quiz";
import { ExpressStart } from "@/components/express/express-start";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Révision express · Nihongo",
  description: "5 minutes de questions variées (kana, kanji, mots, verbes, écoute) pour voir ton maximum.",
};

export default function ExpressPage() {
  const words: QuizItem[] = vocab.map((w) => ({ id: wordCardId(w.slug), prompt: w.jp, answer: w.kana, answerSub: w.romaji, meaning: w.fr, meaningTr: w.tr, speak: w.kana.replace(/^～/, ""), group: w.theme }));
  const verbItems: QuizItem[] = verbs.map((v) => ({ id: verbCardId(v.slug), prompt: v.jp, answer: v.kana, answerSub: v.romaji, meaning: v.meaning, meaningTr: v.meaningTr, speak: v.kana }));
  const order = lessonOrder();
  const kana: QuizItem[] = [...order.hiragana.map((c) => ({ ...c, group: "hiragana" })), ...order.katakana.map((c) => ({ ...c, group: "katakana" }))]
    .filter((c) => /^[a-zāīūēō]{1,4}$/i.test(c.label) && [...c.character].length === 1)
    .map((c) => ({ id: c.href, prompt: c.character, answer: c.label, speak: c.character, group: c.group }));
  const seen = new Set<string>();
  const kanji: QuizItem[] = catalog.kanji.sections.flatMap((s) => s.cells.flatMap((c) => {
    if (!c?.href || seen.has(c.href)) return [];
    seen.add(c.href);
    return [{ id: c.href, prompt: c.character, answer: c.reading ?? c.label, answerSub: c.romaji, meaning: c.label, meaningTr: c.labelTr, accept: c.readings, group: "kanji" }];
  }));
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="express" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">急</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.pages.express.title} /></h1>
          <p className="mt-1 text-muted"><T m={(m) => m.pages.express.sub} /></p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted"><T m={(m) => m.pages.express.intro} /></p>
      <ul className="mt-6 grid gap-2">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">✓</span>
            <span><T m={(m) => m.pages.express.points[i]} /></span>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ExpressStart kana={kana} kanji={kanji} words={words} verbs={verbItems} lookalikes={lookalikeItems} />
      </div>
    </main>
  );
}

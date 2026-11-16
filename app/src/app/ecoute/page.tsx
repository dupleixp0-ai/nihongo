import type { Metadata } from "next";
import { vocab, wordCardId } from "@/data/vocab";
import { verbs } from "@/data/verbs";
import { lessonOrder, verbCardId } from "@/data/srs-items";
import type { QuizItem } from "@/components/quiz/quiz";
import { EcouteHub } from "@/components/ecoute/ecoute-hub";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Écoute · Nihongo",
  description: "Entraîne ton oreille : reconnais les mots, leur sens et les sons des kana, et répète après la voix.",
};

export default function ListeningPage() {
  const words: QuizItem[] = vocab.map((w) => ({ id: wordCardId(w.slug), prompt: w.jp, answer: w.kana, answerSub: w.romaji, meaning: w.fr, meaningTr: w.tr, speak: w.kana.replace(/^～/, "") }));
  const verbItems: QuizItem[] = verbs.map((v) => ({ id: verbCardId(v.slug), prompt: v.jp, answer: v.kana, answerSub: v.romaji, meaning: v.meaning, meaningTr: v.meaningTr, speak: v.kana }));
  // Sons des kana : seulement les lettres simples (pas les leçons descriptives comme « petit tsu »).
  const order = lessonOrder();
  const kana: QuizItem[] = [...order.hiragana.map((c) => ({ ...c, group: "hiragana" })), ...order.katakana.map((c) => ({ ...c, group: "katakana" }))]
    .filter((c) => /^[a-zāīūēō]{1,4}$/i.test(c.label) && [...c.character].length === 1)
    .map((c) => ({ id: c.href, prompt: c.character, answer: c.label, speak: c.character, group: c.group }));
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="listen" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">聞</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.pages.listen.title} /></h1>
          <p className="mt-1 text-muted">
            <span lang="ja" className="font-kana text-ink">聞く</span> <span lang="ja" className="font-kana">きく</span> · kiku · <T m={(m) => m.pages.listen.sub} />
          </p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted">
        <T m={(m) => m.pages.listen.intro} />
      </p>
      <div className="mt-10">
        <EcouteHub words={words} verbs={verbItems} kana={kana} />
      </div>
    </main>
  );
}

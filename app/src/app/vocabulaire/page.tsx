import type { Metadata } from "next";
import { vocab, VOCAB_THEMES } from "@/data/vocab";
import { VocabList } from "@/components/vocab/vocab-list";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Vocabulaire · Nihongo",
  description: "Le vocabulaire du JLPT N5 et N4 par thème : écriture, kana, rōmaji, sens, prononciation, quiz et révisions.",
};

export default function VocabularyPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="vocab" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">単</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.pages.vocab.title} /></h1>
          <p className="mt-1 text-muted">
            <span lang="ja" className="font-kana text-ink">単語</span> <span lang="ja" className="font-kana">たんご</span> · tango · <T m={(m) => m.pages.vocab.sub(vocab.length)} />
          </p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted">
        <T m={(m) => m.pages.vocab.intro} />
      </p>
      <div className="mt-10">
        <VocabList words={vocab} themes={VOCAB_THEMES} />
      </div>
    </main>
  );
}

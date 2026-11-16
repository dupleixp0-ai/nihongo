import Link from "next/link";
import type { Metadata } from "next";
import { allSrsItems } from "@/data/srs-items";
import { ReviewCenter } from "@/components/srs/review-center";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Révisions · Nihongo",
  description: "Révisions espacées des kana, kanji et verbes : chaque carte revient juste avant que tu l'oublies.",
};

export default function RevisionsPage() {
  const items = allSrsItems();
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="reviews" />
      <header className="mb-8 flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">復</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.review.title} /></h1>
          <p className="mt-1 text-muted"><span lang="ja" className="font-kana text-ink">復習</span> <span lang="ja" className="font-kana">ふくしゅう</span> · fukushū · <T m={(m) => m.review.reading} /></p>
        </div>
      </header>
      <p className="-mt-4 mb-8"><Link href="/statistiques" className="font-medium text-indigo hover:text-indigo-deep"><T m={(m) => m.stats.link} /></Link></p>
      <ReviewCenter items={items} />
    </main>
  );
}

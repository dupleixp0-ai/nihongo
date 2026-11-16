import Link from "next/link";
import type { Metadata } from "next";
import { allSrsItems, lessonGroups } from "@/data/srs-items";
import { FlameCenter } from "@/components/flame/flame-center";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Ta flamme · Nihongo",
  description: "La flamme d'apprentissage : les jours d'étude d'affilée, et le rattrapage des jours manqués.",
};

export default function FlamePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="flame" />
      <header className="mb-8 flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">炎</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.flame.title} /></h1>
          <p className="mt-1 text-muted"><span lang="ja" className="font-kana text-ink">炎</span> <span lang="ja" className="font-kana">ほのお</span> · honoo · <T m={(m) => m.flame.reading} /></p>
        </div>
      </header>
      <p className="-mt-4 mb-8"><Link href="/statistiques" className="font-medium text-indigo hover:text-indigo-deep"><T m={(m) => m.stats.link} /></Link></p>
      <FlameCenter items={allSrsItems()} groups={lessonGroups()} />
    </main>
  );
}

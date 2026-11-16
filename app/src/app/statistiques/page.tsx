import type { Metadata } from "next";
import { allSrsItems, lessonOrder } from "@/data/srs-items";
import { StatsPage } from "@/components/stats/stats-page";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Statistiques · Nihongo",
  description: "Tes progrès : cartes acquises et fragiles, réponses par jour, régularité, couverture N5 et N4.",
};

export default function StatsRoute() {
  const items = allSrsItems().map((i) => ({ id: i.id, kind: i.kind, level: i.level, front: i.front, href: i.href }));
  const order = lessonOrder();
  const lessons = [...order.hiragana, ...order.katakana, ...order.kanji].map((l) => ({ href: l.href, character: l.character }));
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="stats" />
      <header className="mb-8 flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">計</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.stats.title} /></h1>
          <p className="mt-1 text-muted"><span lang="ja" className="font-kana text-ink">統計</span> <span lang="ja" className="font-kana">とうけい</span> · tōkei · <T m={(m) => m.stats.reading} /></p>
        </div>
      </header>
      <p className="mb-8 text-muted"><T m={(m) => m.stats.intro} /></p>
      <StatsPage items={items} lessons={lessons} />
    </main>
  );
}

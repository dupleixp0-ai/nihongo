import { notFound } from "next/navigation";
import { Gate } from "@/components/site/gate";
import type { Metadata } from "next";
import { neighbours } from "@/data/catalog";
import { LessonPager } from "@/components/site/lesson-pager";
import { getKanji, kanjiSlugs } from "@/data/kanji";
import { KanjiLesson } from "@/components/kana/kanji-lesson";
import { L } from "@/i18n/t";
import { DocTitleText } from "@/components/site/doc-title";
import { LANGS } from "@/i18n/lang";
import { kanjiTr, pick } from "@/i18n/meanings";
import type { Lang } from "@/i18n/lang";

export function generateStaticParams() {
  return kanjiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/kanji/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const kanji = getKanji(slug);
  if (!kanji) return {};
  return {
    title: `Kanji ${kanji.character} (${kanji.meaning}) · Nihongo`,
    description: `Apprendre le kanji ${kanji.character} : lectures, ordre des traits et histoire mnémotechnique.`,
  };
}

export default async function KanjiPage({ params }: PageProps<"/kanji/[slug]">) {
  const { slug } = await params;
  const kanji = getKanji(slug);
  if (!kanji) notFound();

  const titles = Object.fromEntries(LANGS.map((l) => [l, `Kanji ${kanji.character} (${pick(kanji.meaning, kanjiTr(slug), l)}) · Nihongo`])) as Record<Lang, string>;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:px-8 sm:py-10">
      <DocTitleText titles={titles} />
      <LessonPager backHref="/kanji" backLabel="Kanji" {...neighbours("kanji", `/kanji/${slug}`)}>
        <Gate id={`/kanji/${slug}`} glyph={kanji.character} title={<L v={{ fr: kanji.meaning, ...kanjiTr(slug) }} />}>
          <KanjiLesson kanji={kanji} />
        </Gate>
      </LessonPager>
    </main>
  );
}

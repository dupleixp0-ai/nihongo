import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { neighbours } from "@/data/catalog";
import { LessonPager } from "@/components/site/lesson-pager";
import { getHiraganaLesson, hiraganaLessonSlugs } from "@/data/hiragana";
import { KanaLesson } from "@/components/kana/kana-lesson";

export function generateStaticParams() {
  return hiraganaLessonSlugs().map((romaji) => ({ romaji }));
}

export async function generateMetadata({ params }: PageProps<"/hiragana/[romaji]">): Promise<Metadata> {
  const { romaji } = await params;
  const kana = getHiraganaLesson(romaji);
  if (!kana) return {};
  return {
    title: `Hiragana ${kana.character} (${kana.romaji}) · Nihongo`,
    description: `Apprendre à lire et à retenir le hiragana ${kana.character} avec une histoire mnémotechnique.`,
  };
}

export default async function HiraganaPage({ params }: PageProps<"/hiragana/[romaji]">) {
  const { romaji } = await params;
  const kana = getHiraganaLesson(romaji);
  if (!kana) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:px-8 sm:py-10">
      <LessonPager backHref="/hiragana" backLabel="Hiragana" {...neighbours("hiragana", `/hiragana/${romaji}`)}>
        <KanaLesson kana={kana} />
      </LessonPager>
    </main>
  );
}

import { notFound } from "next/navigation";
import { Gate } from "@/components/site/gate";
import type { Metadata } from "next";
import { neighbours } from "@/data/catalog";
import { LessonPager } from "@/components/site/lesson-pager";
import { getKatakanaLesson, katakanaLessonSlugs } from "@/data/katakana";
import { KanaLesson } from "@/components/kana/kana-lesson";

export function generateStaticParams() {
  return katakanaLessonSlugs().map((romaji) => ({ romaji }));
}

export async function generateMetadata({ params }: PageProps<"/katakana/[romaji]">): Promise<Metadata> {
  const { romaji } = await params;
  const kana = getKatakanaLesson(romaji);
  if (!kana) return {};
  return {
    title: `Katakana ${kana.character} (${kana.romaji}) · Nihongo`,
    description: `Apprendre à lire et à retenir le katakana ${kana.character} avec une histoire mnémotechnique.`,
  };
}

export default async function KatakanaPage({ params }: PageProps<"/katakana/[romaji]">) {
  const { romaji } = await params;
  const kana = getKatakanaLesson(romaji);
  if (!kana) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:px-8 sm:py-10">
      <LessonPager backHref="/katakana" backLabel="Katakana" {...neighbours("katakana", `/katakana/${romaji}`)}>
        <Gate id={`/katakana/${romaji}`} glyph={kana.character} title={kana.romaji}>
          <KanaLesson kana={kana} />
        </Gate>
      </LessonPager>
    </main>
  );
}

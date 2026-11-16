import type { Metadata } from "next";
import { catalog, countLessons } from "@/data/catalog";
import { ScriptExplorer } from "@/components/site/script-explorer";
import { T } from "@/i18n/t";

const data = catalog.katakana;
const lessons = countLessons("katakana");

export const metadata: Metadata = {
  title: `${data.title} · Nihongo`,
  description: data.intro,
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex items-end gap-5 sm:gap-7">
        <span
          aria-hidden="true"
          lang="ja"
          className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl text-ink sm:size-28 sm:text-7xl"
        >
          {data.glyph}
        </span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{data.title}</h1>
          <p className="mt-1 text-muted"><T m={(m) => m.pages.lessons(lessons)} /></p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted"><T m={(m) => m.pages.katakanaIntro} /></p>
      <div className="mt-10">
        <ScriptExplorer script="katakana" sections={data.sections} />
      </div>
    </main>
  );
}

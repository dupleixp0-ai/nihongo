import Link from "next/link";
import { LockBadge } from "@/components/site/gate";
import type { Metadata } from "next";
import { readings, titleReading } from "@/data/readings";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";
import { Tx } from "@/i18n/tx";

export const metadata: Metadata = {
  title: "Lecture · Nihongo",
  description: "Lire de vrais textes de niveau N5 : contes japonais et dialogues, avec lectures, rōmaji et traduction.",
};

export default function LecturePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="reading" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">
          読
        </span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.pages.reading.title} /></h1>
          <p className="mt-1 text-muted"><T m={(m) => m.pages.reading.count(readings.length)} /></p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted">
        <T m={(m) => m.pages.reading.intro} />
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {readings.map((text) => (
          <li key={text.slug}>
            <Link
              href={`/lecture/${text.slug}`}
              className="group relative flex h-full flex-col rounded-2xl border border-line bg-sheet p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-indigo hover:shadow-[0_24px_48px_-28px_rgba(44,74,140,0.6)] active:scale-[0.985]"
            >
              <LockBadge id={`/lecture/${text.slug}`} className="absolute right-4 top-4" />
              <span className="text-sm font-medium text-seal"><T m={(m) => m.pages.reading.kinds[text.kind]} /> · <T m={(m) => m.pages.reading.sentences(text.sentences.length)} /></span>
              <span lang="ja" className="font-kana mt-3 text-3xl">{text.title}</span>
              <span className="text-sm text-muted">
                {titleReading(text).kana ? <span lang="ja" className="font-kana text-indigo-deep">{titleReading(text).kana} · </span> : null}
                {titleReading(text).romaji}
              </span>
              <span className="mt-1 text-lg font-semibold"><Tx t={text.titleFr} /></span>
              <span className="mt-3 flex-1 leading-relaxed text-muted"><Tx t={text.intro} /></span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

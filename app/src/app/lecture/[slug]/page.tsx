import { MarkSeen } from "@/components/site/mark-seen";
import { Gate } from "@/components/site/gate";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reader } from "@/components/reading/reader";
import { Analysis } from "@/components/reading/analysis";
import { getReading, readings, titleReading } from "@/data/readings";
import { T } from "@/i18n/t";
import { Tx } from "@/i18n/tx";
import { DocTitleText } from "@/components/site/doc-title";
import { MESSAGES } from "@/i18n/messages";
import { LANGS } from "@/i18n/lang";
import { ctext } from "@/i18n/content";
import type { Lang } from "@/i18n/lang";

export function generateStaticParams() {
  return readings.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lecture/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const text = getReading(slug);
  if (!text) return {};
  return { title: `${text.titleFr} · Lecture · Nihongo`, description: text.intro };
}

export default async function ReadingPage({ params }: PageProps<"/lecture/[slug]">) {
  const { slug } = await params;
  const text = getReading(slug);
  if (!text) notFound();
  const index = readings.findIndex((r) => r.slug === slug);
  const next = readings[(index + 1) % readings.length];

  const titles = Object.fromEntries(LANGS.map((l) => [l, `${ctext(text.titleFr, l)} · ${MESSAGES[l].docTitle.reading}`])) as Record<Lang, string>;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-6 sm:px-8 sm:py-10">
      <DocTitleText titles={titles} />
      <Link href="/lecture" className="inline-flex items-center gap-1.5 py-1.5 text-[15px] font-medium text-indigo hover:text-indigo-deep">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <T m={(m) => m.pages.reading.title} />
      </Link>
      <div className="mt-6">
      <Gate id={`/lecture/${slug}`} glyph={text.title} title={<Tx t={text.titleFr} />} sub={<Tx t={text.intro} />}>
      <MarkSeen id={`/lecture/${slug}`} />
      <header>
        <p className="text-sm font-medium text-seal"><T m={(m) => m.pages.reading.kinds[text.kind]} /> · <T m={(m) => m.pages.reading.level(text.level)} /></p>
        <h1 lang="ja" className="font-kana mt-2 text-5xl leading-tight sm:text-6xl">{text.title}</h1>
        <p className="mt-1 text-muted">
          {titleReading(text).kana ? <span lang="ja" className="font-kana text-indigo-deep">{titleReading(text).kana} · </span> : null}
          {titleReading(text).romaji}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight"><Tx t={text.titleFr} /></p>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted"><Tx t={text.intro} /></p>
      </header>
      <p className="mt-6 rounded-xl bg-indigo-soft px-4 py-3 text-[15px] leading-relaxed">
        <T m={(m) => m.pages.reading.firstText} />
        <Link href="/grammaire/structure-de-la-phrase" className="font-semibold text-indigo hover:underline">
          <T m={(m) => m.pages.reading.firstLink} />
        </Link>
        <T m={(m) => m.pages.reading.firstAfter} />
      </p>
      <div className="mt-8">
        <Reader text={text} />
      </div>
      <Analysis text={text} />
      </Gate>
      </div>
      {next && next.slug !== text.slug ? (
        <Link
          href={`/lecture/${next.slug}`}
          className="mt-14 flex items-center justify-between gap-4 rounded-2xl border border-line bg-sheet p-5 transition-colors hover:border-indigo"
        >
          <span>
            <span className="block text-sm text-muted"><T m={(m) => m.pages.reading.nextText} /></span>
            <span className="block text-lg font-semibold text-indigo"><Tx t={next.titleFr} /></span>
          </span>
          <span lang="ja" className="font-kana text-2xl">{next.title}</span>
        </Link>
      ) : null}
    </main>
  );
}

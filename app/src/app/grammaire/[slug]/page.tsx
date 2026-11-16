import { MarkSeen } from "@/components/site/mark-seen";
import { Gate } from "@/components/site/gate";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGrammar, grammar } from "@/data/grammar";
import { Blocks } from "@/components/grammar/blocks";
import { T } from "@/i18n/t";
import { Tx } from "@/i18n/tx";
import { DocTitleText } from "@/components/site/doc-title";
import { MESSAGES } from "@/i18n/messages";
import { LANGS } from "@/i18n/lang";
import { ctext } from "@/i18n/content";
import type { Lang } from "@/i18n/lang";

export function generateStaticParams() {
  return grammar.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/grammaire/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const point = getGrammar(slug);
  if (!point) return {};
  return { title: `${point.title} (${point.jp}) · Grammaire · Nihongo`, description: point.summary };
}

export default async function GrammarPage({ params }: PageProps<"/grammaire/[slug]">) {
  const { slug } = await params;
  const point = getGrammar(slug);
  if (!point) notFound();
  const index = grammar.findIndex((g) => g.slug === slug);
  const previous = grammar[index - 1];
  const next = grammar[index + 1];

  const titles = Object.fromEntries(LANGS.map((l) => [l, `${ctext(point.title, l)} (${point.jp}) · ${MESSAGES[l].docTitle.grammar}`])) as Record<Lang, string>;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-6 sm:px-8 sm:py-10">
      <DocTitleText titles={titles} />
      <Link href="/grammaire" className="inline-flex items-center gap-1.5 py-1.5 text-[15px] font-medium text-indigo hover:text-indigo-deep">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <T m={(m) => m.pages.grammar.title} />
      </Link>
      <div className="mt-6">
      <Gate id={`/grammaire/${slug}`} glyph={point.jp} title={<Tx t={point.title} />} sub={<Tx t={point.summary} />}>
      <MarkSeen id={`/grammaire/${slug}`} />
      <header>
        <p lang="ja" className="font-kana text-4xl text-seal sm:text-5xl">{point.jp}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"><Tx t={point.title} /></h1>
        <p className="mt-3 text-lg leading-relaxed text-muted"><Tx t={point.summary} /></p>
      </header>
      <article className="mt-10">
        <Blocks blocks={point.body} />
      </article>
      </Gate>
      </div>
      <nav aria-labelledby="grammar-nav" className="mt-16 grid grid-cols-2 gap-3 border-t border-line pt-8">
        <h2 id="grammar-nav" className="sr-only"><T m={(m) => m.pages.grammar.others} /></h2>
        {previous ? (
          <Link href={`/grammaire/${previous.slug}`} className="rounded-xl border border-line bg-sheet p-4 transition-colors hover:border-indigo">
            <span className="block text-sm text-muted"><T m={(m) => m.lesson.previous} /></span>
            <span lang="ja" className="font-kana mr-2 text-lg">{previous.jp}</span>
            <span className="font-semibold text-indigo"><Tx t={previous.title} /></span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/grammaire/${next.slug}`} className="rounded-xl border border-line bg-sheet p-4 text-right transition-colors hover:border-indigo">
            <span className="block text-sm text-muted"><T m={(m) => m.lesson.next} /></span>
            <span lang="ja" className="font-kana mr-2 text-lg">{next.jp}</span>
            <span className="font-semibold text-indigo"><Tx t={next.title} /></span>
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}

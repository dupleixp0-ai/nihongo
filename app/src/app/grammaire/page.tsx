import Link from "next/link";
import { LockBadge } from "@/components/site/gate";
import type { Metadata } from "next";
import { grammar, GRAMMAR_CATEGORIES } from "@/data/grammar";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";
import { Tx } from "@/i18n/tx";

export const metadata: Metadata = {
  title: "Grammaire · Nihongo",
  description: "La grammaire du niveau N5 : la structure de la phrase japonaise, les particules, les verbes et les adjectifs.",
};

export default function GrammarIndex() {
  const [first, ...rest] = grammar;
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="grammar" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">文</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.pages.grammar.title} /></h1>
          <p className="mt-1 text-muted"><T m={(m) => m.pages.grammar.count(grammar.length)} /></p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted">
        <T m={(m) => m.pages.grammar.intro} />
      </p>

      <Link
        href={`/grammaire/${first.slug}`}
        className="group mt-10 grid gap-6 rounded-3xl border border-line bg-contrast p-7 text-on-contrast transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99] sm:p-10 md:grid-cols-[1fr_auto] md:items-center"
      >
        <span>
          <span className="text-sm font-semibold opacity-70"><T m={(m) => m.pages.grammar.first} /></span>
          <span className="mt-1 block text-3xl font-semibold tracking-tight">{first.title}</span>
          <span className="mt-3 block max-w-prose text-lg leading-relaxed opacity-80"><Tx t={first.summary} /></span>
        </span>
        <span lang="ja" aria-hidden="true" className="font-kana flex flex-wrap gap-2 text-xl">
          <span className="rounded-lg bg-indigo px-2.5 py-1 text-on-indigo">わたしは</span>
          <span className="rounded-lg bg-seal px-2.5 py-1 text-white">パンを</span>
          <span className="rounded-lg bg-on-contrast px-2.5 py-1 text-contrast">たべます</span>
        </span>
      </Link>

      <Link href="/verbes" className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-line bg-sheet p-5 transition-colors hover:border-indigo">
        <span>
          <span className="block font-semibold"><T m={(m) => m.pages.grammar.verbsTitle} /></span>
          <span className="block text-[15px] text-muted"><T m={(m) => m.pages.grammar.verbsText} /></span>
        </span>
        <span lang="ja" aria-hidden="true" className="font-kana text-3xl text-indigo-deep">動</span>
      </Link>

      {GRAMMAR_CATEGORIES.filter((c) => c.id !== "fondations").map((cat) => (
        <section key={cat.id} className="mt-12" aria-labelledby={`cat-${cat.id}`}>
          <h2 id={`cat-${cat.id}`} className="text-2xl font-semibold tracking-tight"><T m={(m) => m.catalog.grammar[cat.id] ?? cat.title} /></h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.filter((g) => g.category === cat.id).map((g) => (
              <li key={g.slug} className="min-w-0">
                <Link
                  href={`/grammaire/${g.slug}`}
                  className="relative flex h-full flex-wrap items-start gap-x-4 gap-y-2 rounded-2xl border border-line bg-sheet p-4 pr-11 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-indigo active:scale-[0.985]"
                >
                  <LockBadge id={`/grammaire/${g.slug}`} className="absolute right-3 top-3" />
                  <span lang="ja" className="font-kana min-w-14 max-w-full shrink-0 break-words text-center text-2xl leading-tight text-indigo-deep">{g.jp}</span>
                  <span className="min-w-[12rem] flex-1 break-words">
                    <span className="block font-semibold"><Tx t={g.title} /></span>
                    <span className="mt-1 block text-[15px] leading-snug text-muted"><Tx t={g.summary} /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

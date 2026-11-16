import Link from "next/link";
import type { Metadata } from "next";
import { verbs } from "@/data/verbs";
import { VerbList } from "@/components/verbs/verb-list";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Verbes · Nihongo",
  description: "Les verbes des niveaux JLPT N5 et N4 : écriture, kana, rōmaji, forme polie, forme familière, sens et une phrase d'exemple.",
};

/** Les trois groupes : les exemples en japonais ici, les textes dans les messages (pages.verbs.groups, même ordre). */
const groups = [
  { from: "かう", fromRomaji: "kau", to: "かいます", toRomaji: "kaimasu", tint: "border-indigo/30 bg-indigo-soft" },
  { from: "たべる", fromRomaji: "taberu", to: "たべます", toRomaji: "tabemasu", tint: "border-emerald-500/30 bg-emerald-500/8" },
  { from: "する", fromRomaji: "suru", to: "します", toRomaji: "shimasu", tint: "border-seal/30 bg-seal-soft" },
];

export default function VerbsPage() {
  const n5 = verbs.filter((v) => v.level === "N5").length;
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="verbs" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">動</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.pages.verbs.title} /></h1>
          <p className="mt-1 text-muted"><T m={(m) => m.pages.verbs.count(verbs.length, n5, verbs.length - n5)} /></p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted">
        <T m={(m) => m.pages.verbs.intro} />
        <Link href="/grammaire/masu" className="text-indigo underline-offset-4 hover:underline"><T m={(m) => m.pages.verbs.masuLink} /></Link>.
      </p>

      <section aria-labelledby="groups-title" className="mt-10">
        <h2 id="groups-title" className="text-2xl font-semibold tracking-tight"><T m={(m) => m.pages.verbs.groupsTitle} /></h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {groups.map((g, gi) => (
            <li key={g.from} className={`rounded-2xl border p-5 ${g.tint}`}>
              <p className="font-semibold"><T m={(m) => m.pages.verbs.groups[gi].title} /></p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted"><T m={(m) => m.pages.verbs.groups[gi].rule} /></p>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span lang="ja" className="font-kana text-2xl">{g.from}</span>
                <span className="text-sm text-muted">{g.fromRomaji}</span>
                <span aria-hidden="true" className="text-muted">→</span>
                <span lang="ja" className="font-kana text-2xl">{g.to}</span>
                <span className="text-sm text-muted">{g.toRomaji}</span>
              </p>
              <p className="mt-1 text-sm text-muted">« <T m={(m) => m.pages.verbs.groups[gi].fr} /> »</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] text-muted">
          <T m={(m) => m.pages.verbs.trap} />
        </p>
      </section>

      <section aria-labelledby="list-title" className="mt-12">
        <h2 id="list-title" className="mb-5 text-2xl font-semibold tracking-tight"><T m={(m) => m.pages.verbs.listTitle} /></h2>
        <VerbList verbs={verbs} />
      </section>
    </main>
  );
}

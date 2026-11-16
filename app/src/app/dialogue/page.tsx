import Link from "next/link";
import { LockBadge } from "@/components/site/gate";
import type { Metadata } from "next";
import { dialogues } from "@/data/dialogues";
import { T } from "@/i18n/t";
import { Tx } from "@/i18n/tx";
import { DocTitle } from "@/components/site/doc-title";
import { kanaToHepburn } from "@/lib/romaji";

export const metadata: Metadata = {
  title: "Dialogues · Nihongo",
  description: "Apprendre les premières conversations en japonais : l'autre personne parle, tu choisis ta réponse.",
};

export default function DialoguesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="dialogue" />
      <div className="flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">話</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.dialogue.title} /></h1>
          <p className="mt-1 text-muted"><span lang="ja" className="font-kana text-ink">会話</span> <span lang="ja" className="font-kana">かいわ</span> · kaiwa · <T m={(m) => m.dialogue.count(dialogues.length)} /></p>
        </div>
      </div>
      <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted"><T m={(m) => m.dialogue.intro} /></p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {dialogues.map((d) => (
          <li key={d.slug}>
            <Link href={`/dialogue/${d.slug}`} className="group relative flex h-full flex-col rounded-2xl border border-line bg-sheet p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-indigo active:scale-[0.985]">
              <LockBadge id={`/dialogue/${d.slug}`} className="absolute right-4 top-4" />
              <span className="text-sm font-medium text-seal"><T m={(m) => m.dialogue.exchanges(d.turns.filter((t) => t.kind === "reply").length)} /></span>
              <span lang="ja" className="font-kana mt-3 text-3xl">{d.title}</span>
              <span className="text-sm text-muted"><span lang="ja" className="font-kana text-indigo-deep">{d.titleKana} · </span>{kanaToHepburn(d.titleKana)}</span>
              <span className="mt-1 text-lg font-semibold"><Tx t={d.titleFr} /></span>
              <span className="mt-3 flex-1 leading-relaxed text-muted"><Tx t={d.intro} /></span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-muted"><T m={(m) => m.dialogue.soon} /></p>
    </main>
  );
}

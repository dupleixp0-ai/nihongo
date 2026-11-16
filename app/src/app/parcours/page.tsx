import type { Metadata } from "next";
import { PLAN } from "@/data/plan";
import { PlanPage } from "@/components/plan/plan-page";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Parcours · Nihongo",
  description: "Un ordre conseillé pour apprendre le japonais, du premier hiragana au niveau N4, avec des révisions régulières.",
};

export default function PlanRoute() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="plan" />
      <header className="mb-6 flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">道</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.plan.title} /></h1>
          <p className="mt-1 text-muted"><span lang="ja" className="font-kana text-ink">道</span> <span lang="ja" className="font-kana">みち</span> · michi · <T m={(m) => m.plan.reading} /></p>
        </div>
      </header>
      <p className="mb-8 text-muted"><T m={(m) => m.plan.intro} /></p>
      <PlanPage steps={PLAN} />
    </main>
  );
}

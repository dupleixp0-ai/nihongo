import type { Metadata } from "next";
import { SettingsPage } from "@/components/settings/settings-page";
import { lessonGroups } from "@/data/srs-items";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Réglages · Nihongo",
  description: "Objectif du jour, rappel quotidien, révisions, apparence et sauvegarde de ta progression.",
};

export default function ReglagesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="settings" />
      <header className="mb-10 flex items-end gap-5 sm:gap-7">
        <span aria-hidden="true" lang="ja" className="font-kana bg-genko grid size-20 shrink-0 place-items-center rounded-xl border border-line text-5xl sm:size-28 sm:text-7xl">設</span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.settings.title} /></h1>
          <p className="mt-1 text-muted"><span lang="ja" className="font-kana text-ink">設定</span> <span lang="ja" className="font-kana">せってい</span> · settei · <T m={(m) => m.settings.reading} /></p>
        </div>
      </header>
      <SettingsPage groups={lessonGroups()} />
    </main>
  );
}

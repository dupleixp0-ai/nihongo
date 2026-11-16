import type { Metadata, Viewport } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "@fontsource/klee-one/400.css";
import "@fontsource/klee-one/600.css";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { MotionProvider } from "@/components/site/motion-provider";
import { BackupPrompt, GoalToast, ReminderWatcher } from "@/components/flame/flame-events";
import { AppearanceSync } from "@/components/site/appearance-sync";
import { OfflineSupport } from "@/components/site/offline-support";
import { FeedbackProvider } from "@/components/site/feedback-provider";
import { themeScript } from "@/lib/theme-script";
import { langCss, langScript } from "@/i18n/lang";

export const metadata: Metadata = {
  // Adresse publique du site, pour les liens de partage (image d'aperçu) : à définir lors du déploiement.
  // (L'origine seule : le sous-dossier de publication est ajouté par Next.js.)
  metadataBase: new URL(new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").origin),
  // Phase de test publiée : pas d'indexation par les moteurs de recherche.
  robots: process.env.NEXT_PUBLIC_NOINDEX === "1" ? { index: false, follow: false } : undefined,
  title: "Nihongo",
  applicationName: "Nihongo",
  appleWebApp: { capable: true, title: "Nihongo", statusBarStyle: "default" },
  description: "Apprendre à lire le japonais : hiragana, katakana et kanji, avec une histoire pour chaque caractère.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1626" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: langCss }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript + langScript }} />
      </head>
      <body className="flex min-h-full flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <div className="launch-screen" aria-hidden="true">
          <div className="flex flex-col items-center gap-4">
            <span lang="ja" className="font-kana grid size-20 place-items-center rounded-md bg-seal text-5xl text-white shadow-[inset_0_0_0_3px_rgba(255,255,255,0.18)]">語</span>
            <span className="text-2xl font-semibold tracking-tight text-ink">Nihongo</span>
          </div>
        </div>
        <MotionProvider>
          <SiteHeader />
          <ReminderWatcher />
          <AppearanceSync />
          <OfflineSupport />
          <FeedbackProvider />
          <GoalToast />
          <BackupPrompt />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

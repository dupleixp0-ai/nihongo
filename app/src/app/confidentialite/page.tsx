import type { Metadata } from "next";
import { LEGAL } from "@/data/legal";
import { MESSAGES } from "@/i18n/messages";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Confidentialité · Nihongo",
  description: "Ce que Nihongo fait de tes données : aucune collecte, tout reste sur ton appareil.",
};

const date = (locale: string) => new Date(`${LEGAL.privacyUpdated}T12:00:00`).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

export default function PrivacyPage() {
  const sections = MESSAGES.fr.legal.privacy.sections;
  const hasContact = Boolean(LEGAL.name || LEGAL.address || LEGAL.email);
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="privacy" />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.legal.privacy.title} /></h1>
      <p className="mt-1 text-sm text-muted"><T m={(m) => m.legal.privacy.updated(date(m.locale))} /></p>
      <p className="mt-6 text-lg leading-relaxed text-muted"><T m={(m) => m.legal.privacy.intro} /></p>
      <div className="mt-8 grid gap-8">
        {sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`p-${i}`}>
            <h2 id={`p-${i}`} className="text-2xl font-semibold tracking-tight"><T m={(m) => m.legal.privacy.sections[i].title} /></h2>
            {s.text.map((_, j) => (
              <p key={j} className="mt-2 leading-relaxed"><T m={(m) => m.legal.privacy.sections[i].text[j]} /></p>
            ))}
          </section>
        ))}
        <section aria-labelledby="p-contact">
          <h2 id="p-contact" className="text-2xl font-semibold tracking-tight"><T m={(m) => m.legal.privacy.contactTitle} /></h2>
          {hasContact ? (
            <address className="mt-2 whitespace-pre-line not-italic leading-relaxed">
              {[LEGAL.name, LEGAL.address].filter(Boolean).join("\n")}
              {LEGAL.email ? <>{"\n"}<a className="text-indigo-deep underline underline-offset-2" href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></> : null}
            </address>
          ) : (
            <p className="mt-2 leading-relaxed text-muted"><T m={(m) => m.legal.privacy.contactNone} /></p>
          )}
        </section>
      </div>
    </main>
  );
}

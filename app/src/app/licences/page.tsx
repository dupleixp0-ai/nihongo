import type { Metadata } from "next";
import { LEGAL } from "@/data/legal";
import { THIRD_PARTY } from "@/data/third-party";
import { MESSAGES } from "@/i18n/messages";
import { T } from "@/i18n/t";
import { DocTitle } from "@/components/site/doc-title";

export const metadata: Metadata = {
  title: "Licences et crédits · Nihongo",
  description: "Les licences et les crédits des données, polices et bibliothèques utilisées par Nihongo.",
};

const link = "text-indigo-deep underline underline-offset-2";

export default function LicencesPage() {
  const sections = MESSAGES.fr.legal.licences.sections;
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <DocTitle k="licences" />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl"><T m={(m) => m.legal.licences.title} /></h1>
      <p className="mt-6 text-lg leading-relaxed text-muted"><T m={(m) => m.legal.licences.intro} /></p>
      <div className="mt-8 grid gap-8">
        {sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`l-${i}`}>
            <h2 id={`l-${i}`} className="text-2xl font-semibold tracking-tight"><T m={(m) => m.legal.licences.sections[i].title} /></h2>
            {s.text.map((_, j) => (
              <p key={j} className="mt-2 leading-relaxed"><T m={(m) => m.legal.licences.sections[i].text[j]} /></p>
            ))}
            {i === 1 ? (
              <p className="mt-2 leading-relaxed">
                <a className={link} href="https://kanjivg.tagaini.net">KanjiVG</a> · <a className={link} href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>
                {LEGAL.strokesSourceUrl ? <> · <T m={(m) => m.legal.licences.strokesLink} /> <a className={link} href={LEGAL.strokesSourceUrl}>{LEGAL.strokesSourceUrl}</a></> : null}
              </p>
            ) : null}
            {i === 2 ? <p className="mt-2 leading-relaxed"><a className={link} href="https://openfontlicense.org">SIL Open Font License 1.1</a></p> : null}
          </section>
        ))}
        <section aria-labelledby="l-libs">
          <h2 id="l-libs" className="text-2xl font-semibold tracking-tight"><T m={(m) => m.legal.licences.libsTitle} /></h2>
          <p className="mt-2 leading-relaxed"><T m={(m) => m.legal.licences.libsIntro} /></p>
          <ul className="mt-4 grid gap-2">
            {THIRD_PARTY.map((l) => (
              <li key={l.name} className="rounded-xl border border-line bg-sheet px-4 py-3">
                <p className="font-medium">{l.name} <span className="font-normal text-muted">{l.version}</span></p>
                <p className="text-sm text-muted">{l.license}{l.copyright ? ` · ${l.copyright}` : ""}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

import type { ReadingText, Sentence, Token } from "@/domain/reading";
import Link from "next/link";
import { SPEAKERS } from "@/data/readings";
import { grammarForToken } from "@/data/grammar";
import { L, T } from "@/i18n/t";
import { sentenceDe } from "@/i18n/content";
import { speakerLabel } from "@/i18n/content/speakers";
import type { Lang } from "@/i18n/lang";
import { Tx } from "@/i18n/tx";

const sentenceText = (s: Sentence) => s.tokens.map((t) => t.t).join("");

function entries(sentence: Sentence): Token[] {
  const seen = new Set<string>();
  return sentence.tokens.filter((t) => {
    if (!t.m && !t.g) return false;
    const key = t.t;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Traduction complète du texte, puis analyse phrase par phrase, mot par mot. */
export function Analysis({ text }: { text: ReadingText }) {
  const speaker = (s: Sentence, lang: Lang) => (s.speaker ? `${speakerLabel(s.speaker, SPEAKERS[s.speaker]?.label ?? s.speaker, lang)} : ` : "");
  const joiner = text.kind === "dialogue" ? "\n" : " ";
  return (
    <>
      <section aria-labelledby="translation-title" className="mt-16">
        <h2 id="translation-title" className="text-2xl font-semibold tracking-tight"><T m={(m) => m.pages.reading.translation} /></h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            { flag: "🇫🇷", lang: "fr", label: "Français", body: text.sentences.map((s) => speaker(s, "fr") + s.fr).join(joiner) },
            { flag: "🇬🇧", lang: "en", label: "English", body: text.sentences.map((s) => speaker(s, "en") + s.en).join(joiner) },
            { flag: "🇩🇪", lang: "de", label: "Deutsch", body: text.sentences.map((s) => speaker(s, "de") + (sentenceDe(s.romaji) ?? "…")).join(joiner) },
          ].map((block) => (
            <div key={block.lang} lang={block.lang} className="rounded-2xl border border-line bg-sheet p-5">
              <p className="text-sm font-semibold text-muted">
                <span aria-hidden="true">{block.flag}</span> {block.label}
              </p>
              <p className="mt-2 whitespace-pre-line text-lg leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="analysis-title" className="mt-14">
        <h2 id="analysis-title" className="text-2xl font-semibold tracking-tight"><T m={(m) => m.pages.reading.analysisTitle} /></h2>
        <p className="mt-2 text-muted"><T m={(m) => m.pages.reading.analysisHint} /></p>
        <ol className="mt-6 space-y-3">
          {text.sentences.map((s, i) => (
            <li key={i}>
              <details className="group rounded-2xl border border-line bg-sheet open:shadow-[0_18px_40px_-28px_rgba(23,35,58,0.45)]">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true">✅</span>
                  <span lang="ja" className="font-kana min-w-0 flex-1 text-xl leading-snug">
                    {s.speaker ? <span className="mr-2 text-base text-seal"><L v={{ fr: speakerLabel(s.speaker, SPEAKERS[s.speaker]?.label ?? s.speaker, "fr"), en: speakerLabel(s.speaker, SPEAKERS[s.speaker]?.label ?? s.speaker, "en"), de: speakerLabel(s.speaker, SPEAKERS[s.speaker]?.label ?? s.speaker, "de") }} /> :</span> : null}
                    {sentenceText(s)}
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180">
                    <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="border-t border-line px-4 pb-5 pt-4 sm:px-5">
                  <p className="text-[15px]"><span className="text-muted"><T m={(m) => m.pages.reading.romaji} /></span>{s.romaji}</p>
                  <p className="mt-3 text-[15px]" lang="fr"><span aria-hidden="true">🇫🇷 </span>« {s.fr} »</p>
                  <p className="mt-1 text-[15px]" lang="en"><span aria-hidden="true">🇬🇧 </span>“{s.en}”</p>
                  <p className="mt-1 text-[15px]" lang="de"><span aria-hidden="true">🇩🇪 </span>{sentenceDe(s.romaji) ? `„${sentenceDe(s.romaji)}“` : "…"}</p>
                  <h3 className="mt-5 text-base font-semibold"><span aria-hidden="true">🧩 </span><T m={(m) => m.pages.reading.analysis} /></h3>
                  <ul className="mt-2 divide-y divide-line/70">
                    {entries(s).map((t) => (
                      <li key={t.t} className="py-3">
                        <p lang="ja" className="font-kana text-2xl leading-tight">{t.t}</p>
                        {t.r ? (
                          <p className="mt-1 text-[15px] text-muted"><span lang="ja" className="font-kana">{t.r}</span> / {t.rm}</p>
                        ) : t.rm ? (
                          <p className="mt-1 text-[15px] text-muted">{t.rm}</p>
                        ) : null}
                        {t.m ? <p className="mt-1 text-[15px]">= <Tx t={t.m} /></p> : null}
                        {t.g ? <p className="mt-1 text-[15px]"><Tx t={t.g} /></p> : null}
                        {t.g && grammarForToken(t.t) ? (
                          <Link href={`/grammaire/${grammarForToken(t.t)!.slug}`} className="mt-1 inline-block text-sm font-medium text-indigo hover:underline">
                            <T m={(m) => m.pages.reading.grammarSheet} /><Tx t={grammarForToken(t.t)!.title} />
                          </Link>
                        ) : null}
                        {t.n ? <p className="mt-1.5 text-[15px] text-seal"><span aria-hidden="true">⚠️ </span><Tx t={t.n} /></p> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

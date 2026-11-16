import Link from "next/link";
import { getKanjiByCharacter } from "@/data/kanji";
import { lookalikesOf, READINGS } from "@/data/kanji-notes";
import { keyReadings } from "@/data/kanji-readings";
import { cn } from "@/lib/utils";
import { L, T } from "@/i18n/t";
import { firstSense, firstSenseTr } from "@/i18n/meanings";
import { AnnotatedTx } from "./annotated-tx";
import { Tx } from "@/i18n/tx";

/** Encadré « Ne pas confondre avec… » : les sosies du kanji et ce qui les distingue. */
export function LookalikeBox({ character }: { character: string }) {
  const groups = lookalikesOf(character);
  if (!groups.length) return null;
  return (
    <section aria-labelledby="lookalike-title" className="mt-10 rounded-2xl border border-seal/25 bg-seal-soft p-5 sm:p-6">
      <h2 id="lookalike-title" className="flex items-center gap-2 text-xl font-semibold">
        <span aria-hidden="true" className="font-kana grid size-7 place-items-center rounded-[3px] bg-seal text-sm text-white">似</span>
        <T m={(m) => m.lesson.lookalike} />
      </h2>
      {groups.map((group, gi) => (
        <div key={gi} className={cn(gi > 0 && "mt-6 border-t border-seal/15 pt-6")}>
          <p className="mt-3 text-base leading-relaxed text-ink"><AnnotatedTx text={group.tip} /></p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.items.map((item) => {
              const current = item.character === character;
              const target = getKanjiByCharacter(item.character);
              const body = (
                <>
                  <span
                    lang="ja"
                    className={cn(
                      "font-kana grid size-14 shrink-0 place-items-center rounded-lg border text-4xl leading-none",
                      current ? "border-seal bg-sheet text-seal" : "border-line bg-sheet text-ink",
                    )}
                  >
                    {item.character}
                  </span>
                  <span className="min-w-0 text-[15px] leading-snug">
                    {target ? (
                      <span className="block">
                        {keyReadings(target).map((r, i) => (
                          <span key={r.kana} className="whitespace-nowrap">
                            {i > 0 ? <span className="mx-1.5 text-line">|</span> : null}
                            <span lang="ja" className="font-kana text-base font-semibold text-indigo-deep">{r.kana}</span>{" "}
                            <span className="text-muted">{r.romaji}</span>
                          </span>
                        ))}
                      </span>
                    ) : null}
                    <span className="block font-semibold">
                      {current ? <T m={(m) => m.lesson.thisKanji} /> : null}
                      {target ? <L v={{ fr: firstSense(target.meaning), ...firstSenseTr(target.meaningTr) }} /> : item.character}
                    </span>
                    <span className="text-muted"><AnnotatedTx text={item.hint} /></span>
                  </span>
                </>
              );
              return (
                <li key={item.character}>
                  {current || !target ? (
                    <div className="flex items-start gap-3 rounded-xl p-2">{body}</div>
                  ) : (
                    <Link
                      href={`/kanji/${target.slug}`}
                      className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-sheet"
                    >
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}

/** Encadré « Se lit aussi… » : la lecture du kanji change selon le mot. */
export function ContextReadingsBox({ character }: { character: string }) {
  const note = READINGS[character];
  if (!note) return null;
  return (
    <section aria-labelledby="context-title" className="mt-10 rounded-2xl border border-indigo/25 bg-indigo-soft p-5 sm:p-6">
      <h2 id="context-title" className="flex items-center gap-2 text-xl font-semibold">
        <span aria-hidden="true" className="font-kana grid size-7 place-items-center rounded-[3px] bg-indigo text-sm text-on-indigo">読</span>
        <T m={(m) => m.lesson.alsoRead} />
      </h2>
      <p className="mt-3 text-base leading-relaxed"><AnnotatedTx text={note.rule} /></p>
      <ul className="mt-4 divide-y divide-indigo/10 overflow-hidden rounded-xl border border-indigo/15 bg-sheet/70">
        {note.items.map((item) => (
          <li key={item.word + item.reading} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-0.5 px-4 py-3">
            <span lang="ja" className="font-kana row-span-3 min-w-14 text-2xl leading-none sm:text-3xl">
              {item.word}
            </span>
            <span className="text-[15px]">
              <span lang="ja" className="font-kana text-base font-semibold text-indigo-deep">{item.reading}</span>
              <span className="ml-2 text-muted">{item.romaji}</span>
            </span>
            <span className="text-[15px]">= <Tx t={item.meaning} /></span>
            {item.special ? (
              <span className="text-sm text-seal">⚠️ <Tx t={item.special} /></span>
            ) : (
              <span className="text-sm text-muted"><T m={(m) => m.lesson.regular} /></span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

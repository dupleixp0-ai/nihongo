import type { Kana } from "@/domain/kana";
import { PracticeSquare } from "./practice-square";
import { SpeakButton } from "./speak-button";
import { LessonCardToggle } from "@/components/srs/card-toggle";
import { VoiceNotice } from "./voice-notice";
import { Illustration } from "./illustration";
import { MnemonicImage } from "./mnemonic-image";
import { StrokeOrder } from "./stroke-order";
import { TracingPad } from "./tracing-pad";
import { L, T } from "@/i18n/t";
import { localizeKana } from "@/i18n/kana";

const scriptLabel = { hiragana: "Hiragana", katakana: "Katakana" } as const;

export function KanaLesson({ kana }: { kana: Kana }) {
  const script = scriptLabel[kana.script];
  const en = localizeKana(kana, "en");
  const de = localizeKana(kana, "de");

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative mx-auto max-w-[17rem] sm:max-w-sm lg:mx-0 lg:max-w-md">
          <PracticeSquare character={kana.character} label={`${script} ${kana.romaji}`} />
          <span
            aria-hidden="true"
            lang="ja"
            className="font-kana absolute -right-2 -top-3 w-12 -rotate-3 bg-seal px-1 py-1.5 text-center text-sm leading-tight text-white sm:-right-4"
          >
            {kana.script === "katakana" ? (
              <>
                カタ
                <br />
                カナ
              </>
            ) : (
              <>
                ひら
                <br />
                がな
              </>
            )}
          </span>
        </div>
        <div className="mx-auto mt-4 max-w-sm text-center lg:mx-0 lg:max-w-md lg:text-left">
          <SpeakButton text={kana.character}><T m={(m) => m.lesson.listen} /></SpeakButton>
          <VoiceNotice />
          <div><LessonCardToggle /></div>
        </div>
      </div>

      <div className="max-w-prose">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {script} <span lang="ja" className="font-kana">{kana.character}</span>
          {kana.family === "special" ? null : <T m={(m) => m.lesson.readsAs(kana.romaji)} />}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted"><L v={{ fr: kana.pronunciation, en: en.pronunciation, de: de.pronunciation }} /></p>

        <section className="mt-10" aria-labelledby="mnemonic-title">
          <h2 id="mnemonic-title" className="text-xl font-semibold">
            <T m={(m) => m.lesson.remember} />
          </h2>
          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-start">
            <p className="text-lg leading-relaxed"><L v={{ fr: kana.mnemonic, en: en.mnemonic, de: de.mnemonic }} /></p>
            {kana.image ? (
              <MnemonicImage image={kana.image} />
            ) : kana.illustration ? (
              <Illustration illustration={kana.illustration} strokes={kana.strokes} caption={<L v={{ fr: kana.illustration.caption, en: en.caption, de: de.caption }} />} />
            ) : null}
          </div>
        </section>

        {kana.strokes ? (
          <>
            <section className="mt-10" aria-labelledby="order-title">
              <h2 id="order-title" className="text-xl font-semibold">
                <T m={(m) => m.lesson.strokeOrder} />
              </h2>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                <T m={(m) => m.lesson.strokeIntro} />
              </p>
              <div className="mt-4">
                <StrokeOrder
                  strokes={kana.strokes}
                  subject={`${script} ${kana.romaji}`}
                />
              </div>
            </section>

            <section className="mt-10" aria-labelledby="trace-title" data-no-swipe>
              <h2 id="trace-title" className="text-xl font-semibold">
                <T m={(m) => m.lesson.traceTitle} />
              </h2>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                <T m={(m) => m.lesson.traceIntro} />
              </p>
              <div className="mt-4">
                <TracingPad
                  modelStrokes={kana.strokes}
                  subject={`${script} ${kana.romaji}`}
                />
              </div>
            </section>
          </>
        ) : null}

        {kana.words.length ? (
        <section className="mt-10" aria-labelledby="words-title">
          <h2 id="words-title" className="text-xl font-semibold">
            <T m={(m) => m.lesson.wordsWith} /> <span lang="ja" className="font-kana">{kana.character}</span>
          </h2>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {kana.words.map((word, i) => (
              <div key={word.japanese} className="flex items-center justify-between gap-4 py-3">
                <dt lang="ja" className="font-kana text-3xl">
                  {word.japanese}
                </dt>
                <dd className="flex items-center gap-3 text-right text-lg">
                  <span>
                    <span className="text-muted">{word.romaji}</span>
                    <span className="ml-3"><L v={{ fr: word.meaning, en: en.words[i], de: de.words[i] }} /></span>
                  </span>
                  <SpeakButton text={word.japanese} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
        ) : null}
        {kana.strokes ? (
          <p className="mt-12 text-sm leading-snug text-muted">
            <T m={(m) => m.lesson.creditBefore} />
            <a className="underline underline-offset-2" href="https://kanjivg.tagaini.net">
              KanjiVG
            </a>
            <T m={(m) => m.lesson.creditMid} />
            <a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by-sa/3.0/">
              CC BY-SA 3.0
            </a>
            .
          </p>
        ) : null}
      </div>
    </article>
  );
}

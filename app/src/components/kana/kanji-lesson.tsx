import type { Kanji } from "@/domain/kanji";
import { PracticeSquare } from "./practice-square";
import { SpeakButton } from "./speak-button";
import { LessonCardToggle } from "@/components/srs/card-toggle";
import { VoiceNotice } from "./voice-notice";
import { StrokeOrder } from "./stroke-order";
import { TracingPad } from "./tracing-pad";
import { KanjiIllustration } from "./kanji-illustration";
import { ContextReadingsBox, LookalikeBox } from "./kanji-notes";
import { L, T } from "@/i18n/t";
import { AnnotatedTx } from "./annotated-tx";
import { Tx } from "@/i18n/tx";

function Readings({ title, items }: { title: React.ReactNode; items: Kanji["onyomi"] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <p className="mt-1 text-xl">
        {items.length ? (
          items.map((item, i) => (
            <span key={item.kana}>
              {i > 0 ? " · " : ""}
              <span lang="ja" className="font-kana">{item.kana}</span>{" "}
              <span className="text-base text-muted">{item.romaji}</span>
            </span>
          ))
        ) : (
          "—"
        )}
      </p>
    </div>
  );
}

export function KanjiLesson({ kanji }: { kanji: Kanji }) {
  const label = `kanji ${kanji.meaning}`;
  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative mx-auto max-w-[17rem] sm:max-w-sm lg:mx-0 lg:max-w-md">
          <PracticeSquare character={kanji.character} label={label} />
          <span
            aria-hidden="true"
            lang="ja"
            className="font-kana absolute -right-2 -top-3 w-12 -rotate-3 bg-seal px-1 py-1.5 text-center text-sm leading-tight text-white sm:-right-4"
          >
            漢字
            <br />
            {kanji.level}
          </span>
        </div>
        <div className="mx-auto mt-4 max-w-sm text-center lg:mx-0 lg:max-w-md lg:text-left">
          <SpeakButton text={kanji.kunyomi[0]?.kana.replace(/[()（）]/g, "") ?? kanji.onyomi[0]?.kana ?? kanji.character}>
            <T m={(m) => m.lesson.listen} />
          </SpeakButton>
          <VoiceNotice />
          <div><LessonCardToggle /></div>
        </div>
      </div>

      <div className="max-w-prose">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Kanji <span lang="ja" className="font-kana">{kanji.character}</span> : <L v={{ fr: kanji.meaning, ...kanji.meaningTr }} />
        </h1>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Readings title={<T m={(m) => m.lesson.onReading} />} items={kanji.onyomi} />
          <Readings title={<T m={(m) => m.lesson.kunReading} />} items={kanji.kunyomi} />
        </div>
        <p className="mt-3 text-sm leading-snug text-muted">
          <T m={(m) => m.lesson.strokesLevel(kanji.strokes.length, kanji.level)} />
        </p>

        <section className="mt-10" aria-labelledby="story-title">
          <h2 id="story-title" className="text-xl font-semibold">
            <T m={(m) => m.lesson.remember} />
          </h2>
          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-start">
            <p className="text-lg leading-[1.9]"><AnnotatedTx text={kanji.story} /></p>
            <figure className="w-56 shrink-0 sm:w-60">
              <div className="overflow-hidden rounded-xl border border-line">
                <KanjiIllustration id={kanji.slug} theme={kanji.decor} strokes={kanji.strokes} label={kanji.caption} />
              </div>
              <figcaption className="mt-1.5 text-xs leading-snug text-muted"><Tx t={kanji.caption} /></figcaption>
            </figure>
          </div>
        </section>

        <ContextReadingsBox character={kanji.character} />
        <LookalikeBox character={kanji.character} />

        <section className="mt-10" aria-labelledby="order-title">
          <h2 id="order-title" className="text-xl font-semibold">
            <T m={(m) => m.lesson.strokeOrder} />
          </h2>
          <div className="mt-4">
            <StrokeOrder strokes={kanji.strokes} subject={label} />
          </div>
        </section>

        <section className="mt-10" aria-labelledby="trace-title" data-no-swipe>
          <h2 id="trace-title" className="text-xl font-semibold">
            <T m={(m) => m.lesson.traceTitle} />
          </h2>
          <div className="mt-4">
            <TracingPad modelStrokes={kanji.strokes} subject={label} />
          </div>
        </section>

        <section className="mt-10" aria-labelledby="words-title">
          <h2 id="words-title" className="text-xl font-semibold">
            <T m={(m) => m.lesson.wordsWith} /> <span lang="ja" className="font-kana">{kanji.character}</span>
          </h2>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {kanji.words.map((word) => (
              <div key={word.japanese} className="flex items-center justify-between gap-4 py-3">
                <dt className="font-kana text-3xl" lang="ja">
                  {word.japanese}
                  <span className="ml-3 text-lg text-muted">{word.reading}</span>
                </dt>
                <dd className="flex items-center gap-3 text-right text-lg">
                  <span>
                    <span className="text-muted">{word.romaji}</span>
                    <span className="ml-3"><L v={{ fr: word.meaning, ...word.meaningTr }} /></span>
                  </span>
                  <SpeakButton text={word.reading} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-12 text-sm leading-snug text-muted">
          <T m={(m) => m.lesson.creditBefore} />
          <a className="underline underline-offset-2" href="https://kanjivg.tagaini.net">KanjiVG</a>
          <T m={(m) => m.lesson.creditMid} />
          <a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.
        </p>
      </div>
    </article>
  );
}

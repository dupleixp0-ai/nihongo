import type { Block, Example, Role, Segment } from "@/domain/grammar";
import { SpeakButton } from "@/components/kana/speak-button";
import { cn } from "@/lib/utils";
import { kanaToHepburn } from "@/lib/romaji";
import { L, T } from "@/i18n/t";
import { Tx } from "@/i18n/tx";
import { ctr } from "@/i18n/content";

const KANA_ONLY = /^[぀-ヿー〜～\s・。、]+$/;
const HAS_JA = /[぀-ヿ一-鿿]/;

/**
 * Case de tableau : le japonais est toujours suivi de sa lecture.
 * « たべます » → kana + rōmaji ; « 食べて|たべて » → écriture, puis kana + rōmaji ; sinon le texte tel quel.
 */
function TableCell({ cell }: { cell: string }) {
  const [jp, reading] = cell.split("|");
  const kana = reading ?? (KANA_ONLY.test(jp) ? jp : null);
  if (!HAS_JA.test(jp) || !kana) {
    return <span className={cn(HAS_JA.test(jp) && "font-kana text-base")} lang={HAS_JA.test(jp) ? "ja" : undefined}>{jp}</span>;
  }
  return (
    <span className="block">
      <span lang="ja" className="font-kana block text-base">{jp}</span>
      {reading ? <span lang="ja" className="font-kana block text-sm text-indigo-deep">{reading}</span> : null}
      <span className="block text-xs text-muted">{kanaToHepburn(kana.replace(/[〜～]/g, ""), { capitalize: false })}</span>
    </span>
  );
}

/** Case de tableau dans les trois langues quand elle contient du français. */
function LocalCell({ cell }: { cell: string }) {
  const v = ctr(cell);
  if (v.en === undefined) return <TableCell cell={cell} />;
  return <L v={{ fr: <TableCell cell={v.fr} />, en: <TableCell cell={v.en} />, de: <TableCell cell={v.de!} /> }} />;
}

const HAN = /[一-鿿々]/;

/** Couleur de chaque rôle ; les noms des rôles sont dans les messages (lesson.roles). */
const ROLE_STYLE: Record<Role, string> = {
  theme: "bg-indigo/12 text-indigo-deep ring-indigo/30 dark:bg-indigo/20",
  subject: "bg-violet-500/12 text-violet-700 ring-violet-500/30 dark:text-violet-300",
  time: "bg-amber-500/15 text-amber-800 ring-amber-500/35 dark:text-amber-300",
  place: "bg-emerald-500/12 text-emerald-800 ring-emerald-500/30 dark:text-emerald-300",
  partner: "bg-sky-500/12 text-sky-800 ring-sky-500/30 dark:text-sky-300",
  object: "bg-seal/12 text-seal ring-seal/30",
  verb: "bg-contrast text-on-contrast ring-contrast",
  modifier: "bg-line/40 text-ink ring-line",
  other: "bg-line/40 text-ink ring-line",
};

function SegmentChip({ segment }: { segment: Segment }) {
  return (
    <li className="flex flex-col items-center">
      <span className={cn("rounded-xl px-3 py-2 text-center ring-1 ring-inset", ROLE_STYLE[segment.role])}>
        {segment.kana && HAN.test(segment.jp) ? (
          <ruby lang="ja" className="font-kana text-2xl sm:text-3xl">
            {segment.jp}
            <rt className="text-[0.4em] opacity-80">{segment.kana}</rt>
          </ruby>
        ) : (
          <span lang="ja" className="font-kana text-2xl sm:text-3xl">{segment.jp}</span>
        )}
        <span className="mt-0.5 block text-xs opacity-80">{segment.romaji}</span>
      </span>
      <span className="mt-1.5 max-w-[9rem] text-center text-xs leading-tight text-muted">
        <span className="block font-semibold text-ink"><T m={(m) => m.lesson.roles[segment.role]} /></span>
        <Tx t={segment.fr} />
      </span>
    </li>
  );
}

export function Diagram({ caption, segments, fr }: { caption: string; segments: Segment[]; fr: string }) {
  const kana = segments.map((s) => s.kana ?? s.jp).join(" ");
  return (
    <figure className="my-6 rounded-2xl border border-line bg-sheet p-4 sm:p-6">
      <figcaption className="text-sm font-semibold text-muted"><Tx t={caption} /></figcaption>
      <ol className="mt-4 flex flex-wrap items-start gap-x-2 gap-y-4">
        {segments.map((seg, i) => (
          <SegmentChip key={i} segment={seg} />
        ))}
      </ol>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-lg"><Tx t={fr} quote /></p>
        <SpeakButton text={kana} />
      </div>
    </figure>
  );
}

export function ExampleView({ example }: { example: Example }) {
  const hasKanji = HAN.test(example.jp);
  return (
    <div className="my-4 flex items-start gap-3 rounded-xl border-l-4 border-indigo bg-sheet px-4 py-3">
      <div className="min-w-0 flex-1">
        <p lang="ja" className="font-kana text-xl leading-relaxed sm:text-2xl">{example.jp}</p>
        {hasKanji && example.kana ? <p lang="ja" className="font-kana text-base text-indigo-deep">{example.kana}</p> : null}
        <p className="text-[15px] text-muted">{example.romaji}</p>
        <p className="mt-1 text-base"><Tx t={example.fr} /></p>
        {example.note ? <p className="mt-1 text-sm text-seal">⚠️ <Tx t={example.note} /></p> : null}
      </div>
      <SpeakButton text={example.kana ?? example.jp} />
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h":
            return <h2 key={i} className="mt-12 text-2xl font-semibold tracking-tight first:mt-0"><Tx t={block.text} /></h2>;
          case "p":
            return <p key={i} className="mt-4 text-lg leading-relaxed"><Tx t={block.text} /></p>;
          case "tip":
            return (
              <p key={i} className="mt-4 rounded-xl bg-indigo-soft px-4 py-3 text-base leading-relaxed">
                <span aria-hidden="true">💡 </span><Tx t={block.text} />
              </p>
            );
          case "warning":
            return (
              <p key={i} className="mt-4 rounded-xl bg-seal-soft px-4 py-3 text-base leading-relaxed">
                <span aria-hidden="true">⚠️ </span><Tx t={block.text} />
              </p>
            );
          case "example":
            return <ExampleView key={i} example={block.example} />;
          case "diagram":
            return <Diagram key={i} caption={block.caption} segments={block.segments} fr={block.fr} />;
          case "table":
            return (
              <div key={i} className="my-6 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[28rem] border-collapse text-left text-[15px]">
                  <thead className="bg-sheet">
                    <tr>{block.head.map((cell) => <th key={cell} className="border-b border-line px-3 py-2.5 font-semibold"><Tx t={cell} /></th>)}</tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-line/60 last:border-0">
                        {row.map((cell, c) => (
                          <td key={c} className="px-3 py-2.5 align-top">
                            <LocalCell cell={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}

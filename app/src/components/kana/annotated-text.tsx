import { Fragment } from "react";
import { readingOfCharacter } from "@/data/kanji-readings";

const HAN = /([⺀-⿟㐀-鿿]|[\uD840-\uD87F][\uDC00-\uDFFF])/u;

/**
 * Texte français qui cite des kanji : chaque kanji connu reçoit sa lecture en kana au-dessus
 * et son rōmaji juste après, pour qu'on sache toujours le lire.
 */
export function AnnotatedText({ text }: { text: string }) {
  const parts = text.split(HAN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const reading = HAN.test(part) && part.length <= 2 ? readingOfCharacter(part) : undefined;
        if (!reading) return <Fragment key={i}>{part}</Fragment>;
        return (
          <span key={i} className="whitespace-nowrap">
            <ruby lang="ja" className="font-kana">
              {part}
              <rt className="font-kana text-[0.55em] text-indigo">{reading.kana}</rt>
            </ruby>
            <span className="ml-0.5 text-[0.8em] text-muted">({reading.romaji})</span>
          </span>
        );
      })}
    </>
  );
}

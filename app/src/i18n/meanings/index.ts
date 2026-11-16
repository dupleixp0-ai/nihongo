import type { Lang } from "../lang";
import { KANJI_MEANINGS, KANJI_WORD_MEANINGS } from "./kanji";
import { VERB_MEANINGS } from "./verbs";
import { VOCAB_MEANINGS } from "./vocab";

/** Un texte de contenu en anglais et en allemand (le français est le texte d'origine). */
export type Tr = { en?: string; de?: string };

const pair = (p?: readonly string[]): Tr | undefined => (p ? { en: p[0], de: p[1] } : undefined);

export const kanjiTr = (slug: string) => pair(KANJI_MEANINGS[slug]);
export const kanjiWordTr = (japanese: string) => pair(KANJI_WORD_MEANINGS[japanese]);
export const vocabTr = (slug: string) => pair(VOCAB_MEANINGS[slug]);
export function verbTr(slug: string): { meaning: Tr; example: Tr } | undefined {
  const r = VERB_MEANINGS[slug];
  return r && { meaning: { en: r[0], de: r[1] }, example: { en: r[2], de: r[3] } };
}

/** Le texte dans la langue voulue, le français s'il n'est pas traduit. */
export const pick = (fr: string, t: Tr | undefined, lang: Lang): string => (lang === "fr" ? fr : t?.[lang] ?? fr);

/** Premier sens d'une liste (« soleil, jour » → « soleil »), dans chaque langue. */
export const firstSense = (s: string) => s.split(/[,;]/)[0].trim();
export const firstSenseTr = (t?: Tr): Tr | undefined => t && { en: t.en && firstSense(t.en), de: t.de && firstSense(t.de) };

/** Applique la même mise en forme au texte de chaque langue (« ひ · hi · » + sens). */
export const mapTr = (t: Tr | undefined, f: (s: string) => string): Tr | undefined =>
  t && { en: t.en === undefined ? undefined : f(t.en), de: t.de === undefined ? undefined : f(t.de) };

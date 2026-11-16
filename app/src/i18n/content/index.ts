import type { Lang } from "../lang";
import { ALT_TEXTS } from "./alt";
import { DIALOGUE_TEXTS } from "./dialogue";
import { EXAM_TEXTS } from "./exam";
import { GRAMMAR_TEXTS } from "./grammar";
import { KANJI_TEXTS } from "./kanji";
import { READING_TEXTS, SENTENCES_DE } from "./reading";

/**
 * Textes des fiches de grammaire, des lectures et de l'examen : le français est la clé, les traductions
 * sont dans les fichiers voisins (une ligne par texte). Un texte absent reste en français.
 */
const ALL: Record<string, readonly [string, string]> = { ...GRAMMAR_TEXTS, ...READING_TEXTS, ...EXAM_TEXTS, ...KANJI_TEXTS, ...ALT_TEXTS, ...DIALOGUE_TEXTS };

/** Faut-il traduire ce texte ? (du français, pas seulement du japonais ou des chiffres) */
export const needsTr = (s: string) => /[A-Za-zÀ-ÿ]{3,}/.test(s);

/** Le texte dans les trois langues ; seul le français si aucune traduction n'existe. */
export function ctr(fr: string): { fr: string; en?: string; de?: string } {
  const p = Object.hasOwn(ALL, fr) ? ALL[fr] : undefined;
  return p ? { fr, en: p[0], de: p[1] } : { fr };
}

/** Le texte dans une langue donnée. */
export const ctext = (fr: string, lang: Lang): string => (lang === "fr" ? fr : (Object.hasOwn(ALL, fr) ? ALL[fr][lang === "en" ? 0 : 1] : fr));

/** Traduction allemande d'une phrase de lecture (clé : son rōmaji). */
export const sentenceDe = (romaji: string): string | undefined => SENTENCES_DE[romaji];

/** Pour les vérifications : toutes les entrées, et les phrases allemandes. */
export const CONTENT_TEXTS = { grammar: GRAMMAR_TEXTS, reading: READING_TEXTS, exam: EXAM_TEXTS, kanji: KANJI_TEXTS, alt: ALT_TEXTS, dialogue: DIALOGUE_TEXTS };
export const CONTENT_SENTENCES_DE = SENTENCES_DE;

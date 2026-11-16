import type { KanaWord } from "./kana";

export type KanjiReading = { kana: string; romaji: string };

export type KanjiWord = KanaWord & {
  /** Lecture en kana du mot (le champ `japanese` contient les kanji). */
  reading: string;
};

export type Kanji = {
  character: string;
  /** Identifiant dans l'URL. */
  slug: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  /** Sens principal(aux) en français. */
  meaning: string;
  /** Sens en anglais et en allemand. */
  meaningTr?: { en?: string; de?: string };
  /** Lectures « on » (d'origine chinoise, en katakana). */
  onyomi: KanjiReading[];
  /** Lectures « kun » (japonaises, en hiragana). */
  kunyomi: KanjiReading[];
  /** Histoire mnémotechnique originale. */
  story: string;
  /** Légende de l'illustration. */
  caption: string;
  strokes: string[];
  words: KanjiWord[];
  /** Thème du décor de l'illustration, quand le kanji n'a pas de décor propre. */
  decor?: string;
  /** Groupe thématique (kanji N4). */
  group?: string;
};

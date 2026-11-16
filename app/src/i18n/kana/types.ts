import type { KanaOrigin, StoryIllustrationId } from "@/domain/kana";

type Origin<K extends KanaOrigin["kind"]> = Extract<KanaOrigin, { kind: K }>;

/**
 * Textes des leçons de kana dans une langue (le français est dans src/data/*).
 * Clés : « slug » seul quand le texte vaut pour les deux écritures (prononciation),
 * « écriture/slug » (« hiragana/a ») pour ce qui est propre à une leçon (histoire, légende).
 */
export type KanaLocale = {
  /** Conseil de prononciation, par son (commun aux hiragana et aux katakana). */
  pron: Record<string, string>;
  /** Conseil propre à une écriture (« katakana/dji »), prioritaire sur `pron`. */
  pronScript: Record<string, string>;
  /** Prononciation d'une combinaison (kya, sho…), à partir de sa lecture. */
  yoonPron: (romaji: string) => string;
  /** Histoire et légende des leçons rédigées une à une. */
  story: Record<string, { m: string; cap?: string }>;
  /** Nom de l'objet de chaque dessin, pour les phrases de rappel des leçons construites. */
  object: Partial<Record<StoryIllustrationId, string>>;
  /** Remarque en plus pour certaines leçons construites (ぢ, づ…), par « écriture/slug ». */
  note: Record<string, string>;
  dakuten: (o: Origin<"dakuten">, romaji: string) => { m: string; cap: string };
  yoon: (o: Origin<"yoon">, romaji: string) => { m: string; cap: string };
  extended: (o: Origin<"extended">, romaji: string) => { m: string; cap: string };
  /** Sens des mots d'exemple, par écriture japonaise. */
  words: Record<string, string>;
};

import { kanaToHepburn } from "@/lib/romaji";
import { VOCAB_N5 } from "./vocab-n5";
import { VOCAB_N4 } from "./vocab-n4";
import { vocabTr, type Tr } from "@/i18n/meanings";

/** Vocabulaire (hors verbes) : écriture, kana, rōmaji, sens et thème. */

export type VocabTheme = { id: string; title: string; glyph: string; kana: string; romaji: string };

export const VOCAB_THEMES: VocabTheme[] = [
  { id: "P", title: "Personnes et famille", glyph: "人", kana: "ひと", romaji: "hito" },
  { id: "C", title: "Corps et santé", glyph: "体", kana: "からだ", romaji: "karada" },
  { id: "T", title: "Temps et calendrier", glyph: "時", kana: "とき", romaji: "toki" },
  { id: "N", title: "Nombres et compteurs", glyph: "数", kana: "かず", romaji: "kazu" },
  { id: "L", title: "Lieux et directions", glyph: "所", kana: "ところ", romaji: "tokoro" },
  { id: "M", title: "Maison et objets", glyph: "家", kana: "いえ", romaji: "ie" },
  { id: "F", title: "Nourriture et boissons", glyph: "食", kana: "しょく", romaji: "shoku" },
  { id: "V", title: "Vêtements", glyph: "服", kana: "ふく", romaji: "fuku" },
  { id: "R", title: "Transports et ville", glyph: "車", kana: "くるま", romaji: "kuruma" },
  { id: "A", title: "Nature, météo, animaux", glyph: "空", kana: "そら", romaji: "sora" },
  { id: "K", title: "Couleurs", glyph: "色", kana: "いろ", romaji: "iro" },
  { id: "E", title: "École, travail, loisirs", glyph: "学", kana: "がく", romaji: "gaku" },
  { id: "Q", title: "Pour décrire", glyph: "形", kana: "かたち", romaji: "katachi" },
  { id: "O", title: "Mots-outils et expressions", glyph: "言", kana: "こと", romaji: "koto" },
];

export type Word = { slug: string; jp: string; kana: string; romaji: string; fr: string; theme: string; level: "N5" | "N4"; /** Sens en anglais et en allemand. */ tr?: Tr };

/** « ～えん » → « -en » : le tilde marque un suffixe (après un nombre ou un nom). */
function romajiOf(kana: string) {
  const suffix = kana.startsWith("～");
  const r = kanaToHepburn(kana.replace(/^～/, ""), { capitalize: false });
  return suffix ? `-${r}` : r;
}

const used = new Map<string, number>();
function build(rows: typeof VOCAB_N5, level: "N5" | "N4"): Word[] {
  return rows.map(([jp, kana, theme, fr]) => {
    const romaji = romajiOf(kana);
    const base = romaji.replace(/^-/, "suffixe-").replace(/[^a-z0-9-]/g, (c) => ({ ā: "a", ī: "i", ū: "u", ē: "e", ō: "o" })[c] ?? "");
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    const slug = n === 1 ? base : `${base}-${n}`;
    return { slug, jp, kana, romaji, fr, theme, level, tr: vocabTr(slug) };
  });
}

export const vocab: Word[] = [...build(VOCAB_N5, "N5"), ...build(VOCAB_N4, "N4")];
export const wordCardId = (slug: string) => `mot:${slug}`;

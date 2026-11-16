import type { Kana } from "@/domain/kana";
import type { KanaLocale } from "./types";
import { kanaEn } from "./en";
import { kanaDe } from "./de";

export const KANA_LOCALES: Record<"en" | "de", KanaLocale> = { en: kanaEn, de: kanaDe };

export type KanaText = { pronunciation?: string; mnemonic?: string; caption?: string; words: (string | undefined)[] };

/** Textes d'une leçon de kana dans une langue ; un champ absent n'est pas encore traduit (le français s'affiche). */
export function localizeKana(kana: Kana, lang: "en" | "de"): KanaText {
  const loc = KANA_LOCALES[lang];
  const slug = kana.slug ?? kana.romaji;
  const key = `${kana.script}/${slug}`;
  const o = kana.origin;
  const story = loc.story[key];
  const built =
    o?.kind === "dakuten" ? loc.dakuten(o, kana.romaji)
    : o?.kind === "yoon" ? loc.yoon(o, kana.romaji)
    : o?.kind === "extended" ? loc.extended(o, kana.romaji)
    : undefined;
  const note = loc.note[key];
  const pronunciation = loc.pronScript[key] ?? (o?.kind === "yoon" ? loc.yoonPron(kana.romaji) : loc.pron[slug]);
  return {
    pronunciation,
    mnemonic: story?.m ?? (built ? [built.m, note].filter(Boolean).join(" ") : undefined),
    caption: kana.illustration ? (story?.cap ?? built?.cap) : undefined,
    words: kana.words.map((w) => loc.words[w.japanese]),
  };
}

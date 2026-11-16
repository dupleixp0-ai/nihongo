import type { Progress, StoredCard, ReviewEntry, StreakData } from "./db/types";

/**
 * Les sceaux (印 いん, in) : des récompenses personnelles, calculées à partir de la progression.
 * Rien n'est à stocker : un sceau obtenu le reste, car tout ce qu'on compte ne fait que grandir.
 */

export type LessonGroups = { hiraganaBase: string[]; katakanaBase: string[]; kanjiN5: string[]; kanjiN4: string[] };

export type Seal = {
  id: string;
  /** Le caractère du sceau, et le mot japonais qu'il évoque, avec sa lecture. */
  glyph: string;
  word: string;
  kana: string;
  romaji: string;
  title: string;
  text: string;
  value: number;
  target: number;
};

type Input = { progress: Progress; cards: StoredCard[]; reviews: ReviewEntry[]; streak: StreakData; best: number; groups: LessonGroups };

export function computeSeals({ progress, cards, reviews, streak, best, groups }: Input): Seal[] {
  const seen = (ids: string[]) => ids.filter((id) => progress.seen[id]).length;
  const seenKanji = Object.keys(progress.seen).filter((id) => id.startsWith("/kanji/")).length;
  const anchored = cards.filter((c) => c.state === 2 && c.scheduled_days >= 21).length;
  const verbs = cards.filter((c) => c.id.startsWith("verbe:")).length;
  const words = cards.filter((c) => c.id.startsWith("mot:")).length;
  const lessons = Object.keys(progress.seen).length;
  return [
    { id: "debut", glyph: "始", word: "始め", kana: "はじめ", romaji: "hajime", title: "Premier pas", text: "Ouvrir une première leçon.", value: lessons, target: 1 },
    { id: "hiragana", glyph: "あ", word: "ひらがな", kana: "ひらがな", romaji: "hiragana", title: "Hiragana de base", text: "Étudier les 46 hiragana de base.", value: seen(groups.hiraganaBase), target: groups.hiraganaBase.length },
    { id: "katakana", glyph: "ア", word: "カタカナ", kana: "かたかな", romaji: "katakana", title: "Katakana de base", text: "Étudier les 46 katakana de base.", value: seen(groups.katakanaBase), target: groups.katakanaBase.length },
    { id: "kanji-50", glyph: "漢", word: "漢字", kana: "かんじ", romaji: "kanji", title: "50 kanji", text: "Étudier 50 kanji.", value: seenKanji, target: 50 },
    { id: "kanji-n5", glyph: "五", word: "五", kana: "ご", romaji: "go", title: "Kanji N5", text: `Étudier les ${groups.kanjiN5.length} kanji du N5.`, value: seen(groups.kanjiN5), target: groups.kanjiN5.length },
    { id: "kanji-n4", glyph: "四", word: "四", kana: "よん", romaji: "yon", title: "Kanji N4", text: `Étudier les ${groups.kanjiN4.length} kanji du N4.`, value: seen(groups.kanjiN4), target: groups.kanjiN4.length },
    { id: "verbes", glyph: "動", word: "動詞", kana: "どうし", romaji: "dōshi", title: "50 verbes", text: "Mettre 50 verbes en révision.", value: verbs, target: 50 },
    { id: "mots", glyph: "単", word: "単語", kana: "たんご", romaji: "tango", title: "100 mots", text: "Mettre 100 mots de vocabulaire en révision.", value: words, target: 100 },
    { id: "rev-100", glyph: "復", word: "復習", kana: "ふくしゅう", romaji: "fukushū", title: "100 révisions", text: "Répondre à 100 cartes de révision.", value: reviews.length, target: 100 },
    { id: "rev-1000", glyph: "千", word: "千", kana: "せん", romaji: "sen", title: "1 000 révisions", text: "Répondre à 1 000 cartes de révision.", value: reviews.length, target: 1000 },
    { id: "ancre", glyph: "根", word: "根", kana: "ね", romaji: "ne", title: "Racines", text: "Ancrer 50 cartes (retour dans 3 semaines ou plus).", value: anchored, target: 50 },
    { id: "serie-7", glyph: "炎", word: "炎", kana: "ほのお", romaji: "honoo", title: "Une semaine", text: "Tenir 7 jours d'affilée.", value: best, target: 7 },
    { id: "serie-30", glyph: "月", word: "一か月", kana: "いっかげつ", romaji: "ikkagetsu", title: "Un mois", text: "Tenir 30 jours d'affilée.", value: best, target: 30 },
    { id: "serie-100", glyph: "百", word: "百日", kana: "ひゃくにち", romaji: "hyakunichi", title: "Cent jours", text: "Tenir 100 jours d'affilée.", value: best, target: 100 },
    { id: "but", glyph: "守", word: "お守り", kana: "おまもり", romaji: "omamori", title: "Premier omamori", text: "Atteindre un but de série.", value: streak.goalsDone.length, target: 1 },
    { id: "sauve", glyph: "救", word: "救い", kana: "すくい", romaji: "sukui", title: "Flamme sauvée", text: "Rattraper un jour manqué par un exercice.", value: streak.repaired.length, target: 1 },
  ];
}

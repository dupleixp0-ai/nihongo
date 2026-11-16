/**
 * Couleurs à débloquer avec les sceaux : la flamme et l'encre (grands caractères, tracé).
 * Les valeurs sont dans globals.css (attributs data-flame et data-ink sur <html>).
 */

export type Palette = { id: string; jp: string; kana: string; romaji: string; fr: string; en: string; de: string; seals: number; swatch: [string, string] };

export const FLAMES: Palette[] = [
  { id: "aka", jp: "赤", kana: "あか", romaji: "aka", fr: "rouge", en: "red", de: "Rot", seals: 0, swatch: ["#b8322a", "#f08a3c"] },
  { id: "kin", jp: "金", kana: "きん", romaji: "kin", fr: "or", en: "gold", de: "Gold", seals: 2, swatch: ["#c98a12", "#f2b33d"] },
  { id: "ao", jp: "青", kana: "あお", romaji: "ao", fr: "bleu", en: "blue", de: "Blau", seals: 4, swatch: ["#3d5fb0", "#7fa2f0"] },
  { id: "sakura", jp: "桜", kana: "さくら", romaji: "sakura", fr: "fleur de cerisier", en: "cherry blossom", de: "Kirschblüte", seals: 6, swatch: ["#d0587e", "#f29bb5"] },
  { id: "midori", jp: "緑", kana: "みどり", romaji: "midori", fr: "vert", en: "green", de: "Grün", seals: 9, swatch: ["#1f8a62", "#4cc28f"] },
  { id: "murasaki", jp: "紫", kana: "むらさき", romaji: "murasaki", fr: "violet", en: "purple", de: "Violett", seals: 12, swatch: ["#6b3fa0", "#a77bd8"] },
];

export const INKS: Palette[] = [
  { id: "sumi", jp: "墨", kana: "すみ", romaji: "sumi", fr: "encre noire", en: "black ink", de: "schwarze Tinte", seals: 0, swatch: ["#17233a", "#e7ecf5"] },
  { id: "ai", jp: "藍", kana: "あい", romaji: "ai", fr: "indigo", en: "indigo", de: "Indigo", seals: 1, swatch: ["#2c4a8c", "#91a9ee"] },
  { id: "shu", jp: "朱", kana: "しゅ", romaji: "shu", fr: "vermillon", en: "vermilion", de: "Zinnoberrot", seals: 3, swatch: ["#b8322a", "#e0675d"] },
  { id: "cha", jp: "茶", kana: "ちゃ", romaji: "cha", fr: "brun thé", en: "tea brown", de: "Teebraun", seals: 5, swatch: ["#7a4a26", "#d6a77a"] },
  { id: "matsu", jp: "松", kana: "まつ", romaji: "matsu", fr: "vert pin", en: "pine green", de: "Kieferngrün", seals: 8, swatch: ["#2f6b4a", "#7fc8a0"] },
];

export const isUnlocked = (p: Palette, seals: number) => seals >= p.seals;

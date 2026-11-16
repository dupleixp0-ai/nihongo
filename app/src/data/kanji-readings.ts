import type { Kanji } from "@/domain/kanji";
import { getKanjiByCharacter } from "./kanji";

/**
 * Lecture à afficher à côté d'un kanji, partout dans l'application :
 * la lecture kun (japonaise) en priorité, sinon la lecture on (chinoise).
 */

export type ShortReading = { kana: string; romaji: string };

const clean = (s: string) => s.replace(/[()（）]/g, "");

/** Katakana → hiragana (les lectures on s'écrivent en katakana dans les dictionnaires). */
const toHiragana = (s: string) => s.replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** Pour les nombres, la lecture utilisée pour compter (いち, に, さん…) plutôt que ひとつ, ふたつ… */
const NUMBER_READINGS: Record<string, ShortReading> = {
  "一": { kana: "いち", romaji: "ichi" }, "二": { kana: "に", romaji: "ni" }, "三": { kana: "さん", romaji: "san" },
  "四": { kana: "よん", romaji: "yon" }, "五": { kana: "ご", romaji: "go" }, "六": { kana: "ろく", romaji: "roku" },
  "七": { kana: "なな", romaji: "nana" }, "八": { kana: "はち", romaji: "hachi" }, "九": { kana: "きゅう", romaji: "kyū" },
  "十": { kana: "じゅう", romaji: "jū" }, "百": { kana: "ひゃく", romaji: "hyaku" }, "千": { kana: "せん", romaji: "sen" },
  "万": { kana: "まん", romaji: "man" }, "円": { kana: "えん", romaji: "en" },
};

/** Lecture principale, en hiragana : celle des nombres, sinon kun, sinon on. Sans parenthèses : い(く) → いく. */
export function mainReading(kanji: Kanji): ShortReading | undefined {
  const number = NUMBER_READINGS[kanji.character];
  if (number) return number;
  const r = kanji.kunyomi[0] ?? kanji.onyomi[0];
  return r ? { kana: toHiragana(clean(r.kana)), romaji: clean(r.romaji) } : undefined;
}

/** Lectures kun et on principales, pour les cartes (ex. ひ hi · ニチ nichi). */
export function keyReadings(kanji: Kanji): ShortReading[] {
  return [kanji.kunyomi[0], kanji.onyomi[0]].filter(Boolean).map((r) => ({ kana: clean(r!.kana), romaji: clean(r!.romaji) }));
}

/**
 * Composants et kanji hors N5 cités dans les histoires et les astuces.
 * Pour une clé (radical), on donne son nom japonais.
 */
const COMPONENTS: Record<string, ShortReading & { name?: string }> = {
  "⻌": { kana: "しんにょう", romaji: "shinnyō", name: "la route" },
  "交": { kana: "こう", romaji: "kō" },
  "亻": { kana: "にんべん", romaji: "ninben", name: "la personne" },
  "刀": { kana: "かたな", romaji: "katana" },
  "力": { kana: "ちから", romaji: "chikara" },
  "化": { kana: "か", romaji: "ka" },
  "卜": { kana: "ぼく", romaji: "boku" },
  "占": { kana: "うらなう", romaji: "uranau" },
  "又": { kana: "また", romaji: "mata" },
  "可": { kana: "か", romaji: "ka" },
  "吾": { kana: "ご", romaji: "go" },
  "周": { kana: "しゅう", romaji: "shū" },
  "売": { kana: "うる", romaji: "uru" },
  "夕": { kana: "ゆう", romaji: "yū" },
  "宀": { kana: "うかんむり", romaji: "ukanmuri", name: "le toit" },
  "寺": { kana: "てら", romaji: "tera" },
  "工": { kana: "こう", romaji: "kō" },
  "广": { kana: "まだれ", romaji: "madare", name: "l'auvent" },
  "彳": { kana: "ぎょうにんべん", romaji: "gyōninben", name: "le pas" },
  "斤": { kana: "きん", romaji: "kin" },
  "欠": { kana: "あくび", romaji: "akubi" },
  "牛": { kana: "うし", romaji: "ushi" },
  "玉": { kana: "たま", romaji: "tama" },
  "礻": { kana: "しめすへん", romaji: "shimesuhen", name: "l'autel" },
  "罒": { kana: "あみがしら", romaji: "amigashira", name: "le filet" },
  "舌": { kana: "した", romaji: "shita" },
  "艹": { kana: "くさかんむり", romaji: "kusakanmuri", name: "l'herbe" },
  "貝": { kana: "かい", romaji: "kai" },
  "門": { kana: "もん", romaji: "mon" },
  "首": { kana: "くび", romaji: "kubi" },
  "馬": { kana: "うま", romaji: "uma" },
  "𠆢": { kana: "ひとやね", romaji: "hitoyane", name: "le toit en chapeau" },
  "市": { kana: "いち", romaji: "ichi", name: "le marché" },
  "未": { kana: "み", romaji: "mi", name: "pas encore" },
  "王": { kana: "おう", romaji: "ō", name: "le roi" },
  "禾": { kana: "のぎ", romaji: "nogi", name: "la céréale" },
  "矢": { kana: "や", romaji: "ya", name: "la flèche" },
  "疒": { kana: "やまいだれ", romaji: "yamaidare", name: "la maladie" },
  "⻖": { kana: "こざとへん", romaji: "kozatohen", name: "la colline" },
  "完": { kana: "かん", romaji: "kan" },
  "歹": { kana: "がつへん", romaji: "gatsuhen", name: "l'os brisé" },
  "頁": { kana: "おおがい", romaji: "ōgai", name: "la tête" },
  "夂": { kana: "ふゆがしら", romaji: "fuyugashira", name: "les pieds qui traînent" },
  "尸": { kana: "しかばね", romaji: "shikabane", name: "l'auvent" },
  "隹": { kana: "ふるとり", romaji: "furutori", name: "l'oiseau" },
  "羽": { kana: "はね", romaji: "hane" },
  "氵": { kana: "さんずい", romaji: "sanzui", name: "l'eau" },
  "穴": { kana: "あな", romaji: "ana" },
  "虫": { kana: "むし", romaji: "mushi" },
  "里": { kana: "さと", romaji: "sato" },
  "灬": { kana: "れんが", romaji: "renga", name: "le feu" },
  "也": { kana: "なり", romaji: "nari" },
  "丁": { kana: "ちょう", romaji: "chō" },
  "豕": { kana: "いのこ", romaji: "inoko", name: "le cochon" },
  "至": { kana: "いたる", romaji: "itaru", name: "arriver" },
  "羊": { kana: "ひつじ", romaji: "hitsuji" },
  "央": { kana: "おう", romaji: "ō", name: "le centre" },
  "囗": { kana: "くにがまえ", romaji: "kunigamae", name: "l'enclos" },
  "弓": { kana: "ゆみ", romaji: "yumi" },
  "石": { kana: "いし", romaji: "ishi" },
  "是": { kana: "ぜ", romaji: "ze" },
  "竹": { kana: "たけ", romaji: "take" },
  "合": { kana: "あう", romaji: "au" },
  "士": { kana: "し", romaji: "shi", name: "le samouraï" },
  "己": { kana: "おのれ", romaji: "onore", name: "soi" },
  "糸": { kana: "いと", romaji: "ito" },
  "吏": { kana: "り", romaji: "ri", name: "le fonctionnaire" },
  "扌": { kana: "てへん", romaji: "tehen", name: "la main" },
  "昔": { kana: "むかし", romaji: "mukashi" },
  "甬": { kana: "よう", romaji: "yō" },
  "軍": { kana: "ぐん", romaji: "gun" },
  "云": { kana: "うん", romaji: "un" },
  "反": { kana: "はん", romaji: "han" },
  "米": { kana: "こめ", romaji: "kome" },
  "斗": { kana: "と", romaji: "to" },
  "聿": { kana: "ふでづくり", romaji: "fudezukuri", name: "le pinceau" },
  "刂": { kana: "りっとう", romaji: "rittō", name: "le couteau" },
};

/** Lecture d'un caractère isolé cité dans un texte français (kanji N5 ou composant). */
export function readingOfCharacter(character: string): ShortReading | undefined {
  const kanji = getKanjiByCharacter(character);
  if (kanji) return mainReading(kanji);
  return COMPONENTS[character];
}

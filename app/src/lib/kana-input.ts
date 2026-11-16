/**
 * Saisie au clavier : rōmaji → kana pendant la frappe (comme un clavier japonais),
 * et comparaison tolérante d'une réponse tapée avec les lectures attendues.
 */

import { toHiragana } from "./romaji";

const VOWELS = "aiueo";
const ROWS: Record<string, string> = {
  "": "あいうえお", k: "かきくけこ", s: "さしすせそ", t: "たちつてと", n: "なにぬねの", h: "はひふへほ",
  m: "まみむめも", y: "や\0ゆいぇよ", r: "らりるれろ", w: "わうぃうぇを", g: "がぎぐげご", z: "ざじずぜぞ",
  d: "だぢづでど", b: "ばびぶべぼ", p: "ぱぴぷぺぽ", l: "ぁぃぅぇぉ", x: "ぁぃぅぇぉ", v: "ゔぁゔぃゔゔぇゔぉ",
};

/** Table rōmaji → hiragana, construite une fois. Plusieurs orthographes acceptées (shi/si, tsu/tu, fu/hu…). */
const TABLE: Record<string, string> = (() => {
  const t: Record<string, string> = {};
  for (const [c, kana] of Object.entries(ROWS)) {
    if (c === "w" || c === "v" || c === "y") continue;
    VOWELS.split("").forEach((v, i) => (t[c + v] = kana[i]));
  }
  Object.assign(t, {
    ya: "や", yu: "ゆ", yo: "よ", ye: "いぇ", wa: "わ", wo: "を", wi: "うぃ", we: "うぇ",
    va: "ゔぁ", vi: "ゔぃ", vu: "ゔ", ve: "ゔぇ", vo: "ゔぉ",
    shi: "し", chi: "ち", tsu: "つ", fu: "ふ", ji: "じ", zi: "じ", di: "ぢ", du: "づ",
    fa: "ふぁ", fi: "ふぃ", fe: "ふぇ", fo: "ふぉ", je: "じぇ", she: "しぇ", che: "ちぇ",
    thi: "てぃ", dhi: "でぃ", twu: "とぅ", dwu: "どぅ",
    xtsu: "っ", xtu: "っ", ltu: "っ", ltsu: "っ", xya: "ゃ", xyu: "ゅ", xyo: "ょ", lya: "ゃ", lyu: "ゅ", lyo: "ょ",
    xwa: "ゎ", lwa: "ゎ", "n'": "ん", nn: "ん", xn: "ん",
    "-": "ー", "~": "～", ",": "、", ".": "。", "?": "？", "!": "！",
  });
  // Syllabes en ゃ・ゅ・ょ : kya, sha, cha, ja, nya…
  const YOON: Record<string, string> = { k: "き", g: "ぎ", n: "に", h: "ひ", b: "び", p: "ぴ", m: "み", r: "り", s: "し", z: "じ", t: "ち", c: "ち", d: "ぢ", j: "じ" };
  const SMALL: Record<string, string> = { a: "ゃ", u: "ゅ", o: "ょ", e: "ぇ" };
  for (const [c, i] of Object.entries(YOON)) {
    for (const [v, small] of Object.entries(SMALL)) {
      if (v === "e" && !"cjsz".includes(c)) continue;
      t[c + "y" + v] = i + small;
    }
  }
  for (const [v, small] of Object.entries({ a: "ゃ", u: "ゅ", o: "ょ" })) {
    t["sh" + v] = "し" + small;
    t["ch" + v] = "ち" + small;
    t["j" + v] = "じ" + small;
  }
  return t;
})();

const KEYS = Object.keys(TABLE);
const MAX = Math.max(...KEYS.map((k) => k.length));
const isPrefix = (s: string) => KEYS.some((k) => k.startsWith(s));
const CONSONANT = /^[bcdfghjklmnpqrstvwxyz]$/;

/**
 * Convertit les lettres latines d'un texte en kana ; les kana déjà présents restent tels quels.
 * Pendant la frappe (`final: false`), une fin incomplète (« ky », « n ») reste en lettres latines.
 * À la validation (`final: true`), un « n » final devient ん.
 */
export function romajiToKana(raw: string, { katakana = false, final = false } = {}): string {
  // Voyelles longues avec macron (ō, ū…) : écrites comme deux voyelles.
  const input = raw.replace(/[āâ]/g, "aa").replace(/[īî]/g, "ii").replace(/[ūû]/g, "uu").replace(/[ēê]/g, "ee").replace(/[ōô]/g, "ou");
  const s = input.toLowerCase();
  let out = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (!/[a-z'\-~,.?!]/.test(c)) {
      out += input[i];
      i++;
      continue;
    }
    // « nn » en fin de frappe : on attend la lettre suivante (こんに… ou こん + consonne).
    if (!final && s.slice(i) === "nn") {
      out += input.slice(i);
      break;
    }
    let matched = false;
    for (let len = Math.min(MAX, s.length - i); len > 0; len--) {
      const chunk = s.slice(i, i + len);
      // « nn » + voyelle : ん + な… (こんにちは), pas ん + い.
      if (chunk === "nn" && VOWELS.includes(s[i + 2] ?? "")) continue;
      if (TABLE[chunk]) {
        out += TABLE[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;
    const next = s[i + 1];
    // Consonne doublée : っ (kk, tt, pp, tch…).
    if (CONSONANT.test(c) && c !== "n" && (next === c || (c === "t" && next === "c"))) {
      out += "っ";
      i++;
      continue;
    }
    // « n » devant une consonne : ん.
    if (c === "n" && next && CONSONANT.test(next) && next !== "y") {
      out += "ん";
      i++;
      continue;
    }
    const rest = s.slice(i);
    if (isPrefix(rest)) {
      // Fin incomplète : on attend la suite (sauf à la validation).
      out += final && rest === "n" ? "ん" : input.slice(i);
      break;
    }
    out += input[i];
    i++;
  }
  return katakana ? toKatakana(out) : out;
}

export const toKatakana = (s: string) => s.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));

/** Voyelle de chaque kana (la première lettre de chaque ligne). */
const VOWEL_OF: Record<string, string> = {};
for (const row of ["あかさたなはまやらわがざだばぱぁゃゎ", "いきしちにひみりぎじぢびぴぃ", "うくすつぬふむゆるぐずづぶぷぅゅゔ", "えけせてねへめれげぜでべぺぇ", "おこそとのほもよろをごぞどぼぽぉょ"]) {
  for (const k of row) VOWEL_OF[k] = row[0];
}

/** Voyelle d'un hiragana (あいうえお), ou undefined. */
export const vowelOf = (kana: string): string | undefined => VOWEL_OF[kana];

/**
 * Forme de comparaison : hiragana, sans espaces ni ponctuation ni marques de lecture,
 * ー remplacé par la voyelle, et les voyelles longues écrites au choix (きょう = きょお, えい = ええ).
 */
export function readingKey(text: string): string {
  // ぢ・づ se prononcent comme じ・ず : on les confond volontairement.
  const s = toHiragana(text.normalize("NFKC")).replace(/[\s.・()（）～〜~\-_'。、？！?!,]/g, "").replace(/ぢ/g, "じ").replace(/づ/g, "ず");
  let out = "";
  for (const ch of s) {
    const v = VOWEL_OF[out.slice(-1)];
    if (ch === "ー") out += v ?? "";
    else if (ch === "う" && v === "お") out += "お";
    else if (ch === "い" && v === "え") out += "え";
    else out += ch;
  }
  return out;
}

/** Lectures acceptées pour une lecture de dictionnaire : た(べる) → たべる et た. */
export function acceptedForms(reading: string): string[] {
  const forms = [reading.replace(/[()（）]/g, "")];
  const stem = reading.match(/^([^()（）]+)[(（]/)?.[1];
  if (stem) forms.push(stem);
  return forms;
}

/** La réponse tapée (kana ou rōmaji) correspond-elle à l'une des lectures (en kana ou en rōmaji) ? */
export function readingMatches(typed: string, accepted: string[]): boolean {
  const key = readingKey(romajiToKana(typed, { final: true }));
  if (!key) return false;
  return accepted.some((a) => acceptedForms(a).some((f) => readingKey(romajiToKana(f, { final: true })) === key));
}

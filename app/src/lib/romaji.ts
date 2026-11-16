/**
 * Conversion kana → rōmaji (Hepburn modifié, avec macrons), utilisée pour afficher
 * les lectures des verbes et de leurs exemples. Les groupes de mots sont séparés par des espaces :
 * は, へ, を en fin de groupe sont des particules (wa, e, o).
 */

const BASE: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o", か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no", は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo", や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", を: "o", ん: "n",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do", ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po", ゔ: "vu",
  ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o",
};
const SMALL_Y: Record<string, string> = { ゃ: "a", ゅ: "u", ょ: "o" };
const SMALL_V: Record<string, string> = { ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o" };

export const toHiragana = (s: string) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** Syllabes d'un groupe de kana, chacune avec son rōmaji. */
function syllables(chunk: string): string[] {
  const s = toHiragana(chunk);
  const out: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const next = s[i + 1];
    if (c === "っ") {
      const r = syllables(s.slice(i + 1, i + 3))[0] ?? "";
      out.push(r.startsWith("ch") ? "t" : r[0] ?? "");
      continue;
    }
    if (c === "ー") {
      const prev = out.join("").match(/[aeiou]$/);
      out.push(prev ? prev[0] : "");
      continue;
    }
    if (next && SMALL_Y[next] && BASE[c]) {
      const b = BASE[c];
      const stem = b.endsWith("i") ? b.slice(0, -1) : b;
      out.push((/^(sh|ch|j)$/.test(stem) ? stem : stem + "y") + SMALL_Y[next]);
      i++;
      continue;
    }
    if (next && SMALL_V[next] && BASE[c] && !SMALL_V[c]) {
      const stem = c === "う" ? "w" : c === "ふ" ? "f" : c === "て" || c === "と" ? "t" : c === "で" || c === "ど" ? "d" : BASE[c].replace(/[aiueo]$/, "");
      out.push(stem + SMALL_V[next]);
      i++;
      continue;
    }
    out.push(BASE[c] ?? c);
  }
  return out;
}

const MACRON: Record<string, string> = { a: "ā", i: "ī", u: "ū", e: "ē", o: "ō" };
const PARTICLES: Record<string, string> = { は: "wa", へ: "e", を: "o" };

/** Un mot en kana → rōmaji avec macrons (ō, ū, ā). `verb` : ne fusionne pas un う final (おもう = omou). */
function wordToRomaji(word: string, verb = false): string {
  const punct = word.match(/[。、！？…]+$/)?.[0] ?? "";
  const body = punct ? word.slice(0, -punct.length) : word;
  if (PARTICLES[body]) return PARTICLES[body] + punct;
  // Salutations dont le は final se lit « wa ».
  if (body === "こんにちは") return "konnichiwa" + punct;
  if (body === "こんばんは") return "konbanwa" + punct;
  const parts = syllables(body);
  let text = "";
  parts.forEach((p, i) => {
    const isLast = i === parts.length - 1;
    if (toHiragana(body)[toHiragana(body).length - 1] === "ー" && isLast && p.length === 1 && /[aiueo]/.test(p)) {
      text = text.replace(/[aiueo]$/, (v) => MACRON[v]);
      return;
    }
    if (p.length === 1 && /[aiueo]/.test(p) && i > 0 && parts[i - 1] !== "n") {
      const last = text.slice(-1);
      const longO = last === "o" && (p === "o" || (p === "u" && !(verb && isLast)));
      const longU = last === "u" && p === "u" && !(verb && isLast);
      const longA = last === "a" && p === "a";
      if (longO || longU || longA) { text = text.slice(0, -1) + MACRON[last]; return; }
    }
    if (parts[i - 1] === "n" && /^[aiueoy]/.test(p)) text += "'";
    text += p;
  });
  return text + punct;
}

const PUNCT: Record<string, string> = { "。": ".", "、": ",", "！": "!", "？": "?", "…": "…" };

/**
 * Kana → rōmaji. Les mots sont séparés par des espaces, les particules par « _ »
 * (ex. « えき_で ともだち_に あいます。 »). Le « _ » ne s'affiche pas en kana.
 */
export function kanaToHepburn(kana: string, { capitalize = true, verb = false } = {}): string {
  const words = kana.trim().split(/[\s_]+/).filter(Boolean);
  const text = words.map((w) => wordToRomaji(w, verb)).join(" ").replace(/[。、！？]/g, (m) => PUNCT[m]).replace(/\s+([.,!?])/g, "$1");
  return capitalize ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

/** Kana à afficher : sans les marques de particule « _ ». */
export const displayKana = (kana: string) => kana.replace(/_/g, "");

/**
 * Une phrase entière en rōmaji : majuscule au début de chaque phrase, et aux mots en katakana (noms, pays)
 * et aux noms de personnes indiqués dans `names` (écrits en hiragana).
 */
export function sentenceRomaji(kana: string, names: string[] = []): string {
  const tokens = kana.split(/[\s_]+/).filter(Boolean);
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const text = tokens
    .map((tok) => {
      const r = kanaToHepburn(tok, { capitalize: false });
      return /^[ァ-ヶ]/.test(tok) || names.includes(tok.replace(/[。、！？…]+$/, "")) ? cap(r) : r;
    })
    .join(" ");
  return cap(text).replace(/([.!?…]) (\p{L})/gu, (_, p, c) => `${p} ${c.toUpperCase()}`);
}

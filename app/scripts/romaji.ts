/** Conversion kana → rōmaji (Hepburn simplifié), pour vérifier les transcriptions. */

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

export function kanaToRomaji(input: string): string {
  const s = toHiragana(input.replace(/ヲ/g, "\u0000"));
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const next = s[i + 1];
    if (c === "\u0000") { out += "wo"; continue; }
    if ((c === "で" || c === "て") && next === "ゅ") { out += c === "で" ? "dyu" : "tyu"; i++; continue; }
    if (c === "っ") {
      const r = kanaToRomaji(s.slice(i + 1, i + 3));
      out += r.startsWith("ch") ? "t" : r[0] ?? "";
      continue;
    }
    if (c === "ー") {
      const m = out.match(/[aeiou]$/);
      out += m ? m[0] : "";
      continue;
    }
    if (next && SMALL_Y[next] && BASE[c]) {
      const b = BASE[c];
      const stem = b.endsWith("i") ? b.slice(0, -1) : b;
      out += (/^(sh|ch|j)$/.test(stem) ? stem : stem + "y") + SMALL_Y[next];
      i++;
      continue;
    }
    if (next && SMALL_V[next] && BASE[c] && !SMALL_V[c]) {
      const b = BASE[c];
      const stem = c === "う" ? "w" : c === "ゔ" ? "v" : c === "ふ" ? "f" : c === "て" || c === "と" ? "t" : c === "で" || c === "ど" ? "d" : b.replace(/[aiueo]$/, "");
      out += stem + SMALL_V[next];
      i++;
      continue;
    }
    out += BASE[c] ?? (/[\s、。！？「」…・]/.test(c) ? "" : c);
  }
  return out;
}

/** Forme comparable : sans macrons, voyelles longues réduites, sans espaces ni ponctuation. */
export function normalizeRomaji(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]/g, "")
    .replace(/ou/g, "o").replace(/oo/g, "o").replace(/uu/g, "u").replace(/aa/g, "a").replace(/ee/g, "e").replace(/ii/g, "i")
    .replace(/n'?/g, "n");
}

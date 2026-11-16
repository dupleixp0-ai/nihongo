import type { Kana, KanaCell, KanaWord } from "@/domain/kana";
import { transformPaths } from "@/lib/svg-path";

/**
 * Signes propres à l'écriture du hiragana : le petit っ (consonne double) et les voyelles longues
 * (ああ, いい, うう, えい, おう). Comme pour les yōon, les traits sont repris des leçons de base.
 */

const w = (japanese: string, romaji: string, meaning: string): KanaWord => ({ japanese, romaji, meaning });

const TSU = { scale: 0.52, dx: 26, dy: 34 };
const FIRST = { scale: 0.56, dx: -1, dy: 24 };
const SECOND = { scale: 0.56, dx: 49, dy: 24 };

type LongSpec = { slug: string; first: string; second: string; romaji: string; sound: string; story: string; words: KanaWord[] };

const LONG: LongSpec[] = [
  { slug: "aa", first: "a", second: "a", romaji: "ā",
    sound: "Un « a » tenu deux fois plus longtemps : おかあさん se dit « o-kââ-san ».",
    story: "Deux あ côte à côte : la même ancre jetée deux fois, ou plutôt une corde si longue qu'il faut deux ancres pour la tenir. Le son fait pareil : on le garde, on ne le relâche pas. Les deux voyelles ne forment pas deux syllabes mais un seul « a » étiré.",
    words: [w("おかあさん", "okāsan", "la mère"), w("おばあさん", "obāsan", "la grand-mère"), w("おかあ", "okā", "maman (familier)")] },
  { slug: "ii", first: "i", second: "i", romaji: "ī",
    sound: "Un « i » tenu deux fois plus longtemps : おにいさん se dit « o-nîî-san ».",
    story: "Deux い : les deux petites souris sont maintenant quatre, assises en file. Elles chantent la même note aiguë et la tiennent, sans reprendre leur souffle : un seul « i » long.",
    words: [w("おにいさん", "onīsan", "le grand frère"), w("おじいさん", "ojīsan", "le grand-père"), w("いいえ", "īe", "non")] },
  { slug: "uu", first: "u", second: "u", romaji: "ū",
    sound: "Un « ou » tenu deux fois plus longtemps : くうき se dit « kôô-ki ».",
    story: "Deux う, comme deux sourires de profil, l'un derrière l'autre : un très long « ouuu », comme le souffle du vent dans un tunnel. On ne prononce pas deux « ou » : on étire le premier.",
    words: [w("くうき", "kūki", "l'air"), w("すうじ", "sūji", "le chiffre"), w("ふうせん", "fūsen", "le ballon")] },
  { slug: "ei", first: "e", second: "i", romaji: "ei",
    sound: "Se prononce presque comme un « é » long : せんせい se dit « sen-sé- » (le « i » final s'entend à peine).",
    story: "Un え suivi d'un い : l'oiseau puis la souris. Dans la pratique, la souris est si discrète qu'on ne l'entend presque pas : le « é » s'allonge et c'est tout. À l'écrit on garde pourtant le い, d'où le « ei » des rōmaji (sensei).",
    words: [w("せんせい", "sensei", "le professeur"), w("えいが", "eiga", "le film"), w("とけい", "tokei", "la montre, l'horloge")] },
  { slug: "ou", first: "o", second: "u", romaji: "ō",
    sound: "Un « o » long : ありがとう se dit « a-ri-ga-tôô ». Le う ne se prononce pas « ou », il allonge le « o ».",
    story: "Un お suivi d'un う : le grand « o » rond, puis un sourire qui le prolonge. Le sourire ne dit rien, il sert seulement à tenir la note. C'est la voyelle longue la plus fréquente : ありがとう, こうえん, とうきょう… (le お long s'écrit aussi おお : おおきい, « grand »).",
    words: [w("ありがとう", "arigatō", "merci"), w("こうえん", "kōen", "le parc"), w("おとうさん", "otōsan", "le père"), w("とうきょう", "tōkyō", "Tokyo")] },
];

const KANA_OF: Record<string, string> = { a: "あ", i: "い", u: "う", e: "え", o: "お" };
function pairOf(l: LongSpec) { return KANA_OF[l.first] + KANA_OF[l.second]; }

export const hiraganaSignCells: KanaCell[] = [
  { character: "っ", romaji: "sokuon", slug: "sokuon" },
  ...LONG.map((l) => ({ character: pairOf(l), romaji: l.romaji, slug: l.slug })),
];

export const HIRAGANA_SIGNS_TOTAL = hiraganaSignCells.length;

export function buildHiraganaSigns(base: ReadonlyMap<string, Kana>): Map<string, Kana> {
  const result = new Map<string, Kana>();
  const tsu = base.get("tsu");
  if (tsu?.strokes) {
    result.set("sokuon", {
      character: "っ", slug: "sokuon", family: "special", script: "hiragana", romaji: "sokuon",
      pronunciation: "Il ne se prononce pas : c'est un tout petit silence qui double la consonne suivante. Dans きって (kitte), on retient le souffle un instant entre « kit » et « te », comme dans « ac-teur ».",
      mnemonic: "C'est le grand tsunami du つ, mais réduit à une petite ride posée sur la ligne. Une ride ne fait pas de bruit : elle fait juste une pause avant la vague suivante. Le petit っ fait pareil : une micro-pause, puis la consonne suivante est prononcée deux fois plus fort. Il se place toujours juste avant la consonne qu'il double.",
      illustration: { id: "tsunami", caption: "La grande vague du つ, devenue une simple ride : une pause." },
      strokes: transformPaths(tsu.strokes, TSU.scale, TSU.dx, TSU.dy),
      words: [w("きって", "kitte", "le timbre"), w("ざっし", "zasshi", "le magazine"), w("いっぱい", "ippai", "plein, beaucoup"), w("がっこう", "gakkō", "l'école"), w("にっき", "nikki", "le journal intime")],
    });
  }
  for (const l of LONG) {
    const a = base.get(l.first);
    const b = base.get(l.second);
    if (!a?.strokes || !b?.strokes) continue;
    result.set(l.slug, {
      character: pairOf(l), slug: l.slug, family: "long", script: "hiragana", romaji: l.romaji,
      pronunciation: l.sound, mnemonic: l.story,
      strokes: [...transformPaths(a.strokes, FIRST.scale, FIRST.dx, FIRST.dy), ...transformPaths(b.strokes, SECOND.scale, SECOND.dx, SECOND.dy)],
      words: l.words,
    });
  }
  return result;
}

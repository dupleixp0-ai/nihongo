import type { Kana, KanaCell, KanaWord } from "@/domain/kana";
import { transformPaths } from "@/lib/svg-path";
import { strokesKatakanaExtra as S } from "./strokes/katakana-dakuten";

/**
 * Katakana étendus : ヴ et les combinaisons avec une petite voyelle (ファ, ティ, ウィ, シェ…),
 * inventées pour noter des sons étrangers qui n'existent pas en japonais traditionnel.
 */

const w = (japanese: string, romaji: string, meaning: string): KanaWord => ({ japanese, romaji, meaning });

type Vowel = "a" | "i" | "u" | "e" | "o";
const SMALL: Record<Vowel, { char: string; key: string }> = {
  a: { char: "ァ", key: "small-a" }, i: { char: "ィ", key: "small-i" }, u: { char: "ゥ", key: "small-u" },
  e: { char: "ェ", key: "small-e" }, o: { char: "ォ", key: "small-o" },
};

type Spec = {
  slug: string; romaji: string;
  /** Slug du katakana de tête (« fu », « te », « de »…) ou « vu » pour ヴ. */
  head: string;
  /** Petite voyelle ajoutée (ou petit ュ pour デュ). */
  small: Vowel | "yu";
  pronunciation: string;
  words: KanaWord[];
};

const SPECS: Spec[] = [
  { slug: "va", romaji: "va", head: "vu", small: "a", pronunciation: "Comme le « va » de « vague ». Beaucoup de Japonais disent « ba ».", words: [w("ヴァイオリン", "vaiorin", "le violon (souvent écrit バイオリン)")] },
  { slug: "vi", romaji: "vi", head: "vu", small: "i", pronunciation: "Comme le « vi » de « vite ». Souvent prononcé « bi ».", words: [w("ヴィーナス", "Vīnasu", "Vénus")] },
  { slug: "ve", romaji: "ve", head: "vu", small: "e", pronunciation: "Comme le « vé » de « vélo ». Souvent prononcé « bé ».", words: [w("ヴェネツィア", "Venetsia", "Venise")] },
  { slug: "vo", romaji: "vo", head: "vu", small: "o", pronunciation: "Comme le « vo » de « vol ». Souvent prononcé « bo ».", words: [w("ヴォーカル", "vōkaru", "le chanteur (d'un groupe)")] },
  { slug: "fa", romaji: "fa", head: "fu", small: "a", pronunciation: "Comme le « fa » de « farine », avec un « f » soufflé doucement entre les lèvres.", words: [w("ファン", "fan", "le fan"), w("ファイル", "fairu", "le fichier, le classeur"), w("ファッション", "fasshon", "la mode")] },
  { slug: "fi", romaji: "fi", head: "fu", small: "i", pronunciation: "Comme le « fi » de « fil ».", words: [w("フィルム", "firumu", "la pellicule, le film plastique"), w("フィンランド", "Finrando", "la Finlande")] },
  { slug: "fe", romaji: "fe", head: "fu", small: "e", pronunciation: "Comme le « fé » de « fée ».", words: [w("カフェ", "kafe", "le café (lieu)"), w("フェリー", "ferī", "le ferry")] },
  { slug: "fo", romaji: "fo", head: "fu", small: "o", pronunciation: "Comme le « fo » de « forêt ».", words: [w("フォーク", "fōku", "la fourchette"), w("フォント", "fonto", "la police de caractères")] },
  { slug: "ti", romaji: "ti", head: "te", small: "i", pronunciation: "Comme le « ti » de « tirelire » : un vrai « t », pas « tchi ».", words: [w("パーティー", "pātī", "la fête"), w("ティッシュ", "tisshu", "le mouchoir en papier")] },
  { slug: "di", romaji: "di", head: "de", small: "i", pronunciation: "Comme le « di » de « dire » : un vrai « d », pas « dji ».", words: [w("ディナー", "dinā", "le dîner"), w("ディスク", "disuku", "le disque")] },
  { slug: "tu", romaji: "tu", head: "to", small: "u", pronunciation: "Comme le « tou » de « tout » : un vrai « t », pas « tsu ».", words: [w("タトゥー", "tatū", "le tatouage")] },
  { slug: "dyu", romaji: "dyu", head: "de", small: "yu", pronunciation: "Comme « diou », en une seule syllabe.", words: [w("デュエット", "dyuetto", "le duo")] },
  { slug: "wi", romaji: "wi", head: "u", small: "i", pronunciation: "Comme le « oui » français.", words: [w("ウィンドウ", "windou", "la fenêtre (informatique)"), w("ハロウィン", "Harowin", "Halloween"), w("ウィスキー", "wisukī", "le whisky")] },
  { slug: "we", romaji: "we", head: "u", small: "e", pronunciation: "Comme « ouè », en une seule syllabe.", words: [w("ウェブ", "webu", "le web"), w("ウェイター", "weitā", "le serveur")] },
  { slug: "w-o", romaji: "wo", head: "u", small: "o", pronunciation: "Comme « ouo », en une seule syllabe (à ne pas confondre avec ヲ).", words: [w("ウォッカ", "wokka", "la vodka"), w("ウォーキング", "wōkingu", "la marche sportive")] },
  { slug: "she", romaji: "she", head: "shi", small: "e", pronunciation: "Comme le « ché » de « chéri ».", words: [w("シェフ", "shefu", "le chef cuisinier"), w("シェア", "shea", "le partage")] },
  { slug: "je", romaji: "je", head: "ji", small: "e", pronunciation: "Comme « djé », le « j » de l'anglais « jet ».", words: [w("ジェット", "jetto", "le jet"), w("ジェスチャー", "jesuchā", "le geste")] },
  { slug: "che", romaji: "che", head: "chi", small: "e", pronunciation: "Comme le « tché » de « tchèque ».", words: [w("チェック", "chekku", "la vérification"), w("チェス", "chesu", "les échecs"), w("チェロ", "chero", "le violoncelle")] },
];

const BIG = { scale: 0.68, dx: 1, dy: 8 };
const SMALL_POS = { scale: 0.44, dx: 61, dy: 52 };

function buildVu(base: ReadonlyMap<string, Kana>): Kana | undefined {
  const u = base.get("u");
  const strokes = S["vu"];
  if (!u || !strokes) return undefined;
  return {
    character: "ヴ", slug: "vu", family: "dakuten", script: "katakana", romaji: "vu",
    pronunciation: "Un « v », comme dans « vous ». Ce son n'existe pas en japonais : beaucoup de Japonais disent simplement « bu ».",
    mnemonic: "Reprends l'usine de ton « ウ » et ajoute les deux gouttes (゛) en haut à droite : le « ou » devient « vou ». ヴ sert presque toujours avec une petite voyelle : ヴァ, ヴィ, ヴェ, ヴォ.",
    illustration: u.illustration ? { id: u.illustration.id, caption: "L'usine du « ウ », avec les deux gouttes en plus.", strokes, marks: 2 } : undefined,
    strokes, words: [],
  };
}

function build(spec: Spec, base: ReadonlyMap<string, Kana>): Kana | undefined {
  const head = base.get(spec.head);
  const vowelLesson = spec.small === "yu" ? base.get("yu") : base.get(spec.small);
  const smallKey = spec.small === "yu" ? "small-yu" : SMALL[spec.small].key;
  const smallChar = spec.small === "yu" ? "ュ" : SMALL[spec.small].char;
  const headStrokes = head?.strokes;
  const smallStrokes = S[smallKey];
  if (!head || !headStrokes || !smallStrokes) return undefined;
  const strokes = [
    ...transformPaths(headStrokes, BIG.scale, BIG.dx, BIG.dy),
    ...transformPaths(smallStrokes, SMALL_POS.scale, SMALL_POS.dx, SMALL_POS.dy),
  ];
  const mnemonic = [
    `Prends ton « ${head.character} » et ajoute à sa droite, plus bas et plus petit, un « ${smallChar} ».`,
    `La petite voyelle remplace la voyelle du « ${head.character} » : on obtient « ${spec.romaji} », en une seule syllabe.`,
    "Ces combinaisons ont été créées pour écrire des sons étrangers : on les trouve surtout dans les mots d'emprunt.",
  ].join(" ");
  return {
    character: head.character + smallChar, slug: spec.slug, family: "yoon", script: "katakana", romaji: spec.romaji,
    pronunciation: `Une seule syllabe. ${spec.pronunciation}`, mnemonic,
    illustration: head.illustration
      ? {
          id: head.illustration.id,
          caption: `Le « ${head.character} » avec, en médaillon, le petit « ${smallChar} ».`,
          strokes: headStrokes,
          marks: head.illustration.marks,
          companion: vowelLesson?.illustration ? { id: vowelLesson.illustration.id, strokes: smallStrokes } : undefined,
        }
      : undefined,
    strokes, words: spec.words,
    origin: { kind: "extended", head: head.character, small: smallChar },
  };
}

/** Construit ヴ et les combinaisons étendues ; `base` doit déjà contenir les dakuten (デ, ド, ジ). */
export function buildKatakanaExtended(base: ReadonlyMap<string, Kana>): Map<string, Kana> {
  const result = new Map<string, Kana>();
  const vu = buildVu(base);
  if (vu) result.set("vu", vu);
  const all = new Map([...base, ...result]);
  for (const spec of SPECS) {
    const lesson = build(spec, all);
    if (lesson) result.set(spec.slug, lesson);
  }
  return result;
}

const find = (slug: string): NonNullable<KanaCell> => {
  if (slug === "vu") return { character: "ヴ", romaji: "vu", slug };
  const spec = SPECS.find((s) => s.slug === slug)!;
  return { character: "", romaji: spec.romaji, slug };
};
const _ = null;

/** Tableau a i u e o des katakana étendus (les caractères sont remplis par buildExtendedRows). */
const LAYOUT: (string | null)[][] = [
  ["va", "vi", "vu", "ve", "vo"],
  ["fa", "fi", _, "fe", "fo"],
  [_, "ti", "tu", _, _],
  [_, "di", "dyu", _, _],
  [_, "wi", _, "we", "w-o"],
  [_, _, _, "she", _],
  [_, _, _, "je", _],
  [_, _, _, "che", _],
];

export function extendedRows(lessons: ReadonlyMap<string, Kana>): KanaCell[][] {
  return LAYOUT.map((row) =>
    row.map((slug) => {
      if (!slug) return null;
      const cell = find(slug);
      return { ...cell, character: lessons.get(slug)?.character ?? cell.character };
    }),
  );
}

export const KATAKANA_EXTENDED_TOTAL = SPECS.length + 1;

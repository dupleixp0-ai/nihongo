import type { Kana, KanaCell, KanaWord, StoryIllustrationId } from "@/domain/kana";
import { transformPaths } from "@/lib/svg-path";
import { strokesKatakanaExtra as S } from "./strokes/katakana-dakuten";

/**
 * Katakana avec dakuten (゛) et handakuten (゜), combinaisons (キャ, シュ, チョ…), et deux signes
 * propres au katakana : le petit ッ (consonne doublée) et le trait ー (voyelle allongée).
 * Les leçons sont bâties à partir des leçons de base : voir buildKatakanaExtra.
 */

const w = (japanese: string, romaji: string, meaning: string): KanaWord => ({ japanese, romaji, meaning });

/** Objet (avec article) de l'histoire de chaque katakana de base. */
const OBJECT: Partial<Record<StoryIllustrationId, string>> = {
  tree: "l'arbre", ibis: "l'ibis", factory: "l'usine", shelf: "l'étagère", parasol: "le parasol", duck: "le canard",
  kiosk: "le kiosque", spoon: "la cuillère", kangaroo: "le kangourou", chest: "le coffre", fir: "le sapin",
  chimp: "le chimpanzé", hero: "le héros", bucket: "le seau", grasshopper: "la sauterelle", bull: "le taureau",
  champion: "le champion", tulip: "la tulipe", table: "la table", totem: "le totem", swimmer: "le nageur",
  level: "le niveau", bowtie: "le nœud papillon", snow: "la neige", compass: "le compas", barn: "la grange",
  seahorse: "l'hippocampe", whisk: "le fouet", hennin: "le hennin", hockey: "le joueur de hockey", hammer: "le marteau",
  millefeuille: "le mille-feuille", gull: "la mouette", medal: "la médaille", windmill: "le moulin à vent",
  yacht: "le yacht", yurt: "la yourte", yogi: "le yogi", ramp: "la rampe", rice: "le riz", ribbon: "le ruban",
  oar: "la rame", robot: "le robot", wagon: "le wagon", origami: "l'origami", eel: "l'anguille",
};

type Spec = { character: string; slug: string; romaji: string; base: string; pronunciation: string; words: KanaWord[]; note?: string };

const DAKUTEN: Spec[] = [
  { character: "ガ", slug: "ga", romaji: "ga", base: "ka", pronunciation: "Comme le « ga » de « gare » (un « g » dur).",
    words: [w("ガス", "gasu", "le gaz"), w("ガラス", "garasu", "le verre (matière)"), w("ガム", "gamu", "le chewing-gum"), w("ガイド", "gaido", "le guide")] },
  { character: "ギ", slug: "gi", romaji: "gi", base: "ki", pronunciation: "Comme le « gui » de « guitare ».",
    words: [w("ギター", "gitā", "la guitare"), w("ギフト", "gifuto", "le cadeau"), w("ギリシャ", "Girisha", "la Grèce")] },
  { character: "グ", slug: "gu", romaji: "gu", base: "ku", pronunciation: "Comme le « gou » de « goutte ».",
    words: [w("グラス", "gurasu", "le verre (à boire)"), w("グループ", "gurūpu", "le groupe"), w("グレー", "gurē", "gris")] },
  { character: "ゲ", slug: "ge", romaji: "ge", base: "ke", pronunciation: "Comme le « gué » de « guérir ».",
    words: [w("ゲーム", "gēmu", "le jeu"), w("ゲスト", "gesuto", "l'invité"), w("ゲート", "gēto", "la porte, le portail")] },
  { character: "ゴ", slug: "go", romaji: "go", base: "ko", pronunciation: "Comme le « go » de « gobelet ».",
    words: [w("ゴルフ", "gorufu", "le golf"), w("ゴール", "gōru", "le but"), w("ゴム", "gomu", "le caoutchouc, la gomme"), w("ゴリラ", "gorira", "le gorille")] },
  { character: "ザ", slug: "za", romaji: "za", base: "sa", pronunciation: "Comme le « za » de « zazou » (un « z » bourdonnant).",
    words: [w("ピザ", "piza", "la pizza"), w("ザック", "zakku", "le sac à dos")] },
  { character: "ジ", slug: "ji", romaji: "ji", base: "shi", pronunciation: "Comme le « dji » de « Djibouti ».",
    words: [w("ジム", "jimu", "la salle de sport"), w("ラジオ", "rajio", "la radio"), w("ジーンズ", "jīnzu", "le jean")] },
  { character: "ズ", slug: "zu", romaji: "zu", base: "su", pronunciation: "Comme le « zou » de « zoulou ».",
    words: [w("ズボン", "zubon", "le pantalon"), w("ズーム", "zūmu", "le zoom"), w("サイズ", "saizu", "la taille")] },
  { character: "ゼ", slug: "ze", romaji: "ze", base: "se", pronunciation: "Comme le « zé » de « zéro ».",
    words: [w("ゼロ", "zero", "zéro"), w("ゼリー", "zerī", "la gelée"), w("プレゼント", "purezento", "le cadeau")] },
  { character: "ゾ", slug: "zo", romaji: "zo", base: "so", pronunciation: "Comme le « zo » de « zone ».",
    words: [w("ゾーン", "zōn", "la zone"), w("オゾン", "ozon", "l'ozone"), w("ゾンビ", "zonbi", "le zombie")] },
  { character: "ダ", slug: "da", romaji: "da", base: "ta", pronunciation: "Comme le « da » de « dame ».",
    words: [w("ダンス", "dansu", "la danse"), w("サラダ", "sarada", "la salade"), w("ダイエット", "daietto", "le régime"), w("ダム", "damu", "le barrage")] },
  { character: "ヂ", slug: "dji", romaji: "ji", base: "chi", pronunciation: "Se dit exactement comme ジ (« dji »). Il est très rare.",
    note: "ヂ et ジ ont le même son ; on écrit presque toujours ジ.",
    words: [w("チヂミ", "chijimi", "la crêpe coréenne")] },
  { character: "ヅ", slug: "dzu", romaji: "zu", base: "tsu", pronunciation: "Se dit exactement comme ズ (« zou »). Il est extrêmement rare.",
    note: "ヅ et ズ ont le même son ; on écrit presque toujours ズ. Il n'a pas de mot courant à retenir.",
    words: [] },
  { character: "デ", slug: "de", romaji: "de", base: "te", pronunciation: "Comme le « dé » de « dé à jouer ».",
    words: [w("デザイン", "dezain", "le design"), w("デパート", "depāto", "le grand magasin"), w("デート", "dēto", "le rendez-vous amoureux")] },
  { character: "ド", slug: "do", romaji: "do", base: "to", pronunciation: "Comme le « do » de « dos ».",
    words: [w("ドア", "doa", "la porte"), w("ドイツ", "Doitsu", "l'Allemagne"), w("ドル", "doru", "le dollar"), w("ドラマ", "dorama", "le feuilleton")] },
  { character: "バ", slug: "ba", romaji: "ba", base: "ha", pronunciation: "Comme le « ba » de « bas ».",
    words: [w("バス", "basu", "le bus"), w("バナナ", "banana", "la banane"), w("バター", "batā", "le beurre"), w("バイク", "baiku", "la moto")] },
  { character: "ビ", slug: "bi", romaji: "bi", base: "hi", pronunciation: "Comme le « bi » de « bidon ».",
    words: [w("ビール", "bīru", "la bière"), w("ビデオ", "bideo", "la vidéo"), w("ビル", "biru", "l'immeuble")] },
  { character: "ブ", slug: "bu", romaji: "bu", base: "fu", pronunciation: "Comme le « bou » de « boule ».",
    words: [w("ブーツ", "būtsu", "les bottes"), w("ブログ", "burogu", "le blog"), w("ブルー", "burū", "bleu"), w("ブラシ", "burashi", "la brosse")] },
  { character: "ベ", slug: "be", romaji: "be", base: "he", pronunciation: "Comme le « bé » de « bébé ».",
    words: [w("ベッド", "beddo", "le lit"), w("ベル", "beru", "la cloche, la sonnette"), w("ベランダ", "beranda", "le balcon"), w("ベーコン", "bēkon", "le bacon")] },
  { character: "ボ", slug: "bo", romaji: "bo", base: "ho", pronunciation: "Comme le « bo » de « bol ».",
    words: [w("ボール", "bōru", "le ballon"), w("ボタン", "botan", "le bouton"), w("ボート", "bōto", "le bateau à rames")] },
  { character: "パ", slug: "pa", romaji: "pa", base: "ha", pronunciation: "Comme le « pa » de « papa ».",
    words: [w("パン", "pan", "le pain"), w("パソコン", "pasokon", "l'ordinateur"), w("パーティー", "pātī", "la fête"), w("パスタ", "pasuta", "les pâtes")] },
  { character: "ピ", slug: "pi", romaji: "pi", base: "hi", pronunciation: "Comme le « pi » de « pipe ».",
    words: [w("ピアノ", "piano", "le piano"), w("ピンク", "pinku", "rose"), w("コピー", "kopī", "la copie")] },
  { character: "プ", slug: "pu", romaji: "pu", base: "fu", pronunciation: "Comme le « pou » de « poule ».",
    words: [w("プール", "pūru", "la piscine"), w("プリン", "purin", "le flan au caramel"), w("プラス", "purasu", "plus")] },
  { character: "ペ", slug: "pe", romaji: "pe", base: "he", pronunciation: "Comme le « pé » de « pétale ».",
    words: [w("ペン", "pen", "le stylo"), w("ペット", "petto", "l'animal de compagnie"), w("ページ", "pēji", "la page")] },
  { character: "ポ", slug: "po", romaji: "po", base: "ho", pronunciation: "Comme le « po » de « pomme ».",
    words: [w("ポスト", "posuto", "la boîte aux lettres"), w("ポケット", "poketto", "la poche"), w("スポーツ", "supōtsu", "le sport"), w("ポテト", "poteto", "la pomme de terre, les frites")] },
];

const HANDAKUTEN = new Set(["pa", "pi", "pu", "pe", "po"]);

function buildDakuten(spec: Spec, base: Kana): Kana {
  const strokes = S[spec.slug];
  const handakuten = HANDAKUTEN.has(spec.slug);
  const baseIllustration = base.illustration;
  const mark = handakuten
    ? "Ajoute la petite bulle (le « maru », ゜) en haut à droite : elle fait éclater le son, « pop ! »."
    : "Ajoute les deux petites gouttes (le « tenten », ゛) en haut à droite : elles rendent le son plus rond, la gorge vibre.";
  const mnemonic = [
    `Reprends l'image de ton « ${base.character} » : ${(baseIllustration && OBJECT[baseIllustration.id]) || "ton dessin"}.`,
    mark,
    `Le « ${base.romaji} » devient « ${spec.romaji} ».`,
    spec.note,
  ].filter(Boolean).join(" ");
  return {
    character: spec.character, slug: spec.slug, family: handakuten ? "handakuten" : "dakuten", script: "katakana",
    romaji: spec.romaji, pronunciation: spec.pronunciation, mnemonic,
    illustration: baseIllustration
      ? { id: baseIllustration.id, caption: `Le dessin du « ${base.character} », avec ${handakuten ? "la bulle" : "les deux gouttes"} en plus.`, strokes, marks: handakuten ? 1 : 2 }
      : undefined,
    strokes, words: spec.words,
    origin: { kind: "dakuten", base: base.character, baseRomaji: base.romaji, object: baseIllustration?.id, handakuten },
  };
}

/* ---------------------------- Combinaisons ---------------------------- */

type YoonRow = { head: string; base: string; onset: string; readings: [string, string, string]; sounds: [string, string, string]; words: [KanaWord[], KanaWord[], KanaWord[]]; };

const SMALL = [
  { char: "ャ", key: "small-ya", id: "yacht" as StoryIllustrationId, syllable: "ya" },
  { char: "ュ", key: "small-yu", id: "yurt" as StoryIllustrationId, syllable: "yu" },
  { char: "ョ", key: "small-yo", id: "yogi" as StoryIllustrationId, syllable: "yo" },
] as const;

const none: KanaWord[] = [];

const YOON: YoonRow[] = [
  { head: "キ", base: "ki", onset: "ky", readings: ["kya", "kyu", "kyo"],
    sounds: ["« quia » : un « k » collé à « ia ».", "« quiou » : « k » + « iou ».", "« quio » : « k » + « io »."],
    words: [[w("キャベツ", "kyabetsu", "le chou"), w("キャンプ", "kyanpu", "le camping"), w("キャラクター", "kyarakutā", "le personnage")], [w("キュート", "kyūto", "mignon"), w("キューブ", "kyūbu", "le cube")], none] },
  { head: "シ", base: "shi", onset: "sh", readings: ["sha", "shu", "sho"],
    sounds: ["comme le « cha » de « chat ».", "comme le « chou » de « chou-fleur ».", "comme le « cho » de « chaud »."],
    words: [[w("シャツ", "shatsu", "la chemise"), w("シャワー", "shawā", "la douche"), w("シャンプー", "shanpū", "le shampooing")], [w("シュート", "shūto", "le tir"), w("シュークリーム", "shūkurīmu", "le chou à la crème")], [w("ショップ", "shoppu", "la boutique"), w("ショー", "shō", "le spectacle"), w("ショッピング", "shoppingu", "le shopping")]] },
  { head: "チ", base: "chi", onset: "ch", readings: ["cha", "chu", "cho"],
    sounds: ["comme le « tcha » de « tchat ».", "comme le « tchou » de « tchou-tchou ».", "comme le « tcho » de « tchô ! » (salut)."],
    words: [[w("チャンス", "chansu", "la chance, l'occasion"), w("チャイム", "chaimu", "le carillon"), w("チャーハン", "chāhan", "le riz sauté")], [w("チューリップ", "chūrippu", "la tulipe"), w("チューブ", "chūbu", "le tube")], [w("チョコ", "choko", "le chocolat"), w("チョコレート", "chokorēto", "le chocolat"), w("チョーク", "chōku", "la craie")]] },
  { head: "ニ", base: "ni", onset: "ny", readings: ["nya", "nyu", "nyo"],
    sounds: ["comme le « nia » de « niais ».", "comme le « niou » de « niouze ».", "comme le « nio » de « Niort » (sans le « r »)."],
    words: [[w("ニャンコ", "nyanko", "le minou (mot enfantin)")], [w("ニュース", "nyūsu", "les informations"), w("ニューヨーク", "Nyūyōku", "New York")], [w("ニョッキ", "nyokki", "les gnocchis")]] },
  { head: "ヒ", base: "hi", onset: "hy", readings: ["hya", "hyu", "hyo"],
    sounds: ["comme « hia » : un souffle puis « ia ».", "comme « hiou » : un souffle puis « iou ».", "comme « hio » : un souffle puis « io »."],
    words: [none, [w("ヒューマン", "hyūman", "humain"), w("ヒューズ", "hyūzu", "le fusible")], [w("ヒョウ", "hyō", "le léopard")]] },
  { head: "ミ", base: "mi", onset: "my", readings: ["mya", "myu", "myo"],
    sounds: ["comme le « mia » de « miam ».", "comme le « miou » de « miou ! » (le chat).", "comme le « mio » de « mioche »."],
    words: [[w("ミャンマー", "Myanmā", "le Myanmar")], [w("ミュージック", "myūjikku", "la musique"), w("ミュージカル", "myūjikaru", "la comédie musicale")], [w("ミョウガ", "myōga", "le myoga (gingembre japonais)")]] },
  { head: "リ", base: "ri", onset: "ry", readings: ["rya", "ryu", "ryo"],
    sounds: ["comme « ria » (le « r » japonais est léger).", "comme « riou ».", "comme le « rio » de « Rio »."],
    words: [none, [w("リュック", "ryukku", "le sac à dos"), w("リュックサック", "ryukkusakku", "le sac à dos")], none] },
  { head: "ギ", base: "gi", onset: "gy", readings: ["gya", "gyu", "gyo"],
    sounds: ["comme « guia » (« g » dur + « ia »).", "comme « guiou ».", "comme « guio »."],
    words: [[w("ギャグ", "gyagu", "la blague"), w("ギャラリー", "gyararī", "la galerie"), w("ギャル", "gyaru", "la fille à la mode")], [w("ギュッと", "gyutto", "(serrer) fort")], [w("ギョーザ", "gyōza", "les raviolis grillés")]] },
  { head: "ジ", base: "ji", onset: "j", readings: ["ja", "ju", "jo"],
    sounds: ["comme le « dja » de « djembé ».", "comme le « djou » de « djoul ».", "comme le « djo » de « Djokovic »."],
    words: [[w("ジャズ", "jazu", "le jazz"), w("ジャム", "jamu", "la confiture"), w("ジャングル", "janguru", "la jungle"), w("ジャケット", "jaketto", "la veste")], [w("ジュース", "jūsu", "le jus"), w("ジュニア", "junia", "junior")], [w("ジョギング", "jogingu", "le jogging"), w("ジョーク", "jōku", "la plaisanterie")]] },
  { head: "ビ", base: "bi", onset: "by", readings: ["bya", "byu", "byo"],
    sounds: ["comme « bia » (« b » + « ia »).", "comme « biou ».", "comme « bio »."],
    words: [none, [w("ビュッフェ", "byuffe", "le buffet")], none] },
  { head: "ピ", base: "pi", onset: "py", readings: ["pya", "pyu", "pyo"],
    sounds: ["comme « pia » (« p » + « ia »).", "comme « piou » (le poussin).", "comme « pio »."],
    words: [none, [w("ピューマ", "pyūma", "le puma")], none] },
];

const MARKED_BASE = new Set(["gi", "ji", "bi", "pi"]);
const BIG = { scale: 0.68, dx: 1, dy: 8 };
const SMALL_POS = { scale: 0.44, dx: 61, dy: 52 };

function buildYoon(row: YoonRow, index: number, baseLesson: Kana | undefined): Kana | undefined {
  const small = SMALL[index];
  const slug = row.readings[index];
  const marked = MARKED_BASE.has(row.base);
  const rawBase = marked ? S[row.base] : baseLesson?.strokes;
  const smallStrokes = S[small.key];
  if (!rawBase || !smallStrokes) return undefined;
  const baseId = baseLesson?.illustration?.id;
  const strokes = [...transformPaths(rawBase, BIG.scale, BIG.dx, BIG.dy), ...transformPaths(smallStrokes, SMALL_POS.scale, SMALL_POS.dx, SMALL_POS.dy)];
  const mnemonic = [
    `Prends ton « ${row.head} » (${(baseId && OBJECT[baseId]) || "ton histoire"}) et ajoute à sa droite, plus bas et plus petit, le « ${small.char} » (${OBJECT[small.id]}).`,
    `Les deux se prononcent d'un seul souffle, en une seule syllabe : « ${row.onset === "j" ? "ji" : row.base} » + « ${small.syllable} » donne « ${slug} ».`,
    "Le petit caractère n'est pas une syllabe en plus : il ne fait que « glisser » dans le son précédent.",
  ].join(" ");
  return {
    character: row.head + small.char, slug, family: "yoon", script: "katakana", romaji: slug,
    pronunciation: `Une seule syllabe, ${row.sounds[index]}`, mnemonic,
    illustration: baseId
      ? { id: baseId, caption: `Le « ${row.head} » avec, en médaillon, le petit « ${small.char} ».`, strokes: rawBase, marks: marked ? (row.base === "pi" ? 1 : 2) : undefined, companion: { id: small.id, strokes: smallStrokes } }
      : undefined,
    strokes, words: row.words[index],
    origin: { kind: "yoon", head: row.head, small: small.char, object: baseId, smallObject: small.id, from: row.onset === "j" ? "ji" : row.base, syllable: small.syllable },
  };
}

/* ---------------------- Signes propres au katakana ---------------------- */

const SPECIAL: Kana[] = [
  {
    character: "ッ", slug: "sokuon", family: "special", script: "katakana", romaji: "sokuon",
    pronunciation: "Il ne se prononce pas : c'est un tout petit silence qui double la consonne suivante. Dans カット (katto), on retient le souffle un instant entre « kat » et « to », comme dans « ac-teur ».",
    mnemonic: "C'est le ツ de la tulipe, mais tout petit et posé en bas de la ligne : une graine de tulipe. Une graine ne fait pas de bruit, elle fait juste une pause avant de pousser. Le petit ッ fait la même chose : une micro-pause qui double la consonne qui suit.",
    illustration: { id: "tulip", caption: "Le ツ de la tulipe, en tout petit : une graine." },
    strokes: S["sokuon"],
    words: [w("ベッド", "beddo", "le lit"), w("コップ", "koppu", "le verre"), w("サッカー", "sakkā", "le football"), w("ホッチキス", "hotchikisu", "l'agrafeuse")],
  },
  {
    character: "ー", slug: "chouon", family: "special", script: "katakana", romaji: "chōon",
    pronunciation: "Il allonge la voyelle précédente d'un temps : コーヒー se dit « kô-hî », avec un « o » et un « i » deux fois plus longs.",
    mnemonic: "Un élastique tendu entre deux piquets : le son s'étire, comme l'élastique. Ce long trait horizontal s'appelle le « chōonpu ». Dans un texte écrit à la verticale, il devient vertical (｜).",
    illustration: { id: "elastic", caption: "L'élastique tendu : la voyelle s'allonge." },
    strokes: S["chouon"],
    words: [w("コーヒー", "kōhī", "le café"), w("ケーキ", "kēki", "le gâteau"), w("ラーメン", "rāmen", "les nouilles en bouillon"), w("スーパー", "sūpā", "le supermarché"), w("カレー", "karē", "le curry")],
  },
];

/* ------------------------------ Assemblage ------------------------------ */

const cell = (c: { character: string; romaji: string; slug: string }): KanaCell => ({ character: c.character, romaji: c.romaji, slug: c.slug });

export const katakanaDakutenRows: KanaCell[][] = [0, 5, 10, 15, 20].map((s) => DAKUTEN.slice(s, s + 5).map(cell));
export const katakanaYoonRows: KanaCell[][] = YOON.map((row) =>
  [0, 1, 2].map((i) => cell({ character: row.head + SMALL[i].char, romaji: row.readings[i], slug: row.readings[i] })),
);
export const katakanaSpecialCells: KanaCell[] = [
  { character: "ッ", romaji: "sokuon", slug: "sokuon" },
  { character: "ー", romaji: "chōon", slug: "chouon" },
];
export const KATAKANA_DAKUTEN_TOTAL = DAKUTEN.length;
export const KATAKANA_YOON_TOTAL = YOON.length * 3;

export function buildKatakanaExtra(base: ReadonlyMap<string, Kana>): Map<string, Kana> {
  const result = new Map<string, Kana>();
  for (const spec of DAKUTEN) {
    const lesson = base.get(spec.base);
    if (lesson) result.set(spec.slug, buildDakuten(spec, lesson));
  }
  for (const row of YOON) {
    const baseLesson = base.get(row.base) ?? result.get(row.base);
    for (const i of [0, 1, 2]) {
      const lesson = buildYoon(row, i, baseLesson);
      if (lesson?.slug) result.set(lesson.slug, lesson);
    }
  }
  for (const k of SPECIAL) if (k.slug) result.set(k.slug, k);
  return result;
}

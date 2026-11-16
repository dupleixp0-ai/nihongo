import type { Kana, KanaCell, KanaWord, StoryIllustrationId } from "@/domain/kana";
import { transformPaths } from "@/lib/svg-path";
import { strokesDakuten } from "./strokes/hiragana-dakuten";

/**
 * Hiragana avec dakuten (゛) et handakuten (゜), puis combinaisons « yōon » (きゃ, しゅ, ちょ…).
 * Les leçons sont bâties à partir des leçons de base (illustration et histoire) : voir buildExtraLessons.
 */

const w = (japanese: string, romaji: string, meaning: string): KanaWord => ({ japanese, romaji, meaning });

/** Nom (avec article) de l'objet de l'histoire de chaque kana de base, pour les phrases de rappel. */
const OBJECT: Partial<Record<StoryIllustrationId, string>> = {
  anchor: "l'ancre", mice: "les deux souris", slide: "le toboggan", lightning: "l'éclair", ladle: "la louche",
  cactus: "le cactus fleuri", kimono: "le kimono", elbow: "le coude", dock: "le quai et sa canne à pêche", lips: "la bouche qui dit « co »",
  sabre: "le sabre", swan: "le cygne", trapeze: "le trapèze", saddle: "la selle", mountain: "la montagne et son sentier",
  teacup: "la tasse de thé", puppy: "le chiot à l'écharpe", tsunami: "la grande vague", phone: "le téléphone", tomato: "la tomate",
  narwhal: "le narval", nest: "le nid", cloud: "le nuage", lily: "le nénuphar", nautilus: "le nautile",
  hammock: "le hamac", owl: "le hibou", snowman: "le bonhomme de neige", hedgehog: "le hérisson", hotel: "l'hôtel",
  mast: "le mât du voilier", honey: "le miel", note: "la note de musique", jellyfish: "la méduse", sparrow: "le moineau",
  yogurt: "le pot de yaourt", yuzu: "le yuzu", yoyo: "le yoyo", grapes: "la grappe de raisins", curtains: "les rideaux",
  stream: "le ruisseau", fox: "le renard", tap: "le robinet", wheel: "la grande roue", orca: "l'orque", angel: "l'ange",
};

/* ------------------------------------------------------------------ */
/* Dakuten et handakuten                                               */
/* ------------------------------------------------------------------ */

type DakutenSpec = {
  character: string;
  /** Identifiant dans l'URL (et clé des tracés). */
  slug: string;
  /** Lecture affichée. */
  romaji: string;
  /** Slug du kana de base. */
  base: string;
  pronunciation: string;
  words: KanaWord[];
  note?: string;
};

const DAKUTEN: DakutenSpec[] = [
  // か → が
  { character: "が", slug: "ga", romaji: "ga", base: "ka", pronunciation: "Comme le « ga » de « gare » (un « g » dur, jamais comme dans « girafe »).",
    words: [w("がっこう", "gakkō", "l'école"), w("がくせい", "gakusei", "l'étudiant"), w("まんが", "manga", "la bande dessinée japonaise")] },
  { character: "ぎ", slug: "gi", romaji: "gi", base: "ki", pronunciation: "Comme le « gui » de « guitare ».",
    words: [w("ぎんこう", "ginkō", "la banque"), w("みぎ", "migi", "la droite"), w("ぎもん", "gimon", "la question, le doute")] },
  { character: "ぐ", slug: "gu", romaji: "gu", base: "ku", pronunciation: "Comme le « gou » de « goutte ».",
    words: [w("ぐあい", "guai", "l'état, la condition"), w("ぐらい", "gurai", "environ"), w("ぐうぜん", "gūzen", "par hasard")] },
  { character: "げ", slug: "ge", romaji: "ge", base: "ke", pronunciation: "Comme le « gué » de « guérir ».",
    words: [w("げんき", "genki", "en forme"), w("あげる", "ageru", "donner"), w("げた", "geta", "les sandales japonaises en bois")] },
  { character: "ご", slug: "go", romaji: "go", base: "ko", pronunciation: "Comme le « go » de « gobelet ».",
    words: [w("ごはん", "gohan", "le riz, le repas"), w("ごご", "gogo", "l'après-midi"), w("にほんご", "nihongo", "la langue japonaise"), w("ごみ", "gomi", "les déchets")] },
  // さ → ざ
  { character: "ざ", slug: "za", romaji: "za", base: "sa", pronunciation: "Comme le « za » de « zazou » (un « z » bourdonnant).",
    words: [w("ざっし", "zasshi", "le magazine"), w("ざる", "zaru", "la passoire en bambou"), w("ざんねん", "zannen", "dommage")] },
  { character: "じ", slug: "ji", romaji: "ji", base: "shi", pronunciation: "Comme le « dji » de « Djibouti ».",
    words: [w("じかん", "jikan", "le temps, l'heure"), w("じぶん", "jibun", "soi-même"), w("じてん", "jiten", "le dictionnaire")] },
  { character: "ず", slug: "zu", romaji: "zu", base: "su", pronunciation: "Comme le « zou » de « zoulou ».",
    words: [w("みず", "mizu", "l'eau"), w("ずっと", "zutto", "tout le temps"), w("かず", "kazu", "le nombre")] },
  { character: "ぜ", slug: "ze", romaji: "ze", base: "se", pronunciation: "Comme le « zé » de « zéro ».",
    words: [w("かぜ", "kaze", "le vent, le rhume"), w("ぜんぶ", "zenbu", "tout"), w("ぜひ", "zehi", "absolument")] },
  { character: "ぞ", slug: "zo", romaji: "zo", base: "so", pronunciation: "Comme le « zo » de « zone ».",
    words: [w("ぞう", "zō", "l'éléphant"), w("かぞく", "kazoku", "la famille"), w("ぞうり", "zōri", "les sandales de paille")] },
  // た → だ
  { character: "だ", slug: "da", romaji: "da", base: "ta", pronunciation: "Comme le « da » de « dame ».",
    words: [w("だいがく", "daigaku", "l'université"), w("だれ", "dare", "qui"), w("からだ", "karada", "le corps"), w("だめ", "dame", "pas bien, interdit")] },
  { character: "ぢ", slug: "dji", romaji: "ji", base: "chi", pronunciation: "Se dit exactement comme じ (« dji »). Il est rare : on le trouve surtout dans quelques mots composés.",
    note: "ぢ et じ ont le même son ; on écrit presque toujours じ.",
    words: [w("はなぢ", "hanaji", "le saignement de nez"), w("ちぢむ", "chijimu", "rétrécir")] },
  { character: "づ", slug: "dzu", romaji: "zu", base: "tsu", pronunciation: "Se dit exactement comme ず (« zou »). Il est rare : on le trouve dans quelques mots composés.",
    note: "づ et ず ont le même son ; on écrit presque toujours ず.",
    words: [w("つづく", "tsuzuku", "continuer"), w("みかづき", "mikazuki", "le croissant de lune"), w("おこづかい", "okozukai", "l'argent de poche")] },
  { character: "で", slug: "de", romaji: "de", base: "te", pronunciation: "Comme le « dé » de « dé à jouer ».",
    words: [w("でんわ", "denwa", "le téléphone"), w("でぐち", "deguchi", "la sortie"), w("できる", "dekiru", "pouvoir, savoir faire"), w("おでん", "oden", "le ragoût japonais d'hiver")] },
  { character: "ど", slug: "do", romaji: "do", base: "to", pronunciation: "Comme le « do » de « dos ».",
    words: [w("どこ", "doko", "où"), w("どうぞ", "dōzo", "je vous en prie"), w("どうぶつ", "dōbutsu", "l'animal"), w("どれ", "dore", "lequel")] },
  // は → ば
  { character: "ば", slug: "ba", romaji: "ba", base: "ha", pronunciation: "Comme le « ba » de « bas ».",
    words: [w("かばん", "kaban", "le sac"), w("ばら", "bara", "la rose"), w("ばん", "ban", "le soir")] },
  { character: "び", slug: "bi", romaji: "bi", base: "hi", pronunciation: "Comme le « bi » de « bidon ».",
    words: [w("くび", "kubi", "le cou"), w("たび", "tabi", "le voyage"), w("かびん", "kabin", "le vase"), w("びっくり", "bikkuri", "surpris")] },
  { character: "ぶ", slug: "bu", romaji: "bu", base: "fu", pronunciation: "Comme le « bou » de « boule ».",
    words: [w("ぶた", "buta", "le cochon"), w("ぶどう", "budō", "le raisin"), w("あぶない", "abunai", "dangereux")] },
  { character: "べ", slug: "be", romaji: "be", base: "he", pronunciation: "Comme le « bé » de « bébé ».",
    words: [w("たべる", "taberu", "manger"), w("べんとう", "bentō", "le repas en boîte"), w("べんり", "benri", "pratique")] },
  { character: "ぼ", slug: "bo", romaji: "bo", base: "ho", pronunciation: "Comme le « bo » de « bol ».",
    words: [w("ぼうし", "bōshi", "le chapeau"), w("ぼく", "boku", "moi (parler masculin)"), w("ぼたん", "botan", "le bouton")] },
  // は → ぱ (handakuten)
  { character: "ぱ", slug: "pa", romaji: "pa", base: "ha", pronunciation: "Comme le « pa » de « papa ».",
    words: [w("かんぱい", "kanpai", "santé ! (en trinquant)"), w("ぱっと", "patto", "d'un coup"), w("ぱくぱく", "pakupaku", "(onomatopée) manger à grandes bouchées")] },
  { character: "ぴ", slug: "pi", romaji: "pi", base: "hi", pronunciation: "Comme le « pi » de « pipe ».",
    words: [w("えんぴつ", "enpitsu", "le crayon"), w("ぴかぴか", "pikapika", "(onomatopée) brillant, étincelant"), w("ぴったり", "pittari", "exactement, juste à la mesure")] },
  { character: "ぷ", slug: "pu", romaji: "pu", base: "fu", pronunciation: "Comme le « pou » de « poule ».",
    words: [w("てんぷら", "tenpura", "les beignets japonais"), w("ぷかぷか", "pukapuka", "(onomatopée) flotter doucement")] },
  { character: "ぺ", slug: "pe", romaji: "pe", base: "he", pronunciation: "Comme le « pé » de « pétale ».",
    words: [w("ぺらぺら", "perapera", "(onomatopée) parler couramment"), w("ぺこぺこ", "pekopeko", "(onomatopée) avoir très faim")] },
  { character: "ぽ", slug: "po", romaji: "po", base: "ho", pronunciation: "Comme le « po » de « pomme ».",
    words: [w("さんぽ", "sanpo", "la promenade"), w("ぽかぽか", "pokapoka", "(onomatopée) agréablement chaud"), w("ぽつぽつ", "potsupotsu", "(onomatopée) goutte à goutte")] },
];

const HANDAKUTEN_SLUGS = new Set(["pa", "pi", "pu", "pe", "po"]);

function markSentence(spec: DakutenSpec, baseRomaji: string): string {
  if (HANDAKUTEN_SLUGS.has(spec.slug)) {
    return `Ajoute la petite bulle (le « maru », ゜) en haut à droite : elle fait éclater le son, « pop ! ». Le « ${baseRomaji} » devient « ${spec.romaji} ».`;
  }
  return `Ajoute les deux petites gouttes (le « tenten », ゛) en haut à droite : elles rendent le son plus rond, la gorge vibre. Le « ${baseRomaji} » devient « ${spec.romaji} ».`;
}

function buildDakuten(spec: DakutenSpec, base: Kana): Kana {
  const strokes = strokesDakuten[spec.slug];
  const handakuten = HANDAKUTEN_SLUGS.has(spec.slug);
  const marks = handakuten ? 1 : 2;
  const baseIllustration = base.illustration;
  const mnemonic = [
    `Reprends l'image de ton « ${base.character} » : ${(baseIllustration && OBJECT[baseIllustration.id]) || "ton dessin"}.`,
    markSentence(spec, base.romaji),
    spec.note,
  ].filter(Boolean).join(" ");
  return {
    character: spec.character,
    slug: spec.slug,
    family: handakuten ? "handakuten" : "dakuten",
    script: "hiragana",
    romaji: spec.romaji,
    pronunciation: spec.pronunciation,
    mnemonic,
    illustration: baseIllustration
      ? {
          id: baseIllustration.id,
          caption: `Le dessin du « ${base.character} », avec ${handakuten ? "la bulle" : "les deux gouttes"} en plus.`,
          strokes,
          marks,
        }
      : undefined,
    strokes,
    words: spec.words,
    origin: { kind: "dakuten", base: base.character, baseRomaji: base.romaji, object: baseIllustration?.id, handakuten },
  };
}

/* ------------------------------------------------------------------ */
/* Combinaisons (yōon)                                                 */
/* ------------------------------------------------------------------ */

type YoonRow = {
  /** Caractère de tête (き, し…). */
  head: string;
  /** Slug du kana de base : « ki », ou « gi » pour ぎ… */
  base: string;
  /** Début de la lecture (« ky », « sh »…). */
  onset: string;
  /** Cas particuliers de lecture dans l'URL/affichage pour ya, yu, yo. */
  readings: [string, string, string];
  /** Aide de prononciation pour ya, yu, yo. */
  sounds: [string, string, string];
  words: [KanaWord[], KanaWord[], KanaWord[]];
};

const SMALL = [
  { char: "ゃ", key: "small-ya", id: "yogurt" as StoryIllustrationId, syllable: "ya" },
  { char: "ゅ", key: "small-yu", id: "yuzu" as StoryIllustrationId, syllable: "yu" },
  { char: "ょ", key: "small-yo", id: "yoyo" as StoryIllustrationId, syllable: "yo" },
] as const;

const YOON: YoonRow[] = [
  { head: "き", base: "ki", onset: "ky", readings: ["kya", "kyu", "kyo"],
    sounds: ["« quia » : un « k » collé à « ia ».", "« quiou » : « k » + « iou ».", "« quio » : « k » + « io »."],
    words: [[w("きゃく", "kyaku", "le client, l'invité"), w("きゃべつ", "kyabetsu", "le chou")],
      [w("きゅう", "kyū", "neuf"), w("きゅうり", "kyūri", "le concombre"), w("きゅうけい", "kyūkei", "la pause")],
      [w("きょう", "kyō", "aujourd'hui"), w("きょねん", "kyonen", "l'année dernière"), w("きょうしつ", "kyōshitsu", "la salle de classe")]] },
  { head: "し", base: "shi", onset: "sh", readings: ["sha", "shu", "sho"],
    sounds: ["comme le « cha » de « chat ».", "comme le « chou » de « chou-fleur ».", "comme le « cho » de « chaud »."],
    words: [[w("しゃしん", "shashin", "la photo"), w("でんしゃ", "densha", "le train"), w("しゃちょう", "shachō", "le président de société")],
      [w("しゅみ", "shumi", "le loisir"), w("しゅくだい", "shukudai", "les devoirs"), w("しゅっぱつ", "shuppatsu", "le départ")],
      [w("しょくじ", "shokuji", "le repas"), w("しょうがつ", "shōgatsu", "le Nouvel An"), w("じしょ", "jisho", "le dictionnaire")]] },
  { head: "ち", base: "chi", onset: "ch", readings: ["cha", "chu", "cho"],
    sounds: ["comme le « tcha » de « tchat ».", "comme le « tchou » de « tchou-tchou ».", "comme le « tcho » de « tchô ! » (salut)."],
    words: [[w("おちゃ", "ocha", "le thé"), w("ちゃいろ", "chairo", "le marron"), w("ちゃわん", "chawan", "le bol à riz")],
      [w("ちゅうごく", "chūgoku", "la Chine"), w("ちゅうしゃ", "chūsha", "l'injection, le stationnement"), w("ちゅうい", "chūi", "l'attention")],
      [w("ちょっと", "chotto", "un peu"), w("ちょうど", "chōdo", "juste, pile"), w("ちょきん", "chokin", "l'épargne")]] },
  { head: "に", base: "ni", onset: "ny", readings: ["nya", "nyu", "nyo"],
    sounds: ["comme le « nia » de « niais ».", "comme le « niou » de « niouze ».", "comme le « nio » de « Niort » (sans le « r »)."],
    words: [[w("こんにゃく", "konnyaku", "le konjac (gelée de racine)"), w("にゃあにゃあ", "nyānyā", "(onomatopée) miaou")],
      [w("にゅうがく", "nyūgaku", "l'entrée à l'école"), w("にゅうもん", "nyūmon", "l'initiation"), w("ぎゅうにゅう", "gyūnyū", "le lait")],
      [w("にょろにょろ", "nyoronyoro", "(onomatopée) ramper en ondulant"), w("にょきにょき", "nyokinyoki", "(onomatopée) pousser à toute vitesse")]] },
  { head: "ひ", base: "hi", onset: "hy", readings: ["hya", "hyu", "hyo"],
    sounds: ["comme « hia » : un souffle puis « ia ».", "comme « hiou » : un souffle puis « iou ».", "comme « hio » : un souffle puis « io »."],
    words: [[w("ひゃく", "hyaku", "cent"), w("ひゃくえん", "hyakuen", "cent yens")],
      [w("ひゅうひゅう", "hyūhyū", "(onomatopée) le sifflement du vent")],
      [w("ひょうげん", "hyōgen", "l'expression"), w("ひょうばん", "hyōban", "la réputation"), w("ひょうじょう", "hyōjō", "l'expression du visage")]] },
  { head: "み", base: "mi", onset: "my", readings: ["mya", "myu", "myo"],
    sounds: ["comme le « mia » de « miam ».", "comme le « miou » de « miou ! » (le chat).", "comme le « mio » de « mioche »."],
    words: [[w("みゃく", "myaku", "le pouls"), w("みゃくらく", "myakuraku", "la cohérence, le fil logique")],
      [],
      [w("みょうじ", "myōji", "le nom de famille"), w("みょうにち", "myōnichi", "demain (formel)"), w("みょう", "myō", "étrange")]] },
  { head: "り", base: "ri", onset: "ry", readings: ["rya", "ryu", "ryo"],
    sounds: ["comme « ria » (le « r » japonais est léger).", "comme « riou ».", "comme le « rio » de « Rio »."],
    words: [[w("りゃく", "ryaku", "l'abréviation"), w("りゃくご", "ryakugo", "le sigle")],
      [w("りゅう", "ryū", "le dragon"), w("りゅうがく", "ryūgaku", "les études à l'étranger"), w("りゅうこう", "ryūkō", "la mode, la tendance")],
      [w("りょこう", "ryokō", "le voyage"), w("りょうり", "ryōri", "la cuisine"), w("りょかん", "ryokan", "l'auberge japonaise")]] },
  { head: "ぎ", base: "gi", onset: "gy", readings: ["gya", "gyu", "gyo"],
    sounds: ["comme « guia » (« g » dur + « ia »).", "comme « guiou ».", "comme « guio »."],
    words: [[w("ぎゃく", "gyaku", "l'inverse"), w("ぎゃっこう", "gyakkō", "le contre-jour")],
      [w("ぎゅうにゅう", "gyūnyū", "le lait"), w("ぎゅうにく", "gyūniku", "le bœuf"), w("ぎゅっと", "gyutto", "serrer fort")],
      [w("ぎょうざ", "gyōza", "les raviolis grillés"), w("ぎょうれつ", "gyōretsu", "la file d'attente"), w("ぎょうじ", "gyōji", "l'événement, la cérémonie")]] },
  { head: "じ", base: "ji", onset: "j", readings: ["ja", "ju", "jo"],
    sounds: ["comme le « dja » de « djembé ».", "comme le « djou » de « djoul ».", "comme le « djo » de « Djokovic »."],
    words: [[w("じゃあ", "jā", "alors, bon"), w("じゃがいも", "jagaimo", "la pomme de terre"), w("じゃま", "jama", "la gêne, l'obstacle")],
      [w("じゅう", "jū", "dix"), w("じゅぎょう", "jugyō", "le cours"), w("じゅんび", "junbi", "la préparation")],
      [w("じょうず", "jōzu", "habile"), w("じょせい", "josei", "la femme"), w("じょうほう", "jōhō", "l'information")]] },
  { head: "び", base: "bi", onset: "by", readings: ["bya", "byu", "byo"],
    sounds: ["comme « bia » (« b » + « ia »).", "comme « biou ».", "comme « bio »."],
    words: [[w("さんびゃく", "sanbyaku", "trois cents"), w("びゃっこ", "byakko", "le tigre blanc")],
      [w("びゅんびゅん", "byunbyun", "(onomatopée) siffler à toute vitesse")],
      [w("びょういん", "byōin", "l'hôpital"), w("びょうき", "byōki", "la maladie"), w("びょうどう", "byōdō", "l'égalité")]] },
  { head: "ぴ", base: "pi", onset: "py", readings: ["pya", "pyu", "pyo"],
    sounds: ["comme « pia » (« p » + « ia »).", "comme « piou » (le poussin).", "comme « pio »."],
    words: [[w("ろっぴゃく", "roppyaku", "six cents"), w("はっぴゃく", "happyaku", "huit cents")],
      [w("ぴゅうぴゅう", "pyūpyū", "(onomatopée) le sifflement du vent"), w("ぴゅっと", "pyutto", "d'un jet")],
      [w("ぴょんぴょん", "pyonpyon", "(onomatopée) sautiller"), w("ぴょこぴょこ", "pyokopyoko", "(onomatopée) sautiller en bougeant")]] },
];

const YOON_BASE_STROKES_FROM_DAKUTEN: Record<string, string> = { gi: "gi", ji: "ji", bi: "bi", pi: "pi" };

/** Mise en page d'un yōon : le grand kana à gauche, un peu réduit ; le petit ゃ ゅ ょ en bas à droite. */
const BIG = { scale: 0.68, dx: 1, dy: 8 };
const SMALL_POS = { scale: 0.44, dx: 61, dy: 52 };

function buildYoon(row: YoonRow, index: number, baseLesson: Kana | undefined): Kana | undefined {
  const small = SMALL[index];
  const slug = row.readings[index];
  const rawBase = YOON_BASE_STROKES_FROM_DAKUTEN[row.base]
    ? strokesDakuten[YOON_BASE_STROKES_FROM_DAKUTEN[row.base]]
    : baseLesson?.strokes;
  const smallStrokes = strokesDakuten[small.key];
  if (!rawBase || !smallStrokes) return undefined;

  // Pour ぎ じ び ぴ, les marques ゛ ゜ font partie des traits du grand kana : elles restent.
  const baseId = (baseLesson?.illustration?.id ?? undefined) as StoryIllustrationId | undefined;
  const marked = YOON_BASE_STROKES_FROM_DAKUTEN[row.base] !== undefined;
  const marks = marked ? (row.base === "pi" ? 1 : 2) : 0;

  const strokes = [
    ...transformPaths(rawBase, BIG.scale, BIG.dx, BIG.dy),
    ...transformPaths(smallStrokes, SMALL_POS.scale, SMALL_POS.dx, SMALL_POS.dy),
  ];
  const baseObject = (baseId && OBJECT[baseId]) || "ton histoire";
  const baseChar = row.head;
  const mnemonic = [
    `Prends ton « ${baseChar} » (${baseObject}) et ajoute à sa droite, plus bas et plus petit, le « ${small.char} » (${OBJECT[small.id] ?? ""}).`,
    `Les deux se prononcent d'un seul souffle, en une seule syllabe : « ${row.onset === "j" ? "ji" : row.base} » + « ${small.syllable} » donne « ${slug} ».`,
    "Le petit caractère n'est pas une syllabe en plus : il ne fait que « glisser » dans le son précédent.",
  ].join(" ");

  return {
    character: row.head + small.char,
    slug,
    family: "yoon",
    script: "hiragana",
    romaji: slug,
    pronunciation: `Une seule syllabe, ${row.sounds[index]}`,
    mnemonic,
    illustration: baseId
      ? {
          id: baseId,
          caption: `Le « ${baseChar} » avec, en médaillon, le petit « ${small.char} ».`,
          strokes: rawBase,
          marks: marks || undefined,
          companion: { id: small.id, strokes: smallStrokes },
        }
      : undefined,
    strokes,
    words: row.words[index],
    origin: { kind: "yoon", head: baseChar, small: small.char, object: baseId, smallObject: small.id, from: row.onset === "j" ? "ji" : row.base, syllable: small.syllable },
  };
}

/* ------------------------------------------------------------------ */
/* Assemblage                                                          */
/* ------------------------------------------------------------------ */

const cell = (spec: { character: string; romaji: string; slug: string }): KanaCell => ({
  character: spec.character,
  romaji: spec.romaji,
  slug: spec.slug,
});

/** Tableau des dakuten : 5 colonnes (a i u e o), dans l'ordre g, z, d, b, p. */
export const dakutenRows: KanaCell[][] = [0, 5, 10, 15, 20].map((start) => DAKUTEN.slice(start, start + 5).map(cell));

/** Tableau des combinaisons : 3 colonnes (ya yu yo). */
export const yoonRows: KanaCell[][] = YOON.map((row) =>
  [0, 1, 2].map((i) => cell({ character: row.head + SMALL[i].char, romaji: row.readings[i], slug: row.readings[i] })),
);

export const DAKUTEN_TOTAL = DAKUTEN.length;
export const YOON_TOTAL = YOON.length * 3;

/**
 * Construit les leçons des caractères à dakuten et des yōon, à partir des leçons de base déjà rédigées.
 * Les clés de la table renvoyée sont les identifiants d'URL.
 */
export function buildExtraLessons(base: ReadonlyMap<string, Kana>): Map<string, Kana> {
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
  return result;
}

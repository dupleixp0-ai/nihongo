export type StoryIllustrationId =
  | "anchor" | "mice" | "slide" | "lightning" | "ladle"
  | "cactus" | "kimono" | "elbow" | "dock" | "lips"
  | "sabre" | "swan" | "trapeze" | "saddle" | "mountain"
  | "teacup" | "puppy" | "tsunami" | "phone" | "tomato"
  | "narwhal" | "nest" | "cloud" | "lily" | "nautilus"
  | "hammock" | "owl" | "snowman" | "hedgehog" | "hotel"
  | "mast" | "honey" | "note" | "jellyfish" | "sparrow"
  | "yogurt" | "yuzu" | "yoyo" | "grapes" | "curtains"
  | "stream" | "fox" | "tap" | "wheel" | "orca"
  | "angel"
  | "tree" | "ibis" | "factory" | "shelf" | "parasol"
  | "duck" | "kiosk" | "spoon" | "kangaroo" | "chest"
  | "fir" | "chimp" | "hero" | "bucket" | "grasshopper"
  | "bull" | "champion" | "tulip" | "table" | "totem"
  | "swimmer" | "level" | "bowtie" | "snow" | "compass"
  | "barn" | "seahorse" | "whisk" | "hennin" | "hockey"
  | "hammer" | "millefeuille" | "gull" | "medal" | "windmill"
  | "yacht" | "yurt" | "yogi" | "ramp" | "rice"
  | "ribbon" | "oar" | "robot" | "wagon" | "origami"
  | "eel" | "elastic";

export type KanaWord = {
  /** Écriture japonaise du mot (ici en kana uniquement). */
  japanese: string;
  /** Transcription en lettres latines (rōmaji). */
  romaji: string;
  /** Sens en français. */
  meaning: string;
  /** Sens en anglais et en allemand. */
  meaningTr?: { en?: string; de?: string };
};

/** Description de l'illustration d'une leçon. */
export type KanaIllustration = {
  id: StoryIllustrationId;
  caption: string;
  /** Traits à utiliser pour le dessin, si ce ne sont pas ceux du caractère (dakuten, yōon). */
  strokes?: string[];
  /** Nombre de traits à la fin de `strokes` (ou du caractère) qui sont des marques ゛ ou ゜. */
  marks?: number;
  /** Petit dessin en médaillon (ex. le yaourt du petit ゃ dans きゃ). */
  companion?: { id: StoryIllustrationId; strokes: string[] };
};

/**
 * Leçon construite à partir d'une autre (dakuten, combinaison) : de quoi rédiger son texte dans
 * chaque langue, sans recopier toutes les phrases (voir src/i18n/kana).
 */
export type KanaOrigin =
  | { kind: "dakuten"; base: string; baseRomaji: string; object?: StoryIllustrationId; handakuten: boolean }
  | { kind: "yoon"; head: string; small: string; object?: StoryIllustrationId; smallObject: StoryIllustrationId; from: string; syllable: string }
  | { kind: "extended"; head: string; small: string };

export type Kana = {
  character: string;
  /** Identifiant dans l'URL, si différent de la transcription (ex. « dji » pour ぢ). */
  slug?: string;
  /** Famille du caractère : absent pour les 46 de base. */
  family?: "dakuten" | "handakuten" | "yoon" | "special" | "long";
  script: "hiragana" | "katakana";
  romaji: string;
  /** Conseil de prononciation pour un francophone. */
  pronunciation: string;
  /** Histoire mnémotechnique originale, en français. */
  mnemonic: string;
  /** Image d'illustration de l'histoire (fichier dans public/). Prioritaire sur `illustration`. */
  image?: { src: string; alt: string; caption?: string };
  /** Illustration schématique qui relie la forme du caractère à l'histoire. */
  illustration?: KanaIllustration;
  /** Chemins SVG (viewBox 0 0 109 109) des traits, dans l'ordre du tracé. */
  strokes?: string[];
  words: KanaWord[];
  /** Leçon construite à partir d'une autre (pour la traduction des textes). */
  origin?: KanaOrigin;
};

/** Une case du tableau des kana : un caractère et sa transcription, ou une case vide (null). */
export type KanaCell = { character: string; romaji: string; slug?: string } | null;

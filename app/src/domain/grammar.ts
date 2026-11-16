/** Rôle d'un groupe de mots dans une phrase, pour les schémas en couleur. */
export type Role = "theme" | "subject" | "time" | "place" | "object" | "partner" | "verb" | "modifier" | "other";

export type Segment = { jp: string; kana?: string; romaji: string; role: Role; fr: string };

export type Example = {
  /** Phrase japonaise (peut contenir des kanji). */
  jp: string;
  /** Lecture en kana, mots séparés par des espaces (obligatoire si `jp` contient des kanji). */
  kana?: string;
  romaji: string;
  fr: string;
  note?: string;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "example"; example: Example }
  | { type: "diagram"; caption: string; segments: Segment[]; fr: string }
  | { type: "tip"; text: string }
  | { type: "warning"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type GrammarPoint = {
  slug: string;
  title: string;
  /** Forme japonaise (particule, terminaison…). */
  jp: string;
  category: "fondations" | "particules" | "phrases" | "verbes" | "adjectifs" | "mots";
  summary: string;
  body: Block[];
};

/** Un morceau de phrase : mot, particule ou ponctuation. */
export type Token = {
  /** Texte tel qu'écrit. */
  t: string;
  /** Lecture en kana (seulement si le mot contient des kanji). */
  r?: string;
  /** Rōmaji du mot, pour l'analyse. */
  rm?: string;
  /** Sens en français (mots). */
  m?: string;
  /** Rôle grammatical (particules, formules). */
  g?: string;
  /** Remarque à retenir (lecture spéciale, faux ami…). */
  n?: string;
};

export type Sentence = {
  /** Personnage qui parle (dialogues). */
  speaker?: string;
  tokens: Token[];
  romaji: string;
  fr: string;
  en: string;
};

export type ReadingText = {
  slug: string;
  /** Titre japonais. */
  title: string;
  /** Lecture du titre en kana, quand il contient des kanji. */
  titleKana?: string;
  /** Titre en rōmaji (mots séparés). */
  titleRomaji: string;
  titleFr: string;
  kind: "conte" | "dialogue" | "recit";
  level: "N5" | "N4";
  /** Présentation courte, en français. */
  intro: string;
  sentences: Sentence[];
};

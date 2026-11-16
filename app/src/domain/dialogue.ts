/** Un mot à retenir : écriture, lecture en kana (le rōmaji s'en déduit) et sens en français. */
export type DialogueWord = { jp: string; kana: string; fr: string };

/** Une phrase japonaise : écriture usuelle, lecture en kana (mots séparés par un espace, particules par « _ ») et sens. */
export type DialogueLine = { jp: string; kana: string; fr: string; words?: DialogueWord[] };

/** Ce que dit l'autre personne. */
export type Say = DialogueLine & { kind: "say" };

/** Au tour de l'apprenant : une consigne et des réponses possibles, dont une seule convient. */
export type Reply = {
  kind: "reply";
  /** Ce qu'il faut dire (en français : la phrase à trouver ne figure jamais dans la consigne). */
  prompt: string;
  choices: (DialogueLine & { ok?: true; /** Pourquoi cette réponse ne convient pas. */ why?: string })[];
};

export type Dialogue = {
  slug: string;
  title: string;
  titleKana: string;
  titleFr: string;
  intro: string;
  /** Nom de l'interlocuteur. */
  partner: string;
  /** Le même nom en hiragana, tel qu'il apparaît dans les phrases (pour la majuscule du rōmaji). */
  partnerKana: string;
  level: "N5";
  turns: (Say | Reply)[];
};

/**
 * Données propres à l'utilisateur, gardées sur son appareil.
 * Le contenu (kana, kanji, verbes…) n'est pas ici : il fait partie du code de l'appli.
 *
 * Toute l'appli passe par l'interface `LocalDatabase`. Aujourd'hui elle est réalisée avec IndexedDB
 * (navigateur) ; dans l'appli native, une version SQLite pourra la remplacer sans toucher au reste.
 */

export type ItemStats = { correct: number; wrong: number; streak: number; last: number };
/** Leçons ouvertes (date) et réponses aux quiz, par identifiant de leçon (ex. « /hiragana/a »). */
/** Résultat d'un examen blanc (points par partie). */
export type ExamRecord = { date: number; level: "N5"; seconds: number; scores: { section: string; score: number; total: number }[] };

export type Progress = { seen: Record<string, number>; items: Record<string, ItemStats>; exams?: ExamRecord[] };

/** Carte de révision (état FSRS), les dates en millisecondes. */
export type StoredCard = {
  id: string;
  added: number;
  due: number;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  /** 0 nouvelle, 1 en apprentissage, 2 en révision, 3 en réapprentissage. */
  state: number;
  last_review: number | null;
};

/** Une réponse donnée pendant les révisions. */
export type ReviewEntry = { card: string; at: number; rating: 1 | 2 | 3 | 4; /** état de la carte avant la réponse */ state: number };

export type Settings = {
  /** Nombre de nouvelles cartes présentées par jour. */
  newPerDay: number;
  /** Ajouter une carte dès qu'une leçon est ouverte. */
  autoAdd: boolean;
  /** Révisions : taper la lecture au clavier (rōmaji converti en kana) avant de voir la réponse. */
  typeAnswers?: boolean;
  /** Présentation de départ terminée (absent pour les anciens utilisateurs ; false pour la revoir). */
  onboarded?: boolean;
  /** Niveau choisi au départ. */
  startLevel?: "debutant" | "hiragana" | "kana" | "n4";
  /** Quiz : taper la lecture au lieu de choisir parmi quatre réponses. */
  quizTyping?: boolean;
  /** Points à atteindre dans la journée pour entretenir la flamme. */
  dailyGoal: number;
  /** Rappel quotidien d'étudier. */
  reminder: { enabled: boolean; /** « HH:MM », heure locale */ time: string };
  /** Sauvegarde quotidienne sur iCloud (iPhone, iPad) ou Google Drive (Android), dans l'appli native. */
  cloudBackup: { enabled: boolean; /** dernier jour sauvegardé */ last?: string; /** service choisi */ provider?: CloudProviderId; /** compte connecté (Google) */ account?: string };
  /** Parcours guidé : étapes terminées ou passées à la main (les leçons restent toutes ouvertes). */
  plan?: { done: string[]; skipped: string[] };
  /** Couleur de la flamme (débloquée par les sceaux). */
  flameColor: string;
  /** Couleur de l'encre des grands caractères et du tracé (débloquée par les sceaux). */
  inkColor: string;
};

export type CloudProviderId = "icloud" | "gdrive";

export const DEFAULT_SETTINGS: Settings = { newPerDay: 15, autoAdd: true, typeAnswers: true, dailyGoal: 10, reminder: { enabled: false, time: "19:00" }, cloudBackup: { enabled: false }, flameColor: "aka", inkColor: "sumi" };

/** Activité d'une journée (clé « AAAA-MM-JJ », heure locale). */
export type DayActivity = { points: number; /** objectif atteint ce jour-là */ met: boolean };

/** La flamme d'apprentissage : activité par jour, jours rattrapés, record. */
export type StreakGoal = { /** jours d'affilée visés */ days: number; /** jour du choix */ chosenAt: string };

/** Un événement à annoncer une fois (omamori utilisé, but atteint). */
export type StreakNotice =
  | { kind: "protected"; days: string[]; at: string }
  | { kind: "goal"; days: number; reward: number; at: string };

export type StreakData = {
  days: Record<string, DayActivity>;
  /** Jours manqués rattrapés par un exercice. */
  repaired: string[];
  /** Jours manqués couverts par un omamori (ils gardent la flamme sans compter de jour). */
  protected: string[];
  /** Omamori en réserve. */
  omamori: number;
  /** But de série en cours (null : à choisir). */
  goal: StreakGoal | null;
  /** Buts atteints, du plus ancien au plus récent. */
  goalsDone: { days: number; at: string }[];
  notices: StreakNotice[];
  best: number;
  /** Dernier jour où un rappel a été montré. */
  lastReminder?: string;
  /** Dernier jour où le bonus du kanji du jour a été pris. */
  kotdBonus?: string;
  /** Lundi de la dernière semaine dont le bilan a été fermé. */
  summarySeen?: string;
};

export const EMPTY_STREAK: StreakData = { days: {}, repaired: [], protected: [], omamori: 0, goal: null, goalsDone: [], notices: [], best: 0 };
export const EMPTY_PROGRESS: Progress = { seen: {}, items: {} };

export type Snapshot = { progress: Progress; cards: StoredCard[]; reviews: ReviewEntry[]; settings: Settings; streak: StreakData };

/** Fichier de sauvegarde (export / import). */
export type Backup = Snapshot & { app: "nihongo"; version: 1; exportedAt: string };

export interface LocalDatabase {
  /** Nom lisible du stockage utilisé (affiché dans la page Révisions). */
  readonly kind: string;
  loadAll(): Promise<Snapshot>;
  saveProgress(progress: Progress): Promise<void>;
  saveSettings(settings: Settings): Promise<void>;
  saveStreak(streak: StreakData): Promise<void>;
  putCards(cards: StoredCard[]): Promise<void>;
  deleteCards(ids: string[]): Promise<void>;
  addReview(entry: ReviewEntry): Promise<void>;
  /** Remplace tout (import d'une sauvegarde, remise à zéro). */
  replaceAll(snapshot: Snapshot): Promise<void>;
}

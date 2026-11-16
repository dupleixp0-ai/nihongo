/**
 * Examen blanc N5 : textes de compréhension écrite, sur le modèle du JLPT
 * (un petit mot laissé à quelqu'un, un court récit).
 * Écrits de mémoire : à faire relire par un locuteur natif.
 */

export type ExamLine = { jp: string; kana: string; romaji: string };

export type ExamPassage = {
  id: string;
  title: string;
  lines: ExamLine[];
  fr: string;
  questions: { id: string; question: string; choices: string[]; answer: number }[];
};

export const EXAM_PASSAGES: ExamPassage[] = [
  {
    id: "memo-fete",
    title: "Un mot de Mari pour Ken",
    lines: [
      { jp: "ケンさんへ", kana: "ケンさんへ", romaji: "Ken-san e" },
      { jp: "あした、わたしの うちで パーティーを します。", kana: "あした、わたしの うちで パーティーを します。", romaji: "Ashita, watashi no uchi de pātī o shimasu." },
      { jp: "六時から です。", kana: "ろくじから です。", romaji: "Rokuji kara desu." },
      { jp: "飲み物は わたしが 買います。", kana: "のみものは わたしが かいます。", romaji: "Nomimono wa watashi ga kaimasu." },
      { jp: "ケンさんは ケーキを 持って きて ください。", kana: "ケンさんは ケーキを もって きて ください。", romaji: "Ken-san wa kēki o motte kite kudasai." },
      { jp: "マリ", kana: "マリ", romaji: "Mari" },
    ],
    fr: "Pour Ken. Demain, je fais une fête chez moi. C'est à partir de six heures. J'achète les boissons. Toi, Ken, apporte un gâteau, s'il te plaît. Mari",
    questions: [
      { id: "memo-fete-1", question: "Qu'est-ce que Ken doit apporter ?", choices: ["Un gâteau", "Des boissons", "Des fruits", "Rien du tout"], answer: 0 },
      { id: "memo-fete-2", question: "À quelle heure commence la fête ?", choices: ["À quatre heures", "À six heures", "À sept heures", "À neuf heures"], answer: 1 },
    ],
  },
  {
    id: "matin",
    title: "Le matin de M. Tanaka",
    lines: [
      { jp: "わたしは 毎朝 七時に 起きます。", kana: "わたしは まいあさ しちじに おきます。", romaji: "Watashi wa maiasa shichiji ni okimasu." },
      { jp: "朝ごはんを 食べてから、駅まで 歩きます。", kana: "あさごはんを たべてから、えきまで あるきます。", romaji: "Asagohan o tabete kara, eki made arukimasu." },
      { jp: "電車で 会社へ 行きます。", kana: "でんしゃで かいしゃへ いきます。", romaji: "Densha de kaisha e ikimasu." },
      { jp: "でも、きのうは 雨でしたから、タクシーで 行きました。", kana: "でも、きのうは あめでしたから、タクシーで いきました。", romaji: "Demo, kinō wa ame deshita kara, takushī de ikimashita." },
    ],
    fr: "Je me lève tous les matins à sept heures. Après le petit-déjeuner, je marche jusqu'à la gare. Je vais au bureau en train. Mais hier, comme il pleuvait, j'y suis allé en taxi.",
    questions: [
      { id: "matin-1", question: "D'habitude, comment va-t-il au bureau ?", choices: ["En taxi", "En bus", "À pied jusqu'à la gare, puis en train", "À pied, tout le trajet"], answer: 2 },
      { id: "matin-2", question: "Pourquoi a-t-il pris un taxi hier ?", choices: ["Il était en retard", "Il pleuvait", "Il était malade", "Le train ne roulait pas"], answer: 1 },
    ],
  },
];

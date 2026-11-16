import type { Kana, KanaCell } from "@/domain/kana";
import { strokesKatakana } from "./strokes/katakana";
import { buildKatakanaExtra } from "./katakana-extra";
import { buildKatakanaExtended, extendedRows, KATAKANA_EXTENDED_TOTAL } from "./katakana-extended";

export {
  katakanaDakutenRows, katakanaYoonRows, katakanaSpecialCells, KATAKANA_DAKUTEN_TOTAL, KATAKANA_YOON_TOTAL,
} from "./katakana-extra";

const c = (character: string, romaji: string): KanaCell => ({ character, romaji });
const _ = null;

/** Les 46 katakana de base, dans l'ordre du tableau classique (gojūon), 5 colonnes : a i u e o. */
export const katakanaRows: KanaCell[][] = [
  [c("ア", "a"), c("イ", "i"), c("ウ", "u"), c("エ", "e"), c("オ", "o")],
  [c("カ", "ka"), c("キ", "ki"), c("ク", "ku"), c("ケ", "ke"), c("コ", "ko")],
  [c("サ", "sa"), c("シ", "shi"), c("ス", "su"), c("セ", "se"), c("ソ", "so")],
  [c("タ", "ta"), c("チ", "chi"), c("ツ", "tsu"), c("テ", "te"), c("ト", "to")],
  [c("ナ", "na"), c("ニ", "ni"), c("ヌ", "nu"), c("ネ", "ne"), c("ノ", "no")],
  [c("ハ", "ha"), c("ヒ", "hi"), c("フ", "fu"), c("ヘ", "he"), c("ホ", "ho")],
  [c("マ", "ma"), c("ミ", "mi"), c("ム", "mu"), c("メ", "me"), c("モ", "mo")],
  [c("ヤ", "ya"), _, c("ユ", "yu"), _, c("ヨ", "yo")],
  [c("ラ", "ra"), c("リ", "ri"), c("ル", "ru"), c("レ", "re"), c("ロ", "ro")],
  [c("ワ", "wa"), _, _, _, c("ヲ", "wo")],
  [c("ン", "n"), _, _, _, _],
];

const katakana: Kana[] = [
  {
    character: "ア",
    script: "katakana",
    romaji: "a",
    pronunciation: "Comme le « a » de « papa ».",
    mnemonic:
      "Un arbre. Le trait du haut est sa couronne de feuilles, le trait qui descend en courbe est son tronc. « Arbre » commence par « a ».",
    illustration: { id: "tree", caption: "La couronne et le tronc de l'arbre." },
    strokes: strokesKatakana["a"],
    words: [
    { japanese: "アイス", romaji: "aisu", meaning: "la glace" },
    { japanese: "アメリカ", romaji: "Amerika", meaning: "l'Amérique" },
    { japanese: "アニメ", romaji: "anime", meaning: "le dessin animé" },
    { japanese: "アルバイト", romaji: "arubaito", meaning: "le petit boulot d'étudiant" },
    ],
  },
  {
    character: "イ",
    script: "katakana",
    romaji: "i",
    pronunciation: "Comme le « i » de « midi ».",
    mnemonic:
      "Un ibis rose, debout sur une seule patte. Le grand trait penché est son corps et son cou, le trait vertical est sa patte. « Ibis » commence par « i ».",
    illustration: { id: "ibis", caption: "Le corps penché et la patte de l'ibis." },
    strokes: strokesKatakana["i"],
    words: [
    { japanese: "インク", romaji: "inku", meaning: "l'encre" },
    { japanese: "イタリア", romaji: "Itaria", meaning: "l'Italie" },
    { japanese: "イヤホン", romaji: "iyahon", meaning: "les écouteurs" },
    { japanese: "イベント", romaji: "ibento", meaning: "l'événement" },
    ],
  },
  {
    character: "ウ",
    script: "katakana",
    romaji: "u",
    pronunciation: "Comme le « ou » de « loup », mais les lèvres à peine arrondies.",
    mnemonic:
      "Une usine. Le petit trait du haut est sa cheminée, le petit trait à gauche est un mur, et le grand trait qui part à droite puis plonge est le toit et la façade. « Usine » commence par « u ».",
    illustration: { id: "factory", caption: "La cheminée, le mur et le toit de l'usine." },
    strokes: strokesKatakana["u"],
    words: [
    { japanese: "ウイルス", romaji: "uirusu", meaning: "le virus" },
    { japanese: "ウクレレ", romaji: "ukurere", meaning: "l'ukulélé" },
    { japanese: "ウール", romaji: "ūru", meaning: "la laine" },
    { japanese: "ウイスキー", romaji: "uisukī", meaning: "le whisky" },
    ],
  },
  {
    character: "エ",
    script: "katakana",
    romaji: "e",
    pronunciation: "Comme le « é » de « été ».",
    mnemonic:
      "Une étagère. Les deux traits horizontaux sont les planches, le trait vertical est le montant qui les relie. « Étagère » commence par « é ».",
    illustration: { id: "shelf", caption: "Les planches et le montant de l'étagère." },
    strokes: strokesKatakana["e"],
    words: [
    { japanese: "エアコン", romaji: "eakon", meaning: "la climatisation" },
    { japanese: "エレベーター", romaji: "erebētā", meaning: "l'ascenseur" },
    { japanese: "エンジン", romaji: "enjin", meaning: "le moteur" },
    { japanese: "エプロン", romaji: "epuron", meaning: "le tablier" },
    ],
  },
  {
    character: "オ",
    script: "katakana",
    romaji: "o",
    pronunciation: "Comme le « o » de « photo ».",
    mnemonic:
      "Une ombrelle ouverte. Le trait horizontal est le bord de la toile, le long trait vertical qui finit en crochet est le manche, et le trait en diagonale est une baleine. « Ombrelle » commence par « o ».",
    illustration: { id: "parasol", caption: "Le bord, le manche à crochet et la baleine de l'ombrelle." },
    strokes: strokesKatakana["o"],
    words: [
    { japanese: "オレンジ", romaji: "orenji", meaning: "l'orange" },
    { japanese: "オムレツ", romaji: "omuretsu", meaning: "l'omelette" },
    { japanese: "オフィス", romaji: "ofisu", meaning: "le bureau" },
    { japanese: "オーストラリア", romaji: "Ōsutoraria", meaning: "l'Australie" },
    ],
  },
  {
    character: "カ",
    script: "katakana",
    romaji: "ka",
    pronunciation: "Comme le « ca » de « cacao ».",
    mnemonic:
      "Un canard jaune. Le long trait est son cou et son dos, le trait courbé est son aile. « Canard » commence par « ca ».",
    illustration: { id: "duck", caption: "Le cou et l'aile du canard." },
    strokes: strokesKatakana["ka"],
    words: [
    { japanese: "カメラ", romaji: "kamera", meaning: "l'appareil photo" },
    { japanese: "カレー", romaji: "karē", meaning: "le curry" },
    { japanese: "カード", romaji: "kādo", meaning: "la carte" },
    { japanese: "カフェ", romaji: "kafe", meaning: "le café (lieu)" },
    ],
  },
  {
    character: "キ",
    script: "katakana",
    romaji: "ki",
    pronunciation: "Comme le « qui » de « qui est là ? ».",
    mnemonic:
      "Un kiosque. Le trait du haut est le toit rayé, le trait du milieu est le comptoir, et le long trait vertical est le mât qui porte le fanion. « Kiosque » commence par « ki ».",
    illustration: { id: "kiosk", caption: "Le toit, le comptoir et le mât du kiosque." },
    strokes: strokesKatakana["ki"],
    words: [
    { japanese: "キロ", romaji: "kiro", meaning: "le kilo" },
    { japanese: "キス", romaji: "kisu", meaning: "le baiser" },
    { japanese: "キッチン", romaji: "kitchin", meaning: "la cuisine" },
    { japanese: "キーボード", romaji: "kībōdo", meaning: "le clavier" },
    ],
  },
  {
    character: "ク",
    script: "katakana",
    romaji: "ku",
    pronunciation: "Comme le « cou » de « coucou ».",
    mnemonic:
      "Une cuillère. Le petit trait est le reflet sur la cuiller, le grand trait qui plonge en courbe est le manche. « Cuillère » commence par « cu » (comme « coucou »).",
    illustration: { id: "spoon", caption: "Le reflet et le manche de la cuillère." },
    strokes: strokesKatakana["ku"],
    words: [
    { japanese: "クラス", romaji: "kurasu", meaning: "la classe" },
    { japanese: "クッキー", romaji: "kukkī", meaning: "le biscuit" },
    { japanese: "クラブ", romaji: "kurabu", meaning: "le club" },
    { japanese: "クリスマス", romaji: "Kurisumasu", meaning: "Noël" },
    ],
  },
  {
    character: "ケ",
    script: "katakana",
    romaji: "ke",
    pronunciation: "Comme le « qué » de « quéquette » (sans le « e » final).",
    mnemonic:
      "Un kangourou qui bondit. Le petit trait à gauche est son bras, le trait horizontal est sa grande queue et le trait qui descend est sa puissante patte arrière. « Kangourou » commence par « ka », avec un « ke » en bondissant.",
    illustration: { id: "kangaroo", caption: "Le bras, la queue et la patte du kangourou." },
    strokes: strokesKatakana["ke"],
    words: [
    { japanese: "ケーキ", romaji: "kēki", meaning: "le gâteau" },
    { japanese: "ケチャップ", romaji: "kechappu", meaning: "le ketchup" },
    { japanese: "ケース", romaji: "kēsu", meaning: "l'étui" },
    { japanese: "ケーブル", romaji: "kēburu", meaning: "le câble" },
    ],
  },
  {
    character: "コ",
    script: "katakana",
    romaji: "ko",
    pronunciation: "Comme le « co » de « coco ».",
    mnemonic:
      "Un coffre au trésor ouvert sur la gauche. Le premier trait dessine le couvercle et le côté droit, le second est le fond du coffre. « Coffre » commence par « co ».",
    illustration: { id: "chest", caption: "Le couvercle et le fond du coffre." },
    strokes: strokesKatakana["ko"],
    words: [
    { japanese: "コーヒー", romaji: "kōhī", meaning: "le café" },
    { japanese: "コート", romaji: "kōto", meaning: "le manteau" },
    { japanese: "コップ", romaji: "koppu", meaning: "le verre" },
    { japanese: "コンピューター", romaji: "konpyūtā", meaning: "l'ordinateur" },
    ],
  },
  {
    character: "サ",
    script: "katakana",
    romaji: "sa",
    pronunciation: "Comme le « sa » de « salade ».",
    mnemonic:
      "Un sapin de Noël. Le long trait vertical est le tronc, le trait horizontal est une guirlande, et le petit trait vertical est une bougie. « Sapin » commence par « sa ».",
    illustration: { id: "fir", caption: "Le tronc, la guirlande et la bougie du sapin." },
    strokes: strokesKatakana["sa"],
    words: [
    { japanese: "サラダ", romaji: "sarada", meaning: "la salade" },
    { japanese: "サッカー", romaji: "sakkā", meaning: "le football" },
    { japanese: "サイズ", romaji: "saizu", meaning: "la taille" },
    { japanese: "サンドイッチ", romaji: "sandoitchi", meaning: "le sandwich" },
    ],
  },
  {
    character: "シ",
    script: "katakana",
    romaji: "shi",
    pronunciation: "Comme le « chi » de « chic », en soufflant un peu.",
    mnemonic:
      "Un chimpanzé qui rigole. Les deux petits traits sont ses yeux, le grand trait est son énorme sourire. « Chimpanzé » commence presque par « shi ».",
    illustration: { id: "chimp", caption: "Les yeux et le grand sourire du chimpanzé." },
    strokes: strokesKatakana["shi"],
    words: [
    { japanese: "シーツ", romaji: "shītsu", meaning: "les draps" },
    { japanese: "シール", romaji: "shīru", meaning: "l'autocollant" },
    { japanese: "シナモン", romaji: "shinamon", meaning: "la cannelle" },
    { japanese: "システム", romaji: "shisutemu", meaning: "le système" },
    ],
  },
  {
    character: "ス",
    script: "katakana",
    romaji: "su",
    pronunciation: "Comme le « sou » de « souris ».",
    mnemonic:
      "Un super-héros en plein vol. Le grand trait est sa cape rouge qui flotte, le petit trait est sa jambe tendue. « Super-héros » commence par « su ».",
    illustration: { id: "hero", caption: "La cape et la jambe du super-héros." },
    strokes: strokesKatakana["su"],
    words: [
    { japanese: "スキー", romaji: "sukī", meaning: "le ski" },
    { japanese: "スポーツ", romaji: "supōtsu", meaning: "le sport" },
    { japanese: "スープ", romaji: "sūpu", meaning: "la soupe" },
    { japanese: "スマホ", romaji: "sumaho", meaning: "le smartphone" },
    ],
  },
  {
    character: "セ",
    script: "katakana",
    romaji: "se",
    pronunciation: "Comme le « sé » de « sérum ».",
    mnemonic:
      "Un seau à la plage. Le trait du haut est le bord du seau, le trait vertical qui descend puis part à droite est l'anse qui se lève. Pour retenir le « sé », répète « sé-sé-seau » en le remplissant.",
    illustration: { id: "bucket", caption: "Le bord et l'anse du seau." },
    strokes: strokesKatakana["se"],
    words: [
    { japanese: "セーター", romaji: "sētā", meaning: "le pull" },
    { japanese: "センチ", romaji: "senchi", meaning: "le centimètre" },
    { japanese: "セット", romaji: "setto", meaning: "l'ensemble, le set" },
    { japanese: "セロリ", romaji: "serori", meaning: "le céleri" },
    ],
  },
  {
    character: "ソ",
    script: "katakana",
    romaji: "so",
    pronunciation: "Comme le « so » de « sonore ».",
    mnemonic:
      "Une sauterelle. Le petit trait en haut à gauche est son antenne, le long trait qui descend en courbe est sa grande patte arrière prête à sauter. « Sauterelle » commence par « so » (comme « saut »).",
    illustration: { id: "grasshopper", caption: "L'antenne et la patte arrière de la sauterelle." },
    strokes: strokesKatakana["so"],
    words: [
    { japanese: "ソファー", romaji: "sofā", meaning: "le canapé" },
    { japanese: "ソース", romaji: "sōsu", meaning: "la sauce" },
    { japanese: "ソフト", romaji: "sofuto", meaning: "le logiciel, mou" },
    { japanese: "ソーセージ", romaji: "sōsēji", meaning: "la saucisse" },
    ],
  },
  {
    character: "タ",
    script: "katakana",
    romaji: "ta",
    pronunciation: "Comme le « ta » de « tapis ».",
    mnemonic:
      "Un taureau vu de profil. Le premier trait est sa corne, le grand trait est son dos qui descend vers l'arrière-train, le petit trait est son oreille. « Taureau » commence par « ta ».",
    illustration: { id: "bull", caption: "La corne, le dos et l'oreille du taureau." },
    strokes: strokesKatakana["ta"],
    words: [
    { japanese: "タクシー", romaji: "takushī", meaning: "le taxi" },
    { japanese: "タオル", romaji: "taoru", meaning: "la serviette" },
    { japanese: "タイ", romaji: "Tai", meaning: "la Thaïlande" },
    { japanese: "タバコ", romaji: "tabako", meaning: "le tabac" },
    ],
  },
  {
    character: "チ",
    script: "katakana",
    romaji: "chi",
    pronunciation: "Comme le « tchi » de « tchin-tchin ».",
    mnemonic:
      "Un champion sur son podium. Le trait horizontal est ses bras grands ouverts, le trait vertical est son corps, et le petit trait du haut est le fanion qu'il agite. « Champion » commence presque par « chi ».",
    illustration: { id: "champion", caption: "Les bras, le corps et le fanion du champion." },
    strokes: strokesKatakana["chi"],
    words: [
    { japanese: "チーズ", romaji: "chīzu", meaning: "le fromage" },
    { japanese: "チキン", romaji: "chikin", meaning: "le poulet" },
    { japanese: "チーム", romaji: "chīmu", meaning: "l'équipe" },
    { japanese: "チップ", romaji: "chippu", meaning: "le pourboire, la puce" },
    ],
  },
  {
    character: "ツ",
    script: "katakana",
    romaji: "tsu",
    pronunciation: "Comme le « tsou » de « tsé-tsé ».",
    mnemonic:
      "Une tulipe. Le grand trait courbe est sa tige, et les deux petits traits à gauche sont deux boutons encore fermés. « Tulipe » : on entend « tsu » dans « tu-lipe ».",
    illustration: { id: "tulip", caption: "La tige de la tulipe et ses deux boutons." },
    strokes: strokesKatakana["tsu"],
    words: [
    { japanese: "ツアー", romaji: "tsuā", meaning: "le voyage organisé" },
    { japanese: "ツナ", romaji: "tsuna", meaning: "le thon" },
    { japanese: "ツリー", romaji: "tsurī", meaning: "l'arbre, le sapin" },
    { japanese: "ツイン", romaji: "tsuin", meaning: "la chambre à deux lits" },
    ],
  },
  {
    character: "テ",
    script: "katakana",
    romaji: "te",
    pronunciation: "Comme le « té » de « thé ».",
    mnemonic:
      "Une table ronde. Le trait du haut est la lampe suspendue, le long trait horizontal est le plateau, le trait courbe est le pied. « Table » : on entend « té » dans « table ».",
    illustration: { id: "table", caption: "La lampe, le plateau et le pied de la table." },
    strokes: strokesKatakana["te"],
    words: [
    { japanese: "テレビ", romaji: "terebi", meaning: "la télévision" },
    { japanese: "テスト", romaji: "tesuto", meaning: "l'examen" },
    { japanese: "テーブル", romaji: "tēburu", meaning: "la table" },
    { japanese: "テニス", romaji: "tenisu", meaning: "le tennis" },
    ],
  },
  {
    character: "ト",
    script: "katakana",
    romaji: "to",
    pronunciation: "Comme le « to » de « tomate ».",
    mnemonic:
      "Un totem. Le long trait vertical est le poteau sculpté, le petit trait en diagonale est l'aile déployée de l'oiseau tout en haut. « Totem » commence par « to ».",
    illustration: { id: "totem", caption: "Le poteau et l'aile du totem." },
    strokes: strokesKatakana["to"],
    words: [
    { japanese: "トマト", romaji: "tomato", meaning: "la tomate" },
    { japanese: "トイレ", romaji: "toire", meaning: "les toilettes" },
    { japanese: "トラック", romaji: "torakku", meaning: "le camion" },
    { japanese: "トースト", romaji: "tōsuto", meaning: "le toast" },
    ],
  },
  {
    character: "ナ",
    script: "katakana",
    romaji: "na",
    pronunciation: "Comme le « na » de « nature ».",
    mnemonic:
      "Un nageur dans une piscine. Le trait horizontal est la ligne d'eau, le trait vertical est son corps qui s'étire. « Nageur » commence par « na ».",
    illustration: { id: "swimmer", caption: "La ligne d'eau et le corps du nageur." },
    strokes: strokesKatakana["na"],
    words: [
    { japanese: "ナイフ", romaji: "naifu", meaning: "le couteau" },
    { japanese: "ナース", romaji: "nāsu", meaning: "l'infirmière" },
    { japanese: "バナナ", romaji: "banana", meaning: "la banane" },
    { japanese: "ナイロン", romaji: "nairon", meaning: "le nylon" },
    ],
  },
  {
    character: "ニ",
    script: "katakana",
    romaji: "ni",
    pronunciation: "Comme le « ni » de « nid ».",
    mnemonic:
      "Un niveau à bulle. Les deux traits horizontaux sont la règle du haut et le niveau du bas avec sa petite bulle verte. « Niveau » commence par « ni ».",
    illustration: { id: "level", caption: "La règle et le niveau à bulle." },
    strokes: strokesKatakana["ni"],
    words: [
    { japanese: "ニット", romaji: "nitto", meaning: "le tricot" },
    { japanese: "ニンジン", romaji: "ninjin", meaning: "la carotte" },
    { japanese: "ニコチン", romaji: "nikochin", meaning: "la nicotine" },
    { japanese: "アニメ", romaji: "anime", meaning: "le dessin animé" },
    ],
  },
  {
    character: "ヌ",
    script: "katakana",
    romaji: "nu",
    pronunciation: "Comme le « nou » de « nougat ».",
    mnemonic:
      "Un cadeau noué d'un gros nœud. Le grand trait courbe est la boucle du ruban, le petit trait est sa queue qui la croise. « Nœud » : on entend « nu » dans « nœud ».",
    illustration: { id: "bowtie", caption: "La boucle et la queue du nœud." },
    strokes: strokesKatakana["nu"],
    words: [
    { japanese: "ヌードル", romaji: "nūdoru", meaning: "les nouilles" },
    { japanese: "ヌガー", romaji: "nugā", meaning: "le nougat" },
    { japanese: "カヌー", romaji: "kanū", meaning: "le canoë" },
    ],
  },
  {
    character: "ネ",
    script: "katakana",
    romaji: "ne",
    pronunciation: "Comme le « né » de « nénuphar ».",
    mnemonic:
      "Un pin sous la neige. Le long trait vertical est le tronc, les deux traits en diagonale sont les branches chargées de neige, et le petit trait du haut est la cime. « Neige » commence par « né ».",
    illustration: { id: "snow", caption: "Le tronc, les branches et la cime du pin enneigé." },
    strokes: strokesKatakana["ne"],
    words: [
    { japanese: "ネクタイ", romaji: "nekutai", meaning: "la cravate" },
    { japanese: "ネット", romaji: "netto", meaning: "internet, le filet" },
    { japanese: "ネコ", romaji: "neko", meaning: "le chat" },
    { japanese: "ネックレス", romaji: "nekkuresu", meaning: "le collier" },
    ],
  },
  {
    character: "ノ",
    script: "katakana",
    romaji: "no",
    pronunciation: "Comme le « no » de « nord ».",
    mnemonic:
      "Une boussole. Le trait unique est l'aiguille rouge qui indique le nord. « Nord » commence par « no ».",
    illustration: { id: "compass", caption: "L'aiguille de la boussole." },
    strokes: strokesKatakana["no"],
    words: [
    { japanese: "ノート", romaji: "nōto", meaning: "le cahier" },
    { japanese: "ノック", romaji: "nokku", meaning: "le coup à la porte" },
    { japanese: "ノルウェー", romaji: "Noruwē", meaning: "la Norvège" },
    ],
  },
  {
    character: "ハ",
    script: "katakana",
    romaji: "ha",
    pronunciation: "Comme le « ha » de « hamac » (un « h » à peine soufflé).",
    mnemonic:
      "Un hangar au toit pentu. Les deux traits sont les deux pans du toit, comme un grand « A » ouvert. « Hangar » commence par « ha ».",
    illustration: { id: "barn", caption: "Les deux pans du toit du hangar." },
    strokes: strokesKatakana["ha"],
    words: [
    { japanese: "ハム", romaji: "hamu", meaning: "le jambon" },
    { japanese: "ハート", romaji: "hāto", meaning: "le cœur" },
    { japanese: "ハワイ", romaji: "Hawai", meaning: "Hawaï" },
    { japanese: "ハンバーガー", romaji: "hanbāgā", meaning: "le hamburger" },
    ],
  },
  {
    character: "ヒ",
    script: "katakana",
    romaji: "hi",
    pronunciation: "Comme le « hi » de « hi-hi-hi ».",
    mnemonic:
      "Un hippocampe. Le grand trait vertical qui finit en crochet est son corps et sa queue enroulée, et le petit trait du haut est une algue. « Hippocampe » commence par « hi ».",
    illustration: { id: "seahorse", caption: "Le corps de l'hippocampe et son algue." },
    strokes: strokesKatakana["hi"],
    words: [
    { japanese: "ヒーロー", romaji: "hīrō", meaning: "le héros" },
    { japanese: "ヒント", romaji: "hinto", meaning: "l'indice" },
    { japanese: "ヒール", romaji: "hīru", meaning: "le talon haut" },
    ],
  },
  {
    character: "フ",
    script: "katakana",
    romaji: "fu",
    pronunciation: "Entre « fou » et « hou » : on souffle entre les lèvres, puis « ou ».",
    mnemonic:
      "Un fouet de cuisine. Le trait unique est la grande boucle de fil métallique, au bout du manche. « Fouet » commence par « fou ».",
    illustration: { id: "whisk", caption: "La boucle de fil du fouet." },
    strokes: strokesKatakana["fu"],
    words: [
    { japanese: "フランス", romaji: "Furansu", meaning: "la France" },
    { japanese: "フルート", romaji: "furūto", meaning: "la flûte" },
    { japanese: "フライ", romaji: "furai", meaning: "la friture" },
    { japanese: "フロント", romaji: "furonto", meaning: "la réception" },
    ],
  },
  {
    character: "ヘ",
    script: "katakana",
    romaji: "he",
    pronunciation: "Comme « hé » : un souffle puis « é ».",
    mnemonic:
      "Une princesse coiffée d'un hennin, ce grand chapeau pointu d'autrefois. Le trait unique est la pointe du chapeau et son voile qui flotte vers la droite. « Hennin » commence par « hé ».",
    illustration: { id: "hennin", caption: "Le chapeau pointu et son voile." },
    strokes: strokesKatakana["he"],
    words: [
    { japanese: "ヘリコプター", romaji: "herikoputā", meaning: "l'hélicoptère" },
    { japanese: "ヘルメット", romaji: "herumetto", meaning: "le casque" },
    { japanese: "ヘア", romaji: "hea", meaning: "les cheveux" },
    ],
  },
  {
    character: "ホ",
    script: "katakana",
    romaji: "ho",
    pronunciation: "Comme le « ho » de « hocher la tête ».",
    mnemonic:
      "Du hockey sur glace. Le trait horizontal est la barre du but, le long trait vertical est la crosse, et les deux petits traits sont les traces des patins. « Hockey » commence par « ho ».",
    illustration: { id: "hockey", caption: "Le but, la crosse et les traces de patins." },
    strokes: strokesKatakana["ho"],
    words: [
    { japanese: "ホテル", romaji: "hoteru", meaning: "l'hôtel" },
    { japanese: "ホーム", romaji: "hōmu", meaning: "le quai, la maison" },
    { japanese: "ホース", romaji: "hōsu", meaning: "le tuyau" },
    { japanese: "ホットドッグ", romaji: "hottodoggu", meaning: "le hot-dog" },
    ],
  },
  {
    character: "マ",
    script: "katakana",
    romaji: "ma",
    pronunciation: "Comme le « ma » de « maman ».",
    mnemonic:
      "Un marteau. Le trait du haut est la tête de métal, le petit trait qui descend en biais est le manche en bois. « Marteau » commence par « ma ».",
    illustration: { id: "hammer", caption: "La tête et le manche du marteau." },
    strokes: strokesKatakana["ma"],
    words: [
    { japanese: "マスク", romaji: "masuku", meaning: "le masque" },
    { japanese: "マラソン", romaji: "marason", meaning: "le marathon" },
    { japanese: "マンガ", romaji: "manga", meaning: "la bande dessinée" },
    { japanese: "マイク", romaji: "maiku", meaning: "le micro" },
    ],
  },
  {
    character: "ミ",
    script: "katakana",
    romaji: "mi",
    pronunciation: "Comme le « mi » de « mie de pain ».",
    mnemonic:
      "Un mille-feuille. Les trois traits sont les trois couches : le glaçage, la crème et la pâte feuilletée. « Mille-feuille » commence par « mi ».",
    illustration: { id: "millefeuille", caption: "Les trois couches du mille-feuille." },
    strokes: strokesKatakana["mi"],
    words: [
    { japanese: "ミルク", romaji: "miruku", meaning: "le lait" },
    { japanese: "ミス", romaji: "misu", meaning: "l'erreur" },
    { japanese: "ミニ", romaji: "mini", meaning: "mini" },
    { japanese: "ミキサー", romaji: "mikisā", meaning: "le mixeur" },
    ],
  },
  {
    character: "ム",
    script: "katakana",
    romaji: "mu",
    pronunciation: "Comme le « mou » de « moutarde ».",
    mnemonic:
      "Une mouette sur son rocher. Le grand trait triangulaire est son aile, le petit trait est sa patte orange. « Mouette » : on entend « mou » dans « mouette ».",
    illustration: { id: "gull", caption: "L'aile et la patte de la mouette." },
    strokes: strokesKatakana["mu"],
    words: [
    { japanese: "ムード", romaji: "mūdo", meaning: "l'ambiance" },
    { japanese: "ムース", romaji: "mūsu", meaning: "la mousse" },
    { japanese: "アルバム", romaji: "arubamu", meaning: "l'album" },
    { japanese: "チーム", romaji: "chīmu", meaning: "l'équipe" },
    ],
  },
  {
    character: "メ",
    script: "katakana",
    romaji: "me",
    pronunciation: "Comme le « mé » de « méduse ».",
    mnemonic:
      "Une médaille d'or. Les deux traits qui se croisent sont les rubans en X au-dessus du disque doré. « Médaille » commence par « mé ».",
    illustration: { id: "medal", caption: "Les deux rubans croisés de la médaille." },
    strokes: strokesKatakana["me"],
    words: [
    { japanese: "メール", romaji: "mēru", meaning: "le courriel" },
    { japanese: "メモ", romaji: "memo", meaning: "la note" },
    { japanese: "メロン", romaji: "meron", meaning: "le melon" },
    { japanese: "メートル", romaji: "mētoru", meaning: "le mètre" },
    ],
  },
  {
    character: "モ",
    script: "katakana",
    romaji: "mo",
    pronunciation: "Comme le « mo » de « moto ».",
    mnemonic:
      "Un moulin à vent. Les deux traits horizontaux sont ses ailes de bois, et le long trait vertical qui finit en courbe est la tour. « Moulin » commence par « mou », on garde « mo ».",
    illustration: { id: "windmill", caption: "Les ailes et la tour du moulin." },
    strokes: strokesKatakana["mo"],
    words: [
    { japanese: "モカ", romaji: "moka", meaning: "le moka" },
    { japanese: "モール", romaji: "mōru", meaning: "le centre commercial" },
    { japanese: "モーター", romaji: "mōtā", meaning: "le moteur" },
    { japanese: "モスクワ", romaji: "Mosukuwa", meaning: "Moscou" },
    ],
  },
  {
    character: "ヤ",
    script: "katakana",
    romaji: "ya",
    pronunciation: "Comme le « ya » de « yaourt ».",
    mnemonic:
      "Un yacht. Le trait horizontal est la bôme qui porte la voile, le long trait presque vertical est le mât. « Yacht » commence par « ya ».",
    illustration: { id: "yacht", caption: "La bôme et le mât du yacht." },
    strokes: strokesKatakana["ya"],
    words: [
    { japanese: "ヤシ", romaji: "yashi", meaning: "le palmier" },
    { japanese: "ヤード", romaji: "yādo", meaning: "le yard" },
    { japanese: "ヤンキー", romaji: "yankī", meaning: "le yankee" },
    ],
  },
  {
    character: "ユ",
    script: "katakana",
    romaji: "yu",
    pronunciation: "Comme le « you » de « youpi ».",
    mnemonic:
      "Une yourte de la steppe. Le trait du haut est la corde qui entoure la tente, le trait du bas est le sol sur lequel elle repose. « Yourte » commence par « you ».",
    illustration: { id: "yurt", caption: "La corde et le sol de la yourte." },
    strokes: strokesKatakana["yu"],
    words: [
    { japanese: "ユーモア", romaji: "yūmoa", meaning: "l'humour" },
    { japanese: "ユーロ", romaji: "yūro", meaning: "l'euro" },
    { japanese: "ユニーク", romaji: "yunīku", meaning: "unique" },
    ],
  },
  {
    character: "ヨ",
    script: "katakana",
    romaji: "yo",
    pronunciation: "Comme le « yo » de « yoyo ».",
    mnemonic:
      "Un yogi qui médite. Le trait de droite est son dos bien droit, les trois traits horizontaux sont sa tête, ses bras et ses jambes croisées. « Yogi » commence par « yo ».",
    illustration: { id: "yogi", caption: "Le dos, les bras et les jambes du yogi." },
    strokes: strokesKatakana["yo"],
    words: [
    { japanese: "ヨット", romaji: "yotto", meaning: "le voilier de plaisance" },
    { japanese: "ヨーロッパ", romaji: "Yōroppa", meaning: "l'Europe" },
    { japanese: "ヨーヨー", romaji: "yōyō", meaning: "le yoyo" },
    ],
  },
  {
    character: "ラ",
    script: "katakana",
    romaji: "ra",
    pronunciation: "Comme le « ra » de « raisin » (le « r » japonais est léger, entre « r » et « l »).",
    mnemonic:
      "Un skateur qui saute au-dessus d'une rampe. Le petit trait du haut est sa planche en l'air, le grand trait est la rampe qui monte en courbe. « Rampe » commence par « ra ».",
    illustration: { id: "ramp", caption: "La planche et la rampe du skateur." },
    strokes: strokesKatakana["ra"],
    words: [
    { japanese: "ラーメン", romaji: "rāmen", meaning: "les nouilles ramen" },
    { japanese: "ラケット", romaji: "raketto", meaning: "la raquette" },
    { japanese: "ライス", romaji: "raisu", meaning: "le riz" },
    { japanese: "ランプ", romaji: "ranpu", meaning: "la lampe" },
    ],
  },
  {
    character: "リ",
    script: "katakana",
    romaji: "ri",
    pronunciation: "Comme le « ri » de « riz ».",
    mnemonic:
      "Un bol de riz et ses baguettes. Les deux traits verticaux sont les baguettes plantées dans le bol, la plus longue au bord. « Riz » commence par « ri ».",
    illustration: { id: "rice", caption: "Les deux baguettes plantées dans le riz." },
    strokes: strokesKatakana["ri"],
    words: [
    { japanese: "リスト", romaji: "risuto", meaning: "la liste" },
    { japanese: "リットル", romaji: "rittoru", meaning: "le litre" },
    { japanese: "リフト", romaji: "rifuto", meaning: "le remonte-pente" },
    { japanese: "リサイクル", romaji: "risaikuru", meaning: "le recyclage" },
    ],
  },
  {
    character: "ル",
    script: "katakana",
    romaji: "ru",
    pronunciation: "Comme le « rou » de « route ».",
    mnemonic:
      "Du ruban cadeau qui s'enroule. Le trait de gauche est un brin qui frise, le trait de droite est un long brin qui part en balayant. « Ruban » commence par « ru ».",
    illustration: { id: "ribbon", caption: "Les deux brins de ruban." },
    strokes: strokesKatakana["ru"],
    words: [
    { japanese: "ルール", romaji: "rūru", meaning: "la règle" },
    { japanese: "ルーム", romaji: "rūmu", meaning: "la salle, la chambre" },
    { japanese: "ルート", romaji: "rūto", meaning: "l'itinéraire" },
    ],
  },
  {
    character: "レ",
    script: "katakana",
    romaji: "re",
    pronunciation: "Comme le « ré » de « récré ».",
    mnemonic:
      "Une rame de canoë. Le trait unique descend en ligne droite comme le manche de la rame, puis remonte en diagonale comme l'eau qu'elle repousse. Pour retenir le « ré », répète « ré-ré-rame » en pagayant.",
    illustration: { id: "oar", caption: "La rame qui plonge dans l'eau." },
    strokes: strokesKatakana["re"],
    words: [
    { japanese: "レモン", romaji: "remon", meaning: "le citron" },
    { japanese: "レストラン", romaji: "resutoran", meaning: "le restaurant" },
    { japanese: "レタス", romaji: "retasu", meaning: "la laitue" },
    { japanese: "レシート", romaji: "reshīto", meaning: "le reçu" },
    ],
  },
  {
    character: "ロ",
    script: "katakana",
    romaji: "ro",
    pronunciation: "Comme le « ro » de « robot ».",
    mnemonic:
      "Un robot. Les trois traits dessinent sa tête carrée : le côté gauche, le dessus qui descend à droite, et le dessous. « Robot » commence par « ro ».",
    illustration: { id: "robot", caption: "La tête carrée du robot." },
    strokes: strokesKatakana["ro"],
    words: [
    { japanese: "ロボット", romaji: "robotto", meaning: "le robot" },
    { japanese: "ロケット", romaji: "roketto", meaning: "la fusée" },
    { japanese: "ロック", romaji: "rokku", meaning: "le rock" },
    { japanese: "ロシア", romaji: "Roshia", meaning: "la Russie" },
    ],
  },
  {
    character: "ワ",
    script: "katakana",
    romaji: "wa",
    pronunciation: "Comme le « oua » de « ouate ».",
    mnemonic:
      "Un wagon de train rouge. Le petit trait est l'attelage, le grand trait qui part à droite puis plonge dessine le toit et la paroi. « Wagon » commence par « oua ».",
    illustration: { id: "wagon", caption: "L'attelage et la paroi du wagon." },
    strokes: strokesKatakana["wa"],
    words: [
    { japanese: "ワイン", romaji: "wain", meaning: "le vin" },
    { japanese: "ワンピース", romaji: "wanpīsu", meaning: "la robe" },
    { japanese: "ワット", romaji: "watto", meaning: "le watt" },
    ],
  },
  {
    character: "ヲ",
    script: "katakana",
    romaji: "wo",
    pronunciation: "Se prononce « o » (comme le « o » de « photo »). Il ne sert presque jamais en katakana.",
    mnemonic:
      "Un origami : des plis horizontaux et une longue diagonale qui forme le cou plié d'un oiseau en papier. On prononce « o » comme dans « origami ». Ce katakana est très rare.",
    illustration: { id: "origami", caption: "Les plis et le cou de l'oiseau en papier." },
    strokes: strokesKatakana["wo"],
    words: [
    { japanese: "ヲタク", romaji: "wotaku", meaning: "le fan passionné (variante rare d'オタク)" },
    ],
  },
  {
    character: "ン",
    script: "katakana",
    romaji: "n",
    pronunciation: "Un « n » nasal, comme dans « pain » ou « an ».",
    mnemonic:
      "Une anguille. Le petit trait en haut à gauche est un hameçon, le long trait est le corps de l'anguille qui serpente vers la droite. « Anguille » commence par « an » : on entend le « n » nasal.",
    illustration: { id: "eel", caption: "L'hameçon et le corps de l'anguille." },
    strokes: strokesKatakana["n"],
    words: [
    { japanese: "ワイン", romaji: "wain", meaning: "le vin" },
    { japanese: "ライン", romaji: "rain", meaning: "la ligne" },
    { japanese: "レモン", romaji: "remon", meaning: "le citron" },
    { japanese: "ライオン", romaji: "raion", meaning: "le lion" },
    ],
  },
];

const lessons = new Map<string, Kana>(katakana.map((kana) => [kana.romaji, kana]));
for (const [slug, lesson] of buildKatakanaExtra(lessons)) lessons.set(slug, lesson);
for (const [slug, lesson] of buildKatakanaExtended(lessons)) lessons.set(slug, lesson);

export const katakanaExtendedRows = extendedRows(lessons);
export { KATAKANA_EXTENDED_TOTAL };

export function getKatakanaLesson(romaji: string): Kana | undefined {
  return lessons.get(romaji);
}

export function katakanaLessonSlugs(): string[] {
  return [...lessons.keys()];
}

export const KATAKANA_TOTAL = katakanaRows.flat().filter(Boolean).length;

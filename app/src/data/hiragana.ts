import type { Kana, KanaCell } from "@/domain/kana";
import { buildExtraLessons } from "./hiragana-extra";
import { buildHiraganaSigns } from "./hiragana-signs";
import { strokesHiraganaA } from "./strokes/hiragana-a";
import { strokesHiraganaI } from "./strokes/hiragana-i";
import { strokesHiraganaU } from "./strokes/hiragana-u";
import { strokesHiraganaE } from "./strokes/hiragana-e";
import { strokesHiraganaO } from "./strokes/hiragana-o";
import { strokesHiraganaKa } from "./strokes/hiragana-ka";
import { strokesHiraganaKi } from "./strokes/hiragana-ki";
import { strokesHiraganaKu } from "./strokes/hiragana-ku";
import { strokesHiraganaKe } from "./strokes/hiragana-ke";
import { strokesHiraganaKo } from "./strokes/hiragana-ko";
import { strokesHiraganaSa } from "./strokes/hiragana-sa";
import { strokesHiraganaShi } from "./strokes/hiragana-shi";
import { strokesHiraganaSu } from "./strokes/hiragana-su";
import { strokesHiraganaSe } from "./strokes/hiragana-se";
import { strokesHiraganaSo } from "./strokes/hiragana-so";
import { strokesHiraganaTa } from "./strokes/hiragana-ta";
import { strokesHiraganaChi } from "./strokes/hiragana-chi";
import { strokesHiraganaTsu } from "./strokes/hiragana-tsu";
import { strokesHiraganaTe } from "./strokes/hiragana-te";
import { strokesHiraganaTo } from "./strokes/hiragana-to";
import { strokesHiraganaNa } from "./strokes/hiragana-na";
import { strokesHiraganaNi } from "./strokes/hiragana-ni";
import { strokesHiraganaNu } from "./strokes/hiragana-nu";
import { strokesHiraganaNe } from "./strokes/hiragana-ne";
import { strokesHiraganaNo } from "./strokes/hiragana-no";
import { strokesHiraganaHa } from "./strokes/hiragana-ha";
import { strokesHiraganaHi } from "./strokes/hiragana-hi";
import { strokesHiraganaFu } from "./strokes/hiragana-fu";
import { strokesHiraganaHe } from "./strokes/hiragana-he";
import { strokesHiraganaHo } from "./strokes/hiragana-ho";
import { strokesHiraganaMa } from "./strokes/hiragana-ma";
import { strokesHiraganaMi } from "./strokes/hiragana-mi";
import { strokesHiraganaMu } from "./strokes/hiragana-mu";
import { strokesHiraganaMe } from "./strokes/hiragana-me";
import { strokesHiraganaMo } from "./strokes/hiragana-mo";
import { strokesHiraganaYa } from "./strokes/hiragana-ya";
import { strokesHiraganaYu } from "./strokes/hiragana-yu";
import { strokesHiraganaYo } from "./strokes/hiragana-yo";
import { strokesHiraganaRa } from "./strokes/hiragana-ra";
import { strokesHiraganaRi } from "./strokes/hiragana-ri";
import { strokesHiraganaRu } from "./strokes/hiragana-ru";
import { strokesHiraganaRe } from "./strokes/hiragana-re";
import { strokesHiraganaRo } from "./strokes/hiragana-ro";
import { strokesHiraganaWa } from "./strokes/hiragana-wa";
import { strokesHiraganaWo } from "./strokes/hiragana-wo";
import { strokesHiraganaN } from "./strokes/hiragana-n";

export const hiraganaA: Kana = {
  character: "あ",
  script: "hiragana",
  romaji: "a",
  pronunciation:
    "Comme le « a » de « papa » : la bouche bien ouverte, sans le fermer en « o ».",
  mnemonic:
    "Imagine une ancre de bateau. Le trait horizontal en haut est la barre de l'ancre, le trait vertical qui la traverse est sa tige, et la grande boucle en bas est le crochet qui s'accroche au fond de l'eau. « Ancre » commence par « a » : c'est ton a.",
  illustration: {
    id: "anchor",
    caption: "La barre, la tige et le crochet de l'ancre.",
  },
  strokes: strokesHiraganaA,
  words: [
    { japanese: "あい", romaji: "ai", meaning: "l'amour" },
    { japanese: "あさ", romaji: "asa", meaning: "le matin" },
    { japanese: "あめ", romaji: "ame", meaning: "la pluie" },
    { japanese: "あお", romaji: "ao", meaning: "le bleu" },
  ],
};

export const hiraganaI: Kana = {
  character: "い",
  script: "hiragana",
  romaji: "i",
  pronunciation: "Comme le « i » de « ici » : bref et net, sans le traîner.",
  mnemonic:
    "Deux petites souris côte à côte : une grande à gauche, avec sa longue queue qui remonte en bas, et une petite à droite. Elles couinent toutes les deux « i, i, i ! ».",
  illustration: { id: "mice", caption: "Une grande et une petite souris." },
  strokes: strokesHiraganaI,
  words: [
    { japanese: "いえ", romaji: "ie", meaning: "la maison" },
    { japanese: "いい", romaji: "ii", meaning: "bon, bien" },
    { japanese: "いぬ", romaji: "inu", meaning: "le chien" },
    { japanese: "いし", romaji: "ishi", meaning: "la pierre" },
  ],
};

export const hiraganaU: Kana = {
  character: "う",
  script: "hiragana",
  romaji: "u",
  pronunciation:
    "Proche du « ou » de « loup », mais avec les lèvres moins arrondies et poussées en avant.",
  mnemonic:
    "Un toboggan ! Le petit trait en haut est la tête de l'enfant qui s'apprête à se lancer, et la grande courbe en dessous est le toboggan qui descend et remonte. En glissant, il crie « ouuuh ! ».",
  illustration: { id: "slide", caption: "Le toboggan, l'échelle et l'enfant." },
  strokes: strokesHiraganaU,
  words: [
    { japanese: "うえ", romaji: "ue", meaning: "le dessus, en haut" },
    { japanese: "うみ", romaji: "umi", meaning: "la mer" },
    { japanese: "うた", romaji: "uta", meaning: "la chanson" },
    { japanese: "あう", romaji: "au", meaning: "rencontrer" },
  ],
};

export const hiraganaE: Kana = {
  character: "え",
  script: "hiragana",
  romaji: "e",
  pronunciation: "Comme le « é » de « été » : pas le « è » de « mère ».",
  mnemonic:
    "Un éclair qui jaillit d'un nuage. Le petit trait du haut est le nuage, et le grand trait en zigzag est l'éclair qui tombe d'un coup vers le sol. « Éclair » commence par « é ».",
  illustration: { id: "lightning", caption: "Le nuage et l'éclair en zigzag." },
  strokes: strokesHiraganaE,
  words: [
    { japanese: "えき", romaji: "eki", meaning: "la gare" },
    { japanese: "えび", romaji: "ebi", meaning: "la crevette" },
    { japanese: "えほん", romaji: "ehon", meaning: "le livre d'images" },
    { japanese: "ええ", romaji: "ee", meaning: "oui (familier)" },
  ],
};

export const hiraganaO: Kana = {
  character: "お",
  script: "hiragana",
  romaji: "o",
  pronunciation: "Comme le « o » de « mot » : court et bien fermé, sans le prolonger en « ou ».",
  mnemonic:
    "Une louche dans une marmite de soupe. Le trait horizontal est le bord de la marmite, le long trait vertical est le manche de la louche, la boucle en bas est la louche qui puise dans la soupe, et le petit point en haut à droite est une olive qui tombe dedans. « Olive » commence par « o ».",
  illustration: { id: "ladle", caption: "La marmite, la louche et l'olive qui tombe." },
  strokes: strokesHiraganaO,
  words: [
    { japanese: "おと", romaji: "oto", meaning: "le son, le bruit" },
    { japanese: "おか", romaji: "oka", meaning: "la colline" },
    { japanese: "おに", romaji: "oni", meaning: "l'ogre, le démon" },
    { japanese: "おや", romaji: "oya", meaning: "les parents" },
  ],
};

export const hiraganaKa: Kana = {
  character: "か",
  script: "hiragana",
  romaji: "ka",
  pronunciation: "Comme le « ca » de « cacao » : un « k » sec, sans souffle.",
  mnemonic:
    "Un cactus fleuri. Le long trait penché est le tronc, le trait horizontal qui le croise puis se recourbe vers le bas est un bras du cactus, et le petit point en haut à droite est la fleur qui vient d'éclore. « Cactus » commence par « ca ».",
  illustration: { id: "cactus", caption: "Le tronc, le bras et la fleur du cactus." },
  strokes: strokesHiraganaKa,
  words: [
    { japanese: "かお", romaji: "kao", meaning: "le visage" },
    { japanese: "かさ", romaji: "kasa", meaning: "le parapluie" },
    { japanese: "かぜ", romaji: "kaze", meaning: "le vent" },
    { japanese: "あか", romaji: "aka", meaning: "le rouge" },
  ],
};

export const hiraganaKi: Kana = {
  character: "き",
  script: "hiragana",
  romaji: "ki",
  pronunciation: "Comme le « qui » de « qui est là ? » : bref et net.",
  mnemonic:
    "Un kimono. Les deux traits horizontaux sont les larges manches ouvertes, le trait penché est le tissu qui tombe au milieu, et la courbe en bas est la ceinture nouée (l'obi). « Kimono » commence par « ki ».",
  illustration: { id: "kimono", caption: "Les manches, le pan du kimono et l'obi." },
  strokes: strokesHiraganaKi,
  words: [
    { japanese: "き", romaji: "ki", meaning: "l'arbre" },
    { japanese: "きた", romaji: "kita", meaning: "le nord" },
    { japanese: "あき", romaji: "aki", meaning: "l'automne" },
    { japanese: "きく", romaji: "kiku", meaning: "écouter, entendre" },
  ],
};

export const hiraganaKu: Kana = {
  character: "く",
  script: "hiragana",
  romaji: "ku",
  pronunciation:
    "Proche du « cou » de « cou-cou », mais avec les lèvres moins arrondies, comme pour « う ».",
  mnemonic:
    "Un coude plié. Le bras part du haut à droite, se plie en pointe vers la gauche, puis repart vers le bas à droite : c'est exactement un coude. « Coude » se dit presque « ku ».",
  illustration: { id: "elbow", caption: "Le trait devient un bras plié au coude." },
  strokes: strokesHiraganaKu,
  words: [
    { japanese: "くち", romaji: "kuchi", meaning: "la bouche" },
    { japanese: "くるま", romaji: "kuruma", meaning: "la voiture" },
    { japanese: "くつ", romaji: "kutsu", meaning: "les chaussures" },
    { japanese: "いく", romaji: "iku", meaning: "aller" },
  ],
};

export const hiraganaKe: Kana = {
  character: "け",
  script: "hiragana",
  romaji: "ke",
  pronunciation: "Comme le « quai » de « le quai de la gare » : un « é » bien net après le « k ».",
  mnemonic:
    "Un quai de port. Le petit trait vertical à gauche est le piquet où l'on attache les bateaux, le trait horizontal est la jetée, et la longue ligne qui descend en se recourbant est une canne à pêche dont l'hameçon plonge dans l'eau. « Quai » se prononce « ké ».",
  illustration: { id: "dock", caption: "Le piquet, la jetée et la canne à pêche." },
  strokes: strokesHiraganaKe,
  words: [
    { japanese: "けさ", romaji: "kesa", meaning: "ce matin" },
    { japanese: "けむり", romaji: "kemuri", meaning: "la fumée" },
    { japanese: "いけ", romaji: "ike", meaning: "l'étang" },
    { japanese: "けんか", romaji: "kenka", meaning: "la dispute" },
  ],
};

export const hiraganaKo: Kana = {
  character: "こ",
  script: "hiragana",
  romaji: "ko",
  pronunciation: "Comme le « co » de « coco » : court et bien fermé.",
  mnemonic:
    "Une bouche qui dit « co ». Le trait court du haut est la lèvre supérieure, le long trait courbe du bas est la lèvre inférieure : les deux lèvres s'arrondissent juste assez pour prononcer « co ».",
  illustration: { id: "lips", caption: "Les deux lèvres autour d'une bouche qui dit « co »." },
  strokes: strokesHiraganaKo,
  words: [
    { japanese: "こえ", romaji: "koe", meaning: "la voix" },
    { japanese: "ここ", romaji: "koko", meaning: "ici" },
    { japanese: "こども", romaji: "kodomo", meaning: "l'enfant" },
    { japanese: "こおり", romaji: "koori", meaning: "la glace" },
  ],
};

export const hiraganaSa: Kana = {
  character: "さ",
  script: "hiragana",
  romaji: "sa",
  pronunciation: "Comme le « sa » de « salade » : un « s » sourd, comme dans « sac ».",
  mnemonic:
    "Un sabre de pirate. En haut, la poignée ; le trait horizontal est la garde qui croise la lame ; la lame courbe descend vers la droite et se recourbe à la pointe. Le trait du bas est une vague. « Sabre » commence par « sa ».",
  illustration: { id: "sabre", caption: "Poignée, garde, lame courbe et vague." },
  strokes: strokesHiraganaSa,
  words: [
    { japanese: "さかな", romaji: "sakana", meaning: "le poisson" },
    { japanese: "さくら", romaji: "sakura", meaning: "le cerisier en fleurs" },
    { japanese: "さむい", romaji: "samui", meaning: "froid" },
    { japanese: "さけ", romaji: "sake", meaning: "le saké, l'alcool" },
  ],
};

export const hiraganaShi: Kana = {
  character: "し",
  script: "hiragana",
  romaji: "shi",
  pronunciation:
    "Comme le « chi » de « chic », avec un son doux : ce n'est ni « si » comme dans « sirop » ni « tchi ».",
  mnemonic:
    "Un cygne très chic. Le long cou descend depuis la tête, puis le corps glisse vers la droite sur l'eau. « Chic » ressemble à « shi ».",
  illustration: { id: "swan", caption: "Le trait devient le cou et le corps d'un cygne." },
  strokes: strokesHiraganaShi,
  words: [
    { japanese: "しお", romaji: "shio", meaning: "le sel" },
    { japanese: "しろ", romaji: "shiro", meaning: "le blanc" },
    { japanese: "しま", romaji: "shima", meaning: "l'île" },
    { japanese: "しごと", romaji: "shigoto", meaning: "le travail" },
  ],
};

export const hiraganaSu: Kana = {
  character: "す",
  script: "hiragana",
  romaji: "su",
  pronunciation:
    "Comme le « sou » de « sous », mais les lèvres peu arrondies. Le « u » est souvent à peine prononcé.",
  mnemonic:
    "Un trapéziste suspendu. Le trait horizontal est la barre du trapèze, le long trait vertical est le corps qui pend, et la petite boucle plus bas montre ses genoux repliés. « Suspendu » commence par « su ».",
  illustration: { id: "trapeze", caption: "Une barre, un corps suspendu et des genoux repliés." },
  strokes: strokesHiraganaSu,
  words: [
    { japanese: "すし", romaji: "sushi", meaning: "le sushi" },
    { japanese: "すき", romaji: "suki", meaning: "aimer, apprécié" },
    { japanese: "すな", romaji: "suna", meaning: "le sable" },
    { japanese: "すいか", romaji: "suika", meaning: "la pastèque" },
  ],
};

export const hiraganaSe: Kana = {
  character: "せ",
  script: "hiragana",
  romaji: "se",
  pronunciation: "Comme le « sé » de « séjour » : un « é » net après le « s ».",
  mnemonic:
    "Une selle de cheval. Le long trait horizontal est le dos du cheval, le trait en forme de U est la selle posée dessus, et le petit trait avec un crochet est l'étrier qui pend. « Selle » commence par « se ».",
  illustration: { id: "saddle", caption: "Le dos du cheval, la selle et l'étrier." },
  strokes: strokesHiraganaSe,
  words: [
    { japanese: "せかい", romaji: "sekai", meaning: "le monde" },
    { japanese: "せんせい", romaji: "sensei", meaning: "le professeur" },
    { japanese: "せなか", romaji: "senaka", meaning: "le dos" },
    { japanese: "せき", romaji: "seki", meaning: "le siège, la place" },
  ],
};

export const hiraganaSo: Kana = {
  character: "そ",
  script: "hiragana",
  romaji: "so",
  pronunciation: "Comme le « so » de « sol » : un « o » court et bien fermé.",
  mnemonic:
    "Un sentier qui monte au sommet. Le trait fait des lacets, de haut en bas : c'est le chemin qui zigzague sur la pente de la montagne, avec un petit drapeau tout en haut. « Sommet » commence par « so ».",
  illustration: { id: "mountain", caption: "Le sentier en lacets jusqu'au sommet." },
  strokes: strokesHiraganaSo,
  words: [
    { japanese: "そら", romaji: "sora", meaning: "le ciel" },
    { japanese: "そと", romaji: "soto", meaning: "dehors" },
    { japanese: "そば", romaji: "soba", meaning: "les soba (nouilles de sarrasin)" },
    { japanese: "そうじ", romaji: "souji", meaning: "le ménage" },
  ],
};

export const hiraganaTa: Kana = {
  character: "た",
  script: "hiragana",
  romaji: "ta",
  pronunciation: "Comme le « ta » de « tapis » : un « t » net suivi d'un « a » ouvert.",
  mnemonic:
    "Une tasse de thé fumante, avec un biscuit et une cuillère. Le trait horizontal en haut est le biscuit, le trait penché est la cuillère, le petit trait au milieu est la vapeur et la courbe en bas à droite est le fond de la tasse. « Tasse » commence par « ta ».",
  illustration: { id: "teacup", caption: "Le biscuit, la cuillère, la vapeur et la tasse." },
  strokes: strokesHiraganaTa,
  words: [
    { japanese: "たこ", romaji: "tako", meaning: "le poulpe" },
    { japanese: "たまご", romaji: "tamago", meaning: "l'œuf" },
    { japanese: "たべる", romaji: "taberu", meaning: "manger" },
    { japanese: "あした", romaji: "ashita", meaning: "demain" },
  ],
};

export const hiraganaChi: Kana = {
  character: "ち",
  script: "hiragana",
  romaji: "chi",
  pronunciation: "Comme le « tchi » de « tchin-tchin » (jamais comme « chi » de « chimie »).",
  mnemonic:
    "Un petit chiot avec une écharpe rouge. Le trait horizontal en haut est l'écharpe, la ligne qui descend est son cou et son dos, et la grande boucle en bas à droite est son corps et sa queue enroulés. « Chiot » commence par « chi ».",
  illustration: { id: "puppy", caption: "L'écharpe, le cou et le corps enroulé du chiot." },
  strokes: strokesHiraganaChi,
  words: [
    { japanese: "ちず", romaji: "chizu", meaning: "la carte" },
    { japanese: "ちち", romaji: "chichi", meaning: "mon père" },
    { japanese: "ちかい", romaji: "chikai", meaning: "proche" },
    { japanese: "いち", romaji: "ichi", meaning: "un" },
  ],
};

export const hiraganaTsu: Kana = {
  character: "つ",
  script: "hiragana",
  romaji: "tsu",
  pronunciation: "Comme le « tsou » de « tsé-tsé » : un « t » collé à un « s », puis « ou ». C'est un son bref.",
  mnemonic:
    "Un tsunami. Le trait unique est une immense vague qui monte, se recourbe en rouleau au-dessus de la tête puis retombe. Un petit voilier est pris dans le creux. « Tsunami » est un mot japonais : il commence par « tsu ».",
  illustration: { id: "tsunami", caption: "La grande vague qui se recourbe en rouleau." },
  strokes: strokesHiraganaTsu,
  words: [
    { japanese: "つき", romaji: "tsuki", meaning: "la lune" },
    { japanese: "つくえ", romaji: "tsukue", meaning: "le bureau" },
    { japanese: "つめたい", romaji: "tsumetai", meaning: "froid" },
    { japanese: "くつ", romaji: "kutsu", meaning: "les chaussures" },
  ],
};

export const hiraganaTe: Kana = {
  character: "て",
  script: "hiragana",
  romaji: "te",
  pronunciation: "Comme le « té » de « thé » : un « t » net, puis « é ».",
  mnemonic:
    "Un téléphone à l'ancienne. Le trait part en haut, file à droite, puis redescend en une grande courbe : c'est le combiné, avec l'écouteur d'un côté et le micro de l'autre. « Téléphone » commence par « té ».",
  illustration: { id: "phone", caption: "Le combiné, de l'écouteur au micro." },
  strokes: strokesHiraganaTe,
  words: [
    { japanese: "て", romaji: "te", meaning: "la main" },
    { japanese: "てがみ", romaji: "tegami", meaning: "la lettre" },
    { japanese: "てんき", romaji: "tenki", meaning: "le temps (météo)" },
    { japanese: "おてら", romaji: "otera", meaning: "le temple bouddhiste" },
  ],
};

export const hiraganaTo: Kana = {
  character: "と",
  script: "hiragana",
  romaji: "to",
  pronunciation: "Comme le « to » de « tomate ».",
  mnemonic:
    "Une tomate bien mûre. Le petit trait en haut à gauche est sa tige verte, et le grand trait qui plonge puis se recourbe est la vrille de vigne enroulée autour du fruit. « Tomate » commence par « to ».",
  illustration: { id: "tomato", caption: "La tige et la vrille de la tomate." },
  strokes: strokesHiraganaTo,
  words: [
    { japanese: "とり", romaji: "tori", meaning: "l'oiseau" },
    { japanese: "とけい", romaji: "tokei", meaning: "l'horloge" },
    { japanese: "ともだち", romaji: "tomodachi", meaning: "l'ami" },
    { japanese: "ひと", romaji: "hito", meaning: "la personne" },
  ],
};

export const hiraganaNa: Kana = {
  character: "な",
  script: "hiragana",
  romaji: "na",
  pronunciation: "Comme le « na » de « nature ».",
  mnemonic:
    "Un narval qui bondit. Le long trait penché est sa défense en spirale, la boucle en bas est son corps, le petit crochet à droite est le jet d'eau et le trait horizontal en haut est un bloc de glace. « Narval » commence par « na ».",
  illustration: { id: "narwhal", caption: "La défense, le corps, le jet d'eau et la glace du narval." },
  strokes: strokesHiraganaNa,
  words: [
    { japanese: "なつ", romaji: "natsu", meaning: "l'été" },
    { japanese: "なまえ", romaji: "namae", meaning: "le nom" },
    { japanese: "なに", romaji: "nani", meaning: "quoi" },
    { japanese: "なか", romaji: "naka", meaning: "l'intérieur" },
  ],
};

export const hiraganaNi: Kana = {
  character: "に",
  script: "hiragana",
  romaji: "ni",
  pronunciation: "Comme le « ni » de « nid ».",
  mnemonic:
    "Un nid dans un arbre. Le trait vertical à gauche est le tronc, le petit trait en haut est la branche, et la courbe en bas est le nid en forme de bol. « Nid » se prononce presque « ni ».",
  illustration: { id: "nest", caption: "Le tronc, la branche et le nid garni d'œufs." },
  strokes: strokesHiraganaNi,
  words: [
    { japanese: "にく", romaji: "niku", meaning: "la viande" },
    { japanese: "にほん", romaji: "nihon", meaning: "le Japon" },
    { japanese: "にわ", romaji: "niwa", meaning: "le jardin" },
    { japanese: "に", romaji: "ni", meaning: "deux" },
  ],
};

export const hiraganaNu: Kana = {
  character: "ぬ",
  script: "hiragana",
  romaji: "nu",
  pronunciation: "Comme le « nou » de « nougat ».",
  mnemonic:
    "Un gros nuage tout rond. Les deux traits dessinent les bourrelets moelleux du nuage, avec un peu de pluie qui tombe dessous. « Nuage » commence par « nu ».",
  illustration: { id: "cloud", caption: "Les bourrelets du nuage et la pluie." },
  strokes: strokesHiraganaNu,
  words: [
    { japanese: "いぬ", romaji: "inu", meaning: "le chien" },
    { japanese: "ぬの", romaji: "nuno", meaning: "le tissu" },
    { japanese: "ぬいぐるみ", romaji: "nuigurumi", meaning: "la peluche" },
    { japanese: "ぬく", romaji: "nuku", meaning: "enlever" },
  ],
};

export const hiraganaNe: Kana = {
  character: "ね",
  script: "hiragana",
  romaji: "ne",
  pronunciation: "Comme le « né » de « nénuphar » (le « e » japonais est un « é »).",
  mnemonic:
    "Un nénuphar. Le trait vertical est la longue tige qui monte vers la fleur rose, et le grand trait en boucles dessine les larges feuilles qui flottent sur l'eau. « Nénuphar » commence par « né ».",
  illustration: { id: "lily", caption: "La tige du nénuphar et ses feuilles flottantes." },
  strokes: strokesHiraganaNe,
  words: [
    { japanese: "ねこ", romaji: "neko", meaning: "le chat" },
    { japanese: "ねる", romaji: "neru", meaning: "dormir" },
    { japanese: "ねつ", romaji: "netsu", meaning: "la fièvre" },
    { japanese: "おかね", romaji: "okane", meaning: "l'argent" },
  ],
};

export const hiraganaNo: Kana = {
  character: "の",
  script: "hiragana",
  romaji: "no",
  pronunciation: "Comme le « no » de « nord ».",
  mnemonic:
    "Un nautile. Le trait unique forme la spirale de sa coquille cloisonnée, avec ses tentacules qui dépassent en bas. « Nautile » commence par « no » (« nô-tile »).",
  illustration: { id: "nautilus", caption: "La spirale de la coquille du nautile." },
  strokes: strokesHiraganaNo,
  words: [
    { japanese: "のり", romaji: "nori", meaning: "l'algue séchée" },
    { japanese: "のむ", romaji: "nomu", meaning: "boire" },
    { japanese: "のぼる", romaji: "noboru", meaning: "monter" },
    { japanese: "もの", romaji: "mono", meaning: "la chose" },
  ],
};

export const hiraganaHa: Kana = {
  character: "は",
  script: "hiragana",
  romaji: "ha",
  pronunciation: "Comme le « ha » de « hamac » (un « h » à peine soufflé).",
  mnemonic:
    "Un hamac entre deux palmiers. Le trait vertical à gauche est le premier palmier, le grand trait à droite est le second avec, à sa base, la courbe du hamac, et le petit trait horizontal est la guirlande de fanions. « Hamac » commence par « ha ».",
  illustration: { id: "hammock", caption: "Deux palmiers, la guirlande et le hamac." },
  strokes: strokesHiraganaHa,
  words: [
    { japanese: "はな", romaji: "hana", meaning: "la fleur (ou le nez, selon le kanji)" },
    { japanese: "はし", romaji: "hashi", meaning: "les baguettes" },
    { japanese: "はる", romaji: "haru", meaning: "le printemps" },
    { japanese: "はは", romaji: "haha", meaning: "ma mère" },
  ],
};

export const hiraganaHi: Kana = {
  character: "ひ",
  script: "hiragana",
  romaji: "hi",
  pronunciation: "Comme le « hi » de « hi-hi-hi » : un souffle léger puis « i ».",
  mnemonic:
    "Un hibou, la nuit. Le trait unique dessine son corps en forme de coupe, avec deux aigrettes qui pointent en haut. Ajoute deux gros yeux ronds au milieu. « Hibou » commence par « hi ».",
  illustration: { id: "owl", caption: "Le corps en coupe et les deux aigrettes du hibou." },
  strokes: strokesHiraganaHi,
  words: [
    { japanese: "ひ", romaji: "hi", meaning: "le feu" },
    { japanese: "ひと", romaji: "hito", meaning: "la personne" },
    { japanese: "ひかり", romaji: "hikari", meaning: "la lumière" },
    { japanese: "ひこうき", romaji: "hikōki", meaning: "l'avion" },
  ],
};

export const hiraganaFu: Kana = {
  character: "ふ",
  script: "hiragana",
  romaji: "fu",
  pronunciation: "Entre « fou » et « hou » : on souffle entre les lèvres, sans toucher les dents, puis « ou ».",
  mnemonic:
    "Un bonhomme de neige un peu fou. Le petit trait en haut est la plume de son chapeau, la boucle au milieu est son gros corps rond, et les deux petits traits de chaque côté sont ses bras en branches. « Un bonhomme fou de froid » : « fu ».",
  illustration: { id: "snowman", caption: "La plume, le corps rond et les deux bras du bonhomme de neige." },
  strokes: strokesHiraganaFu,
  words: [
    { japanese: "ふね", romaji: "fune", meaning: "le bateau" },
    { japanese: "ふゆ", romaji: "fuyu", meaning: "l'hiver" },
    { japanese: "ふく", romaji: "fuku", meaning: "les vêtements" },
    { japanese: "ふじさん", romaji: "fujisan", meaning: "le mont Fuji" },
  ],
};

export const hiraganaHe: Kana = {
  character: "へ",
  script: "hiragana",
  romaji: "he",
  pronunciation: "Comme le « é » de « été » avec un souffle devant : « hé ».",
  mnemonic:
    "Un hérisson vu de profil. Le trait unique est son dos qui monte en pente douce puis redescend, hérissé de piquants. « Hérisson » commence par « hé ».",
  illustration: { id: "hedgehog", caption: "Le dos arrondi du hérisson, hérissé de piquants." },
  strokes: strokesHiraganaHe,
  words: [
    { japanese: "へや", romaji: "heya", meaning: "la chambre" },
    { japanese: "へび", romaji: "hebi", meaning: "le serpent" },
    { japanese: "へそ", romaji: "heso", meaning: "le nombril" },
    { japanese: "へた", romaji: "heta", meaning: "maladroit" },
  ],
};

export const hiraganaHo: Kana = {
  character: "ほ",
  script: "hiragana",
  romaji: "ho",
  pronunciation: "Comme le « ho » de « hocher la tête » : un souffle, puis « o ».",
  mnemonic:
    "Un hôtel. Le trait vertical à gauche est le mur de la façade, les deux petits traits horizontaux sont la bannière et l'auvent, et le grand trait vertical à boucle est le pilier de l'entrée. « Hôtel » commence par « hô ».",
  illustration: { id: "hotel", caption: "La façade, la bannière, l'auvent et le pilier de l'hôtel." },
  strokes: strokesHiraganaHo,
  words: [
    { japanese: "ほし", romaji: "hoshi", meaning: "l'étoile" },
    { japanese: "ほん", romaji: "hon", meaning: "le livre" },
    { japanese: "ほね", romaji: "hone", meaning: "l'os" },
    { japanese: "ほたる", romaji: "hotaru", meaning: "la luciole" },
  ],
};

export const hiraganaMa: Kana = {
  character: "ま",
  script: "hiragana",
  romaji: "ma",
  pronunciation: "Comme le « ma » de « maman ».",
  mnemonic:
    "Un voilier. Les deux traits horizontaux sont les vergues qui portent les voiles, et le trait vertical qui finit en boucle est le grand mât planté dans la coque. « Mât » commence par « ma ».",
  illustration: { id: "mast", caption: "Les deux vergues, le mât et la coque." },
  strokes: strokesHiraganaMa,
  words: [
    { japanese: "まど", romaji: "mado", meaning: "la fenêtre" },
    { japanese: "まち", romaji: "machi", meaning: "la ville" },
    { japanese: "まいにち", romaji: "mainichi", meaning: "tous les jours" },
    { japanese: "うま", romaji: "uma", meaning: "le cheval" },
  ],
};

export const hiraganaMi: Kana = {
  character: "み",
  script: "hiragana",
  romaji: "mi",
  pronunciation: "Comme le « mi » de « mie de pain ».",
  mnemonic:
    "Du miel qui coule. Le grand trait est un ruban de miel doré qui descend en ondulant, et le petit trait à droite est la cuillère à miel qui le fait goutter. « Miel » commence par « mi ».",
  illustration: { id: "honey", caption: "Le ruban de miel et la cuillère à miel." },
  strokes: strokesHiraganaMi,
  words: [
    { japanese: "みず", romaji: "mizu", meaning: "l'eau" },
    { japanese: "みみ", romaji: "mimi", meaning: "l'oreille" },
    { japanese: "みち", romaji: "michi", meaning: "le chemin" },
    { japanese: "みせ", romaji: "mise", meaning: "le magasin" },
  ],
};

export const hiraganaMu: Kana = {
  character: "む",
  script: "hiragana",
  romaji: "mu",
  pronunciation: "Comme le « mou » de « moutarde ».",
  mnemonic:
    "Une note de musique. Le grand trait avec sa boucle est la tige et la tête de la note, le trait horizontal en haut est sa barre et le petit crochet à droite est son drapeau. « Musique » commence par « mu ».",
  illustration: { id: "note", caption: "La tête, la tige, la barre et le crochet de la note." },
  strokes: strokesHiraganaMu,
  words: [
    { japanese: "むし", romaji: "mushi", meaning: "l'insecte" },
    { japanese: "むかし", romaji: "mukashi", meaning: "autrefois" },
    { japanese: "むすめ", romaji: "musume", meaning: "la fille" },
    { japanese: "むり", romaji: "muri", meaning: "impossible" },
  ],
};

export const hiraganaMe: Kana = {
  character: "め",
  script: "hiragana",
  romaji: "me",
  pronunciation: "Comme le « mé » de « méduse ».",
  mnemonic:
    "Une méduse qui flotte. La grande boucle est son ombrelle en dôme, le trait à l'intérieur est un bras ondulant, et ses tentacules pendent en dessous. « Méduse » commence par « mé ».",
  illustration: { id: "jellyfish", caption: "L'ombrelle et le bras de la méduse." },
  strokes: strokesHiraganaMe,
  words: [
    { japanese: "め", romaji: "me", meaning: "l'œil" },
    { japanese: "めがね", romaji: "megane", meaning: "les lunettes" },
    { japanese: "あめ", romaji: "ame", meaning: "la pluie" },
    { japanese: "めん", romaji: "men", meaning: "les nouilles" },
  ],
};

export const hiraganaMo: Kana = {
  character: "も",
  script: "hiragana",
  romaji: "mo",
  pronunciation: "Comme le « mo » de « moto ».",
  mnemonic:
    "Un moineau perché. Le grand trait vertical dessine sa tête, son dos et son ventre rond, et les deux petits traits horizontaux sont les brindilles de sa branche. « Moineau » commence par « mo ».",
  illustration: { id: "sparrow", caption: "La tête et le ventre rond du moineau, avec sa branche." },
  strokes: strokesHiraganaMo,
  words: [
    { japanese: "もも", romaji: "momo", meaning: "la pêche" },
    { japanese: "もり", romaji: "mori", meaning: "la forêt" },
    { japanese: "もち", romaji: "mochi", meaning: "le gâteau de riz" },
    { japanese: "もの", romaji: "mono", meaning: "la chose" },
  ],
};

export const hiraganaYa: Kana = {
  character: "や",
  script: "hiragana",
  romaji: "ya",
  pronunciation: "Comme le « ya » de « yaourt ».",
  mnemonic:
    "Un pot de yaourt. La courbe en haut est la crème qui déborde, le petit trait au-dessus est la cerise sur le dessus, et le long trait penché est la cuillère plantée dedans. « Yaourt » commence par « ya ».",
  illustration: { id: "yogurt", caption: "La crème, la cerise et la cuillère du yaourt." },
  strokes: strokesHiraganaYa,
  words: [
    { japanese: "やま", romaji: "yama", meaning: "la montagne" },
    { japanese: "やさい", romaji: "yasai", meaning: "les légumes" },
    { japanese: "やすい", romaji: "yasui", meaning: "bon marché" },
    { japanese: "やきゅう", romaji: "yakyū", meaning: "le baseball" },
  ],
};

export const hiraganaYu: Kana = {
  character: "ゆ",
  script: "hiragana",
  romaji: "yu",
  pronunciation: "Comme le « you » de « youpi ».",
  mnemonic:
    "Un yuzu, cet agrume jaune japonais. La grande boucle est le fruit bien rond, et le long trait vertical est la branche feuillue qui le porte. « Yuzu » commence par « yu ».",
  illustration: { id: "yuzu", caption: "Le fruit rond et la branche du yuzu." },
  strokes: strokesHiraganaYu,
  words: [
    { japanese: "ゆき", romaji: "yuki", meaning: "la neige" },
    { japanese: "ゆめ", romaji: "yume", meaning: "le rêve" },
    { japanese: "ゆび", romaji: "yubi", meaning: "le doigt" },
    { japanese: "ゆかた", romaji: "yukata", meaning: "le kimono d'été" },
  ],
};

export const hiraganaYo: Kana = {
  character: "よ",
  script: "hiragana",
  romaji: "yo",
  pronunciation: "Comme le « yo » de « yoyo ».",
  mnemonic:
    "Un yoyo. Le petit trait à droite est le doigt tendu qui tient la ficelle, le long trait vertical est la ficelle et la boucle au bout est le yoyo qui descend. « Yoyo » commence par « yo ».",
  illustration: { id: "yoyo", caption: "Le doigt, la ficelle et le yoyo." },
  strokes: strokesHiraganaYo,
  words: [
    { japanese: "よる", romaji: "yoru", meaning: "la nuit" },
    { japanese: "よむ", romaji: "yomu", meaning: "lire" },
    { japanese: "よこ", romaji: "yoko", meaning: "le côté" },
    { japanese: "よん", romaji: "yon", meaning: "quatre" },
  ],
};

export const hiraganaRa: Kana = {
  character: "ら",
  script: "hiragana",
  romaji: "ra",
  pronunciation: "Comme le « ra » de « raisin » (le « r » japonais est entre « r » et « l », roulé très légèrement).",
  mnemonic:
    "Une grappe de raisins. Le petit trait en haut est la tige, et le grand trait qui se renfle dessine la grappe pleine de grains ronds. « Raisin » commence par « ra ».",
  illustration: { id: "grapes", caption: "La tige et la grappe de raisins." },
  strokes: strokesHiraganaRa,
  words: [
    { japanese: "さくら", romaji: "sakura", meaning: "le cerisier en fleurs" },
    { japanese: "さら", romaji: "sara", meaning: "l'assiette" },
    { japanese: "らくだ", romaji: "rakuda", meaning: "le chameau" },
    { japanese: "らいねん", romaji: "rainen", meaning: "l'année prochaine" },
  ],
};

export const hiraganaRi: Kana = {
  character: "り",
  script: "hiragana",
  romaji: "ri",
  pronunciation: "Comme le « ri » de « riz ».",
  mnemonic:
    "Une fenêtre avec deux rideaux. Les deux traits verticaux sont les plis des rideaux qui tombent de chaque côté de la fenêtre. « Rideau » commence par « ri ».",
  illustration: { id: "curtains", caption: "Les deux rideaux ouverts devant la fenêtre." },
  strokes: strokesHiraganaRi,
  words: [
    { japanese: "りんご", romaji: "ringo", meaning: "la pomme" },
    { japanese: "りす", romaji: "risu", meaning: "l'écureuil" },
    { japanese: "くり", romaji: "kuri", meaning: "la châtaigne" },
    { japanese: "あり", romaji: "ari", meaning: "la fourmi" },
  ],
};

export const hiraganaRu: Kana = {
  character: "る",
  script: "hiragana",
  romaji: "ru",
  pronunciation: "Comme le « rou » de « route ».",
  mnemonic:
    "Un ruisseau. Le trait unique serpente dans la prairie puis finit en boucle dans une petite mare. « Ruisseau » commence par « ru ».",
  illustration: { id: "stream", caption: "Le ruisseau qui serpente jusqu'à sa mare." },
  strokes: strokesHiraganaRu,
  words: [
    { japanese: "くるま", romaji: "kuruma", meaning: "la voiture" },
    { japanese: "かるい", romaji: "karui", meaning: "léger" },
    { japanese: "ある", romaji: "aru", meaning: "il y a" },
    { japanese: "るす", romaji: "rusu", meaning: "l'absence" },
  ],
};

export const hiraganaRe: Kana = {
  character: "れ",
  script: "hiragana",
  romaji: "re",
  pronunciation: "Comme le « ré » de « récré ».",
  mnemonic:
    "Un renard assis. Le trait vertical est sa patte avant et sa tête pointue, et le grand trait courbe est son dos arrondi qui finit en une queue touffue au bout blanc. « Renard » commence par « re ».",
  illustration: { id: "fox", caption: "La patte, le dos et la queue du renard." },
  strokes: strokesHiraganaRe,
  words: [
    { japanese: "これ", romaji: "kore", meaning: "ceci" },
    { japanese: "れい", romaji: "rei", meaning: "zéro" },
    { japanese: "れきし", romaji: "rekishi", meaning: "l'histoire" },
    { japanese: "れんが", romaji: "renga", meaning: "la brique" },
  ],
};

export const hiraganaRo: Kana = {
  character: "ろ",
  script: "hiragana",
  romaji: "ro",
  pronunciation: "Comme le « ro » de « robot ».",
  mnemonic:
    "Un robinet. Le trait unique part de la poignée en haut, descend dans le tuyau puis se courbe en un bec d'où tombe une goutte. « Robinet » commence par « ro ».",
  illustration: { id: "tap", caption: "La poignée, le tuyau et le bec du robinet." },
  strokes: strokesHiraganaRo,
  words: [
    { japanese: "ろく", romaji: "roku", meaning: "six" },
    { japanese: "しろ", romaji: "shiro", meaning: "le blanc" },
    { japanese: "くろ", romaji: "kuro", meaning: "le noir" },
    { japanese: "ろうそく", romaji: "rōsoku", meaning: "la bougie" },
  ],
};

export const hiraganaWa: Kana = {
  character: "わ",
  script: "hiragana",
  romaji: "wa",
  pronunciation: "Comme le « oua » de « ouate » : un « ou » très bref puis « a ».",
  mnemonic:
    "Une grande roue de fête foraine. Le trait vertical à gauche est le mât avec son fanion, et la grande boucle à droite est la roue. « Ouah ! » : « wa ».",
  illustration: { id: "wheel", caption: "Le mât à fanion et la grande roue." },
  strokes: strokesHiraganaWa,
  words: [
    { japanese: "わたし", romaji: "watashi", meaning: "moi" },
    { japanese: "わかる", romaji: "wakaru", meaning: "comprendre" },
    { japanese: "わに", romaji: "wani", meaning: "le crocodile" },
    { japanese: "かわ", romaji: "kawa", meaning: "la rivière" },
  ],
};

export const hiraganaWo: Kana = {
  character: "を",
  script: "hiragana",
  romaji: "wo",
  pronunciation: "Se prononce comme « o » (comme le « o » de « photo »). On ne l'emploie que comme particule.",
  mnemonic:
    "Une orque qui bondit hors de l'eau. Le grand trait courbe est son dos noir en arc, le trait en Y est la gerbe d'eau qu'elle soulève, et le trait horizontal en haut est l'écume. « Orque » commence par « o », comme を.",
  illustration: { id: "orca", caption: "Le dos de l'orque et sa gerbe d'eau." },
  strokes: strokesHiraganaWo,
  words: [
    { japanese: "ほんを よむ", romaji: "hon o yomu", meaning: "lire un livre" },
    { japanese: "みずを のむ", romaji: "mizu o nomu", meaning: "boire de l'eau" },
    { japanese: "てを あらう", romaji: "te o arau", meaning: "se laver les mains" },
    { japanese: "ごはんを たべる", romaji: "gohan o taberu", meaning: "manger le repas" },
  ],
};

export const hiraganaN: Kana = {
  character: "ん",
  script: "hiragana",
  romaji: "n",
  pronunciation: "Un « n » nasal, comme dans « pain » ou « an » : la bouche reste mi-ouverte et le son résonne dans le nez. En fin de mot ou avant « b », « m », « p », il se prononce parfois « m ».",
  mnemonic:
    "Un ange. Le trait unique est sa grande aile qui part du haut, descend en courbe puis se relève en une plume. « Ange » : on entend le « an » nasal, c'est ton ん.",
  illustration: { id: "angel", caption: "La grande aile de l'ange." },
  strokes: strokesHiraganaN,
  words: [
    { japanese: "ほん", romaji: "hon", meaning: "le livre" },
    { japanese: "みかん", romaji: "mikan", meaning: "la mandarine" },
    { japanese: "にほん", romaji: "nihon", meaning: "le Japon" },
    { japanese: "ごはん", romaji: "gohan", meaning: "le riz, le repas" },
  ],
};

const c = (character: string, romaji: string): KanaCell => ({ character, romaji });
const _ = null;

/** Les 46 hiragana de base, dans l'ordre du tableau classique (gojūon), 5 colonnes : a i u e o. */
export const hiraganaRows: KanaCell[][] = [
  [c("あ", "a"), c("い", "i"), c("う", "u"), c("え", "e"), c("お", "o")],
  [c("か", "ka"), c("き", "ki"), c("く", "ku"), c("け", "ke"), c("こ", "ko")],
  [c("さ", "sa"), c("し", "shi"), c("す", "su"), c("せ", "se"), c("そ", "so")],
  [c("た", "ta"), c("ち", "chi"), c("つ", "tsu"), c("て", "te"), c("と", "to")],
  [c("な", "na"), c("に", "ni"), c("ぬ", "nu"), c("ね", "ne"), c("の", "no")],
  [c("は", "ha"), c("ひ", "hi"), c("ふ", "fu"), c("へ", "he"), c("ほ", "ho")],
  [c("ま", "ma"), c("み", "mi"), c("む", "mu"), c("め", "me"), c("も", "mo")],
  [c("や", "ya"), _, c("ゆ", "yu"), _, c("よ", "yo")],
  [c("ら", "ra"), c("り", "ri"), c("る", "ru"), c("れ", "re"), c("ろ", "ro")],
  [c("わ", "wa"), _, _, _, c("を", "wo")],
  [c("ん", "n"), _, _, _, _],
];

/** Leçons rédigées, indexées par la transcription (c'est aussi l'URL : /hiragana/a). */
const lessons = new Map<string, Kana>([
  ["a", hiraganaA],
  ["i", hiraganaI],
  ["u", hiraganaU],
  ["e", hiraganaE],
  ["o", hiraganaO],
  ["ka", hiraganaKa],
  ["ki", hiraganaKi],
  ["ku", hiraganaKu],
  ["ke", hiraganaKe],
  ["ko", hiraganaKo],
  ["sa", hiraganaSa],
  ["shi", hiraganaShi],
  ["su", hiraganaSu],
  ["se", hiraganaSe],
  ["so", hiraganaSo],
  ["ta", hiraganaTa],
  ["chi", hiraganaChi],
  ["tsu", hiraganaTsu],
  ["te", hiraganaTe],
  ["to", hiraganaTo],
  ["na", hiraganaNa],
  ["ni", hiraganaNi],
  ["nu", hiraganaNu],
  ["ne", hiraganaNe],
  ["no", hiraganaNo],
  ["ha", hiraganaHa],
  ["hi", hiraganaHi],
  ["fu", hiraganaFu],
  ["he", hiraganaHe],
  ["ho", hiraganaHo],
  ["ma", hiraganaMa],
  ["mi", hiraganaMi],
  ["mu", hiraganaMu],
  ["me", hiraganaMe],
  ["mo", hiraganaMo],
  ["ya", hiraganaYa],
  ["yu", hiraganaYu],
  ["yo", hiraganaYo],
  ["ra", hiraganaRa],
  ["ri", hiraganaRi],
  ["ru", hiraganaRu],
  ["re", hiraganaRe],
  ["ro", hiraganaRo],
  ["wa", hiraganaWa],
  ["wo", hiraganaWo],
  ["n", hiraganaN],
]);

// Dakuten, handakuten et combinaisons (yōon) : leçons bâties sur celles de base.
for (const [slug, lesson] of buildExtraLessons(lessons)) lessons.set(slug, lesson);

for (const [slug, lesson] of buildHiraganaSigns(lessons)) lessons.set(slug, lesson);

export { hiraganaSignCells } from "./hiragana-signs";
export { dakutenRows, yoonRows, DAKUTEN_TOTAL, YOON_TOTAL } from "./hiragana-extra";

export function getHiraganaLesson(romaji: string): Kana | undefined {
  return lessons.get(romaji);
}

export function hiraganaLessonSlugs(): string[] {
  return [...lessons.keys()];
}

export const HIRAGANA_TOTAL = hiraganaRows.flat().filter(Boolean).length;

import { displayKana, kanaToHepburn } from "@/lib/romaji";
import { verbTr, type Tr } from "@/i18n/meanings";

/**
 * Verbes des niveaux JLPT N5 et N4 (liste de référence : vocabulaire JLPT, voir reference/).
 * Pour chaque verbe : écriture, lecture, sens, et une phrase d'exemple simple à la forme polie.
 * Le groupe, la forme en ます et tous les rōmaji sont calculés à partir des kana.
 * Dans les kana des exemples, « _ » sépare une particule du mot qui la précède (non affiché).
 */

export type VerbGroup = "godan" | "ichidan" | "irregulier";

type Form = { jp: string; kana: string; romaji: string };

export type Verb = {
  slug: string;
  jp: string;
  kana: string;
  romaji: string;
  level: "N5" | "N4";
  meaning: string;
  group: VerbGroup;
  masu: { jp: string; kana: string; romaji: string };
  /** Forme familière (style neutre, entre amis) : négatif en ない et passé en た / だ. La forme du dictionnaire est le verbe lui-même. */
  plain: { neg: Form; past: Form };
  /** Forme en て (relier des actions, ～てください, ～ています…) : le passé en た / だ, avec て / で. */
  te: Form;
  example: { jp: string; kana: string; romaji: string; fr: string; /** Traduction anglaise et allemande. */ tr?: Tr };
  /** Sens en anglais et en allemand. */
  meaningTr?: Tr;
};

type Row = [jp: string, kana: string, level: 5 | 4, meaning: string, exJp: string, exKana: string, exFr: string];

/** Verbes en る qui se conjuguent comme des godan (exceptions à la règle i/e + る). */
const GODAN_RU = new Set(["帰る", "入る", "走る", "知る", "切る", "要る", "滑る", "散る", "減る", "喋る", "握る", "限る", "参る", "焦る", "蹴る", "照る", "練る", "湿る", "茂る"]);
const I_ROW = "いきぎしじちぢにひびぴみり";
const E_ROW = "えけげせぜてでねへべぺめれ";
const TO_I: Record<string, string> = { う: "い", く: "き", ぐ: "ぎ", す: "し", つ: "ち", ぬ: "に", ぶ: "び", む: "み", る: "り" };

function groupOf(jp: string, kana: string): VerbGroup {
  if (kana.endsWith("する") || jp === "来る") return "irregulier";
  const before = kana[kana.length - 2];
  if (kana.endsWith("る") && (I_ROW.includes(before) || E_ROW.includes(before)) && !GODAN_RU.has(jp)) return "ichidan";
  return "godan";
}

function masuOf(jp: string, kana: string, group: VerbGroup) {
  if (group === "irregulier") {
    if (jp === "来る") return { jp: "来ます", kana: "きます" };
    return { jp: jp.slice(0, -2) + "します", kana: kana.slice(0, -2) + "します" };
  }
  if (group === "ichidan") return { jp: jp.slice(0, -1) + "ます", kana: kana.slice(0, -1) + "ます" };
  const last = kana[kana.length - 1];
  return { jp: jp.slice(0, -1) + TO_I[last] + "ます", kana: kana.slice(0, -1) + TO_I[last] + "ます" };
}

const TO_A: Record<string, string> = { う: "わ", く: "か", ぐ: "が", す: "さ", つ: "た", ぬ: "な", ぶ: "ば", む: "ま", る: "ら" };
const TA_OF: Record<string, string> = { う: "った", つ: "った", る: "った", む: "んだ", ぶ: "んだ", ぬ: "んだ", く: "いた", ぐ: "いだ", す: "した" };

/** Négatif (ない) et passé (た) de la forme familière, dérivés du groupe. */
function plainOf(jp: string, kana: string, group: VerbGroup) {
  const swap = (word: string, cut: number, add: string) => word.slice(0, word.length - cut) + add;
  if (kana === "ある") return { neg: { jp: "ない", kana: "ない" }, past: { jp: swap(jp, 1, "った"), kana: "あった" } };
  if (group === "irregulier") {
    if (jp === "来る") return { neg: { jp: "来ない", kana: "こない" }, past: { jp: "来た", kana: "きた" } };
    return { neg: { jp: swap(jp, 2, "しない"), kana: swap(kana, 2, "しない") }, past: { jp: swap(jp, 2, "した"), kana: swap(kana, 2, "した") } };
  }
  if (group === "ichidan") return { neg: { jp: swap(jp, 1, "ない"), kana: swap(kana, 1, "ない") }, past: { jp: swap(jp, 1, "た"), kana: swap(kana, 1, "た") } };
  const last = kana[kana.length - 1];
  // 行く fait exception : 行った (いった), et non 行いた.
  const ta = kana === "いく" ? "った" : TA_OF[last];
  return { neg: { jp: swap(jp, 1, TO_A[last] + "ない"), kana: swap(kana, 1, TO_A[last] + "ない") }, past: { jp: swap(jp, 1, ta), kana: swap(kana, 1, ta) } };
}

/** La forme en て se construit exactement comme le passé : た devient て, だ devient で. */
const teOf = (past: { jp: string; kana: string }) => {
  const swap = (w: string) => w.slice(0, -1) + (w.endsWith("だ") ? "で" : "て");
  return { jp: swap(past.jp), kana: swap(past.kana) };
};

const ROWS: Row[] = [
  /* ------------------------------- N5 ------------------------------- */
  ["会う", "あう", 5, "rencontrer, voir (quelqu'un)", "駅で友だちに会います。", "えき_で ともだち_に あいます。", "Je retrouve un ami à la gare."],
  ["開く", "あく", 5, "s'ouvrir", "ドアが開きました。", "ドア_が あきました。", "La porte s'est ouverte."],
  ["開ける", "あける", 5, "ouvrir", "まどを開けます。", "まど_を あけます。", "J'ouvre la fenêtre."],
  ["上げる", "あげる", 5, "lever, monter (quelque chose)", "手を上げてください。", "て_を あげて ください。", "Levez la main, s'il vous plaît."],
  ["遊ぶ", "あそぶ", 5, "jouer, s'amuser", "こうえんで子どもと遊びます。", "こうえん_で こども_と あそびます。", "Je joue avec les enfants au parc."],
  ["浴びる", "あびる", 5, "prendre (une douche)", "毎朝シャワーを浴びます。", "まいあさ シャワー_を あびます。", "Je prends une douche tous les matins."],
  ["洗う", "あらう", 5, "laver", "食べる前に手を洗います。", "たべる まえ_に て_を あらいます。", "Je me lave les mains avant de manger."],
  ["有る", "ある", 5, "y avoir, se trouver (objets)", "つくえの上に本があります。", "つくえ_の うえ_に ほん_が あります。", "Il y a un livre sur le bureau."],
  ["歩く", "あるく", 5, "marcher", "毎日駅まで歩きます。", "まいにち えき_まで あるきます。", "Je marche jusqu'à la gare tous les jours."],
  ["言う", "いう", 5, "dire", "先生は「おはよう」と言いました。", "せんせい_は 「おはよう」_と いいました。", "Le professeur a dit « bonjour »."],
  ["行く", "いく", 5, "aller", "あした東京へ行きます。", "あした とうきょう_へ いきます。", "Demain, je vais à Tokyo."],
  ["要る", "いる", 5, "avoir besoin de", "パスポートが要ります。", "パスポート_が いります。", "Il faut un passeport."],
  ["居る", "いる", 5, "y avoir, être là (êtres vivants)", "へやにねこがいます。", "へや_に ねこ_が います。", "Il y a un chat dans la chambre."],
  ["入れる", "いれる", 5, "mettre dedans", "コーヒーにさとうを入れます。", "コーヒー_に さとう_を いれます。", "Je mets du sucre dans mon café."],
  ["歌う", "うたう", 5, "chanter", "みんなで歌を歌いましょう。", "みんな_で うた_を うたいましょう。", "Chantons une chanson tous ensemble."],
  ["生まれる", "うまれる", 5, "naître", "わたしはパリで生まれました。", "わたし_は パリ_で うまれました。", "Je suis né(e) à Paris."],
  ["売る", "うる", 5, "vendre", "この店はくだものを売っています。", "この みせ_は くだもの_を うって います。", "Ce magasin vend des fruits."],
  ["起きる", "おきる", 5, "se lever, se réveiller", "毎朝六時に起きます。", "まいあさ ろくじ_に おきます。", "Je me lève à six heures tous les matins."],
  ["置く", "おく", 5, "poser, mettre", "かばんをいすの上に置きます。", "かばん_を いす_の うえ_に おきます。", "Je pose mon sac sur la chaise."],
  ["教える", "おしえる", 5, "enseigner, indiquer", "道を教えてください。", "みち_を おしえて ください。", "Indiquez-moi le chemin, s'il vous plaît."],
  ["押す", "おす", 5, "pousser, appuyer", "このボタンを押してください。", "この ボタン_を おして ください。", "Appuyez sur ce bouton, s'il vous plaît."],
  ["覚える", "おぼえる", 5, "mémoriser, retenir", "毎日かんじを五つ覚えます。", "まいにち かんじ_を いつつ おぼえます。", "J'apprends cinq kanji par jour."],
  ["泳ぐ", "およぐ", 5, "nager", "夏は海で泳ぎます。", "なつ_は うみ_で およぎます。", "L'été, je nage dans la mer."],
  ["降りる", "おりる", 5, "descendre (d'un véhicule)", "次の駅で電車を降ります。", "つぎ_の えき_で でんしゃ_を おります。", "Je descends du train à la prochaine gare."],
  ["終わる", "おわる", 5, "finir, se terminer", "じゅぎょうは三時に終わります。", "じゅぎょう_は さんじ_に おわります。", "Le cours finit à trois heures."],
  ["買う", "かう", 5, "acheter", "スーパーで牛乳を買います。", "スーパー_で ぎゅうにゅう_を かいます。", "J'achète du lait au supermarché."],
  ["返す", "かえす", 5, "rendre", "としょかんに本を返します。", "としょかん_に ほん_を かえします。", "Je rends le livre à la bibliothèque."],
  ["帰る", "かえる", 5, "rentrer", "七時にうちへ帰ります。", "しちじ_に うち_へ かえります。", "Je rentre à la maison à sept heures."],
  ["書く", "かく", 5, "écrire", "母に手紙を書きます。", "はは_に てがみ_を かきます。", "J'écris une lettre à ma mère."],
  ["掛ける", "かける", 5, "accrocher ; mettre (lunettes) ; passer (un appel)", "友だちに電話をかけます。", "ともだち_に でんわ_を かけます。", "J'appelle un ami."],
  ["貸す", "かす", 5, "prêter", "友だちにかさを貸しました。", "ともだち_に かさ_を かしました。", "J'ai prêté mon parapluie à un ami."],
  ["被る", "かぶる", 5, "porter (sur la tête)", "あつい日はぼうしをかぶります。", "あつい ひ_は ぼうし_を かぶります。", "Les jours de chaleur, je porte un chapeau."],
  ["借りる", "かりる", 5, "emprunter", "としょかんで本を借ります。", "としょかん_で ほん_を かります。", "J'emprunte un livre à la bibliothèque."],
  ["消える", "きえる", 5, "s'éteindre, disparaître", "でんきが消えました。", "でんき_が きえました。", "La lumière s'est éteinte."],
  ["聞く", "きく", 5, "écouter ; demander", "毎晩音楽を聞きます。", "まいばん おんがく_を ききます。", "J'écoute de la musique tous les soirs."],
  ["切る", "きる", 5, "couper", "ナイフでパンを切ります。", "ナイフ_で パン_を きります。", "Je coupe le pain avec un couteau."],
  ["着る", "きる", 5, "mettre, porter (un haut)", "さむいのでセーターを着ます。", "さむい_ので セーター_を きます。", "Il fait froid, alors je mets un pull."],
  ["曇る", "くもる", 5, "se couvrir (le ciel)", "午後から曇りました。", "ごご_から くもりました。", "Le ciel s'est couvert à partir de l'après-midi."],
  ["来る", "くる", 5, "venir", "友だちがうちに来ます。", "ともだち_が うち_に きます。", "Un ami vient à la maison."],
  ["消す", "けす", 5, "éteindre ; effacer", "ねる前にでんきを消します。", "ねる まえ_に でんき_を けします。", "J'éteins la lumière avant de dormir."],
  ["答える", "こたえる", 5, "répondre", "しつもんに答えてください。", "しつもん_に こたえて ください。", "Répondez à la question, s'il vous plaît."],
  ["コピーする", "コピーする", 5, "photocopier", "この紙をコピーします。", "この かみ_を コピー_します。", "Je photocopie cette feuille."],
  ["困る", "こまる", 5, "être embêté", "かぎがなくて困っています。", "かぎ_が なくて こまって います。", "Je suis embêté, je n'ai pas mes clés."],
  ["咲く", "さく", 5, "fleurir", "春にさくらが咲きます。", "はる_に さくら_が さきます。", "Les cerisiers fleurissent au printemps."],
  ["差す", "さす", 5, "ouvrir (un parapluie)", "雨なのでかさを差します。", "あめ_なので かさ_を さします。", "Il pleut, alors j'ouvre mon parapluie."],
  ["死ぬ", "しぬ", 5, "mourir", "その犬は去年死にました。", "その いぬ_は きょねん しにました。", "Ce chien est mort l'année dernière."],
  ["閉まる", "しまる", 5, "se fermer", "店は八時に閉まります。", "みせ_は はちじ_に しまります。", "Le magasin ferme à huit heures."],
  ["閉める", "しめる", 5, "fermer", "ドアを閉めてください。", "ドア_を しめて ください。", "Fermez la porte, s'il vous plaît."],
  ["締める", "しめる", 5, "serrer, attacher", "車ではシートベルトを締めます。", "くるま_で_は シートベルト_を しめます。", "En voiture, j'attache ma ceinture."],
  ["知る", "しる", 5, "savoir, connaître", "その人の名前を知っていますか。", "その ひと_の なまえ_を しって います_か。", "Tu connais le nom de cette personne ?"],
  ["吸う", "すう", 5, "aspirer, fumer", "ここでたばこを吸わないでください。", "ここ_で たばこ_を すわないで ください。", "Ne fumez pas ici, s'il vous plaît."],
  ["住む", "すむ", 5, "habiter", "わたしは大阪に住んでいます。", "わたし_は おおさか_に すんで います。", "J'habite à Osaka."],
  ["する", "する", 5, "faire", "日曜日にテニスをします。", "にちようび_に テニス_を します。", "Je joue au tennis le dimanche."],
  ["座る", "すわる", 5, "s'asseoir", "どうぞ、ここに座ってください。", "どうぞ、 ここ_に すわって ください。", "Je vous en prie, asseyez-vous ici."],
  ["出す", "だす", 5, "sortir (quelque chose) ; rendre, envoyer", "あしたしゅくだいを出します。", "あした しゅくだい_を だします。", "Je rends mes devoirs demain."],
  ["立つ", "たつ", 5, "se lever, se tenir debout", "名前をよばれたら立ってください。", "なまえ_を よばれたら たって ください。", "Levez-vous quand on appelle votre nom."],
  ["頼む", "たのむ", 5, "demander (un service)", "友だちに手伝いを頼みました。", "ともだち_に てつだい_を たのみました。", "J'ai demandé de l'aide à un ami."],
  ["食べる", "たべる", 5, "manger", "昼ごはんにラーメンを食べます。", "ひるごはん_に ラーメン_を たべます。", "Je mange des ramen pour le déjeuner."],
  ["違う", "ちがう", 5, "être différent ; être faux", "答えが違います。", "こたえ_が ちがいます。", "La réponse est fausse."],
  ["使う", "つかう", 5, "utiliser", "はしを使って食べます。", "はし_を つかって たべます。", "Je mange avec des baguettes."],
  ["疲れる", "つかれる", 5, "se fatiguer", "今日はとても疲れました。", "きょう_は とても つかれました。", "Aujourd'hui, je suis très fatigué(e)."],
  ["着く", "つく", 5, "arriver", "電車は九時に着きます。", "でんしゃ_は くじ_に つきます。", "Le train arrive à neuf heures."],
  ["作る", "つくる", 5, "fabriquer, préparer", "母はカレーを作りました。", "はは_は カレー_を つくりました。", "Ma mère a préparé du curry."],
  ["点ける", "つける", 5, "allumer", "テレビをつけてもいいですか。", "テレビ_を つけて_も いい です_か。", "Je peux allumer la télé ?"],
  ["勤める", "つとめる", 5, "travailler (pour une entreprise)", "兄は銀行に勤めています。", "あに_は ぎんこう_に つとめて います。", "Mon grand frère travaille dans une banque."],
  ["出かける", "でかける", 5, "sortir (de chez soi)", "週末は家族と出かけます。", "しゅうまつ_は かぞく_と でかけます。", "Le week-end, je sors avec ma famille."],
  ["出来る", "できる", 5, "pouvoir, savoir faire", "わたしは日本語ができます。", "わたし_は にほんご_が できます。", "Je sais parler japonais."],
  ["出る", "でる", 5, "sortir ; partir", "毎朝八時に家を出ます。", "まいあさ はちじ_に いえ_を でます。", "Je pars de la maison à huit heures tous les matins."],
  ["飛ぶ", "とぶ", 5, "voler (dans les airs)", "空を鳥が飛んでいます。", "そら_を とり_が とんで います。", "Des oiseaux volent dans le ciel."],
  ["止まる", "とまる", 5, "s'arrêter", "バスが駅の前で止まりました。", "バス_が えき_の まえ_で とまりました。", "Le bus s'est arrêté devant la gare."],
  ["取る", "とる", 5, "prendre", "しおを取ってください。", "しお_を とって ください。", "Passe-moi le sel, s'il te plaît."],
  ["撮る", "とる", 5, "prendre (une photo)", "ここで写真を撮りましょう。", "ここ_で しゃしん_を とりましょう。", "Prenons une photo ici."],
  ["鳴く", "なく", 5, "chanter, crier (animaux)", "朝、鳥が鳴いています。", "あさ、 とり_が ないて います。", "Le matin, les oiseaux chantent."],
  ["無くす", "なくす", 5, "perdre (quelque chose)", "さいふを無くしました。", "さいふ_を なくしました。", "J'ai perdu mon portefeuille."],
  ["習う", "ならう", 5, "apprendre (auprès de quelqu'un)", "ピアノを習っています。", "ピアノ_を ならって います。", "J'apprends le piano."],
  ["並ぶ", "ならぶ", 5, "faire la queue, être aligné", "みんなが店の前に並んでいます。", "みんな_が みせ_の まえ_に ならんで います。", "Tout le monde fait la queue devant le magasin."],
  ["並べる", "ならべる", 5, "aligner, disposer", "テーブルにおさらを並べます。", "テーブル_に おさら_を ならべます。", "Je dispose les assiettes sur la table."],
  ["成る", "なる", 5, "devenir", "わたしは先生になりたいです。", "わたし_は せんせい_に なりたい です。", "Je veux devenir professeur."],
  ["脱ぐ", "ぬぐ", 5, "enlever (un vêtement)", "家に入る前にくつを脱ぎます。", "いえ_に はいる まえ_に くつ_を ぬぎます。", "J'enlève mes chaussures avant d'entrer dans la maison."],
  ["寝る", "ねる", 5, "dormir, se coucher", "毎晩十一時に寝ます。", "まいばん じゅういちじ_に ねます。", "Je me couche à onze heures tous les soirs."],
  ["登る", "のぼる", 5, "grimper, monter", "夏に富士山に登りました。", "なつ_に ふじさん_に のぼりました。", "J'ai fait l'ascension du mont Fuji en été."],
  ["飲む", "のむ", 5, "boire ; prendre (un médicament)", "毎朝コーヒーを飲みます。", "まいあさ コーヒー_を のみます。", "Je bois un café tous les matins."],
  ["乗る", "のる", 5, "monter (dans un véhicule)", "駅からバスに乗ります。", "えき_から バス_に のります。", "Je prends le bus à la gare."],
  ["入る", "はいる", 5, "entrer", "どうぞ、入ってください。", "どうぞ、 はいって ください。", "Entrez, je vous en prie."],
  ["履く", "はく", 5, "mettre, porter (en bas : chaussures, pantalon)", "あたらしいくつを履きます。", "あたらしい くつ_を はきます。", "Je mets mes nouvelles chaussures."],
  ["走る", "はしる", 5, "courir", "毎朝こうえんを走ります。", "まいあさ こうえん_を はしります。", "Je cours au parc tous les matins."],
  ["働く", "はたらく", 5, "travailler", "父は会社で働いています。", "ちち_は かいしゃ_で はたらいて います。", "Mon père travaille dans une entreprise."],
  ["話す", "はなす", 5, "parler", "友だちと日本語で話します。", "ともだち_と にほんご_で はなします。", "Je parle japonais avec un ami."],
  ["貼る", "はる", 5, "coller", "ふうとうにきってを貼ります。", "ふうとう_に きって_を はります。", "Je colle un timbre sur l'enveloppe."],
  ["晴れる", "はれる", 5, "faire beau (s'éclaircir)", "あしたは晴れるでしょう。", "あした_は はれる でしょう。", "Demain, il fera sans doute beau."],
  ["引く", "ひく", 5, "tirer ; attraper (un rhume)", "かぜを引きました。", "かぜ_を ひきました。", "J'ai attrapé un rhume."],
  ["弾く", "ひく", 5, "jouer (d'un instrument à cordes ou à clavier)", "妹はピアノを弾きます。", "いもうと_は ピアノ_を ひきます。", "Ma petite sœur joue du piano."],
  ["吹く", "ふく", 5, "souffler", "今日はつよい風が吹いています。", "きょう_は つよい かぜ_が ふいて います。", "Aujourd'hui, un vent fort souffle."],
  ["降る", "ふる", 5, "tomber (pluie, neige)", "朝から雨が降っています。", "あさ_から あめ_が ふって います。", "Il pleut depuis ce matin."],
  ["曲がる", "まがる", 5, "tourner (à un angle)", "次のかどを右に曲がってください。", "つぎ_の かど_を みぎ_に まがって ください。", "Tournez à droite au prochain coin de rue, s'il vous plaît."],
  ["待つ", "まつ", 5, "attendre", "ちょっと待ってください。", "ちょっと まって ください。", "Attendez un instant, s'il vous plaît."],
  ["磨く", "みがく", 5, "brosser, polir", "ねる前に歯を磨きます。", "ねる まえ_に は_を みがきます。", "Je me brosse les dents avant de dormir."],
  ["見せる", "みせる", 5, "montrer", "パスポートを見せてください。", "パスポート_を みせて ください。", "Montrez votre passeport, s'il vous plaît."],
  ["見る", "みる", 5, "voir, regarder", "夜テレビを見ます。", "よる テレビ_を みます。", "Je regarde la télé le soir."],
  ["持つ", "もつ", 5, "tenir, avoir sur soi", "かさを持っていますか。", "かさ_を もって います_か。", "As-tu un parapluie ?"],
  ["休む", "やすむ", 5, "se reposer ; être absent", "今日は学校を休みます。", "きょう_は がっこう_を やすみます。", "Aujourd'hui, je ne vais pas à l'école."],
  ["遣る", "やる", 5, "faire (familier) ; donner (à un animal)", "犬にえさをやります。", "いぬ_に えさ_を やります。", "Je donne à manger au chien."],
  ["呼ぶ", "よぶ", 5, "appeler ; inviter", "タクシーを呼んでください。", "タクシー_を よんで ください。", "Appelez un taxi, s'il vous plaît."],
  ["読む", "よむ", 5, "lire", "電車で本を読みます。", "でんしゃ_で ほん_を よみます。", "Je lis un livre dans le train."],
  ["分かる", "わかる", 5, "comprendre", "日本語が少し分かります。", "にほんご_が すこし わかります。", "Je comprends un peu le japonais."],
  ["忘れる", "わすれる", 5, "oublier", "しゅくだいを忘れました。", "しゅくだい_を わすれました。", "J'ai oublié mes devoirs."],
  ["渡す", "わたす", 5, "remettre, donner", "先生にレポートを渡します。", "せんせい_に レポート_を わたします。", "Je remets mon rapport au professeur."],
  ["渡る", "わたる", 5, "traverser", "ここで道を渡りましょう。", "ここ_で みち_を わたりましょう。", "Traversons la rue ici."],
  /* ------------------------------- N4 ------------------------------- */
  ["上がる", "あがる", 4, "monter ; augmenter", "どうぞ、上がってください。", "どうぞ、 あがって ください。", "Entrez, je vous en prie (montez dans la maison)."],
  ["空く", "あく", 4, "se libérer, être vide", "この席は空いていますか。", "この せき_は あいて います_か。", "Cette place est libre ?"],
  ["あげる", "あげる", 4, "donner (à quelqu'un)", "妹にケーキをあげました。", "いもうと_に ケーキ_を あげました。", "J'ai donné un gâteau à ma petite sœur."],
  ["集まる", "あつまる", 4, "se rassembler", "駅の前にみんなが集まりました。", "えき_の まえ_に みんな_が あつまりました。", "Tout le monde s'est rassemblé devant la gare."],
  ["集める", "あつめる", 4, "rassembler, collectionner", "わたしはきってを集めています。", "わたし_は きって_を あつめて います。", "Je collectionne les timbres."],
  ["謝る", "あやまる", 4, "s'excuser", "おくれたので先生に謝りました。", "おくれた_ので せんせい_に あやまりました。", "J'étais en retard, alors je me suis excusé auprès du professeur."],
  ["合う", "あう", 4, "aller (bien), convenir", "このくつはサイズが合いません。", "この くつ_は サイズ_が あいません。", "Ces chaussures ne sont pas à ma taille."],
  ["生きる", "いきる", 4, "vivre", "ねこは十五年ぐらい生きます。", "ねこ_は じゅうごねん ぐらい いきます。", "Les chats vivent environ quinze ans."],
  ["急ぐ", "いそぐ", 4, "se dépêcher", "時間がないので急ぎましょう。", "じかん_が ない_ので いそぎましょう。", "On n'a pas le temps, dépêchons-nous."],
  ["祈る", "いのる", 4, "prier ; souhaiter", "みんなの健康を祈ります。", "みんな_の けんこう_を いのります。", "Je souhaite la bonne santé de tout le monde."],
  ["苛める", "いじめる", 4, "maltraiter, harceler", "動物をいじめてはいけません。", "どうぶつ_を いじめて_は いけません。", "Il ne faut pas maltraiter les animaux."],
  ["植える", "うえる", 4, "planter", "にわに木を植えました。", "にわ_に き_を うえました。", "J'ai planté un arbre dans le jardin."],
  ["伺う", "うかがう", 4, "demander ; rendre visite (poli)", "あした先生のお宅に伺います。", "あした せんせい_の おたく_に うかがいます。", "Demain, je rends visite au professeur chez lui."],
  ["受ける", "うける", 4, "passer (un examen) ; recevoir", "来月日本語のしけんを受けます。", "らいげつ にほんご_の しけん_を うけます。", "Le mois prochain, je passe un examen de japonais."],
  ["動く", "うごく", 4, "bouger, fonctionner", "このとけいは動きません。", "この とけい_は うごきません。", "Cette horloge ne marche pas."],
  ["写す", "うつす", 4, "copier ; photographier", "黒板の字をノートに写します。", "こくばん_の じ_を ノート_に うつします。", "Je recopie ce qui est au tableau dans mon cahier."],
  ["移る", "うつる", 4, "déménager, changer (de lieu)", "来年東京に移ります。", "らいねん とうきょう_に うつります。", "L'an prochain, je m'installe à Tokyo."],
  ["打つ", "うつ", 4, "frapper", "ボールをバットで打ちます。", "ボール_を バット_で うちます。", "Je frappe la balle avec la batte."],
  ["選ぶ", "えらぶ", 4, "choisir", "すきな色を選んでください。", "すきな いろ_を えらんで ください。", "Choisis ta couleur préférée."],
  ["起こす", "おこす", 4, "réveiller (quelqu'un)", "あした六時に起こしてください。", "あした ろくじ_に おこして ください。", "Réveille-moi à six heures demain, s'il te plaît."],
  ["行う", "おこなう", 4, "organiser, effectuer (écrit)", "しけんは月曜日に行います。", "しけん_は げつようび_に おこないます。", "L'examen aura lieu lundi."],
  ["怒る", "おこる", 4, "se fâcher", "母はとても怒っています。", "はは_は とても おこって います。", "Ma mère est très fâchée."],
  ["送る", "おくる", 4, "envoyer ; raccompagner", "友だちにメールを送ります。", "ともだち_に メール_を おくります。", "J'envoie un e-mail à un ami."],
  ["遅れる", "おくれる", 4, "être en retard", "電車が十分遅れました。", "でんしゃ_が じゅっぷん おくれました。", "Le train a eu dix minutes de retard."],
  ["落ちる", "おちる", 4, "tomber", "木から葉が落ちます。", "き_から は_が おちます。", "Les feuilles tombent de l'arbre."],
  ["落とす", "おとす", 4, "faire tomber ; perdre", "さいふを落としました。", "さいふ_を おとしました。", "J'ai fait tomber (perdu) mon portefeuille."],
  ["驚く", "おどろく", 4, "être surpris", "そのニュースに驚きました。", "その ニュース_に おどろきました。", "Cette nouvelle m'a surpris."],
  ["踊る", "おどる", 4, "danser", "パーティーでみんなと踊りました。", "パーティー_で みんな_と おどりました。", "J'ai dansé avec tout le monde à la fête."],
  ["思う", "おもう", 4, "penser, croire", "あしたは雨がふると思います。", "あした_は あめ_が ふる_と おもいます。", "Je pense qu'il va pleuvoir demain."],
  ["思い出す", "おもいだす", 4, "se souvenir", "この写真を見ると、子どものころを思い出します。", "この しゃしん_を みる_と、 こども_の ころ_を おもいだします。", "Quand je regarde cette photo, je me souviens de mon enfance."],
  ["折る", "おる", 4, "plier ; casser", "紙をはんぶんに折ってください。", "かみ_を はんぶん_に おって ください。", "Pliez la feuille en deux, s'il vous plaît."],
  ["折れる", "おれる", 4, "se casser, se plier", "強い風で木の枝が折れました。", "つよい かぜ_で き_の えだ_が おれました。", "Une branche s'est cassée à cause du vent fort."],
  ["変える", "かえる", 4, "changer (quelque chose)", "かみの色を変えました。", "かみ_の いろ_を かえました。", "J'ai changé la couleur de mes cheveux."],
  ["飾る", "かざる", 4, "décorer", "へやに花を飾ります。", "へや_に はな_を かざります。", "Je décore la chambre avec des fleurs."],
  ["片付ける", "かたづける", 4, "ranger", "あそんだ後はおもちゃを片付けてね。", "あそんだ あと_は おもちゃ_を かたづけて_ね。", "Après avoir joué, range tes jouets."],
  ["勝つ", "かつ", 4, "gagner", "わたしたちのチームが勝ちました。", "わたしたち_の チーム_が かちました。", "Notre équipe a gagné."],
  ["構う", "かまう", 4, "se soucier de ; déranger", "わたしはかまいません。", "わたし_は かまいません。", "Ça ne me dérange pas."],
  ["噛む", "かむ", 4, "mordre, mâcher", "よく噛んで食べてください。", "よく かんで たべて ください。", "Mâche bien en mangeant."],
  ["通う", "かよう", 4, "fréquenter, faire des allers-retours", "毎日バスで学校に通っています。", "まいにち バス_で がっこう_に かよって います。", "Je vais à l'école en bus tous les jours."],
  ["乾く", "かわく", 4, "sécher", "せんたくものがもう乾きました。", "せんたくもの_が もう かわきました。", "Le linge a déjà séché."],
  ["変わる", "かわる", 4, "changer, se transformer", "町がずいぶん変わりました。", "まち_が ずいぶん かわりました。", "La ville a beaucoup changé."],
  ["考える", "かんがえる", 4, "réfléchir", "よく考えてから答えます。", "よく かんがえて_から こたえます。", "Je réponds après avoir bien réfléchi."],
  ["頑張る", "がんばる", 4, "faire de son mieux", "しけんまで頑張ります。", "しけん_まで がんばります。", "Je vais faire de mon mieux jusqu'à l'examen."],
  ["聞こえる", "きこえる", 4, "s'entendre (être audible)", "となりのへやから音楽が聞こえます。", "となり_の へや_から おんがく_が きこえます。", "On entend de la musique depuis la pièce d'à côté."],
  ["決まる", "きまる", 4, "être décidé", "旅行の日が決まりました。", "りょこう_の ひ_が きまりました。", "La date du voyage est fixée."],
  ["決める", "きめる", 4, "décider", "どこへ行くか決めましょう。", "どこ_へ いく_か きめましょう。", "Décidons où aller."],
  ["比べる", "くらべる", 4, "comparer", "二つのかばんを比べます。", "ふたつ_の かばん_を くらべます。", "Je compare les deux sacs."],
  ["くれる", "くれる", 4, "donner (à moi)", "友だちが本をくれました。", "ともだち_が ほん_を くれました。", "Un ami m'a donné un livre."],
  ["暮れる", "くれる", 4, "tomber (la nuit), finir (l'année)", "冬は日が早く暮れます。", "ふゆ_は ひ_が はやく くれます。", "En hiver, la nuit tombe tôt."],
  ["込む", "こむ", 4, "être bondé", "朝の電車はとても込んでいます。", "あさ_の でんしゃ_は とても こんで います。", "Les trains du matin sont bondés."],
  ["壊す", "こわす", 4, "casser", "弟がおもちゃを壊しました。", "おとうと_が おもちゃ_を こわしました。", "Mon petit frère a cassé un jouet."],
  ["壊れる", "こわれる", 4, "se casser, tomber en panne", "パソコンが壊れました。", "パソコン_が こわれました。", "Mon ordinateur est tombé en panne."],
  ["探す", "さがす", 4, "chercher", "めがねを探しています。", "めがね_を さがして います。", "Je cherche mes lunettes."],
  ["下がる", "さがる", 4, "baisser, descendre", "ねつが下がりました。", "ねつ_が さがりました。", "La fièvre est tombée."],
  ["下げる", "さげる", 4, "baisser (quelque chose)", "音を少し下げてください。", "おと_を すこし さげて ください。", "Baisse un peu le son, s'il te plaît."],
  ["騒ぐ", "さわぐ", 4, "faire du bruit", "図書館で騒がないでください。", "としょかん_で さわがないで ください。", "Ne faites pas de bruit à la bibliothèque."],
  ["触る", "さわる", 4, "toucher", "作品に触らないでください。", "さくひん_に さわらないで ください。", "Ne touchez pas les œuvres, s'il vous plaît."],
  ["叱る", "しかる", 4, "gronder", "先生は学生を叱りました。", "せんせい_は がくせい_を しかりました。", "Le professeur a grondé l'élève."],
  ["調べる", "しらべる", 4, "chercher, vérifier", "分からない言葉をじしょで調べます。", "わからない ことば_を じしょ_で しらべます。", "Je cherche les mots que je ne connais pas dans le dictionnaire."],
  ["知らせる", "しらせる", 4, "informer, prévenir", "結果をメールで知らせます。", "けっか_を メール_で しらせます。", "Je vous préviendrai du résultat par e-mail."],
  ["空く", "すく", 4, "être peu rempli ; avoir faim (お腹が)", "おなかが空きました。", "おなか_が すきました。", "J'ai faim."],
  ["過ぎる", "すぎる", 4, "passer, dépasser", "もう十時を過ぎました。", "もう じゅうじ_を すぎました。", "Il est déjà plus de dix heures."],
  ["進む", "すすむ", 4, "avancer", "まっすぐ進んでください。", "まっすぐ すすんで ください。", "Avancez tout droit, s'il vous plaît."],
  ["滑る", "すべる", 4, "glisser", "雪の日は道が滑ります。", "ゆき_の ひ_は みち_が すべります。", "Les jours de neige, la route est glissante."],
  ["済む", "すむ", 4, "se terminer, être réglé", "しごとがやっと済みました。", "しごと_が やっと すみました。", "Le travail est enfin terminé."],
  ["育てる", "そだてる", 4, "élever, faire pousser", "にわで野菜を育てています。", "にわ_で やさい_を そだてて います。", "Je fais pousser des légumes dans le jardin."],
  ["倒れる", "たおれる", 4, "tomber, s'effondrer", "風で木が倒れました。", "かぜ_で き_が たおれました。", "Un arbre est tombé à cause du vent."],
  ["足す", "たす", 4, "ajouter, additionner", "二に三を足すと五です。", "に_に さん_を たす_と ご です。", "Deux plus trois égalent cinq."],
  ["尋ねる", "たずねる", 4, "demander, s'informer", "駅員に道を尋ねました。", "えきいん_に みち_を たずねました。", "J'ai demandé mon chemin à l'employé de la gare."],
  ["訪ねる", "たずねる", 4, "rendre visite", "週末に祖母を訪ねます。", "しゅうまつ_に そぼ_を たずねます。", "Ce week-end, je rends visite à ma grand-mère."],
  ["建てる", "たてる", 4, "construire", "父は新しい家を建てました。", "ちち_は あたらしい いえ_を たてました。", "Mon père a fait construire une nouvelle maison."],
  ["立てる", "たてる", 4, "dresser ; faire (un projet)", "夏休みの計画を立てます。", "なつやすみ_の けいかく_を たてます。", "Je fais des projets pour les vacances d'été."],
  ["楽しむ", "たのしむ", 4, "profiter, s'amuser", "旅行を楽しんでください。", "りょこう_を たのしんで ください。", "Profitez bien de votre voyage."],
  ["足りる", "たりる", 4, "suffire", "お金が足りません。", "おかね_が たりません。", "Je n'ai pas assez d'argent."],
  ["捕まえる", "つかまえる", 4, "attraper", "子どもがむしを捕まえました。", "こども_が むし_を つかまえました。", "L'enfant a attrapé un insecte."],
  ["点く", "つく", 4, "s'allumer", "へやのでんきが点いています。", "へや_の でんき_が ついて います。", "La lumière de la chambre est allumée."],
  ["漬ける", "つける", 4, "faire tremper, mariner", "野菜をしおに漬けます。", "やさい_を しお_に つけます。", "Je fais mariner les légumes dans le sel."],
  ["伝える", "つたえる", 4, "transmettre (un message)", "田中さんによろしく伝えてください。", "たなかさん_に よろしく つたえて ください。", "Transmettez mes amitiés à M. Tanaka."],
  ["続く", "つづく", 4, "continuer, durer", "雨が三日続いています。", "あめ_が みっか つづいて います。", "Il pleut depuis trois jours."],
  ["続ける", "つづける", 4, "continuer (quelque chose)", "日本語の勉強を続けます。", "にほんご_の べんきょう_を つづけます。", "Je continue d'étudier le japonais."],
  ["包む", "つつむ", 4, "envelopper, emballer", "プレゼントをきれいな紙で包みます。", "プレゼント_を きれいな かみ_で つつみます。", "J'emballe le cadeau dans un joli papier."],
  ["釣る", "つる", 4, "pêcher", "川で魚を釣りました。", "かわ_で さかな_を つりました。", "J'ai pêché un poisson dans la rivière."],
  ["連れる", "つれる", 4, "emmener (quelqu'un)", "犬を連れてさんぽします。", "いぬ_を つれて さんぽ_します。", "Je promène le chien."],
  ["手伝う", "てつだう", 4, "aider", "母の料理を手伝います。", "はは_の りょうり_を てつだいます。", "J'aide ma mère à cuisiner."],
  ["通る", "とおる", 4, "passer (par)", "このバスは駅の前を通ります。", "この バス_は えき_の まえ_を とおります。", "Ce bus passe devant la gare."],
  ["届ける", "とどける", 4, "livrer, apporter", "この荷物を届けてください。", "この にもつ_を とどけて ください。", "Livrez ce colis, s'il vous plaît."],
  ["泊まる", "とまる", 4, "passer la nuit (à l'hôtel…)", "京都のホテルに泊まりました。", "きょうと_の ホテル_に とまりました。", "J'ai dormi dans un hôtel à Kyoto."],
  ["止める", "とめる", 4, "arrêter (quelque chose) ; garer", "ここに車を止めないでください。", "ここ_に くるま_を とめないで ください。", "Ne vous garez pas ici, s'il vous plaît."],
  ["取り替える", "とりかえる", 4, "échanger, remplacer", "このシャツを取り替えてください。", "この シャツ_を とりかえて ください。", "Échangez cette chemise, s'il vous plaît."],
  ["治る", "なおる", 4, "guérir", "かぜが治りました。", "かぜ_が なおりました。", "Mon rhume est guéri."],
  ["直る", "なおる", 4, "être réparé", "テレビが直りました。", "テレビ_が なおりました。", "La télé est réparée."],
  ["直す", "なおす", 4, "réparer ; corriger", "先生が作文を直してくれました。", "せんせい_が さくぶん_を なおして くれました。", "Le professeur a corrigé ma rédaction."],
  ["泣く", "なく", 4, "pleurer", "赤ちゃんが泣いています。", "あかちゃん_が ないて います。", "Le bébé pleure."],
  ["亡くなる", "なくなる", 4, "décéder", "祖父は去年亡くなりました。", "そふ_は きょねん なくなりました。", "Mon grand-père est décédé l'année dernière."],
  ["無くなる", "なくなる", 4, "disparaître, manquer", "冷蔵庫の牛乳が無くなりました。", "れいぞうこ_の ぎゅうにゅう_が なくなりました。", "Il n'y a plus de lait dans le frigo."],
  ["投げる", "なげる", 4, "lancer", "ボールを投げてください。", "ボール_を なげて ください。", "Lance la balle, s'il te plaît."],
  ["鳴る", "なる", 4, "sonner, retentir", "電話が鳴っています。", "でんわ_が なって います。", "Le téléphone sonne."],
  ["慣れる", "なれる", 4, "s'habituer", "日本の生活に慣れました。", "にほん_の せいかつ_に なれました。", "Je me suis habitué(e) à la vie au Japon."],
  ["逃げる", "にげる", 4, "s'enfuir", "ねこが外へ逃げました。", "ねこ_が そと_へ にげました。", "Le chat s'est enfui dehors."],
  ["似る", "にる", 4, "ressembler", "わたしは母に似ています。", "わたし_は はは_に にて います。", "Je ressemble à ma mère."],
  ["盗む", "ぬすむ", 4, "voler (dérober)", "だれかがじてんしゃを盗みました。", "だれか_が じてんしゃ_を ぬすみました。", "Quelqu'un a volé mon vélo."],
  ["塗る", "ぬる", 4, "peindre, étaler", "パンにバターを塗ります。", "パン_に バター_を ぬります。", "J'étale du beurre sur le pain."],
  ["濡れる", "ぬれる", 4, "se mouiller", "雨でふくが濡れました。", "あめ_で ふく_が ぬれました。", "Mes vêtements sont mouillés à cause de la pluie."],
  ["眠る", "ねむる", 4, "dormir", "赤ちゃんがよく眠っています。", "あかちゃん_が よく ねむって います。", "Le bébé dort bien."],
  ["残る", "のこる", 4, "rester", "ケーキが一つ残っています。", "ケーキ_が ひとつ のこって います。", "Il reste un gâteau."],
  ["乗り換える", "のりかえる", 4, "changer (de train, de bus)", "新宿で電車を乗り換えます。", "しんじゅく_で でんしゃ_を のりかえます。", "Je change de train à Shinjuku."],
  ["運ぶ", "はこぶ", 4, "transporter, porter", "この箱を二階へ運んでください。", "この はこ_を にかい_へ はこんで ください。", "Portez cette boîte au premier étage, s'il vous plaît."],
  ["始める", "はじめる", 4, "commencer", "九時に会議を始めます。", "くじ_に かいぎ_を はじめます。", "Je commence la réunion à neuf heures."],
  ["払う", "はらう", 4, "payer", "カードで払ってもいいですか。", "カード_で はらって_も いい です_か。", "Je peux payer par carte ?"],
  ["冷える", "ひえる", 4, "refroidir, se rafraîchir", "ビールがよく冷えています。", "ビール_が よく ひえて います。", "La bière est bien fraîche."],
  ["光る", "ひかる", 4, "briller", "夜空に星が光っています。", "よぞら_に ほし_が ひかって います。", "Les étoiles brillent dans le ciel nocturne."],
  ["引っ越す", "ひっこす", 4, "déménager", "来月大阪に引っ越します。", "らいげつ おおさか_に ひっこします。", "Le mois prochain, je déménage à Osaka."],
  ["びっくりする", "びっくりする", 4, "être surpris", "大きい音にびっくりしました。", "おおきい おと_に びっくり_しました。", "J'ai sursauté à cause d'un grand bruit."],
  ["開く", "ひらく", 4, "ouvrir ; organiser (un événement)", "本の十ページを開いてください。", "ほん_の じゅっページ_を ひらいて ください。", "Ouvrez votre livre à la page dix."],
  ["拾う", "ひろう", 4, "ramasser", "道でさいふを拾いました。", "みち_で さいふ_を ひろいました。", "J'ai ramassé un portefeuille dans la rue."],
  ["増える", "ふえる", 4, "augmenter", "日本に来る旅行者が増えています。", "にほん_に くる りょこうしゃ_が ふえて います。", "Les touristes qui viennent au Japon sont de plus en plus nombreux."],
  ["太る", "ふとる", 4, "grossir", "冬は少し太りました。", "ふゆ_は すこし ふとりました。", "J'ai un peu grossi cet hiver."],
  ["踏む", "ふむ", 4, "marcher sur", "電車で足を踏まれました。", "でんしゃ_で あし_を ふまれました。", "Quelqu'un m'a marché sur le pied dans le train."],
  ["褒める", "ほめる", 4, "féliciter, complimenter", "先生がわたしの絵を褒めました。", "せんせい_が わたし_の え_を ほめました。", "Le professeur a complimenté mon dessin."],
  ["負ける", "まける", 4, "perdre (un match)", "サッカーのしあいで負けました。", "サッカー_の しあい_で まけました。", "On a perdu le match de football."],
  ["間違える", "まちがえる", 4, "se tromper", "電話番号を間違えました。", "でんわばんごう_を まちがえました。", "Je me suis trompé de numéro de téléphone."],
  ["間に合う", "まにあう", 4, "être à temps", "走ったので電車に間に合いました。", "はしった_ので でんしゃ_に まにあいました。", "J'ai couru, alors j'ai eu mon train."],
  ["回る", "まわる", 4, "tourner, faire le tour", "地球は太陽のまわりを回ります。", "ちきゅう_は たいよう_の まわり_を まわります。", "La Terre tourne autour du Soleil."],
  ["回す", "まわす", 4, "faire tourner", "ハンドルを右に回してください。", "ハンドル_を みぎ_に まわして ください。", "Tournez le volant vers la droite."],
  ["下りる", "おりる", 4, "descendre (un escalier, une pente)", "かいだんを下りてください。", "かいだん_を おりて ください。", "Descendez l'escalier, s'il vous plaît."],
  ["見える", "みえる", 4, "se voir, être visible", "ここから富士山が見えます。", "ここ_から ふじさん_が みえます。", "D'ici, on voit le mont Fuji."],
  ["見つかる", "みつかる", 4, "être trouvé", "なくしたかぎが見つかりました。", "なくした かぎ_が みつかりました。", "J'ai retrouvé les clés que j'avais perdues."],
  ["見つける", "みつける", 4, "trouver", "いいレストランを見つけました。", "いい レストラン_を みつけました。", "J'ai trouvé un bon restaurant."],
  ["迎える", "むかえる", 4, "accueillir, aller chercher", "空港へ友だちを迎えに行きます。", "くうこう_へ ともだち_を むかえ_に いきます。", "Je vais chercher un ami à l'aéroport."],
  ["向かう", "むかう", 4, "se diriger vers", "今、駅に向かっています。", "いま、 えき_に むかって います。", "Je suis en route vers la gare."],
  ["戻る", "もどる", 4, "revenir", "五分で戻ります。", "ごふん_で もどります。", "Je reviens dans cinq minutes."],
  ["もらう", "もらう", 4, "recevoir", "たんじょうびに花をもらいました。", "たんじょうび_に はな_を もらいました。", "J'ai reçu des fleurs pour mon anniversaire."],
  ["焼く", "やく", 4, "griller, cuire au four", "魚を焼きます。", "さかな_を やきます。", "Je fais griller du poisson."],
  ["焼ける", "やける", 4, "être grillé, cuit", "パンがおいしく焼けました。", "パン_が おいしく やけました。", "Le pain est bien cuit."],
  ["役に立つ", "やくにたつ", 4, "être utile", "この辞書はとても役に立ちます。", "この じしょ_は とても やく_に たちます。", "Ce dictionnaire est très utile."],
  ["痩せる", "やせる", 4, "maigrir", "毎日走って三キロ痩せました。", "まいにち はしって さんキロ やせました。", "J'ai perdu trois kilos en courant tous les jours."],
  ["止む", "やむ", 4, "cesser (pluie…)", "雨がやっと止みました。", "あめ_が やっと やみました。", "La pluie a enfin cessé."],
  ["止める", "やめる", 4, "arrêter (une habitude), renoncer", "たばこを止めました。", "たばこ_を やめました。", "J'ai arrêté de fumer."],
  ["揺れる", "ゆれる", 4, "trembler, se balancer", "地震で家が揺れました。", "じしん_で いえ_が ゆれました。", "La maison a tremblé à cause du séisme."],
  ["汚れる", "よごれる", 4, "se salir", "シャツがどろで汚れました。", "シャツ_が どろ_で よごれました。", "Ma chemise s'est salie avec de la boue."],
  ["寄る", "よる", 4, "passer (en chemin)", "帰りにコンビニに寄ります。", "かえり_に コンビニ_に よります。", "En rentrant, je passe à la supérette."],
  ["喜ぶ", "よろこぶ", 4, "se réjouir", "プレゼントを見て、母はとても喜びました。", "プレゼント_を みて、 はは_は とても よろこびました。", "En voyant le cadeau, ma mère était ravie."],
  ["沸く", "わく", 4, "bouillir", "お湯が沸きました。", "おゆ_が わきました。", "L'eau bout."],
  ["沸かす", "わかす", 4, "faire bouillir", "お茶のためにお湯を沸かします。", "おちゃ_の ため_に おゆ_を わかします。", "Je fais bouillir de l'eau pour le thé."],
  ["別れる", "わかれる", 4, "se séparer, se quitter", "駅で友だちと別れました。", "えき_で ともだち_と わかれました。", "J'ai quitté mon ami à la gare."],
  ["笑う", "わらう", 4, "rire, sourire", "その話を聞いて、みんな笑いました。", "その はなし_を きいて、 みんな わらいました。", "En entendant cette histoire, tout le monde a ri."],
  ["割れる", "われる", 4, "se briser", "コップが落ちて割れました。", "コップ_が おちて われました。", "Le verre est tombé et s'est brisé."],
];

export const verbs: Verb[] = ROWS.map(([jp, kana, level, meaning, exJp, exKana, exFr], i) => {
  const group = groupOf(jp, kana);
  const masu = masuOf(jp, kana, group);
  const plain = plainOf(jp, kana, group);
  const withRomaji = (f: { jp: string; kana: string }): Form => ({ ...f, romaji: kanaToHepburn(f.kana, { capitalize: false }) });
  return {
    slug: `${kana}-${i}`,
    jp, kana, level: level === 5 ? "N5" : "N4", meaning, group,
    romaji: kanaToHepburn(kana, { capitalize: false, verb: true }),
    masu: { ...masu, romaji: kanaToHepburn(masu.kana, { capitalize: false }) },
    plain: { neg: withRomaji(plain.neg), past: withRomaji(plain.past) },
    te: withRomaji(teOf(plain.past)),
    example: { jp: exJp, kana: displayKana(exKana), romaji: kanaToHepburn(exKana), fr: exFr, tr: verbTr(`${kana}-${i}`)?.example },
    meaningTr: verbTr(`${kana}-${i}`)?.meaning,
  };
});

/** Kana des exemples avec les marques de particule, pour la vérification. */
export const verbExamplesRaw = ROWS.map(([jp, , , , exJp, exKana]) => ({ jp, exJp, exKana }));

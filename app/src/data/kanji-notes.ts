/**
 * Aides à la mémorisation des kanji N5 :
 * - les « sosies » (kanji qui se ressemblent) et ce qui les distingue ;
 * - les lectures qui changent selon le mot (règles et exceptions).
 * Écrit de mémoire : à faire relire par un locuteur natif.
 */

export type LookalikeGroup = {
  /** Phrase qui résume ce qui distingue les kanji du groupe. */
  tip: string;
  /** Pour chaque kanji du groupe : ce qui le caractérise. */
  items: { character: string; hint: string }[];
};

export const LOOKALIKES: LookalikeGroup[] = [
  { tip: "Tout est dans la façon dont les deux traits se touchent.", items: [
    { character: "人", hint: "Le trait de droite s'appuie sur le grand trait de gauche." },
    { character: "入", hint: "Le trait de gauche est court et s'appuie sur celui de droite." },
    { character: "八", hint: "Deux traits séparés, qui ne se touchent pas." },
  ] },
  { tip: "Compte les barres à l'intérieur et regarde le haut.", items: [
    { character: "日", hint: "Un cadre et une seule barre au milieu (4 traits)." },
    { character: "目", hint: "Plus haut et plus étroit, deux barres au milieu (5 traits)." },
    { character: "白", hint: "Comme 日, avec un petit trait penché sur la tête." },
    { character: "百", hint: "Un trait 一 posé sur 白." },
  ] },
  { tip: "Tous partent de l'arbre 木 : regarde ce qu'on lui ajoute.", items: [
    { character: "木", hint: "L'arbre seul." },
    { character: "本", hint: "Un petit trait en bas du tronc : la racine." },
    { character: "休", hint: "Une personne 亻 adossée à l'arbre, à gauche." },
    { character: "来", hint: "Deux petits épis et une barre de plus en haut." },
  ] },
  { tip: "Regarde le haut de la croix.", items: [
    { character: "十", hint: "Une croix simple." },
    { character: "千", hint: "Un trait penché ノ par-dessus la croix." },
    { character: "午", hint: "Un trait penché, puis deux barres horizontales et le trait vertical." },
  ] },
  { tip: "Presque identiques, mais l'ordre des traits et le bas changent.", items: [
    { character: "右", hint: "On commence par ノ, puis 一. En bas, une bouche 口." },
    { character: "左", hint: "On commence par 一, puis ノ. En bas, une équerre 工." },
  ] },
  { tip: "Qu'y a-t-il entre les battants de la porte 門 ?", items: [
    { character: "間", hint: "Un soleil 日 : la lumière passe entre les battants." },
    { character: "聞", hint: "Une oreille 耳 : on écoute derrière la porte." },
  ] },
  { tip: "Regarde le chapeau.", items: [
    { character: "母", hint: "La mère, sans chapeau." },
    { character: "毎", hint: "Un chapeau (ノ et 一) au-dessus de la mère." },
  ] },
  { tip: "Le haut se ressemble, regarde le bas.", items: [
    { character: "東", hint: "Le soleil 日 dans l'arbre 木 : deux jambes qui s'écartent en bas." },
    { character: "車", hint: "Une charrette : pas de jambes, une longue barre verticale qui traverse tout." },
  ] },
  { tip: "Les trois contiennent le soir 夕.", items: [
    { character: "名", hint: "夕 au-dessus d'une bouche 口." },
    { character: "多", hint: "Deux 夕 empilés." },
    { character: "外", hint: "夕 à gauche, et une baguette 卜 à droite." },
  ] },
  { tip: "Une seule barre de différence.", items: [
    { character: "大", hint: "Une personne aux bras ouverts." },
    { character: "天", hint: "Une barre de plus au-dessus de la tête : le ciel." },
  ] },
  { tip: "Le même toit 𠆢, mais pas le même contenu.", items: [
    { character: "今", hint: "Le toit, une barre et un petit crochet." },
    { character: "会", hint: "Le toit, puis deux barres et un petit triangle en bas." },
    { character: "金", hint: "Le toit, puis une croix et deux pépites sur une base." },
  ] },
  { tip: "Un miroir : le trait vertical monte ou descend.", items: [
    { character: "上", hint: "Le trait vertical monte au-dessus du sol." },
    { character: "下", hint: "Le trait vertical descend sous le plafond." },
  ] },
  { tip: "Une montagne ou deux ?", items: [
    { character: "山", hint: "Une seule montagne (3 traits)." },
    { character: "出", hint: "Deux montagnes empilées, traversées par un trait vertical (5 traits)." },
  ] },
  { tip: "Le même cadre, avec ou sans quelque chose dedans.", items: [
    { character: "口", hint: "Un cadre vide (3 traits)." },
    { character: "四", hint: "Le cadre avec deux jambes dedans (5 traits)." },
    { character: "国", hint: "Le cadre avec un trésor 玉 dedans (8 traits)." },
  ] },
  { tip: "La femme seule, ou sous un toit.", items: [
    { character: "女", hint: "La femme seule." },
    { character: "安", hint: "La femme sous un toit 宀 : tranquille." },
  ] },
];

export type ContextReading = {
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  /** Lecture irrégulière ou changement de son à retenir. */
  special?: string;
};

export type ReadingNote = { rule: string; items: ContextReading[] };

const c = (word: string, reading: string, romaji: string, meaning: string, special?: string): ContextReading => ({ word, reading, romaji, meaning, special });

export const READINGS: Record<string, ReadingNote> = {
  "一": { rule: "いち dans les nombres et les mots composés, ひと pour compter les objets et les personnes. Devant certains sons, いち devient いっ.", items: [
    c("一月", "いちがつ", "ichigatsu", "janvier"), c("一つ", "ひとつ", "hitotsu", "un (objet)"), c("一人", "ひとり", "hitori", "une personne", "lecture spéciale"),
    c("一分", "いっぷん", "ippun", "une minute", "いち devient いっ, ふん devient ぷん"), c("一日", "ついたち", "tsuitachi", "le 1er du mois", "lecture spéciale ; いちにち veut dire « une journée »") ] },
  "二": { rule: "に dans les nombres, ふた pour compter les objets et les personnes.", items: [
    c("二月", "にがつ", "nigatsu", "février"), c("二つ", "ふたつ", "futatsu", "deux (objets)"), c("二人", "ふたり", "futari", "deux personnes", "lecture spéciale"),
    c("二日", "ふつか", "futsuka", "le 2 du mois", "lecture spéciale"), c("二十日", "はつか", "hatsuka", "le 20 du mois", "lecture spéciale") ] },
  "三": { rule: "さん dans les nombres, み pour compter les objets. Le son qui suit さん change souvent.", items: [
    c("三月", "さんがつ", "sangatsu", "mars"), c("三つ", "みっつ", "mittsu", "trois (objets)"), c("三日", "みっか", "mikka", "le 3 du mois"),
    c("三百", "さんびゃく", "sanbyaku", "trois cents", "ひゃく devient びゃく"), c("三千", "さんぜん", "sanzen", "trois mille", "せん devient ぜん"), c("三分", "さんぷん", "sanpun", "trois minutes", "ふん devient ぷん") ] },
  "四": { rule: "よん est la lecture courante (し sonne comme « mort »). Mais on dit し pour avril, et よ pour l'heure et les personnes.", items: [
    c("四つ", "よっつ", "yottsu", "quatre (objets)"), c("四月", "しがつ", "shigatsu", "avril", "し"), c("四時", "よじ", "yoji", "quatre heures", "よ, pas よん"),
    c("四人", "よにん", "yonin", "quatre personnes", "よ, pas よん"), c("四日", "よっか", "yokka", "le 4 du mois", "lecture spéciale") ] },
  "六": { rule: "ろく dans les nombres, む pour compter les objets. Devant certains sons, ろく devient ろっ.", items: [
    c("六つ", "むっつ", "muttsu", "six (objets)"), c("六百", "ろっぴゃく", "roppyaku", "six cents", "ろっ + ぴゃく"), c("六分", "ろっぷん", "roppun", "six minutes", "ろっ + ぷん"),
    c("六日", "むいか", "muika", "le 6 du mois", "lecture spéciale") ] },
  "七": { rule: "なな et しち sont toutes deux courantes. On dit しち pour juillet et sept heures, なな ailleurs le plus souvent.", items: [
    c("七つ", "ななつ", "nanatsu", "sept (objets)"), c("七月", "しちがつ", "shichigatsu", "juillet", "しち"), c("七時", "しちじ", "shichiji", "sept heures", "しち"),
    c("七百", "ななひゃく", "nanahyaku", "sept cents"), c("七日", "なのか", "nanoka", "le 7 du mois", "lecture spéciale") ] },
  "八": { rule: "はち dans les nombres, や pour compter les objets. Devant certains sons, はち devient はっ.", items: [
    c("八つ", "やっつ", "yattsu", "huit (objets)"), c("八百", "はっぴゃく", "happyaku", "huit cents", "はっ + ぴゃく"), c("八千", "はっせん", "hassen", "huit mille", "はっ"),
    c("八日", "ようか", "yōka", "le 8 du mois", "lecture spéciale"), c("八百屋", "やおや", "yaoya", "le marchand de légumes", "lecture spéciale") ] },
  "九": { rule: "きゅう est la lecture courante, mais on dit く pour septembre et neuf heures.", items: [
    c("九つ", "ここのつ", "kokonotsu", "neuf (objets)"), c("九月", "くがつ", "kugatsu", "septembre", "く"), c("九時", "くじ", "kuji", "neuf heures", "く"),
    c("九百", "きゅうひゃく", "kyūhyaku", "neuf cents"), c("九日", "ここのか", "kokonoka", "le 9 du mois", "lecture spéciale") ] },
  "十": { rule: "じゅう dans les nombres, とお pour compter les objets. Devant certains sons, じゅう devient じゅっ.", items: [
    c("十月", "じゅうがつ", "jūgatsu", "octobre"), c("十", "とお", "tō", "dix (objets)"), c("十分", "じゅっぷん", "juppun", "dix minutes", "じゅっ + ぷん ; on entend aussi じっぷん"),
    c("十日", "とおか", "tōka", "le 10 du mois", "lecture spéciale") ] },
  "百": { rule: "ひゃく, qui devient びゃく ou ぴゃく après certains nombres.", items: [
    c("百", "ひゃく", "hyaku", "cent"), c("三百", "さんびゃく", "sanbyaku", "trois cents", "びゃく"), c("六百", "ろっぴゃく", "roppyaku", "six cents", "ぴゃく"), c("八百", "はっぴゃく", "happyaku", "huit cents", "ぴゃく") ] },
  "千": { rule: "せん, qui devient ぜん après 三.", items: [
    c("千", "せん", "sen", "mille"), c("三千", "さんぜん", "sanzen", "trois mille", "ぜん"), c("八千", "はっせん", "hassen", "huit mille", "はっ") ] },
  "日": { rule: "Seul : ひ (le soleil, le jour). Dans les mots composés : にち ou じつ. Pour compter les jours : か. Les dates du mois sont presque toutes irrégulières.", items: [
    c("日", "ひ", "hi", "le soleil, le jour"), c("毎日", "まいにち", "mainichi", "chaque jour"), c("日曜日", "にちようび", "nichiyōbi", "dimanche", "にち et び dans le même mot"),
    c("日本", "にほん", "Nihon", "le Japon", "seulement に"), c("休日", "きゅうじつ", "kyūjitsu", "le jour de congé", "じつ"), c("三日", "みっか", "mikka", "le 3 du mois", "か"),
    c("今日", "きょう", "kyō", "aujourd'hui", "lecture spéciale, se lit d'un bloc") ] },
  "月": { rule: "Seul : つき (la lune). Pour les mois de l'année : がつ. Pour une durée en mois et dans les composés : げつ.", items: [
    c("月", "つき", "tsuki", "la lune"), c("一月", "いちがつ", "ichigatsu", "janvier", "がつ = nom du mois"), c("一か月", "いっかげつ", "ikkagetsu", "(durée d')un mois", "げつ = durée"),
    c("月曜日", "げつようび", "getsuyōbi", "lundi"), c("今月", "こんげつ", "kongetsu", "ce mois-ci") ] },
  "人": { rule: "Seul : ひと. Après un pays : じん (la nationalité). Pour compter : にん, sauf pour une et deux personnes.", items: [
    c("人", "ひと", "hito", "la personne"), c("日本人", "にほんじん", "nihonjin", "un Japonais", "じん = nationalité"), c("三人", "さんにん", "sannin", "trois personnes", "にん = compteur"),
    c("一人", "ひとり", "hitori", "une personne, seul", "lecture spéciale"), c("二人", "ふたり", "futari", "deux personnes", "lecture spéciale"), c("大人", "おとな", "otona", "l'adulte", "lecture spéciale") ] },
  "生": { rule: "Le kanji aux nombreuses lectures : せい et しょう dans les composés, い・きる (vivre), う・まれる (naître), なま (cru).", items: [
    c("先生", "せんせい", "sensei", "le professeur"), c("学生", "がくせい", "gakusei", "l'étudiant"), c("一生", "いっしょう", "isshō", "toute la vie", "しょう"),
    c("生きる", "いきる", "ikiru", "vivre"), c("生まれる", "うまれる", "umareru", "naître"), c("生ビール", "なまビール", "nama bīru", "la bière pression", "なま = cru, frais") ] },
  "分": { rule: "Avec des hiragana : わ・かる (comprendre). Pour les minutes : ふん ou ぷん selon le nombre. Ailleurs : ぶん.", items: [
    c("分かる", "わかる", "wakaru", "comprendre"), c("五分", "ごふん", "gofun", "cinq minutes", "ふん"), c("一分", "いっぷん", "ippun", "une minute", "ぷん"),
    c("自分", "じぶん", "jibun", "soi-même", "ぶん"), c("半分", "はんぶん", "hanbun", "la moitié"), c("多分", "たぶん", "tabun", "peut-être") ] },
  "上": { rule: "Seul : うえ. Avec des hiragana : あ・がる, のぼ・る. Dans les composés : じょう.", items: [
    c("上", "うえ", "ue", "le dessus"), c("上がる", "あがる", "agaru", "monter"), c("上る", "のぼる", "noboru", "grimper"), c("上手", "じょうず", "jōzu", "habile") ] },
  "下": { rule: "Seul : した. Avec des hiragana : さ・がる, くだ・さい. Dans les composés : か ou げ.", items: [
    c("下", "した", "shita", "le dessous"), c("下さい", "ください", "kudasai", "donnez-moi, s'il vous plaît"), c("下がる", "さがる", "sagaru", "descendre, baisser"),
    c("地下鉄", "ちかてつ", "chikatetsu", "le métro", "か"), c("下手", "へた", "heta", "maladroit", "lecture spéciale") ] },
  "大": { rule: "Avec des hiragana : おお・きい. Dans les composés : だい ou たい.", items: [
    c("大きい", "おおきい", "ōkii", "grand"), c("大学", "だいがく", "daigaku", "l'université", "だい"), c("大変", "たいへん", "taihen", "difficile, terrible", "たい"),
    c("大人", "おとな", "otona", "l'adulte", "lecture spéciale") ] },
  "小": { rule: "Avec des hiragana : ちい・さい. Devant un nom : こ ou お. Dans les composés : しょう.", items: [
    c("小さい", "ちいさい", "chiisai", "petit"), c("小学校", "しょうがっこう", "shōgakkō", "l'école primaire", "しょう"), c("小鳥", "ことり", "kotori", "le petit oiseau", "こ"), c("小川", "おがわ", "ogawa", "le ruisseau", "お") ] },
  "中": { rule: "Seul : なか. Dans les composés : ちゅう. Après une durée : じゅう (« tout au long de »).", items: [
    c("中", "なか", "naka", "l'intérieur"), c("中国", "ちゅうごく", "Chūgoku", "la Chine"), c("一日中", "いちにちじゅう", "ichinichijū", "toute la journée", "じゅう") ] },
  "今": { rule: "Seul : いま. Dans les composés : こん. Plusieurs mots du quotidien ont une lecture spéciale.", items: [
    c("今", "いま", "ima", "maintenant"), c("今月", "こんげつ", "kongetsu", "ce mois-ci", "こん"), c("今日", "きょう", "kyō", "aujourd'hui", "lecture spéciale"),
    c("今年", "ことし", "kotoshi", "cette année", "lecture spéciale"), c("今朝", "けさ", "kesa", "ce matin", "lecture spéciale") ] },
  "年": { rule: "Seul : とし. Dans les composés et avec les nombres : ねん.", items: [
    c("年", "とし", "toshi", "l'année, l'âge"), c("来年", "らいねん", "rainen", "l'année prochaine"), c("去年", "きょねん", "kyonen", "l'année dernière"),
    c("今年", "ことし", "kotoshi", "cette année", "lecture spéciale") ] },
  "金": { rule: "Seul ou avec お : かね (l'argent). Dans les composés : きん.", items: [
    c("お金", "おかね", "okane", "l'argent"), c("金曜日", "きんようび", "kin'yōbi", "vendredi"), c("金色", "きんいろ", "kin'iro", "la couleur or"), c("金持ち", "かねもち", "kanemochi", "riche") ] },
  "何": { rule: "なに en général, なん devant un compteur ou un son t, d, n.", items: [
    c("何", "なに", "nani", "quoi"), c("何時", "なんじ", "nanji", "quelle heure", "なん"), c("何人", "なんにん", "nannin", "combien de personnes", "なん"), c("何ですか", "なんですか", "nan desu ka", "qu'est-ce que c'est ?", "なん devant で") ] },
  "本": { rule: "ほん, qui devient ぽん ou ぼん pour compter les objets longs (stylos, bouteilles).", items: [
    c("本", "ほん", "hon", "le livre"), c("日本", "にほん", "Nihon", "le Japon"), c("一本", "いっぽん", "ippon", "un (objet long)", "ぽん"),
    c("三本", "さんぼん", "sanbon", "trois (objets longs)", "ぼん") ] },
  "入": { rule: "Avec des hiragana : はい・る (entrer), い・れる (mettre dedans). Dans les composés : にゅう.", items: [
    c("入る", "はいる", "hairu", "entrer"), c("入れる", "いれる", "ireru", "mettre dedans"), c("入口", "いりぐち", "iriguchi", "l'entrée", "いり"), c("入学", "にゅうがく", "nyūgaku", "l'entrée à l'école", "にゅう") ] },
  "出": { rule: "Avec des hiragana : で・る (sortir), だ・す (sortir quelque chose). Dans les composés : しゅつ ou しゅっ.", items: [
    c("出る", "でる", "deru", "sortir"), c("出す", "だす", "dasu", "sortir (quelque chose), envoyer"), c("出口", "でぐち", "deguchi", "la sortie", "で"), c("出発", "しゅっぱつ", "shuppatsu", "le départ", "しゅっ") ] },
  "後": { rule: "うし・ろ (derrière), あと (après), ご ou こう dans les composés.", items: [
    c("後ろ", "うしろ", "ushiro", "derrière"), c("後で", "あとで", "ato de", "plus tard"), c("午後", "ごご", "gogo", "l'après-midi", "ご") ] },
  "時": { rule: "Seul : とき (le moment). Pour l'heure et dans les composés : じ.", items: [
    c("時", "とき", "toki", "le moment, quand"), c("三時", "さんじ", "sanji", "trois heures"), c("時間", "じかん", "jikan", "le temps, l'heure"), c("時計", "とけい", "tokei", "la montre, l'horloge", "lecture spéciale") ] },
  "外": { rule: "Seul : そと (dehors) ou ほか (autre). Dans les composés : がい.", items: [
    c("外", "そと", "soto", "dehors"), c("外国", "がいこく", "gaikoku", "l'étranger (pays)", "がい"), c("外に", "ほかに", "hoka ni", "à part ça, autre chose", "ほか") ] },
  "気": { rule: "き dans presque tous les mots. Attention au sens qui change avec le mot qui l'accompagne.", items: [
    c("元気", "げんき", "genki", "en forme"), c("天気", "てんき", "tenki", "le temps (météo)"), c("気分", "きぶん", "kibun", "l'humeur"), c("人気", "にんき", "ninki", "la popularité", "人 se lit にん ici") ] },
  "行": { rule: "Avec des hiragana : い・く (aller). Dans les composés : こう ou ぎょう.", items: [
    c("行く", "いく", "iku", "aller"), c("銀行", "ぎんこう", "ginkō", "la banque", "こう"), c("旅行", "りょこう", "ryokō", "le voyage", "こう"), c("一行", "いちぎょう", "ichigyō", "une ligne (de texte)", "ぎょう") ] },
};

/** Groupes de sosies qui contiennent ce kanji. */
export function lookalikesOf(character: string): LookalikeGroup[] {
  return LOOKALIKES.filter((g) => g.items.some((i) => i.character === character));
}

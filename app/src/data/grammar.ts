import type { Block, Example, GrammarPoint, Segment } from "@/domain/grammar";

/**
 * Grammaire N5 : une leçon de fond sur la structure de la phrase, puis une fiche par point.
 * Exemples en kana avec espaces entre les groupes, comme dans les manuels pour débutants.
 * Les rōmaji des exemples sont vérifiés par `npm run check`.
 */

const p = (text: string): Block => ({ type: "p", text });
const h = (text: string): Block => ({ type: "h", text });
const tip = (text: string): Block => ({ type: "tip", text });
const warn = (text: string): Block => ({ type: "warning", text });
const ex = (jp: string, romaji: string, fr: string, kana?: string, note?: string): Block => ({ type: "example", example: { jp, romaji, fr, kana, note } as Example });
const table = (head: string[], rows: string[][]): Block => ({ type: "table", head, rows });
const s = (jp: string, romaji: string, role: Segment["role"], fr: string, kana?: string): Segment => ({ jp, romaji, role, fr, kana });
const diagram = (caption: string, fr: string, segments: Segment[]): Block => ({ type: "diagram", caption, fr, segments });

export const grammar: GrammarPoint[] = [
  {
    slug: "structure-de-la-phrase",
    title: "La structure de la phrase japonaise",
    jp: "文の形",
    category: "fondations",
    summary: "La leçon à lire avant tout texte : le verbe à la fin, les particules qui donnent le rôle de chaque mot, ce qui disparaît et ce qui change de place.",
    body: [
      h("1. Le verbe toujours à la fin"),
      p("En français, on dit sujet, verbe, complément : « Je mange du pain ». En japonais, le verbe (ou です, « c'est ») vient toujours en dernier. On dit littéralement : « Moi, du pain, mange »."),
      diagram("Une phrase simple", "Je mange du pain.", [
        s("わたしは", "watashi wa", "theme", "moi (thème)"),
        s("パンを", "pan o", "object", "du pain (objet)"),
        s("たべます", "tabemasu", "verb", "mange"),
      ]),
      tip("Pour lire une phrase, regarde d'abord la fin : c'est là que se trouvent l'action, le temps (passé ou non), la négation et la question."),

      h("2. Les particules : une étiquette après chaque mot"),
      p("Le rôle d'un mot ne dépend pas de sa place, mais de la petite particule écrite juste après lui : は pour le thème, を pour l'objet, に pour le moment ou la destination, で pour le lieu où l'on fait quelque chose… Ce sont des étiquettes collées derrière les mots."),
      diagram("Chaque groupe se termine par sa particule", "Dimanche, j'ai joué au tennis au parc avec un ami.", [
        s("日曜日に", "nichiyōbi ni", "time", "dimanche (moment)", "にちようびに"),
        s("友だちと", "tomodachi to", "partner", "avec un ami", "ともだちと"),
        s("公園で", "kōen de", "place", "au parc (lieu de l'action)", "こうえんで"),
        s("テニスを", "tenisu o", "object", "le tennis (objet)"),
        s("しました", "shimashita", "verb", "ai fait (joué)"),
      ]),
      p("Grâce aux particules, l'ordre des groupes est assez libre : on peut commencer par 友だちと ou par 公園で sans changer le sens. Une seule règle ne bouge jamais : le verbe reste à la fin."),
      p("L'ordre le plus naturel est : thème, moment, lieu, personne, objet, verbe."),

      h("3. Le thème は : « quant à… »"),
      p("は (prononcé « wa ») annonce de quoi on parle. Il ressemble au sujet, mais veut plutôt dire « en ce qui concerne… »."),
      ex("わたしは がくせいです。", "Watashi wa gakusei desu.", "Je suis étudiant(e). (Littéralement : « Quant à moi, étudiant. »)"),
      p("Quand le thème est évident, on le supprime. Le japonais omet très souvent « je », « tu » ou « il »."),
      ex("がくせいです。", "Gakusei desu.", "(Je) suis étudiant(e)."),
      warn("Une phrase sans sujet n'est pas une faute : c'est la norme. Devine le sujet d'après le contexte."),

      h("4. Trois types de phrases"),
      table(["Type", "Modèle", "Exemple", "Sens"], [
        ["Avec un nom", "A は B です", "これは ほんです。", "C'est un livre."],
        ["Avec un adjectif", "A は adjectif です", "この ほんは たかいです。", "Ce livre est cher."],
        ["Avec un verbe", "A は … verbe", "わたしは ほんを よみます。", "Je lis un livre."],
      ]),

      h("5. Ce qui décrit vient avant ce qui est décrit"),
      p("Tout ce qui précise un nom se place avant lui : l'adjectif, le possesseur avec の, et même une phrase entière."),
      ex("あかい くるま", "akai kuruma", "une voiture rouge"),
      ex("にほんの くるま", "nihon no kuruma", "une voiture japonaise (« du Japon »)"),
      ex("ちちが かった くるま", "chichi ga katta kuruma", "la voiture que mon père a achetée"),
      tip("Une longue suite de mots avant un nom ? C'est une relative (« que… », « qui… ») : lis-la après le nom, en français."),

      h("6. La fin du verbe dit tout"),
      table(["Forme", "Exemple", "Sens"], [
        ["Présent ou futur", "たべます", "je mange, je mangerai"],
        ["Négatif", "たべません", "je ne mange pas"],
        ["Passé", "たべました", "j'ai mangé"],
        ["Passé négatif", "たべませんでした", "je n'ai pas mangé"],
      ]),
      p("Il n'y a pas de futur à part : たべます veut dire « je mange » ou « je mangerai », selon le contexte."),

      h("7. Une question ? Ajoute か"),
      p("Pas d'inversion comme en français : on garde la phrase telle quelle et on ajoute か à la fin."),
      ex("がくせいですか。", "Gakusei desu ka.", "Es-tu étudiant(e) ?"),

      h("8. Ce qui n'existe pas en japonais"),
      p("Pas d'article (le, un), pas de pluriel (ほん veut dire « un livre » ou « des livres »), pas de genre, et le verbe ne change pas selon la personne : たべます vaut pour je, tu, il, nous…"),

      h("9. La méthode pour lire une phrase"),
      p("Un : trouve la fin, le verbe ou です, et sa forme (passé, négatif, question). Deux : repère les particules, chacune ferme un groupe et dit son rôle. Trois : lis les groupes dans l'ordre et reconstruis la phrase en français."),
      diagram("À toi : lis les groupes, puis la fin", "Hier, j'ai rencontré un ami à la gare.", [
        s("きのう", "kinō", "time", "hier"),
        s("わたしは", "watashi wa", "theme", "moi (thème)"),
        s("えきで", "eki de", "place", "à la gare"),
        s("ともだちに", "tomodachi ni", "partner", "un ami (personne rencontrée)"),
        s("あいました", "aimashita", "verb", "ai rencontré"),
      ]),
    ],
  },

  /* ------------------------------- Particules ------------------------------- */
  {
    slug: "wa", title: "Le thème", jp: "は", category: "particules",
    summary: "Annonce de quoi parle la phrase : « quant à… ».",
    body: [
      p("は marque le thème : ce dont on parle, souvent déjà connu. Il se place juste après le mot."),
      warn("は s'écrit avec le hiragana « ha », mais se prononce « wa » quand c'est une particule."),
      ex("わたしは マリーです。", "Watashi wa Marī desu.", "Je m'appelle Marie. (« Quant à moi, Marie. »)"),
      ex("これは わたしの ほんです。", "Kore wa watashi no hon desu.", "C'est mon livre."),
      ex("きょうは さむいです。", "Kyō wa samui desu.", "Aujourd'hui, il fait froid."),
      tip("Pour la différence entre は et が, voir la fiche が."),
    ],
  },
  {
    slug: "ga", title: "Le sujet", jp: "が", category: "particules",
    summary: "Met en avant qui fait l'action ou ce qui existe : l'information nouvelle.",
    body: [
      p("が marque le sujet quand on veut le mettre en avant, ou quand c'est une information nouvelle. On le trouve aussi avec あります et います (« il y a »)."),
      ex("ねこが います。", "Neko ga imasu.", "Il y a un chat."),
      ex("だれが きましたか。", "Dare ga kimashita ka.", "Qui est venu ?"),
      ex("やまださんが きました。", "Yamada-san ga kimashita.", "C'est M. Yamada qui est venu."),
      table(["は", "が"], [
        ["Ce dont on parle (déjà connu)", "Ce qu'on met en avant (nouveau)"],
        ["わたしは がくせいです。« Moi, je suis étudiant. »", "わたしが がくせいです。« C'est moi, l'étudiant. »"],
      ]),
      tip("Après un mot interrogatif (だれ, なに, どこ…), on met toujours が, jamais は."),
    ],
  },
  {
    slug: "o", title: "L'objet", jp: "を", category: "particules",
    summary: "Marque ce sur quoi porte l'action : ce qu'on mange, lit, achète…",
    body: [
      p("を se place après l'objet direct du verbe."),
      warn("を se prononce « o ». On ne l'utilise que comme particule."),
      ex("パンを たべます。", "Pan o tabemasu.", "Je mange du pain."),
      ex("ほんを よみます。", "Hon o yomimasu.", "Je lis un livre."),
      ex("みずを のみます。", "Mizu o nomimasu.", "Je bois de l'eau."),
    ],
  },
  {
    slug: "ni", title: "Le moment, la destination, l'endroit où l'on est", jp: "に", category: "particules",
    summary: "Une particule à plusieurs usages : l'heure précise, l'endroit où l'on va, où l'on se trouve, et à qui l'on donne.",
    body: [
      table(["Usage", "Exemple", "Sens"], [
        ["Moment précis", "しちじに おきます。", "Je me lève à 7 heures."],
        ["Destination", "がっこうに いきます。", "Je vais à l'école."],
        ["Lieu où l'on se trouve", "へやに ねこが います。", "Il y a un chat dans la chambre."],
        ["Destinataire", "ともだちに てがみを かきます。", "J'écris une lettre à un ami."],
      ]),
      ex("七時に おきます。", "Shichiji ni okimasu.", "Je me lève à 7 heures.", "しちじに おきます。"),
      ex("がっこうに いきます。", "Gakkō ni ikimasu.", "Je vais à l'école."),
      ex("へやに ねこが います。", "Heya ni neko ga imasu.", "Il y a un chat dans la chambre."),
      tip("Pas de に avec les moments relatifs : きょう (aujourd'hui), あした (demain), まいにち (chaque jour)."),
    ],
  },
  {
    slug: "e", title: "La direction", jp: "へ", category: "particules",
    summary: "« Vers » : la direction d'un déplacement.",
    body: [
      p("へ indique la direction, avec les verbes de mouvement (aller, venir, rentrer). Il est souvent interchangeable avec に."),
      warn("へ s'écrit avec le hiragana « he », mais se prononce « e » quand c'est une particule."),
      ex("日本へ いきます。", "Nihon e ikimasu.", "Je vais au Japon.", "にほんへ いきます。"),
      ex("うちへ かえります。", "Uchi e kaerimasu.", "Je rentre à la maison."),
    ],
  },
  {
    slug: "de", title: "Le lieu de l'action, le moyen", jp: "で", category: "particules",
    summary: "Où l'action se passe, ou avec quoi on la fait.",
    body: [
      ex("としょかんで べんきょうします。", "Toshokan de benkyō shimasu.", "J'étudie à la bibliothèque."),
      ex("バスで いきます。", "Basu de ikimasu.", "J'y vais en bus."),
      ex("はしで たべます。", "Hashi de tabemasu.", "Je mange avec des baguettes."),
      warn("に ou で ? に = l'endroit où l'on est ou où l'on va. で = l'endroit où l'on fait quelque chose. へやに います (je suis dans la chambre), mais へやで べんきょうします (j'étudie dans la chambre)."),
    ],
  },
  {
    slug: "to", title: "« Et », « avec »", jp: "と", category: "particules",
    summary: "Relie des noms dans une liste complète, ou indique avec qui on fait quelque chose.",
    body: [
      ex("パンと たまごを たべます。", "Pan to tamago o tabemasu.", "Je mange du pain et des œufs."),
      ex("ともだちと えいがを みます。", "Tomodachi to eiga o mimasu.", "Je regarde un film avec un ami."),
      tip("と ne relie que des noms, jamais deux phrases."),
    ],
  },
  {
    slug: "mo", title: "« Aussi »", jp: "も", category: "particules",
    summary: "« Aussi », « non plus » : remplace は, が ou を.",
    body: [
      ex("わたしも がくせいです。", "Watashi mo gakusei desu.", "Moi aussi, je suis étudiant(e)."),
      ex("コーヒーも のみます。", "Kōhī mo nomimasu.", "Je bois aussi du café."),
      tip("Avec un verbe négatif, も veut dire « non plus » : わたしも いきません (moi non plus, je n'y vais pas)."),
    ],
  },
  {
    slug: "no", title: "Le lien entre deux noms", jp: "の", category: "particules",
    summary: "« A の B » = « le B de A » : possession, origine, sujet.",
    body: [
      ex("わたしの ほん", "watashi no hon", "mon livre (« le livre de moi »)"),
      ex("にほんごの せんせい", "nihongo no sensei", "le professeur de japonais"),
      ex("にほんの くるま", "nihon no kuruma", "une voiture japonaise"),
      tip("L'ordre est inversé par rapport au français : le possesseur vient en premier."),
    ],
  },
  {
    slug: "ka", title: "La question", jp: "か", category: "particules",
    summary: "Ajoutée à la fin, elle transforme la phrase en question.",
    body: [
      ex("がくせいですか。", "Gakusei desu ka.", "Es-tu étudiant(e) ?"),
      ex("なにを たべますか。", "Nani o tabemasu ka.", "Qu'est-ce que tu manges ?"),
      tip("En japonais écrit, on met souvent un point (。) après か, pas de point d'interrogation."),
    ],
  },
  {
    slug: "ne-yo", title: "« N'est-ce pas ? » et « tu sais ! »", jp: "ね・よ", category: "particules",
    summary: "Deux particules de fin de phrase : ね cherche l'accord, よ apporte une information.",
    body: [
      ex("いい てんきですね。", "Ii tenki desu ne.", "Il fait beau, n'est-ce pas ?"),
      ex("この ラーメンは おいしいですよ。", "Kono rāmen wa oishii desu yo.", "Ces ramen sont délicieux, tu sais !"),
    ],
  },

  /* ------------------------------- Phrases ------------------------------- */
  {
    slug: "desu", title: "« C'est »", jp: "です", category: "phrases",
    summary: "Termine poliment une phrase avec un nom ou un adjectif.",
    body: [
      table(["Forme", "Exemple", "Sens"], [
        ["Présent", "がくせいです", "je suis étudiant(e)"],
        ["Négatif", "がくせいじゃありません", "je ne suis pas étudiant(e)"],
        ["Passé", "がくせいでした", "j'étais étudiant(e)"],
        ["Passé négatif", "がくせいじゃありませんでした", "je n'étais pas étudiant(e)"],
      ]),
      ex("わたしは がくせいじゃありません。", "Watashi wa gakusei ja arimasen.", "Je ne suis pas étudiant(e)."),
      tip("じゃありません est la forme parlée. À l'écrit, on trouve ではありません."),
    ],
  },
  {
    slug: "arimasu-imasu", title: "« Il y a » : あります et います", jp: "あります・います", category: "phrases",
    summary: "あります pour les objets et les plantes, います pour les êtres vivants qui bougent.",
    body: [
      ex("つくえの うえに ほんが あります。", "Tsukue no ue ni hon ga arimasu.", "Il y a un livre sur le bureau."),
      ex("こうえんに こどもが います。", "Kōen ni kodomo ga imasu.", "Il y a des enfants au parc."),
      p("Le modèle : lieu に + chose が + あります ou います."),
    ],
  },
  {
    slug: "kosoado", title: "Ceci, cela, là-bas : こ・そ・あ・ど", jp: "これ・それ・あれ・どれ", category: "mots",
    summary: "Une famille de mots rangée par distance : près de moi, près de toi, loin des deux, et la question.",
    body: [
      table(["", "こ (près de moi)", "そ (près de toi)", "あ (loin)", "ど (question)"], [
        ["Chose", "これ", "それ", "あれ", "どれ"],
        ["Devant un nom", "この", "その", "あの", "どの"],
        ["Lieu", "ここ", "そこ", "あそこ", "どこ"],
      ]),
      ex("これは なんですか。", "Kore wa nan desu ka.", "Qu'est-ce que c'est ?"),
      ex("トイレは どこですか。", "Toire wa doko desu ka.", "Où sont les toilettes ?"),
      warn("この, その, あの, どの sont toujours suivis d'un nom : この ほん (ce livre)."),
    ],
  },

  /* ------------------------------- Verbes ------------------------------- */
  {
    slug: "masu", title: "Le verbe poli en ます", jp: "ます", category: "verbes",
    summary: "La forme polie de tous les verbes : présent, négatif, passé, passé négatif.",
    body: [
      table(["Forme", "たべる (manger)", "いく (aller)", "する (faire)"], [
        ["Présent ou futur", "たべます", "いきます", "します"],
        ["Négatif", "たべません", "いきません", "しません"],
        ["Passé", "たべました", "いきました", "しました"],
        ["Passé négatif", "たべませんでした", "いきませんでした", "しませんでした"],
      ]),
      ex("あした 東京に いきます。", "Ashita Tōkyō ni ikimasu.", "Demain, je vais à Tokyo.", "あした とうきょうに いきます。"),
      ex("きのう テレビを みませんでした。", "Kinō terebi o mimasen deshita.", "Hier, je n'ai pas regardé la télé."),
    ],
  },
  {
    slug: "masenka-mashou", title: "Proposer : ませんか et ましょう", jp: "ませんか・ましょう", category: "verbes",
    summary: "Inviter quelqu'un (« et si on… ? ») et proposer de faire ensemble (« faisons… ! »).",
    body: [
      ex("いっしょに たべませんか。", "Issho ni tabemasen ka.", "Et si on mangeait ensemble ?", undefined, "Négatif + か : une invitation polie, pas une vraie négation."),
      ex("たべましょう！", "Tabemashō!", "Mangeons !"),
      tip("On répond souvent à ませんか par ええ、〜ましょう (« oui, faisons-le »)."),
    ],
  },

  {
    slug: "forme-te", title: "La forme en て", jp: "～て", category: "verbes",
    summary: "La forme qui relie : « …et… », et la base de ～てください, ～ています, ～てもいいです.",
    body: [
      p("La forme en て ne marque ni le temps ni la politesse : elle relie le verbe à ce qui suit. Elle se construit exactement comme le passé familier en た : il suffit de remplacer た par て (et だ par で)."),
      table(["Le verbe finit par", "Forme en て", "Exemple", "Devient"], [
        ["う・つ・る", "って", "待つ|まつ", "待って|まって"],
        ["む・ぶ・ぬ", "んで", "読む|よむ", "読んで|よんで"],
        ["く", "いて", "書く|かく", "書いて|かいて"],
        ["ぐ", "いで", "泳ぐ|およぐ", "泳いで|およいで"],
        ["す", "して", "話す|はなす", "話して|はなして"],
        ["る (groupe 2)", "て", "食べる|たべる", "食べて|たべて"],
        ["する (irrégulier)", "して", "勉強する|べんきょうする", "勉強して|べんきょうして"],
        ["くる (irrégulier)", "きて", "来る|くる", "来て|きて"],
      ]),
      warn("Une seule exception à retenir : いく (iku, aller) devient いって (itte), et non いいて."),
      tip("Petit refrain pour le groupe 1 : « u, tsu, ru : tte ; mu, bu, nu : nde ; ku : ite ; gu : ide ; su : shite »."),
      h("Relier des actions : « …et… »"),
      ex("朝 起きて、顔を 洗います。", "Asa okite, kao o araimasu.", "Le matin, je me lève et je me lave le visage.", "あさ おきて、かおを あらいます。"),
      ex("スーパーに 行って、パンを 買いました。", "Sūpā ni itte, pan o kaimashita.", "Je suis allé au supermarché et j'ai acheté du pain.", "スーパーに いって、パンを かいました。"),
      tip("Le temps et la politesse se lisent au dernier verbe seulement : ici かいました (kaimashita) met toute la phrase au passé."),
      p("La forme en て de chaque verbe est dans le tableau des verbes. Les fiches suivantes montrent ses trois usages les plus courants."),
    ],
  },
  {
    slug: "te-kudasai", title: "Demander poliment : ～てください", jp: "～てください", category: "verbes",
    summary: "Forme en て + ください : « faites…, s'il vous plaît ».",
    body: [
      ex("ちょっと 待って ください。", "Chotto matte kudasai.", "Attendez un instant, s'il vous plaît.", "ちょっと まって ください。"),
      ex("ここに 名前を 書いて ください。", "Koko ni namae o kaite kudasai.", "Écrivez votre nom ici, s'il vous plaît.", "ここに なまえを かいて ください。"),
      ex("もう いちど 言って ください。", "Mō ichido itte kudasai.", "Pouvez-vous répéter, s'il vous plaît ?", "もう いちど いって ください。"),
      h("Demander de ne pas faire : ～ないでください"),
      p("Pour l'inverse, on part du négatif familier en ない (colonne « Forme familière » du tableau des verbes) et on ajoute でください."),
      ex("ここで たばこを すわないで ください。", "Koko de tabako o suwanaide kudasai.", "Ne fumez pas ici, s'il vous plaît."),
      ex("わすれないで ください。", "Wasurenaide kudasai.", "N'oubliez pas, s'il vous plaît."),
      tip("Entre amis, on laisse tomber ください : まって！ (matte!, « attends ! »)."),
    ],
  },
  {
    slug: "te-imasu", title: "En train de, et état : ～ています", jp: "～ています", category: "verbes",
    summary: "Forme en て + います : une action en cours, une habitude, ou un état qui dure.",
    body: [
      h("Une action en cours"),
      ex("いま ごはんを 食べて います。", "Ima gohan o tabete imasu.", "Je suis en train de manger.", "いま ごはんを たべて います。"),
      h("Une habitude"),
      ex("毎日 日本語を 勉強して います。", "Mainichi nihongo o benkyō shite imasu.", "J'étudie le japonais tous les jours.", "まいにち にほんごを べんきょうして います。"),
      h("Un état qui dure, après une action"),
      ex("東京に 住んで います。", "Tōkyō ni sunde imasu.", "J'habite à Tokyo.", "とうきょうに すんで います。"),
      ex("けっこん して います。", "Kekkon shite imasu.", "Je suis marié(e).", undefined, "Pas « je suis en train de me marier » : le mariage a eu lieu, l'état dure."),
      warn("« Je sais » se dit しって います (shitte imasu), mais « je ne sais pas » se dit しりません (shirimasen), sans ～ています."),
      tip("À l'oral, い disparaît souvent : たべてる (tabeteru) pour たべて いる (tabete iru)."),
    ],
  },
  {
    slug: "te-mo-ii", title: "Permission et interdiction", jp: "～てもいい・～てはいけない", category: "verbes",
    summary: "Forme en て + もいいです : « on peut… » ; + はいけません : « il ne faut pas… ».",
    body: [
      ex("しゃしんを とっても いいですか。", "Shashin o tottemo ii desu ka.", "Est-ce que je peux prendre une photo ?"),
      ex("はい、いいですよ。", "Hai, ii desu yo.", "Oui, bien sûr."),
      ex("ここで しゃしんを とっては いけません。", "Koko de shashin o totte wa ikemasen.", "Il est interdit de prendre des photos ici."),
      tip("Pour refuser poliment une demande, on répond plutôt すみません、ちょっと… (sumimasen, chotto…, « désolé, c'est un peu… ») que いけません, trop sec."),
      warn("Dans ～ては, は se prononce « wa », comme la particule."),
    ],
  },

  {
    slug: "forme-ta", title: "Le passé familier : la forme en た", jp: "～た", category: "verbes",
    summary: "Le passé entre amis, et la base de ～たことがある et ～たり. Même règle que la forme en て.",
    body: [
      p("Entre amis ou en famille, on ne dit pas たべました mais たべた. Bonne nouvelle : la forme en た se construit exactement comme la forme en て, en remplaçant て par た (et で par だ)."),
      table(["Le verbe finit par", "Forme en た", "Exemple", "Devient"], [
        ["う・つ・る", "った", "待つ|まつ", "待った|まった"],
        ["む・ぶ・ぬ", "んだ", "読む|よむ", "読んだ|よんだ"],
        ["く", "いた", "書く|かく", "書いた|かいた"],
        ["ぐ", "いだ", "泳ぐ|およぐ", "泳いだ|およいだ"],
        ["す", "した", "話す|はなす", "話した|はなした"],
        ["る (groupe 2)", "た", "食べる|たべる", "食べた|たべた"],
        ["する (irrégulier)", "した", "勉強する|べんきょうする", "勉強した|べんきょうした"],
        ["くる (irrégulier)", "きた", "来る|くる", "来た|きた"],
      ]),
      warn("Même exception que pour la forme en て : いく (iku) devient いった (itta)."),
      ex("きのう 映画を 見た。", "Kinō eiga o mita.", "Hier, j'ai vu un film.", "きのう えいがを みた。"),
      ex("もう 晩ごはんを 食べた？", "Mō bangohan o tabeta?", "Tu as déjà dîné ?", "もう ばんごはんを たべた？"),
      h("Le passé négatif familier : ～なかった"),
      p("On part du négatif familier en ない et on remplace ない par なかった, comme pour un adjectif en い."),
      table(["Poli", "Familier"], [
        ["食べませんでした|たべませんでした", "食べなかった|たべなかった"],
        ["行きませんでした|いきませんでした", "行かなかった|いかなかった"],
      ]),
      ex("きのうは どこも 行かなかった。", "Kinō wa doko mo ikanakatta.", "Hier, je ne suis allé nulle part.", "きのうは どこも いかなかった。"),
      tip("Toutes les formes en た de chaque verbe sont dans la colonne « Forme familière » du tableau des verbes."),
    ],
  },
  {
    slug: "ta-koto-ga-aru", title: "L'expérience : ～たことがあります", jp: "～たことがある", category: "verbes",
    summary: "Forme en た + ことがあります : « j'ai déjà… (au moins une fois dans ma vie) ».",
    body: [
      p("こと veut dire « le fait de ». ～たことがあります se lit donc « le fait d'avoir fait… existe » : c'est une expérience vécue."),
      ex("日本へ 行った ことが ありますか。", "Nihon e itta koto ga arimasu ka.", "Es-tu déjà allé au Japon ?", "にほんへ いった ことが ありますか。"),
      ex("いいえ、まだ ありません。", "Iie, mada arimasen.", "Non, pas encore."),
      ex("すしを 食べた ことが あります。", "Sushi o tabeta koto ga arimasu.", "J'ai déjà mangé des sushis.", "すしを たべた ことが あります。"),
      ex("一度も 見た ことが ありません。", "Ichido mo mita koto ga arimasen.", "Je ne l'ai jamais vu, pas une seule fois.", "いちども みた ことが ありません。"),
      warn("Pas pour une action récente : « J'ai mangé ce matin » se dit けさ たべました, pas たべた ことが あります."),
    ],
  },
  {
    slug: "tari", title: "Des exemples d'actions : ～たり～たりします", jp: "～たり～たりする", category: "verbes",
    summary: "Forme en た + り, deux fois, puis します : « je fais entre autres ceci et cela ».",
    body: [
      p("Comme や pour les noms, ～たり donne quelques exemples parmi d'autres actions. On ajoute り à la forme en た, et la phrase se termine toujours par する."),
      ex("日曜日は 本を 読んだり、テレビを 見たり します。", "Nichiyōbi wa hon o yondari, terebi o mitari shimasu.", "Le dimanche, je lis des livres, je regarde la télé, ce genre de choses.", "にちようびは ほんを よんだり、テレビを みたり します。"),
      ex("休みの 日は そうじを したり、せんたくを したり します。", "Yasumi no hi wa sōji o shitari, sentaku o shitari shimasu.", "Les jours de repos, je fais le ménage, la lessive, etc.", "やすみの ひは そうじを したり、せんたくを したり します。"),
      tip("Le temps se lit à la fin : しました (shimashita) met toute la phrase au passé."),
    ],
  },
  {
    slug: "tai", title: "Vouloir : ～たい et ほしい", jp: "～たい・ほしい", category: "verbes",
    summary: "Base en ます + たい : « je veux faire… ». ほしい : « je veux (un objet) ».",
    body: [
      p("On prend la base en ます (いきます → いき) et on ajoute たい. Le résultat se conjugue comme un adjectif en い."),
      table(["Sens", "Forme"], [
        ["Je veux aller", "行きたいです|いきたいです"],
        ["Je ne veux pas aller", "行きたくないです|いきたくないです"],
        ["Je voulais aller", "行きたかったです|いきたかったです"],
      ]),
      ex("日本へ 行きたいです。", "Nihon e ikitai desu.", "Je veux aller au Japon.", "にほんへ いきたいです。"),
      ex("何が 食べたいですか。", "Nani ga tabetai desu ka.", "Qu'est-ce que tu veux manger ?", "なにが たべたいですか。", "Avec ～たい, を devient souvent が."),
      h("Vouloir une chose : ほしい"),
      ex("新しい くつが ほしいです。", "Atarashii kutsu ga hoshii desu.", "Je voudrais de nouvelles chaussures.", "あたらしい くつが ほしいです。"),
      warn("～たい et ほしい parlent de ce que JE veux, ou de ce que TU veux dans une question. Pour une autre personne, le japonais emploie d'autres formes (～たがっています), qu'on verra plus tard."),
      tip("Pour inviter quelqu'un, ne demande pas « tu veux… ? » avec ～たいですか : c'est trop direct. Préfère ～ませんか (fiche « Proposer »)."),
    ],
  },
  {
    slug: "nakereba", title: "Devoir, ne pas être obligé", jp: "～なければなりません・～なくてもいいです", category: "verbes",
    summary: "Négatif en ない → なければなりません : « il faut… ». → なくてもいいです : « pas besoin de… ».",
    body: [
      p("On part du négatif familier (のまない, おきない) et on remplace ない."),
      table(["Négatif en ない", "« Il faut »", "« Pas besoin »"], [
        ["飲まない|のまない", "飲まなければなりません|のまなければなりません", "飲まなくてもいいです|のまなくてもいいです"],
        ["起きない|おきない", "起きなければなりません|おきなければなりません", "起きなくてもいいです|おきなくてもいいです"],
        ["しない", "しなければなりません", "しなくてもいいです"],
      ]),
      ex("あした 早く 起きなければ なりません。", "Ashita hayaku okinakereba narimasen.", "Demain, je dois me lever tôt.", "あした はやく おきなければ なりません。"),
      ex("くすりを 飲まなければ なりません。", "Kusuri o nomanakereba narimasen.", "Je dois prendre mes médicaments.", "くすりを のまなければ なりません。"),
      ex("あしたは 来なくても いいです。", "Ashita wa konakutemo ii desu.", "Tu n'as pas besoin de venir demain.", "あしたは こなくても いいです。"),
      tip("À l'oral entre amis, ～なければ devient ～なきゃ : いかなきゃ！ (ikanakya!, « faut que j'y aille ! »)."),
      warn("Le contraire de « il faut » n'est pas « il ne faut pas » (～てはいけません, interdiction), mais « pas besoin » (～なくてもいいです)."),
    ],
  },
  {
    slug: "keigo", title: "Respecter l'autre, s'abaisser soi-même : le keigo", jp: "敬語", category: "verbes",
    summary: "Trois façons de parler : poli (です・ます), respectueux (pour les actions de l'autre), modeste (pour les siennes).",
    body: [
      p("Le ます que tu connais est déjà de la politesse (丁寧語, ていねいご, teineigo). Au travail, au magasin, à l'hôtel ou avec un professeur, le japonais ajoute deux niveaux : on élève l'autre, et on se fait petit soi-même."),
      table(["Niveau", "Pour qui ?", "Exemple"], [
        ["丁寧語|ていねいご", "Tout le monde, poliment", "食べます|たべます"],
        ["尊敬語|そんけいご", "Les actions de l'autre (client, supérieur)", "召し上がります|めしあがります"],
        ["謙譲語|けんじょうご", "Mes actions, devant l'autre", "いただきます"],
      ]),
      tip("La règle d'or : jamais de forme respectueuse pour soi-même, jamais de forme modeste pour l'autre. On élève l'autre ou on s'abaisse, jamais l'inverse."),
      h("Les verbes spéciaux à retenir"),
      p("Quelques verbes très courants ont leur propre forme. C'est la partie à apprendre par cœur : elle sert tous les jours."),
      table(["Sens", "Verbe neutre", "Respectueux (l'autre)", "Modeste (moi)"], [
        ["faire", "する", "なさる", "いたす"],
        ["manger", "食べる|たべる", "召し上がる|めしあがる", "いただく"],
        ["dire", "言う|いう", "おっしゃる", "申す|もうす"],
        ["voir", "見る|みる", "ご覧になる|ごらんになる", "拝見する|はいけんする"],
        ["aller", "行く|いく", "いらっしゃる", "参る|まいる"],
        ["venir", "来る|くる", "いらっしゃる", "参る|まいる"],
        ["être là", "いる", "いらっしゃる", "おる"],
        ["donner (à moi)", "くれる", "くださる", "—"],
        ["recevoir", "もらう", "—", "いただく"],
      ]),
      warn("Les verbes なさる, いらっしゃる, おっしゃる et くださる ont un ます irrégulier : いらっしゃいます (irasshaimasu), et non いらっしゃります."),
      ex("お名前は 何と おっしゃいますか。", "Onamae wa nan to osshaimasu ka.", "Comment vous appelez-vous ? (littéralement : comment dites-vous votre nom ?)", "おなまえは なんと おっしゃいますか。"),
      ex("私は 田中と 申します。", "Watashi wa Tanaka to mōshimasu.", "Je m'appelle Tanaka. (version modeste de « たなかです »)", "わたしは たなかと もうします。"),
      ex("社長は 何を 召し上がりますか。", "Shachō wa nani o meshiagarimasu ka.", "Que prendra le directeur ?", "しゃちょうは なにを めしあがりますか。"),
      ex("田中さんは いらっしゃいますか。", "Tanaka-san wa irasshaimasu ka.", "Monsieur Tanaka est-il là ?", "たなかさんは いらっしゃいますか。"),
      ex("ようこそ いらっしゃいませ。", "Yōkoso irasshaimase.", "Bienvenue ! (ce que dit le personnel d'un magasin)"),
      tip("いただきます (itadakimasu), que l'on dit avant de manger, est la forme modeste de « recevoir » : on reçoit humblement la nourriture."),
      h("Pour tous les autres verbes : un modèle"),
      p("Les autres verbes suivent un modèle. On prend la base en ます du verbe, sans ます (まち pour まちます), et on l'entoure de お."),
      table(["Modèle", "Sens", "Exemple"], [
        ["お + base + になる", "Respectueux : l'autre fait l'action", "お帰りになる|おかえりになる"],
        ["お + base + する", "Modeste : je fais l'action pour l'autre", "お持ちする|おもちする"],
        ["お + base + ください", "Demande respectueuse", "お待ちください|おまちください"],
      ]),
      ex("先生は もう お帰りに なりましたか。", "Sensei wa mō okaeri ni narimashita ka.", "Le professeur est-il déjà rentré ?", "せんせいは もう おかえりに なりましたか。"),
      ex("荷物を お持ちします。", "Nimotsu o omochi shimasu.", "Je porte vos bagages.", "にもつを おもちします。"),
      ex("少々 お待ち ください。", "Shōshō omachi kudasai.", "Veuillez patienter un instant.", "しょうしょう おまち ください。"),
      ex("こちらを ご覧 ください。", "Kochira o goran kudasai.", "Veuillez regarder par ici.", "こちらを ごらん ください。"),
      warn("Avec les verbes en する, on met ご au lieu de お devant le mot d'origine chinoise : ご連絡する (gorenraku suru, « je vous contacte »). Les verbes très courts comme みる ou いる n'entrent pas dans ce modèle : pour eux, on utilise les formes spéciales du tableau."),
      tip("À retenir pour commencer : いらっしゃいませ, お待ちください, いただきます, 申します. Avec ces quatre, tu comprendras déjà la plupart de ce qu'on te dit dans un magasin ou un restaurant."),
    ],
  },

  /* ------------------------------- Adjectifs ------------------------------- */
  {
    slug: "adjectifs", title: "Les deux familles d'adjectifs", jp: "い・な", category: "adjectifs",
    summary: "Les adjectifs en い se conjuguent eux-mêmes ; ceux en な se comportent comme des noms.",
    body: [
      table(["", "Adjectif en い : たかい (cher)", "Adjectif en な : しずか (calme)"], [
        ["Devant un nom", "たかい ほん", "しずかな へや"],
        ["Présent", "たかいです", "しずかです"],
        ["Négatif", "たかくないです", "しずかじゃありません"],
        ["Passé", "たかかったです", "しずかでした"],
      ]),
      ex("この ほんは たかくないです。", "Kono hon wa takaku nai desu.", "Ce livre n'est pas cher."),
      ex("しずかな へやです。", "Shizuka na heya desu.", "C'est une chambre calme."),
      warn("いい (bien) est irrégulier : よくないです (ce n'est pas bien), よかったです (c'était bien)."),
    ],
  },
];

export const GRAMMAR_CATEGORIES: { id: GrammarPoint["category"]; title: string }[] = [
  { id: "fondations", title: "À lire en premier" },
  { id: "particules", title: "Les particules" },
  { id: "phrases", title: "Les phrases de base" },
  { id: "verbes", title: "Les verbes" },
  { id: "adjectifs", title: "Les adjectifs" },
  { id: "mots", title: "Les mots-outils" },
];

export function getGrammar(slug: string): GrammarPoint | undefined {
  return grammar.find((g) => g.slug === slug);
}

/** Fiche de grammaire liée à une particule des textes de lecture. */
const TOKEN_LINKS: Record<string, string> = {
  は: "wa", が: "ga", を: "o", に: "ni", へ: "e", で: "de", と: "to", も: "mo", の: "no", か: "ka", ね: "ne-yo", よ: "ne-yo",
  です: "desu", といっしょに: "to",
};
export function grammarForToken(token: string): GrammarPoint | undefined {
  const slug = TOKEN_LINKS[token];
  return slug ? getGrammar(slug) : undefined;
}

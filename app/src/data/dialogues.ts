import type { Dialogue } from "@/domain/dialogue";

/**
 * Dialogues à choix : une courte scène, l'autre personne parle, l'apprenant choisit sa réponse.
 * Personnages inventés. Écrit de mémoire : à faire relire par un locuteur natif.
 * Dans `kana`, les mots sont séparés par un espace et les particules par « _ » (le rōmaji s'en déduit).
 */
export const dialogues: Dialogue[] = [
  {
    slug: "se-presenter",
    title: "自己紹介",
    titleKana: "じこしょうかい",
    titleFr: "Se présenter",
    intro: "Tu rencontres Yuki lors d'une soirée d'échange linguistique. Écoute ce qu'elle dit, puis choisis la bonne réponse : chaque erreur est expliquée.",
    partner: "Yuki",
    partnerKana: "ゆき",
    level: "N5",
    turns: [
      { kind: "say", jp: "はじめまして。ゆきです。", kana: "はじめまして。 ゆき_です。", fr: "Enchantée. Je m'appelle Yuki.",
        words: [{ jp: "はじめまして", kana: "はじめまして", fr: "enchanté (à la première rencontre)" }, { jp: "です", kana: "です", fr: "c'est, je suis (poli)" }] },
      { kind: "reply", prompt: "Présente-toi : tu t'appelles Ken.", choices: [
        { jp: "さようなら。ケンです。", kana: "さようなら。 ケン_です。", fr: "Au revoir. Je m'appelle Ken.", why: "さようなら veut dire « au revoir » : on ne le dit pas en rencontrant quelqu'un." },
        { jp: "はじめまして。ケンです。", kana: "はじめまして。 ケン_です。", fr: "Enchanté. Je m'appelle Ken.", ok: true },
        { jp: "はじめまして。ケンですか。", kana: "はじめまして。 ケン_です_か。", fr: "Enchanté. Ken ?", why: "か à la fin transforme la phrase en question : tu demandes « Ken ? » au lieu de te présenter." },
      ] },
      { kind: "say", jp: "どうぞ よろしく おねがいします。", kana: "どうぞ よろしく おねがいします。", fr: "Ravie de faire votre connaissance.",
        words: [{ jp: "どうぞ", kana: "どうぞ", fr: "je vous en prie, allez-y" }, { jp: "よろしく", kana: "よろしく", fr: "à bien s'entendre (formule de politesse)" }, { jp: "おねがいします", kana: "おねがいします", fr: "je vous le demande poliment" }] },
      { kind: "reply", prompt: "Réponds poliment à sa formule.", choices: [
        { jp: "いただきます。", kana: "いただきます。", fr: "Je reçois ce repas (dit avant de manger).", why: "On dit いただきます juste avant de manger, pas pour répondre à une salutation." },
        { jp: "いいえ、けっこうです。", kana: "いいえ、 けっこう_です。", fr: "Non, merci, ça ira.", why: "いいえ、けっこうです veut dire « non, merci » : tu refuserais sa politesse." },
        { jp: "こちらこそ、よろしく おねがいします。", kana: "こちら_こそ、 よろしく おねがいします。", fr: "Moi de même, ravi de faire votre connaissance.", ok: true,
          words: [{ jp: "こちらこそ", kana: "こちらこそ", fr: "moi de même, c'est plutôt à moi de le dire" }] },
      ] },
      { kind: "say", jp: "お国は どちらですか。", kana: "おくに_は どちら_です_か。", fr: "Vous êtes de quel pays ?",
        words: [{ jp: "お国", kana: "おくに", fr: "le pays (poli)" }, { jp: "は", kana: "は", fr: "marque le thème (se lit « wa »)" }, { jp: "どちら", kana: "どちら", fr: "où, lequel (poli)" }] },
      { kind: "reply", prompt: "Dis que tu viens de France.", choices: [
        { jp: "フランスから 来ました。", kana: "フランス_から きました。", fr: "Je viens de France.", ok: true,
          words: [{ jp: "から", kana: "から", fr: "de, depuis (point de départ)" }, { jp: "来ました", kana: "きました", fr: "je suis venu" }] },
        { jp: "フランスを 来ました。", kana: "フランス_を きました。", fr: "(phrase incorrecte)", why: "を marque l'objet d'un verbe, pas le point de départ. « De » se dit から." },
        { jp: "フランスに 来ました。", kana: "フランス_に きました。", fr: "Je suis venu en France.", why: "に indique la destination : cela dit « je suis venu en France », pas « je viens de France »." },
      ] },
      { kind: "say", jp: "そうですか。お仕事は 何ですか。", kana: "そう_です_か。 おしごと_は なん_です_か。", fr: "Ah bon ? Qu'est-ce que vous faites dans la vie ?",
        words: [{ jp: "そうですか", kana: "そうですか", fr: "ah bon ? (réaction)" }, { jp: "お仕事", kana: "おしごと", fr: "le travail, le métier (poli)" }, { jp: "何", kana: "なん", fr: "quoi" }] },
      { kind: "reply", prompt: "Dis que tu es étudiant(e).", choices: [
        { jp: "先生です。", kana: "せんせい_です。", fr: "Je suis professeur.", why: "先生 (sensei) veut dire « professeur » : pas « étudiant »." },
        { jp: "学生ですか。", kana: "がくせい_です_か。", fr: "Suis-je étudiant ?", why: "か à la fin fait une question : tu demandes si tu es étudiant au lieu de l'affirmer." },
        { jp: "学生です。", kana: "がくせい_です。", fr: "Je suis étudiant.", ok: true, words: [{ jp: "学生", kana: "がくせい", fr: "étudiant" }] },
      ] },
      { kind: "say", jp: "じゃあ、また 会いましょう。", kana: "じゃあ、 また あいましょう。", fr: "Bon, revoyons-nous bientôt.",
        words: [{ jp: "じゃあ", kana: "じゃあ", fr: "bon, alors" }, { jp: "また", kana: "また", fr: "encore, à nouveau" }, { jp: "会いましょう", kana: "あいましょう", fr: "retrouvons-nous" }] },
      { kind: "reply", prompt: "Réponds-lui poliment.", choices: [
        { jp: "おやすみなさい。", kana: "おやすみなさい。", fr: "Bonne nuit.", why: "おやすみなさい se dit le soir, avant d'aller dormir." },
        { jp: "はじめまして。", kana: "はじめまして。", fr: "Enchanté.", why: "はじめまして se dit à la première rencontre : vous vous êtes déjà présentés." },
        { jp: "はい、また 会いましょう。", kana: "はい、 また あいましょう。", fr: "Oui, revoyons-nous bientôt.", ok: true, words: [{ jp: "はい", kana: "はい", fr: "oui" }] },
      ] },
    ],
  },
  {
    slug: "saluer",
    title: "あいさつ",
    titleKana: "あいさつ",
    titleFr: "Saluer",
    intro: "Un matin, devant l'école, tu croises Haru. Les salutations de la journée : le bon mot au bon moment.",
    partner: "Haru",
    partnerKana: "はる",
    level: "N5",
    turns: [
      { kind: "say", jp: "おはようございます。", kana: "おはよう_ございます。", fr: "Bonjour. (le matin)", words: [{ jp: "おはようございます", kana: "おはようございます", fr: "bonjour (le matin, poli)" }] },
      { kind: "reply", prompt: "Salue-la : c'est le matin.", choices: [
        { jp: "こんばんは。", kana: "こんばんは。", fr: "Bonsoir.", why: "こんばんは se dit le soir, pas le matin." },
        { jp: "おやすみなさい。", kana: "おやすみなさい。", fr: "Bonne nuit.", why: "おやすみなさい se dit le soir, avant d'aller dormir." },
        { jp: "おはようございます。", kana: "おはよう_ございます。", fr: "Bonjour. (le matin)", ok: true },
      ] },
      { kind: "say", jp: "元気ですか。", kana: "げんき_です_か。", fr: "Ça va ?", words: [{ jp: "元気", kana: "げんき", fr: "en forme, en bonne santé" }] },
      { kind: "reply", prompt: "Dis que ça va, et demande-lui comment elle va.", choices: [
        { jp: "はい、元気です。ハルさんは？", kana: "はい、 げんき_です。 ハル_さん_は？", fr: "Oui, ça va. Et toi, Haru ?", ok: true, words: [{ jp: "さん", kana: "さん", fr: "« monsieur, madame » (après un nom)" }] },
        { jp: "はい、元気ですか。", kana: "はい、 げんき_です_か。", fr: "Oui, ça va ?", why: "か à la fin fait une question : tu demandes si ça va au lieu de répondre." },
        { jp: "ありがとうございます。", kana: "ありがとう_ございます。", fr: "Merci.", why: "On remercie pour une aide ou un cadeau, pas pour une question sur sa forme." },
      ] },
      { kind: "say", jp: "今日は いい 天気ですね。", kana: "きょう_は いい てんき_です_ね。", fr: "Il fait beau aujourd'hui, n'est-ce pas ?", words: [{ jp: "今日", kana: "きょう", fr: "aujourd'hui" }, { jp: "天気", kana: "てんき", fr: "le temps (météo)" }, { jp: "ね", kana: "ね", fr: "« n'est-ce pas ? » (cherche l'accord)" }] },
      { kind: "reply", prompt: "Dis que tu es d'accord.", choices: [
        { jp: "どういたしまして。", kana: "どう_いたしまして。", fr: "Je vous en prie.", why: "どういたしまして répond à un merci : personne ne t'a remercié." },
        { jp: "そうですね。", kana: "そう_です_ね。", fr: "Oui, c'est vrai.", ok: true, words: [{ jp: "そうですね", kana: "そうですね", fr: "oui, c'est vrai (j'approuve)" }] },
        { jp: "そうですか。", kana: "そう_です_か。", fr: "Ah bon ?", why: "そうですか veut dire « ah bon ? » : tu montres de la surprise, alors que tu es d'accord." },
      ] },
      { kind: "say", jp: "あ、もう 時間です。じゃあ、また あした。", kana: "あ、 もう じかん_です。 じゃあ、 また あした。", fr: "Ah, il est déjà l'heure. Bon, à demain.", words: [{ jp: "時間", kana: "じかん", fr: "le temps, l'heure" }, { jp: "あした", kana: "あした", fr: "demain" }] },
      { kind: "reply", prompt: "Dis à demain.", choices: [
        { jp: "いってきます。", kana: "いってきます。", fr: "Je pars et je reviens. (en quittant sa maison)", why: "いってきます se dit en quittant sa maison, pour dire qu'on reviendra." },
        { jp: "ただいま。", kana: "ただいま。", fr: "Je suis rentré. (en arrivant chez soi)", why: "ただいま se dit en rentrant chez soi." },
        { jp: "はい、また あした。", kana: "はい、 また あした。", fr: "Oui, à demain.", ok: true },
      ] },
    ],
  },
  {
    slug: "remercier",
    title: "ありがとう",
    titleKana: "ありがとう",
    titleFr: "Remercier et s'excuser",
    intro: "Tu retrouves Yuki au café avec dix minutes de retard. Merci, pardon, je vous en prie : les mots de la politesse.",
    partner: "Yuki",
    partnerKana: "ゆき",
    level: "N5",
    turns: [
      { kind: "say", jp: "あ、ケンさん。こんにちは。", kana: "あ、 ケン_さん。 こんにちは。", fr: "Ah, Ken. Bonjour.", words: [{ jp: "こんにちは", kana: "こんにちは", fr: "bonjour (dans la journée)" }] },
      { kind: "reply", prompt: "Excuse-toi de ton retard.", choices: [
        { jp: "ごちそうさまでした。", kana: "ごちそうさま_でした。", fr: "C'était un régal. (après le repas)", why: "ごちそうさまでした se dit à la fin d'un repas." },
        { jp: "おめでとうございます。", kana: "おめでとう_ございます。", fr: "Félicitations.", why: "おめでとうございます sert à féliciter (anniversaire, réussite), pas à s'excuser." },
        { jp: "遅く なって、すみません。", kana: "おそく なって、 すみません。", fr: "Désolé d'être en retard.", ok: true, words: [{ jp: "遅く", kana: "おそく", fr: "tard" }, { jp: "すみません", kana: "すみません", fr: "pardon, excusez-moi (aussi : merci)" }] },
      ] },
      { kind: "say", jp: "いいえ、大丈夫ですよ。", kana: "いいえ、 だいじょうぶ_です_よ。", fr: "Non, ce n'est pas grave.", words: [{ jp: "大丈夫", kana: "だいじょうぶ", fr: "pas de souci, ça va" }, { jp: "よ", kana: "よ", fr: "« tu sais ! » (apporte une information)" }] },
      { kind: "reply", prompt: "Remercie-la de sa gentillesse.", choices: [
        { jp: "どういたしまして。", kana: "どう_いたしまして。", fr: "Je vous en prie.", why: "どういたしまして répond à un merci : c'est elle qui vient de te rassurer." },
        { jp: "ありがとうございます。", kana: "ありがとう_ございます。", fr: "Merci.", ok: true },
        { jp: "ごめんなさい。", kana: "ごめんなさい。", fr: "Pardon.", why: "Tu t'excuses de nouveau alors qu'elle t'a pardonné : ici on la remercie." },
      ] },
      { kind: "say", jp: "これ、おみやげです。どうぞ。", kana: "これ、 おみやげ_です。 どうぞ。", fr: "Voici un petit cadeau. Tiens.", words: [{ jp: "おみやげ", kana: "おみやげ", fr: "le souvenir, le petit cadeau rapporté d'un voyage" }] },
      { kind: "reply", prompt: "Accepte le cadeau en la remerciant.", choices: [
        { jp: "いいえ、けっこうです。", kana: "いいえ、 けっこう_です。", fr: "Non, merci, ça ira.", why: "いいえ、けっこうです veut dire « non, merci » : tu refuserais le cadeau." },
        { jp: "すみません、わかりません。", kana: "すみません、 わかりません。", fr: "Pardon, je ne comprends pas.", why: "わかりません veut dire « je ne comprends pas » : elle t'offre un cadeau, il n'y a rien à comprendre." },
        { jp: "どうも ありがとうございます。", kana: "どうも ありがとう_ございます。", fr: "Merci beaucoup.", ok: true, words: [{ jp: "どうも", kana: "どうも", fr: "vraiment, beaucoup (renforce le merci)" }] },
      ] },
      { kind: "say", jp: "ケンさん、コーヒーを 飲みますか。", kana: "ケン_さん、 コーヒー_を のみます_か。", fr: "Ken, tu prends un café ?", words: [{ jp: "コーヒー", kana: "コーヒー", fr: "le café" }, { jp: "飲みます", kana: "のみます", fr: "boire (poli)" }] },
      { kind: "reply", prompt: "Accepte poliment.", choices: [
        { jp: "はい、いただきます。", kana: "はい、 いただきます。", fr: "Oui, avec plaisir. (j'accepte)", ok: true, words: [{ jp: "いただきます", kana: "いただきます", fr: "je reçois avec gratitude (aussi : j'accepte)" }] },
        { jp: "いいえ、どういたしまして。", kana: "いいえ、 どう_いたしまして。", fr: "Non, je vous en prie.", why: "どういたしまして répond à un merci : ici, on te pose une question." },
        { jp: "はい、ごめんなさい。", kana: "はい、 ごめんなさい。", fr: "Oui, pardon.", why: "ごめんなさい sert à s'excuser : tu n'as rien à te faire pardonner ici." },
      ] },
    ],
  },
  {
    slug: "commander",
    title: "レストランで",
    titleKana: "れすとらんで",
    titleFr: "Commander au restaurant",
    intro: "Tu entres seul dans un petit restaurant de ramen. Dire le nombre de personnes, commander, remercier avant et après le repas.",
    partner: "Le serveur",
    partnerKana: "",
    level: "N5",
    turns: [
      { kind: "say", jp: "いらっしゃいませ。なんめいさまですか。", kana: "いらっしゃいませ。 なんめいさま_です_か。", fr: "Bienvenue. Vous êtes combien ?", words: [{ jp: "いらっしゃいませ", kana: "いらっしゃいませ", fr: "bienvenue (dit aux clients)" }] },
      { kind: "reply", prompt: "Dis que vous êtes une personne.", choices: [
        { jp: "ひとつです。", kana: "ひとつ_です。", fr: "Un. (objet)", why: "ひとつ compte des objets, pas des personnes : pour une personne on dit ひとり." },
        { jp: "一人です。", kana: "ひとり_です。", fr: "Une personne.", ok: true, words: [{ jp: "一人", kana: "ひとり", fr: "une personne, seul" }] },
        { jp: "いちじです。", kana: "いちじ_です。", fr: "Une heure.", why: "いちじ veut dire « une heure » (l'heure qu'il est), pas « une personne »." },
      ] },
      { kind: "say", jp: "ご注文は？", kana: "ごちゅうもん_は？", fr: "Vous désirez ?", words: [{ jp: "ご注文", kana: "ごちゅうもん", fr: "la commande (poli)" }] },
      { kind: "reply", prompt: "Commande un ramen.", choices: [
        { jp: "ラーメンを ください。", kana: "ラーメン_を ください。", fr: "Un ramen, s'il vous plaît.", ok: true, words: [{ jp: "ください", kana: "ください", fr: "donnez-moi, s'il vous plaît" }] },
        { jp: "ラーメンですか。", kana: "ラーメン_です_か。", fr: "C'est un ramen ?", why: "か fait une question : tu demandes si c'est un ramen au lieu d'en commander." },
        { jp: "ラーメンに ください。", kana: "ラーメン_に ください。", fr: "(phrase incorrecte)", why: "ください se construit avec を : …を ください (« donnez-moi… »)." },
      ] },
      { kind: "say", jp: "飲み物は どうしますか。", kana: "のみもの_は どう_します_か。", fr: "Et comme boisson ?", words: [{ jp: "飲み物", kana: "のみもの", fr: "la boisson" }] },
      { kind: "reply", prompt: "Demande un verre d'eau.", choices: [
        { jp: "おみずを のみます。", kana: "おみず_を のみます。", fr: "Je bois de l'eau.", why: "Tu dis ce que tu fais (je bois) sans rien demander. Pour demander : …を ください." },
        { jp: "お水を ください。", kana: "おみず_を ください。", fr: "De l'eau, s'il vous plaît.", ok: true, words: [{ jp: "お水", kana: "おみず", fr: "l'eau (poli)" }] },
        { jp: "みずは ありません。", kana: "みず_は ありません。", fr: "Il n'y a pas d'eau.", why: "Tu dis qu'il n'y a pas d'eau au lieu d'en demander." },
      ] },
      { kind: "say", jp: "お待たせしました。ラーメンです。どうぞ。", kana: "おまたせ しました。 ラーメン_です。 どうぞ。", fr: "Merci d'avoir attendu. Voici votre ramen. Bon appétit.", words: [{ jp: "お待たせしました", kana: "おまたせしました", fr: "désolé de vous avoir fait attendre" }] },
      { kind: "reply", prompt: "Dis ce qu'on dit avant de manger.", choices: [
        { jp: "ごちそうさまでした。", kana: "ごちそうさま_でした。", fr: "C'était un régal. (après le repas)", why: "ごちそうさまでした se dit après le repas, pas avant." },
        { jp: "おやすみなさい。", kana: "おやすみなさい。", fr: "Bonne nuit.", why: "おやすみなさい se dit le soir, avant d'aller dormir." },
        { jp: "いただきます。", kana: "いただきます。", fr: "Je reçois ce repas. (avant de manger)", ok: true },
      ] },
      { kind: "say", jp: "おいしかったですか。", kana: "おいしかった_です_か。", fr: "C'était bon ?", words: [{ jp: "おいしかった", kana: "おいしかった", fr: "c'était délicieux" }] },
      { kind: "reply", prompt: "Dis que c'était délicieux et remercie pour le repas.", choices: [
        { jp: "はい、いただきます。", kana: "はい、 いただきます。", fr: "Oui, je reçois ce repas.", why: "いただきます se dit avant de manger, pas après." },
        { jp: "はい、おいしいですか。", kana: "はい、 おいしい_です_か。", fr: "Oui, c'est délicieux ?", why: "か fait une question : tu demandes si c'est délicieux au lieu de répondre." },
        { jp: "はい、おいしかったです。ごちそうさまでした。", kana: "はい、 おいしかった_です。 ごちそうさま_でした。", fr: "Oui, c'était délicieux. Merci pour le repas.", ok: true, words: [{ jp: "ごちそうさまでした", kana: "ごちそうさまでした", fr: "merci pour ce repas (après avoir mangé)" }] },
      ] },
    ],
  },
  {
    slug: "acheter",
    title: "買い物",
    titleKana: "かいもの",
    titleFr: "Faire un achat",
    intro: "Dans un konbini (supérette), tu veux acheter un onigiri. Demander un prix, décider, refuser un sac, payer.",
    partner: "Le vendeur",
    partnerKana: "",
    level: "N5",
    turns: [
      { kind: "say", jp: "いらっしゃいませ。", kana: "いらっしゃいませ。", fr: "Bienvenue." },
      { kind: "reply", prompt: "Montre un onigiri et demande combien il coûte.", choices: [
        { jp: "これは なんですか。", kana: "これ_は なん_です_か。", fr: "Qu'est-ce que c'est ?", why: "なん veut dire « quoi » : tu demandes ce que c'est, pas le prix. Le prix se demande avec いくら." },
        { jp: "これは いくつですか。", kana: "これ_は いくつ_です_か。", fr: "Combien y en a-t-il ?", why: "いくつ demande un nombre d'objets, pas un prix." },
        { jp: "これは いくらですか。", kana: "これ_は いくら_です_か。", fr: "Combien ça coûte ?", ok: true, words: [{ jp: "これ", kana: "これ", fr: "ceci (près de moi)" }, { jp: "いくら", kana: "いくら", fr: "combien (le prix)" }] },
      ] },
      { kind: "say", jp: "それは 三百円です。", kana: "それ_は さんびゃく_えん_です。", fr: "Cela fait 300 yens.", words: [{ jp: "三百", kana: "さんびゃく", fr: "trois cents" }, { jp: "円", kana: "えん", fr: "le yen" }] },
      { kind: "reply", prompt: "Dis que tu le prends.", choices: [
        { jp: "じゃあ、これは ありません。", kana: "じゃあ、 これ_は ありません。", fr: "Alors, il n'y a pas ceci.", why: "ありません veut dire « il n'y a pas » : tu dis le contraire de ce que tu veux." },
        { jp: "じゃあ、これを ください。", kana: "じゃあ、 これ_を ください。", fr: "Alors, je prends ceci, s'il vous plaît.", ok: true },
        { jp: "じゃあ、これを みます。", kana: "じゃあ、 これ_を みます。", fr: "Alors, je regarde ceci.", why: "みます veut dire « regarder » : tu dis que tu regardes, pas que tu achètes." },
      ] },
      { kind: "say", jp: "袋は いりますか。", kana: "ふくろ_は いります_か。", fr: "Il vous faut un sac ?", words: [{ jp: "袋", kana: "ふくろ", fr: "le sac (en plastique ou papier)" }] },
      { kind: "reply", prompt: "Dis que tu n'en veux pas.", choices: [
        { jp: "はい、おねがいします。", kana: "はい、 おねがいします。", fr: "Oui, s'il vous plaît.", why: "Cela veut dire que tu veux un sac : tu voulais refuser." },
        { jp: "いいえ、ありません。", kana: "いいえ、 ありません。", fr: "Non, il n'y en a pas.", why: "ありません veut dire « il n'y a pas » ; pour refuser poliment on dit けっこうです." },
        { jp: "いいえ、けっこうです。", kana: "いいえ、 けっこう_です。", fr: "Non, merci, ça ira.", ok: true },
      ] },
      { kind: "say", jp: "お会計は 三百円です。", kana: "おかいけい_は さんびゃく_えん_です。", fr: "L'addition fait 300 yens.", words: [{ jp: "お会計", kana: "おかいけい", fr: "l'addition, le paiement" }] },
      { kind: "reply", prompt: "Donne l'argent en disant « voilà ».", choices: [
        { jp: "どういたしまして。", kana: "どう_いたしまして。", fr: "Je vous en prie.", why: "どういたしまして répond à un merci : personne ne t'a remercié." },
        { jp: "いらっしゃいませ。", kana: "いらっしゃいませ。", fr: "Bienvenue.", why: "C'est ce que dit le personnel en accueillant un client, pas l'inverse." },
        { jp: "はい、どうぞ。", kana: "はい、 どうぞ。", fr: "Voilà.", ok: true },
      ] },
      { kind: "say", jp: "ありがとうございました。またどうぞ。", kana: "ありがとう_ございました。 また_どうぞ。", fr: "Merci. À la prochaine.", words: [{ jp: "またどうぞ", kana: "またどうぞ", fr: "revenez nous voir (formule de magasin)" }] },
      { kind: "reply", prompt: "Remercie en partant.", choices: [
        { jp: "おかえりなさい。", kana: "おかえりなさい。", fr: "Bon retour.", why: "On accueille ainsi quelqu'un qui rentre chez lui, pas quelqu'un qui quitte un magasin." },
        { jp: "ありがとうございます。", kana: "ありがとう_ございます。", fr: "Merci.", ok: true },
        { jp: "いただきます。", kana: "いただきます。", fr: "Je reçois ce repas. (avant de manger)", why: "On dit いただきます juste avant de manger, pas en quittant un magasin." },
      ] },
    ],
  },
  {
    slug: "chemin",
    title: "道を 聞く",
    titleKana: "みちを きく",
    titleFr: "Demander son chemin",
    intro: "Tu es perdu dans une ville japonaise et tu cherches la gare. Interpeller quelqu'un, demander un lieu, comprendre « tout droit » et « à droite ».",
    partner: "Un passant",
    partnerKana: "",
    level: "N5",
    turns: [
      { kind: "say", jp: "どうしましたか。", kana: "どう しました_か。", fr: "Qu'est-ce qui se passe ? (je peux vous aider ?)" },
      { kind: "reply", prompt: "Attire son attention et demande où est la gare.", choices: [
        { jp: "すみません、駅は いつですか。", kana: "すみません、 えき_は いつ_です_か。", fr: "Excusez-moi, la gare, c'est quand ?", why: "いつ veut dire « quand » (le temps). Pour demander un lieu, on dit どこ." },
        { jp: "すみません、駅は だれですか。", kana: "すみません、 えき_は だれ_です_か。", fr: "Excusez-moi, la gare, c'est qui ?", why: "だれ veut dire « qui » : on l'emploie pour les personnes, pas pour un lieu." },
        { jp: "すみません、駅は どこですか。", kana: "すみません、 えき_は どこ_です_か。", fr: "Excusez-moi, où est la gare ?", ok: true, words: [{ jp: "駅", kana: "えき", fr: "la gare" }, { jp: "どこ", kana: "どこ", fr: "où" }] },
      ] },
      { kind: "say", jp: "駅は あそこです。まっすぐ いって、右に 曲がって ください。", kana: "えき_は あそこ_です。 まっすぐ いって、 みぎ_に まがって ください。", fr: "La gare est là-bas. Allez tout droit, puis tournez à droite.", words: [{ jp: "まっすぐ", kana: "まっすぐ", fr: "tout droit" }, { jp: "右", kana: "みぎ", fr: "la droite" }, { jp: "曲がって", kana: "まがって", fr: "tourner" }] },
      { kind: "reply", prompt: "Vérifie que tu as compris : tout droit, puis à droite.", choices: [
        { jp: "まっすぐ いって、ひだりですね。", kana: "まっすぐ いって、 ひだり_です_ね。", fr: "Tout droit, puis à gauche, c'est ça ?", why: "ひだり veut dire « gauche » : il a dit みぎ, « droite »." },
        { jp: "うしろに いって、みぎですね。", kana: "うしろ_に いって、 みぎ_です_ね。", fr: "Derrière, puis à droite, c'est ça ?", why: "うしろ veut dire « derrière » : il a dit まっすぐ, « tout droit »." },
        { jp: "まっすぐ いって、みぎですね。", kana: "まっすぐ いって、 みぎ_です_ね。", fr: "Tout droit, puis à droite, c'est ça ?", ok: true },
      ] },
      { kind: "say", jp: "はい、そうです。駅の 前に 銀行が ありますよ。", kana: "はい、 そう_です。 えき_の まえ_に ぎんこう_が あります_よ。", fr: "Oui, c'est ça. Devant la gare, il y a une banque.", words: [{ jp: "前", kana: "まえ", fr: "devant" }, { jp: "銀行", kana: "ぎんこう", fr: "la banque" }] },
      { kind: "reply", prompt: "Demande si c'est loin d'ici.", choices: [
        { jp: "ここは どこですか。", kana: "ここ_は どこ_です_か。", fr: "Où sommes-nous ?", why: "Tu demandes où tu es, pas la distance jusqu'à la gare." },
        { jp: "ここから 遠いです。", kana: "ここ_から とおい_です。", fr: "C'est loin d'ici.", why: "Sans か, c'est une affirmation : tu dis que c'est loin au lieu de le demander." },
        { jp: "ここから 遠いですか。", kana: "ここ_から とおい_です_か。", fr: "C'est loin d'ici ?", ok: true, words: [{ jp: "遠い", kana: "とおい", fr: "loin" }] },
      ] },
      { kind: "say", jp: "いいえ、ここから 歩いて 五分です。", kana: "いいえ、 ここ_から あるいて ごふん_です。", fr: "Non, c'est à cinq minutes à pied d'ici.", words: [{ jp: "歩いて", kana: "あるいて", fr: "à pied, en marchant" }, { jp: "五分", kana: "ごふん", fr: "cinq minutes" }] },
      { kind: "reply", prompt: "Remercie-le et dis au revoir.", choices: [
        { jp: "どういたしまして。", kana: "どう_いたしまして。", fr: "Je vous en prie.", why: "どういたしまして répond à un merci : c'est à toi de remercier." },
        { jp: "ありがとうございました。失礼します。", kana: "ありがとう_ございました。 しつれい します。", fr: "Merci beaucoup. Au revoir.", ok: true, words: [{ jp: "失礼します", kana: "しつれいします", fr: "je prends congé (poli)" }] },
        { jp: "おかえりなさい。", kana: "おかえりなさい。", fr: "Bon retour.", why: "On accueille ainsi quelqu'un qui rentre chez lui : pas pour remercier un inconnu." },
      ] },
    ],
  },
];

export const getDialogue = (slug: string) => dialogues.find((d) => d.slug === slug);

/**
 * Sens en anglais et en allemand (verbes et phrases d'exemple). Le français reste dans src/data/.
 * Une ligne par élément : clé, puis [sens anglais, sens allemand, exemple anglais, exemple allemand] ; en commentaire, le japonais et le français.
 * Fichier généré au départ, à corriger ici directement.
 */

export const VERB_MEANINGS: Record<string, [en: string, de: string, exampleEn: string, exampleDe: string]> = {
  // 会う — rencontrer, voir (quelqu'un) · 駅で友だちに会います。 — Je retrouve un ami à la gare.
  "あう-0": ["to meet, to see (someone)", "treffen, sehen (jemanden)", "I meet a friend at the station.", "Ich treffe einen Freund am Bahnhof."],
  // 開く — s'ouvrir · ドアが開きました。 — La porte s'est ouverte.
  "あく-1": ["to open (by itself)", "sich öffnen, aufgehen", "The door opened.", "Die Tür ging auf."],
  // 開ける — ouvrir · まどを開けます。 — J'ouvre la fenêtre.
  "あける-2": ["to open", "öffnen", "I open the window.", "Ich öffne das Fenster."],
  // 上げる — lever, monter (quelque chose) · 手を上げてください。 — Levez la main, s'il vous plaît.
  "あげる-3": ["to raise, to lift", "heben, hochheben", "Please raise your hand.", "Heben Sie bitte die Hand."],
  // 遊ぶ — jouer, s'amuser · こうえんで子どもと遊びます。 — Je joue avec les enfants au parc.
  "あそぶ-4": ["to play, to have fun", "spielen, sich vergnügen", "I play with the children in the park.", "Ich spiele mit den Kindern im Park."],
  // 浴びる — prendre (une douche) · 毎朝シャワーを浴びます。 — Je prends une douche tous les matins.
  "あびる-5": ["to take (a shower)", "(eine Dusche) nehmen", "I take a shower every morning.", "Ich dusche jeden Morgen."],
  // 洗う — laver · 食べる前に手を洗います。 — Je me lave les mains avant de manger.
  "あらう-6": ["to wash", "waschen", "I wash my hands before eating.", "Ich wasche mir vor dem Essen die Hände."],
  // 有る — y avoir, se trouver (objets) · つくえの上に本があります。 — Il y a un livre sur le bureau.
  "ある-7": ["there is, to be (things)", "es gibt, sich befinden (Dinge)", "There is a book on the desk.", "Auf dem Schreibtisch liegt ein Buch."],
  // 歩く — marcher · 毎日駅まで歩きます。 — Je marche jusqu'à la gare tous les jours.
  "あるく-8": ["to walk", "zu Fuß gehen", "I walk to the station every day.", "Ich gehe jeden Tag zu Fuß zum Bahnhof."],
  // 言う — dire · 先生は「おはよう」と言いました。 — Le professeur a dit « bonjour ».
  "いう-9": ["to say", "sagen", "The teacher said “good morning”.", "Der Lehrer sagte „Guten Morgen“."],
  // 行く — aller · あした東京へ行きます。 — Demain, je vais à Tokyo.
  "いく-10": ["to go", "gehen, fahren", "Tomorrow I'm going to Tokyo.", "Morgen fahre ich nach Tokio."],
  // 要る — avoir besoin de · パスポートが要ります。 — Il faut un passeport.
  "いる-11": ["to need", "brauchen", "You need a passport.", "Man braucht einen Reisepass."],
  // 居る — y avoir, être là (êtres vivants) · へやにねこがいます。 — Il y a un chat dans la chambre.
  "いる-12": ["there is, to be (living beings)", "es gibt, da sein (Lebewesen)", "There is a cat in the room.", "Im Zimmer ist eine Katze."],
  // 入れる — mettre dedans · コーヒーにさとうを入れます。 — Je mets du sucre dans mon café.
  "いれる-13": ["to put in", "hineintun", "I put sugar in my coffee.", "Ich tue Zucker in meinen Kaffee."],
  // 歌う — chanter · みんなで歌を歌いましょう。 — Chantons une chanson tous ensemble.
  "うたう-14": ["to sing", "singen", "Let's all sing a song together.", "Lasst uns alle zusammen ein Lied singen."],
  // 生まれる — naître · わたしはパリで生まれました。 — Je suis né(e) à Paris.
  "うまれる-15": ["to be born", "geboren werden", "I was born in Paris.", "Ich bin in Paris geboren."],
  // 売る — vendre · この店はくだものを売っています。 — Ce magasin vend des fruits.
  "うる-16": ["to sell", "verkaufen", "This shop sells fruit.", "Dieser Laden verkauft Obst."],
  // 起きる — se lever, se réveiller · 毎朝六時に起きます。 — Je me lève à six heures tous les matins.
  "おきる-17": ["to get up, to wake up", "aufstehen, aufwachen", "I get up at six every morning.", "Ich stehe jeden Morgen um sechs auf."],
  // 置く — poser, mettre · かばんをいすの上に置きます。 — Je pose mon sac sur la chaise.
  "おく-18": ["to put, to place", "hinlegen, stellen", "I put my bag on the chair.", "Ich lege meine Tasche auf den Stuhl."],
  // 教える — enseigner, indiquer · 道を教えてください。 — Indiquez-moi le chemin, s'il vous plaît.
  "おしえる-19": ["to teach, to tell", "lehren, zeigen", "Please tell me the way.", "Zeigen Sie mir bitte den Weg."],
  // 押す — pousser, appuyer · このボタンを押してください。 — Appuyez sur ce bouton, s'il vous plaît.
  "おす-20": ["to push, to press", "drücken", "Please press this button.", "Drücken Sie bitte diesen Knopf."],
  // 覚える — mémoriser, retenir · 毎日かんじを五つ覚えます。 — J'apprends cinq kanji par jour.
  "おぼえる-21": ["to memorise, to remember", "sich merken, auswendig lernen", "I learn five kanji every day.", "Ich lerne jeden Tag fünf Kanji."],
  // 泳ぐ — nager · 夏は海で泳ぎます。 — L'été, je nage dans la mer.
  "およぐ-22": ["to swim", "schwimmen", "In summer I swim in the sea.", "Im Sommer schwimme ich im Meer."],
  // 降りる — descendre (d'un véhicule) · 次の駅で電車を降ります。 — Je descends du train à la prochaine gare.
  "おりる-23": ["to get off (a vehicle)", "aussteigen", "I get off the train at the next station.", "Ich steige am nächsten Bahnhof aus dem Zug."],
  // 終わる — finir, se terminer · じゅぎょうは三時に終わります。 — Le cours finit à trois heures.
  "おわる-24": ["to end, to finish", "enden, aufhören", "The lesson ends at three.", "Der Unterricht endet um drei."],
  // 買う — acheter · スーパーで牛乳を買います。 — J'achète du lait au supermarché.
  "かう-25": ["to buy", "kaufen", "I buy milk at the supermarket.", "Ich kaufe Milch im Supermarkt."],
  // 返す — rendre · としょかんに本を返します。 — Je rends le livre à la bibliothèque.
  "かえす-26": ["to give back, to return", "zurückgeben", "I return the book to the library.", "Ich gebe das Buch in der Bibliothek zurück."],
  // 帰る — rentrer · 七時にうちへ帰ります。 — Je rentre à la maison à sept heures.
  "かえる-27": ["to go home", "nach Hause gehen", "I go home at seven.", "Ich gehe um sieben nach Hause."],
  // 書く — écrire · 母に手紙を書きます。 — J'écris une lettre à ma mère.
  "かく-28": ["to write", "schreiben", "I write a letter to my mother.", "Ich schreibe meiner Mutter einen Brief."],
  // 掛ける — accrocher ; mettre (lunettes) ; passer (un appel) · 友だちに電話をかけます。 — J'appelle un ami.
  "かける-29": ["to hang; to put on (glasses); to make (a call)", "aufhängen; aufsetzen (Brille); anrufen", "I call a friend.", "Ich rufe einen Freund an."],
  // 貸す — prêter · 友だちにかさを貸しました。 — J'ai prêté mon parapluie à un ami.
  "かす-30": ["to lend", "verleihen", "I lent my umbrella to a friend.", "Ich habe einem Freund meinen Schirm geliehen."],
  // 被る — porter (sur la tête) · あつい日はぼうしをかぶります。 — Les jours de chaleur, je porte un chapeau.
  "かぶる-31": ["to wear (on the head)", "aufsetzen (auf den Kopf)", "On hot days I wear a hat.", "An heißen Tagen trage ich einen Hut."],
  // 借りる — emprunter · としょかんで本を借ります。 — J'emprunte un livre à la bibliothèque.
  "かりる-32": ["to borrow", "sich leihen", "I borrow a book from the library.", "Ich leihe mir ein Buch in der Bibliothek aus."],
  // 消える — s'éteindre, disparaître · でんきが消えました。 — La lumière s'est éteinte.
  "きえる-33": ["to go out, to disappear", "ausgehen, verschwinden", "The light went out.", "Das Licht ging aus."],
  // 聞く — écouter ; demander · 毎晩音楽を聞きます。 — J'écoute de la musique tous les soirs.
  "きく-34": ["to listen; to ask", "hören; fragen", "I listen to music every evening.", "Ich höre jeden Abend Musik."],
  // 切る — couper · ナイフでパンを切ります。 — Je coupe le pain avec un couteau.
  "きる-35": ["to cut", "schneiden", "I cut the bread with a knife.", "Ich schneide das Brot mit einem Messer."],
  // 着る — mettre, porter (un haut) · さむいのでセーターを着ます。 — Il fait froid, alors je mets un pull.
  "きる-36": ["to wear, to put on (a top)", "anziehen (Oberteil)", "It's cold, so I put on a jumper.", "Es ist kalt, deshalb ziehe ich einen Pullover an."],
  // 曇る — se couvrir (le ciel) · 午後から曇りました。 — Le ciel s'est couvert à partir de l'après-midi.
  "くもる-37": ["to cloud over", "sich bewölken", "It clouded over in the afternoon.", "Am Nachmittag zog es sich zu."],
  // 来る — venir · 友だちがうちに来ます。 — Un ami vient à la maison.
  "くる-38": ["to come", "kommen", "A friend is coming to my house.", "Ein Freund kommt zu mir nach Hause."],
  // 消す — éteindre ; effacer · ねる前にでんきを消します。 — J'éteins la lumière avant de dormir.
  "けす-39": ["to switch off; to erase", "ausschalten; löschen", "I switch off the light before going to sleep.", "Vor dem Schlafen mache ich das Licht aus."],
  // 答える — répondre · しつもんに答えてください。 — Répondez à la question, s'il vous plaît.
  "こたえる-40": ["to answer", "antworten", "Please answer the question.", "Beantworten Sie bitte die Frage."],
  // コピーする — photocopier · この紙をコピーします。 — Je photocopie cette feuille.
  "コピーする-41": ["to photocopy", "kopieren", "I photocopy this sheet.", "Ich kopiere dieses Blatt."],
  // 困る — être embêté · かぎがなくて困っています。 — Je suis embêté, je n'ai pas mes clés.
  "こまる-42": ["to be in trouble, to be stuck", "in Schwierigkeiten sein", "I'm stuck, I don't have my keys.", "Ich habe ein Problem, ich habe meine Schlüssel nicht."],
  // 咲く — fleurir · 春にさくらが咲きます。 — Les cerisiers fleurissent au printemps.
  "さく-43": ["to bloom", "blühen", "The cherry trees bloom in spring.", "Im Frühling blühen die Kirschbäume."],
  // 差す — ouvrir (un parapluie) · 雨なのでかさを差します。 — Il pleut, alors j'ouvre mon parapluie.
  "さす-44": ["to open (an umbrella)", "aufspannen (Schirm)", "It's raining, so I open my umbrella.", "Es regnet, deshalb spanne ich meinen Schirm auf."],
  // 死ぬ — mourir · その犬は去年死にました。 — Ce chien est mort l'année dernière.
  "しぬ-45": ["to die", "sterben", "That dog died last year.", "Der Hund ist letztes Jahr gestorben."],
  // 閉まる — se fermer · 店は八時に閉まります。 — Le magasin ferme à huit heures.
  "しまる-46": ["to close (by itself)", "schließen, zugehen", "The shop closes at eight.", "Der Laden schließt um acht."],
  // 閉める — fermer · ドアを閉めてください。 — Fermez la porte, s'il vous plaît.
  "しめる-47": ["to close", "schließen", "Please close the door.", "Schließen Sie bitte die Tür."],
  // 締める — serrer, attacher · 車ではシートベルトを締めます。 — En voiture, j'attache ma ceinture.
  "しめる-48": ["to tighten, to fasten", "festziehen, anlegen", "In the car I fasten my seat belt.", "Im Auto lege ich den Gurt an."],
  // 知る — savoir, connaître · その人の名前を知っていますか。 — Tu connais le nom de cette personne ?
  "しる-49": ["to know", "wissen, kennen", "Do you know that person's name?", "Kennst du den Namen dieser Person?"],
  // 吸う — aspirer, fumer · ここでたばこを吸わないでください。 — Ne fumez pas ici, s'il vous plaît.
  "すう-50": ["to breathe in, to smoke", "einatmen, rauchen", "Please don't smoke here.", "Bitte rauchen Sie hier nicht."],
  // 住む — habiter · わたしは大阪に住んでいます。 — J'habite à Osaka.
  "すむ-51": ["to live (somewhere)", "wohnen", "I live in Osaka.", "Ich wohne in Osaka."],
  // する — faire · 日曜日にテニスをします。 — Je joue au tennis le dimanche.
  "する-52": ["to do", "machen, tun", "I play tennis on Sundays.", "Sonntags spiele ich Tennis."],
  // 座る — s'asseoir · どうぞ、ここに座ってください。 — Je vous en prie, asseyez-vous ici.
  "すわる-53": ["to sit down", "sich setzen", "Please, sit here.", "Bitte, setzen Sie sich hierhin."],
  // 出す — sortir (quelque chose) ; rendre, envoyer · あしたしゅくだいを出します。 — Je rends mes devoirs demain.
  "だす-54": ["to take out; to hand in, to send", "herausnehmen; abgeben, abschicken", "I'll hand in my homework tomorrow.", "Morgen gebe ich meine Hausaufgaben ab."],
  // 立つ — se lever, se tenir debout · 名前をよばれたら立ってください。 — Levez-vous quand on appelle votre nom.
  "たつ-55": ["to stand up", "aufstehen, stehen", "Please stand up when your name is called.", "Stehen Sie bitte auf, wenn Ihr Name aufgerufen wird."],
  // 頼む — demander (un service) · 友だちに手伝いを頼みました。 — J'ai demandé de l'aide à un ami.
  "たのむ-56": ["to ask (a favour)", "bitten (um einen Gefallen)", "I asked a friend for help.", "Ich habe einen Freund um Hilfe gebeten."],
  // 食べる — manger · 昼ごはんにラーメンを食べます。 — Je mange des ramen pour le déjeuner.
  "たべる-57": ["to eat", "essen", "I eat ramen for lunch.", "Zum Mittagessen esse ich Ramen."],
  // 違う — être différent ; être faux · 答えが違います。 — La réponse est fausse.
  "ちがう-58": ["to be different; to be wrong", "anders sein; falsch sein", "The answer is wrong.", "Die Antwort ist falsch."],
  // 使う — utiliser · はしを使って食べます。 — Je mange avec des baguettes.
  "つかう-59": ["to use", "benutzen", "I eat with chopsticks.", "Ich esse mit Stäbchen."],
  // 疲れる — se fatiguer · 今日はとても疲れました。 — Aujourd'hui, je suis très fatigué(e).
  "つかれる-60": ["to get tired", "müde werden", "I'm very tired today.", "Heute bin ich sehr müde."],
  // 着く — arriver · 電車は九時に着きます。 — Le train arrive à neuf heures.
  "つく-61": ["to arrive", "ankommen", "The train arrives at nine.", "Der Zug kommt um neun an."],
  // 作る — fabriquer, préparer · 母はカレーを作りました。 — Ma mère a préparé du curry.
  "つくる-62": ["to make, to prepare", "machen, zubereiten", "My mother made curry.", "Meine Mutter hat Curry gekocht."],
  // 点ける — allumer · テレビをつけてもいいですか。 — Je peux allumer la télé ?
  "つける-63": ["to switch on", "einschalten", "May I switch on the TV?", "Darf ich den Fernseher einschalten?"],
  // 勤める — travailler (pour une entreprise) · 兄は銀行に勤めています。 — Mon grand frère travaille dans une banque.
  "つとめる-64": ["to work (for a company)", "arbeiten (bei einer Firma)", "My older brother works at a bank.", "Mein älterer Bruder arbeitet bei einer Bank."],
  // 出かける — sortir (de chez soi) · 週末は家族と出かけます。 — Le week-end, je sors avec ma famille.
  "でかける-65": ["to go out (from home)", "ausgehen", "At the weekend I go out with my family.", "Am Wochenende gehe ich mit meiner Familie aus."],
  // 出来る — pouvoir, savoir faire · わたしは日本語ができます。 — Je sais parler japonais.
  "できる-66": ["can, to be able to", "können", "I can speak Japanese.", "Ich kann Japanisch."],
  // 出る — sortir ; partir · 毎朝八時に家を出ます。 — Je pars de la maison à huit heures tous les matins.
  "でる-67": ["to go out; to leave", "hinausgehen; verlassen", "I leave home at eight every morning.", "Ich verlasse jeden Morgen um acht das Haus."],
  // 飛ぶ — voler (dans les airs) · 空を鳥が飛んでいます。 — Des oiseaux volent dans le ciel.
  "とぶ-68": ["to fly", "fliegen", "Birds are flying in the sky.", "Am Himmel fliegen Vögel."],
  // 止まる — s'arrêter · バスが駅の前で止まりました。 — Le bus s'est arrêté devant la gare.
  "とまる-69": ["to stop", "anhalten", "The bus stopped in front of the station.", "Der Bus hielt vor dem Bahnhof."],
  // 取る — prendre · しおを取ってください。 — Passe-moi le sel, s'il te plaît.
  "とる-70": ["to take", "nehmen", "Please pass me the salt.", "Gib mir bitte das Salz."],
  // 撮る — prendre (une photo) · ここで写真を撮りましょう。 — Prenons une photo ici.
  "とる-71": ["to take (a photo)", "aufnehmen (Foto)", "Let's take a photo here.", "Lass uns hier ein Foto machen."],
  // 鳴く — chanter, crier (animaux) · 朝、鳥が鳴いています。 — Le matin, les oiseaux chantent.
  "なく-72": ["to sing, to cry (animals)", "singen, rufen (Tiere)", "In the morning the birds are singing.", "Am Morgen singen die Vögel."],
  // 無くす — perdre (quelque chose) · さいふを無くしました。 — J'ai perdu mon portefeuille.
  "なくす-73": ["to lose (something)", "verlieren", "I lost my wallet.", "Ich habe meinen Geldbeutel verloren."],
  // 習う — apprendre (auprès de quelqu'un) · ピアノを習っています。 — J'apprends le piano.
  "ならう-74": ["to learn (from someone)", "lernen (bei jemandem)", "I'm learning the piano.", "Ich lerne Klavier."],
  // 並ぶ — faire la queue, être aligné · みんなが店の前に並んでいます。 — Tout le monde fait la queue devant le magasin.
  "ならぶ-75": ["to queue, to line up", "anstehen, sich aufreihen", "Everyone is queuing in front of the shop.", "Alle stehen vor dem Laden Schlange."],
  // 並べる — aligner, disposer · テーブルにおさらを並べます。 — Je dispose les assiettes sur la table.
  "ならべる-76": ["to line up, to arrange", "aufreihen, anordnen", "I set the plates out on the table.", "Ich stelle die Teller auf den Tisch."],
  // 成る — devenir · わたしは先生になりたいです。 — Je veux devenir professeur.
  "なる-77": ["to become", "werden", "I want to become a teacher.", "Ich möchte Lehrer werden."],
  // 脱ぐ — enlever (un vêtement) · 家に入る前にくつを脱ぎます。 — J'enlève mes chaussures avant d'entrer dans la maison.
  "ぬぐ-78": ["to take off (clothes)", "ausziehen", "I take my shoes off before going into the house.", "Ich ziehe die Schuhe aus, bevor ich ins Haus gehe."],
  // 寝る — dormir, se coucher · 毎晩十一時に寝ます。 — Je me couche à onze heures tous les soirs.
  "ねる-79": ["to sleep, to go to bed", "schlafen, ins Bett gehen", "I go to bed at eleven every night.", "Ich gehe jeden Abend um elf ins Bett."],
  // 登る — grimper, monter · 夏に富士山に登りました。 — J'ai fait l'ascension du mont Fuji en été.
  "のぼる-80": ["to climb", "hinaufsteigen", "I climbed Mount Fuji in the summer.", "Im Sommer habe ich den Fuji bestiegen."],
  // 飲む — boire ; prendre (un médicament) · 毎朝コーヒーを飲みます。 — Je bois un café tous les matins.
  "のむ-81": ["to drink; to take (medicine)", "trinken; einnehmen (Medizin)", "I drink a coffee every morning.", "Ich trinke jeden Morgen einen Kaffee."],
  // 乗る — monter (dans un véhicule) · 駅からバスに乗ります。 — Je prends le bus à la gare.
  "のる-82": ["to get on (a vehicle)", "einsteigen", "I take the bus from the station.", "Am Bahnhof steige ich in den Bus."],
  // 入る — entrer · どうぞ、入ってください。 — Entrez, je vous en prie.
  "はいる-83": ["to enter", "hineingehen", "Please, come in.", "Bitte, kommen Sie herein."],
  // 履く — mettre, porter (en bas : chaussures, pantalon) · あたらしいくつを履きます。 — Je mets mes nouvelles chaussures.
  "はく-84": ["to put on, to wear (shoes, trousers)", "anziehen (Schuhe, Hose)", "I put on my new shoes.", "Ich ziehe meine neuen Schuhe an."],
  // 走る — courir · 毎朝こうえんを走ります。 — Je cours au parc tous les matins.
  "はしる-85": ["to run", "laufen, rennen", "I go running in the park every morning.", "Ich laufe jeden Morgen im Park."],
  // 働く — travailler · 父は会社で働いています。 — Mon père travaille dans une entreprise.
  "はたらく-86": ["to work", "arbeiten", "My father works for a company.", "Mein Vater arbeitet in einer Firma."],
  // 話す — parler · 友だちと日本語で話します。 — Je parle japonais avec un ami.
  "はなす-87": ["to speak", "sprechen", "I speak Japanese with a friend.", "Ich spreche mit einem Freund Japanisch."],
  // 貼る — coller · ふうとうにきってを貼ります。 — Je colle un timbre sur l'enveloppe.
  "はる-88": ["to stick", "kleben", "I stick a stamp on the envelope.", "Ich klebe eine Briefmarke auf den Umschlag."],
  // 晴れる — faire beau (s'éclaircir) · あしたは晴れるでしょう。 — Demain, il fera sans doute beau.
  "はれる-89": ["to clear up (weather)", "sich aufklären (Wetter)", "It will probably be sunny tomorrow.", "Morgen wird es wohl schön."],
  // 引く — tirer ; attraper (un rhume) · かぜを引きました。 — J'ai attrapé un rhume.
  "ひく-90": ["to pull; to catch (a cold)", "ziehen; sich (eine Erkältung) holen", "I caught a cold.", "Ich habe mich erkältet."],
  // 弾く — jouer (d'un instrument à cordes ou à clavier) · 妹はピアノを弾きます。 — Ma petite sœur joue du piano.
  "ひく-91": ["to play (a string or keyboard instrument)", "spielen (Saiten- oder Tasteninstrument)", "My younger sister plays the piano.", "Meine kleine Schwester spielt Klavier."],
  // 吹く — souffler · 今日はつよい風が吹いています。 — Aujourd'hui, un vent fort souffle.
  "ふく-92": ["to blow", "wehen, blasen", "A strong wind is blowing today.", "Heute weht ein starker Wind."],
  // 降る — tomber (pluie, neige) · 朝から雨が降っています。 — Il pleut depuis ce matin.
  "ふる-93": ["to fall (rain, snow)", "fallen (Regen, Schnee)", "It has been raining since this morning.", "Es regnet seit heute Morgen."],
  // 曲がる — tourner (à un angle) · 次のかどを右に曲がってください。 — Tournez à droite au prochain coin de rue, s'il vous plaît.
  "まがる-94": ["to turn (at a corner)", "abbiegen", "Please turn right at the next corner.", "Biegen Sie bitte an der nächsten Ecke rechts ab."],
  // 待つ — attendre · ちょっと待ってください。 — Attendez un instant, s'il vous plaît.
  "まつ-95": ["to wait", "warten", "Please wait a moment.", "Warten Sie bitte einen Moment."],
  // 磨く — brosser, polir · ねる前に歯を磨きます。 — Je me brosse les dents avant de dormir.
  "みがく-96": ["to brush, to polish", "putzen, polieren", "I brush my teeth before going to bed.", "Vor dem Schlafen putze ich mir die Zähne."],
  // 見せる — montrer · パスポートを見せてください。 — Montrez votre passeport, s'il vous plaît.
  "みせる-97": ["to show", "zeigen", "Please show your passport.", "Zeigen Sie bitte Ihren Reisepass."],
  // 見る — voir, regarder · 夜テレビを見ます。 — Je regarde la télé le soir.
  "みる-98": ["to see, to watch", "sehen, anschauen", "I watch TV in the evening.", "Abends sehe ich fern."],
  // 持つ — tenir, avoir sur soi · かさを持っていますか。 — As-tu un parapluie ?
  "もつ-99": ["to hold, to have (with you)", "halten, dabeihaben", "Do you have an umbrella?", "Hast du einen Schirm dabei?"],
  // 休む — se reposer ; être absent · 今日は学校を休みます。 — Aujourd'hui, je ne vais pas à l'école.
  "やすむ-100": ["to rest; to be absent", "sich ausruhen; fehlen", "I'm staying home from school today.", "Heute gehe ich nicht zur Schule."],
  // 遣る — faire (familier) ; donner (à un animal) · 犬にえさをやります。 — Je donne à manger au chien.
  "やる-101": ["to do (casual); to give (to an animal)", "machen (locker); geben (einem Tier)", "I feed the dog.", "Ich füttere den Hund."],
  // 呼ぶ — appeler ; inviter · タクシーを呼んでください。 — Appelez un taxi, s'il vous plaît.
  "よぶ-102": ["to call; to invite", "rufen; einladen", "Please call a taxi.", "Rufen Sie bitte ein Taxi."],
  // 読む — lire · 電車で本を読みます。 — Je lis un livre dans le train.
  "よむ-103": ["to read", "lesen", "I read a book on the train.", "Im Zug lese ich ein Buch."],
  // 分かる — comprendre · 日本語が少し分かります。 — Je comprends un peu le japonais.
  "わかる-104": ["to understand", "verstehen", "I understand a little Japanese.", "Ich verstehe ein bisschen Japanisch."],
  // 忘れる — oublier · しゅくだいを忘れました。 — J'ai oublié mes devoirs.
  "わすれる-105": ["to forget", "vergessen", "I forgot my homework.", "Ich habe meine Hausaufgaben vergessen."],
  // 渡す — remettre, donner · 先生にレポートを渡します。 — Je remets mon rapport au professeur.
  "わたす-106": ["to hand over", "überreichen", "I hand my report to the teacher.", "Ich gebe dem Lehrer meinen Bericht."],
  // 渡る — traverser · ここで道を渡りましょう。 — Traversons la rue ici.
  "わたる-107": ["to cross", "überqueren", "Let's cross the road here.", "Lass uns hier die Straße überqueren."],
  // 上がる — monter ; augmenter · どうぞ、上がってください。 — Entrez, je vous en prie (montez dans la maison).
  "あがる-108": ["to go up; to rise", "hinaufgehen; steigen", "Please, come in (step up into the house).", "Bitte, kommen Sie herein (treten Sie ins Haus)."],
  // 空く — se libérer, être vide · この席は空いていますか。 — Cette place est libre ?
  "あく-109": ["to become free, to be empty", "frei werden, leer sein", "Is this seat free?", "Ist dieser Platz frei?"],
  // あげる — donner (à quelqu'un) · 妹にケーキをあげました。 — J'ai donné un gâteau à ma petite sœur.
  "あげる-110": ["to give (to someone)", "geben (jemandem)", "I gave a cake to my younger sister.", "Ich habe meiner kleinen Schwester einen Kuchen geschenkt."],
  // 集まる — se rassembler · 駅の前にみんなが集まりました。 — Tout le monde s'est rassemblé devant la gare.
  "あつまる-111": ["to gather", "sich versammeln", "Everyone gathered in front of the station.", "Alle versammelten sich vor dem Bahnhof."],
  // 集める — rassembler, collectionner · わたしはきってを集めています。 — Je collectionne les timbres.
  "あつめる-112": ["to gather, to collect", "sammeln", "I collect stamps.", "Ich sammle Briefmarken."],
  // 謝る — s'excuser · おくれたので先生に謝りました。 — J'étais en retard, alors je me suis excusé auprès du professeur.
  "あやまる-113": ["to apologise", "sich entschuldigen", "I was late, so I apologised to the teacher.", "Ich war zu spät, deshalb habe ich mich beim Lehrer entschuldigt."],
  // 合う — aller (bien), convenir · このくつはサイズが合いません。 — Ces chaussures ne sont pas à ma taille.
  "あう-114": ["to fit, to suit", "passen", "These shoes aren't my size.", "Diese Schuhe haben nicht meine Größe."],
  // 生きる — vivre · ねこは十五年ぐらい生きます。 — Les chats vivent environ quinze ans.
  "いきる-115": ["to live", "leben", "Cats live about fifteen years.", "Katzen leben etwa fünfzehn Jahre."],
  // 急ぐ — se dépêcher · 時間がないので急ぎましょう。 — On n'a pas le temps, dépêchons-nous.
  "いそぐ-116": ["to hurry", "sich beeilen", "We don't have time, let's hurry.", "Wir haben keine Zeit, beeilen wir uns."],
  // 祈る — prier ; souhaiter · みんなの健康を祈ります。 — Je souhaite la bonne santé de tout le monde.
  "いのる-117": ["to pray; to wish", "beten; wünschen", "I wish everyone good health.", "Ich wünsche allen Gesundheit."],
  // 苛める — maltraiter, harceler · 動物をいじめてはいけません。 — Il ne faut pas maltraiter les animaux.
  "いじめる-118": ["to bully, to mistreat", "schikanieren, quälen", "You must not mistreat animals.", "Man darf Tiere nicht quälen."],
  // 植える — planter · にわに木を植えました。 — J'ai planté un arbre dans le jardin.
  "うえる-119": ["to plant", "pflanzen", "I planted a tree in the garden.", "Ich habe einen Baum im Garten gepflanzt."],
  // 伺う — demander ; rendre visite (poli) · あした先生のお宅に伺います。 — Demain, je rends visite au professeur chez lui.
  "うかがう-120": ["to ask; to visit (polite)", "fragen; besuchen (höflich)", "Tomorrow I will visit my teacher at home.", "Morgen besuche ich meinen Lehrer zu Hause."],
  // 受ける — passer (un examen) ; recevoir · 来月日本語のしけんを受けます。 — Le mois prochain, je passe un examen de japonais.
  "うける-121": ["to take (an exam); to receive", "ablegen (Prüfung); erhalten", "Next month I'm taking a Japanese exam.", "Nächsten Monat lege ich eine Japanischprüfung ab."],
  // 動く — bouger, fonctionner · このとけいは動きません。 — Cette horloge ne marche pas.
  "うごく-122": ["to move, to work (machine)", "sich bewegen, funktionieren", "This clock doesn't work.", "Diese Uhr geht nicht."],
  // 写す — copier ; photographier · 黒板の字をノートに写します。 — Je recopie ce qui est au tableau dans mon cahier.
  "うつす-123": ["to copy; to photograph", "abschreiben; fotografieren", "I copy what's on the board into my notebook.", "Ich schreibe die Tafel in mein Heft ab."],
  // 移る — déménager, changer (de lieu) · 来年東京に移ります。 — L'an prochain, je m'installe à Tokyo.
  "うつる-124": ["to move (to another place)", "umziehen, wechseln", "Next year I'm moving to Tokyo.", "Nächstes Jahr ziehe ich nach Tokio."],
  // 打つ — frapper · ボールをバットで打ちます。 — Je frappe la balle avec la batte.
  "うつ-125": ["to hit", "schlagen", "I hit the ball with the bat.", "Ich schlage den Ball mit dem Schläger."],
  // 選ぶ — choisir · すきな色を選んでください。 — Choisis ta couleur préférée.
  "えらぶ-126": ["to choose", "wählen, aussuchen", "Choose your favourite colour.", "Such dir deine Lieblingsfarbe aus."],
  // 起こす — réveiller (quelqu'un) · あした六時に起こしてください。 — Réveille-moi à six heures demain, s'il te plaît.
  "おこす-127": ["to wake (someone) up", "wecken", "Please wake me up at six tomorrow.", "Weck mich bitte morgen um sechs."],
  // 行う — organiser, effectuer (écrit) · しけんは月曜日に行います。 — L'examen aura lieu lundi.
  "おこなう-128": ["to hold, to carry out (written)", "durchführen, abhalten (schriftlich)", "The exam will be held on Monday.", "Die Prüfung findet am Montag statt."],
  // 怒る — se fâcher · 母はとても怒っています。 — Ma mère est très fâchée.
  "おこる-129": ["to get angry", "sich ärgern, wütend werden", "My mother is very angry.", "Meine Mutter ist sehr wütend."],
  // 送る — envoyer ; raccompagner · 友だちにメールを送ります。 — J'envoie un e-mail à un ami.
  "おくる-130": ["to send; to see off", "schicken; begleiten", "I send an email to a friend.", "Ich schicke einem Freund eine E-Mail."],
  // 遅れる — être en retard · 電車が十分遅れました。 — Le train a eu dix minutes de retard.
  "おくれる-131": ["to be late", "sich verspäten", "The train was ten minutes late.", "Der Zug hatte zehn Minuten Verspätung."],
  // 落ちる — tomber · 木から葉が落ちます。 — Les feuilles tombent de l'arbre.
  "おちる-132": ["to fall", "fallen", "Leaves fall from the tree.", "Die Blätter fallen vom Baum."],
  // 落とす — faire tomber ; perdre · さいふを落としました。 — J'ai fait tomber (perdu) mon portefeuille.
  "おとす-133": ["to drop; to lose", "fallen lassen; verlieren", "I dropped (lost) my wallet.", "Ich habe meinen Geldbeutel verloren."],
  // 驚く — être surpris · そのニュースに驚きました。 — Cette nouvelle m'a surpris.
  "おどろく-134": ["to be surprised", "überrascht sein", "That news surprised me.", "Die Nachricht hat mich überrascht."],
  // 踊る — danser · パーティーでみんなと踊りました。 — J'ai dansé avec tout le monde à la fête.
  "おどる-135": ["to dance", "tanzen", "I danced with everyone at the party.", "Ich habe auf der Party mit allen getanzt."],
  // 思う — penser, croire · あしたは雨がふると思います。 — Je pense qu'il va pleuvoir demain.
  "おもう-136": ["to think, to believe", "denken, glauben", "I think it will rain tomorrow.", "Ich glaube, morgen regnet es."],
  // 思い出す — se souvenir · この写真を見ると、子どものころを思い出します。 — Quand je regarde cette photo, je me souviens de mon enfance.
  "おもいだす-137": ["to remember", "sich erinnern", "When I look at this photo, I remember my childhood.", "Wenn ich dieses Foto sehe, erinnere ich mich an meine Kindheit."],
  // 折る — plier ; casser · 紙をはんぶんに折ってください。 — Pliez la feuille en deux, s'il vous plaît.
  "おる-138": ["to fold; to break", "falten; brechen", "Please fold the sheet in half.", "Falten Sie das Blatt bitte in der Mitte."],
  // 折れる — se casser, se plier · 強い風で木の枝が折れました。 — Une branche s'est cassée à cause du vent fort.
  "おれる-139": ["to break, to bend", "brechen, abknicken", "A branch broke in the strong wind.", "Im starken Wind ist ein Ast abgebrochen."],
  // 変える — changer (quelque chose) · かみの色を変えました。 — J'ai changé la couleur de mes cheveux.
  "かえる-140": ["to change (something)", "ändern", "I changed my hair colour.", "Ich habe meine Haarfarbe geändert."],
  // 飾る — décorer · へやに花を飾ります。 — Je décore la chambre avec des fleurs.
  "かざる-141": ["to decorate", "schmücken", "I decorate the room with flowers.", "Ich schmücke das Zimmer mit Blumen."],
  // 片付ける — ranger · あそんだ後はおもちゃを片付けてね。 — Après avoir joué, range tes jouets.
  "かたづける-142": ["to tidy up", "aufräumen", "After playing, tidy your toys away.", "Räum nach dem Spielen dein Spielzeug auf."],
  // 勝つ — gagner · わたしたちのチームが勝ちました。 — Notre équipe a gagné.
  "かつ-143": ["to win", "gewinnen", "Our team won.", "Unsere Mannschaft hat gewonnen."],
  // 構う — se soucier de ; déranger · わたしはかまいません。 — Ça ne me dérange pas.
  "かまう-144": ["to mind; to bother", "sich kümmern; stören", "I don't mind.", "Das macht mir nichts aus."],
  // 噛む — mordre, mâcher · よく噛んで食べてください。 — Mâche bien en mangeant.
  "かむ-145": ["to bite, to chew", "beißen, kauen", "Chew well when you eat.", "Kau beim Essen gut."],
  // 通う — fréquenter, faire des allers-retours · 毎日バスで学校に通っています。 — Je vais à l'école en bus tous les jours.
  "かよう-146": ["to attend regularly, to commute", "regelmäßig hingehen, pendeln", "I go to school by bus every day.", "Ich fahre jeden Tag mit dem Bus zur Schule."],
  // 乾く — sécher · せんたくものがもう乾きました。 — Le linge a déjà séché.
  "かわく-147": ["to dry", "trocknen", "The washing has already dried.", "Die Wäsche ist schon trocken."],
  // 変わる — changer, se transformer · 町がずいぶん変わりました。 — La ville a beaucoup changé.
  "かわる-148": ["to change", "sich ändern", "The town has changed a lot.", "Die Stadt hat sich sehr verändert."],
  // 考える — réfléchir · よく考えてから答えます。 — Je réponds après avoir bien réfléchi.
  "かんがえる-149": ["to think about, to consider", "nachdenken", "I answer after thinking carefully.", "Ich antworte, nachdem ich gut nachgedacht habe."],
  // 頑張る — faire de son mieux · しけんまで頑張ります。 — Je vais faire de mon mieux jusqu'à l'examen.
  "がんばる-150": ["to do your best", "sich anstrengen, durchhalten", "I'll do my best until the exam.", "Bis zur Prüfung gebe ich mein Bestes."],
  // 聞こえる — s'entendre (être audible) · となりのへやから音楽が聞こえます。 — On entend de la musique depuis la pièce d'à côté.
  "きこえる-151": ["to be audible", "zu hören sein", "I can hear music from the next room.", "Aus dem Nebenzimmer hört man Musik."],
  // 決まる — être décidé · 旅行の日が決まりました。 — La date du voyage est fixée.
  "きまる-152": ["to be decided", "festgelegt werden", "The date of the trip has been fixed.", "Der Termin für die Reise steht fest."],
  // 決める — décider · どこへ行くか決めましょう。 — Décidons où aller.
  "きめる-153": ["to decide", "entscheiden", "Let's decide where to go.", "Lass uns entscheiden, wohin wir gehen."],
  // 比べる — comparer · 二つのかばんを比べます。 — Je compare les deux sacs.
  "くらべる-154": ["to compare", "vergleichen", "I compare the two bags.", "Ich vergleiche die beiden Taschen."],
  // くれる — donner (à moi) · 友だちが本をくれました。 — Un ami m'a donné un livre.
  "くれる-155": ["to give (to me)", "geben (mir)", "A friend gave me a book.", "Ein Freund hat mir ein Buch geschenkt."],
  // 暮れる — tomber (la nuit), finir (l'année) · 冬は日が早く暮れます。 — En hiver, la nuit tombe tôt.
  "くれる-156": ["to get dark; to end (the year)", "dunkel werden; zu Ende gehen (Jahr)", "In winter it gets dark early.", "Im Winter wird es früh dunkel."],
  // 込む — être bondé · 朝の電車はとても込んでいます。 — Les trains du matin sont bondés.
  "こむ-157": ["to be crowded", "voll sein", "The morning trains are very crowded.", "Die Züge am Morgen sind sehr voll."],
  // 壊す — casser · 弟がおもちゃを壊しました。 — Mon petit frère a cassé un jouet.
  "こわす-158": ["to break", "kaputt machen", "My younger brother broke a toy.", "Mein kleiner Bruder hat ein Spielzeug kaputt gemacht."],
  // 壊れる — se casser, tomber en panne · パソコンが壊れました。 — Mon ordinateur est tombé en panne.
  "こわれる-159": ["to break, to break down", "kaputtgehen", "My computer broke down.", "Mein Computer ist kaputt."],
  // 探す — chercher · めがねを探しています。 — Je cherche mes lunettes.
  "さがす-160": ["to look for", "suchen", "I'm looking for my glasses.", "Ich suche meine Brille."],
  // 下がる — baisser, descendre · ねつが下がりました。 — La fièvre est tombée.
  "さがる-161": ["to go down, to drop", "sinken, fallen", "The fever has gone down.", "Das Fieber ist gesunken."],
  // 下げる — baisser (quelque chose) · 音を少し下げてください。 — Baisse un peu le son, s'il te plaît.
  "さげる-162": ["to lower (something)", "senken", "Please turn the sound down a little.", "Mach den Ton bitte etwas leiser."],
  // 騒ぐ — faire du bruit · 図書館で騒がないでください。 — Ne faites pas de bruit à la bibliothèque.
  "さわぐ-163": ["to make noise", "Lärm machen", "Please don't make noise in the library.", "Bitte seien Sie in der Bibliothek leise."],
  // 触る — toucher · 作品に触らないでください。 — Ne touchez pas les œuvres, s'il vous plaît.
  "さわる-164": ["to touch", "berühren", "Please don't touch the exhibits.", "Bitte berühren Sie die Ausstellungsstücke nicht."],
  // 叱る — gronder · 先生は学生を叱りました。 — Le professeur a grondé l'élève.
  "しかる-165": ["to scold", "schimpfen, tadeln", "The teacher scolded the student.", "Der Lehrer hat den Schüler getadelt."],
  // 調べる — chercher, vérifier · 分からない言葉をじしょで調べます。 — Je cherche les mots que je ne connais pas dans le dictionnaire.
  "しらべる-166": ["to look up, to check", "nachschlagen, prüfen", "I look up words I don't know in the dictionary.", "Ich schlage Wörter, die ich nicht kenne, im Wörterbuch nach."],
  // 知らせる — informer, prévenir · 結果をメールで知らせます。 — Je vous préviendrai du résultat par e-mail.
  "しらせる-167": ["to inform, to let know", "benachrichtigen, Bescheid geben", "I'll let you know the result by email.", "Ich teile Ihnen das Ergebnis per E-Mail mit."],
  // 空く — être peu rempli ; avoir faim (お腹が) · おなかが空きました。 — J'ai faim.
  "すく-168": ["to be empty; to be hungry (お腹が)", "leer sein; Hunger haben (お腹が)", "I'm hungry.", "Ich habe Hunger."],
  // 過ぎる — passer, dépasser · もう十時を過ぎました。 — Il est déjà plus de dix heures.
  "すぎる-169": ["to pass, to exceed", "vorbeigehen, überschreiten", "It's already past ten.", "Es ist schon nach zehn."],
  // 進む — avancer · まっすぐ進んでください。 — Avancez tout droit, s'il vous plaît.
  "すすむ-170": ["to advance, to go forward", "vorangehen", "Please go straight ahead.", "Gehen Sie bitte geradeaus."],
  // 滑る — glisser · 雪の日は道が滑ります。 — Les jours de neige, la route est glissante.
  "すべる-171": ["to slip, to slide", "rutschen, gleiten", "On snowy days the roads are slippery.", "An Schneetagen ist die Straße glatt."],
  // 済む — se terminer, être réglé · しごとがやっと済みました。 — Le travail est enfin terminé.
  "すむ-172": ["to be finished, to be settled", "erledigt sein", "The work is finally done.", "Die Arbeit ist endlich erledigt."],
  // 育てる — élever, faire pousser · にわで野菜を育てています。 — Je fais pousser des légumes dans le jardin.
  "そだてる-173": ["to raise, to grow", "aufziehen, anbauen", "I grow vegetables in the garden.", "Ich baue im Garten Gemüse an."],
  // 倒れる — tomber, s'effondrer · 風で木が倒れました。 — Un arbre est tombé à cause du vent.
  "たおれる-174": ["to fall over, to collapse", "umfallen, zusammenbrechen", "A tree fell down in the wind.", "Ein Baum ist im Wind umgestürzt."],
  // 足す — ajouter, additionner · 二に三を足すと五です。 — Deux plus trois égalent cinq.
  "たす-175": ["to add", "hinzufügen, addieren", "Two plus three makes five.", "Zwei plus drei ist fünf."],
  // 尋ねる — demander, s'informer · 駅員に道を尋ねました。 — J'ai demandé mon chemin à l'employé de la gare.
  "たずねる-176": ["to ask, to enquire", "fragen, sich erkundigen", "I asked the station staff for directions.", "Ich habe den Bahnhofsangestellten nach dem Weg gefragt."],
  // 訪ねる — rendre visite · 週末に祖母を訪ねます。 — Ce week-end, je rends visite à ma grand-mère.
  "たずねる-177": ["to visit", "besuchen", "This weekend I'm visiting my grandmother.", "Am Wochenende besuche ich meine Großmutter."],
  // 建てる — construire · 父は新しい家を建てました。 — Mon père a fait construire une nouvelle maison.
  "たてる-178": ["to build", "bauen", "My father had a new house built.", "Mein Vater hat ein neues Haus gebaut."],
  // 立てる — dresser ; faire (un projet) · 夏休みの計画を立てます。 — Je fais des projets pour les vacances d'été.
  "たてる-179": ["to stand up (something); to make (a plan)", "aufstellen; machen (Plan)", "I'm making plans for the summer holidays.", "Ich mache Pläne für die Sommerferien."],
  // 楽しむ — profiter, s'amuser · 旅行を楽しんでください。 — Profitez bien de votre voyage.
  "たのしむ-180": ["to enjoy", "genießen", "Enjoy your trip.", "Genießen Sie Ihre Reise."],
  // 足りる — suffire · お金が足りません。 — Je n'ai pas assez d'argent.
  "たりる-181": ["to be enough", "genügen, reichen", "I don't have enough money.", "Das Geld reicht nicht."],
  // 捕まえる — attraper · 子どもがむしを捕まえました。 — L'enfant a attrapé un insecte.
  "つかまえる-182": ["to catch", "fangen", "The child caught an insect.", "Das Kind hat ein Insekt gefangen."],
  // 点く — s'allumer · へやのでんきが点いています。 — La lumière de la chambre est allumée.
  "つく-183": ["to come on (light)", "angehen (Licht)", "The light in the room is on.", "Im Zimmer brennt Licht."],
  // 漬ける — faire tremper, mariner · 野菜をしおに漬けます。 — Je fais mariner les légumes dans le sel.
  "つける-184": ["to soak, to pickle", "einlegen, marinieren", "I pickle the vegetables in salt.", "Ich lege das Gemüse in Salz ein."],
  // 伝える — transmettre (un message) · 田中さんによろしく伝えてください。 — Transmettez mes amitiés à M. Tanaka.
  "つたえる-185": ["to pass on (a message)", "ausrichten (Nachricht)", "Please give my regards to Mr Tanaka.", "Grüßen Sie bitte Herrn Tanaka von mir."],
  // 続く — continuer, durer · 雨が三日続いています。 — Il pleut depuis trois jours.
  "つづく-186": ["to continue, to last", "andauern, weitergehen", "It has been raining for three days.", "Es regnet schon seit drei Tagen."],
  // 続ける — continuer (quelque chose) · 日本語の勉強を続けます。 — Je continue d'étudier le japonais.
  "つづける-187": ["to continue (something)", "fortsetzen", "I'm continuing to study Japanese.", "Ich lerne weiter Japanisch."],
  // 包む — envelopper, emballer · プレゼントをきれいな紙で包みます。 — J'emballe le cadeau dans un joli papier.
  "つつむ-188": ["to wrap", "einpacken", "I wrap the present in pretty paper.", "Ich packe das Geschenk in schönes Papier ein."],
  // 釣る — pêcher · 川で魚を釣りました。 — J'ai pêché un poisson dans la rivière.
  "つる-189": ["to fish", "angeln", "I caught a fish in the river.", "Ich habe im Fluss einen Fisch geangelt."],
  // 連れる — emmener (quelqu'un) · 犬を連れてさんぽします。 — Je promène le chien.
  "つれる-190": ["to take (someone) along", "mitnehmen (jemanden)", "I take the dog for a walk.", "Ich gehe mit dem Hund spazieren."],
  // 手伝う — aider · 母の料理を手伝います。 — J'aide ma mère à cuisiner.
  "てつだう-191": ["to help", "helfen", "I help my mother cook.", "Ich helfe meiner Mutter beim Kochen."],
  // 通る — passer (par) · このバスは駅の前を通ります。 — Ce bus passe devant la gare.
  "とおる-192": ["to pass (through)", "vorbeifahren, durchgehen", "This bus goes past the station.", "Dieser Bus fährt am Bahnhof vorbei."],
  // 届ける — livrer, apporter · この荷物を届けてください。 — Livrez ce colis, s'il vous plaît.
  "とどける-193": ["to deliver", "liefern, bringen", "Please deliver this parcel.", "Liefern Sie bitte dieses Paket."],
  // 泊まる — passer la nuit (à l'hôtel…) · 京都のホテルに泊まりました。 — J'ai dormi dans un hôtel à Kyoto.
  "とまる-194": ["to stay overnight", "übernachten", "I stayed at a hotel in Kyoto.", "Ich habe in einem Hotel in Kyōto übernachtet."],
  // 止める — arrêter (quelque chose) ; garer · ここに車を止めないでください。 — Ne vous garez pas ici, s'il vous plaît.
  "とめる-195": ["to stop (something); to park", "anhalten; parken", "Please don't park here.", "Bitte parken Sie hier nicht."],
  // 取り替える — échanger, remplacer · このシャツを取り替えてください。 — Échangez cette chemise, s'il vous plaît.
  "とりかえる-196": ["to exchange, to replace", "umtauschen, auswechseln", "Please exchange this shirt.", "Tauschen Sie bitte dieses Hemd um."],
  // 治る — guérir · かぜが治りました。 — Mon rhume est guéri.
  "なおる-197": ["to heal, to get better", "heilen, gesund werden", "My cold is better.", "Meine Erkältung ist vorbei."],
  // 直る — être réparé · テレビが直りました。 — La télé est réparée.
  "なおる-198": ["to be repaired", "repariert werden", "The TV has been fixed.", "Der Fernseher ist repariert."],
  // 直す — réparer ; corriger · 先生が作文を直してくれました。 — Le professeur a corrigé ma rédaction.
  "なおす-199": ["to repair; to correct", "reparieren; korrigieren", "The teacher corrected my essay.", "Der Lehrer hat meinen Aufsatz korrigiert."],
  // 泣く — pleurer · 赤ちゃんが泣いています。 — Le bébé pleure.
  "なく-200": ["to cry", "weinen", "The baby is crying.", "Das Baby weint."],
  // 亡くなる — décéder · 祖父は去年亡くなりました。 — Mon grand-père est décédé l'année dernière.
  "なくなる-201": ["to pass away", "versterben", "My grandfather passed away last year.", "Mein Großvater ist letztes Jahr gestorben."],
  // 無くなる — disparaître, manquer · 冷蔵庫の牛乳が無くなりました。 — Il n'y a plus de lait dans le frigo.
  "なくなる-202": ["to disappear, to run out", "verschwinden, ausgehen", "There's no milk left in the fridge.", "Im Kühlschrank ist keine Milch mehr."],
  // 投げる — lancer · ボールを投げてください。 — Lance la balle, s'il te plaît.
  "なげる-203": ["to throw", "werfen", "Please throw the ball.", "Wirf bitte den Ball."],
  // 鳴る — sonner, retentir · 電話が鳴っています。 — Le téléphone sonne.
  "なる-204": ["to ring, to sound", "klingeln, ertönen", "The phone is ringing.", "Das Telefon klingelt."],
  // 慣れる — s'habituer · 日本の生活に慣れました。 — Je me suis habitué(e) à la vie au Japon.
  "なれる-205": ["to get used to", "sich gewöhnen", "I've got used to life in Japan.", "Ich habe mich an das Leben in Japan gewöhnt."],
  // 逃げる — s'enfuir · ねこが外へ逃げました。 — Le chat s'est enfui dehors.
  "にげる-206": ["to run away", "fliehen, weglaufen", "The cat ran away outside.", "Die Katze ist nach draußen entwischt."],
  // 似る — ressembler · わたしは母に似ています。 — Je ressemble à ma mère.
  "にる-207": ["to resemble", "ähneln", "I look like my mother.", "Ich sehe meiner Mutter ähnlich."],
  // 盗む — voler (dérober) · だれかがじてんしゃを盗みました。 — Quelqu'un a volé mon vélo.
  "ぬすむ-208": ["to steal", "stehlen", "Somebody stole my bike.", "Jemand hat mein Fahrrad gestohlen."],
  // 塗る — peindre, étaler · パンにバターを塗ります。 — J'étale du beurre sur le pain.
  "ぬる-209": ["to paint, to spread", "streichen, auftragen", "I spread butter on the bread.", "Ich streiche Butter aufs Brot."],
  // 濡れる — se mouiller · 雨でふくが濡れました。 — Mes vêtements sont mouillés à cause de la pluie.
  "ぬれる-210": ["to get wet", "nass werden", "My clothes got wet in the rain.", "Meine Kleidung ist im Regen nass geworden."],
  // 眠る — dormir · 赤ちゃんがよく眠っています。 — Le bébé dort bien.
  "ねむる-211": ["to sleep", "schlafen", "The baby is sleeping well.", "Das Baby schläft gut."],
  // 残る — rester · ケーキが一つ残っています。 — Il reste un gâteau.
  "のこる-212": ["to remain", "übrig bleiben", "There is one cake left.", "Ein Kuchen ist noch übrig."],
  // 乗り換える — changer (de train, de bus) · 新宿で電車を乗り換えます。 — Je change de train à Shinjuku.
  "のりかえる-213": ["to change (trains, buses)", "umsteigen", "I change trains at Shinjuku.", "In Shinjuku steige ich um."],
  // 運ぶ — transporter, porter · この箱を二階へ運んでください。 — Portez cette boîte au premier étage, s'il vous plaît.
  "はこぶ-214": ["to carry", "tragen, transportieren", "Please carry this box upstairs.", "Tragen Sie diese Kiste bitte nach oben."],
  // 始める — commencer · 九時に会議を始めます。 — Je commence la réunion à neuf heures.
  "はじめる-215": ["to begin", "beginnen", "I start the meeting at nine.", "Ich beginne die Besprechung um neun."],
  // 払う — payer · カードで払ってもいいですか。 — Je peux payer par carte ?
  "はらう-216": ["to pay", "bezahlen", "Can I pay by card?", "Kann ich mit Karte bezahlen?"],
  // 冷える — refroidir, se rafraîchir · ビールがよく冷えています。 — La bière est bien fraîche.
  "ひえる-217": ["to get cold, to cool down", "kalt werden, abkühlen", "The beer is nicely chilled.", "Das Bier ist schön kalt."],
  // 光る — briller · 夜空に星が光っています。 — Les étoiles brillent dans le ciel nocturne.
  "ひかる-218": ["to shine", "leuchten", "Stars are shining in the night sky.", "Am Nachthimmel leuchten die Sterne."],
  // 引っ越す — déménager · 来月大阪に引っ越します。 — Le mois prochain, je déménage à Osaka.
  "ひっこす-219": ["to move house", "umziehen", "Next month I'm moving to Osaka.", "Nächsten Monat ziehe ich nach Osaka um."],
  // びっくりする — être surpris · 大きい音にびっくりしました。 — J'ai sursauté à cause d'un grand bruit.
  "びっくりする-220": ["to be startled", "erschrecken, überrascht sein", "A loud noise made me jump.", "Ich bin bei einem lauten Geräusch zusammengezuckt."],
  // 開く — ouvrir ; organiser (un événement) · 本の十ページを開いてください。 — Ouvrez votre livre à la page dix.
  "ひらく-221": ["to open; to hold (an event)", "öffnen; veranstalten", "Please open your book at page ten.", "Schlagen Sie bitte Seite zehn in Ihrem Buch auf."],
  // 拾う — ramasser · 道でさいふを拾いました。 — J'ai ramassé un portefeuille dans la rue.
  "ひろう-222": ["to pick up", "aufheben", "I picked up a wallet in the street.", "Ich habe auf der Straße einen Geldbeutel gefunden."],
  // 増える — augmenter · 日本に来る旅行者が増えています。 — Les touristes qui viennent au Japon sont de plus en plus nombreux.
  "ふえる-223": ["to increase", "zunehmen", "More and more tourists are coming to Japan.", "Immer mehr Touristen kommen nach Japan."],
  // 太る — grossir · 冬は少し太りました。 — J'ai un peu grossi cet hiver.
  "ふとる-224": ["to put on weight", "zunehmen (Gewicht)", "I put on a bit of weight this winter.", "Diesen Winter habe ich etwas zugenommen."],
  // 踏む — marcher sur · 電車で足を踏まれました。 — Quelqu'un m'a marché sur le pied dans le train.
  "ふむ-225": ["to step on", "treten auf", "Someone stepped on my foot on the train.", "Im Zug ist mir jemand auf den Fuß getreten."],
  // 褒める — féliciter, complimenter · 先生がわたしの絵を褒めました。 — Le professeur a complimenté mon dessin.
  "ほめる-226": ["to praise", "loben", "The teacher praised my drawing.", "Der Lehrer hat mein Bild gelobt."],
  // 負ける — perdre (un match) · サッカーのしあいで負けました。 — On a perdu le match de football.
  "まける-227": ["to lose (a match)", "verlieren (Spiel)", "We lost the football match.", "Wir haben das Fußballspiel verloren."],
  // 間違える — se tromper · 電話番号を間違えました。 — Je me suis trompé de numéro de téléphone.
  "まちがえる-228": ["to make a mistake", "sich irren", "I got the phone number wrong.", "Ich habe mich in der Telefonnummer geirrt."],
  // 間に合う — être à temps · 走ったので電車に間に合いました。 — J'ai couru, alors j'ai eu mon train.
  "まにあう-229": ["to be in time", "rechtzeitig sein", "I ran, so I made my train.", "Ich bin gerannt und habe den Zug noch erwischt."],
  // 回る — tourner, faire le tour · 地球は太陽のまわりを回ります。 — La Terre tourne autour du Soleil.
  "まわる-230": ["to turn, to go round", "sich drehen, herumgehen", "The Earth goes round the Sun.", "Die Erde dreht sich um die Sonne."],
  // 回す — faire tourner · ハンドルを右に回してください。 — Tournez le volant vers la droite.
  "まわす-231": ["to turn (something)", "drehen", "Turn the steering wheel to the right.", "Drehen Sie das Lenkrad nach rechts."],
  // 下りる — descendre (un escalier, une pente) · かいだんを下りてください。 — Descendez l'escalier, s'il vous plaît.
  "おりる-232": ["to go down (stairs, a slope)", "hinuntergehen", "Please go down the stairs.", "Gehen Sie bitte die Treppe hinunter."],
  // 見える — se voir, être visible · ここから富士山が見えます。 — D'ici, on voit le mont Fuji.
  "みえる-233": ["to be visible", "zu sehen sein", "You can see Mount Fuji from here.", "Von hier aus sieht man den Fuji."],
  // 見つかる — être trouvé · なくしたかぎが見つかりました。 — J'ai retrouvé les clés que j'avais perdues.
  "みつかる-234": ["to be found", "gefunden werden", "I found the keys I had lost.", "Ich habe die verlorenen Schlüssel wiedergefunden."],
  // 見つける — trouver · いいレストランを見つけました。 — J'ai trouvé un bon restaurant.
  "みつける-235": ["to find", "finden", "I found a good restaurant.", "Ich habe ein gutes Restaurant gefunden."],
  // 迎える — accueillir, aller chercher · 空港へ友だちを迎えに行きます。 — Je vais chercher un ami à l'aéroport.
  "むかえる-236": ["to welcome, to pick up", "empfangen, abholen", "I'm going to pick up a friend at the airport.", "Ich hole einen Freund am Flughafen ab."],
  // 向かう — se diriger vers · 今、駅に向かっています。 — Je suis en route vers la gare.
  "むかう-237": ["to head for", "sich auf den Weg machen", "I'm on my way to the station now.", "Ich bin gerade auf dem Weg zum Bahnhof."],
  // 戻る — revenir · 五分で戻ります。 — Je reviens dans cinq minutes.
  "もどる-238": ["to come back", "zurückkommen", "I'll be back in five minutes.", "Ich bin in fünf Minuten zurück."],
  // もらう — recevoir · たんじょうびに花をもらいました。 — J'ai reçu des fleurs pour mon anniversaire.
  "もらう-239": ["to receive", "bekommen", "I got flowers for my birthday.", "Ich habe zum Geburtstag Blumen bekommen."],
  // 焼く — griller, cuire au four · 魚を焼きます。 — Je fais griller du poisson.
  "やく-240": ["to grill, to bake", "grillen, backen", "I grill fish.", "Ich grille Fisch."],
  // 焼ける — être grillé, cuit · パンがおいしく焼けました。 — Le pain est bien cuit.
  "やける-241": ["to be grilled, to be baked", "gegrillt werden, gebacken werden", "The bread has baked nicely.", "Das Brot ist schön gebacken."],
  // 役に立つ — être utile · この辞書はとても役に立ちます。 — Ce dictionnaire est très utile.
  "やくにたつ-242": ["to be useful", "nützlich sein", "This dictionary is very useful.", "Dieses Wörterbuch ist sehr nützlich."],
  // 痩せる — maigrir · 毎日走って三キロ痩せました。 — J'ai perdu trois kilos en courant tous les jours.
  "やせる-243": ["to lose weight", "abnehmen", "I lost three kilos by running every day.", "Ich habe durch tägliches Laufen drei Kilo abgenommen."],
  // 止む — cesser (pluie…) · 雨がやっと止みました。 — La pluie a enfin cessé.
  "やむ-244": ["to stop (rain…)", "aufhören (Regen…)", "The rain has finally stopped.", "Der Regen hat endlich aufgehört."],
  // 止める — arrêter (une habitude), renoncer · たばこを止めました。 — J'ai arrêté de fumer.
  "やめる-245": ["to stop (a habit), to give up", "aufhören (mit einer Gewohnheit)", "I gave up smoking.", "Ich habe mit dem Rauchen aufgehört."],
  // 揺れる — trembler, se balancer · 地震で家が揺れました。 — La maison a tremblé à cause du séisme.
  "ゆれる-246": ["to shake, to sway", "wackeln, schwanken", "The house shook in the earthquake.", "Beim Erdbeben hat das Haus gewackelt."],
  // 汚れる — se salir · シャツがどろで汚れました。 — Ma chemise s'est salie avec de la boue.
  "よごれる-247": ["to get dirty", "schmutzig werden", "My shirt got dirty with mud.", "Mein Hemd ist mit Schlamm schmutzig geworden."],
  // 寄る — passer (en chemin) · 帰りにコンビニに寄ります。 — En rentrant, je passe à la supérette.
  "よる-248": ["to drop in (on the way)", "vorbeischauen", "On the way home I'll drop in at the convenience store.", "Auf dem Heimweg gehe ich noch in den Konbini."],
  // 喜ぶ — se réjouir · プレゼントを見て、母はとても喜びました。 — En voyant le cadeau, ma mère était ravie.
  "よろこぶ-249": ["to be delighted", "sich freuen", "When she saw the present, my mother was delighted.", "Als meine Mutter das Geschenk sah, hat sie sich sehr gefreut."],
  // 沸く — bouillir · お湯が沸きました。 — L'eau bout.
  "わく-250": ["to boil", "kochen (Wasser)", "The water is boiling.", "Das Wasser kocht."],
  // 沸かす — faire bouillir · お茶のためにお湯を沸かします。 — Je fais bouillir de l'eau pour le thé.
  "わかす-251": ["to bring to the boil", "zum Kochen bringen", "I boil water for tea.", "Ich koche Wasser für den Tee."],
  // 別れる — se séparer, se quitter · 駅で友だちと別れました。 — J'ai quitté mon ami à la gare.
  "わかれる-252": ["to part, to say goodbye", "sich trennen, sich verabschieden", "I said goodbye to my friend at the station.", "Ich habe mich am Bahnhof von meinem Freund verabschiedet."],
  // 笑う — rire, sourire · その話を聞いて、みんな笑いました。 — En entendant cette histoire, tout le monde a ri.
  "わらう-253": ["to laugh, to smile", "lachen, lächeln", "Everyone laughed when they heard the story.", "Als sie die Geschichte hörten, lachten alle."],
  // 割れる — se briser · コップが落ちて割れました。 — Le verre est tombé et s'est brisé.
  "われる-254": ["to break, to shatter", "zerbrechen", "The glass fell and broke.", "Das Glas ist heruntergefallen und zerbrochen."],
};

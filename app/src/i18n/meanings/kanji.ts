/**
 * Sens en anglais et en allemand (kanji et mots des leçons de kanji). Le français reste dans src/data/.
 * Une ligne par élément : clé, puis [anglais, allemand] ; en commentaire, le japonais et le français.
 * Fichier généré au départ, à corriger ici directement.
 */

/** Sens des kanji, par identifiant de leçon. */
export const KANJI_MEANINGS: Record<string, [en: string, de: string]> = {
  "un": ["one", "eins"], // 一 — un
  "deux": ["two", "zwei"], // 二 — deux
  "trois": ["three", "drei"], // 三 — trois
  "quatre": ["four", "vier"], // 四 — quatre
  "cinq": ["five", "fünf"], // 五 — cinq
  "six": ["six", "sechs"], // 六 — six
  "sept": ["seven", "sieben"], // 七 — sept
  "huit": ["eight", "acht"], // 八 — huit
  "neuf": ["nine", "neun"], // 九 — neuf
  "dix": ["ten", "zehn"], // 十 — dix
  "soleil": ["sun, day", "Sonne, Tag"], // 日 — soleil, jour
  "lune": ["moon, month", "Mond, Monat"], // 月 — lune, mois
  "feu": ["fire", "Feuer"], // 火 — feu
  "eau": ["water", "Wasser"], // 水 — eau
  "arbre": ["tree, wood", "Baum, Holz"], // 木 — arbre, bois
  "or": ["gold, money", "Gold, Geld"], // 金 — or, argent (monnaie)
  "terre": ["earth, soil", "Erde, Boden"], // 土 — terre, sol
  "montagne": ["mountain", "Berg"], // 山 — montagne
  "riviere": ["river", "Fluss"], // 川 — rivière, fleuve
  "personne": ["person, human being", "Mensch, Person"], // 人 — personne, être humain
  "grand": ["big", "groß"], // 大 — grand
  "petit": ["small", "klein"], // 小 — petit
  "milieu": ["middle, inside", "Mitte, innen"], // 中 — milieu, intérieur
  "haut": ["up, above", "oben, über"], // 上 — haut, dessus
  "bas": ["down, below", "unten, unter"], // 下 — bas, dessous
  "bouche": ["mouth, opening", "Mund, Öffnung"], // 口 — bouche, ouverture
  "oeil": ["eye", "Auge"], // 目 — œil
  "oreille": ["ear", "Ohr"], // 耳 — oreille
  "main": ["hand", "Hand"], // 手 — main
  "pied": ["foot, leg; to be enough", "Fuß, Bein; genügen"], // 足 — pied, jambe ; suffire
  "femme": ["woman", "Frau"], // 女 — femme
  "homme": ["man", "Mann"], // 男 — homme
  "enfant": ["child", "Kind"], // 子 — enfant
  "livre": ["book; origin", "Buch; Ursprung"], // 本 — livre ; origine
  "vie": ["life, to be born", "Leben, geboren werden"], // 生 — vie, naître
  "avant": ["ahead, before", "vorher, voraus"], // 先 — avant, devant
  "etude": ["to study, learning", "lernen, Wissenschaft"], // 学 — étudier, science
  "annee": ["year, age", "Jahr, Alter"], // 年 — année, âge
  "maintenant": ["now", "jetzt"], // 今 — maintenant
  "yen": ["yen; circle", "Yen; Kreis"], // 円 — yen ; cercle
  "cent": ["hundred", "hundert"], // 百 — cent
  "mille": ["thousand", "tausend"], // 千 — mille
  "dix-mille": ["ten thousand", "zehntausend"], // 万 — dix mille
  "heure": ["hour, time", "Stunde, Zeit"], // 時 — heure, temps
  "minute": ["to divide; minute; to understand", "teilen; Minute; verstehen"], // 分 — partager ; minute ; comprendre
  "moitie": ["half", "Hälfte"], // 半 — moitié
  "midi": ["noon", "Mittag"], // 午 — midi
  "devant": ["front, before", "vorne, vor"], // 前 — devant, avant
  "apres": ["after, behind", "nach, hinten"], // 後 — après, derrière
  "gauche": ["left", "links"], // 左 — gauche
  "droite": ["right", "rechts"], // 右 — droite
  "est": ["east", "Osten"], // 東 — est
  "ouest": ["west", "Westen"], // 西 — ouest
  "sud": ["south", "Süden"], // 南 — sud
  "nord": ["north", "Norden"], // 北 — nord
  "dehors": ["outside, foreign", "draußen, fremd"], // 外 — dehors, étranger
  "long": ["long; chief", "lang; Leiter"], // 長 — long ; chef
  "eleve": ["high, expensive", "hoch, teuer"], // 高 — haut, cher
  "bon-marche": ["cheap; peaceful", "billig; ruhig"], // 安 — bon marché ; tranquille
  "nouveau": ["new", "neu"], // 新 — nouveau
  "ancien": ["old", "alt"], // 古 — vieux, ancien
  "nombreux": ["many", "viele"], // 多 — nombreux
  "peu": ["few, a little", "wenig"], // 少 — peu
  "blanc": ["white", "weiß"], // 白 — blanc
  "ciel": ["sky, heaven", "Himmel"], // 天 — ciel
  "esprit": ["spirit, energy, air", "Geist, Energie, Luft"], // 気 — esprit, énergie, air
  "pluie": ["rain", "Regen"], // 雨 — pluie
  "electricite": ["electricity", "Elektrizität"], // 電 — électricité
  "voiture": ["car, vehicle", "Auto, Fahrzeug"], // 車 — voiture, véhicule
  "gare": ["station", "Bahnhof"], // 駅 — gare
  "pays": ["country", "Land"], // 国 — pays
  "ecole": ["school", "Schule"], // 校 — école
  "nom": ["name", "Name"], // 名 — nom
  "quoi": ["what?", "was?"], // 何 — quoi ?
  "pere": ["father", "Vater"], // 父 — père
  "mere": ["mother", "Mutter"], // 母 — mère
  "ami": ["friend", "Freund"], // 友 — ami
  "chaque": ["every", "jeder"], // 毎 — chaque
  "semaine": ["week", "Woche"], // 週 — semaine
  "intervalle": ["interval, between", "Zwischenraum, zwischen"], // 間 — intervalle, entre
  "venir": ["to come", "kommen"], // 来 — venir
  "aller": ["to go", "gehen"], // 行 — aller
  "voir": ["to see", "sehen"], // 見 — voir
  "entendre": ["to hear, to listen, to ask", "hören, zuhören, fragen"], // 聞 — entendre, écouter, demander
  "parler": ["to speak", "sprechen"], // 話 — parler
  "lire": ["to read", "lesen"], // 読 — lire
  "ecrire": ["to write", "schreiben"], // 書 — écrire
  "manger": ["to eat", "essen"], // 食 — manger
  "boire": ["to drink", "trinken"], // 飲 — boire
  "acheter": ["to buy", "kaufen"], // 買 — acheter
  "repos": ["to rest", "sich ausruhen"], // 休 — se reposer
  "sortir": ["to go out", "hinausgehen"], // 出 — sortir
  "entrer": ["to enter", "hineingehen"], // 入 — entrer
  "debout": ["to stand", "stehen"], // 立 — se tenir debout
  "dire": ["to say", "sagen"], // 言 — dire
  "langue": ["language, word", "Sprache, Wort"], // 語 — langue, mot
  "societe": ["company, shrine", "Firma, Schrein"], // 社 — société, sanctuaire
  "rencontre": ["to meet, meeting", "treffen, Versammlung"], // 会 — rencontrer, réunion
  "fleur": ["flower", "Blume"], // 花 — fleur
  "poisson": ["fish", "Fisch"], // 魚 — poisson
  "chemin": ["road, way", "Weg, Straße"], // 道 — chemin, voie
  "magasin": ["shop", "Laden"], // 店 — magasin
  "grand-frere": ["older brother", "älterer Bruder"], // 兄 — grand frère
  "petit-frere": ["younger brother", "jüngerer Bruder"], // 弟 — petit frère
  "grande-soeur": ["older sister", "ältere Schwester"], // 姉 — grande sœur
  "petite-soeur": ["younger sister", "jüngere Schwester"], // 妹 — petite sœur
  "parent": ["parent; close", "Eltern; vertraut"], // 親 — parent ; proche
  "maitre": ["master; main", "Herr; hauptsächlich"], // 主 — maître ; principal
  "moi": ["I, me; private", "ich; privat"], // 私 — je, moi ; privé
  "soi-meme": ["oneself", "selbst"], // 自 — soi-même
  "personne-qui": ["person (who does…)", "Person (die etwas tut)"], // 者 — personne (qui fait…)
  "membre": ["member, employee", "Mitglied, Angestellter"], // 員 — membre, employé
  "famille-clan": ["family, clan", "Familie, Sippe"], // 族 — famille, clan
  "corps": ["body", "Körper"], // 体 — corps
  "coeur": ["heart, mind", "Herz, Geist"], // 心 — cœur, esprit
  "force": ["strength", "Kraft"], // 力 — force
  "maladie": ["illness", "Krankheit"], // 病 — maladie
  "medecine": ["medicine, doctor", "Medizin, Arzt"], // 医 — médecine, médecin
  "institution": ["institution", "Institution, Anstalt"], // 院 — institution, établissement
  "mort": ["death, to die", "Tod, sterben"], // 死 — mort, mourir
  "printemps": ["spring", "Frühling"], // 春 — printemps
  "ete": ["summer", "Sommer"], // 夏 — été
  "automne": ["autumn", "Herbst"], // 秋 — automne
  "hiver": ["winter", "Winter"], // 冬 — hiver
  "matin": ["morning", "Morgen"], // 朝 — matin
  "midi-jour": ["noon, daytime", "Mittag, Tag"], // 昼 — midi, la journée
  "nuit": ["night", "Nacht"], // 夜 — nuit
  "soir": ["evening", "Abend"], // 夕 — soir
  "tot": ["early, fast", "früh, schnell"], // 早 — tôt, rapide
  "jour-semaine": ["day of the week", "Wochentag"], // 曜 — jour de la semaine
  "passe": ["past, to leave", "vergangen, fortgehen"], // 去 — passé, partir
  "epoque": ["era; to replace", "Zeitalter; ersetzen"], // 代 — époque ; remplacer
  "monde": ["world, generation", "Welt, Generation"], // 世 — monde, génération
  "fois": ["time (occurrence), degree", "Mal, Grad"], // 度 — fois, degré
  "chien": ["dog", "Hund"], // 犬 — chien
  "vache": ["cow, ox", "Kuh, Rind"], // 牛 — vache, bœuf
  "oiseau": ["bird", "Vogel"], // 鳥 — oiseau
  "mer": ["sea", "Meer"], // 海 — mer
  "ciel-vide": ["sky; empty", "Himmel; leer"], // 空 — ciel ; vide
  "vent": ["wind; style", "Wind; Stil"], // 風 — vent ; style
  "champ": ["field, plain", "Feld, Ebene"], // 野 — champ, plaine
  "riziere": ["rice field", "Reisfeld"], // 田 — rizière
  "rouge": ["red", "rot"], // 赤 — rouge
  "bleu": ["blue, green", "blau, grün"], // 青 — bleu, vert
  "noir": ["black", "schwarz"], // 黒 — noir
  "couleur": ["colour", "Farbe"], // 色 — couleur
  "son": ["sound, noise", "Ton, Geräusch"], // 音 — son, bruit
  "sol": ["ground, earth", "Boden, Erde"], // 地 — sol, terre
  "ville": ["town, district", "Stadt, Viertel"], // 町 — ville, quartier
  "capitale": ["capital", "Hauptstadt"], // 京 — capitale
  "maison": ["house, family", "Haus, Familie"], // 家 — maison, famille
  "boutique": ["house; shop", "Haus; Laden"], // 屋 — maison ; boutique
  "salle": ["room", "Raum, Saal"], // 室 — pièce, salle
  "grande-salle": ["hall", "Halle"], // 堂 — grande salle
  "edifice": ["large building", "großes Gebäude"], // 館 — grand bâtiment
  "endroit": ["place", "Ort, Platz"], // 場 — endroit, lieu
  "limite-monde": ["world, boundary", "Welt, Grenze"], // 界 — monde, limite
  "occident": ["ocean; Western", "Ozean; westlich"], // 洋 — océan ; occidental
  "anglais": ["England, English", "England, Englisch"], // 英 — Angleterre, anglais
  "chine-han": ["China (Han dynasty)", "China (Han-Dynastie)"], // 漢 — Chine (dynastie Han)
  "plan": ["plan, map", "Plan, Karte"], // 図 — plan, carte
  "texte": ["sentence, text", "Satz, Text"], // 文 — phrase, texte
  "lettre": ["character, letter", "Schriftzeichen, Buchstabe"], // 字 — caractère, lettre
  "enseigner": ["to teach", "lehren"], // 教 — enseigner
  "apprendre": ["to learn", "lernen, üben"], // 習 — apprendre
  "effort": ["effort, to make an effort", "Mühe, sich bemühen"], // 勉 — effort, s'appliquer
  "fort": ["strong", "stark"], // 強 — fort
  "affiner": ["to sharpen, to study", "schleifen, erforschen"], // 研 — affûter, étudier
  "approfondir": ["to investigate", "ergründen"], // 究 — approfondir
  "essayer": ["to try, to test", "versuchen, prüfen"], // 試 — essayer, mettre à l'épreuve
  "epreuve": ["test, check", "Prüfung, Probe"], // 験 — épreuve, vérification
  "qualite": ["quality, question", "Qualität, Frage"], // 質 — qualité, question
  "question": ["question", "Frage"], // 問 — question
  "sujet": ["topic, title", "Thema, Titel"], // 題 — sujet, titre
  "reponse": ["answer", "Antwort"], // 答 — réponse
  "idee": ["idea, intention", "Idee, Absicht"], // 意 — idée, intention
  "gout": ["taste, flavour", "Geschmack"], // 味 — goût, saveur
  "raison": ["reason, logic", "Vernunft, Logik"], // 理 — raison, logique
  "servir": ["to serve, to work", "dienen, arbeiten"], // 仕 — servir, travailler
  "chose": ["thing, matter", "Sache, Angelegenheit"], // 事 — chose, affaire
  "metier": ["trade, industry", "Beruf, Industrie"], // 業 — métier, industrie
  "artisanat": ["craft, construction", "Handwerk, Bau"], // 工 — artisanat, construction
  "copier": ["to copy, to photograph", "abschreiben, fotografieren"], // 写 — copier, photographier
  "vrai": ["true, truth", "wahr, Wahrheit"], // 真 — vrai, vérité
  "image": ["picture, stroke", "Bild, Strich"], // 画 — image, trait
  "refleter": ["to reflect, to project", "spiegeln, projizieren"], // 映 — refléter, projeter
  "mesurer": ["to measure, to calculate", "messen, rechnen"], // 計 — mesurer, calculer
  "courir": ["to run", "laufen, rennen"], // 走 — courir
  "marcher": ["to walk", "gehen, zu Fuß gehen"], // 歩 — marcher
  "se-lever": ["to get up, to happen", "aufstehen, geschehen"], // 起 — se lever, se produire
  "commencer": ["to begin", "beginnen"], // 始 — commencer
  "finir": ["to end", "enden"], // 終 — finir
  "habiter": ["to live (reside)", "wohnen"], // 住 — habiter
  "utiliser": ["to use; messenger", "benutzen; Bote"], // 使 — utiliser ; envoyé
  "fabriquer": ["to make, to create", "machen, schaffen"], // 作 — fabriquer, créer
  "tenir": ["to hold, to have", "halten, haben"], // 持 — tenir, avoir
  "attendre": ["to wait", "warten"], // 待 — attendre
  "envoyer": ["to send, to see off", "schicken, begleiten"], // 送 — envoyer, accompagner
  "emprunter": ["to borrow", "leihen (sich etwas)"], // 借 — emprunter
  "preter": ["to lend", "verleihen"], // 貸 — prêter
  "rentrer": ["to return home", "heimkehren"], // 帰 — rentrer, revenir
  "ouvrir": ["to open", "öffnen"], // 開 — ouvrir
  "rassembler": ["to gather", "sammeln"], // 集 — rassembler
  "porter-arriver": ["to wear; to arrive", "tragen (Kleidung); ankommen"], // 着 — porter (un vêtement) ; arriver
  "passer": ["to pass, to go through", "durchgehen, passieren"], // 通 — passer, traverser
  "transporter": ["to carry; luck", "transportieren; Glück"], // 運 — transporter ; chance
  "tourner": ["to turn, to roll", "drehen, rollen"], // 転 — tourner, rouler
  "bouger": ["to move", "sich bewegen"], // 動 — bouger
  "partir": ["to depart, to emit", "abfahren, aussenden"], // 発 — partir, émettre
  "arreter": ["to stop", "anhalten"], // 止 — arrêter
  "savoir": ["to know", "wissen, kennen"], // 知 — savoir, connaître
  "penser": ["to think", "denken"], // 思 — penser
  "reflechir": ["to consider", "überlegen"], // 考 — réfléchir
  "chanter": ["to sing, song", "singen, Lied"], // 歌 — chanter, chanson
  "vendre": ["to sell", "verkaufen"], // 売 — vendre
  "the": ["tea", "Tee"], // 茶 — thé
  "viande": ["meat", "Fleisch"], // 肉 — viande
  "repas-riz": ["cooked rice, meal", "gekochter Reis, Mahlzeit"], // 飯 — riz cuit, repas
  "ingredient": ["material; fee", "Material; Gebühr"], // 料 — matière ; frais
  "vetement": ["clothes", "Kleidung"], // 服 — vêtement
  "papier": ["paper", "Papier"], // 紙 — papier
  "article": ["article, goods", "Artikel, Ware"], // 品 — article, marchandise
  "objet": ["thing, object", "Ding, Gegenstand"], // 物 — chose, objet
  "socle": ["stand, platform", "Sockel, Gestell"], // 台 — socle, support
  "voyage": ["travel", "Reise"], // 旅 — voyage
  "argent-metal": ["silver", "Silber"], // 銀 — argent (le métal)
  "construire": ["to build", "bauen"], // 建 — construire
  "correct": ["correct, right", "richtig"], // 正 — correct, juste
  "origine": ["origin; former", "Ursprung; ehemalig"], // 元 — origine ; ancien
  "public": ["public", "öffentlich"], // 公 — public
  "couper": ["to cut; important", "schneiden; wichtig"], // 切 — couper ; important
  "direction": ["direction; way; person (polite)", "Richtung; Art und Weise; Person (höflich)"], // 方 — direction ; manière ; personne (poli)
  "usage": ["use, business", "Gebrauch, Erledigung"], // 用 — usage, affaire
  "non": ["non-, un-", "un-, nicht-"], // 不 — non-, in-
  "pareil": ["same", "gleich"], // 同 — pareil, même
  "posseder": ["to have, to exist", "besitzen, vorhanden sein"], // 有 — posséder, exister
  "large": ["wide, spacious", "breit, weit"], // 広 — large, vaste
  "proche": ["near", "nah"], // 近 — proche
  "lourd": ["heavy; important", "schwer; wichtig"], // 重 — lourd ; important
  "mauvais": ["bad", "schlecht"], // 悪 — mauvais
  "plaisir": ["pleasure; music", "Vergnügen; Musik"], // 楽 — plaisir ; musique
  "urgent": ["urgent, in a hurry", "dringend, eilig"], // 急 — urgent, pressé
  "special": ["special", "besonders"], // 特 — spécial
  "separer": ["to separate, other", "trennen, anders"], // 別 — séparer, autre
  "verser": ["to pour; attention", "gießen; Aufmerksamkeit"], // 注 — verser ; attention
  "clair": ["bright, clear", "hell, klar"], // 明 — clair, lumineux
  "a-partir-de": ["from, by means of", "ab, mittels"], // 以 — à partir de, par
};

/** Sens des mots cités dans les leçons de kanji, par écriture japonaise. */
export const KANJI_WORD_MEANINGS: Record<string, [en: string, de: string]> = {
  "一つ": ["one (thing)", "eins (Gegenstand)"], // ひとつ — un (objet)
  "一月": ["January", "Januar"], // いちがつ — janvier
  "一人": ["one person, alone", "eine Person, allein"], // ひとり — une personne, seul
  "二つ": ["two (things)", "zwei (Gegenstände)"], // ふたつ — deux (objets)
  "二月": ["February", "Februar"], // にがつ — février
  "二人": ["two people", "zwei Personen"], // ふたり — deux personnes
  "三つ": ["three (things)", "drei (Gegenstände)"], // みっつ — trois (objets)
  "三月": ["March", "März"], // さんがつ — mars
  "三人": ["three people", "drei Personen"], // さんにん — trois personnes
  "四つ": ["four (things)", "vier (Gegenstände)"], // よっつ — quatre (objets)
  "四月": ["April", "April"], // しがつ — avril
  "四人": ["four people", "vier Personen"], // よにん — quatre personnes
  "五つ": ["five (things)", "fünf (Gegenstände)"], // いつつ — cinq (objets)
  "五月": ["May", "Mai"], // ごがつ — mai
  "五分": ["five minutes", "fünf Minuten"], // ごふん — cinq minutes
  "六つ": ["six (things)", "sechs (Gegenstände)"], // むっつ — six (objets)
  "六月": ["June", "Juni"], // ろくがつ — juin
  "六時": ["six o'clock", "sechs Uhr"], // ろくじ — six heures
  "七つ": ["seven (things)", "sieben (Gegenstände)"], // ななつ — sept (objets)
  "七月": ["July", "Juli"], // しちがつ — juillet
  "七時": ["seven o'clock", "sieben Uhr"], // しちじ — sept heures
  "八つ": ["eight (things)", "acht (Gegenstände)"], // やっつ — huit (objets)
  "八月": ["August", "August"], // はちがつ — août
  "八百屋": ["greengrocer", "Gemüsehändler"], // やおや — le marchand de légumes
  "九つ": ["nine (things)", "neun (Gegenstände)"], // ここのつ — neuf (objets)
  "九月": ["September", "September"], // くがつ — septembre
  "九時": ["nine o'clock", "neun Uhr"], // くじ — neuf heures
  "十月": ["October", "Oktober"], // じゅうがつ — octobre
  "十分": ["ten minutes", "zehn Minuten"], // じゅっぷん — dix minutes
  "十日": ["the tenth (of the month)", "der Zehnte (des Monats)"], // とおか — le dix du mois
  "日曜日": ["Sunday", "Sonntag"], // にちようび — dimanche
  "今日": ["today", "heute"], // きょう — aujourd'hui
  "日本": ["Japan", "Japan"], // にほん — le Japon
  "毎日": ["every day", "jeden Tag"], // まいにち — chaque jour
  "月曜日": ["Monday", "Montag"], // げつようび — lundi
  "今月": ["this month", "diesen Monat"], // こんげつ — ce mois-ci
  "月": ["moon", "Mond"], // つき — la lune
  "火曜日": ["Tuesday", "Dienstag"], // かようび — mardi
  "火": ["fire", "Feuer"], // ひ — le feu
  "火事": ["fire (blaze)", "Brand"], // かじ — l'incendie
  "花火": ["fireworks", "Feuerwerk"], // はなび — le feu d'artifice
  "水曜日": ["Wednesday", "Mittwoch"], // すいようび — mercredi
  "水": ["water", "Wasser"], // みず — l'eau
  "水着": ["swimsuit", "Badeanzug"], // みずぎ — le maillot de bain
  "木曜日": ["Thursday", "Donnerstag"], // もくようび — jeudi
  "木": ["tree", "Baum"], // き — l'arbre
  "木々": ["trees", "Bäume"], // きぎ — les arbres
  "金曜日": ["Friday", "Freitag"], // きんようび — vendredi
  "お金": ["money", "Geld"], // おかね — l'argent
  "金色": ["gold (colour)", "Goldfarbe"], // きんいろ — la couleur or
  "土曜日": ["Saturday", "Samstag"], // どようび — samedi
  "土": ["earth, soil", "Erde"], // つち — la terre
  "土地": ["land, plot", "Grundstück"], // とち — le terrain
  "山": ["mountain", "Berg"], // やま — la montagne
  "富士山": ["Mount Fuji", "der Berg Fuji"], // ふじさん — le mont Fuji
  "火山": ["volcano", "Vulkan"], // かざん — le volcan
  "川": ["river", "Fluss"], // かわ — la rivière
  "小川": ["stream", "Bach"], // おがわ — le ruisseau
  "川岸": ["riverbank", "Flussufer"], // かわぎし — la berge
  "人": ["person", "Mensch, Person"], // ひと — la personne
  "日本人": ["a Japanese person", "Japaner, Japanerin"], // にほんじん — un Japonais
  "外国人": ["a foreigner", "Ausländer, Ausländerin"], // がいこくじん — un étranger
  "大きい": ["big", "groß"], // おおきい — grand
  "大学": ["university", "Universität"], // だいがく — l'université
  "大人": ["adult", "Erwachsener"], // おとな — l'adulte
  "小さい": ["small", "klein"], // ちいさい — petit
  "小学校": ["primary school", "Grundschule"], // しょうがっこう — l'école primaire
  "小鳥": ["little bird", "Vögelchen"], // ことり — le petit oiseau
  "中": ["inside", "das Innere"], // なか — l'intérieur
  "中国": ["China", "China"], // ちゅうごく — la Chine
  "一日中": ["all day long", "den ganzen Tag"], // いちにちじゅう — toute la journée
  "上": ["top, above", "Oberseite, oben"], // うえ — le dessus
  "上手": ["skilful, good at", "geschickt, gut in etwas"], // じょうず — habile
  "上がる": ["to go up", "hinaufgehen, steigen"], // あがる — monter
  "下": ["bottom, below", "Unterseite, unten"], // した — le dessous
  "地下鉄": ["underground (metro)", "U-Bahn"], // ちかてつ — le métro
  "下さい": ["please (give me)", "bitte (geben Sie mir)"], // ください — s'il vous plaît (donnez-moi)
  "口": ["mouth", "Mund"], // くち — la bouche
  "入口": ["entrance", "Eingang"], // いりぐち — l'entrée
  "出口": ["exit", "Ausgang"], // でぐち — la sortie
  "人口": ["population", "Bevölkerung"], // じんこう — la population
  "目": ["eye", "Auge"], // め — l'œil
  "一つ目": ["the first one", "das erste"], // ひとつめ — le premier
  "目的": ["purpose, goal", "Zweck, Ziel"], // もくてき — le but
  "耳": ["ear", "Ohr"], // みみ — l'oreille
  "耳鼻科": ["ENT (ear, nose and throat)", "HNO (Hals-Nasen-Ohren)"], // じびか — l'ORL (oto-rhino)
  "手": ["hand", "Hand"], // て — la main
  "切手": ["postage stamp", "Briefmarke"], // きって — le timbre
  "手紙": ["letter", "Brief"], // てがみ — la lettre
  "足": ["foot, leg", "Fuß, Bein"], // あし — le pied, la jambe
  "足りる": ["to be enough", "genügen, ausreichen"], // たりる — suffire
  "一足": ["one pair (of shoes)", "ein Paar (Schuhe)"], // いっそく — une paire (de chaussures)
  "女の人": ["woman", "Frau"], // おんなのひと — la femme
  "女の子": ["girl", "Mädchen"], // おんなのこ — la fille
  "女性": ["woman (formal)", "Frau (förmlich)"], // じょせい — la femme (formel)
  "男の人": ["man", "Mann"], // おとこのひと — l'homme
  "男の子": ["boy", "Junge"], // おとこのこ — le garçon
  "男性": ["man (formal)", "Mann (förmlich)"], // だんせい — l'homme (formel)
  "子ども": ["child", "Kind"], // こども — l'enfant
  "椅子": ["chair", "Stuhl"], // いす — la chaise
  "本": ["book", "Buch"], // ほん — le livre
  "本当": ["true, really", "wahr, wirklich"], // ほんとう — vrai, vraiment
  "先生": ["teacher", "Lehrer, Lehrerin"], // せんせい — le professeur
  "学生": ["student", "Student, Studentin"], // がくせい — l'étudiant
  "生まれる": ["to be born", "geboren werden"], // うまれる — naître
  "先週": ["last week", "letzte Woche"], // せんしゅう — la semaine dernière
  "先": ["ahead, first", "vorne, zuerst"], // さき — devant, d'abord
  "学校": ["school", "Schule"], // がっこう — l'école
  "学ぶ": ["to learn", "lernen"], // まなぶ — apprendre
  "今年": ["this year", "dieses Jahr"], // ことし — cette année
  "去年": ["last year", "letztes Jahr"], // きょねん — l'année dernière
  "毎年": ["every year", "jedes Jahr"], // まいとし — chaque année
  "今": ["now", "jetzt"], // いま — maintenant
  "今晩": ["this evening", "heute Abend"], // こんばん — ce soir
  "百円": ["a hundred yen", "hundert Yen"], // ひゃくえん — cent yens
  "千円": ["a thousand yen", "tausend Yen"], // せんえん — mille yens
  "円い": ["round", "rund"], // まるい — rond
  "百": ["hundred", "hundert"], // ひゃく — cent
  "三百": ["three hundred", "dreihundert"], // さんびゃく — trois cents
  "千": ["thousand", "tausend"], // せん — mille
  "三千": ["three thousand", "dreitausend"], // さんぜん — trois mille
  "一万": ["ten thousand", "zehntausend"], // いちまん — dix mille
  "一万円": ["ten thousand yen", "zehntausend Yen"], // いちまんえん — dix mille yens
  "万年筆": ["fountain pen", "Füllfederhalter"], // まんねんひつ — le stylo-plume
  "時間": ["time, hours", "Zeit, Stunde"], // じかん — le temps, l'heure
  "時計": ["clock, watch", "Uhr"], // とけい — la montre, l'horloge
  "時々": ["sometimes", "manchmal"], // ときどき — parfois
  "分かる": ["to understand", "verstehen"], // わかる — comprendre
  "自分": ["oneself", "selbst"], // じぶん — soi-même
  "半分": ["half", "Hälfte"], // はんぶん — la moitié
  "三時半": ["half past three", "halb vier"], // さんじはん — trois heures et demie
  "午前": ["morning (a.m.)", "Vormittag"], // ごぜん — le matin (avant midi)
  "午後": ["afternoon (p.m.)", "Nachmittag"], // ごご — l'après-midi
  "前": ["front, before", "vorne, vorher"], // まえ — devant, avant
  "名前": ["name", "Name"], // なまえ — le nom
  "後ろ": ["behind", "hinten"], // うしろ — derrière
  "後で": ["later", "später"], // あとで — plus tard
  "左": ["left", "links"], // ひだり — la gauche
  "左手": ["left hand", "linke Hand"], // ひだりて — la main gauche
  "右": ["right", "rechts"], // みぎ — la droite
  "右手": ["right hand", "rechte Hand"], // みぎて — la main droite
  "左右": ["left and right", "links und rechts"], // さゆう — gauche et droite
  "東": ["east", "Osten"], // ひがし — l'est
  "東京": ["Tokyo", "Tokio"], // とうきょう — Tokyo
  "東口": ["east exit", "Ostausgang"], // ひがしぐち — la sortie est
  "西": ["west", "Westen"], // にし — l'ouest
  "西洋": ["the West", "der Westen, das Abendland"], // せいよう — l'Occident
  "関西": ["Kansai (Osaka region)", "Kansai (Region um Osaka)"], // かんさい — le Kansai (région d'Osaka)
  "南": ["south", "Süden"], // みなみ — le sud
  "南口": ["south exit", "Südausgang"], // みなみぐち — la sortie sud
  "南米": ["South America", "Südamerika"], // なんべい — l'Amérique du Sud
  "北": ["north", "Norden"], // きた — le nord
  "北口": ["north exit", "Nordausgang"], // きたぐち — la sortie nord
  "北海道": ["Hokkaidō", "Hokkaidō"], // ほっかいどう — Hokkaidō
  "外": ["outside", "draußen"], // そと — dehors
  "外国": ["foreign country, abroad", "Ausland"], // がいこく — l'étranger (pays)
  "長い": ["long", "lang"], // ながい — long
  "社長": ["company president", "Firmenchef"], // しゃちょう — le président (d'entreprise)
  "高い": ["high, expensive", "hoch, teuer"], // たかい — haut, cher
  "高校": ["high school", "Oberschule"], // こうこう — le lycée
  "安い": ["cheap", "billig"], // やすい — bon marché
  "安心": ["peace of mind", "Beruhigung, Erleichterung"], // あんしん — la tranquillité d'esprit
  "新しい": ["new", "neu"], // あたらしい — nouveau
  "新聞": ["newspaper", "Zeitung"], // しんぶん — le journal
  "新幹線": ["shinkansen (bullet train)", "Shinkansen (Hochgeschwindigkeitszug)"], // しんかんせん — le TGV japonais
  "古い": ["old", "alt"], // ふるい — vieux
  "中古": ["second-hand", "gebraucht"], // ちゅうこ — d'occasion
  "多い": ["many", "viel, zahlreich"], // おおい — nombreux
  "多分": ["probably, maybe", "wahrscheinlich, vielleicht"], // たぶん — peut-être
  "少し": ["a little", "ein bisschen"], // すこし — un peu
  "少ない": ["few", "wenig"], // すくない — peu nombreux
  "白い": ["white", "weiß"], // しろい — blanc
  "白": ["white", "das Weiß"], // しろ — le blanc
  "白鳥": ["swan", "Schwan"], // はくちょう — le cygne
  "天気": ["weather", "Wetter"], // てんき — le temps (météo)
  "天国": ["heaven, paradise", "Himmel, Paradies"], // てんごく — le paradis
  "元気": ["well, in good shape", "gesund, munter"], // げんき — en forme
  "気持ち": ["feeling", "Gefühl"], // きもち — le sentiment
  "雨": ["rain", "Regen"], // あめ — la pluie
  "大雨": ["heavy rain", "Starkregen"], // おおあめ — la forte pluie
  "電気": ["electricity, light", "Strom, Licht"], // でんき — l'électricité, la lumière
  "電車": ["train", "Zug"], // でんしゃ — le train
  "電話": ["telephone", "Telefon"], // でんわ — le téléphone
  "車": ["car", "Auto"], // くるま — la voiture
  "自転車": ["bicycle", "Fahrrad"], // じてんしゃ — le vélo
  "駅": ["station", "Bahnhof"], // えき — la gare
  "駅員": ["station employee", "Bahnhofsangestellter"], // えきいん — l'employé de gare
  "国": ["country", "Land"], // くに — le pays
  "校長": ["head teacher", "Schulleiter"], // こうちょう — le directeur d'école
  "有名": ["famous", "berühmt"], // ゆうめい — célèbre
  "何": ["what", "was"], // なに — quoi
  "何時": ["what time", "wie viel Uhr"], // なんじ — quelle heure
  "何人": ["how many people", "wie viele Personen"], // なんにん — combien de personnes
  "父": ["my father", "mein Vater"], // ちち — mon père
  "お父さん": ["father (someone's, or to address him)", "Vater (von jemandem, oder als Anrede)"], // おとうさん — le père (de quelqu'un, ou pour l'appeler)
  "母": ["my mother", "meine Mutter"], // はは — ma mère
  "お母さん": ["mother (someone's, or to address her)", "Mutter (von jemandem, oder als Anrede)"], // おかあさん — la mère (de quelqu'un, ou pour l'appeler)
  "友だち": ["friend", "Freund, Freundin"], // ともだち — l'ami
  "友人": ["friend (formal)", "Freund (förmlich)"], // ゆうじん — l'ami (formel)
  "毎朝": ["every morning", "jeden Morgen"], // まいあさ — chaque matin
  "毎週": ["every week", "jede Woche"], // まいしゅう — chaque semaine
  "今週": ["this week", "diese Woche"], // こんしゅう — cette semaine
  "週末": ["weekend", "Wochenende"], // しゅうまつ — le week-end
  "間": ["between, during", "zwischen, während"], // あいだ — entre, pendant
  "人間": ["human being", "Mensch"], // にんげん — l'être humain
  "来る": ["to come", "kommen"], // くる — venir
  "来週": ["next week", "nächste Woche"], // らいしゅう — la semaine prochaine
  "来年": ["next year", "nächstes Jahr"], // らいねん — l'année prochaine
  "行く": ["to go", "gehen"], // いく — aller
  "銀行": ["bank", "Bank"], // ぎんこう — la banque
  "旅行": ["trip, travel", "Reise"], // りょこう — le voyage
  "見る": ["to see, to watch", "sehen, anschauen"], // みる — voir, regarder
  "見せる": ["to show", "zeigen"], // みせる — montrer
  "花見": ["cherry blossom viewing", "Kirschblütenschau"], // はなみ — la contemplation des cerisiers
  "聞く": ["to listen, to ask", "zuhören, fragen"], // きく — écouter, demander
  "話す": ["to speak", "sprechen"], // はなす — parler
  "話": ["story, conversation", "Geschichte, Gespräch"], // はなし — l'histoire, la conversation
  "読む": ["to read", "lesen"], // よむ — lire
  "読書": ["reading", "das Lesen"], // どくしょ — la lecture
  "書く": ["to write", "schreiben"], // かく — écrire
  "辞書": ["dictionary", "Wörterbuch"], // じしょ — le dictionnaire
  "図書館": ["library", "Bibliothek"], // としょかん — la bibliothèque
  "食べる": ["to eat", "essen"], // たべる — manger
  "食事": ["meal", "Mahlzeit"], // しょくじ — le repas
  "食堂": ["canteen", "Kantine"], // しょくどう — la cantine
  "飲む": ["to drink", "trinken"], // のむ — boire
  "飲み物": ["drink", "Getränk"], // のみもの — la boisson
  "買う": ["to buy", "kaufen"], // かう — acheter
  "買い物": ["shopping", "Einkaufen"], // かいもの — les courses
  "休む": ["to rest, to take time off", "sich ausruhen, fehlen"], // やすむ — se reposer, s'absenter
  "休み": ["holiday, day off", "Ferien, freier Tag"], // やすみ — les vacances, le congé
  "夏休み": ["summer holidays", "Sommerferien"], // なつやすみ — les vacances d'été
  "出る": ["to go out", "hinausgehen"], // でる — sortir
  "出す": ["to take out, to send", "herausnehmen, abschicken"], // だす — sortir (quelque chose), envoyer
  "入る": ["to enter", "hineingehen"], // はいる — entrer
  "入学": ["starting school", "Schuleintritt"], // にゅうがく — l'entrée à l'école
  "立つ": ["to stand up", "aufstehen, stehen"], // たつ — se lever, se tenir debout
  "国立": ["national (state-run)", "staatlich"], // こくりつ — national (public)
  "言う": ["to say", "sagen"], // いう — dire
  "言葉": ["word, language", "Wort, Sprache"], // ことば — le mot, la langue
  "日本語": ["Japanese (language)", "Japanisch"], // にほんご — le japonais
  "英語": ["English (language)", "Englisch"], // えいご — l'anglais
  "物語": ["tale, story", "Erzählung"], // ものがたり — le récit
  "会社": ["company", "Firma"], // かいしゃ — l'entreprise
  "神社": ["Shinto shrine", "Shintō-Schrein"], // じんじゃ — le sanctuaire shintō
  "会う": ["to meet", "treffen"], // あう — rencontrer
  "会議": ["meeting", "Besprechung"], // かいぎ — la réunion
  "花": ["flower", "Blume"], // はな — la fleur
  "魚": ["fish", "Fisch"], // さかな — le poisson
  "金魚": ["goldfish", "Goldfisch"], // きんぎょ — le poisson rouge
  "道": ["road, way", "Weg"], // みち — le chemin
  "柔道": ["judo", "Judo"], // じゅうどう — le judo
  "店": ["shop", "Laden"], // みせ — le magasin
  "喫茶店": ["café, tea room", "Café"], // きっさてん — le café (salon de thé)
  "店員": ["shop assistant", "Verkäufer, Verkäuferin"], // てんいん — le vendeur
  "兄": ["my older brother", "mein älterer Bruder"], // あに — mon grand frère
  "お兄さん": ["older brother (someone's)", "älterer Bruder (von jemandem)"], // おにいさん — le grand frère (de quelqu'un)
  "兄弟": ["siblings", "Geschwister"], // きょうだい — les frères et sœurs
  "弟": ["my younger brother", "mein jüngerer Bruder"], // おとうと — mon petit frère
  "姉": ["my older sister", "meine ältere Schwester"], // あね — ma grande sœur
  "お姉さん": ["older sister (someone's)", "ältere Schwester (von jemandem)"], // おねえさん — la grande sœur (de quelqu'un)
  "妹": ["my younger sister", "meine jüngere Schwester"], // いもうと — ma petite sœur
  "親": ["parent", "Elternteil"], // おや — le parent
  "両親": ["parents (both)", "Eltern"], // りょうしん — les deux parents
  "親切": ["kind, kindness", "freundlich, Freundlichkeit"], // しんせつ — gentil, la gentillesse
  "ご主人": ["husband (someone's), owner", "Ehemann (von jemandem), Chef"], // ごしゅじん — le mari (de quelqu'un), le patron
  "私": ["I, me", "ich"], // わたし — je, moi
  "自動車": ["automobile", "Auto, Kraftfahrzeug"], // じどうしゃ — l'automobile
  "医者": ["doctor", "Arzt, Ärztin"], // いしゃ — le médecin
  "歯医者": ["dentist", "Zahnarzt"], // はいしゃ — le dentiste
  "公務員": ["civil servant", "Beamter, Beamtin"], // こうむいん — le fonctionnaire
  "家族": ["family", "Familie"], // かぞく — la famille
  "体": ["body, health", "Körper, Gesundheit"], // からだ — le corps, la santé
  "大体": ["roughly, generally", "ungefähr, im Allgemeinen"], // だいたい — à peu près, en général
  "心": ["heart, mind", "Herz, Geist"], // こころ — le cœur, l'esprit
  "心配": ["worry", "Sorge"], // しんぱい — l'inquiétude
  "力": ["strength", "Kraft"], // ちから — la force
  "病気": ["illness", "Krankheit"], // びょうき — la maladie
  "病院": ["hospital", "Krankenhaus"], // びょういん — l'hôpital
  "医学": ["medicine (science)", "Medizin"], // いがく — la médecine
  "入院": ["hospitalisation", "Krankenhausaufenthalt"], // にゅういん — l'hospitalisation
  "死ぬ": ["to die", "sterben"], // しぬ — mourir
  "春": ["spring", "Frühling"], // はる — le printemps
  "夏": ["summer", "Sommer"], // なつ — l'été
  "秋": ["autumn", "Herbst"], // あき — l'automne
  "冬": ["winter", "Winter"], // ふゆ — l'hiver
  "朝": ["morning", "Morgen"], // あさ — le matin
  "今朝": ["this morning", "heute Morgen"], // けさ — ce matin
  "昼": ["noon, daytime", "Mittag, Tag"], // ひる — midi, la journée
  "昼休み": ["lunch break", "Mittagspause"], // ひるやすみ — la pause de midi
  "夜": ["night", "Nacht"], // よる — la nuit
  "今夜": ["tonight", "heute Nacht"], // こんや — ce soir
  "夕方": ["late afternoon, early evening", "Spätnachmittag, früher Abend"], // ゆうがた — la fin d'après-midi
  "夕飯": ["dinner", "Abendessen"], // ゆうはん — le dîner
  "早い": ["early, fast", "früh, schnell"], // はやい — tôt, rapide
  "時代": ["era, period", "Zeitalter, Epoche"], // じだい — l'époque
  "代わり": ["substitute, instead", "Ersatz, stattdessen"], // かわり — le remplacement
  "世界": ["world", "Welt"], // せかい — le monde
  "世話": ["care, looking after", "Betreuung, sich kümmern"], // せわ — le soin, s'occuper de
  "今度": ["this time, next time", "diesmal, nächstes Mal"], // こんど — cette fois-ci, la prochaine fois
  "一度": ["once", "einmal"], // いちど — une fois
  "丁度": ["exactly", "genau"], // ちょうど — exactement
  "犬": ["dog", "Hund"], // いぬ — le chien
  "牛肉": ["beef", "Rindfleisch"], // ぎゅうにく — le bœuf (viande)
  "牛乳": ["milk", "Milch"], // ぎゅうにゅう — le lait
  "鳥": ["bird", "Vogel"], // とり — l'oiseau
  "海": ["sea", "Meer"], // うみ — la mer
  "海岸": ["coast", "Küste"], // かいがん — la côte
  "空": ["sky", "Himmel"], // そら — le ciel
  "空気": ["air", "Luft"], // くうき — l'air
  "空港": ["airport", "Flughafen"], // くうこう — l'aéroport
  "風": ["wind", "Wind"], // かぜ — le vent
  "台風": ["typhoon", "Taifun"], // たいふう — le typhon
  "お風呂": ["bath", "Bad"], // おふろ — le bain
  "野菜": ["vegetables", "Gemüse"], // やさい — les légumes
  "田舎": ["countryside", "Land (ländliche Gegend)"], // いなか — la campagne
  "赤い": ["red", "rot"], // あかい — rouge
  "赤ちゃん": ["baby", "Baby"], // あかちゃん — le bébé
  "青い": ["blue", "blau"], // あおい — bleu
  "青": ["blue", "das Blau"], // あお — le bleu
  "黒い": ["black", "schwarz"], // くろい — noir
  "黒": ["black", "das Schwarz"], // くろ — le noir
  "色": ["colour", "Farbe"], // いろ — la couleur
  "色々": ["various, all sorts", "verschiedene, allerlei"], // いろいろ — divers, toutes sortes
  "茶色": ["brown", "Braun"], // ちゃいろ — le marron
  "音": ["sound", "Ton, Geräusch"], // おと — le son
  "音楽": ["music", "Musik"], // おんがく — la musique
  "発音": ["pronunciation", "Aussprache"], // はつおん — la prononciation
  "地図": ["map", "Landkarte"], // ちず — la carte
  "地震": ["earthquake", "Erdbeben"], // じしん — le tremblement de terre
  "町": ["town", "Stadt"], // まち — la ville
  "京都": ["Kyoto", "Kyōto"], // きょうと — Kyoto
  "家": ["house", "Haus"], // いえ — la maison
  "家庭": ["household, home", "Haushalt, Zuhause"], // かてい — le foyer
  "部屋": ["room", "Zimmer"], // へや — la pièce, la chambre
  "教室": ["classroom", "Klassenzimmer"], // きょうしつ — la salle de classe
  "会議室": ["meeting room", "Besprechungsraum"], // かいぎしつ — la salle de réunion
  "講堂": ["auditorium", "Aula"], // こうどう — l'amphithéâtre
  "映画館": ["cinema", "Kino"], // えいがかん — le cinéma
  "旅館": ["traditional Japanese inn", "traditionelles japanisches Gasthaus"], // りょかん — l'auberge japonaise
  "場所": ["place", "Ort"], // ばしょ — l'endroit
  "場合": ["case, situation", "Fall, Situation"], // ばあい — le cas
  "工場": ["factory", "Fabrik"], // こうじょう — l'usine
  "洋服": ["Western clothes", "westliche Kleidung"], // ようふく — les vêtements occidentaux
  "漢字": ["kanji", "Kanji"], // かんじ — le kanji
  "作文": ["essay, composition", "Aufsatz"], // さくぶん — la rédaction
  "文法": ["grammar", "Grammatik"], // ぶんぽう — la grammaire
  "文学": ["literature", "Literatur"], // ぶんがく — la littérature
  "字": ["character, handwriting", "Schriftzeichen, Handschrift"], // じ — le caractère, l'écriture
  "教える": ["to teach, to tell", "lehren, mitteilen"], // おしえる — enseigner, indiquer
  "教会": ["church", "Kirche"], // きょうかい — l'église
  "習う": ["to learn (from someone)", "lernen (bei jemandem)"], // ならう — apprendre (auprès de quelqu'un)
  "練習": ["practice", "Übung"], // れんしゅう — l'entraînement
  "習慣": ["habit", "Gewohnheit"], // しゅうかん — l'habitude
  "勉強": ["studying, to study", "das Lernen, lernen"], // べんきょう — les études, étudier
  "強い": ["strong", "stark"], // つよい — fort
  "研究": ["research", "Forschung"], // けんきゅう — la recherche
  "研究室": ["laboratory, professor's office", "Labor, Arbeitszimmer des Professors"], // けんきゅうしつ — le laboratoire, le bureau du professeur
  "試験": ["exam", "Prüfung"], // しけん — l'examen
  "試合": ["match, game", "Wettkampf, Spiel"], // しあい — le match
  "経験": ["experience", "Erfahrung"], // けいけん — l'expérience
  "質問": ["question", "Frage"], // しつもん — la question
  "問題": ["problem, exercise", "Problem, Aufgabe"], // もんだい — le problème, l'exercice
  "宿題": ["homework", "Hausaufgaben"], // しゅくだい — les devoirs
  "答える": ["to answer", "antworten"], // こたえる — répondre
  "答え": ["answer", "Antwort"], // こたえ — la réponse
  "意味": ["meaning", "Bedeutung"], // いみ — le sens
  "意見": ["opinion", "Meinung"], // いけん — l'opinion
  "注意": ["attention, caution", "Achtung, Vorsicht"], // ちゅうい — l'attention
  "味": ["taste", "Geschmack"], // あじ — le goût
  "料理": ["cooking, cuisine", "Kochen, Küche"], // りょうり — la cuisine
  "理由": ["reason", "Grund"], // りゆう — la raison
  "無理": ["impossible, unreasonable", "unmöglich, unzumutbar"], // むり — impossible, déraisonnable
  "仕事": ["work, job", "Arbeit"], // しごと — le travail
  "仕方": ["way of doing", "Art und Weise"], // しかた — la manière de faire
  "事": ["thing, fact", "Sache, Tatsache"], // こと — la chose, le fait
  "大事": ["important", "wichtig"], // だいじ — important
  "授業": ["lesson, class", "Unterricht"], // じゅぎょう — le cours
  "卒業": ["graduation", "Abschluss"], // そつぎょう — la remise des diplômes
  "工業": ["industry", "Industrie"], // こうぎょう — l'industrie
  "写真": ["photo", "Foto"], // しゃしん — la photo
  "写す": ["to copy, to photograph", "abschreiben, fotografieren"], // うつす — copier, photographier
  "真中": ["the very middle", "die genaue Mitte"], // まんなか — le milieu exact
  "真面目": ["serious", "ernsthaft"], // まじめ — sérieux
  "映画": ["film", "Film"], // えいが — le film
  "漫画": ["manga, comic", "Manga, Comic"], // まんが — la bande dessinée
  "計画": ["plan", "Plan"], // けいかく — le projet
  "走る": ["to run", "laufen, rennen"], // はしる — courir
  "歩く": ["to walk", "zu Fuß gehen"], // あるく — marcher
  "散歩": ["walk, stroll", "Spaziergang"], // さんぽ — la promenade
  "起きる": ["to get up, to wake up", "aufstehen, aufwachen"], // おきる — se lever, se réveiller
  "起こす": ["to wake someone up", "jemanden wecken"], // おこす — réveiller quelqu'un
  "始める": ["to begin (something)", "beginnen (etwas)"], // はじめる — commencer (quelque chose)
  "始まる": ["to begin, to start", "anfangen"], // はじまる — commencer, débuter
  "終わる": ["to end, to finish", "enden, aufhören"], // おわる — finir, se terminer
  "終わり": ["the end", "Ende"], // おわり — la fin
  "住む": ["to live (somewhere)", "wohnen"], // すむ — habiter
  "住所": ["address", "Adresse"], // じゅうしょ — l'adresse
  "使う": ["to use", "benutzen"], // つかう — utiliser
  "大使館": ["embassy", "Botschaft"], // たいしかん — l'ambassade
  "作る": ["to make, to prepare", "machen, zubereiten"], // つくる — fabriquer, préparer
  "持つ": ["to hold, to own", "halten, besitzen"], // もつ — tenir, posséder
  "お金持ち": ["a rich person", "reicher Mensch"], // おかねもち — une personne riche
  "待つ": ["to wait", "warten"], // まつ — attendre
  "招待": ["invitation", "Einladung"], // しょうたい — l'invitation
  "送る": ["to send, to see someone off", "schicken, jemanden begleiten"], // おくる — envoyer, raccompagner
  "放送": ["broadcast", "Sendung"], // ほうそう — la diffusion (radio, télé)
  "借りる": ["to borrow", "sich leihen"], // かりる — emprunter
  "貸す": ["to lend", "verleihen"], // かす — prêter
  "帰る": ["to go home", "nach Hause gehen"], // かえる — rentrer
  "帰り": ["the way back", "Rückweg"], // かえり — le retour
  "開ける": ["to open (something)", "öffnen (etwas)"], // あける — ouvrir
  "開く": ["to open (by itself)", "sich öffnen"], // あく — s'ouvrir
  "集める": ["to collect", "sammeln"], // あつめる — rassembler
  "集まる": ["to gather", "sich versammeln"], // あつまる — se rassembler
  "着る": ["to wear, to put on (top)", "anziehen (Oberteil)"], // きる — porter, mettre (un haut)
  "着く": ["to arrive", "ankommen"], // つく — arriver
  "着物": ["kimono", "Kimono"], // きもの — le kimono
  "通る": ["to pass through", "durchgehen, vorbeigehen"], // とおる — passer
  "通う": ["to commute, to attend regularly", "pendeln, regelmäßig hingehen"], // かよう — faire des allers-retours
  "交通": ["traffic", "Verkehr"], // こうつう — la circulation
  "運ぶ": ["to carry", "tragen, transportieren"], // はこぶ — transporter
  "運動": ["sport, exercise", "Sport, Bewegung"], // うんどう — le sport, l'exercice
  "運転": ["driving", "Fahren (eines Fahrzeugs)"], // うんてん — la conduite (d'un véhicule)
  "動く": ["to move", "sich bewegen"], // うごく — bouger
  "動物": ["animal", "Tier"], // どうぶつ — l'animal
  "出発": ["departure", "Abfahrt"], // しゅっぱつ — le départ
  "止まる": ["to stop", "anhalten"], // とまる — s'arrêter
  "止める": ["to stop (something)", "anhalten (etwas)"], // とめる — arrêter (quelque chose)
  "知る": ["to know", "wissen, kennen"], // しる — savoir, connaître
  "知らせる": ["to inform", "benachrichtigen"], // しらせる — informer
  "思う": ["to think", "denken"], // おもう — penser
  "思い出す": ["to remember", "sich erinnern"], // おもいだす — se souvenir
  "考える": ["to think about, to consider", "nachdenken"], // かんがえる — réfléchir
  "歌": ["song", "Lied"], // うた — la chanson
  "歌う": ["to sing", "singen"], // うたう — chanter
  "売る": ["to sell", "verkaufen"], // うる — vendre
  "売り場": ["department (of a shop)", "Abteilung (im Geschäft)"], // うりば — le rayon (d'un magasin)
  "お茶": ["tea", "Tee"], // おちゃ — le thé
  "紅茶": ["black tea", "Schwarztee"], // こうちゃ — le thé noir
  "肉": ["meat", "Fleisch"], // にく — la viande
  "鶏肉": ["chicken (meat)", "Hähnchenfleisch"], // とりにく — le poulet
  "ご飯": ["cooked rice, meal", "gekochter Reis, Mahlzeit"], // ごはん — le riz cuit, le repas
  "朝ご飯": ["breakfast", "Frühstück"], // あさごはん — le petit déjeuner
  "食料品": ["groceries", "Lebensmittel"], // しょくりょうひん — les produits alimentaires
  "服": ["clothes", "Kleidung"], // ふく — les vêtements
  "紙": ["paper", "Papier"], // かみ — le papier
  "品物": ["goods", "Ware"], // しなもの — la marchandise
  "物": ["thing", "Ding"], // もの — la chose
  "果物": ["fruit", "Obst"], // くだもの — les fruits
  "台所": ["kitchen", "Küche"], // だいどころ — la cuisine (pièce)
  "旅": ["journey", "Reise"], // たび — le voyage
  "銀": ["silver", "Silber"], // ぎん — l'argent (métal)
  "建てる": ["to build", "bauen"], // たてる — construire
  "建物": ["building", "Gebäude"], // たてもの — le bâtiment
  "正しい": ["correct", "richtig"], // ただしい — correct
  "正月": ["New Year", "Neujahr"], // しょうがつ — le Nouvel An
  "公園": ["park", "Park"], // こうえん — le parc
  "切る": ["to cut", "schneiden"], // きる — couper
  "大切": ["important, precious", "wichtig, kostbar"], // たいせつ — important, précieux
  "方": ["person (polite)", "Person (höflich)"], // かた — la personne (poli)
  "両方": ["both", "beide"], // りょうほう — les deux
  "用事": ["errand, something to do", "Erledigung, etwas zu tun"], // ようじ — une course, une chose à faire
  "利用": ["use", "Nutzung"], // りよう — l'utilisation
  "不便": ["inconvenient", "unpraktisch"], // ふべん — pas pratique
  "同じ": ["the same", "gleich, derselbe"], // おなじ — pareil, le même
  "広い": ["wide, spacious", "breit, geräumig"], // ひろい — large, spacieux
  "近い": ["near", "nah"], // ちかい — proche
  "近く": ["the neighbourhood, nearby", "Nähe, in der Nähe"], // ちかく — les environs
  "最近": ["recently", "neulich, in letzter Zeit"], // さいきん — récemment
  "重い": ["heavy", "schwer"], // おもい — lourd
  "悪い": ["bad", "schlecht"], // わるい — mauvais
  "楽しい": ["fun, enjoyable", "lustig, angenehm"], // たのしい — amusant, agréable
  "楽しみ": ["something to look forward to", "Vorfreude"], // たのしみ — le plaisir d'attendre
  "急ぐ": ["to hurry", "sich beeilen"], // いそぐ — se dépêcher
  "急行": ["express train", "Eilzug"], // きゅうこう — le train express
  "特に": ["especially", "besonders"], // とくに — particulièrement
  "特別": ["special", "besonders, speziell"], // とくべつ — spécial
  "特急": ["limited express train", "Schnellzug"], // とっきゅう — le train rapide
  "別れる": ["to part, to separate", "sich trennen"], // わかれる — se séparer
  "別": ["another, different", "anders, getrennt"], // べつ — autre, différent
  "注射": ["injection", "Spritze"], // ちゅうしゃ — la piqûre
  "明るい": ["bright, cheerful", "hell, fröhlich"], // あかるい — lumineux, joyeux
  "説明": ["explanation", "Erklärung"], // せつめい — l'explication
  "明日": ["tomorrow", "morgen"], // あした — demain
  "以上": ["more than; that's all", "mehr als; das ist alles"], // いじょう — plus de ; c'est tout
  "以下": ["less than", "weniger als"], // いか — moins de
  "以外": ["apart from", "außer"], // いがい — à part
};

/**
 * Sens en anglais et en allemand (vocabulaire). Le français reste dans src/data/.
 * Une ligne par élément : clé, puis [anglais, allemand] ; en commentaire, le japonais et le français.
 * Fichier généré au départ, à corriger ici directement.
 */

/** Sens des mots du vocabulaire, par identifiant (celui des cartes de révision). */
export const VOCAB_MEANINGS: Record<string, [en: string, de: string]> = {
  "anata": ["you", "du, Sie"], // あなた あなた — tu, vous
  "watashi": ["I, me", "ich"], // 私 わたし — je, moi
  "watakushi": ["I, me (very polite)", "ich (sehr höflich)"], // 私 わたくし — je, moi (très poli)
  "jibun": ["oneself", "selbst"], // 自分 じぶん — soi-même
  "hito": ["a person", "ein Mensch"], // 人 ひと — une personne
  "kata": ["a person (polite)", "eine Person (höflich)"], // 方 かた — une personne (poli)
  "otoko": ["a man", "ein Mann"], // 男 おとこ — un homme
  "onna": ["a woman", "eine Frau"], // 女 おんな — une femme
  "otokonoko": ["a boy", "ein Junge"], // 男の子 おとこのこ — un garçon
  "onnanoko": ["a girl", "ein Mädchen"], // 女の子 おんなのこ — une fille
  "kodomo": ["a child", "ein Kind"], // 子供 こども — un enfant
  "otona": ["an adult", "ein Erwachsener"], // 大人 おとな — un adulte
  "tomodachi": ["a friend", "ein Freund, eine Freundin"], // 友達 ともだち — un ami, une amie
  "kazoku": ["family", "die Familie"], // 家族 かぞく — la famille
  "ryoshin": ["parents", "die Eltern"], // 両親 りょうしん — les parents
  "chichi": ["my father", "mein Vater"], // 父 ちち — mon père
  "haha": ["my mother", "meine Mutter"], // 母 はは — ma mère
  "otosan": ["father (someone's), dad", "der Vater (von jemandem), Papa"], // お父さん おとうさん — le père (de quelqu'un), papa
  "okasan": ["mother (someone's), mum", "die Mutter (von jemandem), Mama"], // お母さん おかあさん — la mère (de quelqu'un), maman
  "ani": ["my older brother", "mein älterer Bruder"], // 兄 あに — mon grand frère
  "ane": ["my older sister", "meine ältere Schwester"], // 姉 あね — ma grande sœur
  "ototo": ["younger brother", "der jüngere Bruder"], // 弟 おとうと — le petit frère
  "imoto": ["younger sister", "die jüngere Schwester"], // 妹 いもうと — la petite sœur
  "oniisan": ["older brother (someone's)", "der ältere Bruder (von jemandem)"], // お兄さん おにいさん — le grand frère (de quelqu'un)
  "oneesan": ["older sister (someone's)", "die ältere Schwester (von jemandem)"], // お姉さん おねえさん — la grande sœur (de quelqu'un)
  "kyodai": ["siblings", "die Geschwister"], // 兄弟 きょうだい — les frères et sœurs
  "ojiisan": ["grandfather, an old man", "der Großvater, ein alter Mann"], // おじいさん おじいさん — le grand-père, un vieil homme
  "obasan": ["grandmother, an old lady", "die Großmutter, eine alte Dame"], // おばあさん おばあさん — la grand-mère, une vieille dame
  "ojisan": ["uncle, a man", "der Onkel, ein Herr"], // おじさん おじさん — l'oncle, un monsieur
  "obasan-2": ["aunt, a lady", "die Tante, eine Dame"], // おばさん おばさん — la tante, une dame
  "okusan": ["wife (someone's)", "die Ehefrau (von jemandem)"], // 奥さん おくさん — l'épouse (de quelqu'un)
  "minasan": ["everyone (addressing people)", "Sie alle, alle zusammen"], // 皆さん みなさん — vous tous, tout le monde
  "minna": ["everyone, all", "alle"], // みんな みんな — tout le monde, tous
  "ozei": ["a lot of people", "viele Leute"], // 大勢 おおぜい — beaucoup de monde
  "hitori": ["one person, alone", "eine Person, allein"], // 一人 ひとり — une personne, seul
  "futari": ["two people", "zwei Personen"], // 二人 ふたり — deux personnes
  "suffixe-san": ["Mr…, Ms… (after the name)", "Herr…, Frau… (nach dem Namen)"], // ～さん ～さん — Monsieur…, Madame… (après le nom)
  "suffixe-tachi": ["(plural for people: わたしたち, we)", "(Plural bei Personen: わたしたち, wir)"], // ～たち ～たち — (pluriel des personnes : わたしたち, nous)
  "sensei": ["teacher, doctor", "der Lehrer, der Arzt"], // 先生 せんせい — le professeur, le médecin
  "gakusei": ["a student", "ein Student, eine Studentin"], // 学生 がくせい — un étudiant, une étudiante
  "seito": ["a pupil", "ein Schüler, eine Schülerin"], // 生徒 せいと — un élève
  "ryugakusei": ["an international student", "ein Austauschstudent"], // 留学生 りゅうがくせい — un étudiant étranger
  "isha": ["a doctor", "ein Arzt, eine Ärztin"], // 医者 いしゃ — un médecin
  "keikan": ["a police officer", "ein Polizist"], // 警官 けいかん — un policier
  "omawarisan": ["a police officer (familiar)", "ein Polizist (umgangssprachlich)"], // おまわりさん おまわりさん — un agent de police (familier)
  "gaikokujin": ["a foreigner", "ein Ausländer, eine Ausländerin"], // 外国人 がいこくじん — un étranger, une étrangère
  "dare": ["who?", "wer?"], // 誰 だれ — qui ?
  "dareka": ["someone", "jemand"], // 誰か だれか — quelqu'un
  "donata": ["who? (polite)", "wer? (höflich)"], // どなた どなた — qui ? (poli)
  "karada": ["body, health", "der Körper, die Gesundheit"], // 体 からだ — le corps, la santé
  "atama": ["head", "der Kopf"], // 頭 あたま — la tête
  "kao": ["face", "das Gesicht"], // 顔 かお — le visage
  "me": ["eye, eyes", "das Auge, die Augen"], // 目 め — l'œil, les yeux
  "mimi": ["ear", "das Ohr"], // 耳 みみ — l'oreille
  "hana": ["nose", "die Nase"], // 鼻 はな — le nez
  "kuchi": ["mouth", "der Mund"], // 口 くち — la bouche
  "wa": ["tooth", "der Zahn"], // 歯 は — la dent
  "te": ["hand", "die Hand"], // 手 て — la main
  "ashi": ["foot, leg", "der Fuß, das Bein"], // 足 あし — le pied, la jambe
  "onaka": ["stomach, belly", "der Bauch"], // お腹 おなか — le ventre
  "sei": ["height (of a person)", "die Körpergröße"], // 背 せい — la taille (d'une personne)
  "koe": ["voice", "die Stimme"], // 声 こえ — la voix
  "byoki": ["illness, ill", "die Krankheit, krank"], // 病気 びょうき — la maladie, malade
  "kaze": ["a cold", "die Erkältung"], // 風邪 かぜ — le rhume
  "kusuri": ["medicine", "das Medikament"], // 薬 くすり — le médicament
  "byoin": ["hospital", "das Krankenhaus"], // 病院 びょういん — l'hôpital
  "genki": ["well, full of energy", "gesund, munter"], // 元気 げんき — en forme, plein d'énergie
  "itai": ["painful, it hurts", "schmerzhaft, es tut weh"], // 痛い いたい — qui fait mal, douloureux
  "ima": ["now", "jetzt"], // 今 いま — maintenant
  "jikan": ["time, hour", "die Zeit, die Stunde"], // 時間 じかん — le temps, l'heure
  "suffixe-jikan": ["… hours (duration)", "… Stunden (Dauer)"], // ～時間 ～じかん — … heures (durée)
  "suffixe-ji": ["… o'clock", "… Uhr"], // ～時 ～じ — … heures (à l'horloge)
  "suffixe-fun": ["… minutes", "… Minuten"], // ～分 ～ふん — … minutes
  "han": ["half past (にじはん, half past two)", "halb (にじはん, halb drei)"], // 半 はん — et demie (にじはん, deux heures et demie)
  "suffixe-koro": ["around… (a time, a period)", "gegen… (Uhrzeit, Zeitraum)"], // ～ころ ～ころ — vers… (une heure, une époque)
  "suffixe-toki": ["when…, at the time of…", "wenn…, als…"], // ～時 ～とき — au moment où…, quand…
  "suffixe-ju": ["all through… (いちにちじゅう, all day long)", "den ganzen… (いちにちじゅう, den ganzen Tag)"], // ～中 ～じゅう — pendant tout le… (いちにちじゅう, toute la journée)
  "suffixe-chu": ["in the middle of… (じゅぎょうちゅう, during class)", "während… (じゅぎょうちゅう, während des Unterrichts)"], // ～中 ～ちゅう — en cours de… (じゅぎょうちゅう, pendant le cours)
  "suffixe-sugi": ["past… (さんじすぎ, past three)", "nach… (さんじすぎ, nach drei)"], // ～すぎ ～すぎ — … passé (さんじすぎ, trois heures passées)
  "suffixe-mae": ["to…, before…, … ago (ごふんまえ, five minutes ago)", "vor… (ごふんまえ, vor fünf Minuten)"], // ～前 ～まえ — … moins, avant… (ごふんまえ, il y a cinq minutes)
  "asa": ["morning", "der Morgen"], // 朝 あさ — le matin
  "hiru": ["noon, daytime", "der Mittag, der Tag"], // 昼 ひる — midi, la journée
  "yugata": ["late afternoon, early evening", "der Spätnachmittag"], // 夕方 ゆうがた — la fin d'après-midi
  "ban": ["evening", "der Abend"], // 晩 ばん — le soir
  "yoru": ["night", "die Nacht"], // 夜 よる — la nuit
  "gozen": ["morning, a.m.", "der Vormittag"], // 午前 ごぜん — le matin, avant midi
  "gogo": ["afternoon, p.m.", "der Nachmittag"], // 午後 ごご — l'après-midi
  "kesa": ["this morning", "heute Morgen"], // 今朝 けさ — ce matin
  "konban": ["this evening", "heute Abend"], // 今晩 こんばん — ce soir
  "yube": ["last night", "gestern Abend"], // 昨夜 ゆうべ — hier soir
  "kyo": ["today", "heute"], // 今日 きょう — aujourd'hui
  "ashita": ["tomorrow", "morgen"], // 明日 あした — demain
  "kino": ["yesterday", "gestern"], // 昨日 きのう — hier
  "asatte": ["the day after tomorrow", "übermorgen"], // 明後日 あさって — après-demain
  "ototoi": ["the day before yesterday", "vorgestern"], // 一昨日 おととい — avant-hier
  "maiasa": ["every morning", "jeden Morgen"], // 毎朝 まいあさ — chaque matin
  "mainichi": ["every day", "jeden Tag"], // 毎日 まいにち — chaque jour
  "maiban": ["every evening", "jeden Abend"], // 毎晩 まいばん — chaque soir
  "maishu": ["every week", "jede Woche"], // 毎週 まいしゅう — chaque semaine
  "maitsuki": ["every month", "jeden Monat"], // 毎月 まいつき — chaque mois
  "maitoshi": ["every year", "jedes Jahr"], // 毎年 まいとし — chaque année
  "konshu": ["this week", "diese Woche"], // 今週 こんしゅう — cette semaine
  "senshu": ["last week", "letzte Woche"], // 先週 せんしゅう — la semaine dernière
  "raishu": ["next week", "nächste Woche"], // 来週 らいしゅう — la semaine prochaine
  "kongetsu": ["this month", "diesen Monat"], // 今月 こんげつ — ce mois-ci
  "sengetsu": ["last month", "letzten Monat"], // 先月 せんげつ — le mois dernier
  "raigetsu": ["next month", "nächsten Monat"], // 来月 らいげつ — le mois prochain
  "kotoshi": ["this year", "dieses Jahr"], // 今年 ことし — cette année
  "kyonen": ["last year", "letztes Jahr"], // 去年 きょねん — l'année dernière
  "rainen": ["next year", "nächstes Jahr"], // 来年 らいねん — l'année prochaine
  "sarainen": ["the year after next", "übernächstes Jahr"], // 再来年 さらいねん — dans deux ans
  "ototoshi": ["the year before last", "vorletztes Jahr"], // おととし おととし — il y a deux ans
  "toshi": ["year, age", "das Jahr, das Alter"], // 年 とし — l'année, l'âge
  "suffixe-nen": ["… years, the year…", "… Jahre, das Jahr…"], // ～年 ～ねん — … ans, l'année…
  "suffixe-kagetsu": ["… months (duration)", "… Monate (Dauer)"], // ～か月 ～かげつ — … mois (durée)
  "suffixe-gatsu": ["the month of… (いちがつ, January)", "der Monat… (いちがつ, Januar)"], // ～月 ～がつ — le mois de… (いちがつ, janvier)
  "hitotsuki": ["one month (duration)", "ein Monat (Dauer)"], // 一月 ひとつき — un mois (durée)
  "suffixe-shukan": ["… weeks", "… Wochen"], // ～週間 ～しゅうかん — … semaines
  "suffixe-nichi": ["the … (of the month), … days", "der … (des Monats), … Tage"], // ～日 ～にち — le … (du mois), … jours
  "ichinichi": ["one day", "ein Tag"], // 一日 いちにち — une journée
  "tsuitachi": ["the first of the month", "der Erste des Monats"], // 一日 ついたち — le premier du mois
  "futsuka": ["the 2nd, two days", "der 2., zwei Tage"], // 二日 ふつか — le 2 du mois, deux jours
  "mikka": ["the 3rd, three days", "der 3., drei Tage"], // 三日 みっか — le 3 du mois, trois jours
  "yokka": ["the 4th, four days", "der 4., vier Tage"], // 四日 よっか — le 4 du mois, quatre jours
  "itsuka": ["the 5th, five days", "der 5., fünf Tage"], // 五日 いつか — le 5 du mois, cinq jours
  "muika": ["the 6th, six days", "der 6., sechs Tage"], // 六日 むいか — le 6 du mois, six jours
  "nanoka": ["the 7th, seven days", "der 7., sieben Tage"], // 七日 なのか — le 7 du mois, sept jours
  "yoka": ["the 8th, eight days", "der 8., acht Tage"], // 八日 ようか — le 8 du mois, huit jours
  "kokonoka": ["the 9th, nine days", "der 9., neun Tage"], // 九日 ここのか — le 9 du mois, neuf jours
  "toka": ["the 10th, ten days", "der 10., zehn Tage"], // 十日 とおか — le 10 du mois, dix jours
  "hatsuka": ["the 20th, twenty days", "der 20., zwanzig Tage"], // 二十日 はつか — le 20 du mois, vingt jours
  "getsuyobi": ["Monday", "Montag"], // 月曜日 げつようび — lundi
  "kayobi": ["Tuesday", "Dienstag"], // 火曜日 かようび — mardi
  "suiyobi": ["Wednesday", "Mittwoch"], // 水曜日 すいようび — mercredi
  "mokuyobi": ["Thursday", "Donnerstag"], // 木曜日 もくようび — jeudi
  "kinyobi": ["Friday", "Freitag"], // 金曜日 きんようび — vendredi
  "doyobi": ["Saturday", "Samstag"], // 土曜日 どようび — samedi
  "nichiyobi": ["Sunday", "Sonntag"], // 日曜日 にちようび — dimanche
  "haru": ["spring", "der Frühling"], // 春 はる — le printemps
  "natsu": ["summer", "der Sommer"], // 夏 なつ — l'été
  "aki": ["autumn", "der Herbst"], // 秋 あき — l'automne
  "fuyu": ["winter", "der Winter"], // 冬 ふゆ — l'hiver
  "tanjobi": ["birthday", "der Geburtstag"], // 誕生日 たんじょうび — l'anniversaire
  "yasumi": ["holiday, day off", "die Ferien, der freie Tag"], // 休み やすみ — les vacances, le jour de congé
  "natsuyasumi": ["summer holidays", "die Sommerferien"], // 夏休み なつやすみ — les vacances d'été
  "hima": ["free, free time", "frei, die Freizeit"], // 暇 ひま — libre, le temps libre
  "ato": ["after, later", "nach, später"], // 後 あと — après, plus tard
  "mae": ["before, in front", "vor, vorne"], // 前 まえ — avant, devant
  "saki": ["ahead, first, further on", "vorne, zuerst, weiter"], // 先 さき — avant, d'abord, plus loin
  "tsugi": ["next, next time", "der Nächste, nächstes Mal"], // 次 つぎ — le suivant, la prochaine fois
  "hajime": ["the beginning", "der Anfang"], // 初め はじめ — le début
  "hajimete": ["for the first time", "zum ersten Mal"], // 初めて はじめて — pour la première fois
  "itsu": ["when?", "wann?"], // いつ いつ — quand ?
  "tokidoki": ["sometimes", "manchmal"], // 時々 ときどき — parfois
  "itsumo": ["always, usually", "immer, normalerweise"], // いつも いつも — toujours, d'habitude
  "suguni": ["immediately", "sofort"], // すぐに すぐに — tout de suite
  "mada": ["still, not yet", "noch, noch nicht"], // まだ まだ — encore, pas encore
  "mo": ["already; another (one more)", "schon; noch (einer)"], // もう もう — déjà, encore (un de plus)
  "zero": ["zero", "null"], // ゼロ ゼロ — zéro
  "rei": ["zero", "null"], // 零 れい — zéro
  "ichi": ["one", "eins"], // 一 いち — un
  "ni": ["two", "zwei"], // 二 に — deux
  "san": ["three", "drei"], // 三 さん — trois
  "shi": ["four (also よん)", "vier (auch よん)"], // 四 し — quatre (aussi よん)
  "go": ["five", "fünf"], // 五 ご — cinq
  "roku": ["six", "sechs"], // 六 ろく — six
  "shichi": ["seven (also なな)", "sieben (auch なな)"], // 七 しち — sept (aussi なな)
  "hachi": ["eight", "acht"], // 八 はち — huit
  "kyu": ["nine", "neun"], // 九 きゅう — neuf
  "ku": ["nine (as in くじ, nine o'clock)", "neun (in くじ, neun Uhr)"], // 九 く — neuf (dans くじ, neuf heures)
  "ju": ["ten", "zehn"], // 十 じゅう — dix
  "to": ["ten (things)", "zehn (Gegenstände)"], // 十 とお — dix (objets)
  "hyaku": ["hundred", "hundert"], // 百 ひゃく — cent
  "sen": ["thousand", "tausend"], // 千 せん — mille
  "man": ["ten thousand", "zehntausend"], // 万 まん — dix mille
  "hitotsu": ["one (thing)", "eins (Gegenstand)"], // 一つ ひとつ — un (objet)
  "futatsu": ["two (things)", "zwei (Gegenstände)"], // 二つ ふたつ — deux (objets)
  "mittsu": ["three (things)", "drei (Gegenstände)"], // 三つ みっつ — trois (objets)
  "yottsu": ["four (things)", "vier (Gegenstände)"], // 四つ よっつ — quatre (objets)
  "itsutsu": ["five (things)", "fünf (Gegenstände)"], // 五つ いつつ — cinq (objets)
  "muttsu": ["six (things)", "sechs (Gegenstände)"], // 六つ むっつ — six (objets)
  "nanatsu": ["seven (things)", "sieben (Gegenstände)"], // 七つ ななつ — sept (objets)
  "yattsu": ["eight (things)", "acht (Gegenstände)"], // 八つ やっつ — huit (objets)
  "kokonotsu": ["nine (things)", "neun (Gegenstände)"], // 九つ ここのつ — neuf (objets)
  "ikutsu": ["how many? how old?", "wie viele? wie alt?"], // いくつ いくつ — combien ? quel âge ?
  "ikura": ["how much? (price)", "wie viel? (Preis)"], // いくら いくら — combien ? (prix)
  "hatachi": ["twenty years old", "zwanzig Jahre alt"], // 二十歳 はたち — vingt ans (âge)
  "suffixe-sai": ["… years old", "… Jahre alt"], // ～歳 ～さい — … ans (âge)
  "suffixe-en": ["… yen", "… Yen"], // ～円 ～えん — … yens
  "suffixe-nin": ["… people (counter)", "… Personen (Zählwort)"], // ～人 ～にん — … personnes (compteur)
  "suffixe-jin": ["(nationality: フランスじん, French person)", "(Nationalität: フランスじん, Franzose)"], // ～人 ～じん — (nationalité : フランスじん, Français)
  "suffixe-ko": ["(counter for small objects)", "(Zählwort für kleine Gegenstände)"], // ～個 ～こ — (compteur des petits objets)
  "suffixe-hon": ["(counter for long objects)", "(Zählwort für lange Gegenstände)"], // ～本 ～ほん — (compteur des objets longs)
  "suffixe-mai": ["(counter for flat objects)", "(Zählwort für flache Gegenstände)"], // ～枚 ～まい — (compteur des objets plats)
  "suffixe-satsu": ["(counter for books)", "(Zählwort für Bücher)"], // ～冊 ～さつ — (compteur des livres)
  "suffixe-dai": ["(counter for machines, vehicles)", "(Zählwort für Maschinen, Fahrzeuge)"], // ～台 ～だい — (compteur des machines, véhicules)
  "suffixe-hiki": ["(counter for small animals)", "(Zählwort für kleine Tiere)"], // ～匹 ～ひき — (compteur des petits animaux)
  "suffixe-hai": ["(counter for glasses, bowls)", "(Zählwort für Gläser, Schalen)"], // ～杯 ～はい — (compteur des verres, bols)
  "suffixe-kai": ["… times", "… Mal"], // ～回 ～かい — … fois
  "suffixe-kai-2": ["… floor", "… Stock"], // ～階 ～かい — … étage
  "suffixe-do": ["… times, … degrees", "… Mal, … Grad"], // ～度 ～ど — … fois, … degrés
  "suffixe-ban": ["number…, …th", "Nummer…, …ter"], // ～番 ～ばん — numéro…, …-ième
  "bango": ["number", "die Nummer"], // 番号 ばんごう — le numéro
  "ichiban": ["the first, the most", "der Erste, am meisten"], // 一番 いちばん — le premier, le plus
  "hanbun": ["half", "die Hälfte"], // 半分 はんぶん — la moitié
  "zenbu": ["all, everything", "alles"], // 全部 ぜんぶ — tout, l'ensemble
  "suffixe-zutsu": ["… each, … at a time", "je…, jeweils…"], // ～ずつ ～ずつ — … chacun, … à la fois
  "guramu": ["gram", "das Gramm"], // グラム グラム — le gramme
  "kiro": ["kilo, kilometre", "das Kilo, der Kilometer"], // キロ キロ — le kilo, le kilomètre
  "meetoru": ["metre", "der Meter"], // メートル メートル — le mètre
  "peeji": ["page", "die Seite"], // ページ ページ — la page
  "koko": ["here", "hier"], // ここ ここ — ici
  "soko": ["there (near you)", "da (bei dir)"], // そこ そこ — là (près de toi)
  "asoko": ["over there", "dort drüben"], // あそこ あそこ — là-bas
  "doko": ["where?", "wo?"], // どこ どこ — où ?
  "kochira": ["this way, this person (polite)", "hier entlang, diese Person (höflich)"], // こちら こちら — par ici, cette personne (poli)
  "sochira": ["that way (polite)", "dort entlang (höflich)"], // そちら そちら — par là (poli)
  "achira": ["over there (polite)", "dort drüben (höflich)"], // あちら あちら — par là-bas (poli)
  "dochira": ["where? which one? (polite)", "wo? welcher? (höflich)"], // どちら どちら — où ? lequel ? (poli)
  "kotchi": ["this way", "hierher"], // こっち こっち — par ici
  "sotchi": ["that way", "dorthin"], // そっち そっち — par là
  "atchi": ["over there", "dort drüben"], // あっち あっち — par là-bas
  "dotchi": ["which of the two?", "welcher von beiden?"], // どっち どっち — lequel des deux ?
  "tokoro": ["place", "der Ort"], // 所 ところ — l'endroit
  "hen": ["area (このへん, around here)", "die Gegend (このへん, hier in der Gegend)"], // 辺 へん — les environs (このへん, par ici)
  "ue": ["on top, above", "oben, auf"], // 上 うえ — dessus, en haut
  "shita": ["below, under", "unten, unter"], // 下 した — dessous, en bas
  "naka": ["inside", "drinnen, im Inneren"], // 中 なか — dedans, à l'intérieur
  "soto": ["outside", "draußen"], // 外 そと — dehors, l'extérieur
  "hoka": ["other, elsewhere", "anderes, woanders"], // 外 ほか — autre, ailleurs
  "mae-2": ["in front", "vorne"], // 前 まえ — devant
  "ushiro": ["behind", "hinten"], // 後ろ うしろ — derrière
  "yoko": ["beside, width", "neben, die Breite"], // 横 よこ — à côté, la largeur
  "tonari": ["next door, right next to", "nebenan, direkt neben"], // 隣 となり — voisin, juste à côté
  "soba": ["near, beside", "in der Nähe, neben"], // そば そば — près de, à côté
  "chikaku": ["near, the neighbourhood", "nah, die Umgebung"], // 近く ちかく — près, les environs
  "muko": ["on the other side, over there", "auf der anderen Seite, drüben"], // 向こう むこう — de l'autre côté, là-bas
  "suffixe-gawa": ["the … side", "die …-Seite"], // ～側 ～がわ — le côté…
  "migi": ["right", "rechts"], // 右 みぎ — la droite
  "hidari": ["left", "links"], // 左 ひだり — la gauche
  "higashi": ["east", "der Osten"], // 東 ひがし — l'est
  "nishi": ["west", "der Westen"], // 西 にし — l'ouest
  "minami": ["south", "der Süden"], // 南 みなみ — le sud
  "kita": ["north", "der Norden"], // 北 きた — le nord
  "kuni": ["country", "das Land"], // 国 くに — le pays
  "gaikoku": ["foreign country, abroad", "das Ausland"], // 外国 がいこく — l'étranger (pays)
  "machi": ["town, neighbourhood", "die Stadt, das Viertel"], // 町 まち — la ville, le quartier
  "mura": ["village", "das Dorf"], // 村 むら — le village
  "michi": ["road, way", "die Straße, der Weg"], // 道 みち — la route, le chemin
  "kado": ["corner (of a street)", "die Ecke"], // 角 かど — le coin (d'une rue)
  "kosaten": ["crossroads", "die Kreuzung"], // 交差点 こうさてん — le carrefour
  "hashi": ["bridge", "die Brücke"], // 橋 はし — le pont
  "koen": ["park", "der Park"], // 公園 こうえん — le parc
  "mise": ["shop", "der Laden"], // 店 みせ — le magasin
  "suffixe-ya": ["… shop (ほんや, bookshop)", "…-Laden (ほんや, Buchhandlung)"], // ～屋 ～や — la boutique de… (ほんや, librairie)
  "yaoya": ["greengrocer", "der Gemüsehändler"], // 八百屋 やおや — le marchand de légumes
  "depato": ["department store", "das Kaufhaus"], // デパート デパート — le grand magasin
  "resutoran": ["restaurant", "das Restaurant"], // レストラン レストラン — le restaurant
  "kissaten": ["café, tea room", "das Café"], // 喫茶店 きっさてん — le café (salon de thé)
  "shokudo": ["canteen, small restaurant", "die Kantine, das kleine Restaurant"], // 食堂 しょくどう — la cantine, le petit restaurant
  "ginko": ["bank", "die Bank"], // 銀行 ぎんこう — la banque
  "yubinkyoku": ["post office", "die Post"], // 郵便局 ゆうびんきょく — la poste
  "posuto": ["postbox", "der Briefkasten"], // ポスト ポスト — la boîte aux lettres
  "koban": ["police box", "das Polizeihäuschen"], // 交番 こうばん — le poste de police (de quartier)
  "taishikan": ["embassy", "die Botschaft"], // 大使館 たいしかん — l'ambassade
  "toshokan": ["library", "die Bibliothek"], // 図書館 としょかん — la bibliothèque
  "eigakan": ["cinema", "das Kino"], // 映画館 えいがかん — le cinéma
  "hoteru": ["hotel", "das Hotel"], // ホテル ホテル — l'hôtel
  "puru": ["swimming pool", "das Schwimmbad"], // プール プール — la piscine
  "tatemono": ["building", "das Gebäude"], // 建物 たてもの — le bâtiment
  "iriguchi": ["entrance", "der Eingang"], // 入口 いりぐち — l'entrée
  "deguchi": ["exit", "der Ausgang"], // 出口 でぐち — la sortie
  "mon": ["gate", "das Tor"], // 門 もん — le portail
  "ie": ["house", "das Haus"], // 家 いえ — la maison
  "uchi": ["house, my home", "das Haus, bei mir zu Hause"], // うち うち — la maison, chez moi
  "apato": ["flat, apartment building", "die Wohnung, das Mietshaus"], // アパート アパート — l'appartement, l'immeuble
  "heya": ["room", "das Zimmer"], // 部屋 へや — la pièce, la chambre
  "daidokoro": ["kitchen", "die Küche"], // 台所 だいどころ — la cuisine (pièce)
  "genkan": ["entrance hall (of a house)", "der Hauseingang"], // 玄関 げんかん — l'entrée (de la maison)
  "roka": ["corridor", "der Flur"], // 廊下 ろうか — le couloir
  "kaidan": ["stairs", "die Treppe"], // 階段 かいだん — l'escalier
  "erebeeta": ["lift", "der Aufzug"], // エレベーター エレベーター — l'ascenseur
  "toire": ["toilet", "die Toilette"], // トイレ トイレ — les toilettes
  "otearai": ["toilet (polite)", "die Toilette (höflich)"], // お手洗い おてあらい — les toilettes (poli)
  "ofuro": ["bath", "das Bad"], // お風呂 おふろ — le bain
  "shawa": ["shower", "die Dusche"], // シャワー シャワー — la douche
  "niwa": ["garden", "der Garten"], // 庭 にわ — le jardin
  "ike": ["pond", "der Teich"], // 池 いけ — l'étang
  "mado": ["window", "das Fenster"], // 窓 まど — la fenêtre
  "doa": ["door", "die Tür"], // ドア ドア — la porte
  "to-2": ["door (sliding)", "die (Schiebe-)Tür"], // 戸 と — la porte (coulissante)
  "tsukue": ["desk", "der Schreibtisch"], // 机 つくえ — le bureau (meuble)
  "isu": ["chair", "der Stuhl"], // 椅子 いす — la chaise
  "teeburu": ["table", "der Tisch"], // テーブル テーブル — la table
  "beddo": ["bed", "das Bett"], // ベッド ベッド — le lit
  "hondana": ["bookshelf", "das Bücherregal"], // 本棚 ほんだな — la bibliothèque (meuble)
  "reizoko": ["fridge", "der Kühlschrank"], // 冷蔵庫 れいぞうこ — le réfrigérateur
  "sutobu": ["heater", "das Heizgerät"], // ストーブ ストーブ — le chauffage
  "denki": ["electricity, light", "der Strom, das Licht"], // 電気 でんき — l'électricité, la lumière
  "terebi": ["television", "der Fernseher"], // テレビ テレビ — la télévision
  "rajio": ["radio", "das Radio"], // ラジオ ラジオ — la radio
  "kamera": ["camera", "die Kamera"], // カメラ カメラ — l'appareil photo
  "denwa": ["telephone", "das Telefon"], // 電話 でんわ — le téléphone
  "tokei": ["watch, clock", "die Uhr"], // 時計 とけい — la montre, l'horloge
  "karenda": ["calendar", "der Kalender"], // カレンダー カレンダー — le calendrier
  "kabin": ["vase", "die Vase"], // 花瓶 かびん — le vase
  "kagi": ["key", "der Schlüssel"], // 鍵 かぎ — la clé
  "hako": ["box", "die Schachtel, die Kiste"], // 箱 はこ — la boîte
  "kaban": ["bag", "die Tasche"], // かばん かばん — le sac
  "saifu": ["wallet", "der Geldbeutel"], // 財布 さいふ — le portefeuille
  "okane": ["money", "das Geld"], // お金 おかね — l'argent
  "kasa": ["umbrella", "der Regenschirm"], // 傘 かさ — le parapluie
  "sekken": ["soap", "die Seife"], // 石鹸 せっけん — le savon
  "nimotsu": ["luggage, parcel", "das Gepäck, das Paket"], // 荷物 にもつ — les bagages, le paquet
  "mono": ["thing, object", "das Ding, der Gegenstand"], // 物 もの — la chose, l'objet
  "petto": ["pet", "das Haustier"], // ペット ペット — l'animal de compagnie
  "tabako": ["cigarette, tobacco", "die Zigarette, der Tabak"], // たばこ たばこ — la cigarette, le tabac
  "haizara": ["ashtray", "der Aschenbecher"], // 灰皿 はいざら — le cendrier
  "matchi": ["match", "das Streichholz"], // マッチ マッチ — l'allumette
  "botan": ["button", "der Knopf"], // ボタン ボタン — le bouton
  "teepu": ["tape, cassette", "das Klebeband, die Kassette"], // テープ テープ — le ruban adhésif, la cassette
  "soji": ["cleaning (そうじする, to clean)", "das Putzen (そうじする, putzen)"], // 掃除 そうじ — le ménage (そうじする, faire le ménage)
  "sentaku": ["laundry (せんたくする, to do the washing)", "die Wäsche (せんたくする, Wäsche waschen)"], // 洗濯 せんたく — la lessive (せんたくする, laver le linge)
  "katei": ["household, home", "der Haushalt, die Familie"], // 家庭 かてい — le foyer, la famille
  "gohan": ["cooked rice, meal", "der gekochte Reis, die Mahlzeit"], // ご飯 ごはん — le riz cuit, le repas
  "asagohan": ["breakfast", "das Frühstück"], // 朝ご飯 あさごはん — le petit-déjeuner
  "hirugohan": ["lunch", "das Mittagessen"], // 昼ご飯 ひるごはん — le déjeuner
  "bangohan": ["dinner", "das Abendessen"], // 晩ご飯 ばんごはん — le dîner
  "yuhan": ["dinner, evening meal", "das Abendessen"], // 夕飯 ゆうはん — le dîner, le repas du soir
  "obento": ["bento, boxed lunch", "das Bento, das Essen in der Box"], // お弁当 おべんとう — le bentō, le repas en boîte
  "tabemono": ["food", "das Essen, die Lebensmittel"], // 食べ物 たべもの — la nourriture
  "nomimono": ["drink", "das Getränk"], // 飲み物 のみもの — la boisson
  "ryori": ["cooking, dish", "das Kochen, das Gericht"], // 料理 りょうり — la cuisine (plats), un plat
  "pan": ["bread", "das Brot"], // パン パン — le pain
  "bata": ["butter", "die Butter"], // バター バター — le beurre
  "tamago": ["egg", "das Ei"], // 卵 たまご — l'œuf
  "niku": ["meat", "das Fleisch"], // 肉 にく — la viande
  "gyuniku": ["beef", "das Rindfleisch"], // 牛肉 ぎゅうにく — le bœuf
  "butaniku": ["pork", "das Schweinefleisch"], // 豚肉 ぶたにく — le porc
  "toriniku": ["chicken", "das Hähnchenfleisch"], // 鶏肉 とりにく — le poulet
  "sakana": ["fish", "der Fisch"], // 魚 さかな — le poisson
  "yasai": ["vegetables", "das Gemüse"], // 野菜 やさい — les légumes
  "kudamono": ["fruit", "das Obst"], // 果物 くだもの — les fruits
  "okashi": ["sweets, cakes", "die Süßigkeiten, das Gebäck"], // お菓子 おかし — les gâteaux, les friandises
  "ame": ["sweet, candy", "das Bonbon"], // 飴 あめ — le bonbon
  "kare": ["curry", "das Curry"], // カレー カレー — le curry
  "soba-2": ["soba (buckwheat noodles)", "Soba (Buchweizennudeln)"], // そば そば — les nouilles de sarrasin
  "sato": ["sugar", "der Zucker"], // 砂糖 さとう — le sucre
  "shio": ["salt", "das Salz"], // 塩 しお — le sel
  "shoyu": ["soy sauce", "die Sojasoße"], // 醤油 しょうゆ — la sauce soja
  "mizu": ["water", "das Wasser"], // 水 みず — l'eau
  "ocha": ["green tea", "der grüne Tee"], // お茶 おちゃ — le thé vert
  "kocha": ["black tea", "der Schwarztee"], // 紅茶 こうちゃ — le thé noir
  "kohi": ["coffee", "der Kaffee"], // コーヒー コーヒー — le café (boisson)
  "gyunyu": ["milk", "die Milch"], // 牛乳 ぎゅうにゅう — le lait
  "osake": ["sake, alcohol", "der Sake, der Alkohol"], // お酒 おさけ — le saké, l'alcool
  "osara": ["plate", "der Teller"], // お皿 おさら — l'assiette
  "chawan": ["rice bowl", "die Reisschale"], // 茶碗 ちゃわん — le bol (à riz)
  "koppu": ["glass", "das Glas"], // コップ コップ — le verre
  "kappu": ["cup", "die Tasse"], // カップ カップ — la tasse
  "hashi-2": ["chopsticks", "die Essstäbchen"], // 箸 はし — les baguettes
  "supun": ["spoon", "der Löffel"], // スプーン スプーン — la cuillère
  "foku": ["fork", "die Gabel"], // フォーク フォーク — la fourchette
  "naifu": ["knife", "das Messer"], // ナイフ ナイフ — le couteau
  "oishii": ["tasty, delicious", "lecker"], // おいしい おいしい — bon, délicieux
  "mazui": ["tastes bad", "schmeckt schlecht"], // まずい まずい — mauvais (goût)
  "amai": ["sweet", "süß"], // 甘い あまい — sucré, doux
  "karai": ["spicy, hot", "scharf"], // 辛い からい — épicé, piquant
  "yofuku": ["clothes (Western)", "die (westliche) Kleidung"], // 洋服 ようふく — les vêtements (occidentaux)
  "uwagi": ["jacket", "die Jacke"], // 上着 うわぎ — la veste
  "koto": ["coat", "der Mantel"], // コート コート — le manteau
  "seeta": ["jumper", "der Pullover"], // セーター セーター — le pull
  "shatsu": ["shirt, T-shirt", "das Hemd, das T-Shirt"], // シャツ シャツ — la chemise, le t-shirt
  "waishatsu": ["dress shirt", "das Oberhemd"], // ワイシャツ ワイシャツ — la chemise (de costume)
  "sebiro": ["suit (men's)", "der Anzug"], // 背広 せびろ — le costume (homme)
  "nekutai": ["tie", "die Krawatte"], // ネクタイ ネクタイ — la cravate
  "zubon": ["trousers", "die Hose"], // ズボン ズボン — le pantalon
  "sukato": ["skirt", "der Rock"], // スカート スカート — la jupe
  "kutsu": ["shoes", "die Schuhe"], // 靴 くつ — les chaussures
  "kutsushita": ["socks", "die Socken"], // 靴下 くつした — les chaussettes
  "boshi": ["hat, cap", "der Hut, die Mütze"], // 帽子 ぼうし — le chapeau, la casquette
  "megane": ["glasses", "die Brille"], // 眼鏡 めがね — les lunettes
  "hankachi": ["handkerchief", "das Taschentuch"], // ハンカチ ハンカチ — le mouchoir
  "poketto": ["pocket", "die Tasche (an der Kleidung)"], // ポケット ポケット — la poche
  "eki": ["station", "der Bahnhof"], // 駅 えき — la gare
  "densha": ["train", "der Zug"], // 電車 でんしゃ — le train
  "chikatetsu": ["underground (metro)", "die U-Bahn"], // 地下鉄 ちかてつ — le métro
  "basu": ["bus", "der Bus"], // バス バス — le bus
  "takushi": ["taxi", "das Taxi"], // タクシー タクシー — le taxi
  "kuruma": ["car", "das Auto"], // 車 くるま — la voiture
  "jidosha": ["automobile", "das Kraftfahrzeug"], // 自動車 じどうしゃ — l'automobile
  "jitensha": ["bicycle", "das Fahrrad"], // 自転車 じてんしゃ — le vélo
  "hikoki": ["aeroplane", "das Flugzeug"], // 飛行機 ひこうき — l'avion
  "kippu": ["ticket", "die Fahrkarte"], // 切符 きっぷ — le billet, le ticket
  "chizu": ["map", "die Landkarte, der Stadtplan"], // 地図 ちず — la carte, le plan
  "ryoko": ["trip, travel", "die Reise"], // 旅行 りょこう — le voyage
  "sanpo": ["walk (さんぽする, to go for a walk)", "der Spaziergang (さんぽする, spazieren gehen)"], // 散歩 さんぽ — la promenade (さんぽする, se promener)
  "kaimono": ["shopping", "das Einkaufen"], // 買い物 かいもの — les courses, le shopping
  "massugu": ["straight ahead", "geradeaus"], // まっすぐ まっすぐ — tout droit
  "tegami": ["letter", "der Brief"], // 手紙 てがみ — la lettre
  "hagaki": ["postcard", "die Postkarte"], // はがき はがき — la carte postale
  "futo": ["envelope", "der Umschlag"], // 封筒 ふうとう — l'enveloppe
  "kitte": ["postage stamp", "die Briefmarke"], // 切手 きって — le timbre
  "tenki": ["weather", "das Wetter"], // 天気 てんき — le temps (météo)
  "hare": ["fine weather", "schönes Wetter"], // 晴れ はれ — le beau temps
  "kumori": ["cloudy weather", "bewölktes Wetter"], // 曇り くもり — le temps nuageux
  "ame-2": ["rain", "der Regen"], // 雨 あめ — la pluie
  "yuki": ["snow", "der Schnee"], // 雪 ゆき — la neige
  "kaze-2": ["wind", "der Wind"], // 風 かぜ — le vent
  "sora": ["sky", "der Himmel"], // 空 そら — le ciel
  "yama": ["mountain", "der Berg"], // 山 やま — la montagne
  "kawa": ["river", "der Fluss"], // 川 かわ — la rivière
  "umi": ["sea", "das Meer"], // 海 うみ — la mer
  "ki": ["tree, wood", "der Baum, das Holz"], // 木 き — l'arbre, le bois
  "hana-2": ["flower", "die Blume"], // 花 はな — la fleur
  "dobutsu": ["animal", "das Tier"], // 動物 どうぶつ — l'animal
  "inu": ["dog", "der Hund"], // 犬 いぬ — le chien
  "neko": ["cat", "die Katze"], // 猫 ねこ — le chat
  "tori": ["bird", "der Vogel"], // 鳥 とり — l'oiseau
  "atsui": ["hot (weather)", "heiß (Wetter)"], // 暑い あつい — chaud (temps)
  "samui": ["cold (weather)", "kalt (Wetter)"], // 寒い さむい — froid (temps)
  "atatakai": ["warm, mild", "warm, mild"], // 暖かい あたたかい — doux, tiède
  "suzushii": ["cool", "kühl"], // 涼しい すずしい — frais
  "iro": ["colour", "die Farbe"], // 色 いろ — la couleur
  "aka": ["red", "das Rot"], // 赤 あか — le rouge
  "akai": ["red", "rot"], // 赤い あかい — rouge
  "ao": ["blue", "das Blau"], // 青 あお — le bleu
  "aoi": ["blue", "blau"], // 青い あおい — bleu
  "shiro": ["white", "das Weiß"], // 白 しろ — le blanc
  "shiroi": ["white", "weiß"], // 白い しろい — blanc
  "kuro": ["black", "das Schwarz"], // 黒 くろ — le noir
  "kuroi": ["black", "schwarz"], // 黒い くろい — noir
  "kiiro": ["yellow", "das Gelb"], // 黄色 きいろ — le jaune
  "kiiroi": ["yellow", "gelb"], // 黄色い きいろい — jaune
  "chairo": ["brown", "das Braun"], // 茶色 ちゃいろ — le marron
  "midori": ["green", "das Grün"], // 緑 みどり — le vert
  "gakko": ["school", "die Schule"], // 学校 がっこう — l'école
  "daigaku": ["university", "die Universität"], // 大学 だいがく — l'université
  "kyoshitsu": ["classroom", "das Klassenzimmer"], // 教室 きょうしつ — la salle de classe
  "kurasu": ["class", "die Klasse"], // クラス クラス — la classe
  "jugyo": ["lesson, class", "der Unterricht"], // 授業 じゅぎょう — le cours
  "benkyo": ["study (べんきょうする, to study)", "das Lernen (べんきょうする, lernen)"], // 勉強 べんきょう — l'étude (べんきょうする, étudier)
  "renshu": ["practice (れんしゅうする, to practise)", "die Übung (れんしゅうする, üben)"], // 練習 れんしゅう — l'entraînement (れんしゅうする, s'entraîner)
  "shukudai": ["homework", "die Hausaufgaben"], // 宿題 しゅくだい — les devoirs
  "tesuto": ["test, exam", "der Test, die Prüfung"], // テスト テスト — l'examen, le contrôle
  "mondai": ["question (in an exercise), problem", "die Aufgabe, das Problem"], // 問題 もんだい — la question (d'exercice), le problème
  "shitsumon": ["question", "die Frage"], // 質問 しつもん — la question
  "sakubun": ["essay, composition", "der Aufsatz"], // 作文 さくぶん — la rédaction
  "bunsho": ["text, sentence", "der Text, der Satz"], // 文章 ぶんしょう — le texte, la phrase
  "kotoba": ["word, language", "das Wort, die Sprache"], // 言葉 ことば — le mot, la langue
  "imi": ["meaning", "die Bedeutung"], // 意味 いみ — le sens, la signification
  "suffixe-go": ["the … language (にほんご, Japanese)", "die …-Sprache (にほんご, Japanisch)"], // ～語 ～ご — la langue… (にほんご, le japonais)
  "eigo": ["English", "Englisch"], // 英語 えいご — l'anglais
  "kanji": ["kanji", "die Kanji"], // 漢字 かんじ — les kanji
  "hiragana": ["hiragana", "die Hiragana"], // ひらがな ひらがな — les hiragana
  "katakana": ["katakana", "die Katakana"], // カタカナ カタカナ — les katakana
  "jisho": ["dictionary", "das Wörterbuch"], // 辞書 じしょ — le dictionnaire
  "hon": ["book", "das Buch"], // 本 ほん — le livre
  "noto": ["notebook", "das Heft"], // ノート ノート — le cahier
  "kami": ["paper", "das Papier"], // 紙 かみ — le papier
  "enpitsu": ["pencil", "der Bleistift"], // 鉛筆 えんぴつ — le crayon
  "pen": ["pen", "der Stift"], // ペン ペン — le stylo
  "borupen": ["ballpoint pen", "der Kugelschreiber"], // ボールペン ボールペン — le stylo à bille
  "mannenhitsu": ["fountain pen", "der Füller"], // 万年筆 まんねんひつ — le stylo-plume
  "zasshi": ["magazine", "die Zeitschrift"], // 雑誌 ざっし — le magazine
  "shinbun": ["newspaper", "die Zeitung"], // 新聞 しんぶん — le journal
  "nyusu": ["the news", "die Nachrichten"], // ニュース ニュース — les informations
  "shashin": ["photo", "das Foto"], // 写真 しゃしん — la photo
  "e": ["picture, painting", "das Bild, das Gemälde"], // 絵 え — le dessin, la peinture
  "hanashi": ["story, conversation", "die Geschichte, das Gespräch"], // 話 はなし — l'histoire, la conversation
  "namae": ["name", "der Name"], // 名前 なまえ — le nom
  "kaisha": ["company", "die Firma"], // 会社 かいしゃ — l'entreprise
  "shigoto": ["work, job", "die Arbeit"], // 仕事 しごと — le travail
  "ongaku": ["music", "die Musik"], // 音楽 おんがく — la musique
  "uta": ["song", "das Lied"], // 歌 うた — la chanson
  "gita": ["guitar", "die Gitarre"], // ギター ギター — la guitare
  "eiga": ["film", "der Film"], // 映画 えいが — le film
  "supotsu": ["sport", "der Sport"], // スポーツ スポーツ — le sport
  "pati": ["party", "die Party, die Feier"], // パーティー パーティー — la fête, la soirée
  "kekkon": ["marriage (けっこんする, to get married)", "die Heirat (けっこんする, heiraten)"], // 結婚 けっこん — le mariage (けっこんする, se marier)
  "ii": ["good", "gut"], // いい いい — bien, bon
  "warui": ["bad", "schlecht"], // 悪い わるい — mauvais
  "okii": ["big", "groß"], // 大きい おおきい — grand, gros
  "chiisai": ["small", "klein"], // 小さい ちいさい — petit
  "okina": ["big (before a noun)", "groß (vor einem Nomen)"], // 大きな おおきな — grand (devant un nom)
  "chiisana": ["small (before a noun)", "klein (vor einem Nomen)"], // 小さな ちいさな — petit (devant un nom)
  "atarashii": ["new", "neu"], // 新しい あたらしい — nouveau, neuf
  "furui": ["old (things)", "alt (Dinge)"], // 古い ふるい — vieux, ancien (objets)
  "wakai": ["young", "jung"], // 若い わかい — jeune
  "takai": ["high, expensive", "hoch, teuer"], // 高い たかい — haut, cher
  "hikui": ["low, short (height)", "niedrig, klein (Größe)"], // 低い ひくい — bas, petit (taille)
  "yasui": ["cheap", "billig"], // 安い やすい — bon marché
  "nagai": ["long", "lang"], // 長い ながい — long
  "mijikai": ["short", "kurz"], // 短い みじかい — court
  "hiroi": ["spacious, wide", "geräumig, breit"], // 広い ひろい — spacieux, large
  "semai": ["narrow, small (room)", "eng, klein (Zimmer)"], // 狭い せまい — étroit, petit (pièce)
  "futoi": ["thick, fat", "dick"], // 太い ふとい — épais, gros
  "hosoi": ["thin, slim", "dünn, schlank"], // 細い ほそい — fin, mince
  "atsui-2": ["thick", "dick (Gegenstand)"], // 厚い あつい — épais
  "usui": ["thin, weak, pale", "dünn, schwach, blass"], // 薄い うすい — fin, léger, pâle
  "omoi": ["heavy", "schwer"], // 重い おもい — lourd
  "karui": ["light", "leicht"], // 軽い かるい — léger
  "marui": ["round", "rund"], // 丸い まるい — rond
  "chikai": ["near", "nah"], // 近い ちかい — proche
  "toi": ["far", "weit"], // 遠い とおい — loin
  "hayai": ["early", "früh"], // 早い はやい — tôt
  "hayai-2": ["fast", "schnell"], // 速い はやい — rapide
  "osoi": ["slow, late", "langsam, spät"], // 遅い おそい — lent, tard
  "oi": ["many", "viele"], // 多い おおい — nombreux
  "sukunai": ["few", "wenige"], // 少ない すくない — peu nombreux
  "tsuyoi": ["strong", "stark"], // 強い つよい — fort
  "yowai": ["weak", "schwach"], // 弱い よわい — faible
  "akarui": ["bright, cheerful", "hell, fröhlich"], // 明るい あかるい — clair, lumineux, gai
  "kurai": ["dark", "dunkel"], // 暗い くらい — sombre
  "atsui-3": ["hot (object)", "heiß (Gegenstand)"], // 熱い あつい — chaud (objet)
  "tsumetai": ["cold (object), cold (person)", "kalt (Gegenstand), kühl (Person)"], // 冷たい つめたい — froid (objet), froid (personne)
  "nurui": ["lukewarm", "lauwarm"], // ぬるい ぬるい — tiède
  "muzukashii": ["difficult", "schwierig"], // 難しい むずかしい — difficile
  "yasashii": ["easy", "leicht, einfach"], // 易しい やさしい — facile
  "tanoshii": ["fun, enjoyable", "lustig, angenehm"], // 楽しい たのしい — agréable, amusant
  "omoshiroi": ["interesting, funny", "interessant, lustig"], // 面白い おもしろい — intéressant, drôle
  "tsumaranai": ["boring", "langweilig"], // つまらない つまらない — ennuyeux
  "isogashii": ["busy", "beschäftigt"], // 忙しい いそがしい — occupé
  "abunai": ["dangerous", "gefährlich"], // 危ない あぶない — dangereux
  "kitanai": ["dirty", "schmutzig"], // 汚い きたない — sale
  "urusai": ["noisy, annoying", "laut, nervig"], // うるさい うるさい — bruyant, agaçant
  "kawaii": ["cute", "süß, niedlich"], // かわいい かわいい — mignon
  "hoshii": ["to want (a thing)", "haben wollen (Gegenstand)"], // 欲しい ほしい — vouloir (un objet)
  "onaji": ["the same", "gleich"], // 同じ おなじ — pareil, le même
  "kirei": ["pretty, clean", "hübsch, sauber"], // きれい きれい — joli, propre
  "shizuka": ["quiet", "ruhig"], // 静か しずか — calme
  "nigiyaka": ["lively", "belebt, lebhaft"], // にぎやか にぎやか — animé, vivant
  "yumei": ["famous", "berühmt"], // 有名 ゆうめい — célèbre
  "benri": ["handy, convenient", "praktisch"], // 便利 べんり — pratique
  "taisetsu": ["important, precious", "wichtig, kostbar"], // 大切 たいせつ — important, précieux
  "jobu": ["sturdy, strong", "robust, kräftig"], // 丈夫 じょうぶ — solide, robuste
  "daijobu": ["all right, no problem", "in Ordnung, kein Problem"], // 大丈夫 だいじょうぶ — ça va, pas de problème
  "rippa": ["splendid, admirable", "prächtig, großartig"], // 立派 りっぱ — magnifique, remarquable
  "jozu": ["good at, skilful", "geschickt, gut in etwas"], // 上手 じょうず — doué, habile
  "heta": ["bad at, clumsy", "ungeschickt, schlecht in etwas"], // 下手 へた — maladroit, pas doué
  "suki": ["to like", "mögen"], // 好き すき — aimer, apprécier
  "daisuki": ["to love, to adore", "sehr mögen, lieben"], // 大好き だいすき — adorer
  "kirai": ["to dislike, to hate", "nicht mögen, hassen"], // 嫌い きらい — ne pas aimer, détester
  "iya": ["unpleasant, not wanting to", "unangenehm, keine Lust"], // 嫌 いや — désagréable, pas envie
  "taihen": ["hard, tough; very", "schwierig, anstrengend; sehr"], // 大変 たいへん — difficile, pénible ; très
  "kekko": ["fine; that's enough (no thank you)", "gut; das reicht (nein danke)"], // 結構 けっこう — très bien, ça suffit (non merci)
  "honto": ["true, the truth", "wahr, die Wahrheit"], // 本当 ほんとう — vrai, la vérité
  "iroiro": ["various, all sorts", "verschiedene, allerlei"], // いろいろ いろいろ — divers, toutes sortes
  "kore": ["this (near me)", "dies (bei mir)"], // これ これ — ceci (près de moi)
  "sore": ["that (near you)", "das (bei dir)"], // それ それ — cela (près de toi)
  "are": ["that (over there)", "das dort"], // あれ あれ — cela, là-bas
  "dore": ["which one?", "welches?"], // どれ どれ — lequel ?
  "kono": ["this… (near me)", "dieser… (bei mir)"], // この この — ce… (près de moi)
  "sono": ["that… (near you)", "dieser… (bei dir)"], // その その — ce… (près de toi)
  "ano": ["that… over there; um…", "jener… dort; äh…"], // あの あの — ce… là-bas ; euh…
  "dono": ["which…?", "welcher…?"], // どの どの — quel… ?
  "konna": ["this kind of…, like this", "so ein…, so"], // こんな こんな — ce genre de…, comme ça
  "donna": ["what kind of…?", "was für ein…?"], // どんな どんな — quel genre de… ?
  "nani": ["what? (also なん)", "was? (auch なん)"], // 何 なに — quoi ? (aussi なん)
  "do": ["how?", "wie?"], // どう どう — comment ?
  "ikaga": ["how? (polite: いかがですか, how about…?)", "wie? (höflich: いかがですか, wie wäre es mit…?)"], // いかが いかが — comment ? (poli : いかがですか, que diriez-vous ?)
  "doshite": ["why?", "warum?"], // どうして どうして — pourquoi ?
  "naze": ["why?", "warum?"], // なぜ なぜ — pourquoi ?
  "hai": ["yes", "ja"], // はい はい — oui
  "ee": ["yes (more casual)", "ja (lockerer)"], // ええ ええ — oui (plus familier)
  "iie": ["no", "nein"], // いいえ いいえ — non
  "so": ["so, that's right (そうです, yes, that's it)", "so, genau (そうです, ja, genau)"], // そう そう — ainsi, c'est ça (そうです, oui c'est ça)
  "a": ["ah!, oh!", "ah!, oh!"], // ああ ああ — ah !, oh !
  "sa": ["come on!, well…", "los!, tja…"], // さあ さあ — allez !, eh bien…
  "ja": ["well then (casual)", "also dann (locker)"], // じゃあ じゃあ — alors, bon (familier)
  "deha": ["well then", "also dann"], // では では — alors, eh bien
  "soredeha": ["well then, in that case", "nun denn, in dem Fall"], // それでは それでは — alors, dans ce cas
  "moshimoshi": ["hello? (on the phone)", "hallo? (am Telefon)"], // もしもし もしもし — allô ?
  "dozo": ["please, go ahead", "bitte sehr, bitte schön"], // どうぞ どうぞ — je vous en prie, allez-y
  "domo": ["thanks; very (どうもありがとう)", "danke; sehr (どうもありがとう)"], // どうも どうも — merci ; bien (どうもありがとう)
  "kudasai": ["please (give me)", "bitte (geben Sie mir)"], // ください ください — s'il vous plaît, donnez-moi
  "soshite": ["and, then", "und, dann"], // そして そして — et, ensuite
  "sorekara": ["and then, after that", "und dann, danach"], // それから それから — et puis, après ça
  "shikashi": ["however", "jedoch"], // しかし しかし — cependant
  "demo": ["but", "aber"], // でも でも — mais
  "mata": ["again", "wieder"], // また また — de nouveau, encore
  "totemo": ["very", "sehr"], // とても とても — très
  "amari": ["not very (with a negative)", "nicht sehr (mit Verneinung)"], // あまり あまり — pas très (avec la négation)
  "sukoshi": ["a little", "ein bisschen"], // 少し すこし — un peu
  "chotto": ["a little, a moment", "ein bisschen, einen Moment"], // ちょっと ちょっと — un peu, un instant
  "takusan": ["a lot", "viel"], // たくさん たくさん — beaucoup
  "motto": ["more", "mehr"], // もっと もっと — plus, davantage
  "yoku": ["often, well", "oft, gut"], // よく よく — souvent, bien
  "dandan": ["gradually", "allmählich"], // だんだん だんだん — petit à petit
  "yukkuri": ["slowly, at ease", "langsam, in Ruhe"], // ゆっくり ゆっくり — lentement, tranquillement
  "chodo": ["exactly, just", "genau, gerade"], // ちょうど ちょうど — exactement, pile
  "tabun": ["probably", "wahrscheinlich"], // たぶん たぶん — sans doute, probablement
  "issho": ["together (いっしょに)", "zusammen (いっしょに)"], // いっしょ いっしょ — ensemble (いっしょに)
  "suffixe-dake": ["only…", "nur…"], // ～だけ ～だけ — seulement…
  "suffixe-nado": ["… etc., for example", "… usw., zum Beispiel"], // ～など ～など — … etc., par exemple
  "suffixe-kurai": ["about…", "ungefähr…"], // ～くらい ～くらい — environ…
  "nai": ["there isn't, not to have", "es gibt nicht, nicht haben"], // ない ない — il n'y a pas, ne pas avoir
  "boku": ["I, me (boys, men)", "ich (Jungen, Männer)"], // 僕 ぼく — je, moi (garçons, hommes)
  "kimi": ["you (casual)", "du (locker)"], // 君 きみ — tu, toi (familier)
  "kare-2": ["he, him; boyfriend", "er; der Freund"], // 彼 かれ — il, lui ; le petit ami
  "kanojo": ["she, her; girlfriend", "sie; die Freundin"], // 彼女 かのじょ — elle ; la petite amie
  "karera": ["they, them", "sie (Plural)"], // 彼ら かれら — ils, eux
  "mina": ["everyone", "alle"], // 皆 みな — tout le monde
  "ko": ["child", "das Kind"], // 子 こ — l'enfant
  "akachan": ["baby", "das Baby"], // 赤ちゃん あかちゃん — le bébé
  "akanbo": ["baby", "das Baby"], // 赤ん坊 あかんぼう — le bébé
  "oya": ["parent", "der Elternteil"], // 親 おや — le parent
  "otto": ["my husband", "mein Mann"], // 夫 おっと — mon mari
  "tsuma": ["my wife", "meine Frau"], // 妻 つま — ma femme
  "kanai": ["my wife (humble)", "meine Frau (bescheiden)"], // 家内 かない — ma femme (modeste)
  "goshujin": ["husband (someone's)", "der Ehemann (von jemandem)"], // ご主人 ごしゅじん — le mari (de quelqu'un)
  "musuko": ["my son", "mein Sohn"], // 息子 むすこ — mon fils
  "musume": ["my daughter", "meine Tochter"], // 娘 むすめ — ma fille
  "okosan": ["child (someone's)", "das Kind (von jemandem)"], // お子さん おこさん — l'enfant (de quelqu'un)
  "ojosan": ["daughter (someone's), young lady", "die Tochter (von jemandem), das Fräulein"], // お嬢さん おじょうさん — la fille (de quelqu'un), mademoiselle
  "sofu": ["my grandfather", "mein Großvater"], // 祖父 そふ — mon grand-père
  "sobo": ["my grandmother", "meine Großmutter"], // 祖母 そぼ — ma grand-mère
  "papa": ["dad", "Papa"], // パパ パパ — papa
  "dansei": ["a man", "ein Mann"], // 男性 だんせい — un homme
  "josei": ["a woman", "eine Frau"], // 女性 じょせい — une femme
  "kyaku": ["guest, customer", "der Gast, der Kunde"], // 客 きゃく — l'invité, le client
  "senpai": ["senior (at school, at work)", "der Ältere (in Schule, Firma)"], // 先輩 せんぱい — l'aîné (à l'école, au travail)
  "shimin": ["citizen", "der Bürger"], // 市民 しみん — le citoyen
  "shacho": ["company president, boss", "der Firmenchef"], // 社長 しゃちょう — le PDG, le patron
  "bucho": ["head of department", "der Abteilungsleiter"], // 部長 ぶちょう — le chef de département
  "kacho": ["section manager", "der Sektionsleiter"], // 課長 かちょう — le chef de service
  "kocho": ["head teacher", "der Schulleiter"], // 校長 こうちょう — le directeur d'école
  "tenin": ["shop assistant", "der Verkäufer, die Verkäuferin"], // 店員 てんいん — le vendeur, la vendeuse
  "komuin": ["civil servant", "der Beamte, die Beamtin"], // 公務員 こうむいん — le fonctionnaire
  "untenshu": ["driver", "der Fahrer"], // 運転手 うんてんしゅ — le chauffeur
  "anaunsa": ["newsreader, announcer", "der Nachrichtensprecher, die Sprecherin"], // アナウンサー アナウンサー — le présentateur, la présentatrice
  "haisha": ["dentist", "der Zahnarzt"], // 歯医者 はいしゃ — le dentiste
  "daigakusei": ["university student", "der Student, die Studentin"], // 大学生 だいがくせい — l'étudiant (université)
  "kokosei": ["high-school student", "der Oberschüler"], // 高校生 こうこうせい — le lycéen
  "dorobo": ["thief, burglar", "der Dieb, der Einbrecher"], // 泥棒 どろぼう — le voleur, le cambrioleur
  "suri": ["pickpocket", "der Taschendieb"], // すり すり — le pickpocket
  "suffixe-sama": ["Mr…, Ms… (very polite)", "Herr…, Frau… (sehr höflich)"], // ～様 ～さま — Monsieur…, Madame… (très poli)
  "suffixe-kun": ["(after the name of a boy or a junior)", "(nach dem Namen eines Jungen oder Jüngeren)"], // ～君 ～くん — (après le nom d'un garçon, d'un cadet)
  "suffixe-chan": ["(after the name of a child or someone close)", "(nach dem Namen eines Kindes oder einer vertrauten Person)"], // ～ちゃん ～ちゃん — (après le nom d'un enfant, d'un proche)
  "suffixe-in": ["member of…, employee of…", "Mitglied von…, Angestellter von…"], // ～員 ～いん — membre de…, employé de…
  "suffixe-ka": ["specialist in… (しょうせつか, novelist)", "Fachmann für… (しょうせつか, Romanautor)"], // ～家 ～か — spécialiste de… (しょうせつか, romancier)
  "kubi": ["neck", "der Hals"], // 首 くび — le cou
  "nodo": ["throat", "die Kehle"], // 喉 のど — la gorge
  "ude": ["arm", "der Arm"], // 腕 うで — le bras
  "yubi": ["finger", "der Finger"], // 指 ゆび — le doigt
  "senaka": ["back", "der Rücken"], // 背中 せなか — le dos
  "ke": ["hair (body), hair", "die Haare"], // 毛 け — les poils, les cheveux
  "hige": ["beard, moustache", "der Bart, der Schnurrbart"], // ひげ ひげ — la barbe, la moustache
  "chi": ["blood", "das Blut"], // 血 ち — le sang
  "chikara": ["strength", "die Kraft"], // 力 ちから — la force
  "kokoro": ["heart, mind", "das Herz, der Geist"], // 心 こころ — le cœur, l'esprit
  "netsu": ["fever", "das Fieber"], // 熱 ねつ — la fièvre
  "guai": ["condition (health)", "das Befinden"], // 具合 ぐあい — l'état (de santé), la condition
  "kibun": ["mood, feeling (well, unwell)", "die Stimmung, das Befinden"], // 気分 きぶん — l'humeur, se sentir (bien, mal)
  "kimochi": ["feeling, sensation", "das Gefühl"], // 気持ち きもち — le sentiment, la sensation
  "chusha": ["injection", "die Spritze"], // 注射 ちゅうしゃ — la piqûre
  "nyuin": ["hospitalisation (にゅういんする, to go into hospital)", "der Krankenhausaufenthalt (にゅういんする, ins Krankenhaus kommen)"], // 入院 にゅういん — l'hospitalisation (にゅういんする, être hospitalisé)
  "taiin": ["leaving hospital", "die Entlassung aus dem Krankenhaus"], // 退院 たいいん — la sortie de l'hôpital
  "omimai": ["visit to a sick person", "der Krankenbesuch"], // お見舞い おみまい — la visite à un malade
  "kega": ["injury (けがする, to get hurt)", "die Verletzung (けがする, sich verletzen)"], // けが けが — la blessure (けがする, se blesser)
  "nemui": ["sleepy", "müde, schläfrig"], // 眠い ねむい — avoir sommeil
  "nebo": ["oversleeping", "das Verschlafen"], // 寝坊 ねぼう — la grasse matinée, se lever en retard
  "asu": ["tomorrow (formal)", "morgen (gehoben)"], // 明日 あす — demain (soutenu)
  "konya": ["tonight", "heute Nacht, heute Abend"], // 今夜 こんや — ce soir, cette nuit
  "hiruma": ["daytime", "der Tag (tagsüber)"], // 昼間 ひるま — la journée
  "hiruyasumi": ["lunch break", "die Mittagspause"], // 昼休み ひるやすみ — la pause de midi
  "saraishu": ["the week after next", "übernächste Woche"], // 再来週 さらいしゅう — dans deux semaines
  "saraigetsu": ["the month after next", "übernächsten Monat"], // 再来月 さらいげつ — dans deux mois
  "shogatsu": ["New Year", "das Neujahr"], // 正月 しょうがつ — le Nouvel An
  "kisetsu": ["season", "die Jahreszeit"], // 季節 きせつ — la saison
  "jidai": ["era, period", "das Zeitalter"], // 時代 じだい — l'époque
  "mukashi": ["long ago, the old days", "früher, einst"], // 昔 むかし — autrefois
  "shorai": ["the future", "die Zukunft"], // 将来 しょうらい — l'avenir
  "saikin": ["recently, these days", "neulich, in letzter Zeit"], // 最近 さいきん — récemment, ces temps-ci
  "konogoro": ["these days", "heutzutage, dieser Tage"], // この頃 このごろ — ces jours-ci
  "konoaida": ["the other day", "neulich"], // この間 このあいだ — l'autre jour
  "sakki": ["a moment ago", "vorhin"], // さっき さっき — tout à l'heure (passé)
  "kondo": ["this time, next time", "diesmal, nächstes Mal"], // 今度 こんど — cette fois, la prochaine fois
  "korekara": ["from now on", "von jetzt an"], // これから これから — à partir de maintenant
  "mosugu": ["soon", "bald"], // もうすぐ もうすぐ — bientôt
  "sorosoro": ["it's about time to…", "langsam, allmählich"], // そろそろ そろそろ — il est bientôt temps de…
  "shibaraku": ["for a while", "eine Weile"], // しばらく しばらく — un moment, un certain temps
  "hisashiburi": ["after a long time (ひさしぶり！, long time no see!)", "nach langer Zeit (ひさしぶり！, lange nicht gesehen!)"], // 久しぶり ひさしぶり — après longtemps (ひさしぶり！, ça fait longtemps !)
  "saisho": ["the beginning, the first", "der Anfang, der Erste"], // 最初 さいしょ — le début, le premier
  "saigo": ["the end, the last", "das Ende, der Letzte"], // 最後 さいご — la fin, le dernier
  "owari": ["the end", "das Ende"], // 終わり おわり — la fin
  "tochu": ["on the way", "unterwegs"], // 途中 とちゅう — en chemin, en cours de route
  "aida": ["interval, during, between", "der Zwischenraum, während, zwischen"], // 間 あいだ — l'intervalle, pendant, entre
  "yotei": ["plan, schedule", "der Plan, das Vorhaben"], // 予定 よてい — le programme, ce qui est prévu
  "yoyaku": ["reservation", "die Reservierung"], // 予約 よやく — la réservation
  "yakusoku": ["promise, appointment", "das Versprechen, die Verabredung"], // 約束 やくそく — la promesse, le rendez-vous
  "tsugo": ["convenience, availability", "die Gelegenheit, ob es passt"], // 都合 つごう — la disponibilité, ce qui arrange
  "rusu": ["being out (not at home)", "die Abwesenheit (nicht zu Hause)"], // 留守 るす — l'absence (ne pas être chez soi)
  "ichido": ["once", "einmal"], // 一度 いちど — une fois
  "tamani": ["occasionally", "ab und zu"], // たまに たまに — de temps en temps
  "suffixe-oki": ["every other… (いちにちおき, every other day)", "jeden zweiten… (いちにちおき, jeden zweiten Tag)"], // ～おき ～おき — tous les… (いちにちおき, un jour sur deux)
  "suffixe-tsuki": ["… months (ひとつき, one month)", "… Monate (ひとつき, ein Monat)"], // ～月 ～つき — … mois (ひとつき, un mois)
  "bai": ["double, … times as much", "das Doppelte, …-mal so viel"], // 倍 ばい — le double, … fois plus
  "ten": ["point, mark", "der Punkt, die Note"], // 点 てん — le point, la note
  "wariai": ["proportion; relatively", "der Anteil; verhältnismäßig"], // 割合 わりあい — la proportion ; relativement
  "ijo": ["more than…; that's all", "mehr als…; das ist alles"], // 以上 いじょう — plus de… ; c'est tout
  "ika": ["less than…, below", "weniger als…, unten"], // 以下 いか — moins de…, ci-dessous
  "inai": ["within…", "innerhalb von…"], // 以内 いない — en moins de…, dans les…
  "igai": ["apart from…, except…", "außer…"], // 以外 いがい — à part…, sauf…
  "jinko": ["population", "die Bevölkerung"], // 人口 じんこう — la population
  "nedan": ["price", "der Preis"], // 値段 ねだん — le prix
  "otsuri": ["change (money given back)", "das Wechselgeld"], // おつり おつり — la monnaie (rendue)
  "ippai": ["full; a glass of", "voll; ein Glas"], // 一杯 いっぱい — plein ; un verre
  "jubun": ["enough, sufficient", "genug, ausreichend"], // 十分 じゅうぶん — assez, suffisant
  "ryoho": ["both", "beide"], // 両方 りょうほう — les deux
  "suffixe-ken": ["(counter for houses)", "(Zählwort für Häuser)"], // ～軒 ～けん — (compteur des maisons)
  "suffixe-me": ["…th (ふたつめ, the second)", "…te (ふたつめ, der Zweite)"], // ～目 ～め — …-ième (ふたつめ, le deuxième)
  "suffixe-date": ["…-storey (にかいだて, two-storey)", "…-stöckig (にかいだて, zweistöckig)"], // ～建て ～だて — à … étages (にかいだて, à deux étages)
  "basho": ["place", "der Ort"], // 場所 ばしょ — l'endroit
  "kinjo": ["neighbourhood", "die Nachbarschaft"], // 近所 きんじょ — le voisinage, le quartier
  "mawari": ["surroundings", "die Umgebung"], // 周り まわり — les alentours
  "mannaka": ["the middle", "die Mitte"], // 真ん中 まんなか — le milieu
  "sumi": ["corner", "die Ecke (innen)"], // 隅 すみ — le coin
  "toku": ["far away", "in der Ferne"], // 遠く とおく — au loin
  "omote": ["front, surface; outside", "die Vorderseite; draußen"], // 表 おもて — le devant, l'endroit ; dehors
  "ura": ["back, reverse side", "die Rückseite"], // 裏 うら — le dos, l'envers, l'arrière
  "sekai": ["world", "die Welt"], // 世界 せかい — le monde
  "seiyo": ["the West", "der Westen"], // 西洋 せいよう — l'Occident
  "ajia": ["Asia", "Asien"], // アジア アジア — l'Asie
  "afurika": ["Africa", "Afrika"], // アフリカ アフリカ — l'Afrique
  "amerika": ["America, the United States", "Amerika, die USA"], // アメリカ アメリカ — l'Amérique, les États-Unis
  "inaka": ["countryside", "das Land (ländliche Gegend)"], // 田舎 いなか — la campagne
  "kogai": ["suburbs", "der Vorort"], // 郊外 こうがい — la banlieue
  "jusho": ["address", "die Adresse"], // 住所 じゅうしょ — l'adresse
  "tori-2": ["street, avenue", "die Straße"], // 通り とおり — la rue, l'avenue
  "saka": ["slope, hill", "der Hang, die Steigung"], // 坂 さか — la pente, la côte
  "suffixe-ku": ["the … ward", "der Bezirk…"], // ～区 ～く — l'arrondissement de…
  "suffixe-cho": ["the town of…, the … district", "die Stadt…, das Viertel…"], // ～町 ～ちょう — la ville de…, le quartier de…
  "biru": ["building (block)", "das Hochhaus, das Gebäude"], // ビル ビル — l'immeuble
  "okujo": ["rooftop", "das Dach (Dachterrasse)"], // 屋上 おくじょう — le toit-terrasse
  "uriba": ["department (in a shop)", "die Abteilung (im Geschäft)"], // 売り場 うりば — le rayon (d'un magasin)
  "uketsuke": ["reception", "der Empfang"], // 受付 うけつけ — l'accueil, la réception
  "supa": ["supermarket", "der Supermarkt"], // スーパー スーパー — le supermarché
  "tokoya": ["barber", "der Friseur (Herren)"], // 床屋 とこや — le coiffeur (pour hommes)
  "ryokan": ["traditional Japanese inn", "das traditionelle japanische Gasthaus"], // 旅館 りょかん — l'auberge japonaise
  "geshuku": ["lodgings", "das Zimmer zur Untermiete"], // 下宿 げしゅく — la chambre chez l'habitant
  "jimusho": ["office", "das Büro"], // 事務所 じむしょ — le bureau (lieu de travail)
  "kaigishitsu": ["meeting room", "der Besprechungsraum"], // 会議室 かいぎしつ — la salle de réunion
  "kaijo": ["venue", "der Veranstaltungsort"], // 会場 かいじょう — la salle, le lieu (d'un événement)
  "kojo": ["factory", "die Fabrik"], // 工場 こうじょう — l'usine
  "kenkyushitsu": ["laboratory, professor's office", "das Labor, das Arbeitszimmer des Professors"], // 研究室 けんきゅうしつ — le laboratoire, le bureau du professeur
  "kodo": ["auditorium, hall", "die Aula"], // 講堂 こうどう — l'amphithéâtre, la grande salle
  "shogakko": ["primary school", "die Grundschule"], // 小学校 しょうがっこう — l'école primaire
  "chugakko": ["lower secondary school", "die Mittelschule"], // 中学校 ちゅうがっこう — le collège
  "koko-2": ["high school", "die Oberschule"], // 高校 こうこう — le lycée
  "bijutsukan": ["art museum", "das Kunstmuseum"], // 美術館 びじゅつかん — le musée d'art
  "dobutsuen": ["zoo", "der Zoo"], // 動物園 どうぶつえん — le zoo
  "kyokai": ["church", "die Kirche"], // 教会 きょうかい — l'église
  "jinja": ["Shinto shrine", "der Shintō-Schrein"], // 神社 じんじゃ — le sanctuaire shintō
  "tera": ["Buddhist temple", "der buddhistische Tempel"], // 寺 てら — le temple bouddhiste
  "shinbunsha": ["newspaper (company)", "der Zeitungsverlag"], // 新聞社 しんぶんしゃ — le journal (entreprise)
  "keisatsu": ["police", "die Polizei"], // 警察 けいさつ — la police
  "chushajo": ["car park", "der Parkplatz"], // 駐車場 ちゅうしゃじょう — le parking
  "gasorinsutando": ["petrol station", "die Tankstelle"], // ガソリンスタンド ガソリンスタンド — la station-service
  "kuko": ["airport", "der Flughafen"], // 空港 くうこう — l'aéroport
  "hikojo": ["airfield", "der Flugplatz"], // 飛行場 ひこうじょう — l'aérodrome
  "minato": ["port, harbour", "der Hafen"], // 港 みなと — le port
  "kaigan": ["coast, seaside", "die Küste, der Strand"], // 海岸 かいがん — la côte, le bord de mer
  "otaku": ["home (someone's, polite)", "das Haus (von jemandem, höflich)"], // お宅 おたく — la maison (de quelqu'un, poli)
  "tatami": ["tatami mat", "die Tatami-Matte"], // 畳 たたみ — le tatami
  "futon": ["futon", "der Futon"], // 布団 ふとん — le futon
  "oshiire": ["(Japanese) closet", "der (japanische) Wandschrank"], // 押し入れ おしいれ — le placard (japonais)
  "hikidashi": ["drawer", "die Schublade"], // 引き出し ひきだし — le tiroir
  "tana": ["shelf", "das Regal"], // 棚 たな — l'étagère
  "kabe": ["wall", "die Wand"], // 壁 かべ — le mur
  "katen": ["curtain", "der Vorhang"], // カーテン カーテン — le rideau
  "kagami": ["mirror", "der Spiegel"], // 鏡 かがみ — le miroir
  "dento": ["electric light", "die elektrische Lampe"], // 電灯 でんとう — la lampe électrique
  "reibo": ["air conditioning", "die Klimaanlage"], // 冷房 れいぼう — la climatisation
  "danbo": ["heating", "die Heizung"], // 暖房 だんぼう — le chauffage
  "suido": ["running water", "die Wasserleitung"], // 水道 すいどう — l'eau courante
  "gasu": ["gas", "das Gas"], // ガス ガス — le gaz
  "yu": ["hot water", "das heiße Wasser"], // 湯 ゆ — l'eau chaude
  "gomi": ["rubbish", "der Müll"], // ごみ ごみ — les déchets, les ordures
  "dogu": ["tool", "das Werkzeug"], // 道具 どうぐ — l'outil
  "shinamono": ["article, goods", "der Artikel, die Ware"], // 品物 しなもの — l'article, la marchandise
  "ningyo": ["doll", "die Puppe"], // 人形 にんぎょう — la poupée
  "omocha": ["toy", "das Spielzeug"], // おもちゃ おもちゃ — le jouet
  "okurimono": ["gift", "das Geschenk"], // 贈り物 おくりもの — le cadeau
  "purezento": ["present", "das Geschenk"], // プレゼント プレゼント — le cadeau
  "omiyage": ["souvenir (gift brought back)", "das Mitbringsel"], // お土産 おみやげ — le souvenir (cadeau rapporté)
  "ito": ["thread", "der Faden"], // 糸 いと — le fil
  "garasu": ["glass (material)", "das Glas (Material)"], // ガラス ガラス — le verre (matière)
  "beru": ["doorbell", "die Klingel"], // ベル ベル — la sonnette
  "pasokon": ["personal computer", "der PC"], // パソコン パソコン — l'ordinateur
  "konpyuta": ["computer", "der Computer"], // コンピューター コンピューター — l'ordinateur
  "sukuriin": ["screen", "der Bildschirm, die Leinwand"], // スクリーン スクリーン — l'écran
  "reji": ["till, checkout", "die Kasse"], // レジ レジ — la caisse
  "sutsukeesu": ["suitcase", "der Koffer"], // スーツケース スーツケース — la valise
  "keshigomu": ["eraser, rubber", "der Radiergummi"], // 消しゴム けしゴム — la gomme
  "wasuremono": ["lost property, something left behind", "der vergessene Gegenstand"], // 忘れ物 わすれもの — l'objet oublié
  "junbi": ["preparation (じゅんびする, to prepare)", "die Vorbereitung (じゅんびする, vorbereiten)"], // 準備 じゅんび — la préparation (じゅんびする, préparer)
  "yoi": ["preparation", "die Vorbereitung"], // 用意 ようい — la préparation
  "shitaku": ["getting ready (to go out, to leave)", "das Fertigmachen (zum Ausgehen)"], // 支度 したく — les préparatifs (pour sortir, partir)
  "shokuji": ["meal", "die Mahlzeit"], // 食事 しょくじ — le repas
  "gochiso": ["feast; treating someone (ごちそうさまでした, thanks for the meal)", "das Festessen; einladen (ごちそうさまでした, danke für das Essen)"], // ごちそう ごちそう — le festin ; offrir à manger (ごちそうさまでした, merci pour le repas)
  "kome": ["rice (uncooked)", "der Reis (roh)"], // 米 こめ — le riz (cru)
  "miso": ["miso", "das Miso"], // 味噌 みそ — le miso
  "aji": ["taste", "der Geschmack"], // 味 あじ — le goût
  "nioi": ["smell", "der Geruch"], // 匂い におい — l'odeur
  "shokuryohin": ["groceries", "die Lebensmittel"], // 食料品 しょくりょうひん — les produits alimentaires
  "sarada": ["salad", "der Salat"], // サラダ サラダ — la salade
  "sandoitchi": ["sandwich", "das Sandwich"], // サンドイッチ サンドイッチ — le sandwich
  "suteeki": ["steak", "das Steak"], // ステーキ ステーキ — le steak
  "hanbagu": ["hamburger steak", "die Frikadelle"], // ハンバーグ ハンバーグ — le steak haché
  "jamu": ["jam", "die Marmelade"], // ジャム ジャム — la confiture
  "keeki": ["cake", "der Kuchen"], // ケーキ ケーキ — le gâteau
  "budo": ["grapes", "die Weintrauben"], // ぶどう ぶどう — le raisin
  "arukoru": ["alcohol", "der Alkohol"], // アルコール アルコール — l'alcool
  "nigai": ["bitter", "bitter"], // 苦い にがい — amer
  "umai": ["good, tasty (casual); skilful", "lecker (locker); geschickt"], // うまい うまい — bon, délicieux (familier) ; habile
  "kimono": ["kimono", "der Kimono"], // 着物 きもの — le kimono
  "shitagi": ["underwear", "die Unterwäsche"], // 下着 したぎ — les sous-vêtements
  "sutsu": ["suit", "der Anzug, das Kostüm"], // スーツ スーツ — le costume, le tailleur
  "oba": ["overcoat", "der Mantel"], // オーバー オーバー — le pardessus
  "tebukuro": ["gloves", "die Handschuhe"], // 手袋 てぶくろ — les gants
  "sandaru": ["sandals", "die Sandalen"], // サンダル サンダル — les sandales
  "yubiwa": ["ring", "der Ring"], // 指輪 ゆびわ — la bague
  "akusesari": ["jewellery, accessories", "der Schmuck, die Accessoires"], // アクセサリー アクセサリー — les bijoux, les accessoires
  "kinu": ["silk", "die Seide"], // 絹 きぬ — la soie
  "momen": ["cotton", "die Baumwolle"], // 木綿 もめん — le coton
  "kakko": ["appearance, outfit", "das Aussehen, das Outfit"], // 格好 かっこう — l'allure, la tenue
  "kotsu": ["traffic, transport", "der Verkehr"], // 交通 こうつう — la circulation, les transports
  "norimono": ["vehicle, means of transport", "das Fahrzeug, das Verkehrsmittel"], // 乗り物 のりもの — le véhicule, le moyen de transport
  "otobai": ["motorbike", "das Motorrad"], // オートバイ オートバイ — la moto
  "kyuko": ["express train", "der Eilzug"], // 急行 きゅうこう — le train express
  "tokkyu": ["limited express train", "der Schnellzug"], // 特急 とっきゅう — le train rapide (super-express)
  "kisha": ["(steam) train", "der (Dampf-)Zug"], // 汽車 きしゃ — le train (à vapeur)
  "fune": ["boat", "das Boot"], // 舟 ふね — le bateau
  "esukareeta": ["escalator", "die Rolltreppe"], // エスカレーター エスカレーター — l'escalator
  "gasorin": ["petrol", "das Benzin"], // ガソリン ガソリン — l'essence
  "unten": ["driving (うんてんする, to drive)", "das Fahren (うんてんする, fahren)"], // 運転 うんてん — la conduite (うんてんする, conduire)
  "jiko": ["accident", "der Unfall"], // 事故 じこ — l'accident
  "shuppatsu": ["departure", "die Abfahrt"], // 出発 しゅっぱつ — le départ
  "kaeri": ["the way back", "die Rückkehr, der Heimweg"], // 帰り かえり — le retour
  "kenbutsu": ["sightseeing", "die Besichtigung"], // 見物 けんぶつ — la visite touristique
  "annai": ["guidance, information (あんないする, to show around)", "die Führung, die Auskunft (あんないする, führen)"], // 案内 あんない — le guidage, l'information (あんないする, guider)
  "tenkiyoho": ["weather forecast", "die Wettervorhersage"], // 天気予報 てんきよほう — la météo (prévisions)
  "taifu": ["typhoon", "der Taifun"], // 台風 たいふう — le typhon
  "jishin": ["earthquake", "das Erdbeben"], // 地震 じしん — le tremblement de terre
  "kumo": ["cloud", "die Wolke"], // 雲 くも — le nuage
  "tsuki": ["moon", "der Mond"], // 月 つき — la lune
  "hi": ["sun, day", "die Sonne, der Tag"], // 日 ひ — le soleil, le jour
  "hoshi": ["star", "der Stern"], // 星 ほし — l'étoile
  "hikari": ["light", "das Licht"], // 光 ひかり — la lumière
  "kuki": ["air", "die Luft"], // 空気 くうき — l'air
  "hi-2": ["fire", "das Feuer"], // 火 ひ — le feu
  "kaji": ["fire (blaze)", "der Brand"], // 火事 かじ — l'incendie
  "oto": ["sound, noise", "der Ton, das Geräusch"], // 音 おと — le son, le bruit
  "mori": ["forest", "der Wald"], // 森 もり — la forêt
  "hayashi": ["wood, grove", "das Wäldchen"], // 林 はやし — le bois (petite forêt)
  "eda": ["branch", "der Ast"], // 枝 えだ — la branche
  "kusa": ["grass", "das Gras"], // 草 くさ — l'herbe
  "ishi": ["stone", "der Stein"], // 石 いし — la pierre
  "suna": ["sand", "der Sand"], // 砂 すな — le sable
  "shima": ["island", "die Insel"], // 島 しま — l'île
  "mizumi": ["lake", "der See"], // 湖 みずうみ — le lac
  "keshiki": ["scenery", "die Landschaft"], // 景色 けしき — le paysage
  "hanami": ["cherry blossom viewing", "die Kirschblütenschau"], // 花見 はなみ — la contemplation des cerisiers en fleur
  "kotori": ["little bird", "das Vögelchen"], // 小鳥 ことり — le petit oiseau
  "mushi": ["insect", "das Insekt"], // 虫 むし — l'insecte
  "shiken": ["exam", "die Prüfung"], // 試験 しけん — l'examen
  "yoshu": ["preparing for a lesson", "die Vorbereitung auf den Unterricht"], // 予習 よしゅう — la préparation d'un cours
  "fukushu": ["revision (of a lesson)", "die Wiederholung (des Stoffs)"], // 復習 ふくしゅう — la révision (d'un cours)
  "kogi": ["lecture", "die Vorlesung"], // 講義 こうぎ — le cours magistral
  "tekisuto": ["textbook", "das Lehrbuch"], // テキスト テキスト — le manuel
  "jiten": ["dictionary (specialised)", "das Fachwörterbuch"], // 辞典 じてん — le dictionnaire (spécialisé)
  "bunpo": ["grammar", "die Grammatik"], // 文法 ぶんぽう — la grammaire
  "hatsuon": ["pronunciation", "die Aussprache"], // 発音 はつおん — la prononciation
  "kaiwa": ["conversation", "das Gespräch"], // 会話 かいわ — la conversation
  "ji": ["character, handwriting", "das Schriftzeichen, die Handschrift"], // 字 じ — le caractère, l'écriture
  "kotae": ["answer", "die Antwort"], // 答え こたえ — la réponse
  "setsumei": ["explanation", "die Erklärung"], // 説明 せつめい — l'explication
  "honyaku": ["translation", "die Übersetzung"], // 翻訳 ほんやく — la traduction
  "sugaku": ["mathematics", "die Mathematik"], // 数学 すうがく — les mathématiques
  "kagaku": ["science", "die Wissenschaft"], // 科学 かがく — la science
  "igaku": ["medicine (science)", "die Medizin"], // 医学 いがく — la médecine (science)
  "chiri": ["geography", "die Geografie"], // 地理 ちり — la géographie
  "rekishi": ["history", "die Geschichte"], // 歴史 れきし — l'histoire
  "bungaku": ["literature", "die Literatur"], // 文学 ぶんがく — la littérature
  "shosetsu": ["novel", "der Roman"], // 小説 しょうせつ — le roman
  "manga": ["manga, comic", "der Manga, der Comic"], // 漫画 まんが — le manga, la bande dessinée
  "nikki": ["diary", "das Tagebuch"], // 日記 にっき — le journal intime
  "repoto": ["report, paper", "der Bericht, die Hausarbeit"], // レポート レポート — le rapport, le compte rendu
  "senmon": ["speciality, field", "das Fachgebiet"], // 専門 せんもん — la spécialité
  "kenkyu": ["research", "die Forschung"], // 研究 けんきゅう — la recherche
  "suffixe-gakubu": ["the faculty of…", "die Fakultät für…"], // ～学部 ～がくぶ — la faculté de…
  "nyugaku": ["entering school, university", "der Schuleintritt, die Immatrikulation"], // 入学 にゅうがく — l'entrée à l'école, à l'université
  "sotsugyo": ["graduation", "der Abschluss"], // 卒業 そつぎょう — la fin des études, le diplôme
  "shusseki": ["attendance (at a class, a meeting)", "die Anwesenheit"], // 出席 しゅっせき — la présence (à un cours, une réunion)
  "kisoku": ["rules", "die Regel, die Vorschrift"], // 規則 きそく — le règlement
  "kyoiku": ["education", "die Bildung, die Erziehung"], // 教育 きょういく — l'éducation
  "arubaito": ["part-time job", "der Nebenjob"], // アルバイト アルバイト — le petit boulot
  "pato": ["part-time work", "die Teilzeitarbeit"], // パート パート — le travail à temps partiel
  "kaigi": ["meeting", "die Besprechung"], // 会議 かいぎ — la réunion
  "gijutsu": ["technique, technology", "die Technik, die Technologie"], // 技術 ぎじゅつ — la technique, la technologie
  "keizai": ["economy", "die Wirtschaft"], // 経済 けいざい — l'économie
  "sangyo": ["industry", "die Industrie"], // 産業 さんぎょう — l'industrie
  "kogyo": ["manufacturing industry", "die (verarbeitende) Industrie"], // 工業 こうぎょう — l'industrie (fabrication)
  "seisan": ["production", "die Produktion"], // 生産 せいさん — la production
  "boeki": ["international trade", "der Außenhandel"], // 貿易 ぼうえき — le commerce international
  "yushutsu": ["export", "der Export"], // 輸出 ゆしゅつ — l'exportation
  "yunyu": ["import", "der Import"], // 輸入 ゆにゅう — l'importation
  "suffixe-sei": ["made in… (にほんせい, made in Japan)", "hergestellt in… (にほんせい, made in Japan)"], // ～製 ～せい — fabriqué en… (にほんせい, fait au Japon)
  "seiji": ["politics", "die Politik"], // 政治 せいじ — la politique
  "horitsu": ["law", "das Gesetz"], // 法律 ほうりつ — la loi
  "shakai": ["society", "die Gesellschaft"], // 社会 しゃかい — la société
  "kokusai": ["international", "international"], // 国際 こくさい — international
  "bunka": ["culture", "die Kultur"], // 文化 ぶんか — la culture
  "shukan": ["habit, custom", "die Gewohnheit, der Brauch"], // 習慣 しゅうかん — l'habitude, la coutume
  "senso": ["war", "der Krieg"], // 戦争 せんそう — la guerre
  "hoso": ["broadcast", "die Sendung (Ausstrahlung)"], // 放送 ほうそう — la diffusion (radio, télé)
  "bangumi": ["programme (TV, radio)", "die Sendung"], // 番組 ばんぐみ — l'émission
  "fakkusu": ["fax", "das Fax"], // ファックス ファックス — le fax
  "renraku": ["contact (れんらくする, to get in touch)", "der Kontakt (れんらくする, sich melden)"], // 連絡 れんらく — le contact (れんらくする, contacter)
  "henji": ["reply", "die Antwort"], // 返事 へんじ — la réponse (à un message)
  "shumi": ["hobby", "das Hobby"], // 趣味 しゅみ — le loisir, le passe-temps
  "asobi": ["play, fun", "das Spiel, das Vergnügen"], // 遊び あそび — le jeu, l'amusement
  "tanoshimi": ["pleasure, something to look forward to", "das Vergnügen, die Vorfreude"], // 楽しみ たのしみ — le plaisir, ce qu'on attend avec impatience
  "odori": ["dance", "der Tanz"], // 踊り おどり — la danse
  "omatsuri": ["traditional festival", "das (traditionelle) Fest"], // お祭り おまつり — la fête traditionnelle
  "tenrankai": ["exhibition", "die Ausstellung"], // 展覧会 てんらんかい — l'exposition
  "konsato": ["concert", "das Konzert"], // コンサート コンサート — le concert
  "shiai": ["match", "das Spiel, der Wettkampf"], // 試合 しあい — le match
  "kyoso": ["competition", "der Wettbewerb"], // 競争 きょうそう — la compétition
  "judo": ["judo", "das Judo"], // 柔道 じゅうどう — le judo
  "suiei": ["swimming", "das Schwimmen"], // 水泳 すいえい — la natation
  "tenisu": ["tennis", "das Tennis"], // テニス テニス — le tennis
  "piano": ["piano", "das Klavier"], // ピアノ ピアノ — le piano
  "undo": ["physical exercise (うんどうする, to do sport)", "die Bewegung (うんどうする, Sport treiben)"], // 運動 うんどう — l'exercice physique (うんどうする, faire du sport)
  "yume": ["dream", "der Traum"], // 夢 ゆめ — le rêve
  "kikai": ["opportunity", "die Gelegenheit"], // 機会 きかい — l'occasion
  "keiken": ["experience", "die Erfahrung"], // 経験 けいけん — l'expérience
  "keikaku": ["plan, project", "der Plan, das Projekt"], // 計画 けいかく — le projet, le plan
  "iken": ["opinion", "die Meinung"], // 意見 いけん — l'avis, l'opinion
  "sodan": ["consultation (そうだんする, to ask for advice)", "die Beratung (そうだんする, um Rat fragen)"], // 相談 そうだん — la consultation (そうだんする, demander conseil)
  "shokai": ["introduction (しょうかいする, to introduce)", "die Vorstellung (しょうかいする, vorstellen)"], // 紹介 しょうかい — la présentation (しょうかいする, présenter)
  "shotai": ["invitation", "die Einladung"], // 招待 しょうたい — l'invitation
  "aisatsu": ["greeting (あいさつする, to greet)", "der Gruß (あいさつする, grüßen)"], // 挨拶 あいさつ — la salutation (あいさつする, saluer)
  "orei": ["thanks", "der Dank"], // お礼 おれい — le remerciement
  "oiwai": ["congratulations, celebration", "der Glückwunsch, die Feier"], // お祝い おいわい — la félicitation, la célébration
  "kenka": ["quarrel (けんかする, to quarrel)", "der Streit (けんかする, sich streiten)"], // けんか けんか — la dispute (けんかする, se disputer)
  "shippai": ["failure, mistake", "der Misserfolg, der Fehler"], // 失敗 しっぱい — l'échec, l'erreur
  "kosho": ["breakdown", "die Panne"], // 故障 こしょう — la panne
  "chui": ["attention (ちゅういする, to be careful)", "die Vorsicht (ちゅういする, aufpassen)"], // 注意 ちゅうい — l'attention (ちゅういする, faire attention)
  "riyo": ["use", "die Nutzung"], // 利用 りよう — l'utilisation
  "hantai": ["opposition, the opposite", "der Widerspruch, das Gegenteil"], // 反対 はんたい — l'opposition, le contraire
  "sewa": ["care (せわをする, to look after)", "die Betreuung (せわをする, sich kümmern)"], // 世話 せわ — le soin (せわをする, s'occuper de)
  "enryo": ["reserve, holding back", "die Zurückhaltung"], // 遠慮 えんりょ — la retenue, la réserve
  "shinpai": ["worry (しんぱいする, to worry)", "die Sorge (しんぱいする, sich Sorgen machen)"], // 心配 しんぱい — l'inquiétude (しんぱいする, s'inquiéter)
  "anshin": ["relief, peace of mind", "die Erleichterung, beruhigt sein"], // 安心 あんしん — le soulagement, être rassuré
  "seikatsu": ["daily life", "das (tägliche) Leben"], // 生活 せいかつ — la vie quotidienne
  "yoji": ["something to do, an errand", "die Erledigung, etwas zu tun"], // 用事 ようじ — une chose à faire, une course
  "yo": ["business, something to do", "das Anliegen, etwas zu tun"], // 用 よう — une affaire, une chose à faire
  "kyomi": ["interest (in something)", "das Interesse"], // 興味 きょうみ — l'intérêt (pour quelque chose)
  "utsukushii": ["beautiful", "schön"], // 美しい うつくしい — beau
  "subarashii": ["wonderful, marvellous", "wunderbar, großartig"], // 素晴らしい すばらしい — magnifique, merveilleux
  "sugoi": ["amazing, great", "toll, unglaublich"], // すごい すごい — incroyable, génial
  "ureshii": ["glad, happy", "froh, glücklich"], // 嬉しい うれしい — content, heureux
  "kanashii": ["sad", "traurig"], // 悲しい かなしい — triste
  "sabishii": ["lonely", "einsam"], // 寂しい さびしい — seul, qui se sent seul
  "hazukashii": ["embarrassed, ashamed", "verlegen, beschämt"], // 恥ずかしい はずかしい — gêné, honteux
  "kowai": ["scary, to be afraid", "unheimlich, Angst haben"], // 怖い こわい — effrayant, avoir peur
  "okashii": ["strange; funny", "seltsam; komisch"], // おかしい おかしい — bizarre ; drôle
  "mezurashii": ["rare, unusual", "selten, ungewöhnlich"], // 珍しい めずらしい — rare, inhabituel
  "hidoi": ["terrible, cruel", "schrecklich, grausam"], // ひどい ひどい — terrible, cruel
  "kibishii": ["strict, severe", "streng"], // 厳しい きびしい — sévère, strict
  "tadashii": ["correct, right", "richtig"], // 正しい ただしい — correct, juste
  "komakai": ["fine, detailed; small change", "fein, detailliert; Kleingeld"], // 細かい こまかい — fin, détaillé ; la petite monnaie
  "katai": ["hard, firm", "hart, fest"], // 固い かたい — dur, solide
  "yawarakai": ["soft, tender", "weich, zart"], // 柔らかい やわらかい — mou, tendre
  "fukai": ["deep", "tief"], // 深い ふかい — profond
  "asai": ["shallow", "flach, seicht"], // 浅い あさい — peu profond
  "yoroshii": ["good (polite: よろしいですか, is that all right?)", "gut (höflich: よろしいですか, ist es recht?)"], // よろしい よろしい — bien (poli : よろしいですか, est-ce que ça va ?)
  "katachi": ["shape", "die Form"], // 形 かたち — la forme
  "hitsuyo": ["necessary", "notwendig"], // 必要 ひつよう — nécessaire
  "daiji": ["important, precious", "wichtig, kostbar"], // 大事 だいじ — important, précieux
  "tokubetsu": ["special", "besonders"], // 特別 とくべつ — spécial
  "futsu": ["normal, ordinary", "normal, gewöhnlich"], // 普通 ふつう — normal, ordinaire
  "kantan": ["simple, easy", "einfach"], // 簡単 かんたん — simple, facile
  "fukuzatsu": ["complicated", "kompliziert"], // 複雑 ふくざつ — compliqué
  "anzen": ["safe, safety", "sicher, die Sicherheit"], // 安全 あんぜん — sûr, la sécurité
  "kiken": ["dangerous, danger", "gefährlich, die Gefahr"], // 危険 きけん — dangereux, le danger
  "fuben": ["inconvenient", "unpraktisch"], // 不便 ふべん — pas pratique
  "shinsetsu": ["kind", "freundlich, hilfsbereit"], // 親切 しんせつ — gentil, aimable
  "teinei": ["polite, careful", "höflich, sorgfältig"], // 丁寧 ていねい — poli, soigné
  "nesshin": ["keen, enthusiastic", "eifrig, begeistert"], // 熱心 ねっしん — zélé, passionné
  "majime": ["serious, hard-working", "ernsthaft, fleißig"], // 真面目 まじめ — sérieux, appliqué
  "isshokenmei": ["with all your might", "mit aller Kraft"], // 一生懸命 いっしょうけんめい — de toutes ses forces
  "sakan": ["thriving, popular", "blühend, beliebt"], // 盛ん さかん — florissant, populaire
  "jiyu": ["free, freedom", "frei, die Freiheit"], // 自由 じゆう — libre, la liberté
  "tekito": ["suitable; rough, random", "passend; ungefähr, beliebig"], // 適当 てきとう — convenable ; approximatif, au hasard
  "zannen": ["a pity, regrettable", "schade, bedauerlich"], // 残念 ざんねん — dommage, regrettable
  "muri": ["impossible, unreasonable", "unmöglich, unzumutbar"], // 無理 むり — impossible, déraisonnable
  "dame": ["no good, not allowed, useless", "nicht gut, verboten, zwecklos"], // だめ だめ — pas bien, interdit, inutile
  "jama": ["in the way, disturbing (おじゃまします, excuse me for coming in)", "störend, im Weg (おじゃまします, ich störe kurz)"], // 邪魔 じゃま — gênant, qui dérange (おじゃまします, je me permets d'entrer)
  "shitsurei": ["rude (しつれいします, excuse me)", "unhöflich (しつれいします, entschuldigen Sie)"], // 失礼 しつれい — impoli (しつれいします, excusez-moi)
  "tashika": ["certain; if I remember correctly", "sicher; wenn ich mich recht erinnere"], // 確か たしか — sûr ; si je me souviens bien
  "betsu": ["another, different", "anders, verschieden"], // 別 べつ — autre, différent
  "taipu": ["type, kind", "der Typ, die Art"], // タイプ タイプ — le type, le genre
  "a-2": ["ah!", "ah!"], // あ あ — ah !
  "un": ["yeah (casual)", "ja (locker)"], // うん うん — oui (familier)
  "naruhodo": ["I see, indeed", "ach so, verstehe"], // なるほど なるほど — je vois, en effet
  "mochiron": ["of course", "natürlich"], // もちろん もちろん — bien sûr
  "zehi": ["by all means, without fail", "unbedingt"], // 是非 ぜひ — absolument, sans faute
  "kitto": ["surely", "bestimmt"], // きっと きっと — sûrement
  "kanarazu": ["without fail, always", "auf jeden Fall, immer"], // 必ず かならず — sans faute, toujours
  "kesshite": ["never (with a negative)", "niemals (mit Verneinung)"], // 決して けっして — jamais (avec la négation)
  "zenzen": ["not at all (with a negative)", "überhaupt nicht (mit Verneinung)"], // 全然 ぜんぜん — pas du tout (avec la négation)
  "chittomo": ["not at all (with a negative)", "kein bisschen (mit Verneinung)"], // ちっとも ちっとも — pas du tout (avec la négation)
  "hotondo": ["almost, most", "fast, die meisten"], // ほとんど ほとんど — presque, la plupart
  "taitei": ["usually", "meistens"], // 大抵 たいてい — généralement
  "daitai": ["roughly, generally", "ungefähr, im Allgemeinen"], // 大体 だいたい — à peu près, en général
  "daibu": ["quite a lot, considerably", "ziemlich, erheblich"], // 大分 だいぶ — pas mal, considérablement
  "zuibun": ["very, considerably", "sehr, beträchtlich"], // 随分 ずいぶん — très, considérablement
  "hijoni": ["extremely", "äußerst"], // 非常に ひじょうに — extrêmement
  "tokuni": ["especially", "besonders"], // 特に とくに — surtout, en particulier
  "mottomo": ["the most", "am meisten"], // 最も もっとも — le plus
  "nakanaka": ["quite, rather; hardly (with a negative)", "ziemlich; kaum (mit Verneinung)"], // なかなか なかなか — assez, plutôt ; difficilement (avec la négation)
  "sorehodo": ["to that extent", "so sehr"], // それほど それほど — à ce point
  "sonnani": ["that much, so", "so sehr, so viel"], // そんなに そんなに — tellement, autant
  "sukkari": ["completely", "völlig"], // すっかり すっかり — complètement
  "shikkari": ["firmly, properly", "fest, ordentlich"], // しっかり しっかり — solidement, bien
  "hakkiri": ["clearly", "deutlich"], // はっきり はっきり — clairement
  "dondon": ["more and more, rapidly", "immer mehr, zügig"], // どんどん どんどん — de plus en plus, rapidement
  "yatto": ["at last (after effort)", "endlich (nach Mühe)"], // やっと やっと — enfin (après des efforts)
  "toto": ["finally", "schließlich"], // とうとう とうとう — finalement
  "yahari": ["as expected, after all (also やっぱり)", "wie erwartet, doch (auch やっぱり)"], // やはり やはり — comme prévu, finalement (aussi やっぱり)
  "mazu": ["first", "zuerst"], // まず まず — d'abord
  "dekirudake": ["as much as possible", "so viel wie möglich"], // できるだけ できるだけ — autant que possible
  "narubeku": ["if possible, as far as possible", "möglichst"], // なるべく なるべく — si possible, autant que possible
  "tatoeba": ["for example", "zum Beispiel"], // 例えば たとえば — par exemple
  "moshi": ["if (hypothesis)", "wenn, falls"], // もし もし — si (hypothèse)
  "soreni": ["besides, moreover", "außerdem"], // それに それに — en plus
  "sorede": ["so, that's why", "deshalb, und dann"], // それで それで — alors, c'est pourquoi
  "dakara": ["so, that's why", "also, deshalb"], // だから だから — donc, c'est pour ça
  "suruto": ["then, thereupon", "da, daraufhin"], // すると すると — alors, à ce moment-là
  "keredomo": ["but, although", "aber, obwohl"], // けれども けれども — mais, bien que
  "mataha": ["or", "oder"], // または または — ou bien
  "ko-2": ["like this", "so, auf diese Weise"], // こう こう — ainsi, comme ceci
  "sonna": ["such a…, like that", "so ein…, so"], // そんな そんな — un tel…, comme ça
  "anna": ["such a… (over there), like that", "so ein… (dort), so"], // あんな あんな — un tel… (là-bas), comme ça
  "koto-2": ["thing, fact", "die Sache, die Tatsache"], // 事 こと — la chose, le fait
  "tsumori": ["intention (～つもりです, I intend to…)", "die Absicht (～つもりです, ich habe vor…)"], // つもり つもり — l'intention (～つもりです, j'ai l'intention de…)
  "hazu": ["should (normally): ～はずです", "sollte eigentlich: ～はずです"], // はず はず — devoir (normalement) : ～はずです
  "bai-2": ["case (～ばあい, in case of…)", "der Fall (～ばあい, im Fall von…)"], // 場合 ばあい — le cas (～ばあい, en cas de…)
  "tame": ["for, because of (～ために)", "für, wegen (～ために)"], // 為 ため — pour, à cause de (～ために)
  "wake": ["reason, meaning", "der Grund, der Sinn"], // 訳 わけ — la raison, le sens
  "riyu": ["reason", "der Grund"], // 理由 りゆう — la raison
  "genin": ["cause", "die Ursache"], // 原因 げんいん — la cause
  "kankei": ["relation, connection", "die Beziehung, der Zusammenhang"], // 関係 かんけい — le rapport, la relation
  "shikata": ["way of doing (しかたがない, it can't be helped)", "die Art und Weise (しかたがない, da kann man nichts machen)"], // 仕方 しかた — la façon de faire (しかたがない, on n'y peut rien)
  "kawari": ["instead of", "anstelle von"], // 代わり かわり — à la place de
  "hodo": ["degree, extent (～ほど, about, as much as)", "das Maß (～ほど, ungefähr, so…wie)"], // 程 ほど — le degré (～ほど, environ, autant que)
  "yo-2": ["way, manner (～ように, so as to…)", "die Art (～ように, damit…)"], // 様 よう — la manière (～ように, de façon à…)
  "suffixe-bakari": ["nothing but…, to have just…", "nur…, gerade erst…"], // ～ばかり ～ばかり — rien que…, venir juste de…
  "okage": ["thanks to (おかげさまで, thanks to you)", "dank (おかげさまで, dank Ihnen)"], // お陰 おかげ — grâce à (おかげさまで, grâce à vous)
  "gozonji": ["to know (honorific: ごぞんじですか, do you know?)", "wissen (ehrend: ごぞんじですか, wissen Sie?)"], // ご存じ ごぞんじ — savoir (honorifique : ごぞんじですか, savez-vous ?)
};

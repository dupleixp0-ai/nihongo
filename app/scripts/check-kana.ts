/** Tests de la saisie au clavier (rōmaji → kana) et de la comparaison des réponses. */
import { readingMatches, romajiToKana } from "../src/lib/kana-input";
import { allSrsItems } from "../src/data/srs-items";

let fails = 0;
const eq = (name: string, got: unknown, want: unknown) => {
  if (got === want) console.log(`✓ ${name}`);
  else { fails++; console.log(`✗ ${name} : obtenu « ${got} », attendu « ${want} »`); }
};
const final = (s: string) => romajiToKana(s, { final: true });

eq("taberu", final("taberu"), "たべる");
eq("konnichiha", final("konnichiha"), "こんにちは");
eq("konnichiwa (orthographe libre)", final("konnichiwa"), "こんにちわ");
eq("kitte (consonne doublée)", final("kitte"), "きって");
eq("matcha", final("matcha"), "まっちゃ");
eq("kyou", final("kyou"), "きょう");
eq("shashin / syasin", final("shashin") + final("syasin"), "しゃしんしゃしん");
eq("tsu / tu, chi / ti, fu / hu", final("tsuchifu") + final("tutihu"), "つちふつちふ");
eq("jisho / zisyo", final("jisho") + final("zisyo"), "じしょじしょ");
eq("hon'ya", final("hon'ya"), "ほんや");
eq("honya", final("honya"), "ほにゃ");
eq("onna", final("onna"), "おんな");
eq("shinbun (n devant consonne)", final("shinbun"), "しんぶん");
eq("n final à la validation", final("hon"), "ほん");
eq("kaado (katakana)", romajiToKana("ka-do", { katakana: true, final: true }), "カード");
eq("pendant la frappe : « ky » reste en attente", romajiToKana("ky"), "ky");
eq("pendant la frappe : « n » final en attente", romajiToKana("hon"), "ほn");
eq("pendant la frappe : « nn » final en attente", romajiToKana("konn"), "こnn");
eq("frappe progressive : こnn + i", romajiToKana(romajiToKana("konn") + "i"), "こんに");
eq("frappe progressive : こnn + k", romajiToKana(romajiToKana("konn") + "k"), "こんk");
eq("kana déjà convertis conservés", romajiToKana("たべr" + "u"), "たべる");
eq("majuscules (clavier de téléphone)", final("Taberu"), "たべる");

eq("réponse juste", readingMatches("taberu", ["たべる"]), true);
eq("réponse fausse", readingMatches("nomu", ["たべる"]), false);
eq("voyelle longue : toukyou = とうきょう", readingMatches("toukyou", ["とうきょう"]), true);
eq("voyelle longue : tookyoo = とうきょう", readingMatches("tookyoo", ["とうきょう"]), true);
eq("voyelle longue manquante refusée : tokyo", readingMatches("tokyo", ["とうきょう"]), false);
eq("katakana : kaado = カード", readingMatches("kaado", ["カード"]), true);
eq("katakana : ka-do = カード", readingMatches("ka-do", ["カード"]), true);
eq("lecture on en katakana : nichi = ニチ", readingMatches("nichi", ["ニチ"]), true);
eq("okurigana : taberu = た(べる)", readingMatches("taberu", ["た(べる)"]), true);
eq("okurigana : ta = た(べる)", readingMatches("ta", ["た(べる)"]), true);
eq("rōmaji d'un kana : shi = し", readingMatches("shi", ["し"]), true);
eq("rōmaji d'un kana : si = し", readingMatches("si", ["し"]), true);
eq("～ ignoré : ～さん", readingMatches("san", ["～さん"]), true);
eq("réponse vide refusée", readingMatches("  ", ["あ"]), false);

eq("macron : kyō = きょう", readingMatches("kyō", ["きょう"]), true);

// Chaque carte doit accepter son propre rōmaji comme réponse.
const items = allSrsItems().filter((i) => i.answers.length);
const refused = items.filter((i) => !readingMatches(i.reading.romaji, i.answers));
for (const i of refused.slice(0, 20)) console.log(`✗ carte ${i.id} : « ${i.reading.romaji} » refusé pour ${i.answers.join(", ")}`);
fails += refused.length;
console.log(`${items.length - refused.length}/${items.length} cartes acceptent leur propre rōmaji.`);

if (fails) {
  console.log(`\n${fails} test(s) de saisie en échec.`);
  process.exit(1);
}
console.log("\nTests de la saisie au clavier réussis.");

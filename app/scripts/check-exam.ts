/** Tests de l'examen blanc : pièges de lecture, fausses écritures, particules, estimation. */
import { estimate, particleDistractors, readingDistractors, readingVariants, spellingDistractors } from "../src/lib/exam";
import { vocab } from "../src/data/vocab";

let fails = 0;
const ok = (name: string, cond: boolean, detail = "") => {
  if (cond) console.log(`✓ ${name}`);
  else { fails++; console.log(`✗ ${name} ${detail}`); }
};
// Hasard reproductible.
let seed = 42;
const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const v = readingVariants("びょういん");
ok("びょういん → びよういん (petit ょ)", v.includes("びよういん"), v.join(" "));
ok("びょういん → びょいん (voyelle longue en moins)", v.includes("びょいん"), v.join(" "));
ok("びょういん → ひょういん (son non voisé)", v.includes("ひょういん"), v.join(" "));
ok("きって → きて (っ en moins)", readingVariants("きって").includes("きて"));
ok("がっこう → かっこう (son voisé)", readingVariants("がっこう").includes("かっこう"));
ok("せんせい → せんせ (voyelle longue en moins)", readingVariants("せんせい").includes("せんせ"));
ok("jamais la bonne réponse parmi les pièges", !readingVariants("とけい").includes("とけい"));

// Tous les mots N5 avec kanji : trois mauvaises lectures, différentes et différentes de la bonne.
const n5 = vocab.filter((w) => w.level === "N5" && w.jp !== w.kana);
const readings = n5.map((w) => w.kana);
let bad = 0;
for (const w of n5) {
  const d = readingDistractors(w.kana, readings, rng);
  if (d.length !== 3 || new Set(d).size !== 3 || d.includes(w.kana)) bad++;
}
ok(`${n5.length} mots N5 : 3 mauvaises lectures distinctes pour chacun`, bad === 0, `${bad} en échec`);

const looks = [["日", "目", "白"], ["木", "本", "休"]];
const sp = spellingDistractors("日本", looks, ["山", "川", "田"], rng);
ok("日本 : 3 fausses écritures, sans la vraie", sp.length === 3 && !sp.includes("日本") && new Set(sp).size === 3, sp.join(" "));
ok("日本 : un sosie proposé (目本, 白本, 日木 ou 日休)", sp.some((s) => ["目本", "白本", "日木", "日休"].includes(s)), sp.join(" "));

for (const p of ["は", "に", "を", "で"]) {
  const d = particleDistractors(p, rng);
  ok(`particule ${p} : 3 fausses, sans ${p}`, d.length === 3 && !d.includes(p));
}
ok("は : が et も jamais proposés", [...Array(30)].every(() => !particleDistractors("は", rng).some((x) => x === "が" || x === "も")));
ok("は : と jamais proposé (おばあさんと… serait juste aussi)", [...Array(30)].every(() => !particleDistractors("は", rng).includes("と")));
ok("まで : から jamais proposé", [...Array(30)].every(() => !particleDistractors("まで", rng).includes("から")));
ok("に : へ jamais proposé", [...Array(30)].every(() => !particleDistractors("に", rng).includes("へ")));

const pass = estimate([{ section: "vocabulaire", score: 10, total: 13 }, { section: "grammaire", score: 6, total: 8 }, { section: "lecture", score: 3, total: 4 }, { section: "ecoute", score: 4, total: 6 }]);
ok("bon résultat : réussi", pass.passed && pass.outOf === 180, JSON.stringify(pass));
const failListening = estimate([{ section: "vocabulaire", score: 13, total: 13 }, { section: "grammaire", score: 8, total: 8 }, { section: "lecture", score: 4, total: 4 }, { section: "ecoute", score: 1, total: 6 }]);
ok("écoute sous le minimum : échoué malgré le reste", !failListening.passed, JSON.stringify(failListening));
const noVoice = estimate([{ section: "vocabulaire", score: 9, total: 13 }, { section: "grammaire", score: 5, total: 8 }, { section: "lecture", score: 3, total: 4 }]);
ok("sans écoute : sur 120", noVoice.outOf === 120 && noVoice.passed);

if (fails) {
  console.log(`\n${fails} test(s) de l'examen en échec.`);
  process.exit(1);
}
console.log("\nTests de l'examen blanc réussis.");

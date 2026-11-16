import assert from "node:assert/strict";
import { dialogues } from "../src/data/dialogues";
import { kanaToHepburn, sentenceRomaji } from "../src/lib/romaji";

/** Contrôles des dialogues : npm run check:dialogue */
const KANA = /^[ぁ-んァ-ヶー。、！？…\s_]+$/;
const KANJI = /[一-鿿々]/;
const strip = (s: string) => s.replace(/[\s_]/g, "");
let n = 0;
const test = (name: string, fn: () => void) => { fn(); n++; console.log("✓", name); };

for (const d of dialogues) {
  test(`${d.slug} : slug unique, tours alternés`, () => {
    assert.equal(dialogues.filter((x) => x.slug === d.slug).length, 1);
    assert.equal(d.turns[0].kind, "say");
    d.turns.forEach((t, i) => { if (t.kind === "reply") assert.equal(d.turns[i - 1].kind, "say", `réponse ${i} sans question`); });
  });
  test(`${d.slug} : une seule bonne réponse, les autres expliquées`, () => {
    for (const t of d.turns) if (t.kind === "reply") {
      assert.ok(t.choices.length >= 2 && t.choices.length <= 4);
      assert.equal(t.choices.filter((c) => c.ok).length, 1, t.prompt);
      for (const c of t.choices) if (!c.ok) assert.ok(c.why && c.why.length > 10, `${c.jp} : pas d'explication`);
    }
  });
  test(`${d.slug} : la bonne réponse n'est pas toujours à la même place`, () => {
    const pos = d.turns.flatMap((t) => (t.kind === "reply" ? [t.choices.findIndex((c) => c.ok)] : []));
    assert.ok(new Set(pos).size >= 2, `positions : ${pos}`);
  });
  test(`${d.slug} : lectures en kana cohérentes avec l'écriture`, () => {
    const lines = d.turns.flatMap((t) => (t.kind === "say" ? [t] : t.choices));
    for (const l of lines) {
      assert.match(l.kana, KANA, `kana invalide : ${l.kana}`);
      assert.ok(!KANJI.test(l.kana), `kanji dans le kana : ${l.kana}`);
      if (!KANJI.test(l.jp)) assert.equal(strip(l.jp), strip(l.kana), `jp ≠ kana : ${l.jp}`);
      assert.ok(kanaToHepburn(l.kana).length > 0);
      for (const w of l.words ?? []) { assert.match(w.kana, KANA); if (!KANJI.test(w.jp)) assert.equal(w.jp, w.kana); }
    }
  });
  test(`${d.slug} : chaque mot expliqué se trouve dans sa phrase`, () => {
    const lines = d.turns.flatMap((t) => (t.kind === "say" ? [t] : t.choices));
    for (const l of lines) for (const w of l.words ?? []) assert.ok(strip(l.jp).includes(strip(w.jp)), `« ${w.jp} » absent de « ${l.jp} »`);
  });
}
console.log(`\n${n} contrôles des dialogues réussis.`);
if (process.argv.includes("--show")) for (const d of dialogues) for (const t of d.turns) for (const l of t.kind === "say" ? [t] : t.choices) console.log(sentenceRomaji(l.kana, d.partnerKana ? [d.partnerKana] : []), "←", l.jp);

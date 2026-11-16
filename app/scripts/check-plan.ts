import assert from "node:assert/strict";
import { PLAN } from "../src/data/plan";
import { computePlan, markStep } from "../src/lib/plan";
import { DEFAULT_SETTINGS, EMPTY_PROGRESS, type StoredCard } from "../src/lib/db/types";
import { allSrsItems } from "../src/data/srs-items";
import { getGrammar } from "../src/data/grammar";
import { getReading } from "../src/data/readings";
import { getDialogue } from "../src/data/dialogues";

/** Tests du parcours guidé : npm run check:plan */
const NOW = Date.now();
let n = 0;
const test = (name: string, fn: () => void) => { fn(); n++; console.log("✓", name); };
const data = (seen: string[] = [], settings = DEFAULT_SETTINGS, cards: StoredCard[] = []) => ({ progress: { ...EMPTY_PROGRESS, seen: Object.fromEntries(seen.map((s) => [s, 1])) }, cards, settings });
const card = (id: string, o: Partial<StoredCard> = {}): StoredCard => ({ id, added: 0, due: NOW - 1, stability: 1, difficulty: 5, elapsed_days: 0, scheduled_days: 1, learning_steps: 0, reps: 2, lapses: 0, state: 2, last_review: NOW, ...o });

test("identifiants d'étape uniques", () => assert.equal(new Set(PLAN.map((s) => s.id)).size, PLAN.length));
test("chaque élément d'étude existe dans l'appli", () => {
  const items = new Set(allSrsItems().map((i) => i.id));
  for (const s of PLAN) for (const id of s.ids) {
    const ok = id.startsWith("/grammaire/") ? getGrammar(id.slice(11)) : id.startsWith("/lecture/") ? getReading(id.slice(9)) : id.startsWith("/dialogue/") ? getDialogue(id.slice(10)) : items.has(id);
    assert.ok(ok, `${s.id} : « ${id} » n'existe pas`);
  }
});
test("chaque étape d'étude a des éléments", () => { for (const s of PLAN.filter((p) => p.kind === "study")) assert.ok(s.ids.length > 0, s.id); });
test("chaque étape de révision couvre des étapes existantes", () => { for (const s of PLAN.filter((p) => p.kind === "review")) assert.ok(s.covers!.length > 0 && s.covers!.every((c) => PLAN.some((p) => p.id === c))); });
test("débutant : la première étape est en cours", () => {
  const p = computePlan(PLAN, data(), NOW);
  assert.equal(p.current?.step.id, "hiragana-base");
  assert.equal(p.percent, 0);
});
test("leçons ouvertes : l'étape se termine et la suivante commence", () => {
  const p = computePlan(PLAN, data(PLAN[0].ids), NOW);
  assert.equal(p.steps[0].state, "done");
  assert.equal(p.current?.step.id, "hiragana-plus");
});
test("80 % suffisent, 70 % non", () => {
  const ids = PLAN[0].ids;
  assert.equal(computePlan(PLAN, data(ids.slice(0, Math.ceil(ids.length * 0.8))), NOW).steps[0].state, "done");
  assert.equal(computePlan(PLAN, data(ids.slice(0, Math.floor(ids.length * 0.7))), NOW).steps[0].state, "current");
});
test("une carte révisée compte comme rencontrée", () => {
  const w = PLAN.find((s) => s.id === "mots-outils")!;
  const cards = w.ids.map((id) => card(id));
  assert.equal(computePlan(PLAN, data(PLAN[0].ids.concat(PLAN[1].ids), DEFAULT_SETTINGS, cards), NOW).steps.find((s) => s.step.id === "mots-outils")!.state, "done");
});
test("passer et rouvrir une étape", () => {
  const s1 = markStep(DEFAULT_SETTINGS, "hiragana-base", "skipped");
  assert.equal(computePlan(PLAN, data([], s1), NOW).steps[0].state, "skipped");
  const s2 = markStep(s1, "hiragana-base", "open");
  assert.equal(computePlan(PLAN, data([], s2), NOW).steps[0].state, "current");
  assert.deepEqual(s2.plan, { done: [], skipped: [] });
});
test("niveau de départ : hiragana connus", () => {
  const p = computePlan(PLAN, data([], { ...DEFAULT_SETTINGS, startLevel: "hiragana" }), NOW);
  assert.equal(p.steps[0].state, "auto");
  assert.equal(p.current?.step.tier, "katakana");
});
test("niveau de départ : N4 → seul le N4 reste", () => {
  const p = computePlan(PLAN, data([], { ...DEFAULT_SETTINGS, startLevel: "n4" }), NOW);
  assert.equal(p.current?.step.id, "kanji-n4");
});
test("révision : cartes dues des étapes couvertes", () => {
  const rev = PLAN.find((s) => s.kind === "review")!;
  const first = PLAN.find((s) => s.id === rev.covers![0])!;
  const p = computePlan(PLAN, data(PLAN.flatMap((s) => s.ids).filter((x) => first.ids.includes(x)), DEFAULT_SETTINGS, [card(first.ids[0])]), NOW);
  assert.equal(p.steps.find((s) => s.step.id === rev.id)!.due, 1);
});
test("une révision doit être terminée à la main", () => {
  const all = PLAN.filter((s) => s.kind === "study" && s.id !== "kanji-n4").flatMap((s) => s.ids);
  const p = computePlan(PLAN, data(all), NOW);
  assert.equal(p.current?.step.id, "revision-1");
});
console.log(`\n${n} tests du parcours réussis.`);

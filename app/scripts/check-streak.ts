import assert from "node:assert/strict";
import { addPoints, chooseGoal, computeFlame, goalProgress, OMAMORI_MAX, repairOne, settle, shiftDay } from "../src/lib/streak-rules";
import { EMPTY_STREAK, type StreakData } from "../src/lib/db/types";

/** Tests des règles de la flamme : npm run check:streak */

const T = "2026-11-15";
const met = (...offsets: number[]): StreakData => ({
  ...EMPTY_STREAK,
  days: Object.fromEntries(offsets.map((o) => [shiftDay(T, o), { points: 10, met: true }])),
});
let n = 0;
const test = (name: string, fn: () => void) => {
  fn();
  n++;
  console.log("✓", name);
};

test("jamais commencé", () => assert.deepEqual([computeFlame(EMPTY_STREAK, T).status, computeFlame(EMPTY_STREAK, T).count], ["nouvelle", 0]));
test("premier jour", () => assert.equal(computeFlame(met(0), T).count, 1));
test("5 jours jusqu'à hier, rien aujourd'hui", () => {
  const f = computeFlame(met(-5, -4, -3, -2, -1), T);
  assert.equal(f.status, "en-attente");
  assert.equal(f.count, 5);
});
test("6 jours avec aujourd'hui", () => assert.deepEqual([computeFlame(met(-5, -4, -3, -2, -1, 0), T).status, computeFlame(met(-5, -4, -3, -2, -1, 0), T).count], ["allumee", 6]));
test("1 jour manqué : vacille, 1 rattrapage", () => {
  const f = computeFlame(met(-4, -3, -2), T);
  assert.equal(f.status, "vacille");
  assert.deepEqual(f.missed, [shiftDay(T, -1)]);
  assert.equal(f.atStake, 4);
});
test("2 jours manqués : 2 rattrapages, puis la série continue", () => {
  let d = met(-6, -5, -4, -3);
  assert.equal(computeFlame(d, T).missed.length, 2);
  d = repairOne(d, T);
  assert.equal(computeFlame(d, T).status, "vacille");
  assert.equal(computeFlame(d, T).missed.length, 1);
  d = repairOne(d, T);
  const f = computeFlame(d, T);
  assert.equal(f.status, "en-attente");
  assert.equal(f.count, 6);
  d = addPoints(d, T, 10, 10);
  assert.equal(computeFlame(d, T).count, 7);
});
test("3 jours manqués : encore rattrapable", () => assert.equal(computeFlame(met(-5, -4), T).missed.length, 3));
test("4 jours manqués : éteinte, série perdue", () => {
  const f = computeFlame(met(-7, -6, -5), T);
  assert.equal(f.status, "eteinte");
  assert.equal(f.count, 0);
  assert.equal(f.lost, 3);
});
test("éteinte puis on étudie : nouvelle flamme à 1", () => assert.deepEqual([computeFlame(met(-9, -8, 0), T).status, computeFlame(met(-9, -8, 0), T).count], ["allumee", 1]));
test("jour manqué non rattrapé le jour du retour : perdu le lendemain", () => {
  // Manqué le 13, retour le 14 (étudié sans rattraper), on regarde le 15.
  const f = computeFlame(met(-4, -3, -1), T);
  assert.equal(f.status, "en-attente");
  assert.equal(f.count, 1);
});
test("objectif : les points s'additionnent", () => {
  let d = addPoints(EMPTY_STREAK, T, 4, 10);
  assert.equal(computeFlame(d, T).status, "nouvelle");
  d = addPoints(d, T, 6, 10);
  assert.equal(computeFlame(d, T).status, "allumee");
});
test("le record est gardé après extinction", () => {
  let d = met(-20, -19, -18, -17, -16, -15, -14, -13);
  d = addPoints(d, T, 10, 10);
  assert.equal(computeFlame(d, T).best, 8);
  assert.equal(computeFlame(d, T).count, 1);
});
test("rattrapage refusé quand rien n'est à rattraper", () => {
  const d = met(-1);
  assert.equal(repairOne(d, T), d);
});
test("rattrapage refusé quand la flamme est éteinte", () => {
  const d = met(-8);
  assert.equal(repairOne(d, T), d);
});
test("changement d'heure (fin octobre)", () => assert.equal(shiftDay("2026-10-25", 1), "2026-10-26"));

/* Omamori et buts */
const withOmamori = (d: StreakData, omamori: number): StreakData => ({ ...d, omamori });
test("omamori : couvre un jour manqué, sans compter de jour", () => {
  const d = settle(withOmamori(met(-4, -3, -2), 1), T);
  assert.equal(d.omamori, 0);
  assert.deepEqual(d.protected, [shiftDay(T, -1)]);
  const f = computeFlame(d, T);
  assert.equal(f.status, "en-attente");
  assert.equal(f.count, 3);
  assert.equal(d.notices.at(-1)?.kind, "protected");
});
test("omamori : 2 en réserve, 5 jours manqués → 2 couverts, 3 à rattraper", () => {
  const d = settle(withOmamori(met(-6), 2), T);
  assert.equal(d.protected.length, 2);
  const f = computeFlame(d, T);
  assert.equal(f.status, "vacille");
  assert.equal(f.missed.length, 3);
});
test("omamori : pas dépensé si la flamme s'éteint quand même", () => {
  const d = settle(withOmamori(met(-8), 2), T);
  assert.equal(d.omamori, 2);
  assert.equal(computeFlame(d, T).status, "eteinte");
});
test("omamori : rien à couvrir, rien de dépensé", () => {
  const d = withOmamori(met(-2, -1), 2);
  assert.equal(settle(d, T), d);
});
test("but de 7 jours : atteint, 1 omamori, nouveau but à choisir", () => {
  let d = chooseGoal(met(-6, -5, -4, -3, -2, -1), shiftDay(T, -6), 7);
  assert.equal(goalProgress(d, T), 6);
  d = addPoints(d, T, 10, 10);
  assert.equal(d.goal, null);
  assert.equal(d.omamori, 1);
  assert.deepEqual(d.goalsDone, [{ days: 7, at: T }]);
  assert.equal(d.notices.at(-1)?.kind, "goal");
});
test("but : seuls les jours depuis le choix comptent", () => {
  const d = chooseGoal(met(-9, -8, -7, -6, -5, -4, -3, -2, -1), shiftDay(T, -2), 7);
  assert.equal(goalProgress(d, T), 2);
});
test("but : la progression repart si la flamme s'éteint", () => {
  const d = chooseGoal(met(-10, -9, -8, -7), shiftDay(T, -10), 7);
  assert.equal(goalProgress(d, T), 0);
});
test("but de 50 jours : 3 omamori, réserve plafonnée", () => {
  const days = Array.from({ length: 49 }, (_, i) => -49 + i);
  let d = withOmamori(chooseGoal(met(...days), shiftDay(T, -49), 50), 4);
  d = addPoints(d, T, 10, 10);
  assert.equal(d.omamori, OMAMORI_MAX);
});
console.log(`\n${n} tests de la flamme réussis.`);

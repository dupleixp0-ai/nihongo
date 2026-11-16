import assert from "node:assert/strict";
import { computeStats, masteryOf, nextLesson, type StatItem } from "../src/lib/stats";
import { EMPTY_PROGRESS, EMPTY_STREAK, type ReviewEntry, type StoredCard } from "../src/lib/db/types";
import { dayKey, shiftDay } from "../src/lib/streak-rules";

/** Tests des statistiques : npm run check:stats */

const NOW = new Date(2026, 10, 15, 14, 0).getTime();
const DAY = 86_400_000;
const card = (id: string, o: Partial<StoredCard> = {}): StoredCard => ({ id, added: NOW - 30 * DAY, due: NOW + DAY, stability: 5, difficulty: 5, elapsed_days: 1, scheduled_days: 3, learning_steps: 0, reps: 3, lapses: 0, state: 2, last_review: NOW - DAY, ...o });
const rev = (card: string, daysAgo: number, rating: 1 | 2 | 3 | 4 = 3): ReviewEntry => ({ card, at: NOW - daysAgo * DAY, rating, state: 2 });
let n = 0;
const test = (name: string, fn: () => void) => { fn(); n++; console.log("✓", name); };

test("pas de carte : nouveau", () => assert.equal(masteryOf(undefined), "new"));
test("carte sans réponse : nouveau", () => assert.equal(masteryOf(card("a", { reps: 0, state: 0 })), "new"));
test("intervalle de 3 semaines : acquis", () => assert.equal(masteryOf(card("a", { scheduled_days: 21 })), "acquired"));
test("20 jours : en cours", () => assert.equal(masteryOf(card("a", { scheduled_days: 20 })), "learning"));
test("deux oublis : fragile", () => assert.equal(masteryOf(card("a", { lapses: 2 })), "fragile"));
test("réapprentissage : fragile", () => assert.equal(masteryOf(card("a", { state: 3, lapses: 1 })), "fragile"));
test("oublis mais ancrée : acquis", () => assert.equal(masteryOf(card("a", { lapses: 3, scheduled_days: 40 })), "acquired"));

const items: StatItem[] = [
  { id: "/hiragana/a", kind: "hiragana" },
  { id: "/hiragana/i", kind: "hiragana" },
  { id: "/kanji/soleil", kind: "kanji", level: "N5" },
  { id: "/kanji/x", kind: "kanji", level: "N4" },
  { id: "verbe:taberu", kind: "verbe", level: "N5" },
];
const cards = [card("/hiragana/a", { scheduled_days: 30 }), card("/kanji/soleil", { lapses: 2, due: NOW - 1000 }), card("/ancienne", {})];
const reviews = [rev("/hiragana/a", 0, 4), rev("/hiragana/a", 0, 1), rev("/kanji/soleil", 2), rev("/kanji/soleil", 40, 3)];
const streak = { ...EMPTY_STREAK, best: 7, days: { [dayKey(NOW)]: { points: 4, met: false }, [shiftDay(dayKey(NOW), -1)]: { points: 12, met: true } } };
const s = computeStats({ cards, reviews, progress: { ...EMPTY_PROGRESS, seen: { "/hiragana/a": NOW - 3 * DAY } }, streak }, items, NOW);

test("tableau par écriture", () => {
  assert.deepEqual(s.byKind.hiragana, { new: 1, learning: 0, fragile: 0, acquired: 1, total: 2 });
  assert.deepEqual([s.byKind.kanji.fragile, s.byKind.kanji.new, s.byKind.kanji.total], [1, 1, 2]);
});
test("niveaux N5 / N4 (les kana n'en ont pas)", () => {
  assert.equal(s.byLevel.N5.total, 2);
  assert.equal(s.byLevel.N4.total, 1);
  assert.equal(s.byLevel.N5.fragile, 1);
});
test("carte d'un élément disparu : ignorée", () => assert.equal(Object.values(s.byKind).reduce((t, k) => t + k.total, 0), items.length));
test("fragiles", () => assert.deepEqual(s.fragileIds, ["/kanji/soleil"]));
test("14 jours, aujourd'hui en dernier", () => {
  assert.equal(s.days.length, 14);
  assert.equal(s.days[13].key, dayKey(NOW));
  assert.deepEqual([s.days[13].reviews, s.days[13].good], [2, 1]);
  assert.equal(s.days[11].reviews, 1);
});
test("réussite sur 30 jours : la réponse d'il y a 40 jours n'y est pas", () => {
  assert.equal(s.reviews30, 3);
  assert.equal(s.retention30, 67);
});
test("jours actifs et série", () => {
  assert.equal(s.activeDays30, 3); // aujourd'hui, hier (points), il y a 2 jours (réponse)
  assert.equal(s.bestStreak, 7);
  assert.ok(s.streak >= 1);
});
test("à réviser maintenant : seulement les cartes connues", () => assert.equal(s.dueNow, 1));
test("historique vide : tout à zéro", () => {
  const e = computeStats({ cards: [], reviews: [], progress: EMPTY_PROGRESS, streak: EMPTY_STREAK }, items, NOW);
  assert.equal(e.retention30, null);
  assert.equal(e.firstDay, null);
  assert.equal(e.byKind.hiragana.new, 2);
});
test("prochaine leçon", () => {
  assert.equal(nextLesson(["/a", "/b", "/c"], { ...EMPTY_PROGRESS, seen: { "/a": 1 } }), "/b");
  assert.equal(nextLesson(["/a"], { ...EMPTY_PROGRESS, seen: { "/a": 1 } }), null);
});
console.log(`\n${n} tests des statistiques réussis.`);

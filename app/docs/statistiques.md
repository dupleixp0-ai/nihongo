# Statistiques (S46)

Page `/statistiques`, accessible depuis Révisions et Flamme. Tout est calculé sur l'appareil (`src/lib/stats.ts`).

- **Sources** : cartes FSRS (état, intervalle, oublis), historique des réponses (`reviews` : carte, date, note), leçons ouvertes (`progress.seen`), flamme.
  L'historique était déjà assez détaillé : rien de nouveau à enregistrer.
- **Maîtrise d'une carte** : *acquis* = intervalle ≥ 21 jours (même règle que les révisions) ; *fragile* = en réapprentissage ou oubliée ≥ 2 fois (et pas ancrée) ; *en cours* = le reste ; *pas encore révisé* = pas de carte ou aucune réponse.
- **Affichage** : chiffres clés, prochaine étape (révisions dues, sinon prochaine leçon non ouverte), barres par écriture, couverture N5/N4 (niveaux indicatifs), réponses des 14 derniers jours, cartes à renforcer.
- **Tests** : `npm run check` → `scripts/check-stats.ts` (17 cas). Vérifié dans Chromium en fr/en/de avec des données simulées ; pas sur téléphone ni Safari.

# Parcours guidé (S47)

Page `/parcours` + carte « Ton parcours » sur l'accueil. Ordre conseillé en 16 étapes d'étude et 6 révisions, du premier hiragana au N4. Rien n'est verrouillé.

- **Données** : `src/data/plan.ts` (étapes, éléments à rencontrer, seuil). Textes : `messages.plan.steps` (fr/en/de). Logique pure : `src/lib/plan.ts`. Tests : `scripts/check-plan.ts` (13 cas, dont « chaque élément existe dans l'appli »).
- **Étape terminée** quand la part d'éléments rencontrés atteint le seuil (80 % en général) : leçon ouverte (`progress.seen`) ou carte révisée au moins une fois. Les pages de grammaire et de lecture sont désormais notées « vues » à l'ouverture (`MarkSeen`).
- **Révisions** : insérées après trois étapes (et après les hiragana) ; elles montrent les cartes dues des étapes couvertes ; terminées ou passées à la main.
- **Passer / rouvrir** : réglage `settings.plan {done, skipped}` (inclus dans la sauvegarde). Le niveau choisi au départ (hiragana connus, kana connus, N4) marque les étapes concernées comme « déjà connues ».
- **Mots à ajouter** : les étapes de vocabulaire et de verbes proposent d'ajouter leurs cartes aux révisions d'un clic.
- **Limite connue** : le vocabulaire ne contient pas encore les salutations (こんにちは, ありがとう, すみません…) ; elles viendront avec le module dialogue.

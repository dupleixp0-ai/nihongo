# Dialogues (S48)

Pages `/dialogue` et `/dialogue/<scène>`, onglet « Dialogues » dans la navigation (8 entrées : la barre du bas a été resserrée).

- **Format** : `src/data/dialogues.ts`. Une scène = tours alternés : l'autre personne parle (`say`), puis l'apprenant choisit sa réponse (`reply`, 2 à 4 choix, un seul `ok`, les autres avec `why`). Le rōmaji se déduit du `kana` (mots séparés par un espace, particules par « _ ») via `sentenceRomaji` : majuscule en début de phrase, aux mots en katakana et au nom du personnage (`partnerKana`).
- **Affichage** : écriture, kana (si différent) et rōmaji toujours visibles ; traduction masquable, affichée pour les choix une fois la bonne réponse trouvée ; mots de chaque phrase dans un volet ; lecture à voix haute si l'appareil a une voix japonaise.
- **Traductions** : `src/i18n/content/dialogue.ts` (le français est la clé). `npm run check` vérifie qu'aucun texte n'est sans traduction ou orphelin.
- **Contrôles** : `scripts/check-dialogue.ts` (une seule bonne réponse, erreurs expliquées, bonne réponse pas toujours au même rang, kana cohérent avec l'écriture, mots expliqués présents dans la phrase).
- **Progression** : chaque réponse rapporte un point (comme un quiz), la scène terminée est « vue » ; elle compte dans le parcours (étape « Ta première conversation »).
- **Scènes (6, 27 échanges)** : se présenter, saluer, remercier et s'excuser, commander au restaurant, faire un achat, demander son chemin. Rôle fixe : tu joues Ken, qui vient de France et est étudiant. Étape « Les situations de tous les jours » dans le parcours.
- **À relire** : tout le japonais et les traductions EN/DE sont de moi, à faire relire par un locuteur natif.
- **Rōmaji** : こんにちは et こんばんは s'écrivent désormais « konnichiwa » et « konbanwa » partout.

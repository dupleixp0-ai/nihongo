# Modèle économique : gratuit + version complète (achat unique)

## Principe
- L'appli se télécharge gratuitement. Environ 13 % du contenu (238 unités sur 1 843) est ouvert ; le reste est visible (cadenas) mais ne s'ouvre pas avant l'achat unique `nihongo_full`. Pas d'abonnement, pas de publicité.
- Une unité = une leçon de kana ou de kanji, un mot, un verbe, un point de grammaire, un texte, un dialogue ; l'examen compte pour une. `npm run check` exige 10 à 15 % de gratuit.

## Gratuit
Tous les hiragana (110), les katakana de base (46), les kanji des nombres (14), 40 mots (couleurs + 27 premiers nombres/compteurs), 20 verbes, 4 points de grammaire (structure de la phrase, は, です, ます), 2 lectures (Momotarō, Premier jour), 2 dialogues (se présenter, saluer). Restent gratuits : flamme, statistiques, parcours, révisions des éléments gratuits, réglages, sauvegarde.

## Écoute et révision express
- **Écoute** : 2 exercices sur 6 sont gratuits (« Quel mot ? » et « Quel son ? », avec les leçons gratuites) ; « Que signifie-t-il ? », « Écouter et écrire », « Verbes à l'oreille » et « Répète après moi » demandent la version complète.
- **Révision express (5 minutes)** : gratuite ; elle mélange tous les exercices (kana, kanji, mots, verbes, sosies, écoute) mais ne puise que dans les leçons ouvertes. Un type d'exercice avec moins de 4 éléments ouverts est laissé de côté.
- Règle : chaque module garde au moins 2 leçons gratuites (katakana 46, kanji 14, mots 40, verbes 20, grammaire 4, lectures 2, dialogues 2). L'examen blanc, qui est une seule unité, reste réservé.

## Réservé à la version complète
Katakana étendus, tous les autres kanji N5 et N4, le reste du vocabulaire et des verbes, la grammaire restante, les autres lectures et dialogues, l'examen blanc N5.

Pourquoi ce choix : un débutant peut apprendre à lire tout le hiragana, goûter aux katakana, aux kanji, aux mots, aux verbes, à la grammaire, à la lecture et au dialogue ; la valeur payante est la suite (volume + examen).

## Comportement
- Page verrouillée : aperçu (caractère, titre) + offre d'achat ; le contenu n'est pas monté, donc ni progression ni cartes de révision ajoutées (garde-fous aussi dans `markSeen` et `addCards`).
- Listes : cadenas sur les éléments verrouillés ; quiz, « ajouter aux révisions » et lecture audio limités aux éléments ouverts.
- Réglages > Version complète : statut, achat, « Restaurer mon achat » (exigé par Apple).
- L'accès est gardé dans le localStorage de l'appareil, hors sauvegarde.

## Limites à connaître
- Appli entièrement locale : le verrou est un verrou d'achat, pas une protection anti-copie. Un utilisateur technique pourrait contourner (le contenu est dans l'appli). La seule vraie validation est celle de la boutique.
- **Rien n'est encore branché à Google Play / App Store.** Le pont natif `window.NihongoBilling` (prix, achat, restauration) est défini dans `src/lib/billing/index.ts` mais sera fourni à l'étape Capacitor (plugin d'achats intégrés). Jamais testé avec une vraie boutique.
- Modes (variable `NEXT_PUBLIC_BILLING_MODE`) : `test` (défaut, GitHub Pages et développement : le bouton simule l'achat) ; `store` (versions publiées : achat uniquement via le pont natif). `RELEASE=1 npm run check` échoue si le mode n'est pas `store`.
- Prix : à fixer dans les consoles des boutiques (l'appli affiche le prix local renvoyé par la boutique). Commissions et programmes pour petits éditeurs : à vérifier à l'ouverture des comptes.
- Changer la part gratuite : modifier `scripts/access-derive.ts`, lancer `npm run access`, puis `npm run check`.

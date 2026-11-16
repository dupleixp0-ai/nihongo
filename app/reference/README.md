# Données de référence

Utilisées uniquement par `npm run check` (scripts/check-data.ts), jamais par l'application.

- `kanjidic-subset.json` : lectures, nombre de traits et niveau JLPT des kanji, extraits de KANJIDIC2
  (© Electronic Dictionary Research and Development Group, licence CC BY-SA 4.0,
  https://www.edrdg.org/edrdg/licence.html) via le projet kanji-data de David Gouveia (MIT).
- `jlpt-vocab.json` : vocabulaire JLPT N5 à N1, projet open-anki-jlpt-decks de Jamie Sinclair (MIT).
- `exceptions.json` : écarts vérifiés à la main et acceptés, avec la raison.

La vérification utilise aussi l'analyseur kuromoji (dictionnaire IPADIC, Apache 2.0).
Les listes JLPT ne sont plus officielles depuis 2010 : les niveaux sont ceux des listes usuelles.

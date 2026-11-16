# Nihongo

Application pour apprendre à lire et écrire le japonais : hiragana, katakana, kanji N5 et N4,
grammaire, verbes, lecture et révisions espacées.

L'appli fonctionne entièrement sur l'appareil : pas de serveur de données, pas de compte.
La progression et les cartes de révision sont gardées dans le navigateur (IndexedDB),
derrière l'interface `src/lib/db` qui pourra passer à SQLite dans l'appli native.

## Prérequis
- Node.js 22 ou plus récent

## Lancer
```bash
npm install
npm run dev            # http://localhost:3000 (développement)
npm run build          # version publiée, statique, dans out/ (avec le mode hors ligne)
npm run preview        # sert out/ sur http://localhost:3000 et le Wi-Fi local
npm run telephone      # build puis preview
```

## Commandes de contrôle
- `npm run check` : vérifie les données (lectures, rōmaji, niveaux JLPT…) et lance les tests de la flamme et de la sauvegarde Drive ; lancé aussi avant chaque build
- `npm run lint`
- `npm run build`

## Organisation
- `src/data/` : contenu (kana, kanji, verbes, grammaire, textes)
- `src/lib/db/` : stockage local (types, IndexedDB, repli en mémoire)
- `src/lib/store.ts` : état de l'utilisateur en mémoire, synchronisé avec le stockage
- `src/lib/srs.ts` : répétition espacée (FSRS, bibliothèque ts-fsrs)

## Publication et hors ligne
L'appli est exportée en site statique (`out/`), sans serveur. `scripts/build-sw.mjs` ajoute un service worker
qui enregistre toute l'appli sur l'appareil au premier passage. Publication sur GitHub Pages :
`docs/publication-github-pages.md` (flux `.github/workflows/pages.yml` à la racine du dépôt).

## Sauvegarde en ligne
Google Drive (navigateur) demande un identifiant d'appli Google dans `.env.local`
(`NEXT_PUBLIC_GOOGLE_CLIENT_ID`) ; iCloud passe par un module natif à ajouter avec l'appli iOS.
Tout est expliqué dans `docs/sauvegarde-cloud.md`.

## Licences des données
- Ordre et tracé des traits : [KanjiVG](https://kanjivg.tagaini.net), © Ulrich Apel,
  licence CC BY-SA 3.0 (attribution obligatoire, partage à l'identique pour les
  données modifiées). Voir `src/data/strokes/`.
- Algorithme de révision : [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs), licence MIT.

# Traduction de l'interface (FR / EN / DE)

- Langue au démarrage : celle de l'appareil (français, allemand, sinon anglais), puis le choix fait dans
  la présentation de départ ou dans Réglages → Langue (gardé dans le navigateur, clé `lang`).
- Textes : `src/i18n/messages/fr.ts` (référence), `en.ts`, `de.ts`. Les trois fichiers ont la même forme :
  la compilation échoue s'il manque une traduction.
- Affichage : `<T m={(m) => m.nav.kanji} />` écrit le texte dans les trois langues et la feuille de style
  n'affiche que la langue choisie (pas de copie du site par langue : la version hors ligne reste légère).
  Pour un attribut (aria-label, placeholder) ou un message calculé : `useMessages()`.
- Vérification : `npm run check` lance `scripts/check-i18n.ts` (texte vide, phrase française oubliée).

## Déjà traduit (739 textes) : toute l'interface
- Vague 1 : en-tête et navigation, accueil, présentation de départ, réglages, bouton « Ajouter aux révisions ».
- Vague 2 : révisions et saisie au clavier, quiz et écoute, flamme (rattrapage, calendrier, buts, omamori,
  sceaux, bilan de la semaine, annonces), textes des notifications de rappel, examen blanc (interface).
- Vague 3 : pages de leçons (kana, kanji : titres, tracé, ordre des traits, encadrés « Ne pas confondre »
  et « Se lit aussi »), onglets et titres des sections et des thèmes, listes de vocabulaire et de verbes,
  pages Grammaire et Lecture (cadre, lecteur, analyse), noms des rôles dans les schémas de phrase, titres
  d'onglet du navigateur (composant `DocTitle`, la page statique garde le titre français).

## Contenu déjà traduit : les leçons de kana (235 leçons, 668 mots)
- Fichiers : `src/i18n/kana/en.ts` et `de.ts` (le français reste dans `src/data/`). Affichage avec `<L>`
  (même principe que `<T>`) et `localizeKana()` dans `src/i18n/kana/index.ts`.
- Prononciation : rangée par son (`pron.ka`), commune aux hiragana et aux katakana ; `pronScript` pour
  les rares cas propres aux katakana (ヂ, ッ, ー…). Les combinaisons (kya, sho…) ont une règle (`yoonPron`).
- Histoires : le dessin est le même dans les trois langues ; seule la phrase qui relie l'image au son
  change quand le mot français ne marche pas (« quai » → « kelp » / « Kescher »…).
- Leçons construites (dakuten, combinaisons, katakana étendus) : une phrase modèle par langue
  (`dakuten`, `yoon`, `extended`), à partir du champ `origin` des leçons.
- Contrôle : `npm run check` vérifie que chaque leçon a sa prononciation, son histoire, sa légende et
  le sens de chaque mot en anglais et en allemand.

## Contenu déjà traduit : les sens (247 kanji, 488 mots des kanji, 1 063 mots, 255 verbes)
- Fichiers : `src/i18n/meanings/kanji.ts`, `vocab.ts`, `verbs.ts`. Une ligne par élément, avec le japonais
  et le français en commentaire : c'est là qu'on relit et corrige. Les verbes ont aussi leur phrase d'exemple.
- Les données reçoivent leur traduction au chargement (`meaningTr`, `tr`) ; l'affichage passe par `<L>`,
  et les quiz, l'examen blanc et les révisions choisissent la langue au moment où ils démarrent.
- La recherche du vocabulaire et des verbes cherche aussi dans les sens anglais et allemands.
- Contrôle : `npm run check` signale un élément sans traduction ou une traduction qui ne correspond plus à rien
  (identifiant changé).

## Contenu déjà traduit : grammaire, lectures, examen, kanji (1 344 textes, 83 phrases allemandes)
- Fichiers : `src/i18n/content/grammar.ts`, `reading.ts`, `exam.ts`, `kanji.ts` (histoires, légendes, encadrés « sosies » et « se lit aussi »). Une ligne par texte : le français est la clé,
  suivi de l'anglais et de l'allemand. Un même texte (« le village ») sert partout où il apparaît.
- Affichage : `<Tx t={texte} />` (`src/i18n/tx.tsx`) retrouve les trois versions ; sans traduction, le français reste.
  `quote` met les guillemets de chaque langue (« », “ ”, „ “).
- Lectures : les phrases ont déjà leur anglais dans les données ; l'allemand est dans `SENTENCES_DE`
  (clé : le rōmaji de la phrase). L'analyse affiche français, anglais et allemand. Noms des personnages : `speakers.ts`.
- Examen blanc : passages, questions et choix sont traduits au démarrage de l'examen (comme les mots).
- Contrôle : `npm run check` signale un texte sans traduction, une entrée orpheline (le français a changé),
  une traduction vide ou identique, et une phrase sans allemand. Si tu modifies un texte français, la clé
  change : le contrôle te dit quelle ligne mettre à jour.

## Pas encore traduit : le contenu (reste en français pour l'instant)
- Explications des quiz.
- Titres de page dans les résultats de recherche et titres d'onglet des pages de détail (balise `<title>`
  du HTML statique) : français.
- Texte alternatif (aria-label) des illustrations : français.
- Les histoires de kanji citant un son (« Roku comme rock ») ont été réécrites pour l'anglais et l'allemand
  quand le jeu de mots ne passait pas : à faire relire.

## Textes alternatifs des illustrations et titres d'onglet (S45)
- Chaque illustration (`<Scene label="…">`) a sa description en 3 langues dans `src/i18n/content/alt.ts` (clé : le français).
  Le composant `Scene` la rend dans un `<span class="sr-only">` référencé par `aria-labelledby` : le lecteur d'écran lit la langue choisie.
  `npm run check` lit les `<Scene label="…">` dans le code : un libellé sans traduction ou orphelin fait échouer.
- Pages de détail (kanji, grammaire, lecture) : le titre d'onglet est calculé pour chaque langue par la page et appliqué par `DocTitleText`.
- Quiz : sens, consignes et indices viennent déjà des dictionnaires (`meaningTr`, `clueTr`) ; rien de français ne reste (vérifié en allemand).

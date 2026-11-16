# Conformité : licences, données personnelles, publication

État au 16 novembre 2026. Ce document est un état des lieux technique, pas un avis juridique : à faire relire (avocat, ou au minimum un générateur reconnu comme celui d'eRecht24) avant l'ouverture au public.

## 1. Ce qui part dans l'appli, et sous quelle licence

| Élément | Licence | Obligation | État |
|---|---|---|---|
| Code, textes, histoires, illustrations, dialogues | à nous | rien | original (illustrations dessinées en SVG, textes écrits pour l'appli) |
| Tracés des hiragana, katakana, kanji (`src/data/strokes`) | KanjiVG, CC BY-SA 3.0 | citer l'auteur, indiquer les modifications, **republier les données sous la même licence** | crédit en place (leçons, Réglages, page Licences) ; `src/data/strokes/LICENSE.md` ajouté ; **publication du dossier à faire** |
| Polices Klee One, Schibsted Grotesk | SIL OFL 1.1 | garder les mentions de copyright et la licence | page Licences |
| react, react-dom, next, framer-motion, ts-fsrs, tailwind-merge, clsx… | MIT / Apache-2.0 | garder la mention de copyright | page Licences, générée par `npm run notices` |
| KANJIDIC2 (CC BY-SA 4.0), open-anki-jlpt-decks (MIT), kuromoji/IPADIC (Apache-2.0) | — | — | **non inclus dans l'appli** : seulement utilisés par `npm run check` (dossier `reference`). Crédités par courtoisie |
| sharp (LGPL, via Next) et les autres outils de compilation | — | — | non distribués avec l'appli |

Points d'attention :

- **KanjiVG et le « partage dans les mêmes conditions »** : le mainteneur de KanjiVG a répondu en 2016 que le reste d'un projet n'est pas obligé d'adopter la même licence ; seule une modification des données KanjiVG doit rester sous CC BY-SA ([fil de discussion](https://groups.google.com/g/kanjivg/c/XL6diTWQHzQ/m/q3E2v_JXAQAJ)). Nos fichiers reprennent les chemins tels quels, mais en tant que données intégrées à l'appli la prudence veut qu'on les publie sous CC BY-SA. Le fil ne traite pas de l'usage commercial ; CC BY-SA 3.0 l'autorise en principe. **Décision : republier `src/data/strokes` (dépôt public séparé ou dossier avec la licence) et renseigner l'adresse dans `src/data/legal.ts`.** Les règles des boutiques (Apple surtout) n'ont pas été vérifiées sur ce point.
- **« JLPT »** : ne pas l'utiliser comme nom ou logo ; la mention « non affilié » est dans la page Licences. Les niveaux sont indicatifs.
- **Nom « Nihongo »** : mot courant, donc probablement faible comme marque et déjà utilisé par d'autres applis. Non vérifié : recherche dans les registres de marques (DPMA, EUIPO) et dans les deux boutiques avant de lancer.
- Les textes anglais et allemands, et le japonais des dialogues, sont de moi : relecture par un locuteur natif avant publication.

## 2. Données personnelles (RGPD)

Ce que fait l'appli, d'après le code :

- Aucun compte, publicité, mesure d'audience ni appel à un serveur à nous. Tout (progression, cartes, historique, réglages, flamme) est dans IndexedDB ; langue et thème dans le stockage local.
- Seuls appels réseau : la connexion Google (script `accounts.google.com`, API Drive et userinfo), **uniquement si l'utilisateur active la sauvegarde Drive**. Étendue demandée : `drive.appdata` (dossier privé de l'appli) + adresse e-mail.
- iCloud (appli iPhone) : module écrit, jamais testé sur un appareil.
- Voix : synthèse vocale de l'appareil ; certains navigateurs utilisent des voix en ligne, hors de notre contrôle.
- Version web : l'hébergeur reçoit l'adresse IP comme tout serveur web.

Conséquences :

- Pas de bannière de consentement nécessaire : pas de traceur ni de cookie non essentiel.
- Une **politique de confidentialité est quand même obligatoire** : Apple et Google la demandent pour publier, et le RGPD impose d'informer sur les traitements. Brouillon en place : page `/confidentialite` (FR/EN/DE), liée depuis les Réglages. À mettre à jour à chaque nouvelle fonction (surtout si on ajoute un serveur, un achat, une mesure d'audience ou des notifications par serveur).
- Sauvegarde Google : `drive.appdata` est classé « non sensible » par Google ([documentation](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)), donc la vérification de base suffit (écran de consentement, politique de confidentialité). Il faudra un projet Google Cloud **à nous**, avec un identifiant client pour le web et un pour Android (aujourd'hui `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, à créer par toi).
- Fiches des boutiques : « Data Safety » (Google) et « App Privacy » (Apple) : à remplir avec « aucune donnée collectée », sauf si la sauvegarde envoie des données à un tiers choisi par l'utilisateur (à déclarer selon les consignes de chaque boutique, à vérifier au moment de la saisie).
- Enfants : l'appli ne collecte rien ; choisir une classification d'âge basse, sans la placer dans les catégories « familles » qui ajoutent des règles.

## 3. Mentions légales (Impressum) et obligations en Allemagne

D'après eRecht24 ([source](https://www.e-recht24.de/datenschutz/13272-app-veroeffentlichen-rechtliches.html)) : pour une appli proposée en Allemagne, il faut un **Impressum (§ 5 DDG)** accessible en deux clics, y compris hors ligne, et lié dans la boutique ; la **politique de confidentialité** accessible en un clic ; une **information sur le droit de rétractation de 14 jours** pour les ventes aux consommateurs (les boutiques gèrent le paiement, mais le texte de l'appli doit rester cohérent) ; des CGV pas obligatoires.

- Un Impressum affiche **nom et adresse postale joignable** (pas de boîte postale). Si tu ne veux pas publier ton adresse personnelle : adresse professionnelle, service de domiciliation, ou service d'Impressum. À décider avant publication.
- Apple et Google demandent en plus, pour les « professionnels » (traders, règlement européen sur les services numériques), de publier une adresse, un e-mail et un téléphone sur la fiche. Non vérifié en détail : à lire à l'ouverture des comptes.
- **Accessibilité (BFSG)** : depuis juin 2025, les applis et boutiques en ligne pour consommateurs sont en principe concernées ([IHK](https://www.ihk.de/gera/recht-und-steuern/barrierefreiheitsstaerkungsgesetz/produkte-und-dienstleistungen-unter-dem-bfsg-6484782)) ; la page IHK mentionne une exemption pour les micro-entreprises, sans en donner les seuils. À vérifier auprès de l'IHK. Dans tous les cas, l'appli suit déjà de bonnes pratiques (textes alternatifs, navigation clavier, contrastes, mouvement réduit).

## 4. Vendre l'appli en tant que particulier (à vérifier, hors de mon domaine)

Rien de ce qui suit n'a été vérifié ici ; c'est une liste de questions à poser à un conseiller fiscal ou à l'IHK :

- Activité indépendante : déclaration d'activité (Gewerbeanmeldung), mention à l'administration fiscale, régime de la petite entreprise (Kleinunternehmerregelung, § 19 UStG) et seuils en vigueur.
- **Ton contrat de travail chez DB InfraGO** : activité accessoire à déclarer ou à faire autoriser ? À regarder en premier : c'est le point qui peut bloquer tout le reste.
- TVA et paiements : en général la boutique encaisse et reverse (commission de 15 à 30 % selon les cas) ; à confirmer au moment de l'ouverture des comptes.
- Comptes développeur : Apple (abonnement annuel) et Google (frais unique). **Google impose aux comptes personnels créés après le 13 novembre 2023 un test fermé avec au moins 12 testeurs inscrits en continu pendant 14 jours avant la publication** ([aide Google Play](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)) : prévoir deux semaines et douze personnes de confiance.

## Décisions prises (16 novembre 2026)
- Dépôt GitHub **public** (les tracés KanjiVG y sont publiés ; la page Licences renvoie vers `app/src/data/strokes`, adresse calculée par le workflow).
- Impressum : nom, adresse postale et e-mail renseignés dans `src/data/legal.ts` (adresse privée assumée « pour l'instant » ; à remplacer par une adresse professionnelle ou de domiciliation avant un lancement commercial).
- Accord de l'employeur (activité accessoire, DB InfraGO) : obtenu.
- Phase de test : mode `test` (achat simulé), pas d'indexation par les moteurs de recherche.

## 5. À faire avant d'ouvrir au public (dans l'ordre)

1. Décider : dépôt public ou privé ; adresse de l'éditeur pour l'Impressum ; nom de l'appli (recherche de marque).
2. Vérifier le contrat de travail (activité accessoire).
3. Remplir `src/data/legal.ts` (nom, adresse, e-mail, adresse des données de tracé), puis `LEGAL_STRICT=1 npm run check:legal` doit réussir.
4. Publier `src/data/strokes` sous CC BY-SA 3.0.
5. Ajouter une page Impressum (modèle à écrire avec les données de l'étape 3) liée depuis les Réglages.
6. Faire relire la politique de confidentialité et les licences ; faire relire le japonais et les traductions.
7. Ouvrir les comptes développeur (uniquement sur ton feu vert explicite), projet Google Cloud, écran de consentement OAuth.

Commandes utiles : `npm run notices` (régénère la liste des bibliothèques après une mise à jour), `npm run check:legal`.

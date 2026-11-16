# Publier Nihongo sur GitHub Pages

L'appli est un site statique (dossier `app/out/` après `npm run build`) : GitHub Pages l'héberge gratuitement,
en https, et chaque `git push` la met à jour automatiquement (`.github/workflows/pages.yml`).

## 1. Choisir la visibilité du dépôt
- **GitHub Free : seulement avec un dépôt public.** Tout le code et le contenu sont alors lisibles par tous.
- **Dépôt privé : il faut GitHub Pro** (payant) ou un autre hébergeur (Cloudflare Pages, Netlify, Vercel), qui accepte les dépôts privés gratuitement.

Pour une appli vendue plus tard, un dépôt privé est préférable. Le site publié, lui, est de toute façon visible
par qui connaît l'adresse (il n'est pas indexé par Google pendant la phase de test).

## 2. Créer le dépôt et envoyer le code
1. Sur github.com : **New repository**, nom `nihongo` (l'adresse sera `https://<ton-pseudo>.github.io/nihongo/`). Ne coche pas « Add a README ».
2. Dans le Terminal, dans le dossier décompressé `nihongo` (celui qui contient `app/` et `.github/`) :
   ```bash
   git init
   git add .
   git commit -m "Nihongo : première publication"
   git branch -M main
   git remote add origin https://github.com/<ton-pseudo>/nihongo.git
   git push -u origin main
   ```

## 3. Activer Pages
Dépôt → **Settings → Pages → Build and deployment → Source : GitHub Actions**.
Puis onglet **Actions** : le flux « Publier sur GitHub Pages » tourne (3 à 5 minutes). Si le premier essai a démarré
avant l'activation, relance-le (bouton « Re-run all jobs » ou « Run workflow »).

## 4. Sur le téléphone
1. Ouvre `https://<ton-pseudo>.github.io/nihongo/` (Safari sur iPhone, Chrome sur Android).
2. **Sur l'écran d'accueil** : Safari → Partager → « Sur l'écran d'accueil » ; Chrome → menu → « Installer l'application ».
3. **Réglages → Hors ligne** doit indiquer « Prête » au bout d'un moment (environ 13 Mo téléchargés une fois).
4. Essai : mode avion, puis ouvre l'appli et navigue.

## 5. Mettre à jour
Remplace les fichiers, puis `git add . && git commit -m "…" && git push`. L'appli publiée se met à jour en quelques
minutes ; sur le téléphone, un bandeau « Une nouvelle version est installée » propose de recharger.

## Bon à savoir
- **La progression est liée à l'adresse** : celle de `localhost` (Mac) et celle de `github.io` sont séparées.
  Pour la reprendre : Réglages → Exporter sur le Mac, puis Importer sur le site.
- Sur iPhone, Safari peut effacer les données d'un **site** non utilisé pendant plusieurs semaines ; une appli ajoutée
  à l'écran d'accueil est mieux protégée. Fais de temps en temps une sauvegarde (export ou Google Drive).
- Google Drive : ajoute `https://<ton-pseudo>.github.io` aux origines autorisées de l'identifiant Google, et
  l'identifiant dans Settings → Secrets and variables → Actions → **Variables** → `GOOGLE_CLIENT_ID`.

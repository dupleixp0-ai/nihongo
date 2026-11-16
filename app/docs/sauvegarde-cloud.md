# Sauvegarde en ligne (iCloud, Google Drive)

Une sauvegarde par jour de toute la progression (cartes, réponses, flamme, réglages), dans le cloud
**de l'utilisateur** : pas de serveur Nihongo, pas de compte Nihongo. Le fichier
`nihongo-sauvegarde.json` est le même que l'export manuel.

| Appareil | Service | Connexion | État |
| --- | --- | --- | --- |
| iPhone, iPad (appli native) | iCloud, conteneur privé de l'appli | compte Apple déjà connecté, rien à saisir | module natif préparé, à compiler et tester |
| Navigateur (tout appareil) | Google Drive, dossier privé de l'appli (`appDataFolder`) | « Se connecter avec Google » | codé, testé contre un faux serveur Drive ; à tester avec un vrai identifiant Google |
| Android (appli native) | Google Drive | connexion Google native | à brancher à l'étape Capacitor |

Code : `src/lib/cloud/` (choix du service, sauvegarde du jour, restauration),
réglages dans `src/components/settings/settings-page.tsx` (section « Sauvegarde en ligne »).

## Comportement
- Activée dans **Réglages → Sauvegarde en ligne**. La sauvegarde part une fois par jour, à l'ouverture de l'appli
  (vérification chaque minute tant qu'elle est ouverte).
- Navigateur : la connexion Google dure environ une heure. Quand elle a expiré, un bandeau propose
  « Sauvegarder » (un clic, nécessaire pour que le navigateur autorise la fenêtre Google).
- **Restaurer** : relit la sauvegarde du compte et, après confirmation, remplace la progression de l'appareil.
- iCloud et Google Drive ne se parlent pas : un iPhone et une tablette Android n'ont pas la même sauvegarde
  (sauf en utilisant Google Drive des deux côtés).

## Google Drive : identifiant d'appli Google (à faire par toi)
Il faut un projet Google Cloud (gratuit). Je ne le crée pas sans ton accord, car il est lié à ton compte Google.
1. https://console.cloud.google.com → nouveau projet « Nihongo ».
2. « API et services » → activer **Google Drive API**.
3. « Écran de consentement OAuth » : type Externe, nom de l'appli, ton e-mail ; autorisations
   `drive.appdata`, `openid`, `email` (toutes « non sensibles »). En mode test, ajoute ton adresse comme testeur.
4. « Identifiants » → « ID client OAuth » → type **Application Web** ; origines JavaScript autorisées :
   `http://localhost:3000` et `https://<ton-pseudo>.github.io`.
5. En local, dans `app/.env.local` : `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<l'identifiant>.apps.googleusercontent.com`, puis relancer `npm run dev`.
   Pour GitHub Pages : dépôt → Settings → Secrets and variables → Actions → Variables → `GOOGLE_CLIENT_ID`.

Pour une publication, Google demande une vérification de l'écran de consentement (allégée pour ces autorisations).

## iCloud : à l'étape de l'appli iOS (Capacitor)
1. Après `npx cap add ios`, copier `native/ios/NihongoICloudPlugin.swift` dans `ios/App/App/`.
2. Enregistrer le module dans un `ViewController` dérivé de `CAPBridgeViewController` :
   ```swift
   override open func capacitorDidLoad() {
       bridge?.registerPluginInstance(NihongoICloudPlugin())
   }
   ```
   (et l'indiquer comme classe du contrôleur dans `Main.storyboard`).
3. Xcode → cible App → Signing & Capabilities → **iCloud** → cocher **iCloud Documents**, créer le conteneur
   `iCloud.<identifiant de l'appli>`. Demande un compte Apple Developer.
4. Tester : sauvegarder sur un iPhone, réinstaller l'appli (ou un iPad avec le même compte Apple), puis « Restaurer ».

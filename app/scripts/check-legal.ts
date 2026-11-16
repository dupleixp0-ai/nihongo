import { LEGAL } from "../src/data/legal";

/**
 * Contrôle des informations légales avant publication : npm run check:legal
 * Dans `npm run check`, ne fait qu'avertir. Avec LEGAL_STRICT=1 (avant d'ouvrir l'appli au public), échoue s'il manque quelque chose.
 */
const missing: string[] = [];
if (!LEGAL.name.trim()) missing.push("nom de l'éditeur");
if (!LEGAL.address.trim()) missing.push("adresse postale de l'éditeur");
if (!/^\S+@\S+\.\S+$/.test(LEGAL.email)) missing.push("adresse e-mail de contact");
if (!/^https:\/\//.test(LEGAL.strokesSourceUrl)) missing.push("adresse publique des données de tracé (KanjiVG, CC BY-SA 3.0)");
if (!/^\d{4}-\d{2}-\d{2}$/.test(LEGAL.privacyUpdated)) missing.push("date de mise à jour de la confidentialité");

if (!missing.length) console.log("✓ Informations légales complètes.");
else {
  console.log(`⚠ Informations légales à compléter avant publication (src/data/legal.ts) : ${missing.join(" ; ")}.`);
  if (process.env.LEGAL_STRICT === "1") process.exit(1);
}

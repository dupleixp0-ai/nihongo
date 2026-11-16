/**
 * Coordonnées de l'éditeur, à remplir avant toute publication (site web ou boutique d'applications).
 * Nom, adresse et e-mail : décidés par l'éditeur le 16/11/2026 (adresse privée assumée pour la phase de test).
 * Adresse des tracés KanjiVG : calculée à la publication à partir du dépôt GitHub (NEXT_PUBLIC_REPO_URL, fourni par le
 * workflow) ; en local elle reste vide, et `npm run check:legal` le signale seulement.
 */
export const LEGAL = {
  /** Nom de l'éditeur (personne ou entreprise). */
  name: "Dupleix Voufo",
  /** Adresse postale à laquelle on peut le joindre (obligatoire pour les mentions légales en Allemagne). */
  address: "Hergesellstraße 11, 42285 Wuppertal",
  /** Adresse e-mail de contact. */
  email: "dupleixp0@gmail.com",
  /** Où sont publiées les données de tracé adaptées de KanjiVG (licence CC BY-SA 3.0). */
  strokesSourceUrl: process.env.NEXT_PUBLIC_REPO_URL ? `${process.env.NEXT_PUBLIC_REPO_URL}/tree/main/app/src/data/strokes` : "",
  /** Date de la dernière mise à jour de la politique de confidentialité (AAAA-MM-JJ). */
  privacyUpdated: "2026-11-16",
};

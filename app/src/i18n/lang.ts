/**
 * Langue de l'interface : français, anglais ou allemand.
 *
 * Le site est statique et doit marcher hors ligne : au lieu d'une copie du site par langue
 * (trois fois plus lourd), chaque texte est présent dans les trois langues et la feuille de style
 * n'affiche que celui de la langue choisie (attribut data-lang sur <html>, posé avant l'affichage).
 */

export const LANGS = ["fr", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = { fr: "Français", en: "English", de: "Deutsch" };

/** Événement envoyé quand la langue change. */
export const LANG_EVENT = "nihongo-lang";
const KEY = "lang";

/** Script exécuté avant l'affichage : langue choisie, sinon celle de l'appareil (anglais par défaut). */
export const langScript = `(function(){try{var l=localStorage.getItem("${KEY}");if(l!=="fr"&&l!=="en"&&l!=="de"){var n=(navigator.languages&&navigator.languages[0]||navigator.language||"").toLowerCase();l=n.indexOf("fr")===0?"fr":n.indexOf("de")===0?"de":"en";}document.documentElement.dataset.lang=l;document.documentElement.lang=l;}catch(e){}})();`;

/**
 * Règle qui masque les textes des autres langues. Elle est écrite dans la page elle-même (balise <style> du <head>)
 * et non dans la feuille de style externe : ainsi elle s'applique même si le navigateur garde une ancienne feuille.
 */
export const langCss =
  ':root:not([data-lang="en"]):not([data-lang="de"]) [data-l]:not([data-l="fr"]),:root[data-lang="en"] [data-l]:not([data-l="en"]),:root[data-lang="de"] [data-l]:not([data-l="de"]){display:none!important}';

export function currentLang(): Lang {
  if (typeof document === "undefined") return "fr";
  const l = document.documentElement.dataset.lang;
  return l === "en" || l === "de" ? l : "fr";
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* stockage indisponible : le choix vaut pour cette visite */
  }
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang;
  window.dispatchEvent(new Event(LANG_EVENT));
}

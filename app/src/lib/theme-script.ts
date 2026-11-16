/**
 * Ce fichier n'est PAS un module client : le texte du script doit arriver tel quel dans la page
 * générée par le serveur. (Exporté depuis un fichier « use client », il devenait une fonction
 * d'erreur et ne s'exécutait jamais.)
 */
/** Script exécuté avant l'affichage : applique le thème choisi (ou celui de l'appareil) sans flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var a=JSON.parse(localStorage.getItem("appearance")||"{}");if(a.flame)document.documentElement.dataset.flame=a.flame;if(a.ink)document.documentElement.dataset.ink=a.ink;}catch(e){}})();`;

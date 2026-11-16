/** Sous-dossier de publication (ex. « /nihongo » sur GitHub Pages), vide en local. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Préfixe un chemin absolu du site (« /icon.png ») par le sous-dossier de publication. */
export const withBase = (path: string) => (path.startsWith("/") ? `${BASE_PATH}${path}` : path);

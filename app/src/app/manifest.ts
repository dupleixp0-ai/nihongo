import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Manifeste : permet d'installer l'application sur l'écran d'accueil (téléphone, ordinateur). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nihongo · Apprendre le japonais",
    short_name: "Nihongo",
    description: "Hiragana, katakana, kanji N5–N4, grammaire, verbes et lectures, avec une histoire pour chaque caractère.",
    id: `${base}/`,
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    background_color: "#eef1f5",
    theme_color: "#13476e",
    lang: "fr",
    icons: [
      { src: `${base}/brand/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${base}/brand/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${base}/brand/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

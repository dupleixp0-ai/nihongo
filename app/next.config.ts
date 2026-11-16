import type { NextConfig } from "next";

/**
 * Export statique : l'appli entière est générée en fichiers (dossier `out/`), sans serveur.
 * NEXT_PUBLIC_BASE_PATH : sous-dossier de publication (ex. « /nihongo » sur GitHub Pages), vide en local.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

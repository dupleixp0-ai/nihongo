// Génère out/sw.js après `next build` : le service worker qui rend l'appli disponible hors ligne.
// Il met en cache toutes les pages, les scripts, les styles, les polices et les images au premier passage.
// La version dépend du contenu : chaque nouvelle publication installe un nouveau cache et supprime l'ancien.

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath (et non .pathname) : décode les espaces du chemin (« Nihongo App » → pas de « %20 »).
const OUT = fileURLToPath(new URL("../out/", import.meta.url));
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Fichiers mis en cache dès l'installation (les .txt de navigation se mettent en cache à l'usage). */
const KEEP = /\.(html|js|css|woff2|png|svg|ico|webmanifest)$/;
const SKIP = /(^|\/)(sw\.js|_not-found\.html|404\.html|next\.svg|vercel\.svg|file\.svg|globe\.svg|window\.svg)$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(OUT)
  .map((path) => relative(OUT, path).split(sep).join("/"))
  .filter((rel) => KEEP.test(rel) && !SKIP.test(rel))
  .sort();

const hash = createHash("sha256");
let bytes = 0;
for (const rel of files) {
  const data = readFileSync(join(OUT, rel));
  bytes += data.length;
  hash.update(rel).update(data);
}
const version = hash.digest("hex").slice(0, 12);

// Une page « hiragana/a.html » se demande à l'adresse « /hiragana/a » : on garde les deux.
const entries = files.map((rel) => {
  const file = `${BASE}/${rel}`;
  if (!rel.endsWith(".html")) return [file, file];
  const page = rel === "index.html" ? `${BASE}/` : `${BASE}/${rel.replace(/(\/index)?\.html$/, "")}`;
  return [page, file];
});

const sw = `// Généré par scripts/build-sw.mjs — ne pas modifier à la main.
const VERSION = ${JSON.stringify(version)};
const BASE = ${JSON.stringify(BASE)};
const CACHE = "nihongo-" + VERSION;
const RUNTIME = "nihongo-runtime";
const READY = BASE + "/__offline-ready";
const ENTRIES = ${JSON.stringify(entries)};

async function precache() {
  const cache = await caches.open(CACHE);
  let done = 0;
  const queue = [...ENTRIES];
  // Six téléchargements à la fois ; une page manquante ne bloque pas l'installation.
  async function worker() {
    while (queue.length) {
      const [key, file] = queue.shift();
      try {
        if (!(await cache.match(key))) {
          const res = await fetch(file, { cache: "no-cache" });
          if (res.ok) await cache.put(key, res);
        }
      } catch (e) {}
      done++;
      if (done % 40 === 0 || done === ENTRIES.length) {
        const clients = await self.clients.matchAll({ includeUncontrolled: true });
        clients.forEach((c) => c.postMessage({ type: "offline-progress", done, total: ENTRIES.length }));
      }
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  await cache.put(READY, new Response(JSON.stringify({ version: VERSION, at: Date.now(), total: ENTRIES.length })));
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("nihongo-") && k !== CACHE && k !== RUNTIME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function pageKey(url) {
  let path = url.pathname;
  if (path.endsWith(".html")) path = path.slice(0, -5);
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path === BASE || path === "") path = BASE + "/";
  return path;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages : depuis le cache (instantané, hors ligne), sinon le réseau.
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const hit = await cache.match(pageKey(url));
        if (hit) return hit;
        try {
          return await fetch(request);
        } catch (e) {
          return new Response(
            '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
              '<title>Hors ligne · Nihongo</title><body style="font-family:system-ui,sans-serif;background:#eef1f5;color:#17233a;padding:2rem;max-width:32rem;margin:auto">' +
              "<h1>Hors ligne</h1><p>Cette page n'est pas encore enregistrée sur l'appareil. Elle le sera à la prochaine connexion.</p>" +
              '<p><a href="' + BASE + '/" style="color:#2c4a8c">Retour à l’accueil</a></p>',
            { headers: { "Content-Type": "text/html; charset=utf-8" } },
          );
        }
      }),
    );
    return;
  }

  // Données de navigation entre pages (.txt) : réseau d'abord, copie gardée pour le hors ligne.
  if (url.pathname.endsWith(".txt")) {
    event.respondWith(
      fetch(request)
        .then(async (res) => {
          if (res.ok) (await caches.open(RUNTIME)).put(url.pathname, res.clone());
          return res;
        })
        .catch(async () => (await caches.match(url.pathname, { cacheName: RUNTIME })) || Response.error()),
    );
    return;
  }

  // Scripts, styles, polices, images : cache d'abord.
  event.respondWith(
    caches.match(url.pathname, { cacheName: CACHE }).then(
      (hit) =>
        hit ||
        fetch(request).then(async (res) => {
          if (res.ok && url.pathname.startsWith(BASE + "/_next/")) (await caches.open(RUNTIME)).put(url.pathname, res.clone());
          return res;
        }),
    ),
  );
});
`;

writeFileSync(join(OUT, "sw.js"), sw);
// Un service worker invalide ne s'installerait pas, sans erreur visible : on vérifie la syntaxe ici.
new Function(sw);

// Les scripts de démarrage (thème, langue) doivent être dans la page telle quelle, pas remplacés par une erreur.
{
  const home = readFileSync(join(OUT, "index.html"), "utf8");
  const missing = [
    ["thème", "prefers-color-scheme: dark"],
    ["langue", "documentElement.dataset.lang=l"],
  ].filter(([, needle]) => !home.includes(needle));
  if (missing.length || home.includes("Attempted to call")) {
    console.error(`Scripts de démarrage absents de index.html : ${missing.map(([n]) => n).join(", ") || "erreur d'appel client"}.`);
    process.exit(1);
  }
}
console.log(`Service worker : ${entries.length} fichiers (${(bytes / 1e6).toFixed(1)} Mo), version ${version}.`);

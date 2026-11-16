/**
 * Sert la version publiée (dossier out/, sans serveur Node côté appli) sur cet ordinateur et le réseau local.
 * Usage : npm run telephone   (build puis serveur)   ou   npm run preview   (serveur seul, après un build)
 *
 * Le mode hors ligne (service worker) ne marche que sur https ou sur http://localhost :
 * depuis le téléphone en http://192.168…, l'appli marche mais pas en mode avion. Pour ça : GitHub Pages.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "../out");
if (!existsSync(path.join(out, "index.html"))) {
  console.error("Lance d'abord : npm run build");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain; charset=utf-8",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
};

/** Comme GitHub Pages : « /hiragana/a » sert « hiragana/a.html ». */
function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  // « /kanji/un/ » et « /kanji/un » mènent à la même page.
  const trimmed = clean.length > 1 ? clean.replace(/[/\\]+$/, "") : clean;
  const candidates = [trimmed, `${trimmed}.html`, path.join(trimmed, "index.html")];
  for (const c of candidates) {
    const file = path.join(out, c);
    if (file.startsWith(out) && existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  // Version construite pour un sous-dossier (NEXT_PUBLIC_BASE_PATH, ex. GitHub Pages) : on retire le préfixe.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const pathname = base && url.pathname.startsWith(base) ? url.pathname.slice(base.length) || "/" : url.pathname;
  const file = resolve(pathname);
  if (!file) {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    createReadStream(path.join(out, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
    "Cache-Control": file.endsWith("sw.js") ? "no-cache" : "public, max-age=0",
  });
  createReadStream(file).pipe(res);
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, "0.0.0.0", () => {
  const addresses = Object.values(networkInterfaces()).flat().filter((i) => i && i.family === "IPv4" && !i.internal).map((i) => i.address);
  console.log("\n  Nihongo est accessible :");
  console.log(`  · sur cet ordinateur : http://localhost:${port}`);
  for (const a of addresses) console.log(`  · sur ton téléphone (même Wi-Fi) : http://${a}:${port}`);
  console.log("\n  Ctrl + C pour arrêter.\n");
});

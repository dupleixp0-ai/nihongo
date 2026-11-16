/**
 * Mise à l'échelle et déplacement d'un chemin SVG (formats KanjiVG : M m L l H h V v C c S s Q q T t Z z).
 * Les coordonnées absolues sont mises à l'échelle puis déplacées ; les relatives sont seulement mises à l'échelle.
 * Sert à composer les caractères à deux parties (yōon : き + ゃ → きゃ).
 */
const PARAMS: Record<string, ("x" | "y")[]> = {
  M: ["x", "y"], L: ["x", "y"], T: ["x", "y"],
  H: ["x"], V: ["y"],
  C: ["x", "y", "x", "y", "x", "y"],
  S: ["x", "y", "x", "y"], Q: ["x", "y", "x", "y"],
  Z: [],
};

const round = (n: number) => String(Math.round(n * 100) / 100);

export function transformPath(d: string, scale: number, dx: number, dy: number): string {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let out = "";
  let cmd = "";
  let kinds: ("x" | "y")[] = [];
  let k = 0;
  for (const token of tokens) {
    if (/^[a-zA-Z]$/.test(token)) {
      cmd = token;
      kinds = PARAMS[token.toUpperCase()] ?? [];
      k = 0;
      out += token;
      continue;
    }
    const kind = kinds[k % kinds.length];
    const absolute = cmd === cmd.toUpperCase();
    const value = Number(token) * scale + (absolute ? (kind === "x" ? dx : dy) : 0);
    out += (out.endsWith(cmd) || /[a-zA-Z]$/.test(out) ? "" : " ") + round(value);
    k += 1;
  }
  return out;
}

export function transformPaths(paths: string[], scale: number, dx: number, dy: number): string[] {
  return paths.map((p) => transformPath(p, scale, dx, dy));
}

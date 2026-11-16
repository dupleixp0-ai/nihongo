import { INK, Scene, Tube, common } from "./story-illustrations";

/**
 * Illustrations des kanji : un décor simple derrière les traits (viewBox 0 0 109 109),
 * pour relier la forme du kanji à l'histoire.
 */

type Look = { tint: string; color: string; w?: number; decor: React.ReactNode };

const NUMBERS = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];

/** Un petit repère par nombre : barres, carré, chiffre caché, hexagone, compas… derrière les traits du kanji. */
function numberDecor(n: number) {
  /** Pastille en haut à droite : n barres, comme les signes − = ☰. */
  const badge = (count: number) => (
    <g>
      <rect x="86" y="3" width="20" height="20" rx="5" fill="#fff3d6" stroke="#e8a64a" strokeWidth="1.5" />
      {Array.from({ length: count }, (_, i) => (
        <rect key={i} x="90" y={13 - ((count - 1) * 4) / 2 + i * 4 - 1.25} width="12" height="2.5" rx="1.25" fill="#c9852a" />
      ))}
    </g>
  );
  const digit = (ch: string, flip?: boolean) => (
    <text x="54.5" y="88" textAnchor="middle" fontSize="92" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#f0c27a" opacity="0.55" transform={flip ? "translate(109 0) scale(-1 1)" : undefined}>{ch}</text>
  );
  switch (n) {
    case 1:
      return badge(1);
    case 2:
      return badge(2);
    case 3:
      return badge(3);
    case 4:
      return <rect x="18" y="14" width="73" height="73" rx="5" fill="none" stroke="#e8a64a" strokeWidth="3" strokeDasharray="9 5" opacity="0.8" />;
    case 5:
      return digit("5");
    case 6:
      return <polygon points="54.5,10 92,31.5 92,77.5 54.5,99 17,77.5 17,31.5" fill="#fbe0a6" stroke="#e8a64a" strokeWidth="2.5" opacity="0.85" />;
    case 7:
      return digit("7", true);
    case 8:
      return (
        <g stroke="#e8a64a" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.85">
          <circle cx="54.5" cy="14" r="5" fill="#fbe0a6" />
          <path d="M54.5 19 L22 98 M54.5 19 L87 98" />
          <path d="M22 98 q-4 4 -8 0 M87 98 q4 4 8 0" />
        </g>
      );
    case 9:
      return digit("9");
    default:
      return (
        <g stroke="#e8a64a" strokeWidth="5" strokeLinecap="round" opacity="0.7">
          <path d="M22 22 L87 87 M87 22 L22 87" />
        </g>
      );
  }
}

function look(id: string, theme?: string): Look {
  const n = NUMBERS.indexOf(id) + 1;
  if (n > 0) {
    return {
      tint: "#fdf0d5", color: "#a07a52", w: 5,
      decor: numberDecor(n),
    };
  }
  switch (id) {
    case "soleil":
      return { tint: "#ffe9b8", color: "#e8742a", w: 6, decor: (
        <g>
          <g stroke="#f7b733" strokeWidth="3" {...common}>
            {Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return <path key={i} d={`M${54.5 + Math.cos(a) * 44} ${54.5 + Math.sin(a) * 44} L${54.5 + Math.cos(a) * 52} ${54.5 + Math.sin(a) * 52}`} />; })}
          </g>
          <circle cx="54.5" cy="54.5" r="40" fill="#ffd45e" />
        </g>
      ) };
    case "lune":
      return { tint: "#1f2c52", color: "#fff1b8", w: 5, decor: (
        <g>
          <rect width="109" height="109" fill="#1f2c52" />
          <path d="M72 22 a34 34 0 1 0 14 56 a28 28 0 1 1 -14 -56 Z" fill="#f5e6a0" opacity="0.35" />
          <g fill="#fff6c8"><circle cx="16" cy="18" r="1.6" /><circle cx="92" cy="14" r="1.4" /><circle cx="96" cy="90" r="1.8" /><circle cx="14" cy="88" r="1.4" /><circle cx="28" cy="60" r="1.2" /></g>
        </g>
      ) };
    case "feu":
      return { tint: "#ffe3c9", color: "#a8261b", w: 5, decor: (
        <g>
          <path d="M54 8 C72 30 88 40 84 66 C82 88 66 98 54 98 C42 98 26 88 24 66 C22 44 40 34 54 8 Z" fill="#f2733a" stroke={INK} strokeWidth="1.3" />
          <path d="M54 34 C64 50 74 56 70 72 C68 86 60 90 54 90 C48 90 40 86 38 72 C36 58 46 50 54 34 Z" fill="#ffc94d" />
        </g>
      ) };
    case "eau":
      return { tint: "#dff0fb", color: "#1f6fb0", w: 5, decor: (
        <g>
          <path d="M0 78 q13 -8 27 0 t27 0 t27 0 t28 0 V109 H0 Z" fill="#8cc8ec" />
          <path d="M0 90 q13 -8 27 0 t27 0 t27 0 t28 0 V109 H0 Z" fill="#5aa9d8" />
          <path d="M20 20 q4 8 0 12 q-4 -4 0 -12 Z M88 30 q4 8 0 12 q-4 -4 0 -12 Z" fill="#7fc0e8" stroke={INK} strokeWidth="1" />
        </g>
      ) };
    case "arbre":
      return { tint: "#e3f1d8", color: "#6b4a2b", w: 6, decor: (
        <g>
          <path d="M0 94 H109 V112 H0 Z" fill="#bfdca4" />
          <g fill="#6bb35f" stroke={INK} strokeWidth="1"><circle cx="26" cy="36" r="13" /><circle cx="82" cy="36" r="13" /><circle cx="54" cy="20" r="14" /></g>
        </g>
      ) };
    case "or":
      return { tint: "#fff3c4", color: "#b8860b", w: 5, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#e3c9a0" />
          <g fill="#f7cf55" stroke={INK} strokeWidth="1.1"><path d="M14 96 l6 -12 h18 l6 12 Z" /><path d="M64 96 l6 -12 h18 l6 12 Z" /><circle cx="54" cy="90" r="6" /></g>
          <g stroke="#fff" strokeWidth="1.4" {...common}><path d="M22 14 l0 8 M18 18 l8 0 M90 30 l0 6 M87 33 l6 0" /></g>
        </g>
      ) };
    case "terre":
      return { tint: "#f1e4d2", color: "#6b4a2b", w: 6, decor: (
        <g>
          <path d="M0 78 H109 V112 H0 Z" fill="#a8825a" />
          <path d="M0 78 H109 V84 H0 Z" fill="#6b4a2b" />
          <path d="M20 70 q4 -10 10 -2 q-6 6 -10 2 Z M80 70 q4 -10 10 -2 q-6 6 -10 2 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" />
        </g>
      ) };
    case "montagne":
      return { tint: "#e0eaf4", color: "#3f5a7a", w: 6, decor: (
        <g>
          <path d="M0 96 L30 40 L52 70 L74 28 L109 96 Z" fill="#9fb6cc" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M74 28 l-10 18 l6 -4 l4 6 l4 -6 l6 4 Z" fill="#fff" />
          <circle cx="92" cy="16" r="6" fill="#f9d86a" />
        </g>
      ) };
    case "riviere":
      return { tint: "#e2f2e0", color: "#1f6fb0", w: 5, decor: (
        <g>
          <path d="M0 0 H109 V109 H0 Z" fill="#cfe6b8" />
          <path d="M28 0 C20 40 40 70 30 109 H80 C70 70 90 40 82 0 Z" fill="#8cc8ec" />
        </g>
      ) };
    case "personne":
      return { tint: "#fde8d6", color: "#2f4f8f", w: 6, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#e3c9a0" />
          <circle cx="54.5" cy="12" r="8" fill="#f1c9a0" stroke={INK} strokeWidth="1.2" />
        </g>
      ) };
    case "grand":
      return { tint: "#e0eef7", color: "#2f4f8f", w: 6, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#cfe3b0" />
          <circle cx="54.5" cy="14" r="7" fill="#f1c9a0" stroke={INK} strokeWidth="1.2" />
          <path d="M4 30 q8 -10 14 0 q-6 8 -14 0 Z M105 30 q-8 -10 -14 0 q6 8 14 0 Z" fill="#7fc0e8" stroke={INK} strokeWidth="1" />
        </g>
      ) };
    case "petit":
      return { tint: "#fdf0d5", color: "#8d6e4a", w: 5, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#e3c9a0" />
          <g fill="#f7cf55" stroke={INK} strokeWidth="0.8"><circle cx="20" cy="92" r="2" /><circle cx="90" cy="92" r="2" /><circle cx="60" cy="98" r="1.6" /></g>
        </g>
      ) };
    case "milieu":
      return { tint: "#fde8e6", color: "#6b4a2b", w: 5, decor: (
        <g>
          <circle cx="54.5" cy="52" r="40" fill="#fff" stroke="#e5483f" strokeWidth="6" />
          <circle cx="54.5" cy="52" r="26" fill="#fff" stroke="#e5483f" strokeWidth="6" />
          <circle cx="54.5" cy="52" r="10" fill="#e5483f" />
        </g>
      ) };
    case "haut":
      return { tint: "#e0eef7", color: "#2f4f8f", w: 5, decor: (
        <g>
          <path d="M0 92 H109 V112 H0 Z" fill="#cfe3b0" />
          <path d="M60 22 l16 4 l-16 6 Z" fill="#e5483f" stroke={INK} strokeWidth="1" />
          <circle cx="90" cy="14" r="6" fill="#f9d86a" />
        </g>
      ) };
    case "bas":
      return { tint: "#ece4f4", color: "#5a3f7a", w: 5, decor: (
        <g>
          <path d="M0 0 H109 V14 H0 Z" fill="#c9b6dd" />
          <circle cx="58" cy="96" r="6" fill="#8d6e4a" stroke={INK} strokeWidth="1.1" />
        </g>
      ) };
    case "bouche":
      return { tint: "#fde8e6", color: "#b33a3a", w: 6, decor: (
        <g>
          <ellipse cx="54.5" cy="58" rx="34" ry="30" fill="#f8b4b4" />
          <ellipse cx="54.5" cy="66" rx="18" ry="10" fill="#e5483f" opacity="0.6" />
        </g>
      ) };
    case "oeil":
      return { tint: "#e0eef7", color: "#2f4f8f", w: 5, decor: (
        <g>
          <ellipse cx="54.5" cy="54.5" rx="28" ry="48" fill="#fff" stroke={INK} strokeWidth="1.2" />
          <circle cx="54.5" cy="54.5" r="14" fill="#7fb6cb" />
          <circle cx="54.5" cy="54.5" r="6" fill={INK} />
        </g>
      ) };
    case "oreille":
      return { tint: "#fde8d6", color: "#8d4a2b", w: 4.6, decor: (
        <path d="M30 12 C70 2 96 30 84 64 C76 86 60 84 56 100 C50 108 30 104 30 92 Z" fill="#f1c9a0" stroke={INK} strokeWidth="1.2" />
      ) };
    case "main":
      return { tint: "#fde8d6", color: "#8d4a2b", w: 5, decor: (
        <path d="M24 30 C24 14 86 14 86 30 L84 70 C80 88 30 88 26 70 Z" fill="#f1c9a0" stroke={INK} strokeWidth="1.2" />
      ) };
    case "pied":
      return { tint: "#e3f1d8", color: "#2f4f8f", w: 5, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#bfdca4" />
          <g fill="#a07a52" opacity="0.5"><ellipse cx="20" cy="102" rx="7" ry="3" /><ellipse cx="90" cy="102" rx="7" ry="3" /></g>
        </g>
      ) };
    case "femme":
      return { tint: "#fde6ee", color: "#b3366b", w: 5, decor: (
        <g>
          <path d="M0 98 H109 V112 H0 Z" fill="#e8c0d0" />
          <circle cx="54.5" cy="10" r="7" fill="#f1c9a0" stroke={INK} strokeWidth="1.1" />
          <path d="M14 70 q20 10 40 0 q20 10 40 0" stroke="#f06a8a" strokeWidth="2" {...common} />
        </g>
      ) };
    case "homme":
      return { tint: "#e3f1d8", color: "#2f4f8f", w: 4.6, decor: (
        <g>
          <rect x="22" y="8" width="66" height="48" fill="#bfdca4" />
          <g stroke="#6bb35f" strokeWidth="1.6" {...common}><path d="M30 20 v8 M44 20 v8 M66 20 v8 M80 20 v8 M30 40 v8 M44 40 v8 M66 40 v8 M80 40 v8" /></g>
        </g>
      ) };
    case "enfant":
      return { tint: "#fdf0d5", color: "#2f4f8f", w: 5.4, decor: (
        <g>
          <path d="M30 40 C30 20 80 20 80 40 L74 96 C64 104 46 104 36 96 Z" fill="#cde6f7" stroke={INK} strokeWidth="1.1" />
          <circle cx="54.5" cy="14" r="9" fill="#f1c9a0" stroke={INK} strokeWidth="1.1" />
        </g>
      ) };
    case "livre":
      return { tint: "#f4ead8", color: "#6b4a2b", w: 5, decor: (
        <g>
          <path d="M0 98 H109 V112 H0 Z" fill="#bfdca4" />
          <g fill="#6bb35f" stroke={INK} strokeWidth="1"><circle cx="26" cy="30" r="12" /><circle cx="82" cy="30" r="12" /></g>
          <path d="M8 104 h20 v-8 h-20 Z" fill="#e5483f" stroke={INK} strokeWidth="1" />
        </g>
      ) };
    case "vie":
      return { tint: "#e3f1d8", color: "#3f8a45", w: 5, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#a8825a" />
          <path d="M14 22 q10 -12 18 0 q-8 8 -18 0 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" />
          <circle cx="92" cy="16" r="7" fill="#f9d86a" />
        </g>
      ) };
    case "avant":
      return { tint: "#e0eef7", color: "#2f4f8f", w: 5, decor: (
        <g>
          <path d="M0 98 H109 V112 H0 Z" fill="#cfe3b0" />
          <path d="M92 104 l10 0 l-4 -4 M102 104 l-4 4" stroke={INK} strokeWidth="1.4" {...common} />
        </g>
      ) };
    case "etude":
      return { tint: "#fdf0d5", color: "#2f4f8f", w: 4.6, decor: (
        <g>
          <path d="M14 46 L54.5 26 L95 46 V104 H14 Z" fill="#f4dcb8" stroke={INK} strokeWidth="1" />
          <g fill="#ffd45e"><circle cx="34" cy="8" r="5" /><circle cx="54.5" cy="6" r="5" /><circle cx="76" cy="8" r="5" /></g>
        </g>
      ) };
    case "annee":
      return { tint: "#fff3c4", color: "#8d6e4a", w: 5, decor: (
        <g>
          <path d="M0 98 H109 V112 H0 Z" fill="#e3c9a0" />
          <g stroke="#e0b84a" strokeWidth="2" {...common}><path d="M20 30 q-6 -14 4 -22 M30 28 q-2 -14 8 -20 M80 30 q6 -14 -4 -22 M90 30 q8 -12 2 -22" /></g>
        </g>
      ) };
    case "maintenant":
      return { tint: "#ece4f4", color: "#5a3f7a", w: 5, decor: (
        <g>
          <circle cx="54.5" cy="70" r="26" fill="#fff" stroke={INK} strokeWidth="1.2" />
          <path d="M54.5 70 V54 M54.5 70 L66 76" stroke="#c9b6dd" strokeWidth="2.4" {...common} />
        </g>
      ) };
    case "yen":
      return { tint: "#fff3c4", color: "#8d4a2b", w: 5, decor: (
        <g>
          <circle cx="54.5" cy="54.5" r="42" fill="#f7cf55" opacity="0.55" stroke="#e0a82e" strokeWidth="3" />
          <text x="54.5" y="76" textAnchor="middle" fontSize="60" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#e0a82e" opacity="0.6">¥</text>
        </g>
      ) };
    case "cent":
      return { tint: "#fff5ef", color: "#6b4a3a", w: 5, decor: (
        <g>
          <ellipse cx="54.5" cy="55" rx="46" ry="44" fill="none" stroke="#e5483f" strokeWidth="4" strokeLinecap="round" strokeDasharray="250 14" opacity="0.7" transform="rotate(-20 54.5 55)" />
        </g>
      ) };
    case "mille":
      return { tint: "#eef6fb", color: "#2f5f8f", w: 5, decor: (
        <g>
          <rect x="72" y="4" width="34" height="22" rx="6" fill="#fff" stroke="#6aa9d8" strokeWidth="1.6" />
          <text x="89" y="21" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#2f5f8f">1k</text>
        </g>
      ) };
    case "dix-mille":
      return { tint: "#eef6ea", color: "#5a4a2b", w: 5, decor: (
        <g>
          <rect x="6" y="20" width="97" height="62" rx="6" fill="#cfe8c6" stroke="#6aa36a" strokeWidth="2" />
          <rect x="11" y="25" width="87" height="52" rx="4" fill="none" stroke="#6aa36a" strokeWidth="1" strokeDasharray="3 3" />
          <text x="15" y="38" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#4f8a4f">10000</text>
          <text x="54.5" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif" fill="#4f8a4f">10 000 ¥</text>
        </g>
      ) };
    default:
      return themeLook(theme);
  }
}

/** Décors par thème, pour les kanji sans décor propre. */
function themeLook(theme: string | undefined): Look {
  switch (theme) {
    case "argent":
      return { tint: "#fff3c4", color: "#8d6e4a", w: 4.6, decor: (
        <g stroke={INK} strokeWidth="0.9" fill="#f7cf55">
          {[0, 1, 2, 3].map((i) => <ellipse key={`l${i}`} cx="12" cy={100 - i * 4} rx="8" ry="2.6" />)}
          {[0, 1, 2, 3, 4].map((i) => <ellipse key={`r${i}`} cx="97" cy={100 - i * 4} rx="8" ry="2.6" />)}
        </g>
      ) };
    case "horloge":
      return { tint: "#ece4f4", color: "#3a3f8a", w: 4.6, decor: (
        <g>
          <circle cx="54.5" cy="54.5" r="48" fill="#fff" stroke="#c9b6dd" strokeWidth="3" />
          <g stroke="#c9b6dd" strokeWidth="2" {...common}>
            {Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return <path key={i} d={`M${54.5 + Math.cos(a) * 42} ${54.5 + Math.sin(a) * 42} L${54.5 + Math.cos(a) * 46} ${54.5 + Math.sin(a) * 46}`} />; })}
          </g>
        </g>
      ) };
    case "boussole":
      return { tint: "#e0eef7", color: "#2f4f8f", w: 4.6, decor: (
        <g>
          <circle cx="54.5" cy="54.5" r="48" fill="#fff" stroke="#9fb6cc" strokeWidth="2" />
          <path d="M54.5 6 L60 54.5 L54.5 103 L49 54.5 Z" fill="#e5483f" opacity="0.18" />
          <path d="M6 54.5 L54.5 49 L103 54.5 L54.5 60 Z" fill="#2f4f8f" opacity="0.12" />
        </g>
      ) };
    case "objet":
      return { tint: "#f4ead8", color: "#6b4a2b", w: 4.6, decor: <path d="M0 100 H109 V112 H0 Z" fill="#e3c9a0" /> };
    case "ciel":
      return { tint: "#dff0fb", color: "#2f6fa0", w: 4.6, decor: (
        <g>
          <circle cx="92" cy="16" r="8" fill="#f9d86a" />
          <g fill="#fff" opacity="0.9"><ellipse cx="22" cy="90" rx="18" ry="7" /><ellipse cx="80" cy="96" rx="22" ry="7" /></g>
        </g>
      ) };
    case "pluie":
      return { tint: "#dde6ee", color: "#2f4f8f", w: 4.6, decor: (
        <g stroke="#7fb6cb" strokeWidth="1.6" {...common}>
          {[10, 30, 50, 70, 90].map((x, i) => <path key={i} d={`M${x} ${i % 2 ? 98 : 92} l-3 7`} />)}
        </g>
      ) };
    case "train":
      return { tint: "#eef0f2", color: "#b33a3a", w: 4.6, decor: (
        <g>
          <path d="M0 98 H109" stroke="#8d8d8d" strokeWidth="2" />
          <path d="M0 104 H109" stroke="#8d8d8d" strokeWidth="2" />
          <g stroke="#a07a52" strokeWidth="2.4">{[6, 22, 38, 54, 70, 86, 102].map((x) => <path key={x} d={`M${x} 96 v10`} />)}</g>
        </g>
      ) };
    case "batiment":
      return { tint: "#f4ead8", color: "#8d4a2b", w: 4.6, decor: (
        <g>
          <path d="M4 26 L54.5 4 L105 26 Z" fill="#c9503f" opacity="0.25" />
          <path d="M0 102 H109 V112 H0 Z" fill="#d9c0a0" />
        </g>
      ) };
    case "parole":
      return { tint: "#fdf0d5", color: "#2f4f8f", w: 4.6, decor: (
        <path d="M10 10 H99 Q104 10 104 15 V84 Q104 89 99 89 H40 L22 104 L26 89 H10 Q5 89 5 84 V15 Q5 10 10 10 Z" fill="#fff" stroke="#e3c9a0" strokeWidth="2" />
      ) };
    case "personne":
      return { tint: "#fde8d6", color: "#2f4f8f", w: 4.6, decor: (
        <g>
          <path d="M0 100 H109 V112 H0 Z" fill="#e3c9a0" />
          <g fill="#f06a8a" opacity="0.5"><path d="M10 14 c-4 -6 4 -8 4 -2 c0 -6 8 -4 4 2 l-4 4 Z" /><path d="M92 20 c-4 -6 4 -8 4 -2 c0 -6 8 -4 4 2 l-4 4 Z" /></g>
        </g>
      ) };
    case "marche":
      return { tint: "#e3f1d8", color: "#2f4f8f", w: 4.6, decor: (
        <g>
          <path d="M0 109 L40 60 H69 L109 109 Z" fill="#e3c9a0" opacity="0.6" />
          <path d="M0 60 H109" stroke="#bfdca4" strokeWidth="1" />
        </g>
      ) };
    case "livre":
      return { tint: "#f4ead8", color: "#2f4f8f", w: 4.6, decor: (
        <g>
          <path d="M6 12 Q30 6 54.5 14 Q79 6 103 12 V100 Q79 94 54.5 102 Q30 94 6 100 Z" fill="#fff" stroke="#d9c0a0" strokeWidth="1.6" />
          <path d="M54.5 14 V102" stroke="#d9c0a0" strokeWidth="1.2" />
        </g>
      ) };
    case "repas":
      return { tint: "#fdf0d5", color: "#8d4a2b", w: 4.6, decor: (
        <g>
          <path d="M8 76 H101 Q96 106 54.5 106 Q13 106 8 76 Z" fill="#e5483f" opacity="0.25" />
          <g stroke="#a07a52" strokeWidth="2" {...common}><path d="M84 6 L100 40 M92 4 L106 36" /></g>
        </g>
      ) };
    case "nature":
      return { tint: "#e3f1d8", color: "#3f6a2b", w: 4.6, decor: (
        <g>
          <path d="M0 98 H109 V112 H0 Z" fill="#bfdca4" />
          <g fill="#f06a8a" opacity="0.6"><circle cx="12" cy="92" r="3" /><circle cx="98" cy="90" r="3" /><circle cx="86" cy="96" r="2.4" /></g>
        </g>
      ) };
    case "terre":
      return { tint: "#f1e4d2", color: "#6b4a2b", w: 4.6, decor: (
        <g>
          <path d="M0 96 H109 V112 H0 Z" fill="#a8825a" />
          <path d="M0 96 H109 V100 H0 Z" fill="#6b4a2b" />
        </g>
      ) };
    case "ecole":
      return themeLook("batiment");
    case "eau":
      return { tint: "#dff0fb", color: "#1f5f9a", w: 4.6, decor: (
        <g>
          <path d="M0 92 q13 -6 27 0 t27 0 t27 0 t28 0 V109 H0 Z" fill="#8cc8ec" />
          <g fill="none" stroke="#7fc0e8" strokeWidth="1.2"><circle cx="14" cy="20" r="3" /><circle cx="20" cy="10" r="2" /><circle cx="94" cy="30" r="2.6" /></g>
        </g>
      ) };
    default:
      return { tint: "#f4ead8", color: INK, decor: null };
  }
}

export function KanjiIllustration({ id, strokes, label, theme }: { id: string; strokes: string[]; label: string; theme?: string }) {
  const { tint, color, w = 5, decor } = look(id, theme);
  return (
    <Scene label={label} tint={tint}>
      {decor}
      {strokes.map((d, i) => (
        <Tube key={i} d={d} w={w} color={color} />
      ))}
    </Scene>
  );
}

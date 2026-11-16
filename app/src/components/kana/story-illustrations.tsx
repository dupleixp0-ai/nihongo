import { useId } from "react";
import { ctr } from "@/i18n/content";
import { L } from "@/i18n/t";

/**
 * Illustrations de l'histoire mnémotechnique, dessinées autour des traits du caractère.
 * Les traits (données KanjiVG, viewBox 0 0 109 109) servent de corps, de squelette ou d'objet
 * au dessin, pour que l'image et la forme du caractère se retiennent ensemble.
 */

export type StrokesProps = { strokes: string[] };

export const INK = "#17233a";
export const common = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function Scene({ label, tint, children }: { label: string; tint: string; children: React.ReactNode }) {
  const id = useId().replace(/:/g, "");
  // Description lue par les lecteurs d'écran, dans la langue choisie (seule la langue active compte dans le nom accessible).
  const v = ctr(label);
  const translated = v.en !== undefined;
  return (
    <>
      {translated ? <span id={`${id}-label`} className="sr-only"><L v={v} /></span> : null}
      <svg role="img" aria-label={translated ? undefined : label} aria-labelledby={translated ? `${id}-label` : undefined} viewBox="0 0 109 109" className="h-auto w-full">
        <defs>
          <radialGradient id={id} cx="50%" cy="38%" r="80%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor={tint} />
          </radialGradient>
        </defs>
        <rect width="109" height="109" fill={`url(#${id})`} />
        {children}
      </svg>
    </>
  );
}

/** Trait « en tube » : contour, couleur, reflet. */
export function Tube({ d, w, color, edge = INK }: { d: string; w: number; color: string; edge?: string }) {
  return (
    <g {...common}>
      <path d={d} stroke={edge} strokeWidth={w + 2.6} />
      <path d={d} stroke={color} strokeWidth={w} />
      <path d={d} stroke="#ffffff" strokeWidth={Math.max(1, w * 0.28)} opacity="0.5" transform={`translate(${-w * 0.14} ${-w * 0.14})`} />
    </g>
  );
}

export function Eye({ cx, cy, r = 1.6 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={INK} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.35} r={r * 0.35} fill="#ffffff" />
    </g>
  );
}

export function Waves({ y, color, opacity = 1 }: { y: number; color: string; opacity?: number }) {
  return (
    <path
      d={`M-2 ${y} Q7 ${y - 5} 16 ${y} T34 ${y} T52 ${y} T70 ${y} T88 ${y} T106 ${y} T124 ${y} V112 H-2 Z`}
      fill={color}
      opacity={opacity}
    />
  );
}

/* ---------- Rangée a-i-u-e-o ---------- */

export function Anchor({ strokes }: StrokesProps) {
  const [bar, shaft, hook] = strokes;
  return (
    <Scene label="Une ancre : la barre, la tige verticale et le grand crochet courbe, avec sa corde et des vagues" tint="#dbe8f6">
      <Waves y={96} color="#a9c8e8" />
      <Waves y={102} color="#7fb0dd" opacity={0.8} />
      <circle cx="50" cy="11" r="5.5" fill="none" stroke="#51648a" strokeWidth="2.6" />
      <path d="M45 8 C 36 -2, 24 4, 22 14" stroke="#c9a66b" strokeWidth="2.6" {...common} />
      <Tube d={bar} w={6} color="#8ea3c4" />
      <Tube d={shaft} w={6} color="#8ea3c4" />
      <Tube d={hook} w={6} color="#8ea3c4" />
      <circle cx="84" cy="44" r="2.6" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      <circle cx="91" cy="54" r="1.8" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      <circle cx="80" cy="56" r="1.4" fill="none" stroke="#ffffff" strokeWidth="1.2" />
    </Scene>
  );
}

export function Mice({ strokes }: StrokesProps) {
  const [big, small] = strokes;
  return (
    <Scene label="Deux souris, une grande à gauche et une petite à droite, dont les corps suivent les deux traits, avec un morceau de fromage" tint="#e6ecf8">
      <path d="M6 100 H103" stroke="#b9c4d6" strokeWidth="2" {...common} />
      <path d="M12 100 l-2 -5 M16 100 l1 -6 M95 100 l-1 -6 M99 100 l2 -5" stroke="#8fb58a" strokeWidth="1.6" {...common} />
      <Tube d={big} w={11} color="#cfd8ea" />
      <Tube d={small} w={8} color="#cfd8ea" />
      {/* grande souris */}
      <circle cx="12" cy="19" r="5.2" fill="#cfd8ea" stroke={INK} strokeWidth="1.2" />
      <circle cx="31" cy="19" r="5.2" fill="#cfd8ea" stroke={INK} strokeWidth="1.2" />
      <circle cx="12" cy="19" r="2.4" fill="#f3b6b0" />
      <circle cx="31" cy="19" r="2.4" fill="#f3b6b0" />
      <circle cx="21.5" cy="27" r="10.5" fill="#d9e1f1" stroke={INK} strokeWidth="1.4" />
      <Eye cx={17.5} cy={25.5} r={1.7} />
      <Eye cx={25.5} cy={25.5} r={1.7} />
      <ellipse cx="21.5" cy="31" rx="2" ry="1.6" fill="#e58b84" />
      <path d="M17 32.5 L8 30 M17 34 L8 36 M26 32.5 L35 30 M26 34 L35 36" stroke={INK} strokeWidth="0.8" {...common} />
      {/* petite souris */}
      <circle cx="67.5" cy="28" r="3.8" fill="#cfd8ea" stroke={INK} strokeWidth="1" />
      <circle cx="79" cy="28" r="3.8" fill="#cfd8ea" stroke={INK} strokeWidth="1" />
      <circle cx="67.5" cy="28" r="1.6" fill="#f3b6b0" />
      <circle cx="79" cy="28" r="1.6" fill="#f3b6b0" />
      <circle cx="73.3" cy="34" r="7.2" fill="#d9e1f1" stroke={INK} strokeWidth="1.2" />
      <Eye cx={70.5} cy={32.8} r={1.3} />
      <Eye cx={76.2} cy={32.8} r={1.3} />
      <ellipse cx="73.3" cy="36.9" rx="1.5" ry="1.2" fill="#e58b84" />
      <path d="M69 37.5 L62.5 36.5 M77.5 37.5 L84 36.5" stroke={INK} strokeWidth="0.7" {...common} />
      {/* fromage */}
      <path d="M72 100 L100 100 L100 88 Z" fill="#f7cf55" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="92" cy="96" r="1.8" fill="#e3ad2c" />
      <circle cx="97" cy="92.5" r="1.2" fill="#e3ad2c" />
    </Scene>
  );
}

export function Slide({ strokes }: StrokesProps) {
  const [flag, slide] = strokes;
  return (
    <Scene label="Un toboggan : l'enfant au sommet s'apprête à glisser sur la grande courbe, avec son échelle et un petit drapeau" tint="#fde9de">
      <path d="M0 100 H109 V112 H0 Z" fill="#cfe3c0" />
      <path d="M21 42 V98 M29 42 V98 M21 54 H29 M21 66 H29 M21 78 H29 M21 90 H29" stroke="#b08a5a" strokeWidth="2.4" {...common} />
      <Tube d={slide} w={9} color="#f08c78" />
      <Tube d={flag} w={2.6} color="#8d6e4a" />
      <path d="M43 16 L43 7 L53 11.5 Z" fill="#e5535a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      {/* enfant */}
      <path d="M33 41 L23 32 M33 41 L45 31" stroke="#f2c9a8" strokeWidth="3" {...common} />
      <rect x="27.5" y="36" width="11" height="11" rx="4" fill="#4d7cc9" stroke={INK} strokeWidth="1.2" />
      <path d="M34 47 L47 52" stroke="#4d7cc9" strokeWidth="4" {...common} />
      <circle cx="33" cy="30.5" r="5.4" fill="#f2c9a8" stroke={INK} strokeWidth="1.2" />
      <path d="M27.8 30 Q33 22 38.2 30 Q33 27 27.8 30 Z" fill="#5b3b25" stroke={INK} strokeWidth="0.8" />
      <Eye cx={31.3} cy={31} r={0.9} />
      <Eye cx={35} cy={31} r={0.9} />
      <path d="M31.5 33.5 Q33 35 34.5 33.5" stroke={INK} strokeWidth="0.8" {...common} />
      <path d="M72 30 q6 4 0 10 M80 28 q6 4 0 10" stroke="#e5535a" strokeWidth="1.4" opacity="0.7" {...common} />
    </Scene>
  );
}

export function Lightning({ strokes }: StrokesProps) {
  const [, bolt] = strokes;
  return (
    <Scene label="Un nuage gris au sommet et, dessous, un éclair en zigzag qui descend jusqu'au sol" tint="#e3e6f3">
      <Waves y={103} color="#c9d4c0" />
      <Tube d={bolt} w={8} color="#f7cf3d" />
      <path d="M13 62 L18 56 M88 66 L95 62 M90 78 L97 80" stroke="#f7cf3d" strokeWidth="2" {...common} />
      <g stroke={INK} strokeWidth="1.3">
        <ellipse cx="38" cy="17" rx="13" ry="8" fill="#9aa5bd" />
        <ellipse cx="54" cy="12" rx="12" ry="8.5" fill="#aeb8ce" />
        <ellipse cx="68" cy="18" rx="12" ry="7.5" fill="#9aa5bd" />
        <ellipse cx="53" cy="21" rx="19" ry="6" fill="#bcc5d8" />
      </g>
      <path d="M20 31 l-1 5 M30 33 l-1 5 M78 33 l-1 5 M88 30 l-1 5" stroke="#6d90c8" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

export function Ladle({ strokes }: StrokesProps) {
  const [rim, handle] = strokes;
  return (
    <Scene label="Une marmite de soupe avec une louche : le manche vertical, la louche en boucle et une olive qui tombe dedans" tint="#fcefd9">
      <ellipse cx="60" cy="74" rx="32" ry="19" fill="#f0a95c" />
      <ellipse cx="60" cy="74" rx="32" ry="19" fill="none" stroke="#c9792b" strokeWidth="1.2" />
      <Tube d={rim} w={4} color="#cfd6e2" />
      <Tube d={handle} w={4.4} color="#cfd6e2" />
      <path d="M74 44 Q75 52 70 60" stroke="#8d9bb0" strokeWidth="1.2" strokeDasharray="2 2" {...common} />
      <ellipse cx="79" cy="29" rx="7.2" ry="4.6" transform="rotate(40 79 29)" fill="#8aa04a" stroke={INK} strokeWidth="1.2" />
      <circle cx="82.5" cy="32" r="1.8" fill="#d94a4a" />
      <path d="M40 98 q-4 -8 2 -14 M80 100 q-4 -6 1 -12" stroke="#ffffff" strokeWidth="2" opacity="0.7" {...common} />
    </Scene>
  );
}

/* ---------- Rangée k ---------- */

export function Cactus({ strokes }: StrokesProps) {
  const [arm, trunk, flower] = strokes;
  return (
    <Scene label="Un cactus dans un pot de terre cuite : le tronc penché, un bras qui se recourbe et une fleur rose en haut à droite" tint="#f9f0da">
      <ellipse cx="50" cy="100" rx="44" ry="5" fill="#eadfc8" />
      <Tube d={trunk} w={10} color="#74a57f" />
      <Tube d={arm} w={7} color="#74a57f" />
      <path d="M10 86 H33 L29 103 H14 Z" fill="#c9704a" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="8" y="83" width="27" height="5" rx="1.5" fill="#d9825a" stroke={INK} strokeWidth="1.2" />
      <Tube d={flower} w={3.5} color="#74a57f" />
      <path d="M42 34 L37 32 M38 52 L33 50 M31 66 L26 64 M56 40 L61 38 M60 62 L65 62 M44 78 L39 78" stroke="#ffffff" strokeWidth="1.2" {...common} />
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="77" cy="24" rx="3" ry="4.4" fill="#f08c8c" stroke="#c75a5a" strokeWidth="0.6" transform={`rotate(${angle} 77 30)`} />
      ))}
      <circle cx="77" cy="30" r="2.6" fill="#f7d36b" stroke="#c9a02a" strokeWidth="0.6" />
    </Scene>
  );
}

export function Kimono({ strokes }: StrokesProps) {
  const [sleeveTop, sleeveBottom, fold, belt] = strokes;
  return (
    <Scene label="Un kimono vu de face : deux larges manches, un pan bleu qui tombe au milieu et la ceinture dorée nouée en bas" tint="#fbe6ec">
      <Tube d={sleeveTop} w={9} color="#e8899a" />
      <Tube d={sleeveBottom} w={9} color="#e8899a" />
      <Tube d={fold} w={7} color="#3f62a8" />
      <Tube d={belt} w={8} color="#e6b84d" />
      <g fill="#ffffff" opacity="0.85">
        <circle cx="40" cy="29" r="1.4" /><circle cx="52" cy="27" r="1.4" /><circle cx="62" cy="25" r="1.4" />
        <circle cx="46" cy="49" r="1.4" /><circle cx="58" cy="47" r="1.4" /><circle cx="70" cy="44" r="1.4" />
      </g>
      <path d="M72 88 q9 -5 12 3 M72 90 q8 4 11 -2" {...common} stroke={INK} strokeWidth="1.2" />
      <ellipse cx="72" cy="89" rx="3.8" ry="4.4" fill="#d9a53a" stroke={INK} strokeWidth="1.2" />
      <path d="M40 14 l4 -4 l5 5" stroke="#ffffff" strokeWidth="3" {...common} />
    </Scene>
  );
}

export function Elbow({ strokes }: StrokesProps) {
  const [arm] = strokes;
  return (
    <Scene label="Un bras plié en angle : le coude est la pointe du caractère, avec une manche bleue, une épaule en haut et une main en bas" tint="#e6edf8">
      <Tube d={arm} w={13} color="#8fa6d6" />
      <circle cx="61" cy="15" r="7.5" fill="#8fa6d6" stroke={INK} strokeWidth="1.3" />
      <circle cx="40" cy="54" r="5.8" fill="#f3b6b0" stroke={INK} strokeWidth="1.3" />
      <circle cx="38.5" cy="52.5" r="1.8" fill="#ffffff" opacity="0.6" />
      <path d="M27 45 Q22 54 27 63 M20 41 Q13 54 20 67" stroke={INK} strokeWidth="1.4" {...common} />
      <circle cx="62" cy="95" r="7.5" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <circle cx="70" cy="91" r="3.2" fill="#f2c9a8" stroke={INK} strokeWidth="1.1" />
      <path d="M58 92 q4 -2 8 0" stroke={INK} strokeWidth="0.8" {...common} />
    </Scene>
  );
}

export function Dock({ strokes }: StrokesProps) {
  const [post, pier, rod] = strokes;
  return (
    <Scene label="Un quai de port : un piquet avec une corde, la jetée en bois et une canne à pêche dont l'hameçon plonge dans l'eau" tint="#e2f0f8">
      <circle cx="92" cy="15" r="6.5" fill="#f9d86a" />
      <Waves y={82} color="#9ec5e6" />
      <Waves y={92} color="#7fb0dd" opacity={0.75} />
      <Tube d={pier} w={6} color="#b58a55" />
      <Tube d={post} w={7} color="#8a6538" />
      <ellipse cx="25" cy="27" rx="7.5" ry="2.6" fill="none" stroke="#e3cf9c" strokeWidth="2" />
      <ellipse cx="25" cy="31.5" rx="7.5" ry="2.6" fill="none" stroke="#e3cf9c" strokeWidth="2" />
      <Tube d={rod} w={3.4} color="#8d6e4a" />
      <path d="M86 90 q5 -5 10 0 q-5 5 -10 0 Z M96 90 l5 -3 v6 Z" fill="#f08c5a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <circle cx="88.5" cy="89" r="0.9" fill={INK} />
    </Scene>
  );
}

export function Lips({ strokes }: StrokesProps) {
  const [upper, lower] = strokes;
  return (
    <Scene label="Une bouche aux lèvres rouges, ouverte en rond comme pour dire « co », avec les dents du haut et la langue" tint="#fbe3e3">
      <ellipse cx="54" cy="54" rx="26" ry="28" fill="#8a3140" stroke={INK} strokeWidth="1.2" />
      <rect x="40" y="29" width="28" height="9" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1" />
      <ellipse cx="54" cy="70" rx="15" ry="8.5" fill="#e0707f" />
      <path d="M46 70 Q54 74 62 70" stroke="#b34a5a" strokeWidth="1" {...common} />
      <Tube d={upper} w={9} color="#e5646f" />
      <Tube d={lower} w={9} color="#e5646f" />
      <circle cx="16" cy="52" r="6" fill="#f4a0a8" opacity="0.5" />
      <circle cx="94" cy="52" r="6" fill="#f4a0a8" opacity="0.5" />
    </Scene>
  );
}

/* ---------- Rangée s ---------- */

export function Sabre({ strokes }: StrokesProps) {
  const [guard, blade, wave] = strokes;
  return (
    <Scene label="Un sabre de pirate au-dessus de la mer : la poignée, la garde dorée, la lame courbe et une vague" tint="#e1ecf8">
      <Waves y={96} color="#a9c8e8" />
      <Tube d={blade} w={7} color="#d6dce8" />
      <path d="M42 14 L51 31" stroke={INK} strokeWidth="9.6" {...common} />
      <path d="M42 14 L51 31" stroke="#6b4a2e" strokeWidth="7" {...common} />
      <circle cx="41" cy="12" r="4.4" fill="#e6b84d" stroke={INK} strokeWidth="1.2" />
      <Tube d={guard} w={5} color="#e6b84d" />
      <Tube d={wave} w={5} color="#5b9bd5" />
      <path d="M86 20 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z" fill="#ffffff" opacity="0.9" />
    </Scene>
  );
}

export function Swan({ strokes }: StrokesProps) {
  const [body] = strokes;
  return (
    <Scene label="Un cygne blanc sur l'eau : le long cou descend de la tête, puis le corps glisse vers la droite" tint="#e4f1f6">
      <Waves y={80} color="#b9d9ee" />
      <Waves y={92} color="#8cc0e2" opacity={0.8} />
      <Tube d={body} w={8} color="#fdfdfd" />
      <circle cx="39" cy="17" r="6.5" fill="#fdfdfd" stroke={INK} strokeWidth="1.3" />
      <path d="M44 15 L54 19 L44 21 Z" fill="#f59e3b" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M34 15 Q38 13 42 14" stroke={INK} strokeWidth="1.6" {...common} />
      <Eye cx={39.5} cy={16.5} r={1.4} />
      <ellipse cx="64" cy="81" rx="13" ry="6.5" transform="rotate(-12 64 81)" fill="#fdfdfd" stroke={INK} strokeWidth="1.2" />
      <path d="M56 82 q6 3 12 -1 M58 85 q6 3 12 -1" stroke="#c4cfdc" strokeWidth="1" {...common} />
    </Scene>
  );
}

export function Trapeze({ strokes }: StrokesProps) {
  const [bar, body] = strokes;
  return (
    <Scene label="Un trapéziste suspendu à sa barre : la barre horizontale, le corps qui pend et les genoux repliés" tint="#e6edfb">
      <path d="M16 36 L12 -2 M93 30 L97 -2" stroke="#c9a66b" strokeWidth="2.2" {...common} />
      <Tube d={body} w={7} color="#e27d9a" />
      <Tube d={bar} w={4} color="#8d6e4a" />
      <circle cx="58" cy="11" r="6.2" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <path d="M52.5 9.5 Q58 2 63.5 9.5 Q58 7 52.5 9.5 Z" fill="#5b3b25" stroke={INK} strokeWidth="0.8" />
      <Eye cx={56} cy={11.5} r={1} />
      <Eye cx={60.5} cy={11.5} r={1} />
      <circle cx="51" cy="35.5" r="3.4" fill="#f2c9a8" stroke={INK} strokeWidth="1" />
      <circle cx="68" cy="32.5" r="3.4" fill="#f2c9a8" stroke={INK} strokeWidth="1" />
      <circle cx="47" cy="97" r="4" fill="#f2c9a8" stroke={INK} strokeWidth="1.1" />
      <path d="M6 102 H103" stroke="#c9d3e3" strokeWidth="2" strokeDasharray="3 3" {...common} />
    </Scene>
  );
}

export function Saddle({ strokes }: StrokesProps) {
  const [back, stirrup, seat] = strokes;
  return (
    <Scene label="Une selle de cheval : le dos du cheval, la selle rouge en forme de U et l'étrier qui pend" tint="#f4ebdf">
      <path d="M6 102 H103" stroke="#d9c9ae" strokeWidth="2" {...common} />
      <path d="M16 50 q-8 6 -6 22 M16 52 q-4 10 -1 24" stroke="#5b3b25" strokeWidth="2.4" {...common} />
      <Tube d={back} w={9} color="#9a6a3f" />
      <circle cx="94" cy="38" r="8" fill="#9a6a3f" stroke={INK} strokeWidth="1.3" />
      <path d="M90 32 l1 -8 l5 6 Z" fill="#9a6a3f" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <Eye cx={92} cy={37} r={1.3} />
      <Tube d={seat} w={8} color="#b5382f" />
      <path d={seat} stroke="#f1d38a" strokeWidth="1" strokeDasharray="2 2" {...common} />
      <Tube d={stirrup} w={3} color="#cfd6e2" />
      <circle cx="63" cy="70" r="4.3" fill="none" stroke="#51648a" strokeWidth="2.2" />
    </Scene>
  );
}

export function Mountain({ strokes }: StrokesProps) {
  const [trail] = strokes;
  return (
    <Scene label="Une montagne et son sentier en lacets qui monte jusqu'au sommet, marqué par un petit drapeau rouge" tint="#e4ecf8">
      <circle cx="92" cy="16" r="7" fill="#f9d86a" />
      <path d="M52 4 L116 104 L-8 104 Z" fill="#8fa3c0" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M52 4 L116 104 L72 104 L52 62 Z" fill="#7a8fae" opacity="0.55" />
      <path d="M52 4 L61 18 L55 15 L51 22 L46 15 L43 18 Z" fill="#ffffff" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Tube d={trail} w={4.4} color="#ecd8a6" />
      <path d="M38 22 V9" stroke={INK} strokeWidth="1.6" {...common} />
      <path d="M38 9 L48 13 L38 17 Z" fill="#d94a4a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
    </Scene>
  );
}

import { INK, Scene, Tube, Eye, Waves, common, type StrokesProps } from "./story-illustrations";

/**
 * Illustrations des rangées t, n, h, m, y, r, w (suite de story-illustrations.tsx).
 * Mêmes principes : les traits du caractère (KanjiVG, viewBox 0 0 109 109) deviennent des parties du dessin.
 */

export const sk = (d: string, w: number, c: string, o = 1) => (
  <path d={d} stroke={c} strokeWidth={w} opacity={o} {...common} />
);

export function Grass({ y = 100, color = "#cfe3c0" }: { y?: number; color?: string }) {
  return <path d={`M0 ${y} H109 V112 H0 Z`} fill={color} />;
}

export function Star({ x, y, r = 2.4, color = "#f7cf55" }: { x: number; y: number; r?: number; color?: string }) {
  const p = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={p} fill={color} stroke={INK} strokeWidth="0.5" strokeLinejoin="round" />;
}

/* ---------- Rangée t : ta chi tsu te to ---------- */

export function Teacup({ strokes }: StrokesProps) {
  const [biscuit, spoon, steam, cupBottom] = strokes;
  return (
    <Scene label="Une tasse de thé fumante posée sur sa soucoupe, avec un biscuit et une cuillère à côté" tint="#f6e9db">
      <Grass y={96} color="#e8d3b4" />
      <ellipse cx="70" cy="92" rx="30" ry="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
      <path d="M54 66 H90 V78 Q90 91 72 91 Q54 91 54 78 Z" fill="#ffffff" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <ellipse cx="72" cy="66" rx="18" ry="4" fill="#c98a4b" stroke={INK} strokeWidth="1.2" />
      <path d="M90 70 q10 0 10 7 q0 7 -10 7" stroke={INK} strokeWidth="3.2" {...common} />
      <path d="M90 70 q10 0 10 7 q0 7 -10 7" stroke="#ffffff" strokeWidth="1.2" {...common} />
      <path d="M60 74 q12 4 24 0" stroke="#e5535a" strokeWidth="1.6" {...common} />
      <Tube d={cupBottom} w={3.4} color="#9db6e0" />
      <Tube d={steam} w={2.6} color="#ffffff" edge="#9aa9c4" />
      <path d="M64 44 q-3 -5 1 -9 M78 44 q3 -5 -1 -9" stroke="#b6c2d6" strokeWidth="1.6" opacity="0.8" {...common} />
      <Tube d={spoon} w={3} color="#d3dae6" />
      <ellipse cx="20" cy="90" rx="5.2" ry="3.4" transform="rotate(-62 20 90)" fill="#d3dae6" stroke={INK} strokeWidth="1.2" />
      <Tube d={biscuit} w={6.5} color="#e3b369" />
      <g fill="#6b4226">
        <circle cx="30" cy="34" r="1" /><circle cx="40" cy="35" r="1" /><circle cx="50" cy="32" r="1" /><circle cx="58" cy="30" r="1" />
      </g>
      <path d="M12 20 q4 -4 8 0 M88 14 q4 -4 8 0" stroke="#c8d3e6" strokeWidth="1.4" {...common} />
    </Scene>
  );
}

export function Puppy({ strokes }: StrokesProps) {
  const [scarf, body] = strokes;
  return (
    <Scene label="Un chiot assis avec une écharpe rouge : la tête et le cou en haut, le corps et la queue enroulés en boucle" tint="#fdeedd">
      <Grass y={98} color="#cfe3b8" />
      <ellipse cx="62" cy="72" rx="26" ry="19" fill="#e8bd88" stroke={INK} strokeWidth="1.3" />
      <ellipse cx="46" cy="14" rx="12.5" ry="11" fill="#e8bd88" stroke={INK} strokeWidth="1.4" />
      <path d="M34 8 q-9 4 -6 16 q6 -2 9 -9 Z" fill="#a8703c" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M58 8 q9 4 6 16 q-6 -2 -9 -9 Z" fill="#a8703c" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <ellipse cx="46.5" cy="19" rx="6.2" ry="4.6" fill="#fff4e4" stroke={INK} strokeWidth="0.8" />
      <ellipse cx="46.5" cy="16.6" rx="2" ry="1.4" fill={INK} />
      <Eye cx={40.5} cy={12} r={1.6} />
      <Eye cx={52.5} cy={12} r={1.6} />
      <path d="M46.5 20 v3 q-3 3 -5 0 M46.5 23 q3 3 5 0" {...common} fill="#e5707f" stroke={INK} strokeWidth="0.8" />
      <Tube d={body} w={5} color="#c88a52" />
      <Tube d={scarf} w={5.4} color="#e5535a" />
      <path d="M60 33 l3 6 M52 34 l2 5" stroke="#ffffff" strokeWidth="1" opacity="0.7" {...common} />
      <path d="M86 56 l10 -6" stroke="#a8703c" strokeWidth="3.4" {...common} />
      <ellipse cx="22" cy="92" rx="7" ry="3.2" fill="#f7f1e3" stroke={INK} strokeWidth="1" />
      <circle cx="17" cy="90" r="2" fill="#f7f1e3" stroke={INK} strokeWidth="1" />
      <circle cx="27" cy="90" r="2" fill="#f7f1e3" stroke={INK} strokeWidth="1" />
      <g fill="#c88a52"><circle cx="86" cy="94" r="1.6" /><circle cx="91" cy="92" r="1.3" /><circle cx="94" cy="97" r="1.3" /></g>
    </Scene>
  );
}

export function Tsunami({ strokes }: StrokesProps) {
  const [wave] = strokes;
  return (
    <Scene label="Une immense vague qui se recourbe en rouleau, avec de l'écume sur la crête et un petit voilier au creux" tint="#dcebf7">
      <circle cx="96" cy="14" r="6" fill="#f9d86a" />
      <Waves y={96} color="#8fbbe0" />
      <path d="M14 45 C 40 30, 82 28, 84 41 C 90 62, 74 82, 45 86 C 70 78, 74 56, 66 48 C 50 44, 30 52, 14 45 Z" fill="#7fb0dd" opacity="0.55" />
      <Tube d={wave} w={8} color="#4f8fd0" />
      <g fill="#ffffff" stroke={INK} strokeWidth="0.6">
        <circle cx="30" cy="40" r="2.4" /><circle cx="42" cy="36" r="2.8" /><circle cx="56" cy="35" r="2.4" />
        <circle cx="70" cy="37" r="2.8" /><circle cx="82" cy="40" r="2" /><circle cx="88" cy="33" r="1.4" />
      </g>
      <path d="M44 74 H62 L58 80 H48 Z" fill="#b5382f" stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M53 74 V60 L61 72 Z" fill="#ffffff" stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M12 70 q4 -3 8 0 M92 78 q4 -3 8 0" stroke="#ffffff" strokeWidth="1.4" {...common} />
    </Scene>
  );
}

export function Phone({ strokes }: StrokesProps) {
  const [handset] = strokes;
  return (
    <Scene label="Un combiné de téléphone à l'ancienne dont la grande courbe est le manche, avec des ondes sonores" tint="#efe6f7">
      <path d="M86 40 q8 4 8 12 M90 34 q13 6 13 18" stroke="#b79bd6" strokeWidth="1.8" {...common} />
      <rect x="64" y="60" width="38" height="30" rx="6" fill="#d9c9ec" stroke={INK} strokeWidth="1.3" />
      <circle cx="83" cy="75" r="10" fill="#f6eefc" stroke={INK} strokeWidth="1" />
      <g fill="#7a5aa6">
        <circle cx="83" cy="68" r="1.4" /><circle cx="89" cy="72" r="1.4" /><circle cx="89" cy="79" r="1.4" /><circle cx="83" cy="82" r="1.4" /><circle cx="77" cy="79" r="1.4" /><circle cx="77" cy="72" r="1.4" />
      </g>
      <Tube d={handset} w={7} color="#5a4a8a" />
      <circle cx="21" cy="27" r="6.4" fill="#7a68a8" stroke={INK} strokeWidth="1.3" />
      <circle cx="81" cy="89" r="6.4" fill="#7a68a8" stroke={INK} strokeWidth="1.3" />
      <circle cx="19" cy="25" r="1.8" fill="#ffffff" opacity="0.6" />
      <path d="M8 18 q-3 4 0 8 M3 14 q-6 8 0 16" stroke="#b79bd6" strokeWidth="1.6" {...common} />
      <path d="M12 96 q8 6 18 0 q8 -6 14 2" stroke="#9aa9c4" strokeWidth="1.4" strokeDasharray="2 2" {...common} />
    </Scene>
  );
}

export function Tomato({ strokes }: StrokesProps) {
  const [stem, vine] = strokes;
  return (
    <Scene label="Une tomate bien mûre avec sa tige verte et une vrille de vigne qui s'enroule autour" tint="#fde7df">
      <Grass y={98} color="#d5e6c3" />
      <circle cx="56" cy="62" r="29" fill="#e5483f" stroke={INK} strokeWidth="1.5" />
      <path d="M36 50 q4 -12 16 -14" stroke="#ffffff" strokeWidth="3" opacity="0.5" {...common} />
      <path d="M44 38 l6 4 l5 -6 l5 6 l7 -4 l-4 8 q-9 4 -18 0 Z" fill="#4f9a4a" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <Tube d={vine} w={2.6} color="#4f9a4a" />
      <Tube d={stem} w={3.6} color="#6bb35f" />
      <path d="M76 24 q12 -8 20 2 q-8 8 -20 -2 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" />
      <path d="M78 24 q8 0 14 2" stroke="#3f7d3b" strokeWidth="0.8" {...common} />
      <g fill="#ffffff" opacity="0.55"><circle cx="70" cy="76" r="1.2" /><circle cx="78" cy="68" r="1" /><circle cx="64" cy="84" r="1" /></g>
      <circle cx="94" cy="86" r="8" fill="#e5483f" stroke={INK} strokeWidth="1.2" />
      <path d="M94 78 l-2 -3 M94 78 l3 -2" stroke="#3f7d3b" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

/* ---------- Rangée n : na ni nu ne no ---------- */

export function Narwhal({ strokes }: StrokesProps) {
  const [floe, tusk, spout, body] = strokes;
  return (
    <Scene label="Un narval qui bondit : la longue défense en spirale, le corps en boucle, le jet d'eau et un bloc de glace" tint="#d9ecf6">
      <Waves y={94} color="#8fc3e6" />
      <Waves y={101} color="#6aa8d6" opacity={0.8} />
      <ellipse cx="60" cy="72" rx="28" ry="17" fill="#b4c3d9" stroke={INK} strokeWidth="1.3" />
      <circle cx="30" cy="72" r="11" fill="#b4c3d9" stroke={INK} strokeWidth="1.3" />
      <Eye cx={28} cy={69} r={1.6} />
      <path d="M26 77 q4 3 8 0" stroke={INK} strokeWidth="1" {...common} />
      <Tube d={body} w={4.4} color="#8ea3c4" />
      <Tube d={tusk} w={4.2} color="#fbf3d9" />
      <path d="M41 24 l-3 -2 M39 33 l-4 -2 M37 42 l-4 -2 M34 51 l-4 -2 M31 60 l-4 -2" stroke="#d6c58e" strokeWidth="1" {...common} />
      <Tube d={spout} w={2.6} color="#ffffff" edge="#6aa8d6" />
      <path d="M70 18 q4 6 0 10 M80 16 q5 8 1 14" stroke="#9fc8e8" strokeWidth="1.4" {...common} />
      <Tube d={floe} w={5} color="#f4fbff" edge="#6aa8d6" />
      <g fill="#7a8fae" opacity="0.7"><circle cx="62" cy="68" r="1.6" /><circle cx="70" cy="76" r="1.4" /><circle cx="76" cy="66" r="1.2" /></g>
      <Star x={100} y={12} r={2.4} color="#ffffff" />
    </Scene>
  );
}

export function Nest({ strokes }: StrokesProps) {
  const [trunk, branch, bowl] = strokes;
  return (
    <Scene label="Un nid dans un arbre : le tronc à gauche, la branche, et le nid en forme de bol qui contient des œufs" tint="#e8f1dc">
      <Grass y={96} color="#cfe3b0" />
      {sk("M24 44 C 34 38, 44 34, 54 32", 4.4, "#8d6e4a")}
      <Tube d={trunk} w={6.4} color="#a07a52" />
      <Tube d={branch} w={3.4} color="#8d6e4a" />
      <path d="M84 33 q8 -10 16 -2 q-6 8 -16 2 Z M30 22 q-10 -8 -18 2 q8 6 18 -2 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M55 62 q-4 14 8 20 H85 q12 -6 8 -20 Z" fill="#d8b36e" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <ellipse cx="62" cy="62" rx="6" ry="7.5" fill="#f4efe0" stroke={INK} strokeWidth="1.1" />
      <ellipse cx="76" cy="61" rx="6" ry="7.5" fill="#f4efe0" stroke={INK} strokeWidth="1.1" />
      <circle cx="87" cy="60" r="3.4" fill="#fbd96a" stroke={INK} strokeWidth="1" />
      <path d="M58 70 q10 -3 14 2 M70 72 q10 -3 18 0 M60 78 q12 3 24 -1" stroke="#a9833f" strokeWidth="1" {...common} />
      <Tube d={bowl} w={5.4} color="#c79b52" />
      <path d="M58 56 l1 -5 M74 55 l1 -5" stroke="#ffffff" strokeWidth="1" opacity="0.8" {...common} />
    </Scene>
  );
}

export function Cloud({ strokes }: StrokesProps) {
  const [s1, s2] = strokes;
  return (
    <Scene label="Un gros nuage rond et moelleux, dont les deux traits dessinent les bourrelets, avec de la pluie et un rayon de soleil" tint="#d6e7fa">
      <circle cx="96" cy="14" r="7" fill="#f9d86a" />
      <path d="M90 22 l8 8 M100 22 l-8 8" stroke="#f9d86a" strokeWidth="1.6" {...common} />
      <g fill="#ffffff" stroke={INK} strokeWidth="1.3">
        <circle cx="32" cy="58" r="16" /><circle cx="52" cy="44" r="19" /><circle cx="76" cy="54" r="17" /><circle cx="54" cy="64" r="19" />
      </g>
      <g fill="#ffffff">
        <circle cx="32" cy="58" r="14.6" /><circle cx="52" cy="44" r="17.6" /><circle cx="76" cy="54" r="15.6" /><circle cx="54" cy="64" r="17.6" />
      </g>
      <Tube d={s2} w={4.4} color="#8fb2e6" />
      <Tube d={s1} w={4.4} color="#b3c8ef" />
      <path d="M26 92 l-2 6 M40 90 l-2 6 M56 92 l-2 6 M72 90 l-2 6 M86 92 l-2 6" stroke="#5f8fd6" strokeWidth="1.8" {...common} />
    </Scene>
  );
}

export function Lily({ strokes }: StrokesProps) {
  const [stem, pads] = strokes;
  return (
    <Scene label="Un nénuphar rose sur une tige verte, entouré de larges feuilles qui flottent sur l'eau, avec une libellule" tint="#e3f1ef">
      <Waves y={92} color="#a6d0dd" />
      <Waves y={99} color="#7fb6cb" opacity={0.85} />
      <Tube d={pads} w={5.6} color="#6bb35f" />
      <Tube d={stem} w={3.6} color="#4f9a4a" />
      <g stroke={INK} strokeWidth="1.1">
        <ellipse cx="22" cy="14" rx="5" ry="10" transform="rotate(-50 22 14)" fill="#f7b6c8" />
        <ellipse cx="44" cy="14" rx="5" ry="10" transform="rotate(50 44 14)" fill="#f7b6c8" />
        <ellipse cx="33" cy="8" rx="5.4" ry="10" fill="#f8c4d3" />
        <ellipse cx="27" cy="12" rx="4.6" ry="9" transform="rotate(-25 27 12)" fill="#fbd3de" />
        <ellipse cx="39" cy="12" rx="4.6" ry="9" transform="rotate(25 39 12)" fill="#fbd3de" />
      </g>
      <circle cx="33" cy="12" r="2.4" fill="#f7cf55" stroke={INK} strokeWidth="0.8" />
      <path d="M78 16 l16 4 M86 12 l4 12 M82 24 l14 -6" stroke="#8fb2e6" strokeWidth="2" {...common} opacity="0.7" />
      <path d="M72 20 l22 0" stroke={INK} strokeWidth="1.6" {...common} />
      <circle cx="70" cy="20" r="2" fill="#5f8fd6" stroke={INK} strokeWidth="0.8" />
      <path d="M10 94 q5 -2 10 0" stroke="#ffffff" strokeWidth="1.2" {...common} />
    </Scene>
  );
}

export function Nautilus({ strokes }: StrokesProps) {
  const [spiral] = strokes;
  return (
    <Scene label="Un nautile : une coquille en spirale à chambres, avec ses tentacules et des bulles" tint="#dcecf2">
      <circle cx="56" cy="54" r="38" fill="#fbe7c8" stroke={INK} strokeWidth="1.4" />
      <g stroke="#c98a4b" strokeWidth="2.2" opacity="0.65" {...common}>
        <path d="M24 34 q10 -4 16 6 M20 46 q14 -6 22 4 M18 62 q14 -8 26 0" />
        <path d="M70 18 q4 10 -4 18 M84 28 q4 12 -4 22 M92 44 q0 14 -8 24" />
      </g>
      <Tube d={spiral} w={5.6} color="#e8b46c" />
      <circle cx="70" cy="86" r="6" fill="#f2c9a8" stroke={INK} strokeWidth="1.2" />
      <Eye cx={69} cy={85} r={1.3} />
      <path d="M66 91 q-4 8 -10 8 M70 92 q0 8 -4 10 M74 91 q4 8 10 8 M76 88 q8 4 14 2" stroke="#e58b84" strokeWidth="1.8" {...common} />
      <g fill="none" stroke="#ffffff" strokeWidth="1.2"><circle cx="14" cy="22" r="3" /><circle cx="22" cy="12" r="2" /><circle cx="98" cy="18" r="2.6" /></g>
    </Scene>
  );
}

/* ---------- Rangée h : ha hi fu he ho ---------- */

export function Hammock({ strokes }: StrokesProps) {
  const [trunk, bunting, palm] = strokes;
  return (
    <Scene label="Un hamac tendu entre deux palmiers sur la plage, avec une guirlande de fanions et quelqu'un qui dort" tint="#fdf0d6">
      <circle cx="96" cy="14" r="7" fill="#f9d86a" />
      <path d="M0 98 H109 V112 H0 Z" fill="#f1dcae" />
      <Waves y={96} color="#a9d3ea" opacity={0.8} />
      <path d="M24 46 Q48 80 73 46" stroke="#e5535a" strokeWidth="5" {...common} />
      <path d="M24 46 Q48 80 73 46" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" {...common} />
      <circle cx="38" cy="60" r="4.4" fill="#f2c9a8" stroke={INK} strokeWidth="1.1" />
      <path d="M33 59 Q38 52 43 59 Q38 57 33 59 Z" fill="#5b3b25" stroke={INK} strokeWidth="0.7" />
      <path d="M37 61 q1 1 2 0" stroke={INK} strokeWidth="0.7" {...common} />
      <path d="M44 62 q8 5 14 -1" stroke="#4d7cc9" strokeWidth="5" {...common} />
      <Tube d={trunk} w={5.4} color="#a07a52" />
      <Tube d={palm} w={5.4} color="#a07a52" />
      <path d="M25 18 q-14 -2 -20 10 M25 18 q-4 -12 -16 -12 M25 18 q10 -8 20 0 M25 18 q14 0 20 10" stroke="#4f9a4a" strokeWidth="3" {...common} />
      <path d="M70 17 q-14 -2 -20 10 M70 17 q-2 -10 -14 -12 M70 17 q10 -8 22 0 M70 17 q14 2 20 12" stroke="#4f9a4a" strokeWidth="3" {...common} />
      <Tube d={bunting} w={1.6} color="#8d6e4a" />
      <g stroke={INK} strokeWidth="0.7" strokeLinejoin="round">
        <path d="M54 39 l3 7 l3 -7 Z" fill="#e5535a" /><path d="M62 38 l3 7 l3 -7 Z" fill="#f7cf55" /><path d="M70 37 l3 7 l3 -7 Z" fill="#4d7cc9" /><path d="M78 36 l3 7 l3 -7 Z" fill="#6bb35f" />
      </g>
      <text x="40" y="52" fontSize="4" fill="#b79bd6">z</text>
    </Scene>
  );
}

export function Owl({ strokes }: StrokesProps) {
  const [body] = strokes;
  return (
    <Scene label="Un hibou perché sur une branche, de nuit : le corps en coupe, les deux aigrettes en haut et les grands yeux ronds" tint="#d9dff3">
      <circle cx="88" cy="20" r="11" fill="#fbf1c8" />
      <circle cx="83" cy="17" r="11" fill="#d9dff3" />
      <Star x={14} y={14} /><Star x={30} y={8} r={1.8} /><Star x={100} y={52} r={1.8} />
      <path d="M8 92 H101" stroke="#8d6e4a" strokeWidth="5" {...common} />
      <ellipse cx="58" cy="58" rx="34" ry="32" fill="#a07a52" stroke={INK} strokeWidth="1.3" />
      <ellipse cx="58" cy="66" rx="20" ry="20" fill="#e8d3b4" opacity="0.9" />
      <Tube d={body} w={5.4} color="#7a5a3a" />
      <circle cx="42" cy="44" r="10" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
      <circle cx="68" cy="44" r="10" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
      <Eye cx={43} cy={45} r={5} />
      <Eye cx={67} cy={45} r={5} />
      <path d="M55 48 l-4 6 l4 4 l4 -4 Z" transform="translate(2 -2)" fill="#f2a93b" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M44 70 q4 4 8 0 M60 70 q4 4 8 0 M52 78 q4 4 8 0" stroke="#c4a67a" strokeWidth="1.2" {...common} />
      <path d="M46 92 l-1 5 M52 92 l0 5 M66 92 l0 5 M72 92 l1 5" stroke="#f2a93b" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

export function Snowman({ strokes }: StrokesProps) {
  const [plume, body, armL, armR] = strokes;
  return (
    <Scene label="Un bonhomme de neige avec un chapeau à plume, une écharpe, deux bras en branches et un gros corps rond" tint="#dce9f7">
      <path d="M0 98 H109 V112 H0 Z" fill="#ffffff" />
      <circle cx="56" cy="70" r="25" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
      <circle cx="54" cy="36" r="14" fill="#ffffff" stroke={INK} strokeWidth="1.4" />
      <rect x="43" y="10" width="22" height="13" rx="2" fill="#2d3550" stroke={INK} strokeWidth="1.1" />
      <path d="M38 24 H70" stroke="#2d3550" strokeWidth="3.4" {...common} />
      <path d="M43 20 H65" stroke="#e5535a" strokeWidth="2.4" {...common} />
      <Tube d={plume} w={2.4} color="#e5535a" />
      <Eye cx={49} cy={34} r={1.6} /><Eye cx={59} cy={34} r={1.6} />
      <path d="M54 38 l10 3 l-10 2 Z" fill="#f08a3c" stroke={INK} strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M48 44 q6 4 12 0" stroke={INK} strokeWidth="0.9" {...common} />
      <path d="M42 50 q12 6 24 0" stroke="#4d7cc9" strokeWidth="4.4" {...common} />
      <Tube d={body} w={3.4} color="#c9d8ec" />
      <Tube d={armL} w={2.6} color="#8d6e4a" />
      <Tube d={armR} w={2.6} color="#8d6e4a" />
      <g fill="#2d3550"><circle cx="56" cy="62" r="1.8" /><circle cx="56" cy="70" r="1.8" /><circle cx="56" cy="78" r="1.8" /></g>
      <g fill="#ffffff" stroke="#9fb2d6" strokeWidth="0.6"><circle cx="12" cy="20" r="1.8" /><circle cx="24" cy="40" r="1.4" /><circle cx="94" cy="30" r="1.8" /><circle cx="100" cy="52" r="1.4" /><circle cx="10" cy="62" r="1.4" /></g>
    </Scene>
  );
}

export function Hedgehog({ strokes }: StrokesProps) {
  const [back] = strokes;
  const pts: [number, number][] = [[15, 49], [25, 41], [35, 37], [45, 39], [55, 44], [65, 52], [74, 60], [84, 68], [94, 76]];
  const spines = pts.slice(1).map(([x, y], i) => {
    const [px, py] = pts[i];
    const dx = x - px, dy = y - py, l = Math.hypot(dx, dy);
    const nx = dy / l, ny = -dx / l;
    return `M${x} ${y} l${(nx * 8).toFixed(1)} ${(ny * 8).toFixed(1)}`;
  }).join(" ");
  return (
    <Scene label="Un hérisson vu de profil : son dos arrondi hérissé de piquants, avec une pomme piquée dessus" tint="#efe6d6">
      <Grass y={92} color="#cfe0b0" />
      <path d="M15 49 L35 37 L55 44 L94 76 L92 86 Q50 96 20 72 Q14 62 15 49 Z" fill="#a07a52" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d={spines} stroke="#5b3b25" strokeWidth="2.2" {...common} />
      <path d="M15 49 Q6 58 8 64 Q14 66 22 62 Z" fill="#e8c9a0" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="9" cy="62" r="2.2" fill={INK} />
      <Eye cx={19} cy={55} r={1.8} />
      <Tube d={back} w={3.6} color="#d9b98a" />
      <path d="M28 84 v6 M50 88 v6 M70 84 v6" stroke="#e8c9a0" strokeWidth="3.4" {...common} />
      <circle cx="52" cy="26" r="6.4" fill="#e5483f" stroke={INK} strokeWidth="1.1" />
      <path d="M52 20 q1 -4 4 -5" stroke="#6b4226" strokeWidth="1.4" {...common} />
      <path d="M53 20 q5 -4 8 0 q-4 4 -8 0 Z" fill="#6bb35f" stroke={INK} strokeWidth="0.7" />
      <g stroke="#ffffff" strokeWidth="0.9" opacity="0.8"><path d="M82 30 l3 -3 M85 30 l-3 -3" /></g>
    </Scene>
  );
}

export function Hotel({ strokes }: StrokesProps) {
  const [wallL, banner, awning, pillar] = strokes;
  return (
    <Scene label="Un hôtel avec sa façade, ses fenêtres, son auvent rayé, une bannière et ses étoiles" tint="#e2e8f6">
      <Grass y={92} color="#cfd6e6" />
      <rect x="16" y="26" width="76" height="66" rx="2" fill="#f3e3c8" stroke={INK} strokeWidth="1.3" />
      <rect x="12" y="20" width="84" height="8" rx="1.5" fill="#b5382f" stroke={INK} strokeWidth="1.2" />
      <g fill="#bfe0f4" stroke={INK} strokeWidth="0.9">
        <rect x="30" y="50" width="9" height="9" /><rect x="48" y="50" width="9" height="9" /><rect x="30" y="66" width="9" height="9" /><rect x="48" y="66" width="9" height="9" />
        <rect x="80" y="50" width="8" height="9" /><rect x="80" y="66" width="8" height="9" />
      </g>
      <g fill="#fbd96a" opacity="0.9"><rect x="31.5" y="51.5" width="6" height="6" /><rect x="49.5" y="67.5" width="6" height="6" /></g>
      <rect x="62" y="68" width="14" height="24" rx="6" fill="#8d6e4a" stroke={INK} strokeWidth="1.1" />
      <Tube d={wallL} w={3} color="#d9c5a0" />
      <Tube d={awning} w={5} color="#e5535a" />
      <path d="M58 41 h6 M70 41 h6 M82 41 h6" stroke="#ffffff" strokeWidth="2.4" {...common} />
      <Tube d={banner} w={3.4} color="#4d7cc9" />
      <Tube d={pillar} w={3} color="#cfae6f" />
      <Star x={36} y={11} r={3.4} /><Star x={50} y={8} r={3.4} /><Star x={64} y={11} r={3.4} />
      <circle cx="96" cy="56" r="3" fill="#6bb35f" stroke={INK} strokeWidth="0.8" />
    </Scene>
  );
}

/* ---------- Rangée m : ma mi mu me mo ---------- */

export function Mast({ strokes }: StrokesProps) {
  const [yardTop, yardMid, mast] = strokes;
  return (
    <Scene label="Un voilier : le grand mât vertical, les deux vergues horizontales avec leurs voiles, et la coque sur les vagues" tint="#dcecf8">
      <circle cx="92" cy="14" r="6" fill="#f9d86a" />
      <path d="M32 34 q23 -5 46 0 V47 q-23 5 -46 0 Z" fill="#ffffff" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M35 53 q21 -5 40 -2 V72 q-20 5 -40 0 Z" fill="#fdf7ea" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M56 14 L68 10 L56 6 Z" fill="#e5535a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M22 78 H92 L84 94 H32 Z" fill="#8d4a30" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <Waves y={96} color="#8fbbe0" />
      <Waves y={102} color="#5f8fd6" opacity={0.8} />
      <Tube d={yardTop} w={3} color="#a07a52" />
      <Tube d={yardMid} w={3} color="#a07a52" />
      <Tube d={mast} w={3.4} color="#c49a62" />
      <g fill="#ffffff" stroke={INK} strokeWidth="0.8" strokeLinejoin="round"><path d="M10 28 q4 -4 8 0 q4 -4 8 0 q-4 6 -8 2 q-4 4 -8 -2 Z" /></g>
      <circle cx="30" cy="85" r="1.6" fill="#f7cf55" /><circle cx="42" cy="85" r="1.6" fill="#f7cf55" />
    </Scene>
  );
}

export function Honey({ strokes }: StrokesProps) {
  const [flow, dipper] = strokes;
  return (
    <Scene label="Du miel doré qui coule en ruban, une cuillère à miel, des alvéoles de rayon et une abeille" tint="#fdf1cf">
      <g fill="#f7cf55" stroke="#e3ad2c" strokeWidth="1" opacity="0.55">
        {[[16, 16], [32, 16], [48, 16], [24, 30], [40, 30], [8, 30], [88, 88], [76, 94], [100, 94], [96, 76]].map(([x, y]) => (
          <polygon key={`${x}-${y}`} points={`${x},${y - 8} ${x + 7},${y - 4} ${x + 7},${y + 4} ${x},${y + 8} ${x - 7},${y + 4} ${x - 7},${y - 4}`} />
        ))}
      </g>
      <Tube d={flow} w={7} color="#f2a93b" />
      <path d="M92 79 q0 6 0 10 q-3 4 0 6 q3 -2 0 -6" fill="#f2a93b" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Tube d={dipper} w={4} color="#a07a52" />
      <ellipse cx="79" cy="53" rx="6" ry="4.4" fill="#e3b369" stroke={INK} strokeWidth="1.1" />
      <path d="M74 53 h10 M76 50 h6 M76 56 h6" stroke="#a9833f" strokeWidth="0.8" {...common} />
      <ellipse cx="22" cy="52" rx="7" ry="5" fill="#f7cf55" stroke={INK} strokeWidth="1.1" />
      <path d="M18 47 v10 M23 47 v10 M28 48 v8" stroke={INK} strokeWidth="1.4" {...common} />
      <ellipse cx="18" cy="43" rx="4.4" ry="2.6" fill="#ffffff" opacity="0.8" stroke="#9aa9c4" strokeWidth="0.6" />
      <ellipse cx="26" cy="43" rx="4.4" ry="2.6" fill="#ffffff" opacity="0.8" stroke="#9aa9c4" strokeWidth="0.6" />
      <Eye cx={15} cy={51} r={1} />
      <path d="M14 58 l-2 3" stroke={INK} strokeWidth="1" {...common} />
    </Scene>
  );
}

export function Note({ strokes }: StrokesProps) {
  const [beam, stem, flag] = strokes;
  return (
    <Scene label="Une note de musique sur une portée : la tige verticale avec sa boucle, la barre en haut et le crochet" tint="#efe6fa">
      <g stroke="#b79bd6" strokeWidth="1" opacity="0.8">
        {[38, 46, 54, 62, 70].map((y) => <path key={y} d={`M4 ${y} H105`} />)}
      </g>
      <Tube d={stem} w={4.4} color="#5a4a8a" />
      <Tube d={beam} w={4.2} color="#7a68a8" />
      <Tube d={flag} w={3.2} color="#5a4a8a" />
      <ellipse cx="29" cy="60" rx="9" ry="6.4" transform="rotate(-20 29 60)" fill="#5a4a8a" stroke={INK} strokeWidth="1.2" />
      <ellipse cx="26" cy="58" rx="3" ry="1.6" transform="rotate(-20 26 58)" fill="#ffffff" opacity="0.5" />
      <g fill="#e5535a" stroke={INK} strokeWidth="0.8"><circle cx="88" cy="22" r="4.4" /><circle cx="98" cy="76" r="3.6" fill="#4d7cc9" /><circle cx="12" cy="90" r="3.2" fill="#f7cf55" /></g>
      <path d="M88 18 V8 M98 72 V62" stroke={INK} strokeWidth="1.2" {...common} />
      <path d="M62 96 q4 -6 8 0 q4 6 8 0" stroke="#b79bd6" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

export function Jellyfish({ strokes }: StrokesProps) {
  const [arm, bell] = strokes;
  return (
    <Scene label="Une méduse qui flotte dans l'eau bleue : l'ombrelle en dôme, les tentacules ondulants et des bulles" tint="#d3e6f5">
      <path d="M16 54 Q16 12 54 12 Q92 12 92 54 Z" fill="#f7c4dc" opacity="0.75" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <g stroke="#e58bb0" strokeWidth="2" opacity="0.9" {...common} fill="none">
        <path d="M24 54 q-4 12 2 22 q4 10 -2 22 M38 54 q4 12 -2 22 q-4 10 2 24 M54 54 q-4 14 2 26 q4 10 0 20 M70 54 q4 12 -2 22 q-4 10 2 24 M84 54 q-4 12 2 22 q4 8 -1 18" />
      </g>
      <Tube d={bell} w={4.4} color="#f08cb5" />
      <Tube d={arm} w={3} color="#f9d6e6" />
      <Eye cx={44} cy={30} r={2} /><Eye cx={66} cy={30} r={2} />
      <path d="M50 38 q5 4 10 0" stroke={INK} strokeWidth="1" {...common} />
      <g fill="none" stroke="#ffffff" strokeWidth="1.2"><circle cx="12" cy="30" r="3" /><circle cx="98" cy="24" r="2.4" /><circle cx="100" cy="70" r="3.4" /><circle cx="8" cy="76" r="2" /></g>
    </Scene>
  );
}

export function Sparrow({ strokes }: StrokesProps) {
  const [bird, twig, perch] = strokes;
  return (
    <Scene label="Un moineau perché sur une branche : la tête, le dos et le ventre rond formés par le trait, avec des feuilles et des baies" tint="#f3ecdc">
      <ellipse cx="62" cy="72" rx="22" ry="20" fill="#c99a68" stroke={INK} strokeWidth="1.3" />
      <ellipse cx="62" cy="78" rx="12" ry="12" fill="#f1e2c8" />
      <circle cx="50" cy="26" r="12" fill="#c99a68" stroke={INK} strokeWidth="1.3" />
      <path d="M40 24 l-8 3 l8 3 Z" fill="#f2a93b" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Eye cx={47} cy={23} r={1.8} />
      <path d="M52 24 q6 2 6 8" stroke="#7a5a3a" strokeWidth="1.4" {...common} />
      <path d="M78 66 q14 6 18 22 q-12 -2 -22 -12 Z" fill="#8d5f3a" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <Tube d={twig} w={2.6} color="#8d6e4a" />
      <Tube d={perch} w={3} color="#8d6e4a" />
      <Tube d={bird} w={3.6} color="#8d5f3a" />
      <path d="M66 36 q8 -6 14 0 q-6 6 -14 0 Z M24 60 q-8 -8 -14 -2 q6 8 14 2 Z" fill="#6bb35f" stroke={INK} strokeWidth="0.9" />
      <g fill="#e5483f" stroke={INK} strokeWidth="0.7"><circle cx="30" cy="40" r="2.6" /><circle cx="66" cy="38" r="2.6" /></g>
      <path d="M52 94 v5 M58 94 v5" stroke="#f2a93b" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

/* ---------- Rangée y : ya yu yo ---------- */

export function Yogurt({ strokes }: StrokesProps) {
  const [swirl, cherry, spoon] = strokes;
  return (
    <Scene label="Un pot de yaourt surmonté d'une cerise, avec une cuillère qui dépasse en biais" tint="#fde8ee">
      <Grass y={96} color="#f0dcc8" />
      <path d="M18 56 H86 L78 94 H26 Z" fill="#ffffff" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M22 72 H82 L80 82 H24 Z" fill="#f7b6c8" opacity="0.85" />
      <path d="M32 62 q4 3 8 0 M48 62 q4 3 8 0 M64 62 q4 3 8 0" stroke="#e5535a" strokeWidth="1.2" {...common} />
      <Tube d={swirl} w={6} color="#fbf3ea" />
      <Tube d={spoon} w={3.4} color="#d3dae6" />
      <ellipse cx="30" cy="22" rx="5.6" ry="3.6" transform="rotate(-62 30 22)" fill="#d3dae6" stroke={INK} strokeWidth="1.2" />
      <circle cx="56" cy="22" r="5.6" fill="#e5483f" stroke={INK} strokeWidth="1.2" />
      <Tube d={cherry} w={2} color="#4f9a4a" />
      <circle cx="54" cy="20" r="1.4" fill="#ffffff" opacity="0.7" />
      <g fill="#e5483f"><circle cx="90" cy="88" r="2" /><circle cx="96" cy="84" r="1.6" /></g>
    </Scene>
  );
}

export function Yuzu({ strokes }: StrokesProps) {
  const [fruit, branch] = strokes;
  return (
    <Scene label="Un yuzu jaune, gros agrume rond accroché à sa branche feuillue, avec une tranche à côté" tint="#fcf3cf">
      <circle cx="55" cy="52" r="28" fill="#f7d34a" stroke={INK} strokeWidth="1.4" />
      <g fill="#e3ad2c" opacity="0.7"><circle cx="40" cy="60" r="1.2" /><circle cx="50" cy="70" r="1.2" /><circle cx="68" cy="66" r="1.2" /><circle cx="72" cy="44" r="1.2" /><circle cx="46" cy="38" r="1.2" /><circle cx="60" cy="56" r="1.2" /></g>
      <path d="M38 38 q6 -8 16 -9" stroke="#ffffff" strokeWidth="3" opacity="0.5" {...common} />
      <Tube d={fruit} w={3.2} color="#e3ad2c" />
      <Tube d={branch} w={2.8} color="#6b8f3f" />
      <path d="M58 17 q14 -10 24 -2 q-10 10 -24 2 Z M58 17 q-14 -10 -24 -2 q10 10 24 2 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <circle cx="94" cy="88" r="11" fill="#f7d34a" stroke={INK} strokeWidth="1.2" />
      <circle cx="94" cy="88" r="8.4" fill="#fbe98c" />
      <path d="M94 80 v16 M86 88 h16 M88 82 l12 12 M100 82 l-12 12" stroke="#f7d34a" strokeWidth="0.9" {...common} />
    </Scene>
  );
}

export function Yoyo({ strokes }: StrokesProps) {
  const [finger, string] = strokes;
  return (
    <Scene label="Un yoyo au bout de sa ficelle, tenu par un doigt tendu depuis sa manche, avec des traits de mouvement" tint="#e4eefb">
      <Grass y={100} color="#d4e4c6" />
      <Tube d={string} w={1.8} color="#d9c8a4" />
      <circle cx="52" cy="76" r="17" fill="#e5535a" stroke={INK} strokeWidth="1.4" />
      <circle cx="52" cy="76" r="10" fill="#f7cf55" stroke={INK} strokeWidth="1" />
      <Star x={52} y={76} r={5.4} color="#ffffff" />
      <path d="M38 62 q4 -4 10 -5" stroke="#ffffff" strokeWidth="2.2" opacity="0.6" {...common} />
      <rect x="82" y="22" width="20" height="18" rx="4" fill="#4d7cc9" stroke={INK} strokeWidth="1.2" />
      <Tube d={finger} w={4.6} color="#f2c9a8" />
      <circle cx="57" cy="31" r="3.2" fill="#f2c9a8" stroke={INK} strokeWidth="1" />
      <path d="M28 70 q-6 6 -4 14 M76 70 q6 6 4 14" stroke="#9fb2d6" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

/* ---------- Rangée r : ra ri ru re ro ---------- */

export function Grapes({ strokes }: StrokesProps) {
  const [stem, bunch] = strokes;
  const rows: [number, number][][] = [
    [[44, 48], [56, 48], [68, 50]],
    [[38, 60], [50, 60], [62, 60], [74, 62]],
    [[44, 72], [56, 72], [68, 74]],
    [[50, 84], [62, 85]],
    [[56, 94]],
  ];
  return (
    <Scene label="Une grappe de raisins violets suspendue à sa tige, avec une feuille de vigne" tint="#efe6f7">
      <path d="M62 12 q18 0 24 12 q-10 4 -16 -2 q-2 12 -12 12 q0 -10 4 -22 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <g fill="#8a5fc0" stroke={INK} strokeWidth="1">
        {rows.flat().map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6.2" />)}
      </g>
      <g fill="#ffffff" opacity="0.6">
        {rows.flat().map(([x, y]) => <circle key={`h${x}-${y}`} cx={x - 2} cy={y - 2} r="1.4" />)}
      </g>
      <Tube d={bunch} w={2.4} color="#5a3d86" />
      <Tube d={stem} w={3} color="#6b8f3f" />
      <path d="M20 94 q8 -6 14 0 M14 84 q6 -4 10 0" stroke="#c9b6e6" strokeWidth="1.4" {...common} />
    </Scene>
  );
}

export function Curtains({ strokes }: StrokesProps) {
  const [left, right] = strokes;
  return (
    <Scene label="Une fenêtre avec deux rideaux ouverts et leurs embrasses, une barre en haut et le soleil dehors" tint="#e9eefa">
      <rect x="22" y="22" width="68" height="70" fill="#cfe7f7" stroke={INK} strokeWidth="1.3" />
      <circle cx="74" cy="40" r="7" fill="#f9d86a" />
      <path d="M22 92 q18 -16 36 -8 q18 -10 32 8 Z" fill="#a9cf8a" />
      <path d="M56 22 V92 M22 56 H90" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
      <path d="M10 18 H100" stroke="#8d6e4a" strokeWidth="3.4" {...common} />
      <circle cx="10" cy="18" r="2.6" fill="#c9a66b" stroke={INK} strokeWidth="0.8" /><circle cx="100" cy="18" r="2.6" fill="#c9a66b" stroke={INK} strokeWidth="0.8" />
      <path d="M12 20 Q30 24 40 26 Q34 60 36 96 H12 Z" fill="#e5535a" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M98 20 Q80 24 66 26 Q74 60 72 96 H98 Z" fill="#e5535a" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M20 30 q2 30 0 62 M28 28 q2 30 0 66" stroke="#b5382f" strokeWidth="1" {...common} />
      <Tube d={left} w={3.6} color="#f4a3a8" />
      <Tube d={right} w={3.6} color="#f4a3a8" />
      <path d="M12 62 q14 4 26 0 M96 62 q-14 4 -24 0" stroke="#f7cf55" strokeWidth="3" {...common} />
    </Scene>
  );
}

export function Stream({ strokes }: StrokesProps) {
  const [river] = strokes;
  return (
    <Scene label="Un ruisseau qui serpente dans la prairie jusqu'à une petite mare, avec des galets, un poisson et des fleurs" tint="#e4f1d8">
      <rect width="109" height="109" fill="#cfe5b4" />
      <path d="M0 96 Q30 84 56 92 T109 88 V109 H0 Z" fill="#b9d89a" />
      <Tube d={river} w={9} color="#7fb6e3" />
      <path d="M62 84 q8 -4 16 0 q-4 6 -16 6 Z" fill="#f08c78" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Eye cx={66} cy={85} r={0.9} />
      <path d="M44 38 q4 -3 8 0 M56 60 q4 -3 8 0" stroke="#ffffff" strokeWidth="1.4" {...common} />
      <g fill="#a9b4c6" stroke={INK} strokeWidth="0.8"><ellipse cx="22" cy="70" rx="4" ry="2.8" /><ellipse cx="88" cy="36" rx="5" ry="3.2" /><ellipse cx="92" cy="60" rx="3" ry="2.2" /></g>
      <g stroke={INK} strokeWidth="0.7">
        <circle cx="14" cy="24" r="2.6" fill="#f7b6c8" /><circle cx="22" cy="14" r="2.6" fill="#f9d86a" /><circle cx="96" cy="84" r="2.6" fill="#f7b6c8" /><circle cx="100" cy="20" r="2.6" fill="#ffffff" />
      </g>
      <path d="M14 26 v8 M22 16 v8 M96 86 v8 M100 22 v8" stroke="#4f9a4a" strokeWidth="1.2" {...common} />
    </Scene>
  );
}

export function Fox({ strokes }: StrokesProps) {
  const [front, back] = strokes;
  return (
    <Scene label="Un renard roux assis : la tête pointue aux oreilles dressées, le dos arrondi et la grande queue au bout blanc" tint="#fdeadb">
      <Grass y={96} color="#cfe3b0" />
      <path d="M40 40 Q46 28 62 30 Q82 32 92 74 Q96 80 94 86 Q70 92 50 80 Q34 70 40 40 Z" fill="#e8873c" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M94 78 q8 4 6 12 q-8 2 -12 -4 Z" fill="#ffffff" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M24 12 L28 -2 L38 8 Z M44 8 L52 -2 L56 14 Z" transform="translate(0 4)" fill="#e8873c" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 14 L40 6 L52 12 L38 36 Z" fill="#e8873c" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 14 L38 36 L50 14 Z" fill="#ffffff" opacity="0.9" />
      <Eye cx={34} cy={15} r={1.4} /><Eye cx={45} cy={15} r={1.4} />
      <circle cx="38" cy="35" r="2" fill={INK} />
      <Tube d={front} w={3.4} color="#f4b982" />
      <Tube d={back} w={3.8} color="#c8651f" />
      <path d="M46 78 v10 M60 80 v10" stroke="#4a2c1a" strokeWidth="3.6" {...common} />
      <g fill="#a9833f"><circle cx="16" cy="92" r="1.2" /><circle cx="10" cy="96" r="1" /></g>
    </Scene>
  );
}

export function Tap({ strokes }: StrokesProps) {
  const [pipe] = strokes;
  return (
    <Scene label="Un robinet : le tuyau qui descend et se courbe, la poignée en haut et une goutte d'eau qui tombe dans une flaque" tint="#e1eef8">
      <rect x="0" y="0" width="109" height="109" fill="#e8eef6" />
      <g stroke="#cfd9e8" strokeWidth="1"><path d="M0 20 H109 M0 40 H109 M0 60 H109 M0 80 H109 M18 0 V109 M54 0 V109 M90 0 V109" /></g>
      <Tube d={pipe} w={7} color="#b9c6d9" />
      <path d="M26 20 H48" stroke={INK} strokeWidth="3.4" {...common} />
      <circle cx="26" cy="20" r="3.6" fill="#e5535a" stroke={INK} strokeWidth="1.1" /><circle cx="48" cy="20" r="3.6" fill="#e5535a" stroke={INK} strokeWidth="1.1" />
      <path d="M84 70 q-4 8 0 12 q4 -4 0 -12 Z" fill="#6aa8d6" stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M84 92 q-4 -3 -8 0 M84 92 q4 -3 8 0" stroke="#6aa8d6" strokeWidth="1.4" {...common} />
      <ellipse cx="84" cy="97" rx="14" ry="3" fill="#8fc3e6" opacity="0.8" />
    </Scene>
  );
}

/* ---------- Rangée w + n : wa wo n ---------- */

export function Wheel({ strokes }: StrokesProps) {
  const [pole, rim] = strokes;
  const cabins: [number, number, string][] = [[62, 35, "#e5535a"], [86, 45, "#f7cf55"], [92, 66, "#4d7cc9"], [78, 86, "#6bb35f"], [48, 88, "#e5535a"], [38, 66, "#f7cf55"], [40, 44, "#4d7cc9"]];
  return (
    <Scene label="Une grande roue de fête foraine avec ses nacelles colorées, son mât à fanion et ses rayons" tint="#e8e2f7">
      <Grass y={98} color="#cfe3b0" />
      <path d="M64 62 L48 98 M64 62 L82 98" stroke="#8d6e4a" strokeWidth="3" {...common} />
      <g stroke="#b9a6d6" strokeWidth="1.2">
        {cabins.map(([x, y]) => <path key={`${x}-${y}`} d={`M64 62 L${x} ${y}`} />)}
      </g>
      <Tube d={rim} w={4} color="#7a68a8" />
      <circle cx="64" cy="62" r="4" fill="#f7cf55" stroke={INK} strokeWidth="1.1" />
      {cabins.map(([x, y, c]) => <rect key={`c${x}-${y}`} x={x - 4} y={y - 3} width="8" height="7" rx="2" fill={c} stroke={INK} strokeWidth="0.9" />)}
      <Tube d={pole} w={2.6} color="#8d6e4a" />
      <path d="M39 15 L52 20 L39 25 Z" fill="#e5535a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Star x={14} y={20} /><Star x={100} y={16} r={1.8} />
    </Scene>
  );
}

export function Orca({ strokes }: StrokesProps) {
  const [wave, spout, body] = strokes;
  return (
    <Scene label="Une orque qui bondit hors de l'eau en arc : le dos noir, le ventre blanc, la nageoire et des gerbes d'eau" tint="#d7e8f5">
      <Waves y={94} color="#8fbbe0" />
      <Waves y={101} color="#5f8fd6" opacity={0.85} />
      <Tube d={spout} w={2.4} color="#ffffff" edge="#6aa8d6" />
      <Tube d={wave} w={3} color="#ffffff" edge="#6aa8d6" />
      <Tube d={body} w={13} color="#1f2a3d" />
      <path d="M44 80 q10 6 24 6" stroke="#ffffff" strokeWidth="4.4" opacity="0.95" {...common} />
      <ellipse cx="76" cy="84" rx="5.4" ry="3" transform="rotate(-12 76 84)" fill="#ffffff" />
      <Eye cx={72} cy={86} r={1.4} />
      <path d="M78 36 l10 -6 l-2 8 l8 -2 l-6 8 Z" fill="#1f2a3d" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <g fill="#ffffff" stroke="#6aa8d6" strokeWidth="0.6"><circle cx="14" cy="60" r="2.4" /><circle cx="22" cy="52" r="1.8" /><circle cx="96" cy="68" r="2.4" /><circle cx="102" cy="58" r="1.6" /></g>
    </Scene>
  );
}

export function Angel({ strokes }: StrokesProps) {
  const [wing] = strokes;
  return (
    <Scene label="Un ange avec son auréole, sa robe blanche et une grande aile dont la courbe est le trait du caractère" tint="#fdf3d6">
      <path d="M60 36 q10 -6 22 0 q4 24 8 46 q-20 8 -36 0 q4 -22 6 -46 Z" fill="#ffffff" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <Tube d={wing} w={8} color="#f2f7ff" />
      <path d="M44 38 l-10 6 M40 52 l-8 8 M36 66 l-6 10" stroke="#b9c6d9" strokeWidth="1.2" {...common} />
      <circle cx="71" cy="24" r="10" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <path d="M62 22 q9 -12 18 0 q-9 -4 -18 0 Z" fill="#f7cf55" stroke={INK} strokeWidth="0.8" />
      <ellipse cx="71" cy="10" rx="11" ry="3.4" fill="none" stroke="#f7cf55" strokeWidth="2.6" />
      <Eye cx={67} cy={25} r={1.2} /><Eye cx={75} cy={25} r={1.2} />
      <path d="M68 29 q3 2 6 0" stroke={INK} strokeWidth="0.9" {...common} />
      <path d="M62 78 q-10 8 -4 16 M80 82 q10 8 4 14" stroke="#f2c9a8" strokeWidth="3.4" {...common} />
      <Star x={12} y={20} /><Star x={100} y={48} r={1.8} /><Star x={16} y={96} r={1.8} />
      <path d="M92 90 q6 -6 12 0 q-6 6 -12 0 Z" fill="#ffffff" stroke="#b9c6d9" strokeWidth="0.9" />
    </Scene>
  );
}

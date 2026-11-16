import { INK, Scene, Tube, Eye, Waves, common, type StrokesProps } from "./story-illustrations";
import { Grass, Star } from "./story-illustrations-2";

/**
 * Illustrations des katakana (a → nu) : les traits (KanjiVG, viewBox 0 0 109 109) sont des parties de l'objet.
 * Les katakana étant plus anguleux que les hiragana, les objets choisis sont plus géométriques.
 */

/* ア Arbre */
export function Tree({ strokes }: StrokesProps) {
  const [canopy, trunk] = strokes;
  return (
    <Scene label="Un arbre : le trait du haut est sa couronne de feuilles, le trait qui descend est son tronc" tint="#e3f1d8">
      <circle cx="94" cy="14" r="7" fill="#f9d86a" />
      <Grass y={94} color="#bfdca4" />
      <Tube d={trunk} w={8} color="#a07a52" />
      <g fill="#6bb35f" stroke={INK} strokeWidth="1.2">
        <circle cx="28" cy="30" r="14" /><circle cx="68" cy="30" r="14" /><circle cx="48" cy="20" r="16" /><circle cx="48" cy="38" r="14" />
      </g>
      <g fill="#6bb35f"><circle cx="28" cy="30" r="12.8" /><circle cx="68" cy="30" r="12.8" /><circle cx="48" cy="20" r="14.8" /><circle cx="48" cy="38" r="12.8" /></g>
      <Tube d={canopy} w={5} color="#3f8a45" />
      <g fill="#e5483f" stroke={INK} strokeWidth="0.7"><circle cx="34" cy="36" r="2.6" /><circle cx="60" cy="42" r="2.6" /><circle cx="52" cy="14" r="2.6" /></g>
      <path d="M20 94 q4 -6 8 0 M78 94 q4 -6 8 0" stroke="#4f9a4a" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

/* イ Ibis */
export function Ibis({ strokes }: StrokesProps) {
  const [body, leg] = strokes;
  return (
    <Scene label="Un ibis rose debout sur une patte : le corps penché et la patte verticale, avec son long bec courbe" tint="#e0eef7">
      <Waves y={92} color="#a9d3ea" />
      <Waves y={99} color="#7fb6cb" opacity={0.85} />
      <Tube d={leg} w={3} color="#e58b6a" />
      <path d="M62 14 q16 -2 26 10" stroke={INK} strokeWidth="5.6" {...common} />
      <path d="M62 14 q16 -2 26 10" stroke="#e58b6a" strokeWidth="3" {...common} />
      <Tube d={body} w={9} color="#f2a0a8" />
      <circle cx="68" cy="16" r="6" fill="#f2a0a8" stroke={INK} strokeWidth="1.3" />
      <Eye cx={69} cy={14.5} r={1.4} />
      <path d="M14 70 q10 4 18 -6" stroke="#d9606c" strokeWidth="4" {...common} />
      <path d="M12 96 v-12 M18 96 v-16 M88 96 v-14 M94 96 v-10" stroke="#6b8f3f" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

/* ウ Usine */
export function Factory({ strokes }: StrokesProps) {
  const [chimney, wall, roof] = strokes;
  return (
    <Scene label="Une usine avec sa cheminée qui fume, son mur et son grand toit" tint="#e6e9f2">
      <Grass y={94} color="#cfd6e2" />
      <rect x="22" y="50" width="66" height="44" fill="#d8b49a" stroke={INK} strokeWidth="1.3" />
      <rect x="48" y="12" width="12" height="40" fill="#b5382f" stroke={INK} strokeWidth="1.3" />
      <path d="M30 70 h12 M48 70 h12 M66 70 h12" stroke="#f9e7a8" strokeWidth="7" {...common} />
      <Tube d={chimney} w={6} color="#8d4a30" />
      <Tube d={wall} w={4} color="#8e9bb0" />
      <Tube d={roof} w={4.4} color="#6f7e99" />
      <g fill="#ffffff" stroke="#9aa9c4" strokeWidth="0.8"><circle cx="58" cy="8" r="5" /><circle cx="66" cy="3" r="4" /><circle cx="74" cy="8" r="3" /></g>
      <rect x="62" y="78" width="12" height="16" fill="#6b4226" stroke={INK} strokeWidth="1" />
    </Scene>
  );
}

/* エ Étagère */
export function Shelf({ strokes }: StrokesProps) {
  const [top, post, bottom] = strokes;
  return (
    <Scene label="Une étagère : deux planches horizontales reliées par un montant, avec des livres, un vase et une plante" tint="#f1e6d6">
      <Tube d={post} w={5} color="#a9794a" />
      <Tube d={top} w={5} color="#c49a62" />
      <Tube d={bottom} w={5} color="#c49a62" />
      {[["#e5535a", 36, 20], ["#4d7cc9", 42, 16], ["#6bb35f", 48, 22]].map(([c, x, h]) => (
        <rect key={String(x)} x={Number(x)} y={33 - Number(h)} width="5" height={Number(h)} fill={String(c)} stroke={INK} strokeWidth="0.9" />
      ))}
      <path d="M62 31 q-3 -8 3 -14 q6 6 3 14 Z" fill="#6bb35f" stroke={INK} strokeWidth="0.9" />
      <rect x="60" y="29" width="10" height="4" fill="#c9693f" stroke={INK} strokeWidth="0.9" />
      <path d="M28 72 q-2 -10 6 -14 q8 4 6 14 Z" fill="#7fb6e3" stroke={INK} strokeWidth="1" />
      <circle cx="76" cy="66" r="6" fill="#f7cf55" stroke={INK} strokeWidth="1" />
      <path d="M10 56 v40 M99 56 v40" stroke="#d8c7ac" strokeWidth="1.2" />
    </Scene>
  );
}

/* オ Ombrelle */
export function Parasol({ strokes }: StrokesProps) {
  const [edge, handle, rib] = strokes;
  return (
    <Scene label="Une ombrelle ouverte : le bord de la toile, le manche à crochet et une baleine, avec la pluie qui tombe" tint="#dde8f7">
      <path d="M18 38 Q56 -8 94 36 Z" fill="#e5535a" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M56 8 Q40 22 38 38 M56 8 Q72 22 74 38" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      <Tube d={handle} w={3.6} color="#8d6e4a" />
      <Tube d={edge} w={3.6} color="#b5382f" />
      <Tube d={rib} w={2.8} color="#f4a3a8" />
      <path d="M12 62 l-3 8 M28 78 l-3 8 M84 62 l-3 8 M96 80 l-3 8 M74 86 l-3 8 M18 92 l-3 8" stroke="#5f8fd6" strokeWidth="1.8" {...common} />
    </Scene>
  );
}

/* カ Canard */
export function Duck({ strokes }: StrokesProps) {
  const [wing, neck] = strokes;
  return (
    <Scene label="Un canard jaune : le long trait est son cou et son dos, le trait courbé est son aile, avec son bec orange" tint="#dcecf7">
      <Waves y={88} color="#8fbbe0" />
      <Waves y={96} color="#5f8fd6" opacity={0.8} />
      <ellipse cx="50" cy="62" rx="30" ry="18" fill="#f7d34a" stroke={INK} strokeWidth="1.4" />
      <Tube d={neck} w={8} color="#f7d34a" />
      <circle cx="58" cy="18" r="9" fill="#f7d34a" stroke={INK} strokeWidth="1.4" />
      <path d="M65 16 l14 3 l-14 5 Z" fill="#f08a3c" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Eye cx={60} cy={15} r={1.6} />
      <Tube d={wing} w={4.4} color="#e3ad2c" />
      <path d="M78 58 q12 -4 14 -12" stroke="#f7d34a" strokeWidth="5" {...common} />
    </Scene>
  );
}

/* キ Kiosque */
export function Kiosk({ strokes }: StrokesProps) {
  const [roof, counter, pole] = strokes;
  return (
    <Scene label="Un kiosque : le toit rayé, le comptoir en travers et le mât central avec son fanion" tint="#fdeedb">
      <Grass y={94} color="#d9e4c4" />
      <path d="M22 45 L52 24 L86 30 L84 38 Z" fill="#e5535a" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M36 35 L40 27 M52 31 L56 25 M68 34 L72 28" stroke="#ffffff" strokeWidth="3" {...common} />
      <path d="M24 68 L88 55 V94 H24 Z" fill="#f3e3c8" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <Tube d={counter} w={4.4} color="#a07a52" />
      <Tube d={roof} w={3.4} color="#b5382f" />
      <Tube d={pole} w={3} color="#8d6e4a" />
      <path d="M50 16 L66 11 L50 6 Z" fill="#4d7cc9" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <g stroke={INK} strokeWidth="0.8"><rect x="32" y="74" width="8" height="10" fill="#f7cf55" /><rect x="64" y="70" width="8" height="12" fill="#6bb35f" /></g>
    </Scene>
  );
}

/* ク Cuillère */
export function Spoon({ strokes }: StrokesProps) {
  const [shine, handle] = strokes;
  return (
    <Scene label="Une grande cuillère : la cuiller en haut, le manche qui descend en courbe, et un reflet" tint="#fbe9ee">
      <ellipse cx="54" cy="88" rx="38" ry="9" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
      <Tube d={handle} w={6} color="#cfd6e2" />
      <ellipse cx="58" cy="30" rx="13" ry="9" transform="rotate(25 58 30)" fill="#e0e6ef" stroke={INK} strokeWidth="1.3" />
      <ellipse cx="58" cy="31" rx="9" ry="5.6" transform="rotate(25 58 31)" fill="#f2a93b" />
      <Tube d={shine} w={2.4} color="#ffffff" edge="#9aa9c4" />
      <g fill="#e5535a" stroke={INK} strokeWidth="0.8"><circle cx="84" cy="74" r="4" /><circle cx="24" cy="76" r="3" /></g>
    </Scene>
  );
}

/* ケ Kangourou */
export function Kangaroo({ strokes }: StrokesProps) {
  const [arm, tail, leg] = strokes;
  return (
    <Scene label="Un kangourou qui bondit : le bras avancé, la grande queue et la patte arrière puissante" tint="#fbe6d2">
      <circle cx="90" cy="16" r="9" fill="#f08a3c" />
      <Grass y={94} color="#e7c88f" />
      <ellipse cx="56" cy="52" rx="16" ry="22" fill="#d8955a" stroke={INK} strokeWidth="1.4" />
      <path d="M46 56 q10 8 20 0 q-2 10 -10 10 q-8 0 -10 -10 Z" fill="#f1c99a" stroke={INK} strokeWidth="1" />
      <circle cx="46" cy="22" r="9" fill="#d8955a" stroke={INK} strokeWidth="1.4" />
      <path d="M40 14 l-4 -12 l8 8 Z M52 14 l4 -12 l-2 12 Z" fill="#d8955a" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
      <Eye cx={44} cy={21} r={1.5} /><circle cx="38.5" cy="25" r="1.8" fill={INK} />
      <Tube d={leg} w={8} color="#c47c3f" />
      <Tube d={tail} w={7} color="#c47c3f" />
      <Tube d={arm} w={4.4} color="#d8955a" />
    </Scene>
  );
}

/* コ Coffre */
export function Chest({ strokes }: StrokesProps) {
  const [lidSide, base] = strokes;
  return (
    <Scene label="Un coffre au trésor : le couvercle et le côté forment le haut du coffre, la planche du bas le ferme, des pièces d'or dedans" tint="#ece6f4">
      <Grass y={94} color="#e7d9b8" />
      <rect x="30" y="38" width="46" height="36" fill="#a9794a" stroke={INK} strokeWidth="1.3" />
      <path d="M30 56 H76 M42 38 V74 M64 38 V74" stroke="#7a5a3a" strokeWidth="1.2" />
      <g fill="#f7cf55" stroke={INK} strokeWidth="0.8"><circle cx="20" cy="64" r="5" /><circle cx="14" cy="76" r="5" /><circle cx="25" cy="78" r="5" /><circle cx="86" cy="82" r="5" /></g>
      <circle cx="20" cy="50" r="4" fill="#4d7cc9" stroke={INK} strokeWidth="0.9" /><circle cx="26" cy="44" r="3" fill="#e5535a" stroke={INK} strokeWidth="0.9" />
      <Tube d={lidSide} w={5} color="#c9a05f" />
      <Tube d={base} w={5} color="#c9a05f" />
      <rect x="49" y="54" width="8" height="10" rx="1.5" fill="#f7cf55" stroke={INK} strokeWidth="1" />
      <Star x={90} y={20} r={4} />
    </Scene>
  );
}

/* サ Sapin */
export function Fir({ strokes }: StrokesProps) {
  const [garland, candle, trunk] = strokes;
  return (
    <Scene label="Un sapin de Noël : le long tronc, une guirlande en travers et une bougie, avec ses boules colorées" tint="#dde9f6">
      <Grass y={96} color="#ffffff" />
      <g fill="#3f8a45" stroke={INK} strokeWidth="1.2" strokeLinejoin="round">
        <path d="M70 6 L38 40 H102 Z" /><path d="M70 26 L30 62 H110 Z" /><path d="M70 46 L22 84 H118 Z" />
      </g>
      <Tube d={trunk} w={5} color="#8d6e4a" />
      <Tube d={garland} w={3.2} color="#f7cf55" />
      <Tube d={candle} w={3.6} color="#e5535a" />
      <path d="M37 18 q-3 -5 0 -8 q3 3 0 8 Z" fill="#f2a93b" />
      <g stroke={INK} strokeWidth="0.8"><circle cx="30" cy="56" r="3.4" fill="#e5535a" /><circle cx="84" cy="50" r="3.4" fill="#4d7cc9" /><circle cx="56" cy="30" r="3.4" fill="#f7cf55" /><circle cx="86" cy="70" r="3.4" fill="#e5535a" /></g>
      <Star x={70} y={5} r={4.4} />
    </Scene>
  );
}

/* シ Chimpanzé */
export function Chimp({ strokes }: StrokesProps) {
  const [eye1, eye2, grin] = strokes;
  return (
    <Scene label="Un chimpanzé hilare : les deux petits traits sont ses yeux, le grand trait est son énorme sourire" tint="#f3e8d8">
      <circle cx="14" cy="52" r="10" fill="#8d5f3a" stroke={INK} strokeWidth="1.3" /><circle cx="14" cy="52" r="5" fill="#e8c9a0" />
      <circle cx="96" cy="52" r="10" fill="#8d5f3a" stroke={INK} strokeWidth="1.3" /><circle cx="96" cy="52" r="5" fill="#e8c9a0" />
      <circle cx="55" cy="54" r="38" fill="#8d5f3a" stroke={INK} strokeWidth="1.4" />
      <ellipse cx="60" cy="72" rx="26" ry="20" fill="#e8c9a0" stroke={INK} strokeWidth="1.1" />
      <ellipse cx="48" cy="46" rx="20" ry="14" fill="#e8c9a0" opacity="0.9" />
      <Tube d={grin} w={4.4} color="#e5535a" />
      <Tube d={eye1} w={3.4} color="#2d3550" />
      <Tube d={eye2} w={3.4} color="#2d3550" />
      <circle cx="74" cy="62" r="1.6" fill={INK} /><circle cx="82" cy="62" r="1.6" fill={INK} />
      <path d="M94 96 q10 -2 12 -12 q-8 0 -14 8 Z" fill="#f7d34a" stroke={INK} strokeWidth="1" />
    </Scene>
  );
}

/* ス Super-héros */
export function Hero({ strokes }: StrokesProps) {
  const [cape, leg] = strokes;
  return (
    <Scene label="Un super-héros en plein vol : la cape rouge qui flotte, la jambe tendue et le poing en avant" tint="#dce6f8">
      <path d="M0 98 V80 h8 V70 h10 V84 h8 V62 h10 V86 h8 V74 h12 V98 Z M80 98 V78 h8 V66 h10 V82 h11 V98 Z" fill="#b9c6e0" />
      <Tube d={cape} w={9} color="#e5535a" />
      <Tube d={leg} w={6} color="#4d7cc9" />
      <circle cx="26" cy="24" r="8" fill="#f2c9a8" stroke={INK} strokeWidth="1.4" />
      <path d="M18 22 q8 -4 16 0 v4 q-8 2 -16 0 Z" fill="#2d3550" />
      <Eye cx={23} cy={24} r={1} /><Eye cx={30} cy={24} r={1} />
      <path d="M32 40 l-12 10" stroke="#f2c9a8" strokeWidth="5" {...common} />
      <circle cx="18" cy="52" r="4.4" fill="#f2c9a8" stroke={INK} strokeWidth="1.1" />
      <Star x={50} y={14} r={4} /><Star x={94} y={24} r={3} />
    </Scene>
  );
}

/* セ Seau */
export function Bucket({ strokes }: StrokesProps) {
  const [rim, handle] = strokes;
  return (
    <Scene label="Un seau à la plage : le bord, l'anse qui se lève et le fond rempli de sable, avec une pelle" tint="#fdf0d6">
      <Grass y={94} color="#f1dcae" />
      <path d="M22 52 H72 L66 92 H30 Z" fill="#4d9bd6" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M26 68 H70" stroke="#ffffff" strokeWidth="2.4" opacity="0.7" {...common} />
      <Tube d={handle} w={3} color="#cfd6e2" />
      <Tube d={rim} w={4.4} color="#2d78b8" />
      <path d="M20 54 q12 -4 24 -2" stroke="#f1dcae" strokeWidth="3.4" {...common} />
      <path d="M82 70 l12 -22" stroke="#e5535a" strokeWidth="4" {...common} />
      <path d="M86 52 l12 6 l-6 8 l-10 -4 Z" fill="#e5535a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
    </Scene>
  );
}

/* ソ Sauterelle */
export function Grasshopper({ strokes }: StrokesProps) {
  const [antenna, hindLeg] = strokes;
  return (
    <Scene label="Une sauterelle verte : l'antenne en haut à gauche et la grande patte arrière repliée prête à sauter" tint="#e6f2d4">
      <Grass y={92} color="#a9d08a" />
      <path d="M8 92 l-2 -16 M16 92 l2 -20 M96 92 l-2 -18 M102 92 l2 -14" stroke="#6b8f3f" strokeWidth="1.8" {...common} />
      <ellipse cx="58" cy="58" rx="26" ry="8.4" transform="rotate(14 58 58)" fill="#8fc45a" stroke={INK} strokeWidth="1.3" />
      <path d="M44 52 q22 -10 48 10 q-24 -2 -48 -10 Z" fill="#b8dc86" stroke={INK} strokeWidth="1" />
      <circle cx="33" cy="48" r="8" fill="#8fc45a" stroke={INK} strokeWidth="1.3" />
      <Eye cx={30} cy={46} r={2} />
      <Tube d={antenna} w={2} color="#4f7d2a" />
      <Tube d={hindLeg} w={4.4} color="#5a8f2f" />
      <path d="M42 64 l-8 12 M52 66 l-4 14" stroke="#5a8f2f" strokeWidth="2.6" {...common} />
    </Scene>
  );
}

/* タ Taureau */
export function Bull({ strokes }: StrokesProps) {
  const [horn, back, ear] = strokes;
  return (
    <Scene label="Un taureau vu de profil : la corne dressée, le dos puissant qui descend vers l'arrière-train et l'oreille" tint="#f6e4d6">
      <Grass y={94} color="#d9c48e" />
      <ellipse cx="58" cy="62" rx="30" ry="20" fill="#8d4a30" stroke={INK} strokeWidth="1.4" />
      <circle cx="30" cy="62" r="13" fill="#8d4a30" stroke={INK} strokeWidth="1.4" />
      <ellipse cx="22" cy="70" rx="6" ry="5" fill="#e8c9a0" stroke={INK} strokeWidth="1" />
      <Eye cx={28} cy={58} r={1.8} />
      <Tube d={back} w={5} color="#6b3a24" />
      <Tube d={horn} w={4} color="#fbf3d9" />
      <Tube d={ear} w={3.4} color="#a8602f" />
      <path d="M44 84 v10 M54 86 v8 M72 86 v8 M84 82 v12" stroke="#4a2c1a" strokeWidth="4" {...common} />
    </Scene>
  );
}

/* チ Champion */
export function Champion({ strokes }: StrokesProps) {
  const [flag, arms, body] = strokes;
  return (
    <Scene label="Un champion sur son podium, les bras grands ouverts : le trait horizontal est ses bras, le trait vertical son corps, avec un fanion" tint="#fdf0d0">
      <path d="M28 92 H58 V100 H28 Z M58 86 H88 V100 H58 Z" fill="#c9a05f" stroke={INK} strokeWidth="1.2" />
      <Tube d={body} w={7} color="#4d7cc9" />
      <Tube d={arms} w={5} color="#f2c9a8" />
      <circle cx="55" cy="22" r="8" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <path d="M48 20 q7 -8 14 0 q-7 -3 -14 0 Z" fill="#5b3b25" />
      <Eye cx={52} cy={23} r={1} /><Eye cx={58} cy={23} r={1} />
      <path d="M52 27 q3 3 6 0" stroke={INK} strokeWidth="0.9" {...common} />
      <circle cx="56" cy="44" r="4" fill="#f7cf55" stroke={INK} strokeWidth="1" />
      <Tube d={flag} w={2.6} color="#e5535a" />
      <path d="M26 66 q-6 10 4 20 M86 66 q6 10 -4 20" stroke="#6bb35f" strokeWidth="2.6" {...common} />
      <Star x={14} y={14} /><Star x={96} y={16} />
    </Scene>
  );
}

/* ツ Tulipe */
export function Tulip({ strokes }: StrokesProps) {
  const [bud1, bud2, stem] = strokes;
  return (
    <Scene label="Une tulipe rouge au bout de sa tige courbe, entourée de deux petits boutons" tint="#fde6ee">
      <Grass y={96} color="#cfe3b0" />
      <Tube d={stem} w={4} color="#4f9a4a" />
      <path d="M72 30 q-10 -10 -2 -22 l8 8 l8 -8 q8 12 -2 22 q-6 6 -12 0 Z" fill="#e5483f" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M52 76 q-20 -4 -24 -20 q18 0 24 20 Z" fill="#6bb35f" stroke={INK} strokeWidth="1" />
      <Tube d={bud1} w={5} color="#f06a8a" />
      <Tube d={bud2} w={5} color="#f7cf55" />
      <path d="M22 44 q-6 -2 -4 -8 M46 40 q-6 -2 -4 -8" stroke="#4f9a4a" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

/* テ Table */
export function Table({ strokes }: StrokesProps) {
  const [lamp, top, leg] = strokes;
  return (
    <Scene label="Une table ronde avec un vase de fleurs, sous une lampe suspendue : la lampe, le plateau et le pied courbe" tint="#f4ead8">
      <path d="M0 96 H109 V112 H0 Z" fill="#d9c0a0" />
      <path d="M56 0 V20" stroke="#8d6e4a" strokeWidth="1.4" />
      <path d="M38 22 L74 22 L68 8 H44 Z" fill="#f7cf55" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" opacity="0.9" />
      <Tube d={leg} w={5} color="#a07a52" />
      <Tube d={top} w={6} color="#c49a62" />
      <Tube d={lamp} w={3.2} color="#e3ad2c" />
      <path d="M74 34 l-4 -2 M30 34 l-4 -2" stroke="#f9e7a8" strokeWidth="1.6" {...common} />
      <path d="M52 40 v-10 M60 40 v-14" stroke="#4f9a4a" strokeWidth="1.6" {...common} />
      <circle cx="52" cy="28" r="4" fill="#e5535a" stroke={INK} strokeWidth="0.8" /><circle cx="60" cy="24" r="4" fill="#f7cf55" stroke={INK} strokeWidth="0.8" />
      <rect x="49" y="35" width="14" height="6" rx="1.5" fill="#7fb6e3" stroke={INK} strokeWidth="1" />
    </Scene>
  );
}

/* ト Totem */
export function Totem({ strokes }: StrokesProps) {
  const [pole, wing] = strokes;
  return (
    <Scene label="Un totem : le grand poteau sculpté de visages empilés, avec une aile déployée" tint="#f1e8d6">
      <Grass y={96} color="#d9c9a0" />
      <Tube d={pole} w={13} color="#b5784a" />
      <g stroke={INK} strokeWidth="1">
        <circle cx="45" cy="26" r="7" fill="#f7cf55" /><circle cx="46" cy="52" r="7" fill="#e5535a" /><circle cx="46" cy="78" r="7" fill="#4d7cc9" />
      </g>
      <Eye cx={42} cy={25} r={1.6} /><Eye cx={48} cy={25} r={1.6} /><Eye cx={43} cy={51} r={1.6} /><Eye cx={49} cy={51} r={1.6} /><Eye cx={43} cy={77} r={1.6} /><Eye cx={49} cy={77} r={1.6} />
      <path d="M43 31 l2 6 l2 -6 Z M43 57 l2 6 l2 -6 Z" fill="#f08a3c" stroke={INK} strokeWidth="0.8" strokeLinejoin="round" />
      <Tube d={wing} w={5} color="#2d78b8" />
      <path d="M72 56 l8 8 M70 62 l6 10" stroke="#6aa8d6" strokeWidth="2" {...common} />
      <path d="M24 12 l-6 6 l10 2 Z" fill="#f7cf55" stroke={INK} strokeWidth="0.8" />
    </Scene>
  );
}

/* ナ Nageur */
export function Swimmer({ strokes }: StrokesProps) {
  const [rope, body] = strokes;
  return (
    <Scene label="Un nageur dans une piscine : le trait horizontal est la ligne d'eau, le trait vertical son corps qui plonge" tint="#d9ecf8">
      <rect y="30" width="109" height="80" fill="#8fc3e6" opacity="0.7" />
      <Waves y={30} color="#6aa8d6" opacity={0.8} />
      <Tube d={body} w={7} color="#f2c9a8" />
      <circle cx="53" cy="16" r="7" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <path d="M46 14 q7 -9 14 0 Z" fill="#e5535a" stroke={INK} strokeWidth="0.8" />
      <rect x="47" y="15" width="12" height="3.6" rx="1.6" fill="#2d3550" />
      <Tube d={rope} w={3.2} color="#e5535a" />
      {[26, 38, 50, 62, 74, 86].map((x) => <circle key={x} cx={x} cy={x % 24 === 2 ? 42 : 40} r="2.6" fill="#ffffff" stroke={INK} strokeWidth="0.6" />)}
      <g fill="none" stroke="#ffffff" strokeWidth="1.2"><circle cx="76" cy="66" r="3" /><circle cx="84" cy="58" r="2" /><circle cx="22" cy="86" r="2.6" /></g>
    </Scene>
  );
}

/* ニ Niveau */
export function Level({ strokes }: StrokesProps) {
  const [ruler, level] = strokes;
  return (
    <Scene label="Un niveau à bulle posé sous une règle : deux barres horizontales, la longue avec sa fiole et sa bulle verte" tint="#f1e9d0">
      <rect width="109" height="109" fill="#e9e0c6" />
      <Tube d={level} w={11} color="#f2c24a" />
      <rect x="44" y="68" width="24" height="12" rx="6" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
      <ellipse cx="56" cy="74" rx="4.6" ry="3.4" fill="#6bb35f" stroke={INK} strokeWidth="0.8" />
      <path d="M56 68 v12" stroke="#c9d3e3" strokeWidth="0.6" />
      <Tube d={ruler} w={6} color="#cfd6e2" />
      <path d="M36 28 v4 M42 28 v6 M48 28 v4 M54 28 v6 M60 28 v4 M66 28 v6 M72 28 v4" stroke={INK} strokeWidth="0.9" />
      <path d="M92 52 l12 -12 l4 4 l-12 12 Z" fill="#f08a3c" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
    </Scene>
  );
}

/* ヌ Nœud */
export function Bowtie({ strokes }: StrokesProps) {
  const [loop, tail] = strokes;
  return (
    <Scene label="Un cadeau noué d'un gros nœud : la grande boucle de ruban et la queue qui la croise" tint="#fbe6ee">
      <rect x="14" y="62" width="82" height="36" fill="#7fb6e3" stroke={INK} strokeWidth="1.3" />
      <rect x="14" y="62" width="82" height="9" fill="#5f9cd0" stroke={INK} strokeWidth="1.3" />
      <path d="M55 62 V98" stroke="#f7cf55" strokeWidth="7" {...common} />
      <Tube d={loop} w={7} color="#e5535a" />
      <Tube d={tail} w={6} color="#f06a8a" />
      <circle cx="60" cy="52" r="5" fill="#b5382f" stroke={INK} strokeWidth="1.2" />
      <Star x={90} y={20} r={4} color="#f7cf55" /><Star x={16} y={30} r={3} color="#ffffff" />
    </Scene>
  );
}

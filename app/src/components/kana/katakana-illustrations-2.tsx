import { INK, Scene, Tube, Eye, Waves, common, type StrokesProps } from "./story-illustrations";
import { Grass, Star } from "./story-illustrations-2";

/** Illustrations des katakana (ne → n). Suite de katakana-illustrations-1.tsx. */

/* ネ Neige */
export function Snow({ strokes }: StrokesProps) {
  const [tip, bough, trunk, bough2] = strokes;
  return (
    <Scene label="Un pin sous la neige : le tronc, deux branches chargées de neige et la cime, avec des flocons qui tombent" tint="#dbe8f6">
      <path d="M0 94 Q30 84 56 92 T109 90 V112 H0 Z" fill="#ffffff" />
      <Tube d={trunk} w={7} color="#8d6e4a" />
      <Tube d={bough} w={5} color="#3f8a45" />
      <Tube d={bough2} w={5} color="#3f8a45" />
      <Tube d={tip} w={4} color="#3f8a45" />
      <path d="M26 36 q20 -8 42 2" stroke="#ffffff" strokeWidth="2.6" {...common} />
      <path d="M68 54 q12 2 20 14" stroke="#ffffff" strokeWidth="2.6" {...common} />
      <g fill="#ffffff" stroke="#9fb2d6" strokeWidth="0.8">
        {[[12, 16], [30, 10], [82, 14], [96, 40], [14, 56], [96, 62], [40, 70], [76, 82]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" />)}
      </g>
    </Scene>
  );
}

/* ノ Nord */
export function Compass({ strokes }: StrokesProps) {
  const [needle] = strokes;
  return (
    <Scene label="Une boussole : le cadran rond et son aiguille rouge, qui indique le nord" tint="#e5ebf5">
      <circle cx="52" cy="56" r="40" fill="#f3e3c8" stroke={INK} strokeWidth="1.6" />
      <circle cx="52" cy="56" r="34" fill="#ffffff" stroke="#8d6e4a" strokeWidth="1.4" />
      <g stroke={INK} strokeWidth="1.2"><path d="M52 24 v6 M52 82 v6 M20 56 h6 M78 56 h6" /></g>
      <g stroke="#9aa9c4" strokeWidth="0.8">
        <path d="M28 32 l4 4 M76 32 l-4 4 M28 80 l4 -4 M76 80 l-4 -4" />
      </g>
      <Tube d={needle} w={5.4} color="#e5535a" />
      <path d="M58 62 L30 88" stroke="#8e9bb0" strokeWidth="3.4" {...common} />
      <circle cx="52" cy="56" r="3.2" fill="#f7cf55" stroke={INK} strokeWidth="1" />
      <circle cx="92" cy="14" r="5" fill="#8d6e4a" stroke={INK} strokeWidth="1" />
    </Scene>
  );
}

/* ハ Hangar */
export function Barn({ strokes }: StrokesProps) {
  const [left, right] = strokes;
  return (
    <Scene label="Un hangar à toit pentu : les deux pans du toit forment un grand « A » ouvert, avec une grande porte" tint="#f3e6d6">
      <Grass y={92} color="#cfe0b0" />
      <path d="M14 92 V62 L55 30 L96 62 V92 Z" fill="#b5382f" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="38" y="62" width="34" height="30" fill="#8d2a22" stroke={INK} strokeWidth="1.2" />
      <path d="M38 62 L72 92 M72 62 L38 92" stroke="#f3e3c8" strokeWidth="2.4" />
      <Tube d={left} w={5} color="#8d6e4a" />
      <Tube d={right} w={5} color="#8d6e4a" />
      <circle cx="55" cy="48" r="5" fill="#f3e3c8" stroke={INK} strokeWidth="1.1" />
      <g fill="#e8c96a" stroke={INK} strokeWidth="0.8"><ellipse cx="88" cy="90" rx="8" ry="5" /><ellipse cx="100" cy="92" rx="6" ry="4" /></g>
    </Scene>
  );
}

/* ヒ Hippocampe */
export function Seahorse({ strokes }: StrokesProps) {
  const [weed, body] = strokes;
  return (
    <Scene label="Un hippocampe : le long corps vertical qui finit en queue enroulée vers la droite, près d'une algue" tint="#d6ecf4">
      <Waves y={96} color="#8fc3e6" opacity={0.8} />
      <Tube d={weed} w={3.2} color="#4f9a4a" />
      <Tube d={body} w={9} color="#f2a93b" />
      <path d="M31 18 q14 -4 20 4 l-4 4 q-8 -4 -16 -2 Z" fill="#f2a93b" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <Eye cx={36} cy={22} r={1.8} />
      <path d="M40 36 q16 6 6 22 M30 40 l-10 6 l10 4" stroke="#e5707f" strokeWidth="2.4" {...common} />
      <path d="M82 70 q8 2 6 10 q-6 4 -10 0" stroke="#f2a93b" strokeWidth="3" {...common} />
      <g fill="none" stroke="#ffffff" strokeWidth="1.2"><circle cx="58" cy="30" r="3" /><circle cx="66" cy="20" r="2" /><circle cx="90" cy="40" r="3.4" /></g>
    </Scene>
  );
}

/* フ Fouet */
export function Whisk({ strokes }: StrokesProps) {
  const [wire] = strokes;
  return (
    <Scene label="Un fouet de cuisine : une grande boucle de fil métallique au bout d'un manche, au-dessus d'un bol de pâte" tint="#fdf0d8">
      <path d="M14 78 H96 Q92 100 55 100 Q18 100 14 78 Z" fill="#ffffff" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <ellipse cx="55" cy="78" rx="41" ry="6" fill="#f7e29a" stroke={INK} strokeWidth="1.2" />
      <path d="M32 40 C 40 36, 70 40, 70 40 C 66 62, 46 80, 32 86" stroke="#b6c0d2" strokeWidth="1.6" {...common} />
      <path d="M32 40 C 46 38, 74 52, 56 80" stroke="#b6c0d2" strokeWidth="1.6" {...common} />
      <Tube d={wire} w={2.8} color="#dde4ef" />
      <path d="M25 30 L12 12" stroke={INK} strokeWidth="7" {...common} />
      <path d="M25 30 L12 12" stroke="#e5535a" strokeWidth="4.6" {...common} />
      <g fill="#f7e29a" stroke={INK} strokeWidth="0.7"><circle cx="82" cy="70" r="2" /><circle cx="90" cy="64" r="1.4" /></g>
    </Scene>
  );
}

/* ヘ Hennin */
export function Hennin({ strokes }: StrokesProps) {
  const [veil] = strokes;
  return (
    <Scene label="Une princesse au grand chapeau pointu, le hennin, avec son voile qui flotte vers la droite" tint="#f1e6f7">
      <path d="M70 100 V70 h8 V60 h10 V74 h8 V100 Z" fill="#c9b6e6" />
      <Tube d={veil} w={5} color="#f7a8c8" />
      <path d="M14 48 L36 34 L36 56 Z" fill="#f7a8c8" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="36" cy="66" r="14" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <path d="M22 62 q14 -14 28 0 q-14 -4 -28 0 Z" fill="#f0c04a" stroke={INK} strokeWidth="0.8" />
      <Eye cx={31} cy={68} r={1.4} /><Eye cx={41} cy={68} r={1.4} />
      <path d="M32 74 q4 3 8 0" stroke={INK} strokeWidth="1" {...common} />
      <circle cx="14" cy="48" r="2.4" fill="#f7cf55" stroke={INK} strokeWidth="0.8" />
      <Star x={90} y={18} r={3.4} />
    </Scene>
  );
}

/* ホ Hockey */
export function Hockey({ strokes }: StrokesProps) {
  const [goal, stick, speedL, speedR] = strokes;
  return (
    <Scene label="Du hockey sur glace : la crosse verticale qui pousse le palet vers un but, avec des traces de patins" tint="#dcecf8">
      <path d="M0 96 H109 V112 H0 Z" fill="#ffffff" />
      <g stroke="#9fc8e8" strokeWidth="1"><path d="M10 100 Q50 94 100 102" fill="none" /></g>
      <Tube d={goal} w={4} color="#e5535a" />
      <path d="M26 42 L22 28 M40 41 L38 28 M54 40 L54 28 M68 39 L70 28 M82 38 L86 28" stroke="#cfd6e2" strokeWidth="1.2" />
      <Tube d={stick} w={5} color="#c49a62" />
      <Tube d={speedL} w={2.4} color="#8fc3e6" edge="#6aa8d6" />
      <Tube d={speedR} w={2.4} color="#8fc3e6" edge="#6aa8d6" />
      <ellipse cx="34" cy="92" rx="7" ry="3.2" fill="#2d3550" stroke={INK} strokeWidth="1" />
      <path d="M45 86 q-12 2 -14 6" stroke="#c49a62" strokeWidth="3" {...common} />
    </Scene>
  );
}

/* マ Marteau */
export function Hammer({ strokes }: StrokesProps) {
  const [head, handle] = strokes;
  return (
    <Scene label="Un marteau : la lourde tête métallique horizontale et son manche en bois qui descend en biais, au-dessus d'un clou" tint="#efe6da">
      <rect y="84" width="109" height="28" fill="#c49a62" />
      <path d="M0 92 H109" stroke="#a9794a" strokeWidth="1.2" />
      <Tube d={handle} w={6} color="#a9794a" />
      <Tube d={head} w={10} color="#8e9bb0" />
      <path d="M30 31 l-12 10 l8 4 l12 -8 Z" fill="#8e9bb0" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M78 36 v40" stroke="#6f7e99" strokeWidth="3" {...common} />
      <path d="M74 76 h8" stroke="#6f7e99" strokeWidth="2" {...common} />
      <path d="M88 24 l6 -6 M92 32 l8 -2" stroke="#f7cf55" strokeWidth="2" {...common} />
    </Scene>
  );
}

/* ミ Mille-feuille */
export function Millefeuille({ strokes }: StrokesProps) {
  const [icing, cream, pastry] = strokes;
  return (
    <Scene label="Un mille-feuille : trois couches superposées, le glaçage rose, la crème et la pâte feuilletée, sur une assiette" tint="#fdeef0">
      <ellipse cx="55" cy="96" rx="46" ry="8" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
      <Tube d={pastry} w={10} color="#e3b369" />
      <Tube d={cream} w={9} color="#fff3c8" />
      <Tube d={icing} w={9} color="#f7a8c8" />
      <path d="M46 20 l16 6 M46 24 l16 6" stroke="#6b4226" strokeWidth="1.2" {...common} />
      <circle cx="30" cy="22" r="6" fill="#e5483f" stroke={INK} strokeWidth="1.1" />
      <path d="M30 16 l2 -5" stroke="#4f9a4a" strokeWidth="1.6" {...common} />
      <path d="M86 70 l12 -10 M92 74 l12 -10" stroke="#cfd6e2" strokeWidth="2" {...common} />
    </Scene>
  );
}

/* ム Mouette */
export function Gull({ strokes }: StrokesProps) {
  const [wing, leg] = strokes;
  return (
    <Scene label="Une mouette perchée sur un rocher : son aile triangulaire et sa patte orange" tint="#dcecf8">
      <Waves y={94} color="#8fbbe0" />
      <path d="M52 100 Q60 74 90 76 Q106 84 106 100 Z" fill="#8e9bb0" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <ellipse cx="50" cy="56" rx="26" ry="14" transform="rotate(-10 50 56)" fill="#ffffff" stroke={INK} strokeWidth="1.3" />
      <Tube d={wing} w={5} color="#b9c6d9" />
      <circle cx="28" cy="34" r="9" fill="#ffffff" stroke={INK} strokeWidth="1.3" />
      <path d="M20 34 l-10 4 l11 2 Z" fill="#f2a93b" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <Eye cx={27} cy={32} r={1.5} />
      <Tube d={leg} w={3} color="#f08a3c" />
    </Scene>
  );
}

/* メ Médaille */
export function Medal({ strokes }: StrokesProps) {
  const [ribbonA, ribbonB] = strokes;
  return (
    <Scene label="Une médaille d'or : deux rubans qui se croisent en X au-dessus d'un disque doré à étoile" tint="#fdf3d4">
      <Tube d={ribbonA} w={8} color="#4d7cc9" />
      <Tube d={ribbonB} w={8} color="#e5535a" />
      <circle cx="46" cy="76" r="15" fill="#f7cf55" stroke={INK} strokeWidth="1.5" />
      <circle cx="46" cy="76" r="10.5" fill="#fbe59a" stroke="#c9a02a" strokeWidth="1" />
      <Star x={46} y={76} r={7} color="#f2a93b" />
      <Star x={90} y={16} r={3.4} /><Star x={16} y={20} r={2.6} />
    </Scene>
  );
}

/* モ Moulin */
export function Windmill({ strokes }: StrokesProps) {
  const [sailA, sailB, tower] = strokes;
  return (
    <Scene label="Un moulin à vent : la tour de pierre et ses deux ailes de bois horizontales" tint="#e4eefa">
      <Grass y={92} color="#bfdca4" />
      <path d="M36 92 L44 34 H60 L68 92 Z" fill="#e8d3b4" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M40 34 L52 18 L64 34 Z" fill="#b5382f" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <Tube d={tower} w={3.4} color="#a07a52" />
      <Tube d={sailA} w={4.4} color="#c49a62" />
      <Tube d={sailB} w={4.4} color="#c49a62" />
      <g stroke="#f3e3c8" strokeWidth="1"><path d="M34 22 v8 M42 22 v8 M62 22 v8 M70 22 v8 M24 50 v8 M32 50 v8 M72 48 v8 M80 48 v8" /></g>
      <rect x="49" y="74" width="8" height="18" rx="3" fill="#6b4226" stroke={INK} strokeWidth="1" />
    </Scene>
  );
}

/* ヤ Yacht */
export function Yacht({ strokes }: StrokesProps) {
  const [boom, mast] = strokes;
  return (
    <Scene label="Un yacht à voiles : le mât, la bôme horizontale et les voiles blanches gonflées, sur la mer" tint="#d9ecf8">
      <circle cx="92" cy="16" r="7" fill="#f9d86a" />
      <path d="M39 24 L72 54 L48 58 Z" fill="#ffffff" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M37 26 L18 48 L46 58 Z" fill="#fdf3d4" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 90 H90 L80 102 H36 Z" fill="#b5382f" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <Waves y={98} color="#8fbbe0" opacity={0.9} />
      <Tube d={mast} w={3.2} color="#a07a52" />
      <Tube d={boom} w={3.2} color="#a07a52" />
      <path d="M38 19 L54 12 L38 6 Z" fill="#4d7cc9" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
    </Scene>
  );
}

/* ユ Yourte */
export function Yurt({ strokes }: StrokesProps) {
  const [rope, ground] = strokes;
  return (
    <Scene label="Une yourte de la steppe : une tente ronde au toit conique, entourée d'une corde, avec sa porte et son fanion" tint="#f3ecd8">
      <path d="M0 80 Q30 62 60 76 T109 70 V112 H0 Z" fill="#cfe0b0" />
      <path d="M18 54 H88 V84 H18 Z" fill="#f7f1e3" stroke={INK} strokeWidth="1.3" />
      <path d="M12 54 L53 22 L94 54 Z" fill="#fbf7ea" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M53 22 V10" stroke={INK} strokeWidth="1.4" {...common} />
      <path d="M53 10 L66 14 L53 18 Z" fill="#e5535a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <rect x="44" y="60" width="18" height="24" rx="8" fill="#a9794a" stroke={INK} strokeWidth="1.1" />
      <Tube d={rope} w={2.8} color="#e5535a" />
      <Tube d={ground} w={3.4} color="#a9794a" />
      <g fill="#e8c9a0" stroke={INK} strokeWidth="0.8"><ellipse cx="96" cy="88" rx="7" ry="4" /><circle cx="103" cy="85" r="2.6" /></g>
    </Scene>
  );
}

/* ヨ Yogi */
export function Yogi({ strokes }: StrokesProps) {
  const [back, arms, legs] = strokes;
  return (
    <Scene label="Un yogi qui médite : le dos droit à droite, les bras en croix au milieu et les jambes croisées en bas" tint="#f1e6f7">
      <circle cx="54" cy="52" r="42" fill="none" stroke="#d9c9ec" strokeWidth="2" strokeDasharray="3 4" />
      <path d="M12 92 q14 -8 44 -6 q30 -2 42 6" stroke="#f7a8c8" strokeWidth="5" {...common} />
      <Tube d={back} w={9} color="#f08a3c" />
      <Tube d={arms} w={5} color="#f2c9a8" />
      <Tube d={legs} w={7} color="#f08a3c" />
      <circle cx="78" cy="18" r="8" fill="#f2c9a8" stroke={INK} strokeWidth="1.3" />
      <path d="M71 16 q7 -8 14 0 q-7 -3 -14 0 Z" fill="#2d3550" />
      <path d="M74 21 q4 3 8 0" stroke={INK} strokeWidth="0.9" {...common} />
      <Star x={20} y={20} r={3.2} /><Star x={96} y={60} r={2.6} />
    </Scene>
  );
}

/* ラ Rampe */
export function Ramp({ strokes }: StrokesProps) {
  const [board, ramp] = strokes;
  return (
    <Scene label="Un skateur qui saute au-dessus d'une rampe : la planche en haut et la grande courbe de la rampe" tint="#e0e8f6">
      <rect y="96" width="109" height="16" fill="#cfd6e2" />
      <Tube d={ramp} w={7} color="#8e9bb0" />
      <Tube d={board} w={4} color="#e5535a" />
      <circle cx="42" cy="26" r="2.4" fill="#2d3550" /><circle cx="70" cy="26" r="2.4" fill="#2d3550" />
      <rect x="50" y="8" width="12" height="12" rx="3" fill="#4d7cc9" stroke={INK} strokeWidth="1.2" />
      <circle cx="56" cy="2" r="5" fill="#f2c9a8" stroke={INK} strokeWidth="1.1" />
      <path d="M50 12 l-10 -6 M62 12 l10 -6" stroke="#f2c9a8" strokeWidth="3" {...common} />
      <path d="M14 28 q6 -4 12 0 M84 30 q6 -4 12 0" stroke="#9fb2d6" strokeWidth="1.4" {...common} />
    </Scene>
  );
}

/* リ Riz */
export function Rice({ strokes }: StrokesProps) {
  const [stickA, stickB] = strokes;
  return (
    <Scene label="Un bol de riz et ses baguettes : deux traits verticaux, le plus long au bord du bol" tint="#fbf1e3">
      <path d="M20 66 H92 Q88 98 56 98 Q24 98 20 66 Z" fill="#e5535a" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M26 76 H86" stroke="#f7cf55" strokeWidth="2" {...common} />
      <path d="M22 66 Q56 36 90 66 Z" fill="#ffffff" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <g fill="#f3ead2" stroke="#d9cdb0" strokeWidth="0.6"><ellipse cx="40" cy="58" rx="3" ry="1.6" /><ellipse cx="54" cy="52" rx="3" ry="1.6" /><ellipse cx="66" cy="58" rx="3" ry="1.6" /><ellipse cx="50" cy="62" rx="3" ry="1.6" /></g>
      <Tube d={stickA} w={3.4} color="#c49a62" />
      <Tube d={stickB} w={3.4} color="#a9794a" />
      <rect x="42" y="38" width="22" height="9" rx="2" fill="#2d3550" opacity="0.9" />
    </Scene>
  );
}

/* ル Ruban */
export function Ribbon({ strokes }: StrokesProps) {
  const [curl, long] = strokes;
  return (
    <Scene label="Du ruban cadeau qui s'enroule : un brin qui frise à gauche et un long brin qui part vers la droite, avec une bobine" tint="#fbe6f0">
      <circle cx="82" cy="84" r="14" fill="#f06a8a" stroke={INK} strokeWidth="1.3" />
      <circle cx="82" cy="84" r="5" fill="#fbe6f0" stroke={INK} strokeWidth="1" />
      <Tube d={long} w={6} color="#f06a8a" />
      <Tube d={curl} w={6} color="#f7cf55" />
      <path d="M10 20 l10 10 M20 10 l-4 18" stroke="#ffffff" strokeWidth="1.6" {...common} />
      <Star x={90} y={20} r={3.4} />
    </Scene>
  );
}

/* レ Rame */
export function Oar({ strokes }: StrokesProps) {
  const [paddle] = strokes;
  return (
    <Scene label="Une rame de canoë qui plonge dans l'eau : le long manche vertical, la pale en bas et le sillage" tint="#d9ecf8">
      <rect y="62" width="109" height="50" fill="#8fc3e6" opacity="0.8" />
      <Waves y={62} color="#6aa8d6" opacity={0.9} />
      <Tube d={paddle} w={6} color="#c49a62" />
      <ellipse cx="46" cy="88" rx="10" ry="6" transform="rotate(-25 46 88)" fill="#e5535a" stroke={INK} strokeWidth="1.3" />
      <path d="M12 74 q10 6 20 0 M72 82 q10 6 22 0" stroke="#ffffff" strokeWidth="1.6" {...common} />
      <circle cx="90" cy="22" r="6" fill="#f9d86a" />
    </Scene>
  );
}

/* ロ Robot */
export function Robot({ strokes }: StrokesProps) {
  const [left, top, bottom] = strokes;
  return (
    <Scene label="Un robot dont la tête carrée est formée par les trois traits, avec deux yeux, une bouche et une antenne" tint="#e3e9f5">
      <rect x="22" y="38" width="62" height="42" fill="#cfd8ea" />
      <path d="M52 38 V16" stroke={INK} strokeWidth="2.4" {...common} />
      <circle cx="52" cy="13" r="5" fill="#e5535a" stroke={INK} strokeWidth="1.2" />
      <rect x="30" y="46" width="14" height="12" rx="2" fill="#7fb6e3" stroke={INK} strokeWidth="1.2" />
      <rect x="62" y="46" width="14" height="12" rx="2" fill="#7fb6e3" stroke={INK} strokeWidth="1.2" />
      <circle cx="37" cy="52" r="3" fill="#ffffff" /><circle cx="69" cy="52" r="3" fill="#ffffff" />
      <path d="M36 70 H70 M42 66 v8 M50 66 v8 M58 66 v8 M66 66 v8" stroke={INK} strokeWidth="1.4" />
      <Tube d={left} w={5} color="#8e9bb0" />
      <Tube d={top} w={5} color="#8e9bb0" />
      <Tube d={bottom} w={5} color="#8e9bb0" />
      <rect x="14" y="52" width="6" height="12" rx="2" fill="#8e9bb0" stroke={INK} strokeWidth="1" />
      <rect x="90" y="52" width="6" height="12" rx="2" fill="#8e9bb0" stroke={INK} strokeWidth="1" />
      <rect x="40" y="86" width="30" height="14" fill="#6f7e99" stroke={INK} strokeWidth="1.2" />
    </Scene>
  );
}

/* ワ Wagon */
export function Wagon({ strokes }: StrokesProps) {
  const [tick, side] = strokes;
  return (
    <Scene label="Un wagon de train rouge : la caisse, le grand toit qui s'incline, l'attelage et les roues sur les rails" tint="#e8ebf5">
      <path d="M0 98 H109" stroke="#6f7e99" strokeWidth="3" />
      <rect x="20" y="40" width="70" height="40" fill="#e5535a" stroke={INK} strokeWidth="1.4" />
      <path d="M20 54 H90" stroke="#b5382f" strokeWidth="1.4" />
      <g fill="#f9e7a8" stroke={INK} strokeWidth="0.9"><rect x="28" y="58" width="10" height="9" /><rect x="68" y="58" width="10" height="9" /></g>
      <circle cx="34" cy="88" r="8" fill="#2d3550" stroke={INK} strokeWidth="1.2" /><circle cx="76" cy="88" r="8" fill="#2d3550" stroke={INK} strokeWidth="1.2" />
      <circle cx="34" cy="88" r="2.6" fill="#cfd6e2" /><circle cx="76" cy="88" r="2.6" fill="#cfd6e2" />
      <Tube d={side} w={4} color="#8e9bb0" />
      <Tube d={tick} w={3.4} color="#f7cf55" />
      <path d="M8 76 H20 M90 76 H102" stroke={INK} strokeWidth="2.4" {...common} />
    </Scene>
  );
}

/* ヲ Origami */
export function Origami({ strokes }: StrokesProps) {
  const [foldA, foldB, neck] = strokes;
  return (
    <Scene label="Un oiseau en origami : des plis horizontaux et le long cou plié qui descend en diagonale" tint="#fdeee3">
      <path d="M20 62 L60 40 L92 54 L60 80 Z" fill="#f7a8c8" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M60 40 L60 80 M20 62 L92 54" stroke="#fbe6f0" strokeWidth="1.4" />
      <path d="M22 62 L8 46 L30 56 Z" fill="#f06a8a" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <Tube d={foldA} w={3.4} color="#e5535a" />
      <Tube d={foldB} w={3.4} color="#f06a8a" />
      <Tube d={neck} w={3.6} color="#c9486a" />
      <Star x={94} y={18} r={3.4} /><Star x={14} y={22} r={2.6} />
    </Scene>
  );
}

/* ン Anguille */
export function Eel({ strokes }: StrokesProps) {
  const [hook, body] = strokes;
  return (
    <Scene label="Une anguille qui serpente dans l'eau, avec un petit hameçon accroché à sa ligne" tint="#d6ecf4">
      <rect y="56" width="109" height="56" fill="#8fc3e6" opacity="0.6" />
      <Waves y={56} color="#6aa8d6" opacity={0.8} />
      <path d="M27 0 V25" stroke="#8d6e4a" strokeWidth="1.2" {...common} />
      <Tube d={body} w={9} color="#6b8f3f" />
      <ellipse cx="88" cy="42" rx="8" ry="6" transform="rotate(-40 88 42)" fill="#6b8f3f" stroke={INK} strokeWidth="1.3" />
      <Eye cx={90} cy={39} r={1.6} />
      <Tube d={hook} w={2.4} color="#cfd6e2" />
      <g fill="none" stroke="#ffffff" strokeWidth="1.2"><circle cx="16" cy="70" r="3" /><circle cx="24" cy="62" r="2" /><circle cx="94" cy="80" r="3.4" /></g>
      <path d="M20 96 q4 -10 8 0 M84 98 q4 -10 8 0" stroke="#4f9a4a" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

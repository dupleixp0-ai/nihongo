import { INK, Scene, Tube, common, type StrokesProps } from "./story-illustrations";

/** ー Élastique : le trait d'allongement est un élastique tendu entre deux piquets. */
export function Elastic({ strokes }: StrokesProps) {
  const [band] = strokes;
  return (
    <Scene label="Un élastique rouge tendu entre deux piquets : le long trait qui allonge la voyelle" tint="#fdf0d5">
      <path d="M0 92 H109 V112 H0 Z" fill="#e3c9a0" />
      <g stroke={INK} strokeWidth="1.3" strokeLinejoin="round">
        <rect x="6" y="30" width="9" height="64" rx="2" fill="#a07a52" />
        <rect x="94" y="30" width="9" height="64" rx="2" fill="#a07a52" />
        <circle cx="10.5" cy="30" r="5" fill="#f7cf55" />
        <circle cx="98.5" cy="30" r="5" fill="#f7cf55" />
      </g>
      <Tube d={band} w={4.6} color="#e5483f" />
      <path d="M30 68 q-6 -10 0 -18 M80 68 q6 -10 0 -18" stroke="#8d6e4a" strokeWidth="1.6" {...common} />
    </Scene>
  );
}

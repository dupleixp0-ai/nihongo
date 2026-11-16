"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";

type StrokeOrderProps = {
  /** Chemins SVG des traits, dans l'ordre du tracé (viewBox 0 0 109 109). */
  strokes: string[];
  /** Ce qu'on dessine, pour la description accessible (« Hiragana a », « kanji 日 »). */
  subject: string;
};

const STROKE_DURATION = 0.8;
const STROKE_GAP = 0.9;

function startPoint(path: string) {
  const match = path.match(/^M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);
  return match ? { x: Number(match[1]), y: Number(match[2]) } : { x: 0, y: 0 };
}

export function StrokeOrder({ strokes, subject }: StrokeOrderProps) {
  const m = useMessages();
  const label = m.lesson.strokeAria(strokes.length, subject);
  const [run, setRun] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl border border-line bg-sheet">
        <svg role="img" aria-label={label} viewBox="0 0 109 109" className="h-full w-full">
          <line x1="54.5" y1="0" x2="54.5" y2="109" className="stroke-guide" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="54.5" x2="109" y2="54.5" className="stroke-guide" strokeWidth="0.5" strokeDasharray="2 2" />

          {strokes.map((d, i) => (
            <path key={`ghost-${i}`} d={d} fill="none" className="stroke-line" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          ))}

          {strokes.map((d, i) => {
            const delay = reduceMotion ? 0 : i * STROKE_GAP;
            return (
              <motion.path
                key={`${run}-stroke-${i}`}
                d={d}
                fill="none"
                className="stroke-brush"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay, duration: reduceMotion ? 0 : STROKE_DURATION, ease: "easeInOut" }}
              />
            );
          })}

          {strokes.map((d, i) => {
            const { x, y } = startPoint(d);
            const delay = reduceMotion ? 0 : i * STROKE_GAP;
            return (
              <motion.g
                key={`${run}-num-${i}`}
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.2 }}
              >
                <circle cx={x - 6} cy={y - 5} r="4.5" className="fill-indigo" />
                <text x={x - 6} y={y - 5} textAnchor="middle" dominantBaseline="central" fontSize="6" fontWeight="600" className="fill-on-indigo">
                  {i + 1}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <Button type="button" variant="quiet" className="mt-3" onClick={() => setRun((value) => value + 1)}>
        <T m={(m) => m.lesson.replay} />
      </Button>
    </div>
  );
}

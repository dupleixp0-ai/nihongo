"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { T } from "@/i18n/t";
import { useMessages } from "@/i18n/use-lang";

type Point = { x: number; y: number };

type TracingPadProps = {
  /** Chemins SVG du modèle affiché en filigrane (viewBox 0 0 109 109). */
  modelStrokes: string[];
  /** Ce qu'on s'entraîne à tracer, pour la description accessible. */
  subject: string;
};

/** Couleur de l'encre : celle du thème courant (clair ou sombre). */
const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--color-brush").trim() || "#17233a";

export function TracingPad({ modelStrokes, subject }: TracingPadProps) {
  const m = useMessages();
  const label = m.lesson.traceAria(subject);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Points normalisés (0 à 1) : le dessin reste correct quand la taille de l'écran change.
  const strokesRef = useRef<Point[][]>([]);
  const drawingRef = useRef(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [showModel, setShowModel] = useState(true);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const color = ink();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = canvas.width * 0.035;
    for (const stroke of strokesRef.current) {
      if (stroke.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke[0].x * canvas.width, stroke[0].y * canvas.height, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      ctx.beginPath();
      stroke.forEach((point, index) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      redraw();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [redraw]);

  function toPoint(event: React.PointerEvent<HTMLCanvasElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    strokesRef.current.push([toPoint(event)]);
    setStrokeCount(strokesRef.current.length);
    redraw();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const current = strokesRef.current[strokesRef.current.length - 1];
    current.push(toPoint(event));
    redraw();
  }

  function handlePointerEnd() {
    drawingRef.current = false;
  }

  function undoLastStroke() {
    strokesRef.current.pop();
    setStrokeCount(strokesRef.current.length);
    redraw();
  }

  function clearAll() {
    strokesRef.current = [];
    setStrokeCount(0);
    redraw();
  }

  return (
    <div>
      <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-line bg-sheet">
        <svg aria-hidden="true" viewBox="0 0 109 109" className="absolute inset-0 h-full w-full">
          <line x1="54.5" y1="0" x2="54.5" y2="109" className="stroke-guide" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="54.5" x2="109" y2="54.5" className="stroke-guide" strokeWidth="0.5" strokeDasharray="2 2" />
          {showModel
            ? modelStrokes.map((d, i) => (
                <path key={i} d={d} fill="none" className="stroke-line" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              ))
            : null}
        </svg>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={label}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <Button type="button" variant="quiet" onClick={undoLastStroke} disabled={strokeCount === 0}>
          <T m={(m) => m.lesson.undoStroke} />
        </Button>
        <Button type="button" variant="quiet" onClick={clearAll} disabled={strokeCount === 0}>
          <T m={(m) => m.lesson.clear} />
        </Button>
        <Button type="button" variant="quiet" onClick={() => setShowModel((value) => !value)} aria-pressed={showModel}>
          <T m={(m) => (showModel ? m.lesson.hideModel : m.lesson.showModel)} />
        </Button>
      </div>
    </div>
  );
}

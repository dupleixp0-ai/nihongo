"use client";

import { useEffect } from "react";
import { markSeen } from "@/lib/progress";

/** Note la page comme vue (pages de grammaire et de lecture, qui n'ont pas de pagination de leçon). */
export function MarkSeen({ id }: { id: string }) {
  useEffect(() => markSeen(id), [id]);
  return null;
}

"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ease, revealViewport } from "@/lib/motion";

/** Filete que se desenha da esquerda para a direita ao entrar na viewport. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={revealViewport}
      transition={{ duration: reduce ? 0.12 : 0.9, ease: ease.expressive, delay }}
    />
  );
}

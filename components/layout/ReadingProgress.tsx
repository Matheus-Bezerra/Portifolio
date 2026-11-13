"use client";

import { useReducedMotion, useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/** Barra de progresso de leitura: 3 px laranja no topo da janela. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-accent"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}

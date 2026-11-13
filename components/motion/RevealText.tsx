"use client";

import type { ReactNode } from "react";
import { useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { duration, ease, revealViewport } from "@/lib/motion";

const focus: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: ease.expressive },
  },
};

const reducedFocus: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.reduced } },
};

/** Parágrafo de apoio: entra do desfoque para o nítido, logo depois do título. */
export function RevealText({
  children,
  className,
  delay = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.p
      className={className}
      variants={reduce ? reducedFocus : focus}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </m.p>
  );
}

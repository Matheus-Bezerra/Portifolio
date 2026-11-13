"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/** Linha da janela (a partir do topo) em que a timeline "acende". */
const TRIGGER = "62%";

/**
 * Envolve a linha do tempo e desenha, sobre o traço cinza,
 * um traço laranja que cresce conforme a rolagem (somente desktop).
 */
export function TimelineTrack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${TRIGGER}`, `end ${TRIGGER}`],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
      {!reduce && (
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 hidden h-full w-px origin-top bg-accent lg:block"
          style={{ scaleY: smooth }}
        />
      )}
    </div>
  );
}

/**
 * Ponto da linha do tempo: uma camada laranja sobre o ponto cinza ganha opacidade
 * quando a rolagem passa por ele (sem cores literais: usa os tokens do tema).
 */
export function TimelineDot({ current, className }: { current?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${TRIGGER}`, "start 56%"],
  });

  /* A experiência atual já é laranja; com movimento reduzido os pontos ficam como no design original */
  if (current || reduce) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(className, !current && "border-control bg-bg")}
      />
    );
  }
  return (
    <span ref={ref} aria-hidden="true" className={cn(className, "border-control bg-bg")}>
      <m.span
        className="absolute -inset-[1.5px] rounded-full bg-accent"
        style={{ opacity: scrollYProgress }}
      />
    </span>
  );
}

/**
 * Mobile: a borda esquerda do card se preenche em laranja conforme a rolagem,
 * como a linha da timeline no desktop. Com movimento reduzido, só o card atual
 * mantém o traço fixo (como no design original).
 */
export function CardFill({ current }: { current?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 48%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.4 });

  if (reduce) {
    return current ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-2 -left-px w-0.5 rounded-full bg-accent lg:hidden"
      />
    ) : null;
  }
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-2 -left-px w-0.5 lg:hidden"
    >
      <m.span
        className="block size-full origin-top rounded-full bg-accent"
        style={{ scaleY: smooth }}
      />
    </span>
  );
}

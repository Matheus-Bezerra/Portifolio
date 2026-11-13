"use client";

import type { ReactNode } from "react";
import { useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import {
  duration,
  fadeIn,
  fadeUp,
  revealViewport,
  scaleIn,
  sectionReveal,
  slideIn,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

const presets = {
  fadeIn,
  fadeUp,
  scaleIn,
  section: sectionReveal,
  slideLeft: slideIn("left"),
  slideRight: slideIn("right"),
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof presets;

/** Com movimento reduzido: apenas um fade muito breve, sem deslocamento. */
const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.reduced } },
};

type Tag = "div" | "section" | "ul" | "ol" | "li" | "article" | "p" | "dl" | "header";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  as?: Tag;
  className?: string;
  delay?: number;
  id?: string;
}

/** Revela o conteúdo ao entrar na viewport (uma vez). */
export function Reveal({
  children,
  variant = "fadeUp",
  as = "div",
  className,
  delay = 0,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = m[as];
  return (
    <Component
      id={id}
      className={className}
      variants={reduce ? reducedVariants : presets[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  gap?: number;
  delay?: number;
}

/** Contêiner que revela os filhos (`StaggerItem`) em sequência. */
export function Stagger({ children, as = "div", className, gap, delay }: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={reduce ? reducedVariants : staggerContainer(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Component = m[as];
  return (
    <Component className={className} variants={reduce ? reducedVariants : staggerItem}>
      {children}
    </Component>
  );
}

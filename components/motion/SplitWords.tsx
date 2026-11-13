"use client";

import { Fragment } from "react";
import { useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { useIntro } from "@/components/intro/IntroContext";
import { duration, ease, revealViewport } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p";

const tags = { h1: m.h1, h2: m.h2, h3: m.h3, p: m.p } as const;

/** Cada palavra sobe de trás de uma máscara; o intervalo entre palavras é curto. */
const WORD_STAGGER = 0.055;

const container = (delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: WORD_STAGGER, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: "135%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: ease.expressive } },
};

/** Movimento reduzido: sem deslocamento, só um fade breve. */
const reducedContainer: Variants = { hidden: {}, visible: {} };
const reducedWord: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.reduced } },
};

interface SplitWordsProps {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  /** "view": ao entrar na tela. "intro": quando a abertura libera (usado no hero). */
  trigger?: "view" | "intro";
  delay?: number;
}

/**
 * Título que se revela palavra a palavra, subindo de trás de uma máscara.
 * O texto completo fica em um trecho só para leitores de tela (funciona em qualquer
 * tag, inclusive <p>, onde aria-label não é permitido); as palavras animadas são decorativas.
 */
export function SplitWords({
  text,
  as = "h2",
  id,
  className,
  trigger = "view",
  delay = 0,
}: SplitWordsProps) {
  const reduce = useReducedMotion();
  const { ready } = useIntro();
  const Component = tags[as];
  const words = text.split(" ");

  const motionProps =
    trigger === "intro"
      ? { initial: "hidden", animate: ready ? "visible" : "hidden" }
      : { initial: "hidden", whileInView: "visible", viewport: revealViewport };

  return (
    <Component
      id={id}
      className={className}
      variants={reduce ? reducedContainer : container(delay)}
      {...motionProps}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            {i > 0 && " "}
            {/* A máscara avança um pouco além da caixa para não cortar as hastes das letras */}
            <span className="inline-block" style={{ clipPath: "inset(0 -0.12em -0.15em -0.12em)" }}>
              <m.span className="inline-block" variants={reduce ? reducedWord : word}>
                {w}
              </m.span>
            </span>
          </Fragment>
        ))}
      </span>
    </Component>
  );
}

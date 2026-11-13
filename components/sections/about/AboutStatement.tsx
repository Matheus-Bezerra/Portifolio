"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface Part {
  text: string;
  highlight?: boolean;
}

/** Velocidade da "digitação": ~32 ms por letra, no máximo 3 s no total. */
const MS_PER_CHAR = 32;
const MAX_MS = 3000;

/**
 * Frase do Sobre: ao chegar na seção ela é "escrita" letra a letra, com um cursor
 * laranja que pisca e some ao terminar. O texto completo já ocupa o seu espaço
 * (letras ainda não escritas ficam transparentes), então nada se desloca.
 * Com movimento reduzido a frase aparece completa.
 */
export function AboutStatement({ parts, id }: { parts: readonly Part[]; id: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const total = parts.reduce((sum, p) => sum + p.text.length, 0);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, total, {
      duration: Math.min(MAX_MS, total * MS_PER_CHAR) / 1000,
      ease: "linear",
      delay: 0.25,
      onUpdate: (v) => setCount(Math.floor(v)),
      onComplete: () => {
        setCount(total);
        setDone(true);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, total]);

  if (reduce) {
    return (
      <h2 ref={ref} id={id} className="type-statement">
        {parts.map((part, i) => (
          <span key={i} className={part.highlight ? "text-accent" : undefined}>
            {part.text}
          </span>
        ))}
      </h2>
    );
  }

  /* Posição da primeira letra de cada trecho dentro da frase inteira */
  const starts = parts.map((_, i) => parts.slice(0, i).reduce((sum, p) => sum + p.text.length, 0));
  return (
    <h2 ref={ref} id={id} className="type-statement">
      <span className="sr-only">{parts.map((p) => p.text).join("")}</span>
      {parts.map((part, i) => {
        const start = starts[i] ?? 0;
        return (
          <span key={i} aria-hidden="true" className={part.highlight ? "text-accent" : undefined}>
            {Array.from(part.text).map((char, j) => {
              const index = start + j;
              return (
                <span key={j} className={index < count ? undefined : "opacity-0"}>
                  {char}
                  {/* Cursor logo depois da última letra escrita */}
                  {index === count - 1 && !done && <Caret />}
                </span>
              );
            })}
          </span>
        );
      })}
      {/* Antes de começar, o cursor já pisca no início da frase */}
      {count === 0 && inView && !done && <Caret />}
    </h2>
  );
}

function Caret() {
  return (
    <span aria-hidden="true" className="relative inline-block h-[0.9em] w-0 align-[-0.08em]">
      <span className="caret absolute top-0 left-[0.06em] h-full w-[3px] rounded-full bg-accent" />
    </span>
  );
}

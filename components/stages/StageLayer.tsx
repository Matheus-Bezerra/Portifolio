"use client";

import type { ReactNode } from "react";
import { useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

interface StageLayerProps {
  /** Posição contínua do palco (centro do passo k = k). */
  pos: MotionValue<number>;
  /** Índice desta camada. */
  i: number;
  /** "text": desloca ao contrário da ilustração · "art": também reduz a escala ao sair. */
  kind: "text" | "art";
  /** Camada do passo ativo (discreto): controla foco, leitores de tela e cliques. */
  active: boolean;
  className?: string;
  children: ReactNode;
}

/* Distância (em passos) ao centro: parado até 0,2; some por completo em 0,5 */
const FADE_AT = [-0.5, -0.2, 0.2, 0.5];
const FADE_TO = [0, 1, 1, 0];
const SPAN = [-0.5, 0, 0.5];

/**
 * Camada de um palco de rolagem: opacidade, deslocamento e escala ligados direto
 * à posição da rolagem (sem animação por tempo), e só com transform e opacity.
 */
export function StageLayer({ pos, i, kind, active, className, children }: StageLayerProps) {
  const d = useTransform(pos, (v) => v - i);
  const opacity = useTransform(d, FADE_AT, FADE_TO);
  const y = useTransform(d, SPAN, kind === "text" ? [-28, 0, 28] : [24, 0, -24]);
  const scale = useTransform(d, SPAN, kind === "art" ? [0.92, 1, 0.92] : [1, 1, 1]);

  return (
    <m.div
      style={{ opacity, y, scale }}
      aria-hidden={!active}
      inert={!active}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface StageFadeProps {
  pos: MotionValue<number>;
  /** Índice do passo a que este elemento pertence. */
  i: number;
  /** Desloca a posição (rótulos em volta do anel: o encaixe `s` mostra o passo ativo + s). */
  shift?: number;
  /** Total de passos, para medir a distância em círculo (o anel é cíclico). */
  cycle?: number;
  /** Deslocamento vertical (px) ao entrar e sair: positivo sobe ao sair. */
  rise?: number;
  className?: string;
  children: ReactNode;
}

/** Texto pequeno que faz fade (e leve deslocamento) conforme a rolagem, sem animação por tempo. */
export function StageFade({
  pos,
  i,
  shift = 0,
  cycle,
  rise = 0,
  className,
  children,
}: StageFadeProps) {
  const d = useTransform(pos, (v) => {
    const raw = v + shift - i;
    if (!cycle) return raw;
    return ((((raw + cycle / 2) % cycle) + cycle) % cycle) - cycle / 2;
  });
  const opacity = useTransform(d, FADE_AT, FADE_TO);
  const y = useTransform(d, SPAN, [-rise, 0, rise]);
  return (
    <m.span style={{ opacity, y }} className={className}>
      {children}
    </m.span>
  );
}

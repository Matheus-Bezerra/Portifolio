"use client";

import { useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import type { ProcessStep } from "@/types/content";
import { cn } from "@/lib/utils";
import { StageFade } from "./StageLayer";

interface ProcessCycleProps {
  steps: ProcessStep[];
  index: number;
  /** Posição contínua do palco: o anel gira e o arco avança junto com a rolagem. */
  pos: MotionValue<number>;
  cycleLabel: string;
  /** Leva ao passo clicado (nós numerados do anel). */
  onSelect?: (index: number) => void;
  /** "lg": anel de 440 px com rótulos ao redor · "sm": anel de 220 px (mobile) */
  size: "lg" | "sm";
}

const dims = {
  lg: { ring: 440, node: 56, dashInset: 39.5, disc: 259, nodeFont: 16 },
  sm: { ring: 220, node: 48, dashInset: 19.5, disc: 129, nodeFont: 14 },
} as const;

/** Posições dos rótulos externos (quadro de 700 × 540, anel em 130/50). */
const labelSlots = [
  "left-1/2 top-0 -translate-x-1/2",
  "left-[608px] top-[258px]",
  "left-1/2 bottom-0 -translate-x-1/2",
  "left-0 top-[258px] w-[92px] text-right",
] as const;

/** Camada laranja do nó: aparece e some conforme a rolagem passa por ele. */
function NodeGlow({ pos, k }: { pos: MotionValue<number>; k: number }) {
  const opacity = useTransform(pos, [k - 1, k, k + 1], [0, 1, 0]);
  return (
    <m.span
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute -inset-px flex items-center justify-center rounded-full bg-accent text-bg shadow-[0_0_0_6px_var(--color-bg),0_0_0_7px_color-mix(in_srgb,var(--color-accent)_50%,transparent)]"
    >
      {k + 1}
    </m.span>
  );
}

/**
 * Ciclo orbital: o anel gira 90° por etapa, a etapa ativa sobe ao topo e o arco
 * laranja avança 25% a cada etapa. Números e textos são contra-rotacionados.
 */
export function ProcessCycle({ steps, index, pos, cycleLabel, onSelect, size }: ProcessCycleProps) {
  const d = dims[size];
  const r = d.ring / 2 - 1;
  const count = steps.length;
  const rotation = useTransform(pos, (v) => -90 * v);
  const counterRotation = useTransform(pos, (v) => 90 * v);
  const arc = useTransform(pos, (v) => (v + 1) / count);

  const ring = (
    <div className="relative" style={{ width: d.ring, height: d.ring }}>
      {/* Trilho + arco de progresso (25/50/75/100%) */}
      <svg
        width={d.ring}
        height={d.ring}
        viewBox={`0 0 ${d.ring} ${d.ring}`}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={d.ring / 2}
          cy={d.ring / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
        <m.circle
          cx={d.ring / 2}
          cy={d.ring / 2}
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: arc }}
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute rounded-full border border-dashed border-line-soft"
        style={{ inset: d.dashInset }}
      />

      {/* Centro */}
      <div
        className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-line text-center lg:gap-1.5"
        style={{
          width: d.disc,
          height: d.disc,
          background:
            "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 60%), var(--color-surface-deep)",
        }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-[0.16em] text-text-3 uppercase lg:text-[11px]">
          {cycleLabel}
        </span>
        <span
          className={cn(
            "font-display font-semibold text-text",
            size === "lg" ? "text-[44px] leading-[48px]" : "text-[27px] leading-[29px]",
          )}
        >
          <span className="inline-grid [&>*]:col-start-1 [&>*]:row-start-1">
            {steps.map((step, k) => (
              <StageFade key={step.id} pos={pos} i={k} rise={-10}>
                {k + 1}
              </StageFade>
            ))}
          </span>
          <span className="text-separator"> / {count}</span>
        </span>
        <span
          className={cn(
            "inline-grid font-medium text-text-2 [&>*]:col-start-1 [&>*]:row-start-1",
            size === "lg" ? "text-[14px]" : "text-[12px]",
          )}
        >
          {steps.map((step, k) => (
            <StageFade key={step.id} pos={pos} i={k} className="text-center">
              {step.title}
            </StageFade>
          ))}
        </span>
      </div>

      {/* Camada que gira: 4 nós (etapa k a k × 90°) */}
      <m.div className="absolute inset-0" style={{ rotate: rotation }}>
        {steps.map((step, k) => {
          const isActive = k === index;
          const angle = (k * Math.PI) / 2;
          const cx = d.ring / 2 + (d.ring / 2) * Math.sin(angle);
          const cy = d.ring / 2 - (d.ring / 2) * Math.cos(angle);
          return (
            <m.button
              type="button"
              key={step.id}
              onClick={() => onSelect?.(k)}
              aria-label={`Ir para a etapa ${k + 1}: ${step.title}`}
              aria-current={isActive ? "step" : undefined}
              className="absolute flex cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface font-display font-semibold text-text-2 shadow-[0_0_0_6px_var(--color-bg)]"
              style={{
                width: d.node,
                height: d.node,
                left: cx - d.node / 2,
                top: cy - d.node / 2,
                fontSize: d.nodeFont,
                rotate: counterRotation,
              }}
            >
              {k + 1}
              <NodeGlow pos={pos} k={k} />
            </m.button>
          );
        })}
      </m.div>
    </div>
  );

  if (size === "sm") return ring;

  /* Desktop: rótulos das etapas ao redor do anel */
  return (
    <div className="relative h-[540px] w-[700px]">
      <div className="absolute top-[50px] left-[130px]">{ring}</div>
      {labelSlots.map((slot, s) => (
        <span
          key={s}
          aria-hidden="true"
          className={cn(
            "absolute inline-grid font-display text-[14px] whitespace-nowrap [&>*]:col-start-1 [&>*]:row-start-1",
            slot,
            s === 0 ? "font-semibold text-text" : "font-medium text-text-3",
            s === 0 || s === 2 ? "justify-items-center" : s === 3 ? "justify-items-end" : "",
          )}
        >
          {steps.map((step, k) => (
            <StageFade key={step.id} pos={pos} i={k} shift={s} cycle={count}>
              {step.title}
            </StageFade>
          ))}
        </span>
      ))}
    </div>
  );
}

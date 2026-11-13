"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { ProcessStep } from "@/types/content";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProcessCycleProps {
  steps: ProcessStep[];
  index: number;
  cycleLabel: string;
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

/**
 * Ciclo orbital: o anel gira 90° por etapa, a etapa ativa sobe ao topo e o arco
 * laranja avança 25% a cada etapa. Números e textos são contra-rotacionados.
 */
export function ProcessCycle({ steps, index, cycleLabel, size }: ProcessCycleProps) {
  const reduce = useReducedMotion();
  const d = dims[size];
  const r = d.ring / 2 - 1;
  const count = steps.length;
  const rotation = -90 * index;
  const t = reduce ? { duration: 0 } : transition.stage;
  const active = steps[index];

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
          initial={false}
          animate={{ pathLength: (index + 1) / count }}
          transition={t}
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
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={index}
              className="inline-block"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </m.span>
          </AnimatePresence>
          <span className="text-separator"> / {count}</span>
        </span>
        <span
          className={cn("font-medium text-text-2", size === "lg" ? "text-[14px]" : "text-[12px]")}
        >
          {active?.title}
        </span>
      </div>

      {/* Camada que gira: 4 nós (etapa k a k × 90°) */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={false}
        animate={{ rotate: rotation }}
        transition={t}
      >
        {steps.map((step, k) => {
          const isActive = k === index;
          const angle = (k * Math.PI) / 2;
          const cx = d.ring / 2 + (d.ring / 2) * Math.sin(angle);
          const cy = d.ring / 2 - (d.ring / 2) * Math.cos(angle);
          return (
            <m.div
              key={step.id}
              className={cn(
                "absolute flex items-center justify-center rounded-full font-display font-semibold transition-colors duration-500",
                isActive
                  ? "bg-accent text-bg shadow-[0_0_0_6px_var(--color-bg),0_0_0_7px_color-mix(in_srgb,var(--color-accent)_50%,transparent)]"
                  : "border border-line-strong bg-surface text-text-2 shadow-[0_0_0_6px_var(--color-bg)]",
              )}
              style={{
                width: d.node,
                height: d.node,
                left: cx - d.node / 2,
                top: cy - d.node / 2,
                fontSize: d.nodeFont,
              }}
              initial={false}
              animate={{ rotate: -rotation }}
              transition={t}
            >
              {k + 1}
            </m.div>
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
      {labelSlots.map((slot, s) => {
        const step = steps[(index + s) % count];
        return (
          <span
            key={s}
            aria-hidden="true"
            className={cn(
              "absolute font-display text-[14px]",
              slot,
              s === 0 ? "font-semibold text-text" : "font-medium text-text-3",
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={step?.id}
                className="inline-block whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              >
                {step?.title}
              </m.span>
            </AnimatePresence>
          </span>
        );
      })}
    </div>
  );
}

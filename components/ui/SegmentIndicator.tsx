"use client";

import { useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

interface SegmentIndicatorProps {
  labels: string[];
  active: number;
  className?: string;
  /** Posição contínua do palco: o traço enche conforme a rolagem em vez de trocar de uma vez. */
  pos?: MotionValue<number>;
  /** Quando informado, cada segmento vira um botão que leva ao passo escolhido. */
  onSelect?: (index: number) => void;
  /** Nome acessível de cada botão (obrigatório junto com `onSelect`). */
  itemLabel?: (index: number) => string;
}

function ScrubFill({ pos, i }: { pos: MotionValue<number>; i: number }) {
  const scaleX = useTransform(pos, [i - 1, i, i + 1], [0, 1, 0]);
  return <m.span style={{ scaleX }} className="absolute inset-0 origin-left bg-accent" />;
}

/** 4 traços de 3 px. Sem `onSelect` são só indicadores (aria-hidden); com ele, botões. */
export function SegmentIndicator({
  labels,
  active,
  className,
  pos,
  onSelect,
  itemLabel,
}: SegmentIndicatorProps) {
  return (
    <div
      aria-hidden={onSelect ? undefined : "true"}
      className={cn("grid gap-2.5 md:gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
    >
      {labels.map((label, i) => {
        const on = i === active;
        const content = (
          <>
            <i className="relative block h-[3px] w-full overflow-hidden rounded-[2px] bg-line">
              {pos ? (
                <ScrubFill pos={pos} i={i} />
              ) : (
                <span
                  className={cn(
                    "absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-(--ease-standard) motion-reduce:transition-none",
                    on ? "scale-x-100" : "scale-x-0",
                  )}
                />
              )}
            </i>
            <span
              className={cn(
                "truncate text-[11px] font-medium transition-colors duration-300 md:text-[12px]",
                on ? "text-text" : "text-text-3",
                onSelect && !on && "group-hover:text-text-2",
              )}
            >
              {i + 1}
              <span className="max-md:sr-only"> · {label}</span>
            </span>
          </>
        );
        return onSelect ? (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={itemLabel?.(i)}
            aria-current={on ? "step" : undefined}
            className="group flex min-w-0 cursor-pointer flex-col gap-2.5 py-2 text-left max-md:items-center"
          >
            {content}
          </button>
        ) : (
          <div key={label} className="flex min-w-0 flex-col gap-2.5 max-md:items-center">
            {content}
          </div>
        );
      })}
    </div>
  );
}

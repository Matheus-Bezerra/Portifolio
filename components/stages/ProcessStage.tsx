"use client";

import { ArrowDown } from "@/components/icons";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SegmentIndicator } from "@/components/ui/SegmentIndicator";
import type { ProcessStep } from "@/types/content";
import { cn, pad2 } from "@/lib/utils";
import { ProcessCycle } from "./ProcessCycle";
import { StageLayer } from "./StageLayer";
import { StageShell } from "./StageShell";
import { useScrollStage, useStageMode } from "./useScrollStage";

interface ProcessStageProps {
  steps: ProcessStep[];
  cycleLabel: string;
  scrollHint: string;
}

const stacked = "grid [&>*]:col-start-1 [&>*]:row-start-1";

/* Versão estática: 4 etapas, sem anel */
function ProcessList({ steps }: { steps: ProcessStep[] }) {
  return (
    <Stagger as="ol" className="border-t border-separator">
      {steps.map((step, i) => (
        <StaggerItem
          as="li"
          key={step.id}
          className="grid grid-cols-[40px_1fr] gap-4 border-b border-line py-5 md:grid-cols-[56px_1fr]"
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex size-9 items-center justify-center rounded-full border font-display text-[14px] font-semibold",
              i === 0 ? "border-accent text-accent" : "border-line-strong text-text-2",
            )}
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-[18px] leading-[26px] font-semibold">
              <span className="sr-only">Etapa {i + 1}: </span>
              {step.title}
            </h3>
            <p className="type-small">{step.descriptionStatic ?? step.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function ProcessStage({ steps, cycleLabel, scrollHint }: ProcessStageProps) {
  const mode = useStageMode();
  const count = steps.length;
  const { containerRef, index, pos, announced, onKeyDown, goToStep } = useScrollStage(
    count,
    mode === "stage",
  );

  if (mode === "static") return <ProcessList steps={steps} />;

  const active = steps[index];

  return (
    <StageShell
      count={count}
      containerRef={containerRef}
      label="Como trabalho"
      announcement={`Etapa ${index + 1} de ${count}: ${active?.title ?? ""}`}
      announced={announced}
      onKeyDown={onKeyDown}
    >
      <div className="relative z-10 flex flex-1 flex-col gap-8 max-lg:justify-center max-md:[@media(max-height:720px)]:gap-5">
        <div className="flex flex-col justify-center gap-6 md:gap-8 lg:grid lg:flex-1 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-x-6 max-md:[@media(max-height:720px)]:gap-3">
          {/* Ciclo: em cima no mobile/tablet, à direita no desktop */}
          <div className="order-first flex justify-center py-6 md:py-2 lg:order-last lg:col-span-7 lg:col-start-6 lg:py-0">
            <div className="md:hidden">
              <ProcessCycle
                steps={steps}
                index={index}
                pos={pos}
                cycleLabel={cycleLabel}
                onSelect={goToStep}
                size="sm"
              />
            </div>
            <div className="relative hidden h-[calc(540px*var(--ps))] w-[calc(700px*var(--ps))] stage-ring md:block">
              <div className="absolute top-0 left-0 origin-top-left scale-(--ps)">
                <ProcessCycle
                  steps={steps}
                  index={index}
                  pos={pos}
                  cycleLabel={cycleLabel}
                  onSelect={goToStep}
                  size="lg"
                />
              </div>
            </div>
          </div>

          <div className={cn(stacked, "lg:col-span-5")}>
            {steps.map((step, i) => {
              const isActive = i === index;
              return (
                <StageLayer
                  key={step.id}
                  pos={pos}
                  i={i}
                  kind="text"
                  active={isActive}
                  className={cn("flex flex-col gap-2 lg:gap-5", !isActive && "pointer-events-none")}
                >
                  <p className="type-meta text-[11px] tracking-[0.14em] uppercase lg:text-[12px]">
                    Etapa {i + 1} de {count}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden stage-number lg:block stage-compact:hidden"
                  >
                    {pad2(i)}
                  </span>
                  <h3 className="font-display text-[26px] leading-[34px] font-semibold tracking-[-0.015em] lg:text-[clamp(40px,3.6vw,56px)] lg:leading-[1.12]">
                    {step.title}
                  </h3>
                  <p className="type-body lg:max-w-[440px] lg:text-[18px] lg:leading-[30px]">
                    {step.description}
                  </p>
                  <p className="mt-2 hidden items-center gap-1.5 type-meta lg:flex">
                    {scrollHint} <ArrowDown size={14} />
                  </p>
                </StageLayer>
              );
            })}
          </div>
        </div>

        <SegmentIndicator
          labels={steps.map((s) => s.title)}
          active={index}
          pos={pos}
          onSelect={goToStep}
          itemLabel={(i) => `Ir para a etapa ${i + 1}: ${steps[i]?.title ?? ""}`}
        />
      </div>
    </StageShell>
  );
}

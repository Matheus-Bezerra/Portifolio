"use client";

import { ArrowDown, ArrowRight } from "@/components/icons";
import { whatsappLink } from "@/content/contact";
import { buttonClasses } from "@/components/ui/Button";
import { SegmentIndicator } from "@/components/ui/SegmentIndicator";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Service } from "@/types/content";
import { cn, pad2 } from "@/lib/utils";
import { ServiceIllustration } from "./ServiceIllustration";
import { StageLayer } from "./StageLayer";
import { StageShell } from "./StageShell";
import { useScrollStage, useStageMode } from "./useScrollStage";

interface ServicesStageProps {
  services: Service[];
  ctaLabel: string;
  scrollHint: string;
}

const stacked = "grid [&>*]:col-start-1 [&>*]:row-start-1";

function ContactCta({
  service,
  label,
  className,
  arrow,
}: {
  service: Service;
  label: string;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a
      href={whatsappLink(service.projectType)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
      {arrow && <ArrowRight size={18} />}
      <span className="sr-only"> — {service.title} (abre em nova aba)</span>
    </a>
  );
}

/* ------------------------------------------------------------------
   Versão estática — movimento reduzido ou janela baixa (< 640 px)
   ------------------------------------------------------------------ */
function ServicesList({ services, ctaLabel }: Omit<ServicesStageProps, "scrollHint">) {
  return (
    <Stagger as="ol" className="border-t border-separator">
      {services.map((service, i) => (
        <StaggerItem
          as="li"
          key={service.id}
          className="grid grid-cols-[40px_1fr] gap-4 border-b border-line py-5 md:grid-cols-[56px_1fr]"
        >
          <span
            aria-hidden="true"
            className="font-display text-[24px] font-semibold text-separator"
          >
            {pad2(i)}
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-[18px] leading-[26px] font-semibold">
              {service.title}
            </h3>
            <p className="type-small">{service.description}</p>
            <ContactCta
              service={service}
              label={ctaLabel}
              className="flex min-h-11 items-center self-start text-[14px] text-link md:min-h-0"
            />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------
   Palco fixo
   ------------------------------------------------------------------ */
export function ServicesStage({ services, ctaLabel, scrollHint }: ServicesStageProps) {
  const mode = useStageMode();
  const count = services.length;
  const { containerRef, index, pos, announced, onKeyDown, goToStep } = useScrollStage(
    count,
    mode === "stage",
  );

  if (mode === "static") {
    return <ServicesList services={services} ctaLabel={ctaLabel} />;
  }

  const active = services[index];

  return (
    <StageShell
      count={count}
      containerRef={containerRef}
      label="Serviços"
      announcement={`Serviço ${index + 1} de ${count}: ${active?.title ?? ""}`}
      announced={announced}
      onKeyDown={onKeyDown}
    >
      <div className="relative z-10 flex flex-1 flex-col gap-8 max-lg:justify-center max-md:[@media(max-height:720px)]:gap-5">
        <div className="flex flex-col justify-center gap-6 md:gap-8 lg:grid lg:flex-1 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-x-6 max-md:[@media(max-height:720px)]:gap-3">
          {/* Ilustração: em cima no mobile/tablet, à direita no desktop */}
          <div className="order-first flex justify-center lg:order-last lg:col-span-7 lg:col-start-6">
            <div className="relative h-[calc(300px*var(--is))] w-[calc(420px*var(--is))] stage-art">
              <div className={cn("absolute top-0 left-0 origin-top-left scale-(--is)", stacked)}>
                {services.map((service, i) => (
                  <StageLayer key={service.id} pos={pos} i={i} kind="art" active={i === index}>
                    <ServiceIllustration kind={service.illustration} />
                  </StageLayer>
                ))}
              </div>
            </div>
          </div>

          {/* Texto: os 4 estados ocupam a mesma célula para a altura não variar */}
          <div className={cn(stacked, "lg:col-span-5")}>
            {services.map((service, i) => {
              const isActive = i === index;
              return (
                <StageLayer
                  key={service.id}
                  pos={pos}
                  i={i}
                  kind="text"
                  active={isActive}
                  className={cn(
                    "flex flex-col gap-2.5 lg:gap-5",
                    !isActive && "pointer-events-none",
                  )}
                >
                  <p className="type-meta text-[11px] tracking-[0.14em] uppercase lg:text-[12px]">
                    Serviço {i + 1} de {count}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden stage-number lg:block stage-compact:hidden"
                  >
                    {pad2(i)}
                  </span>
                  <h3 className="font-display text-[24px] leading-8 font-semibold tracking-[-0.015em] lg:text-[clamp(38px,3.4vw,52px)] lg:leading-[1.15]">
                    {service.title}
                  </h3>
                  <p className="type-small text-[15px] leading-6 lg:max-w-[460px] lg:text-[18px] lg:leading-[30px]">
                    {service.description}
                  </p>
                  <div className="lg:mt-2">
                    <ContactCta
                      service={service}
                      label={ctaLabel}
                      arrow
                      className={buttonClasses({
                        variant: "primary",
                        size: "md",
                        fullWidthMobile: true,
                      })}
                    />
                  </div>
                  <p className="mt-2 hidden items-center gap-1.5 type-meta lg:flex">
                    {scrollHint} <ArrowDown size={14} />
                  </p>
                </StageLayer>
              );
            })}
          </div>
        </div>

        <SegmentIndicator
          labels={services.map((s) => s.shortLabel)}
          active={index}
          pos={pos}
          onSelect={goToStep}
          itemLabel={(i) => `Ir para o serviço ${i + 1}: ${services[i]?.title ?? ""}`}
        />
      </div>
    </StageShell>
  );
}

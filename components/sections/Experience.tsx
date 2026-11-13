import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { SplitWords } from "@/components/motion/SplitWords";
import { TechInline } from "@/components/ui/TechInline";
import { experienceIntro, experiences } from "@/content/experiences";
import { CardFill, TimelineDot, TimelineTrack } from "./experience/Timeline";
import { cn } from "@/lib/utils";

export function Experience() {
  const items = [...experiences].sort((a, b) => a.order - b.order);
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      className="border-t border-line section-y"
    >
      <div className="shell flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
        {/* No desktop, título e texto ficam fixos a 120 px do topo enquanto a linha do tempo rola */}
        <Reveal
          variant="fadeIn"
          className="flex flex-col gap-6 lg:sticky lg:top-[120px] lg:col-span-4 lg:gap-5 lg:pr-6"
        >
          <p className="eyebrow">{experienceIntro.eyebrow}</p>
          <SplitWords
            as="h2"
            id="experiencia-titulo"
            className="type-h2 lg:type-h2-sm"
            text={experienceIntro.title}
          />
          <RevealText className="type-body">{experienceIntro.lead}</RevealText>
        </Reveal>

        <TimelineTrack className="lg:col-span-8 lg:col-start-5">
          <Stagger
            as="ol"
            gap={0.1}
            className="flex flex-col gap-3 lg:gap-10 lg:border-l lg:border-line lg:pl-8"
          >
            {items.map((exp, i) => {
              const last = i === items.length - 1;
              return (
                <StaggerItem
                  as="li"
                  key={exp.id}
                  className={cn(
                    "relative flex flex-col gap-2.5 rounded-card border bg-surface p-5",
                    "lg:grid lg:grid-cols-[170px_1fr] lg:gap-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pb-10 lg:shadow-none",
                    !last && "lg:border-b lg:border-line-soft",
                    exp.current ? "border-line-strong" : "border-line",
                  )}
                >
                  {/* Mobile: a borda esquerda se preenche com a rolagem */}
                  <CardFill current={exp.current} />
                  {/* Ponto da linha do tempo (desktop) */}
                  <TimelineDot
                    current={exp.current}
                    className={cn(
                      "absolute hidden rounded-full lg:block",
                      exp.current
                        ? "top-1.5 -left-[39px] size-3 bg-accent shadow-[0_0_0_5px_var(--color-bg),0_0_0_6px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]"
                        : "top-[7px] -left-[38px] size-2.5 border-[1.5px] shadow-[0_0_0_5px_var(--color-bg)]",
                    )}
                  />

                  <div className="flex items-center justify-between lg:flex-col lg:items-start lg:justify-start">
                    <span
                      className={cn(
                        "text-[13px] font-medium lg:text-[14px] lg:leading-[22px]",
                        exp.current ? "text-text" : "text-text-2",
                      )}
                    >
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase lg:mt-1.5 lg:text-[12px]">
                        {experienceIntro.currentLabel}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-display text-[20px] leading-7 font-semibold tracking-[-0.01em] lg:text-[22px] lg:leading-[30px]">
                      {exp.company}
                    </h3>
                    <p className="text-[14px] leading-5 font-semibold text-text lg:text-[15px] lg:leading-[22px]">
                      {exp.role}
                    </p>
                    <p className="type-small lg:hidden">{exp.descriptionShort}</p>
                    <p className="hidden text-[15px] leading-[25px] text-text-2 lg:block">
                      {exp.description}
                    </p>
                    <TechInline
                      items={exp.technologies}
                      limit={experienceIntro.mobileTechLimit}
                      className="text-[12px] lg:hidden"
                    />
                    <TechInline items={exp.technologies} className="mt-1 hidden lg:block" />
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </TimelineTrack>
      </div>
    </section>
  );
}

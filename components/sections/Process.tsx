import { SplitWords } from "@/components/motion/SplitWords";
import { ProcessStage } from "@/components/stages/ProcessStage";
import { CTABand } from "@/components/ui/CTABand";
import { processIntro, processSteps } from "@/content/process";
import { servicesIntro } from "@/content/services";

/** "Como trabalho" continua Serviços: começa com 24 px (16 no mobile) e sem filete superior. */
export function Process() {
  return (
    <section
      id="como-trabalho"
      aria-labelledby="como-trabalho-titulo"
      className="pt-4 pb-16 lg:pt-6 lg:pb-24"
    >
      <div className="shell flex flex-col gap-6 lg:gap-10">
        <div className="flex items-center gap-4 lg:gap-6">
          <SplitWords
            as="h2"
            id="como-trabalho-titulo"
            className="font-display text-[22px] leading-[30px] font-semibold tracking-[-0.01em] lg:text-[28px] lg:leading-9"
            text={processIntro.title}
          />
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>

        <ProcessStage
          steps={processSteps}
          cycleLabel={processIntro.cycleLabel}
          scrollHint={servicesIntro.scrollHint}
        />

        <CTABand {...processIntro.cta} />
      </div>
    </section>
  );
}

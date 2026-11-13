import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { SplitWords } from "@/components/motion/SplitWords";
import { ServicesStage } from "@/components/stages/ServicesStage";
import { services, servicesIntro } from "@/content/services";

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="border-t border-line section-y"
    >
      <div className="shell flex flex-col gap-6 lg:gap-10">
        <Reveal
          variant="fadeIn"
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="flex max-w-[720px] flex-col gap-6 lg:gap-5">
            <p className="eyebrow">{servicesIntro.eyebrow}</p>
            <SplitWords
              as="h2"
              id="servicos-titulo"
              className="type-h2"
              text={servicesIntro.title}
            />
          </div>
          <RevealText className="type-body lg:max-w-[400px]">{servicesIntro.lead}</RevealText>
        </Reveal>

        <ServicesStage
          services={services}
          ctaLabel={servicesIntro.ctaLabel}
          scrollHint={servicesIntro.scrollHint}
        />
      </div>
    </section>
  );
}

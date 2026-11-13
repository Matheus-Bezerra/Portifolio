import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { CTABand } from "@/components/ui/CTABand";
import { projects, workIntro } from "@/content/projects";
import {
  ComplementaryProjectCard,
  FeaturedProjectCard,
  SecondaryProjectCard,
} from "./ProjectCards";

export function Work() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const featured = ordered.filter((p) => p.tier === "featured");
  const secondary = ordered.filter((p) => p.tier === "secondary");
  const complementary = ordered.filter((p) => p.tier === "complementary");

  return (
    <section
      id="trabalhos"
      aria-labelledby="trabalhos-titulo"
      className="border-t border-line section-y lg:pb-24"
    >
      <div className="shell flex flex-col gap-5 lg:gap-10">
        <SplitWords as="h2" id="trabalhos-titulo" className="type-h2" text={workIntro.title} />

        {featured.map((project) => (
          <Reveal key={project.slug} variant="section">
            <FeaturedProjectCard project={project} />
          </Reveal>
        ))}

        {secondary.map((project) => (
          <Reveal key={project.slug} variant="section">
            <SecondaryProjectCard project={project} />
          </Reveal>
        ))}

        {complementary.length > 0 && (
          <div className="mt-2 flex flex-col gap-5 lg:pt-2">
            <div className="flex items-center gap-3.5 lg:gap-5">
              <h3 className="font-display text-[16px] leading-[22px] font-semibold lg:text-[18px] lg:leading-6">
                {workIntro.complementaryTitle}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            {/* Novos projetos entram como novos cards S nesta mesma grade */}
            <Stagger
              as="ul"
              className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
              {complementary.map((project) => (
                <StaggerItem as="li" key={project.slug}>
                  <ComplementaryProjectCard project={project} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}

        <div className="mt-3 lg:mt-0">
          <CTABand {...workIntro.cta} />
        </div>
      </div>
    </section>
  );
}

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { AboutBody } from "./AboutBody";
import { AboutStatement } from "./AboutStatement";

function CvLink({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-3.5",
        className,
      )}
    >
      <span className="type-small">{about.cvPrompt}</span>
      <TextLink
        href={site.cvHref}
        target="_blank"
        rel="noopener"
        arrow
        className="flex min-h-11 items-center self-start text-[15px] lg:min-h-0 lg:text-[14px]"
      >
        {about.cvLabel}
        <span className="sr-only"> (PDF, abre em nova aba)</span>
      </TextLink>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="border-t border-line section-y">
      <div className="shell flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
        <Reveal variant="fadeIn" className="lg:col-span-3 lg:pt-4">
          <p className="eyebrow">{about.eyebrow}</p>
        </Reveal>

        <div className="flex flex-col gap-6 lg:col-span-9 lg:col-start-4 lg:gap-12">
          <AboutStatement id="sobre-titulo" parts={about.statement} />

          <Reveal variant="fadeUp">
            <AboutBody
              paragraphs={about.paragraphs}
              secondParagraphMobile={about.secondParagraphMobile}
              readMoreLabel={about.readMoreLabel}
              readLessLabel={about.readLessLabel}
              cv={<CvLink />}
            />
          </Reveal>

          <Stagger
            as="dl"
            className="flex flex-col border-t border-separator lg:grid lg:grid-cols-4 lg:border-line"
          >
            {about.facts.map((fact, i) => (
              <StaggerItem
                key={fact.label}
                className={cn(
                  "flex gap-4 border-b border-line py-4 lg:flex-col lg:gap-2 lg:border-b-0 lg:pt-6 lg:pr-6 lg:pb-0",
                  i > 0 && "lg:border-l lg:pl-6",
                )}
              >
                <dt className="w-[100px] shrink-0 pt-[3px] type-tag text-[10px] lg:w-auto lg:pt-0 lg:text-[11px]">
                  {fact.label}
                </dt>
                <dd className="text-[14px] leading-[22px] font-medium text-text lg:text-[15px] lg:leading-6">
                  {fact.value}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>

          <CvLink className="lg:hidden" />
        </div>
      </div>
    </section>
  );
}

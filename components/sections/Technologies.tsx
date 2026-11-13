import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { technologiesIntro, technologyGroups } from "@/content/technologies";
import { cn } from "@/lib/utils";

/** Lista em texto por área — sem pílulas, logotipos ou faixa animada. */
export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-titulo"
      className="border-t border-line section-y"
    >
      <div className="shell flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
        <Reveal variant="fadeIn" className="flex flex-col gap-6 lg:col-span-4 lg:gap-5 lg:pr-6">
          <SplitWords
            as="h2"
            id="tecnologias-titulo"
            className="type-h2-sm"
            text={technologiesIntro.title}
          />
          <p className="type-meta">
            <span className="font-semibold text-text underline decoration-accent underline-offset-[5px]">
              {technologiesIntro.legendTerm}
            </span>
            {technologiesIntro.legendText}
          </p>
        </Reveal>

        <Stagger className="border-t border-separator lg:col-span-8 lg:col-start-5" gap={0.07}>
          {technologyGroups.map((group) => (
            <StaggerItem
              key={group.id}
              className="flex flex-col gap-2 border-b border-line py-[18px] lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-x-6 lg:py-[22px]"
            >
              <h3 className="font-display text-[14px] leading-5 font-semibold text-text lg:text-[15px] lg:leading-[30px]">
                {group.title}
              </h3>
              <ul className="flex flex-wrap items-baseline">
                {group.items.map((item, i) => (
                  <li key={item.name} className="text-[16px] leading-[30px] whitespace-nowrap">
                    <span
                      className={cn(
                        item.primary
                          ? "font-semibold text-text underline decoration-accent decoration-1 underline-offset-[6px]"
                          : "text-text-2",
                      )}
                    >
                      {item.name}
                      {item.primary && <span className="sr-only"> (principal)</span>}
                    </span>
                    {i < group.items.length - 1 && (
                      <span aria-hidden="true" className="px-2.5 text-separator">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

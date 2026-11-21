import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { technologiesIntro } from "@/content/technologies";
import { TechnologiesRows } from "./technologies/TechnologiesRows";

/** Todas as áreas e tecnologias de uma vez: uma linha por área, só texto. */
export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-titulo"
      className="border-t border-line section-y"
    >
      <div className="shell flex flex-col gap-10 lg:gap-12">
        <Reveal variant="fadeIn">
          <SplitWords
            as="h2"
            id="tecnologias-titulo"
            className="type-h2-sm"
            text={technologiesIntro.title}
          />
        </Reveal>
        <TechnologiesRows />
      </div>
    </section>
  );
}

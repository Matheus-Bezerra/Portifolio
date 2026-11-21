import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { technologiesIntro } from "@/content/technologies";
import { TechnologiesRows } from "./technologies/TechnologiesRows";

/** Todas as áreas e tecnologias de uma vez, só texto: título fixo e linhas passando ao lado. */
export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-titulo"
      className="border-t border-line section-y"
    >
      <div className="shell flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
        {/* O título fica fixo enquanto as linhas passam ao lado */}
        <Reveal variant="fadeIn" className="lg:sticky lg:top-[120px] lg:col-span-4 lg:pr-6">
          <SplitWords
            as="h2"
            id="tecnologias-titulo"
            className="type-h2-sm"
            text={technologiesIntro.title}
          />
        </Reveal>
        <div className="lg:col-span-8">
          <TechnologiesRows />
        </div>
      </div>
    </section>
  );
}

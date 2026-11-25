import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { TechInline } from "@/components/ui/TechInline";
import { technologyGroups } from "@/content/technologies";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Uma linha por área, com o nome à esquerda e as tecnologias à direita.
 * Entrada simples: o filete se desenha e a linha sobe com fade, sem outros efeitos.
 * A coluna do nome é estreita para caber ao lado do título fixo.
 */
export function TechnologiesRows() {
  return (
    <ul className="flex flex-col">
      {technologyGroups.map((group, i) => (
        <Reveal
          as="li"
          key={group.id}
          variant="fadeUp"
          className="relative grid gap-3 py-6 md:grid-cols-[minmax(0,210px)_1fr] md:gap-8 md:py-7"
        >
          {i === 0 && <DrawLine className="absolute inset-x-0 top-0 h-px bg-separator" />}
          <div className="flex items-baseline gap-4">
            <span className="w-6 text-[11px] leading-4 font-semibold tracking-[0.14em] text-text-3">
              {pad(i + 1)}
            </span>
            <h3 className="font-display text-[19px] leading-7 font-semibold text-text md:text-[20px]">
              {group.title}
            </h3>
          </div>
          <TechInline
            items={group.items.map((t) => t.name)}
            className="pl-10 text-[16px] leading-8 font-normal text-text-2 md:pl-0 md:text-[17px] md:leading-9"
          />
          <DrawLine className="absolute inset-x-0 bottom-0 h-px bg-line" delay={0.1} />
        </Reveal>
      ))}
    </ul>
  );
}

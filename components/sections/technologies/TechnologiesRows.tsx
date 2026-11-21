"use client";

import { Fragment, useRef } from "react";
import { useInView, useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { DrawLine } from "@/components/motion/DrawLine";
import { technologyGroups } from "@/content/technologies";
import type { TechnologyGroup } from "@/types/content";
import { ease, revealViewport } from "@/lib/motion";

const pad = (n: number) => String(n).padStart(2, "0");

/** A linha sobe e, depois dela, cada tecnologia entra uma a uma. */
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: ease.expressive,
      delayChildren: 0.25,
      staggerChildren: 0.035,
    },
  },
};

const techVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.standard } },
};

/** Com movimento reduzido: só um fade curto, sem deslocamento nem cascata. */
const reducedRow: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
};
const reducedTech: Variants = { hidden: {}, visible: {} };

function TechRow({ group, index }: { group: TechnologyGroup; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  /* A linha que cruza a faixa central da tela fica em destaque; no celular, sem hover, é ela que dá vida à seção */
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <m.li
      ref={ref}
      data-active={active}
      className="group relative grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-8 md:py-7"
      variants={reduce ? reducedRow : rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <div className="flex items-baseline gap-4">
        <span className="w-6 text-[11px] leading-4 font-semibold tracking-[0.14em] text-text-3 transition-colors duration-300 group-hover:text-accent group-data-[active=true]:text-accent motion-reduce:transition-none">
          {pad(index + 1)}
        </span>
        <h3 className="font-display text-[19px] leading-7 font-semibold text-text md:text-[20px]">
          {group.title}
        </h3>
      </div>

      <p className="pl-10 font-display text-[17px] leading-8 font-medium text-text-2 transition-colors duration-300 group-hover:text-text group-data-[active=true]:text-text motion-reduce:transition-none md:pl-0 md:text-[20px] md:leading-9">
        {group.items.map((item, i) => (
          <Fragment key={item.name}>
            {i > 0 && (
              <span aria-hidden="true" className="text-separator">
                {" / "}
              </span>
            )}
            <m.span
              variants={reduce ? reducedTech : techVariants}
              className="inline-block transition-[color,translate] duration-200 ease-(--ease-standard) motion-reduce:transition-none pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:text-accent"
            >
              {item.name}
            </m.span>
          </Fragment>
        ))}
      </p>

      {/* Traço laranja que se desenha por cima do filete: linha ativa ou hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-(--ease-expressive) group-hover:scale-x-100 group-data-[active=true]:scale-x-100 motion-reduce:transition-none"
      />
    </m.li>
  );
}

/** Uma linha por área, com o nome à esquerda e as tecnologias à direita. */
export function TechnologiesRows() {
  return (
    <div className="flex flex-col">
      <DrawLine className="h-px w-full bg-separator" />
      <ul>
        {technologyGroups.map((group, i) => (
          <TechRow key={group.id} group={group} index={i} />
        ))}
      </ul>
    </div>
  );
}

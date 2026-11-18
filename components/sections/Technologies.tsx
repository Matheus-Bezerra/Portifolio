"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { TechInline } from "@/components/ui/TechInline";
import { technologiesIntro, technologyGroups } from "@/content/technologies";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** Abas por área (desktop) e acordeão (mobile). Só texto, sem logos ou pílulas. */
export function Technologies() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const focusTab = (i: number) => {
    const next = (i + technologyGroups.length) % technologyGroups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: technologyGroups.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      focusTab(keys[e.key]!);
    }
  };

  const group = technologyGroups[active] ?? technologyGroups[0]!;

  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-titulo"
      className="border-t border-line section-y"
    >
      <div className="shell flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
        <Reveal variant="fadeIn" className="flex flex-col gap-8 lg:col-span-4 lg:pr-6">
          <SplitWords
            as="h2"
            id="tecnologias-titulo"
            className="type-h2-sm"
            text={technologiesIntro.title}
          />

          {/* Desktop: lista de abas */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby="tecnologias-titulo"
            className="hidden border-t border-line lg:flex lg:flex-col"
            onKeyDown={onKeyDown}
          >
            {technologyGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => {
                    clearTimeout(hoverTimer.current);
                    hoverTimer.current = setTimeout(() => setActive(i), 120);
                  }}
                  onMouseLeave={() => clearTimeout(hoverTimer.current)}
                  className={cn(
                    "group flex items-center gap-4 border-b border-line py-4 text-left transition-colors",
                    selected ? "text-text" : "text-text-2 hover:text-text",
                  )}
                >
                  <span className="w-6 text-[11px] leading-4 font-semibold tracking-[0.14em] text-text-3">
                    {pad(i + 1)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-0.5 bg-accent transition-[width] duration-300 motion-reduce:transition-none",
                      selected ? "w-6" : "w-0",
                    )}
                  />
                  <span className="flex-1 font-display text-[17px] leading-6 font-semibold">
                    {g.title}
                  </span>
                  <span className="text-[12px] leading-4 text-text-3 tabular-nums">
                    {pad(g.items.length)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Desktop: painel da área ativa */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${group.id}`}
          className="hidden min-h-[372px] lg:col-span-7 lg:col-start-6 lg:block"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={group.id}
              className="grid grid-cols-2 gap-x-8"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.12 } }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduce ? 0 : 0.04 } },
              }}
            >
              {group.items.map((item) => (
                <m.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.3 } },
                  }}
                  className="border-b border-line py-2.5 first:border-t [&:nth-child(2)]:border-t font-display text-[30px] leading-[40px] font-semibold tracking-[-0.02em] text-text"
                >
                  {item.name}
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>

        {/* Mobile: acordeão */}
        <div className="border-t border-line lg:hidden">
          {technologyGroups.map((g, i) => {
            const expanded = open === i;
            const panelId = `${uid}-acc-${g.id}`;
            return (
              <div key={g.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : i)}
                    className={cn(
                      "flex w-full items-center gap-3 py-4 text-left",
                      expanded ? "text-text" : "text-text-2",
                    )}
                  >
                    <span className="w-6 text-[11px] leading-4 font-semibold tracking-[0.14em] text-text-3">
                      {pad(i + 1)}
                    </span>
                    <span className="flex-1 font-display text-[16px] leading-6 font-semibold">
                      {g.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-[18px] leading-none text-accent transition-transform motion-reduce:transition-none",
                        expanded && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div id={panelId} hidden={!expanded} className="pb-5 pl-9">
                  <TechInline
                    items={g.items.map((t) => t.name)}
                    className="text-[16px] leading-[28px] text-text"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

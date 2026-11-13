"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

interface AboutBodyProps {
  paragraphs: readonly string[];
  secondParagraphMobile: string;
  readMoreLabel: string;
  readLessLabel: string;
  /** Bloco do currículo (renderizado pelo servidor). */
  cv: React.ReactNode;
}

/**
 * Texto do Sobre. No desktop aparecem os 3 parágrafos; no mobile o 2º vem resumido
 * e o restante fica em "Ler mais".
 */
export function AboutBody({
  paragraphs,
  secondParagraphMobile,
  readMoreLabel,
  readLessLabel,
  cv,
}: AboutBodyProps) {
  const [expanded, setExpanded] = useState(false);
  const [p1, p2 = "", p3] = paragraphs;
  const p2Rest = p2.startsWith(secondParagraphMobile) ? p2.slice(secondParagraphMobile.length) : "";
  const hiddenOnMobile = expanded ? "" : "hidden lg:inline";

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-12">
      <div className="flex flex-col gap-4 lg:gap-5">
        <p className="type-body text-text lg:text-[17px] lg:leading-7">{p1}</p>
        <p className="type-body">
          {p2Rest ? secondParagraphMobile : p2}
          {p2Rest && <span className={hiddenOnMobile}>{p2Rest}</span>}
        </p>
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">
        <p id="sobre-mais" className={cn("type-body", expanded ? "block" : "hidden lg:block")}>
          {p3}
        </p>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="sobre-mais"
          onClick={() => setExpanded((v) => !v)}
          className="flex min-h-11 items-center gap-1.5 self-start text-[14px] font-medium text-text lg:hidden"
        >
          {expanded ? readLessLabel : readMoreLabel}
          <ChevronDown
            size={16}
            className={cn(
              "text-accent transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
        <div className="hidden lg:block">{cv}</div>
      </div>
    </div>
  );
}

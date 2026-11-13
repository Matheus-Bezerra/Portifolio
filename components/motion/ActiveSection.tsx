"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { spySections } from "@/content/navigation";
import type { SectionId } from "@/types/content";

const ActiveSectionContext = createContext<SectionId>("inicio");

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}

/**
 * Scroll-spy: a seção ativa é a que cruza uma linha a ~35% da altura da janela.
 * "Como trabalho" mapeia para "Serviços".
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    const elements = spySections
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((s): s is (typeof spySections)[number] & { el: HTMLElement } => s.el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // A última seção (na ordem do documento) que cruza a linha vence.
        const current = [...elements].reverse().find((s) => visible.has(s.id));
        if (current) setActive(current.nav);
      },
      { rootMargin: "-35% 0px -64% 0px", threshold: 0 },
    );
    elements.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  // Ao chegar por âncora, o eyebrow da seção de destino marca a chegada (CSS cuida do movimento).
  useEffect(() => {
    let timer: number | undefined;
    let marked: Element | null = null;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      const eyebrow = document.getElementById(id)?.querySelector(".eyebrow");
      if (!eyebrow) return;
      window.clearTimeout(timer);
      marked?.removeAttribute("data-arrived");
      // reinicia a animação mesmo se o mesmo eyebrow for alvo duas vezes seguidas
      void (eyebrow as HTMLElement).offsetWidth;
      eyebrow.setAttribute("data-arrived", "");
      marked = eyebrow;
      timer = window.setTimeout(() => eyebrow.removeAttribute("data-arrived"), 1400);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(timer);
    };
  }, []);

  return <ActiveSectionContext.Provider value={active}>{children}</ActiveSectionContext.Provider>;
}

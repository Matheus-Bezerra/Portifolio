"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Enquanto algo trava a rolagem da página (abertura, menu mobile), o Lenis não a move
 * por trás: ele só ignora o gesto e o navegador respeita o `overflow: hidden`.
 */
function pageIsLocked() {
  return getComputedStyle(document.documentElement).overflow === "hidden";
}

/**
 * Links `#seção` da própria página: rola suavemente até a seção (já descontando o
 * cabeçalho fixo), atualiza o endereço e leva o foco para o destino, como o menu faz.
 */
function AnchorLinks() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.target === "_blank") return;
      const hash = link.getAttribute("href") ?? "";
      if (hash.length < 2) return;
      let target: HTMLElement | null = null;
      try {
        target = document.querySelector<HTMLElement>(decodeURIComponent(hash));
      } catch {
        return;
      }
      if (!target) return;
      event.preventDefault();
      /* O Lenis já desconta o scroll-padding-top do html (a altura do cabeçalho fixo) */
      lenis.scrollTo(target);
      history.replaceState(null, "", hash);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/**
 * Rolagem suave com inércia (Lenis) só para quem usa mouse ou trackpad: o toque continua
 * nativo. Com movimento reduzido nada é instalado e a página rola como o navegador manda.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, prevent: pageIsLocked }}>
      <AnchorLinks />
      {children}
    </ReactLenis>
  );
}

"use client";

import { useEffect, type ReactNode, type RefObject } from "react";

interface StageShellProps {
  count: number;
  containerRef: RefObject<HTMLDivElement | null>;
  label: string;
  announcement: string;
  announced: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  children: ReactNode;
}

/**
 * Contêiner de rolagem (100dvh + N × --stage-step dvh) com o palco sticky em tela cheia, sem card.
 * Abaixo de lg reserva 48 px embaixo (136 em cima, para o bloco ficar visualmente centralizado sob o cabeçalho).
 * Usa dvh (não svh) para acompanhar a barra do Safari: o palco ocupa exatamente a janela visível.
 * Inclui marcadores de snap leve (scroll-snap "proximity") no centro de cada passo
 * e a região que anuncia "Serviço X de 4" / "Etapa X de 4".
 */
export function StageShell({
  count,
  containerRef,
  label,
  announcement,
  announced,
  onKeyDown,
  children,
}: StageShellProps) {
  /* Snap leve só existe enquanto há palco na página */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-stage");
    return () => root.classList.remove("has-stage");
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `calc(100dvh + ${count} * var(--stage-step) * 1dvh)` }}
    >
      {Array.from({ length: count }, (_, k) => (
        <span
          key={k}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-px snap-start"
          style={{ top: `calc((${k} + 0.5) * var(--stage-step) * 1dvh + var(--header-offset))` }}
        />
      ))}
      <div
        role="region"
        aria-roledescription="palco de rolagem"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="sticky top-0 flex h-dvh flex-col pt-[136px] pb-12 lg:pt-24 lg:pb-8"
      >
        {/* Brilho laranja discreto atrás da ilustração (sem moldura) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
          <div
            className="absolute top-[28%] left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:top-1/2 lg:right-0 lg:left-auto lg:size-[760px] lg:translate-x-[12%]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 62%)",
            }}
          />
        </div>
        {children}
        <p aria-live="polite" aria-atomic="true" className="sr-only">
          {announced ? announcement : ""}
        </p>
      </div>
    </div>
  );
}

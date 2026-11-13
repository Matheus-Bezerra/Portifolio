"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { useLenis } from "lenis/react";
import { useMotionValueEvent, useScroll } from "motion/react";

/** Cada passo consome ≈ 38vh de rolagem (o handoff previa 60vh; reduzido a pedido para trocar com menos rolagem). */
export const STEP_VH = 38;
/** Abaixo desta altura de janela, ou com movimento reduzido, não há palco fixo. */
const MIN_STAGE_HEIGHT = 640;

export type StageMode = "static" | "stage";

const stageQueries = [
  "(prefers-reduced-motion: reduce)",
  `(max-height: ${MIN_STAGE_HEIGHT - 1}px)`,
];

function subscribeStage(onChange: () => void) {
  const lists = stageQueries.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function getStageSnapshot(): StageMode {
  return stageQueries.some((q) => window.matchMedia(q).matches) ? "static" : "stage";
}

/**
 * Decide entre palco fixo e versão estática.
 * O HTML do servidor sai na versão estática (conteúdo completo e indexável);
 * o palco é ativado no cliente quando o ambiente permite.
 */
export function useStageMode(): StageMode {
  return useSyncExternalStore(subscribeStage, getStageSnapshot, () => "static");
}

/**
 * Motor dos palcos de rolagem: progresso do contêiner → índice discreto.
 * Rolar para cima volta ao estado anterior; ao fim do contêiner o palco se solta.
 */
export function useScrollStage(count: number, enabled: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [announced, setAnnounced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const indexRef = useRef(0);
  const sync = useCallback(
    (p: number, announce: boolean) => {
      const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
      if (next === indexRef.current) return;
      indexRef.current = next;
      setIndex(next);
      if (announce) setAnnounced(true);
    },
    [count],
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (enabled) sync(p, true);
  });

  /* Ao ativar o palco (ou carregar a página no meio dele), alinha o estado sem anunciar */
  useEffect(() => {
    if (!enabled) return;
    const frame = requestAnimationFrame(() => sync(scrollYProgress.get(), false));
    return () => cancelAnimationFrame(frame);
  }, [enabled, sync, scrollYProgress]);

  /** Rola até o centro do passo `step` (usado pelo teclado). */
  const lenis = useLenis();
  const goToStep = useCallback(
    (step: number) => {
      const el = containerRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const stepPx = (window.innerHeight * STEP_VH) / 100;
      const target = top + stepPx * (step + 0.5);
      if (lenis) lenis.scrollTo(target, { duration: 0.9 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    },
    [lenis],
  );

  /** ↑ ↓ / PageUp / PageDown avançam; nas pontas, o comportamento normal da página continua. */
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!enabled) return;
      const forward = event.key === "ArrowDown" || event.key === "PageDown";
      const back = event.key === "ArrowUp" || event.key === "PageUp";
      if (forward && index < count - 1) {
        event.preventDefault();
        goToStep(index + 1);
      } else if (back && index > 0) {
        event.preventDefault();
        goToStep(index - 1);
      }
    },
    [enabled, index, count, goToStep],
  );

  return { containerRef, index, announced, onKeyDown };
}

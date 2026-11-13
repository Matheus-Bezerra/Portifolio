"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for]';
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

/* Ponteiro preciso, sem modo de alto contraste nem cores forçadas: nesses casos o cursor do sistema fica */
const FORCED = "(forced-colors: active)";
const CONTRAST = "(prefers-contrast: more)";

function subscribe(onChange: () => void) {
  const lists = [FINE_POINTER, FORCED, CONTRAST].map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function getSnapshot() {
  return (
    window.matchMedia(FINE_POINTER).matches &&
    !window.matchMedia(FORCED).matches &&
    !window.matchMedia(CONTRAST).matches
  );
}

type Mode = "default" | "action" | "text";

/**
 * Cursor da marca: um ponto laranja na ponta do ponteiro e um anel que o segue
 * com leve atraso e cresce sobre links e botões. Só existe com mouse/trackpad;
 * em campos de texto o cursor nativo volta.
 */
export function CursorDot() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      /* O cursor do sistema só some depois que o nosso está de fato seguindo o mouse */
      root.classList.add("has-cursor");
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      setMode(
        target?.closest(TEXT_FIELD) ? "text" : target?.closest(INTERACTIVE) ? "action" : "default",
      );
    };
    const onLeave = () => {
      setVisible(false);
      root.classList.remove("has-cursor");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const shown = visible && mode !== "text";
  /* Escala e opacidade ficam no Motion: se fossem CSS (`scale`), o navegador
     multiplicaria também a posição (x, y) e o cursor sairia do lugar. */
  const pop = { type: "spring", stiffness: 520, damping: 34, mass: 0.5 } as const;
  const layer =
    "pointer-events-none fixed top-0 left-0 z-90 rounded-full transition-[background-color,border-color] duration-200 ease-(--ease-standard)";

  return (
    <div aria-hidden="true">
      {/* Anel: segue com atraso e cresce sobre elementos clicáveis */}
      <m.span
        className={cn(
          layer,
          "-mt-[18px] -ml-[18px] size-9 border",
          mode === "action" ? "border-accent bg-accent/12" : "border-accent/45 bg-accent/0",
        )}
        style={{ x: reduce ? x : ringX, y: reduce ? y : ringY }}
        initial={false}
        animate={{ opacity: shown ? 1 : 0, scale: pressed ? 0.75 : mode === "action" ? 1.45 : 1 }}
        transition={pop}
      />
      {/* Ponto: a ponta do cursor */}
      <m.span
        className={cn(layer, "-mt-1 -ml-1 size-2 bg-accent")}
        style={{ x, y }}
        initial={false}
        animate={{ opacity: shown ? 1 : 0, scale: mode === "action" ? 0.5 : 1 }}
        transition={pop}
      />
    </div>
  );
}

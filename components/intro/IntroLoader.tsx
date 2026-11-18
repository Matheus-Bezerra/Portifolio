"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useIntro } from "./IntroContext";

/** Tempo em que a logo fica em cena antes de a cortina subir. */
const HOLD_MS = 1750;
/** Duração da saída (igual à transição em globals.css) + folga. */
const EXIT_MS = 700;
/** O hero só começa a animar depois que a cortina já subiu em boa parte, para não competir por quadros. */
const RELEASE_DELAY_MS = 350;

/**
 * Contorno do monograma oficial (public/assets/logo/svg/mb-laranja.svg).
 * É o mesmo vetor da marca, embutido para poder ser revelado por varredura.
 */
const MONOGRAM =
  "M0 16 C0 2 14 -5 27 5 L101 67 L174 10 Q186 0 201 0 H268 C301 0 328 24 328 54 Q328 77 309 94 Q342 115 342 141 C342 176 313 204 276 204 H211 V160 H265 C281 160 290 153 290 140 C290 128 281 120 266 120 H211 V82 H260 C273 82 281 75 281 63 C281 51 272 44 259 44 H202 V204 H169 Q153 204 153 188 V89 L115 121 Q102 132 90 122 L10 54 Q0 47 0 36 Z M0 61 L51 105 V188 Q51 204 35 204 H16 Q0 204 0 188 Z";

/** Pontos do anel (mesmos ângulos do anel do hero). */
const RING_DOTS = [-28, 62, 152];

/**
 * Uma camada do monograma revelada em duas janelas: o "M" entra primeiro e o "B" logo depois.
 * `lead` é a faixa clara que corre à frente; a camada laranja a cobre em seguida.
 */
function Reveal({ lead, delay }: { lead?: boolean; delay: number }) {
  return (
    <>
      {(["m", "b"] as const).map((seg) => (
        <div
          key={seg}
          className={`intro-win intro-win-${seg}`}
          style={{ "--d": `${delay + (seg === "b" ? 450 : 0)}ms` } as CSSProperties}
        >
          <div className="intro-win-move">
            <div className="intro-win-full">
              <svg className="intro-layer" viewBox="-280 -280 560 560">
                <path
                  className={lead ? "intro-fill-lead" : "intro-fill"}
                  d={MONOGRAM}
                  transform="translate(-171 -102)"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

type Phase = "draw" | "exit" | "done";

/**
 * Abertura: o monograma é revelado em varredura (uma faixa clara à frente, o M e depois o B), o anel nasce girando e a cortina sobe.
 * O desenho é CSS puro (começa no primeiro paint, antes da hidratação);
 * o JavaScript só decide o momento da saída e avisa o hero.
 * Qualquer clique, toque ou tecla pula a abertura.
 */
export function IntroLoader() {
  const { release } = useIntro();
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("draw");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Movimento reduzido: a abertura já está oculta via CSS e o hero já está liberado */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("intro-lock");

    /* Quanto do desenho já rodou antes da hidratação */
    const elapsed = el
      .getAnimations({ subtree: true })
      .reduce((max, a) => Math.max(max, Number(a.currentTime ?? 0)), 0);

    let doneTimer: number | undefined;
    let releaseTimer: number | undefined;
    let exiting = false;
    const exit = () => {
      if (exiting) return;
      exiting = true;
      root.classList.remove("intro-lock");
      setPhase("exit");
      releaseTimer = window.setTimeout(release, RELEASE_DELAY_MS);
      doneTimer = window.setTimeout(() => setPhase("done"), EXIT_MS);
    };
    const exitTimer = window.setTimeout(exit, Math.max(0, HOLD_MS - elapsed));

    /* Quem já viu a abertura pode pular: um clique, toque ou tecla leva direto ao site */
    window.addEventListener("pointerdown", exit, { once: true });
    window.addEventListener("keydown", exit, { once: true });

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(releaseTimer);
      window.removeEventListener("pointerdown", exit);
      window.removeEventListener("keydown", exit);
      root.classList.remove("intro-lock");
    };
  }, [release]);

  if (phase === "done") return null;

  return (
    <div ref={ref} className="intro" data-phase={phase} aria-hidden="true">
      <div className="intro-mark">
        <svg className="intro-layer intro-dashed-layer" viewBox="-280 -280 560 560">
          <circle className="intro-dashed" cx="0" cy="0" r="230" />
        </svg>
        <svg className="intro-layer intro-ring-layer" viewBox="-280 -280 560 560">
          <circle className="intro-ring" cx="0" cy="0" r="270" />
          {RING_DOTS.map((deg) => (
            <circle
              key={deg}
              className="intro-dot"
              cx={270 * Math.cos((deg * Math.PI) / 180)}
              cy={270 * Math.sin((deg * Math.PI) / 180)}
              r="9"
            />
          ))}
        </svg>
        <Reveal lead delay={250} />
        <Reveal delay={410} />
      </div>
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
  type TargetAndTransition,
  type Variants,
} from "motion/react";
import * as m from "motion/react-m";
import { useIntro } from "@/components/intro/IntroContext";
import { distance, duration, ease } from "@/lib/motion";

/**
 * Entrada coordenada da abertura (quando a intro libera, não ao rolar):
 * eyebrow → título → texto → CTAs; em paralelo, composição circular → retrato → ícones.
 */
const sequence: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.expressive } },
};

const reducedItem: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.reduced } },
};

const visualParts = {
  orbit: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: ease.expressive, delay: 0.15 },
    },
  },
  portrait: {
    /* Opaco desde o início: fica sob a cortina da intro e não atrasa o LCP */
    hidden: { opacity: 1, y: distance.lg },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.expressive, delay: 0.3 } },
  },
  icons: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: ease.expressive, delay: 0.75 },
    },
  },
} satisfies Record<string, Variants>;

export function HeroSequence({ children, className }: { children: ReactNode; className?: string }) {
  const { ready } = useIntro();
  return (
    <m.div
      className={className}
      variants={sequence}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
    >
      {children}
    </m.div>
  );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div className={className} variants={reduce ? reducedItem : item}>
      {children}
    </m.div>
  );
}

/* ------------------------------------------------------------------
   Celular (touch, < 768 px): a composição se monta conforme a rolagem, em vez
   da entrada única, e depois respira sozinha. Sem movimento reduzido.
   Desktop e movimento reduzido seguem a entrada normal.
   ------------------------------------------------------------------ */
const TOUCH_PHONE = "(hover: none) and (max-width: 767px)";
const ScrollEntryContext = createContext<MotionValue<number> | null>(null);

function subscribeTouchPhone(onChange: () => void) {
  const list = window.matchMedia(TOUCH_PHONE);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

function getTouchPhone() {
  return window.matchMedia(TOUCH_PHONE).matches;
}

/** Envolve a composição: publica o progresso (0 → 1) de quando ela entra na tela até o centro. */
export function HeroScrollEntry({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const phone = useSyncExternalStore(subscribeTouchPhone, getTouchPhone, () => false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "center 0.6"] });
  const value = phone && !reduce ? scrollYProgress : null;
  return (
    <ScrollEntryContext.Provider value={value}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ScrollEntryContext.Provider>
  );
}

/** Peças da composição no celular: aparecem e se ajustam com o progresso, e têm um leve "respirar". */
function ScrollVisualPart({
  part,
  progress,
  children,
  className,
  style,
}: {
  part: keyof typeof visualParts;
  progress: MotionValue<number>;
  children: ReactNode;
  className?: string;
  style?: MotionStyle;
}) {
  const portraitY = useTransform(progress, [0, 1], [48, 0]);
  const orbitOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const iconsOpacity = useTransform(progress, [0.45, 0.8], [0, 1]);
  const iconsScale = useTransform(progress, [0.45, 0.8], [0.8, 1]);

  const motionStyle: Record<keyof typeof visualParts, MotionStyle> = {
    orbit: { opacity: orbitOpacity },
    portrait: { y: portraitY },
    icons: { opacity: iconsOpacity, scale: iconsScale },
  };

  const breathe: Partial<
    Record<keyof typeof visualParts, { animate: TargetAndTransition; duration: number }>
  > = {
    orbit: { animate: { scale: [1, 1.02, 1] }, duration: 6 },
    icons: { animate: { y: [0, -4, 0] }, duration: 5 },
  };
  const loop = breathe[part];

  return (
    <m.div
      className={className}
      style={{ ...style, ...motionStyle[part] }}
      animate={loop?.animate}
      transition={
        loop ? { duration: loop.duration, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      {children}
    </m.div>
  );
}

export function HeroVisualPart({
  part,
  children,
  className,
  style,
}: {
  part: keyof typeof visualParts;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const { ready } = useIntro();
  const progress = useContext(ScrollEntryContext);
  if (progress) {
    return (
      <ScrollVisualPart part={part} progress={progress} className={className} style={style}>
        {children}
      </ScrollVisualPart>
    );
  }
  return (
    <m.div
      className={className}
      style={style}
      variants={reduce ? reducedItem : visualParts[part]}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
    >
      {children}
    </m.div>
  );
}

/* ------------------------------------------------------------------
   Órbita do hero
   1) Entrada: o anel laranja se traça, os pontos percorrem a órbita e o anel
      tracejado surge girando (≈ 2,5 s no total, uma vez).
      No celular, o traçado acompanha a rolagem (ver HeroScrollEntry).
   2) Rolagem: os anéis giram conforme a página rola.
   3) Mouse (só com mouse/trackpad): anéis, pontos e ícones se deslocam alguns
      graus/pixels, cada camada com uma profundidade.
   No desktop, nada se move sozinho depois da entrada; no celular a composição respira
   devagar. Movimento reduzido deixa tudo parado.
   ------------------------------------------------------------------ */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

interface PointerValues {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const PointerContext = createContext<PointerValues | null>(null);

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

/** Acompanha o mouse sobre a composição e distribui a posição (-1 a 1) para as camadas. */
export function HeroPointer({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia(FINE_POINTER).matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        /* Fora da tela não há o que mover */
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        rawX.set(clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
        rawY.set(clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
      });
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, rawX, rawY]);

  const value = useMemo(() => ({ x, y }), [x, y]);
  return (
    <PointerContext.Provider value={value}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </PointerContext.Provider>
  );
}

function usePointer(): PointerValues {
  const ctx = useContext(PointerContext);
  const zero = useMotionValue(0);
  return ctx ?? { x: zero, y: zero };
}

/**
 * Anel que gira com a rolagem (`deg` graus ao longo de ~900 px), se inclina `tilt` graus
 * e se desloca até `shift` px conforme o mouse.
 */
export function ScrollSpin({
  children,
  className,
  deg,
  tilt = 0,
  shift = 0,
}: {
  children?: ReactNode;
  className?: string;
  deg: number;
  tilt?: number;
  shift?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const pointer = usePointer();
  const rotate = useTransform([scrollY, pointer.x], (latest: number[]) => {
    const [scroll = 0, px = 0] = latest;
    return Math.min(scroll / 900, 1) * deg + px * tilt;
  });
  const x = useTransform(pointer.x, (v) => v * shift);
  const y = useTransform(pointer.y, (v) => v * shift);
  return (
    <m.div className={className} style={reduce ? undefined : { rotate, x, y }}>
      {children}
    </m.div>
  );
}

/** Camada que se desloca com o mouse (ícones em órbita), com uma profundidade própria. */
export function ParallaxLayer({
  children,
  className,
  shift,
}: {
  children: ReactNode;
  className?: string;
  shift: number;
}) {
  const reduce = useReducedMotion();
  const pointer = usePointer();
  const x = useTransform(pointer.x, (v) => v * shift);
  const y = useTransform(pointer.y, (v) => v * shift * 0.7);
  return (
    <m.div className={className} style={reduce ? undefined : { x, y }}>
      {children}
    </m.div>
  );
}

const ORBIT_R = 269.25;
const ORBIT_LENGTH = 2 * Math.PI * ORBIT_R;

function OrbitSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 540 540"
      fill="none"
      className="absolute inset-0 size-full -rotate-90 overflow-visible"
    >
      {children}
    </svg>
  );
}

/** Anel laranja que se traça (a partir do topo) quando a abertura libera. */
function OrbitStrokeIntro() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  return (
    <OrbitSvg>
      <m.circle
        cx={270}
        cy={270}
        r={ORBIT_R}
        className="stroke-accent stroke-[2.4px] md:stroke-[1.5px]"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: ready || reduce ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 1.6, ease: ease.expressive, delay: 0.35 }}
      />
    </OrbitSvg>
  );
}

/** No celular, o mesmo traçado acompanha o progresso da rolagem. */
function OrbitStrokeScroll({ progress }: { progress: MotionValue<number> }) {
  const dashOffset = useTransform(progress, [0, 1], [ORBIT_LENGTH, 0]);
  return (
    <OrbitSvg>
      <m.circle
        cx={270}
        cy={270}
        r={ORBIT_R}
        className="stroke-accent stroke-[2.4px] md:stroke-[1.5px]"
        style={{ strokeDasharray: ORBIT_LENGTH, strokeDashoffset: dashOffset }}
      />
    </OrbitSvg>
  );
}

export function OrbitStroke() {
  const progress = useContext(ScrollEntryContext);
  return progress ? <OrbitStrokeScroll progress={progress} /> : <OrbitStrokeIntro />;
}

/** Ponto que percorre a órbita até a posição final (`deg`) na entrada. */
export function OrbitDot({ deg, index }: { deg: number; index: number }) {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  return (
    <m.span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 hidden size-0 md:block"
      initial={reduce ? { rotate: deg, opacity: 1 } : { rotate: deg - 200, opacity: 0 }}
      animate={ready || reduce ? { rotate: deg, opacity: 1 } : undefined}
      transition={{ duration: 1.9, ease: ease.expressive, delay: 0.6 + index * 0.15 }}
    >
      <span
        className="absolute -m-[3px] size-1.5 rounded-full bg-accent"
        style={{ transform: "translateY(-270px)" }}
      />
    </m.span>
  );
}

/** Entrada de um anel que surge girando (de `rotateFrom` até a posição, de menor a tamanho final). */
export function OrbitEntry({
  children,
  className,
  rotateFrom,
  scaleFrom,
  delay,
}: {
  children: ReactNode;
  className?: string;
  rotateFrom: number;
  scaleFrom: number;
  delay: number;
}) {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: rotateFrom, scale: scaleFrom }}
      animate={ready ? (reduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }) : undefined}
      transition={{ duration: 1.5, ease: ease.expressive, delay }}
    >
      {children}
    </m.div>
  );
}

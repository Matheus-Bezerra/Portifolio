import type { Transition, Variants } from "motion/react";

/* ------------------------------------------------------------------
   Tokens de movimento — referência: design-handoff §6
   ------------------------------------------------------------------ */
export const duration = {
  /** hovers, foco, pequenos feedbacks (150–200 ms) */
  fast: 0.18,
  /** transições padrão de componentes */
  base: 0.3,
  /** entrada de seções e blocos */
  section: 0.6,
  /** troca de estado nos palcos (≈ 0,6 s) */
  complex: 0.6,
  /** fade breve usado quando o movimento é reduzido */
  reduced: 0.12,
} as const;

export const ease = {
  /** cubic-bezier(.2,.7,.2,1) — aprovado no handoff */
  standard: [0.2, 0.7, 0.2, 1],
  /** saída mais longa para entradas de destaque */
  expressive: [0.16, 1, 0.3, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const distance = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;

export const stagger = {
  base: 0.08,
  /** expressões em laranja do Sobre: intervalo de 120 ms */
  highlight: 0.12,
} as const;

export const transition = {
  base: { duration: duration.base, ease: ease.standard },
  section: { duration: duration.section, ease: ease.expressive },
  stage: { duration: duration.complex, ease: ease.standard },
} as const satisfies Record<string, Transition>;

/* ------------------------------------------------------------------
   Variantes reutilizáveis
   Todas usam apenas transform e opacity.
   ------------------------------------------------------------------ */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.section },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: transition.section },
};

export const slideIn = (from: "left" | "right" = "left"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -distance.md : distance.md },
  visible: { opacity: 1, x: 0, transition: transition.section },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transition.section },
};

export const staggerContainer = (gap: number = stagger.base, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: distance.sm },
  visible: { opacity: 1, y: 0, transition: transition.section },
};

/** Revelação de seção: o bloco sobe pouco e aparece. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: distance.lg },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.expressive } },
};

/** Menu mobile: overlay e itens. */
export const menuOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.standard } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: ease.standard } },
};

export const menuList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, y: distance.sm },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

/** Troca de conteúdo em cards/palcos: o texto sobe e some. */
export const cardSwap: Variants = {
  enter: { opacity: 0, y: distance.md },
  center: { opacity: 1, y: 0, transition: transition.stage },
  exit: { opacity: 0, y: -distance.md, transition: { duration: 0.35, ease: ease.standard } },
};

/** Feedback de formulário (mensagens de status/erro). */
export const formFeedback: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: transition.base },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

/** Viewport padrão das revelações: dispara uma vez, um pouco antes de entrar. */
export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const;

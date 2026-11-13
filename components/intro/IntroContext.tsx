"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface IntroState {
  /** `true` quando a abertura terminou (ou não existe) e a página pode animar a entrada. */
  ready: boolean;
  /** Chamado pela abertura no instante em que a cortina começa a subir. */
  release: () => void;
}

const IntroContext = createContext<IntroState>({ ready: true, release: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

/**
 * Coordena a abertura com a entrada do hero.
 * Com movimento reduzido não há abertura: a página fica pronta de imediato.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [released, setReleased] = useState(false);
  const release = useCallback(() => setReleased(true), []);
  const value = useMemo(
    () => ({ ready: released || Boolean(reduce), release }),
    [released, reduce, release],
  );
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

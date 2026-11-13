"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { IntroProvider } from "@/components/intro/IntroContext";
import { ActiveSectionProvider } from "@/components/motion/ActiveSection";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/** Respeita prefers-reduced-motion em todas as animações do Motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* `strict` avisa se algum componente usar `motion.*` em vez de `m.*` (que pesa muito mais) */}
      <LazyMotion features={() => import("./features").then((mod) => mod.default)} strict>
        <IntroProvider>
          <SmoothScroll>
            <ActiveSectionProvider>{children}</ActiveSectionProvider>
          </SmoothScroll>
        </IntroProvider>
      </LazyMotion>
    </MotionConfig>
  );
}

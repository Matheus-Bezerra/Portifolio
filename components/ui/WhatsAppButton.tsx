"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Chat } from "@/components/icons";
import { useIntro } from "@/components/intro/IntroContext";
import { whatsappLink } from "@/content/contact";
import { ease } from "@/lib/motion";

const LABEL = "Chamar no WhatsApp";
const href = whatsappLink();

/**
 * Botão fixo no canto direito: bola laranja com o ícone de mensagem que abre
 * o WhatsApp. Entra depois da abertura; no desktop mostra o rótulo ao passar o mouse.
 * Some enquanto o Contato ou o rodapé estão na tela: ali o WhatsApp já é um canal
 * direto, e a bola cobriria a ponta dos campos do formulário.
 */
export function WhatsAppButton() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  const [nearContact, setNearContact] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const targets = ["contato"]
      .map((id) => document.getElementById(id))
      .concat(document.querySelector<HTMLElement>("footer"))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setNearContact(visible.size > 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const shown = ready && !nearContact;

  return (
    <m.div
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8"
      initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
      animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduce ? 1 : 0.4 }}
      transition={{
        duration: reduce ? 0.12 : 0.5,
        ease: ease.expressive,
        delay: reduce || entered ? 0 : 0.5,
      }}
      onAnimationComplete={() => shown && setEntered(true)}
      /* Escondido não recebe foco nem clique */
      inert={!shown}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${LABEL} (abre em nova aba)`}
        className="group relative flex items-center justify-end"
      >
        {/* Rótulo: só com mouse, desliza para fora da bola ao passar o cursor ou focar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+12px)] hidden translate-x-2 rounded-full border border-line bg-surface/90 px-4 py-2.5 text-[14px] font-medium whitespace-nowrap text-text opacity-0 shadow-icon backdrop-blur-[12px] transition-[opacity,translate] duration-200 ease-(--ease-standard) group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none pointer-fine:block"
        >
          {LABEL}
        </span>

        {/* Ondas: dois pulsos (4 s no total) depois que o botão aparece, sem ficar em loop */}
        <span
          aria-hidden="true"
          className="fab-pulse pointer-events-none absolute inset-0 rounded-full bg-accent motion-reduce:hidden"
        />

        {/* A bola */}
        <span className="relative flex size-14 items-center justify-center rounded-full bg-accent text-bg shadow-icon transition-[background-color,transform] duration-200 ease-(--ease-standard) group-hover:bg-accent-hover group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-text group-active:scale-95 motion-reduce:transition-none lg:size-16">
          <Chat size={26} strokeWidth={2} />
        </span>
      </a>
    </m.div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { useActiveSection } from "@/components/motion/ActiveSection";
import { navigation } from "@/content/navigation";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import { social } from "@/content/contact";
import { menuItem, menuList, menuOverlay } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";

const SCROLL_THRESHOLD = 24;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const active = useActiveSection();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  /* Pílula do item ativo: um único elemento que desliza até o link atual */
  const [pill, setPill] = useState<{ x: number; width: number } | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const el = nav.querySelector<HTMLElement>('[aria-current="location"]');
      if (!el) {
        setPill(null);
        return;
      }
      const next = { x: el.offsetLeft, width: el.offsetWidth };
      setPill((p) => (p && p.x === next.x && p.width === next.width ? p : next));
    };
    measure();
    /* O link ativo cresce ao ganhar o ponto laranja: a pílula acompanha a medida final */
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    nav.querySelectorAll("a").forEach((a) => observer.observe(a));
    return () => observer.disconnect();
  }, [active]);

  /* Estado visual depois de 24 px de rolagem */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  /* Menu aberto: trava a rolagem, isola o resto da página, Esc e foco preso */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;

    const outside = document.querySelectorAll<HTMLElement>("main, footer");
    outside.forEach((el) => el.setAttribute("inert", ""));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const items = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    /* Fecha se a janela passar para o layout desktop */
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && close(false);
    mq.addEventListener("change", onMq);

    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
      outside.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  /* Link do menu: fecha, libera a rolagem e só então navega até a âncora */
  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return;
        /* O Lenis já desconta o scroll-padding-top do html (o cabeçalho fixo) */
        if (lenis) lenis.scrollTo(target);
        else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", hash);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  };

  const elevated = scrolled || open;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1440px] px-3 pt-1.5 lg:px-16 lg:pt-4 xl:px-[120px]">
        <div
          className={cn(
            "flex h-[52px] items-center justify-between rounded-full border pr-1 pl-5 transition-[background-color,border-color,box-shadow] duration-200 ease-(--ease-standard) lg:h-16 lg:pr-2.5 lg:pl-7",
            /* Mobile segue o quadro aprovado: sempre com fundo e desfoque */
            "border-line bg-surface/78 backdrop-blur-[16px]",
            elevated
              ? "lg:border-line lg:bg-surface/78 lg:shadow-header"
              : "lg:border-line/70 lg:bg-bg/35 lg:shadow-none",
          )}
        >
          <a
            href="#inicio"
            aria-label="Matheus Bezerra — voltar ao início"
            className="-my-3 flex shrink-0 items-center rounded-sm py-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG oficial da marca */}
            <img
              src={site.logo.src}
              alt=""
              width={site.logo.width}
              height={site.logo.height}
              className="h-7 w-auto lg:h-[26px]"
            />
          </a>

          <nav
            ref={navRef}
            aria-label="Navegação principal"
            className="relative hidden items-center gap-0.5 lg:flex"
          >
            <m.span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-text/8"
              initial={false}
              animate={pill ? { x: pill.x, width: pill.width, opacity: 1 } : { opacity: 0 }}
              transition={
                reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }
              }
            />
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center rounded-full px-2.5 text-[14px] transition-colors duration-200 min-[1360px]:px-4 pointer-coarse:h-11",
                    isActive
                      ? "font-semibold text-text"
                      : "font-medium text-text-2 hover:bg-white/5 hover:text-text",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative block size-1.5 shrink-0 rounded-full bg-accent transition-[width,margin,opacity] duration-300 ease-(--ease-standard) motion-reduce:transition-none",
                      isActive ? "mr-2 w-1.5 opacity-100" : "mr-0 w-0 opacity-0",
                    )}
                  />
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <ButtonLink
            href={hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            size="header"
            arrow={false}
            /* Entre 1024 e 1199 px a navegação completa não cabe junto do CTA */
            className="max-[1199px]:hidden"
          >
            {hero.primaryCta.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => (open ? close() : setOpen(true))}
            className={cn(
              "flex size-11 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              open ? "bg-text text-bg focus-visible:outline-text" : "bg-text/8 text-text",
            )}
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            role="dialog"
            data-lenis-prevent
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 -z-10 overflow-y-auto bg-bg pt-16 lg:hidden"
            variants={menuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <m.nav
              aria-label="Menu"
              className="flex flex-col px-5 pt-6"
              variants={reduce ? undefined : menuList}
            >
              {navigation.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <m.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => goTo(e, `#${item.id}`)}
                    aria-current={isActive ? "location" : undefined}
                    variants={reduce ? undefined : menuItem}
                    className={cn(
                      "flex h-[60px] items-center justify-between border-b border-line font-display text-[24px] font-semibold",
                      isActive ? "text-text" : "text-text-2",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                      )}
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-sans text-[13px] font-medium text-separator"
                    >
                      {pad2(i)}
                    </span>
                  </m.a>
                );
              })}
            </m.nav>
            <m.div
              className="flex flex-col gap-5 px-5 pt-7 pb-10"
              variants={reduce ? undefined : menuItem}
            >
              <ButtonLink
                href={hero.primaryCta.href}
                size="lg"
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.primaryCta.label}
              </ButtonLink>
              <div className="flex justify-center gap-6">
                <TextLink
                  href={social.linkedin}
                  external
                  className="flex min-h-11 items-center text-[14px]"
                >
                  LinkedIn
                </TextLink>
                <TextLink
                  href={social.github}
                  external
                  className="flex min-h-11 items-center text-[14px]"
                >
                  GitHub
                </TextLink>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "header" | "md" | "lg" | "case";

const base =
  "inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-(--ease-standard) active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0";

const variants: Record<Variant, string> = {
  /* Laranja cheio: exclusivo de "Conversar sobre um projeto", "Conversar sobre isso" e "Enviar mensagem" */
  primary:
    "bg-accent text-bg hover:bg-accent-hover active:bg-accent-pressed focus-visible:outline-text disabled:bg-accent-disabled disabled:text-text-3 aria-disabled:bg-accent-disabled aria-disabled:text-text-3",
  secondary:
    "border border-control text-text hover:border-text hover:bg-white/6 disabled:border-line disabled:text-text-3",
};

const sizes: Record<Size, string> = {
  header: "h-11 px-5 text-[14px]",
  md: "h-[52px] px-[26px] text-[15px]",
  case: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[16px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Mostra a seta à direita (padrão nos botões primários). */
  arrow?: boolean;
  fullWidthMobile?: boolean;
  className?: string;
  children: ReactNode;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidthMobile,
  className,
}: Pick<CommonProps, "variant" | "size" | "fullWidthMobile" | "className">) {
  return cn(base, variants[variant], sizes[size], fullWidthMobile && "w-full md:w-auto", className);
}

export function ButtonLink({
  variant = "primary",
  size,
  arrow = variant === "primary",
  fullWidthMobile,
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, fullWidthMobile, className })} {...props}>
      {children}
      {arrow && <ArrowRight size={variant === "primary" ? 18 : 16} />}
    </a>
  );
}

export function Button({
  variant = "primary",
  size,
  arrow = variant === "primary",
  fullWidthMobile,
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses({ variant, size, fullWidthMobile, className })} {...props}>
      {children}
      {arrow && <ArrowRight size={18} />}
    </button>
  );
}

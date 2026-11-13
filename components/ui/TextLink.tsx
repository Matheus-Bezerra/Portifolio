import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Abre em nova aba e acrescenta ↗ (com aviso para leitores de tela). */
  external?: boolean;
  /** Acrescenta ↗ sem abrir em nova aba (ex.: PDF do currículo). */
  arrow?: boolean;
}

export function TextLink({ external, arrow, className, children, ...props }: TextLinkProps) {
  const showArrow = external || arrow;
  return (
    <a
      className={cn("text-link pointer-coarse:inline-block pointer-coarse:py-2.5", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...props}
    >
      {children}
      {showArrow && <span aria-hidden="true"> ↗</span>}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

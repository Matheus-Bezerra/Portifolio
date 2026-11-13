import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface TechInlineProps {
  items: string[];
  /** Mostra só os N primeiros e um "+X". */
  limit?: number;
  className?: string;
}

/** Tecnologias em texto separadas por barras decorativas (aria-hidden). */
export function TechInline({ items, limit, className }: TechInlineProps) {
  const visible = limit ? items.slice(0, limit) : items;
  const rest = items.length - visible.length;
  return (
    <p className={cn("type-meta", className)}>
      {visible.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (
            <span aria-hidden="true" className="text-separator">
              {" / "}
            </span>
          )}
          {item}
        </Fragment>
      ))}
      {rest > 0 && (
        <>
          <span aria-hidden="true" className="text-separator">
            {" / "}
          </span>
          <span aria-hidden="true">+{rest}</span>
          <span className="sr-only">e mais {rest} tecnologias</span>
        </>
      )}
    </p>
  );
}

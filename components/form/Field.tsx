import type { ReactNode } from "react";
import { AlertCircle, Check } from "@/components/icons";
import { cn } from "@/lib/utils";

export type FieldState = "default" | "valid" | "invalid";

/** Classes visuais compartilhadas por input, select e textarea. */
export function controlClasses(state: FieldState, extra?: string) {
  return cn(
    "w-full rounded-field border bg-bg px-4 text-[15px] text-text placeholder:text-text-3 transition-[border-color,box-shadow] duration-150",
    "hover:border-text-2 focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_22%,transparent)] focus:outline-none focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-sunk disabled:text-text-3 disabled:hover:border-line",
    state === "invalid"
      ? "border-error hover:border-error focus:border-error focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-error)_22%,transparent)]"
      : "border-control",
    extra,
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optionalText?: string;
  error?: string;
  state: FieldState;
  /** Conteúdo extra à direita, abaixo do campo (ex.: contador). */
  aside?: ReactNode;
  /** Mostra o ícone de estado dentro do campo (inputs de uma linha). */
  inlineIcon?: boolean;
  children: ReactNode;
}

export function Field({
  id,
  label,
  required,
  optionalText,
  error,
  state,
  aside,
  inlineIcon = true,
  children,
}: FieldProps) {
  return (
    <div className="group/field flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[13px] font-medium text-text transition-colors duration-150 group-focus-within/field:text-accent motion-reduce:transition-none"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent">
            {" "}
            *
          </span>
        )}
        {optionalText && <span className="font-normal text-text-3"> {optionalText}</span>}
      </label>
      <div className="relative">
        {children}
        {inlineIcon && state !== "default" && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 right-4 -translate-y-1/2",
              state === "valid" ? "text-success" : "text-error",
            )}
          >
            {state === "valid" ? <Check size={18} /> : <AlertCircle size={18} />}
          </span>
        )}
      </div>
      {(error || aside) && (
        <div className="flex items-start justify-between gap-3">
          {error ? (
            <p
              id={`${id}-erro`}
              className="field-error flex items-center gap-1.5 text-[13px] leading-5 text-error"
            >
              {!inlineIcon && <AlertCircle size={16} />}
              {error}
            </p>
          ) : (
            <span />
          )}
          {aside}
        </div>
      )}
    </div>
  );
}

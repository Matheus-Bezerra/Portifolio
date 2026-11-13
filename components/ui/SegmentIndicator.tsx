import { cn } from "@/lib/utils";

interface SegmentIndicatorProps {
  labels: string[];
  active: number;
  className?: string;
}

/** 4 traços de 3 px — indicadores, não botões (aria-hidden). */
export function SegmentIndicator({ labels, active, className }: SegmentIndicatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid gap-1.5 md:gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
    >
      {labels.map((label, i) => {
        const on = i === active;
        return (
          <div key={label} className="flex min-w-0 flex-col gap-2.5">
            <i className="relative block h-[3px] overflow-hidden rounded-[2px] bg-line">
              <span
                className={cn(
                  "absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-(--ease-standard) motion-reduce:transition-none",
                  on ? "scale-x-100" : "scale-x-0",
                )}
              />
            </i>
            <span
              className={cn(
                "truncate text-[11px] font-medium transition-colors duration-300 md:text-[12px]",
                on ? "text-text" : "text-text-3",
              )}
            >
              {i + 1} · {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

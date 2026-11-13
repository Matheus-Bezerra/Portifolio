import type { ServiceIllustrationKind } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Ilustrações dos palcos de Serviços — CSS puro, desenhadas em 420 × 300
 * (medidas do quadro "Palcos de rolagem") e escaladas pelo contêiner.
 */
const bar = "rounded-full";

function Site() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-line bg-surface shadow-stage">
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-surface-raised px-3.5">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className={cn("ml-3.5 h-3.5 w-40 bg-surface-sunk", bar)} />
      </div>
      <div className="absolute top-[60px] left-6 flex flex-col gap-3">
        <div className={cn("h-3.5 w-[200px] bg-text-2", bar)} />
        <div className={cn("h-3.5 w-[150px] bg-text-2", bar)} />
        <div className={cn("h-2 w-[170px] bg-line", bar)} />
        <div className={cn("h-2 w-[130px] bg-line", bar)} />
        <div className={cn("mt-1.5 h-[26px] w-24 bg-accent", bar)} />
      </div>
      <div
        className="absolute top-[60px] right-6 h-32 w-[130px] rounded-xl border border-line"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 65%), var(--color-surface-raised)",
        }}
      />
      <div className="absolute inset-x-6 bottom-5 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[54px] rounded-[10px] border border-line bg-surface-sunk" />
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const bars = [34, 52, 40, 70, 46, 58];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] border border-line bg-surface shadow-stage">
      <div className="absolute inset-y-0 left-0 flex w-[74px] flex-col gap-3.5 border-r border-line bg-surface-raised px-3.5 py-5">
        <div className={cn("h-2 w-10 bg-text-2", bar)} />
        <div className={cn("h-2 w-[34px] bg-accent", bar)} />
        <div className={cn("h-2 w-10 bg-line", bar)} />
        <div className={cn("h-2 w-[30px] bg-line", bar)} />
        <div className={cn("h-2 w-[38px] bg-line", bar)} />
      </div>
      <div className="absolute top-5 right-5 left-[94px] grid grid-cols-3 gap-2.5">
        {["bg-accent", "bg-text-2", "bg-text-2"].map((tone, i) => (
          <div
            key={i}
            className="flex h-[58px] flex-col gap-2 rounded-[10px] border border-line bg-surface-sunk p-2.5"
          >
            <div className={cn("h-1.5 w-[30px] bg-line", bar)} />
            <div className={cn("h-3 w-[46px]", tone, bar)} />
          </div>
        ))}
      </div>
      <div className="absolute top-[94px] left-[94px] flex h-[118px] w-[150px] items-end gap-1.5 rounded-[10px] border border-line bg-surface-sunk p-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className={cn("w-5 rounded-t-[4px]", i === 3 ? "bg-accent" : "bg-line-strong")}
            style={{ height: h }}
          />
        ))}
      </div>
      <div className="absolute top-[94px] right-5 left-64 flex h-[118px] flex-col gap-[11px] rounded-[10px] border border-line bg-surface-sunk p-3">
        {[60, 50, 56, 44, 52].map((w, i) => (
          <div
            key={i}
            className={cn("h-[7px] rounded-[3px]", i === 0 ? "bg-text-2" : "bg-line")}
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="absolute right-5 bottom-[18px] left-[94px] flex flex-col gap-[9px]">
        <div className={cn("h-2 w-60 bg-line", bar)} />
        <div className={cn("h-2 w-[190px] bg-line", bar)} />
      </div>
    </div>
  );
}

function Mobile() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute size-[260px] rounded-full border border-line" />
      <div className="relative h-[300px] w-[162px] overflow-hidden rounded-[26px] border border-line-strong bg-surface shadow-stage">
        <div className="mx-auto mt-3 mb-2.5 h-1.5 w-11 rounded-[3px] bg-line" />
        <div className="mx-3.5 mb-3.5 h-6 rounded-lg border border-line bg-surface-sunk" />
        <div className="mx-3.5 flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={cn("size-9 rounded-[9px]", i === 0 ? "bg-accent/28" : "bg-surface-2")}
              />
              <div className="flex flex-col gap-1.5">
                <div className="h-[7px] w-16 rounded-[3px] bg-text-2" />
                <div className="h-1.5 w-11 rounded-[3px] bg-line" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-3.5 bottom-3 flex h-8 items-center justify-around rounded-2xl bg-surface-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("size-2.5 rounded-full", i === 0 ? "bg-accent" : "bg-line-strong")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Api() {
  const nodes = [
    { label: "Pagamento", left: 150, top: 14 },
    { label: "Autenticação", left: 16, top: 110 },
    { label: "Webhooks", left: 300, top: 110 },
    { label: "Mensageria", left: 40, top: 226 },
    { label: "Serviços", left: 276, top: 226 },
  ];
  return (
    <div className="absolute inset-0">
      <svg
        width="420"
        height="300"
        viewBox="0 0 420 300"
        className="absolute inset-0"
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      >
        <path d="M210 128L210 58" />
        <path d="M160 147L136 132" />
        <path d="M260 147L300 132" />
        <path d="M170 170L120 226" />
        <path d="M250 170L320 226" />
      </svg>
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute flex h-11 w-[120px] items-center justify-center rounded-xl border border-line-strong bg-surface text-[12px] font-medium text-text-2"
          style={{ left: n.left, top: n.top }}
        >
          {n.label}
        </div>
      ))}
      <div className="absolute top-[126px] left-40 flex h-[46px] w-[100px] items-center justify-center rounded-xl bg-accent text-[13px] font-semibold text-bg shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]">
        API
      </div>
    </div>
  );
}

const map: Record<ServiceIllustrationKind, () => React.JSX.Element> = {
  site: Site,
  dashboard: Dashboard,
  mobile: Mobile,
  api: Api,
};

export function ServiceIllustration({ kind }: { kind: ServiceIllustrationKind }) {
  const Component = map[kind];
  return (
    <div aria-hidden="true" className="relative h-[300px] w-[420px]">
      <Component />
    </div>
  );
}

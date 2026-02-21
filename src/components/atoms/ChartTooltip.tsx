import { formatCrore } from "@/utils/formatters";

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export default function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl px-4 py-3 text-[13px] text-slate-900 dark:text-slate-200" style={{ background: "var(--tooltip-bg)", border: "1px solid var(--tooltip-border)" }}>
      <p className="mt-0 mb-[6px] font-bold text-slate-700 dark:text-slate-400">Year {label}</p>
      {payload.map((p, i) => (
        <p key={i} className="my-[2px]" style={{ color: p.color }}>
          {p.name}: {formatCrore(p.value)}
        </p>
      ))}
    </div>
  );
}

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
    <div className="bg-[rgba(15,15,25,0.95)] border border-white/10 rounded-xl px-4 py-3 text-[13px] text-slate-200">
      <p className="mt-0 mb-[6px] font-bold text-slate-400">Year {label}</p>
      {payload.map((p, i) => (
        <p key={i} className="my-[2px]" style={{ color: p.color }}>
          {p.name}: {formatCrore(p.value)}
        </p>
      ))}
    </div>
  );
}

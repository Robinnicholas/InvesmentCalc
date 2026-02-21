interface ProgressBarProps {
  investedPct: number;
}

export default function ProgressBar({ investedPct }: ProgressBarProps) {
  const gainsPct = 100 - investedPct;

  return (
    <div>
      <div className="flex justify-between text-[11px] text-slate-600 mb-[6px]">
        <span>Invested</span>
        <span>Gains</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.07] overflow-hidden">
        <div
          className="h-full bg-slate-600 rounded-full inline-block"
          style={{ width: `${investedPct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-slate-600 mt-1">
        <span>{investedPct}%</span>
        <span>{gainsPct}%</span>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  investedPct: number;
}

export default function ProgressBar({ investedPct }: ProgressBarProps) {
  const gainsPct = 100 - investedPct;

  return (
    <div>
      <div className="flex justify-between text-[11px] mb-[6px]" style={{ color: "var(--text-faint)" }}>
        <span>Invested</span>
        <span>Gains</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-surface-dim)" }}>
        <div
          className="h-full bg-slate-600 rounded-full inline-block"
          style={{ width: `${investedPct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] mt-1" style={{ color: "var(--text-faint)" }}>
        <span>{investedPct}%</span>
        <span>{gainsPct}%</span>
      </div>
    </div>
  );
}

import StatItem from "@/components/molecules/StatItem";
import ProgressBar from "@/components/atoms/ProgressBar";
import { formatCrore, formatYear } from "@/utils/formatters";
import { rateColor, rateLabel, SIPResult } from "@/utils/sipCalculations";

interface ResultCardProps {
  result: SIPResult;
  rate: number;
}

export default function ResultCard({ result, rate }: ResultCardProps) {
  if (!result.months) return null;

  const investedPct = Math.round((result.invested / result.corpus) * 100);
  const color = rateColor(rate);

  return (
    <div
      className="max-w-[900px] mx-auto mb-7 rounded-[20px] px-8 py-7"
      style={{
        background: `linear-gradient(135deg, ${color}18, rgba(255,255,255,0.02))`,
        border: `1px solid ${color}40`,
      }}
    >
      <p className="mt-0 mb-[6px] text-xs text-slate-500 font-semibold tracking-[1px] uppercase">
        {rateLabel(rate)}
      </p>
      <div className="grid grid-cols-3 gap-5 mt-4">
        <StatItem label="Time to Goal" value={formatYear(result.months)} accentColor={color} />
        <StatItem label="Total Invested" value={formatCrore(result.invested)} accentColor="#94a3b8" />
        <StatItem label="Total Gains" value={formatCrore(result.corpus - result.invested)} accentColor="#34d399" />
      </div>
      <div className="mt-5">
        <ProgressBar investedPct={investedPct} />
      </div>
    </div>
  );
}

import InputCard from "@/components/molecules/InputCard";
import { formatCrore, formatMonthly, formatRate } from "@/utils/formatters";
import { rateColor } from "@/utils/sipCalculations";

interface InputSectionProps {
  monthly: number;
  target: number;
  rate: number;
  onMonthlyChange: (v: number) => void;
  onTargetChange: (v: number) => void;
  onRateChange: (v: number) => void;
}

export default function InputSection({
  monthly,
  target,
  rate,
  onMonthlyChange,
  onTargetChange,
  onRateChange,
}: InputSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mx-auto mb-8">
      <InputCard
        label="Monthly SIP"
        value={monthly}
        min={1000}
        max={200000}
        step={1000}
        format={formatMonthly}
        accentColor="#60a5fa"
        onChange={onMonthlyChange}
      />
      <InputCard
        label="Target Amount"
        value={target}
        min={1000000}
        max={100000000}
        step={500000}
        format={formatCrore}
        accentColor="#60a5fa"
        onChange={onTargetChange}
      />
      <InputCard
        label="Expected Return"
        value={rate}
        min={1}
        max={25}
        step={1}
        format={formatRate}
        accentColor={rateColor(rate)}
        onChange={onRateChange}
      />
    </div>
  );
}

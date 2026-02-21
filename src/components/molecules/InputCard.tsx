import SliderInput from "@/components/atoms/SliderInput";

interface InputCardProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  accentColor: string;
  onChange: (value: number) => void;
}

export default function InputCard({
  label,
  value,
  min,
  max,
  step,
  format,
  accentColor,
  onChange,
}: InputCardProps) {
  return (
    <div className="bg-white/3 border border-white/[0.07] rounded-2xl px-6 py-5">
      <p className="mt-0 mb-[6px] text-xs text-slate-500 font-semibold tracking-[1px] uppercase">
        {label}
      </p>
      <p
        className="mt-0 mb-3 text-[22px] font-bold text-slate-200"
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {format(value)}
      </p>
      <SliderInput
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        accentColor={accentColor}
        minLabel={format(min)}
        maxLabel={format(max)}
      />
    </div>
  );
}

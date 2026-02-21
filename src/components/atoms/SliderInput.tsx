interface SliderInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  accentColor: string;
  minLabel: string;
  maxLabel: string;
}

export default function SliderInput({
  min,
  max,
  step,
  value,
  onChange,
  accentColor,
  minLabel,
  maxLabel,
}: SliderInputProps) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{ accentColor }}
      />
      <div className="flex justify-between text-[11px] mt-1" style={{ color: "var(--text-faint)" }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

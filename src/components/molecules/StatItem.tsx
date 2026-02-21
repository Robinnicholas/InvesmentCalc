interface StatItemProps {
  label: string;
  value: string;
  accentColor: string;
}

export default function StatItem({ label, value, accentColor }: StatItemProps) {
  return (
    <div>
      <p className="mt-0 mb-1 text-xs text-slate-500 font-medium">
        {label}
      </p>
      <p
        className="m-0 font-bold"
        style={{
          fontSize: "clamp(18px,3vw,26px)",
          color: accentColor,
          fontFamily: "var(--font-dm-mono), monospace",
        }}
      >
        {value}
      </p>
    </div>
  );
}

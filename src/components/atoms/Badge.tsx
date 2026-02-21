interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <div className="inline-block bg-[linear-gradient(135deg,#1e3a5f,#1a2d4a)] border border-blue-400/20 rounded-full px-[18px] py-[6px] text-xs font-semibold tracking-[2px] text-blue-400 uppercase">
      {children}
    </div>
  );
}

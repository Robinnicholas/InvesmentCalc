import Badge from "@/components/atoms/Badge";

export default function PlannerHeader() {
  return (
    <div className="text-center mb-10">
      <div className="mb-4">
        <Badge>SIP Goal Planner</Badge>
      </div>
      <h1
        className="mt-0 mb-2 font-bold bg-linear-to-br from-(--text-primary) to-(--text-secondary) bg-clip-text text-transparent"
        style={{ fontSize: "clamp(28px, 5vw, 42px)" }}
      >
        Your Path to ₹1 Crore
      </h1>
      <p className="m-0 text-[15px]" style={{ color: "var(--text-muted)" }}>
        Adjust your monthly SIP &amp; target to see how quickly wealth compounds
      </p>
    </div>
  );
}

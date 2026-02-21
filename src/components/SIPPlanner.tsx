"use client";

import { useState, useMemo } from "react";
import PlannerHeader from "@/components/organisms/PlannerHeader";
import InputSection from "@/components/organisms/InputSection";
import ResultCard from "@/components/organisms/ResultCard";
import GrowthChart from "@/components/organisms/GrowthChart";
import ComparisonTable from "@/components/organisms/ComparisonTable";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import { computeSIP, SCENARIOS } from "@/utils/sipCalculations";

export default function SIPPlanner() {
  const [isDark, setIsDark] = useState(true);
  const [monthly, setMonthly] = useState(30000);
  const [target, setTarget] = useState(10000000);
  const [rate, setRate] = useState(12);

  const active = useMemo(
    () => computeSIP(monthly, rate, target),
    [monthly, rate, target]
  );

  const results = useMemo(
    () => SCENARIOS.map((s) => ({ ...s, ...computeSIP(monthly, s.rate, target) })),
    [monthly, target]
  );

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      className="min-h-screen px-4 py-8 text-slate-900 dark:text-slate-200"
      style={{ background: "var(--bg-page)", fontFamily: "var(--font-dm-sans), 'Segoe UI', sans-serif" }}
    >
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
      <PlannerHeader />
      <InputSection
        monthly={monthly}
        target={target}
        rate={rate}
        onMonthlyChange={setMonthly}
        onTargetChange={setTarget}
        onRateChange={setRate}
      />
      <ResultCard result={active} rate={rate} />
      <GrowthChart data={active.data} rate={rate} />
      <ComparisonTable results={results} />
      <p className="text-center text-[11px] mt-3 text-slate-300 dark:text-slate-700">
        ⚠️ For educational purposes only. Past returns do not guarantee future performance. Consult a SEBI-registered advisor.
      </p>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const formatCrore = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString("en-IN")}`;
};

const formatYear = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (m === 0) return `${y} yrs`;
  return `${y}y ${m}m`;
};

function computeSIP(monthly: number, annualRate: number, targetAmount: number) {
  const r = annualRate / 100 / 12;
  let corpus = 0;
  let invested = 0;
  let months = 0;
  const data: { year: number; corpus: number; invested: number; gains: number; label: string }[] = [];

  while (corpus < targetAmount && months < 600) {
    months++;
    invested += monthly;
    corpus = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    if (months % 12 === 0 || corpus >= targetAmount) {
      data.push({
        year: months / 12,
        corpus: Math.round(corpus),
        invested: Math.round(invested),
        gains: Math.round(corpus - invested),
        label: `Yr ${months / 12}`,
      });
    }
  }

  return { months, corpus: Math.round(corpus), invested: Math.round(invested), data };
}

const SCENARIOS = [
  { label: "Conservative", rate: 8, color: "#60a5fa", desc: "Debt / Hybrid Funds" },
  { label: "Moderate", rate: 12, color: "#34d399", desc: "Large Cap Equity" },
  { label: "Aggressive", rate: 15, color: "#f59e0b", desc: "Mid / Small Cap" },
];

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(15,15,25,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: "12px 16px",
        fontSize: 13,
        color: "#e2e8f0",
      }}>
        <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#94a3b8" }}>Year {label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ margin: "2px 0", color: p.color }}>
            {p.name}: {formatCrore(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function rateColor(rate: number) {
  if (rate <= 9) return "#60a5fa";
  if (rate <= 13) return "#34d399";
  return "#f59e0b";
}

function rateLabel(rate: number) {
  if (rate <= 9) return "Conservative · Debt / Hybrid Funds";
  if (rate <= 13) return "Moderate · Large Cap Equity";
  return "Aggressive · Mid / Small Cap";
}

export default function SIPPlanner() {
  const [monthly, setMonthly] = useState(30000);
  const [target, setTarget] = useState(10000000);
  const [rate, setRate] = useState(12);

  const active = useMemo(
    () => computeSIP(monthly, rate, target),
    [monthly, rate, target]
  );

  const chartData = active.data;

  const results = useMemo(
    () => SCENARIOS.map((s) => ({ ...s, ...computeSIP(monthly, s.rate, target) })),
    [monthly, target]
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a14 0%, #0f172a 50%, #0a0a14 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e2e8f0",
      padding: "32px 16px",
    }}>
      <style>{`
        .sip-input-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; max-width: 900px; margin: 0 auto 32px; }
        .sip-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 16px; }
        .sip-table th, .sip-table td { padding: 12px 16px; }
        @media (max-width: 700px) {
          .sip-input-grid { grid-template-columns: 1fr; }
          .sip-stats-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .sip-stats-grid { grid-template-columns: 1fr; }
          .sip-table th, .sip-table td { padding: 10px 10px; font-size: 11px; }
        }
      `}</style>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #1e3a5f, #1a2d4a)",
          border: "1px solid rgba(99,179,237,0.2)",
          borderRadius: 50,
          padding: "6px 18px",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          color: "#63b3ed",
          marginBottom: 16,
          textTransform: "uppercase",
        }}>SIP Goal Planner</div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 700,
          margin: "0 0 8px",
          background: "linear-gradient(135deg, #e2e8f0 30%, #94a3b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Your Path to ₹1 Crore</h1>
        <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
          Adjust your monthly SIP &amp; target to see how quickly wealth compounds
        </p>
      </div>

      {/* Input Controls */}
      <div className="sip-input-grid">
        {[
          { label: "Monthly SIP", value: monthly, setter: setMonthly, min: 1000, max: 200000, step: 1000, format: (v: number) => `₹${Number(v).toLocaleString("en-IN")}`, color: "#60a5fa" },
          { label: "Target Amount", value: target, setter: setTarget, min: 1000000, max: 100000000, step: 500000, format: formatCrore, color: "#60a5fa" },
          { label: "Expected Return", value: rate, setter: setRate, min: 1, max: 25, step: 1, format: (v: number) => `${v}% p.a.`, color: rateColor(rate) },
        ].map(({ label, value, setter, min, max, step, format, color }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "20px 24px",
          }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748b", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{label}</p>
            <p style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "#e2e8f0" }}>{format(value)}</p>
            <input
              type="range" min={min} max={max} step={step} value={value}
              onChange={(e) => setter(Number(e.target.value))}
              style={{ width: "100%", accentColor: color, cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#475569", marginTop: 4 }}>
              <span>{format(min)}</span><span>{format(max)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Result Card */}
      {active.months && (
        <div style={{
          maxWidth: 900,
          margin: "0 auto 28px",
          background: `linear-gradient(135deg, ${rateColor(rate)}18, rgba(255,255,255,0.02))`,
          border: `1px solid ${rateColor(rate)}40`,
          borderRadius: 20,
          padding: "28px 32px",
        }}>
          <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748b", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
            {rateLabel(rate)}
          </p>
          <div className="sip-stats-grid">
            {[
              { label: "Time to Goal", value: formatYear(active.months), accent: rateColor(rate) },
              { label: "Total Invested", value: formatCrore(active.invested), accent: "#94a3b8" },
              { label: "Total Gains", value: formatCrore(active.corpus - active.invested), accent: "#34d399" },
            ].map(({ label, value, accent }) => (
              <div key={label}>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b", fontWeight: 500 }}>{label}</p>
                <p style={{ margin: 0, fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: accent, fontFamily: "'DM Mono', monospace" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#475569", marginBottom: 6 }}>
              <span>Invested</span><span>Gains</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(active.invested / active.corpus) * 100}%`,
                background: "#475569",
                borderRadius: 99,
                display: "inline-block",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#475569", marginTop: 4 }}>
              <span>{Math.round((active.invested / active.corpus) * 100)}%</span>
              <span>{Math.round(((active.corpus - active.invested) / active.corpus) * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div style={{
        maxWidth: 900,
        margin: "0 auto 28px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "24px",
      }}>
        <p style={{ margin: "0 0 20px", fontWeight: 600, fontSize: 14, color: "#94a3b8" }}>Corpus Growth Over Time</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={rateColor(rate)} stopOpacity={0.3} />
                <stop offset="95%" stopColor={rateColor(rate)} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#475569" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#475569" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="year" tick={{ fill: "#475569", fontSize: 11 }} tickFormatter={(v) => `Y${Math.round(v)}`} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#475569", fontSize: 11 }} tickFormatter={formatCrore} axisLine={false} tickLine={false} width={55} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="invested" name="Invested" stroke="#475569" fill="url(#gi)" strokeWidth={2} />
            <Area type="monotone" dataKey="corpus" name="Corpus" stroke={rateColor(rate)} fill="url(#gc)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Table */}
      <div style={{
        maxWidth: 900,
        margin: "0 auto 20px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        overflow: "hidden",
      }}>
        <div style={{ padding: "18px 24px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#94a3b8" }}>All Scenarios Compared</p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="sip-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {["Strategy", "Rate", "Time to Goal", "Total Invested", "Total Gains", "Final Corpus"].map(h => (
                  <th key={h} style={{ textAlign: "left", color: "#475569", fontWeight: 600, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const investedPct = r.corpus ? Math.round((r.invested / r.corpus) * 100) : 0;
                const gainsPct = 100 - investedPct;
                return (
                  <tr key={i} style={{
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <td>
                      <span style={{ color: r.color, fontWeight: 700 }}>{r.label}</span>
                      <span style={{ display: "block", fontSize: 11, color: "#475569", marginTop: 2 }}>{r.desc}</span>
                    </td>
                    <td style={{ fontFamily: "'DM Mono', monospace", color: "#94a3b8" }}>{r.rate}%</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: r.color, fontFamily: "'DM Mono', monospace" }}>{r.months ? formatYear(r.months) : "—"}</td>
                    <td style={{ padding: "14px 16px", color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{r.invested ? formatCrore(r.invested) : "—"}</td>
                    <td style={{ padding: "14px 16px", color: "#34d399", fontFamily: "'DM Mono', monospace" }}>{r.corpus ? formatCrore(r.corpus - r.invested) : "—"}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: "#e2e8f0", fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6 }}>
                        {r.corpus ? formatCrore(r.corpus) : "—"}
                      </span>
                      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden", display: "flex", minWidth: 100 }}>
                        <div style={{ width: `${investedPct}%`, background: "linear-gradient(90deg, #334155, #64748b)", transition: "width 0.5s ease", borderRadius: "99px 0 0 99px" }} />
                        <div style={{ width: `${gainsPct}%`, background: `linear-gradient(90deg, #059669, #34d399)`, transition: "width 0.5s ease", borderRadius: "0 99px 99px 0" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 10, color: "#475569" }}>
                        <span>{investedPct}% invested</span>
                        <span style={{ color: "#34d399" }}>{gainsPct}% gains</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: "#334155", marginTop: 12 }}>
        ⚠️ For educational purposes only. Past returns do not guarantee future performance. Consult a SEBI-registered advisor.
      </p>
    </div>
  );
}

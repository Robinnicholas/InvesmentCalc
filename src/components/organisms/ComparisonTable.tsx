import { formatCrore, formatYear } from "@/utils/formatters";
import { ScenarioResult } from "@/utils/sipCalculations";

interface ComparisonTableProps {
  results: ScenarioResult[];
}

const HEADERS = ["Strategy", "Rate", "Time to Goal", "Total Invested", "Total Gains", "Final Corpus"];

export default function ComparisonTable({ results }: ComparisonTableProps) {
  return (
    <div className="max-w-[900px] mx-auto mb-5 rounded-[20px] overflow-hidden" style={{ background: "var(--bg-surface-dim)", border: "1px solid var(--border-color)" }}>
      <div className="px-6 pt-[18px] pb-3" style={{ borderBottom: "1px solid var(--border-faint)" }}>
        <p className="m-0 font-semibold text-sm text-slate-700 dark:text-slate-400">
          All Scenarios Compared
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr style={{ background: "var(--bg-table-header)" }}>
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-[11px] tracking-[0.5px] uppercase whitespace-nowrap text-slate-400 dark:text-slate-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => {
              const investedPct = r.corpus ? Math.round((r.invested / r.corpus) * 100) : 0;
              const gainsPct = 100 - investedPct;
              return (
                <tr key={i} style={{ borderTop: "1px solid var(--border-subtler)" }}>
                  <td className="px-4 py-3">
                    <span className="font-bold" style={{ color: r.color }}>{r.label}</span>
                    <span className="block text-[11px] mt-[2px] text-slate-400 dark:text-slate-600">{r.desc}</span>
                  </td>
                  <td
                    className="px-4 py-3 text-slate-700 dark:text-slate-400"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {r.rate}%
                  </td>
                  <td
                    className="px-4 py-3 font-bold"
                    style={{ color: r.color, fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {r.months ? formatYear(r.months) : "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-700 dark:text-slate-400"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {r.invested ? formatCrore(r.invested) : "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-emerald-400"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {r.corpus ? formatCrore(r.corpus - r.invested) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="font-bold block mb-[6px] text-slate-900 dark:text-slate-200"
                      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                    >
                      {r.corpus ? formatCrore(r.corpus) : "—"}
                    </span>
                    <div className="h-[6px] rounded-full overflow-hidden flex min-w-[100px]" style={{ background: "var(--bg-surface)" }}>
                      <div
                        className="bg-[linear-gradient(90deg,#334155,#64748b)] transition-[width] duration-500 ease-in-out rounded-l-full"
                        style={{ width: `${investedPct}%` }}
                      />
                      <div
                        className="bg-[linear-gradient(90deg,#059669,#34d399)] transition-[width] duration-500 ease-in-out rounded-r-full"
                        style={{ width: `${gainsPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-[3px] text-[10px] text-slate-400 dark:text-slate-600">
                      <span>{investedPct}% invested</span>
                      <span className="text-emerald-400">{gainsPct}% gains</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

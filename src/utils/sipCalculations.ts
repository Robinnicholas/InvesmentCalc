export interface DataPoint {
  year: number;
  corpus: number;
  invested: number;
  gains: number;
  label: string;
}

export interface SIPResult {
  months: number;
  corpus: number;
  invested: number;
  data: DataPoint[];
}

export interface Scenario {
  label: string;
  rate: number;
  color: string;
  desc: string;
}

export type ScenarioResult = Scenario & SIPResult;

export const SCENARIOS: Scenario[] = [
  { label: "Conservative", rate: 8, color: "#60a5fa", desc: "Debt / Hybrid Funds" },
  { label: "Moderate", rate: 12, color: "#34d399", desc: "Large Cap Equity" },
  { label: "Aggressive", rate: 15, color: "#f59e0b", desc: "Mid / Small Cap" },
];

export function computeSIP(
  monthly: number,
  annualRate: number,
  targetAmount: number
): SIPResult {
  const r = annualRate / 100 / 12;
  let corpus = 0;
  let invested = 0;
  let months = 0;
  const data: DataPoint[] = [];

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

export function rateColor(rate: number): string {
  if (rate <= 9) return "#60a5fa";
  if (rate <= 13) return "#34d399";
  return "#f59e0b";
}

export function rateLabel(rate: number): string {
  if (rate <= 9) return "Conservative · Debt / Hybrid Funds";
  if (rate <= 13) return "Moderate · Large Cap Equity";
  return "Aggressive · Mid / Small Cap";
}

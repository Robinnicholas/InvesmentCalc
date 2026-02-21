"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ChartTooltip from "@/components/atoms/ChartTooltip";
import { formatCrore } from "@/utils/formatters";
import { DataPoint, rateColor } from "@/utils/sipCalculations";

interface GrowthChartProps {
  data: DataPoint[];
  rate: number;
}

export default function GrowthChart({ data, rate }: GrowthChartProps) {
  const color = rateColor(rate);

  return (
    <div className="max-w-[900px] mx-auto mb-7 bg-white/2 border border-white/[0.07] rounded-[20px] p-6">
      <p className="mt-0 mb-5 font-semibold text-sm text-slate-400">
        Corpus Growth Over Time
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#475569" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#475569" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#475569", fontSize: 11 }}
            tickFormatter={(v) => `Y${Math.round(v)}`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 11 }}
            tickFormatter={formatCrore}
            axisLine={false}
            tickLine={false}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="invested" name="Invested" stroke="#475569" fill="url(#gi)" strokeWidth={2} />
          <Area type="monotone" dataKey="corpus" name="Corpus" stroke={color} fill="url(#gc)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

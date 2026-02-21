export const formatCrore = (val: number): string => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString("en-IN")}`;
};

export const formatYear = (months: number): string => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (m === 0) return `${y} yrs`;
  return `${y}y ${m}m`;
};

export const formatMonthly = (v: number): string =>
  `₹${Number(v).toLocaleString("en-IN")}`;

export const formatRate = (v: number): string => `${v}% p.a.`;

// Dates are "YYYY-MM". A missing end means the span runs to the current month.

const parse = (month: string) => {
  const [year, m] = month.split("-").map(Number);
  return { year, month: m };
};

const currentMonth = (now: Date) => `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

/** "Feb 2026". */
export const formatMonth = (month: string) => {
  const { year, month: m } = parse(month);
  return new Date(Date.UTC(year, m - 1)).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

/** Length counted inclusively, like LinkedIn: Feb–Nov is 10 months. */
export const formatDuration = (start: string, end?: string, now = new Date()) => {
  const a = parse(start);
  const b = parse(end ?? currentMonth(now));
  const total = Math.max(1, (b.year - a.year) * 12 + (b.month - a.month) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years} ${years === 1 ? "yr" : "yrs"}`, months && `${months} ${months === 1 ? "mo" : "mos"}`]
    .filter(Boolean)
    .join(" ");
};

/** "2021–2025", "2025" or "2024–now". */
export const formatYears = (start: string, end?: string) => {
  const from = parse(start).year;
  if (!end) return `${from}–now`;
  const to = parse(end).year;
  return from === to ? `${from}` : `${from}–${to}`;
};

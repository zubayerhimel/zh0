export interface ContributionDay {
  /** "YYYY-MM-DD". */
  date: string;
  count: number;
  /** 0–4, GitHub's intensity buckets. */
  level: number;
}

/** Shape of `virtual:site-stats` (build/site-stats.ts). Fields are null when a source couldn't be reached. */
export interface SiteStats {
  fetchedAt: string;
  contributions: { total: number; days: ContributionDay[] } | null;
  npmDownloads: number | null;
}

/** Splits days into Sunday-first week columns, padding the first week so rows line up with weekdays. */
export const toWeeks = (days: ContributionDay[]): (ContributionDay | null)[][] => {
  if (!days.length) return [];
  const padding = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(padding).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
};

/** Month labels for week columns: a label where a new month starts, skipped if it would crowd the previous one. */
export const monthLabels = (weeks: (ContributionDay | null)[][], minGap = 3) => {
  const labels: { index: number; label: string }[] = [];
  let previous = "";
  weeks.forEach((week, index) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = first.date.slice(0, 7);
    if (month === previous) return;
    previous = month;
    const last = labels[labels.length - 1];
    if (last && index - last.index < minGap) {
      // The first column often holds the tail of the previous month; the month starting after it wins.
      if (last.index !== 0) return;
      labels.pop();
    }
    labels.push({
      index,
      label: new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
    });
  });
  return labels;
};

/** Whole years since a "YYYY-MM" month, e.g. 5 for Feb 2021 in Nov 2026. */
export const yearsSince = (start: string, now = new Date()) => {
  const [year, month] = start.split("-").map(Number);
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.floor(months / 12);
};

/** 910 → "910", 1840 → "1.8K", 1500000 → "1.5M". */
export const compactNumber = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

import { describe, expect, it } from "vitest";
import { type ContributionDay, monthLabels, toWeeks, yearsSince } from "./site-stats";

const daysFrom = (start: string, count: number): ContributionDay[] =>
  Array.from({ length: count }, (_, i) => {
    const date = new Date(`${start}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + i);
    return { date: date.toISOString().slice(0, 10), count: 0, level: 0 };
  });

describe("toWeeks", () => {
  it("pads the first week so each row is one weekday", () => {
    // 2026-11-04 is a Wednesday: three empty cells before it.
    const weeks = toWeeks(daysFrom("2026-11-04", 10));
    expect(weeks).toHaveLength(2);
    expect(weeks[0].slice(0, 3)).toEqual([null, null, null]);
    expect(weeks[0][3]?.date).toBe("2026-11-04");
    expect(weeks[1][0]?.date).toBe("2026-11-08");
  });
});

describe("monthLabels", () => {
  it("labels each new month and drops a crowded first label", () => {
    // Starts on Sun 2025-11-30, so the first column is November's last day.
    const labels = monthLabels(toWeeks(daysFrom("2025-11-30", 70)));
    expect(labels.map((l) => l.label)).toEqual(["Dec", "Jan", "Feb"]);
    expect(labels[0].index).toBe(1);
  });
});

describe("yearsSince", () => {
  it("counts whole years", () => {
    expect(yearsSince("2021-02", new Date(2026, 10, 23))).toBe(5);
    expect(yearsSince("2021-12", new Date(2026, 10, 23))).toBe(4);
  });
});

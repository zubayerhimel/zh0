import { describe, expect, it } from "vitest";
import { formatDuration, formatMonth, formatYears } from "./month-span";

describe("month spans", () => {
  const now = new Date(2026, 10, 20);

  it("counts months inclusively, like LinkedIn", () => {
    expect(formatDuration("2022-07", "2024-12")).toBe("2 yrs 6 mos");
    expect(formatDuration("2021-02", "2025-12")).toBe("4 yrs 11 mos");
    expect(formatDuration("2025-01", "2025-01")).toBe("1 mo");
    expect(formatDuration("2024-01", "2024-12")).toBe("1 yr");
  });

  it("runs current spans to this month", () => {
    expect(formatDuration("2026-02", undefined, now)).toBe("10 mos");
    expect(formatDuration("2024-04", undefined, now)).toBe("2 yrs 8 mos");
  });

  it("formats months and year ranges", () => {
    expect(formatMonth("2026-02")).toBe("Feb 2026");
    expect(formatYears("2021-02", "2025-12")).toBe("2021–2025");
    expect(formatYears("2025-05", "2025-12")).toBe("2025");
    expect(formatYears("2024-04")).toBe("2024–now");
  });
});

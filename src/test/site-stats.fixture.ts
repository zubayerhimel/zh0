import type { SiteStats } from "@/lib/site-stats";

const stats: SiteStats = {
  fetchedAt: "2026-11-23T00:00:00.000Z",
  contributions: {
    total: 3,
    days: [
      { date: "2026-11-01", count: 0, level: 0 },
      { date: "2026-11-02", count: 1, level: 1 },
      { date: "2026-11-03", count: 2, level: 2 },
    ],
  },
  npmDownloads: 910,
};

export default stats;

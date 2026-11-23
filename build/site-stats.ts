import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import type { SiteStats } from "../src/lib/site-stats.ts";

const GITHUB_USER = "zubayerhimel";
const NPM_PACKAGES = ["dotcrypt"];
const VIRTUAL_ID = "virtual:site-stats";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
// The client and SSR builds run as separate processes; the cache makes both embed the same numbers.
const CACHE_TTL_MS = 60 * 60 * 1000;

const fetchJson = async (url: string) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return res.json();
};

const fetchContributions = async (): Promise<SiteStats["contributions"]> => {
  const data = (await fetchJson(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)) as {
    total: { lastYear: number };
    contributions: { date: string; count: number; level: number }[];
  };
  return { total: data.total.lastYear, days: data.contributions };
};

const fetchNpmDownloads = async (): Promise<number> => {
  const counts = await Promise.all(
    NPM_PACKAGES.map(
      async (name) =>
        ((await fetchJson(`https://api.npmjs.org/downloads/point/last-year/${name}`)) as { downloads: number })
          .downloads,
    ),
  );
  return counts.reduce((sum, n) => sum + n, 0);
};

const settle = async <T>(label: string, task: Promise<T>): Promise<T | null> => {
  try {
    return await task;
  } catch (error) {
    console.warn(`[site-stats] ${label} unavailable: ${(error as Error).message}`);
    return null;
  }
};

const loadStats = async (cacheFile: string): Promise<SiteStats> => {
  try {
    const cached = JSON.parse(readFileSync(cacheFile, "utf8")) as SiteStats;
    if (Date.now() - Date.parse(cached.fetchedAt) < CACHE_TTL_MS) return cached;
  } catch {}

  const [contributions, npmDownloads] = await Promise.all([
    settle("GitHub contributions", fetchContributions()),
    settle("npm downloads", fetchNpmDownloads()),
  ]);
  const stats: SiteStats = { fetchedAt: new Date().toISOString(), contributions, npmDownloads };
  if (contributions && npmDownloads !== null) {
    mkdirSync(path.dirname(cacheFile), { recursive: true });
    writeFileSync(cacheFile, JSON.stringify(stats));
  }
  return stats;
};

/** Exposes live GitHub and npm numbers as `virtual:site-stats`, fetched once per build (or dev server start). */
export const siteStats = (): Plugin => {
  let cacheFile = "";
  let stats: Promise<SiteStats> | undefined;
  return {
    name: "site-stats",
    configResolved(config) {
      cacheFile = path.resolve(config.root, "node_modules/.cache/site-stats.json");
    },
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    async load(id) {
      if (id !== RESOLVED_ID) return;
      stats ??= loadStats(cacheFile);
      return `export default ${JSON.stringify(await stats)};`;
    },
  };
};

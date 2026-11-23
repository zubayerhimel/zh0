// Pure helpers shared by the app (src/data/blogs.ts) and the build (vite.config.ts).

export interface BlogFrontmatter {
  slug?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  readTime?: string;
}

export const parseFrontmatter = (fileContent: string): { data: BlogFrontmatter; content: string } => {
  const match = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/.exec(fileContent);
  if (!match) return { data: {}, content: fileContent };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    // YAML quoting: escapes work inside double quotes ("\""), and a doubled quote inside single quotes ('it''s').
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\(["\\])/g, "$1");
    } else if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1).replace(/''/g, "'");
    }
    data[key] = value;
  }

  return { data, content: match[2] };
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Parses "YYYY-MM-DD" or "Mon YYYY" (e.g. "Jan 2026") into a UTC date.
 * `new Date("Jan 2026")` is not standardised and returns Invalid Date in Safari/Firefox.
 */
export const parseBlogDate = (value: string): Date | null => {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (iso) return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));

  const monthYear = /^([a-z]{3})[a-z]*\.?\s+(\d{4})$/i.exec(value.trim());
  if (monthYear) {
    const month = MONTHS.indexOf(monthYear[1].toLowerCase());
    if (month !== -1) return new Date(Date.UTC(Number(monthYear[2]), month, 1));
  }

  return null;
};

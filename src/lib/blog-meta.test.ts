import { describe, expect, it } from "vitest";
import { parseBlogDate, parseFrontmatter } from "./blog-meta";

describe("parseBlogDate", () => {
  it("parses month-year and ISO dates as UTC", () => {
    expect(parseBlogDate("Jan 2026")?.toISOString()).toBe("2026-01-01T00:00:00.000Z");
    expect(parseBlogDate("September 2025")?.toISOString()).toBe("2025-09-01T00:00:00.000Z");
    expect(parseBlogDate("2025-11-19")?.toISOString()).toBe("2025-11-19T00:00:00.000Z");
  });

  it("returns null for unparseable dates", () => {
    expect(parseBlogDate("")).toBeNull();
    expect(parseBlogDate("Foo 2025")).toBeNull();
  });
});

describe("parseFrontmatter", () => {
  it("keeps colons inside values and strips quotes", () => {
    const { data, content } = parseFrontmatter('---\ntitle: "A: B"\nslug: a-b\n---\n\nBody');
    expect(data).toEqual({ title: "A: B", slug: "a-b" });
    expect(content).toBe("Body");
  });

  it("unescapes quotes inside quoted values", () => {
    const { data } = parseFrontmatter(
      `---\nexcerpt: "No more \\"Repository not found\\"."\ntitle: 'It''s fine'\n---\n`,
    );
    expect(data).toEqual({ excerpt: 'No more "Repository not found".', title: "It's fine" });
  });
});

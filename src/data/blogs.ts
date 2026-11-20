import { parseBlogDate, parseFrontmatter } from "@/lib/blog-meta";

export interface Blog {
  slug: string;
  title: string;
  /** Display date from frontmatter, e.g. "Jan 2026". */
  date: string;
  /** ISO 8601 publish date, or "" if the frontmatter date could not be parsed. */
  publishedAt: string;
  excerpt: string;
  readTime: string;
  content: string;
}

const modules = import.meta.glob("../content/blogs/*.md", { query: "?raw", import: "default", eager: true });

export const blogs: Blog[] = Object.values(modules)
  .map((fileContent: unknown) => {
    if (typeof fileContent !== "string") {
      throw new Error("Markdown file content is not a string");
    }
    const { data, content } = parseFrontmatter(fileContent);
    const date = data.date || "";

    return {
      slug: data.slug || "",
      title: data.title || "Untitled",
      date,
      publishedAt: parseBlogDate(date)?.toISOString() ?? "",
      excerpt: data.excerpt || "",
      readTime: data.readTime || "",
      content: content.trim(),
    };
  })
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

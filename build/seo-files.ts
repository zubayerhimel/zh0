import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { parseBlogDate, parseFrontmatter } from "../src/lib/blog-meta";

const SITE_URL = "https://www.zh0.dev";

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] ?? c);

const readPosts = (dir: string) =>
  readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = parseFrontmatter(readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: data.slug ?? "",
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        published: parseBlogDate(data.date ?? ""),
      };
    })
    .filter((post) => post.slug)
    .sort((a, b) => (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0));

/** Emits sitemap.xml and rss.xml from src/content/blogs at build time. */
export const seoFiles = (): Plugin => ({
  name: "seo-files",
  apply: (_config, env) => env.command === "build" && !env.isSsrBuild,
  generateBundle() {
    const blogDir = path.resolve(import.meta.dirname, "../src/content/blogs");
    const posts = readPosts(blogDir);
    const day = (date: Date | null) => date?.toISOString().slice(0, 10);

    const urls = [
      { loc: "/", lastmod: day(posts[0]?.published ?? null) },
      { loc: "/blogs", lastmod: day(posts[0]?.published ?? null) },
      ...posts.map((post) => ({ loc: `/blog/${post.slug}`, lastmod: day(post.published) })),
    ];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;

    const items = posts.map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>${post.published ? `\n      <pubDate>${post.published.toUTCString()}</pubDate>` : ""}
    </item>`,
    );
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zubayer Alam — Writing</title>
    <link>${SITE_URL}/blogs</link>
    <description>Notes on frontend engineering, React, Next.js and building for the web.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
    this.emitFile({ type: "asset", fileName: "rss.xml", source: rss });
  },
});

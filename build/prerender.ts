import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Plugin } from "vite";
import type { SeoTags } from "../src/lib/seo-context";

/** Exports of src/entry-server.tsx after the SSR build. */
interface ServerEntry {
  routes: string[];
  render: (url: string) => Promise<{ html: string; seo?: SeoTags }>;
  textFiles: () => Record<string, string>;
}

const escapeAttr = (value: string) =>
  value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

const setMeta = (html: string, attr: "name" | "property", key: string, value: string) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${escapeAttr(value)}$2`);

/** Writes the route's title, description, canonical and Open Graph tags into the index.html template. */
const applyHead = (template: string, seo: SeoTags, extraHead: string[]) => {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(seo.title)}</title>`);
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "property", "og:title", seo.title);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "property", "og:url", seo.url);
  html = setMeta(html, "property", "og:type", seo.type);
  html = seo.noindex
    ? html.replace(/\s*<link rel="canonical"[^>]*>/, "")
    : html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeAttr(seo.url)}$2`);
  const extra = [
    ...(seo.publishedTime ? [`<meta property="article:published_time" content="${seo.publishedTime}" />`] : []),
    ...(seo.noindex ? ['<meta name="robots" content="noindex" />'] : []),
    ...extraHead,
  ];
  return html.replace("</head>", `${extra.map((tag) => `    ${tag}\n`).join("")}  </head>`);
};

const outputFile = (route: string) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

/**
 * Runs after the SSR build (`vite build --ssr src/entry-server.tsx`): renders every route to static HTML in dist/
 * so agents and crawlers that don't run JavaScript get real content, and writes llms.txt plus Markdown copies of posts.
 */
export const prerender = (): Plugin => {
  let ssrOutDir = "";
  return {
    name: "prerender",
    apply: (_config, env) => Boolean(env.isSsrBuild),
    configResolved(config) {
      ssrOutDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const dist = path.resolve(ssrOutDir, "../dist");
      const template = readFileSync(path.join(dist, "index.html"), "utf8");
      const entry: ServerEntry = await import(pathToFileURL(path.join(ssrOutDir, "entry-server.js")).href);
      const llmsLink = '<link rel="alternate" type="text/markdown" title="llms.txt" href="/llms.txt" />';

      const pages = [
        ...entry.routes.map((route) => ({ route, file: outputFile(route) })),
        { route: "/404", file: "404.html" },
      ];
      for (const { route, file } of pages) {
        const { html, seo } = await entry.render(route);
        if (!seo) throw new Error(`No <Seo> rendered for ${route}`);
        const markdown = route.startsWith("/blog/")
          ? `<link rel="alternate" type="text/markdown" href="${route}.md" />`
          : llmsLink;
        const page = applyHead(template, seo, [markdown]).replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`,
        );
        mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
        writeFileSync(path.join(dist, file), page);
      }

      for (const [file, text] of Object.entries(entry.textFiles())) {
        mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
        writeFileSync(path.join(dist, file), text);
      }

      rmSync(ssrOutDir, { recursive: true, force: true });
      console.log(`prerendered ${pages.length} pages and ${Object.keys(entry.textFiles()).length} text files`);
    },
  };
};

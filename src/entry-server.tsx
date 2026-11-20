// Server entry used only by the prerender build step (build/prerender.ts).
import { prerender } from "react-dom/static";
import { AppShell } from "./App";
import { blogs } from "./data/blogs";
import { jobs } from "./data/experience";
import { projects } from "./data/projects";
import { blogMarkdown, buildLlmsTxt } from "./lib/llms";
import { SeoCollectorContext, type SeoTags } from "./lib/seo-context";

export const render = async (url: string) => {
  let seo: SeoTags | undefined;
  const { prelude } = await prerender(
    <SeoCollectorContext
      value={(tags) => {
        seo = tags;
      }}
    >
      <AppShell location={url} />
    </SeoCollectorContext>,
  );
  return { html: await new Response(prelude).text(), seo };
};

export const routes = ["/", "/blogs", ...blogs.map((b) => `/blog/${b.slug}`)];

export const textFiles = () => {
  const llms = buildLlmsTxt({ jobs, projects, blogs });
  return {
    "llms.txt": llms,
    "llms-full.txt": [llms, ...blogs.map(blogMarkdown)].join("\n---\n\n"),
    ...Object.fromEntries(blogs.map((b) => [`blog/${b.slug}.md`, blogMarkdown(b)])),
  };
};

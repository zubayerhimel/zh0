// Builds /llms.txt (https://llmstxt.org): a plain Markdown summary of the site for AI agents.
import { SITE_URL } from "@/components/Seo";
import type { Blog } from "@/data/blogs";
import type { Job } from "@/data/experience";
import type { Project } from "@/data/projects";
import { formatMonth } from "@/lib/month-span";

const CONTACT_LINKS = [
  { label: "GitHub", url: "https://github.com/zubayerhimel" },
  { label: "LinkedIn", url: "https://linkedin.com/in/zubayerhimel" },
  { label: "X (Twitter)", url: "https://twitter.com/zubayerhimel0" },
  { label: "Email", url: "mailto:zubayerhimel0@gmail.com" },
];

const range = (start: string, end?: string) => `${formatMonth(start)} – ${end ? formatMonth(end) : "present"}`;

const experience = (jobs: Job[]) =>
  jobs.flatMap((job) => [
    `### ${job.url ? `[${job.company}](${job.url})` : job.company} (${job.location})`,
    "",
    ...(job.summary ? [job.summary, ""] : []),
    ...job.roles.flatMap((role) => [
      `- **${role.title}**, ${role.terms}, ${range(role.start, role.end)}`,
      ...(role.highlights ?? []).map((h) => `  - ${h}`),
    ]),
    ...(job.stack?.length ? ["", `Stack: ${job.stack.join(", ")}`] : []),
    "",
  ]);

const project = (p: Project) => {
  const links = [p.source && `[source](${p.source})`].filter(Boolean).join(", ");
  const title = p.url ? `[${p.title}](${p.url})` : p.title;
  return `- ${title} (${p.kind}): ${p.description} Stack: ${p.stack.join(", ")}.${links ? ` ${links}` : ""}`;
};

export const buildLlmsTxt = ({ jobs, projects, blogs }: { jobs: Job[]; projects: Project[]; blogs: Blog[] }) =>
  [
    "# Zubayer Alam",
    "",
    "> Product engineer in Dhaka, Bangladesh, and co-founder of Devfik. Builds fast, accessible web and mobile apps with React, Next.js and TypeScript, from first sketch to launch.",
    "",
    "Since 2021 he has shipped CRM and SaaS products for BAT Bangladesh and Unilever, and sites for Jaguar Land Rover and leading pharmaceutical brands. He currently works as a frontend developer at WPP Production. Open to work.",
    "",
    "## Contact",
    "",
    `- [Website](${SITE_URL}/)`,
    ...CONTACT_LINKS.map((link) => `- [${link.label}](${link.url})`),
    "",
    "## Projects",
    "",
    ...projects.map(project),
    "",
    "## Experience",
    "",
    ...experience(jobs),
    "## Writing",
    "",
    ...blogs.map((b) => `- [${b.title}](${SITE_URL}/blog/${b.slug}.md): ${b.excerpt} (${b.date})`),
    "",
    "## Optional",
    "",
    `- [Full text of every post](${SITE_URL}/llms-full.txt)`,
    `- [RSS feed](${SITE_URL}/rss.xml)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

/** A post as standalone Markdown, served at /blog/<slug>.md. */
export const blogMarkdown = (b: Blog) =>
  `# ${b.title}\n\n${b.date} · ${b.readTime} · ${SITE_URL}/blog/${b.slug}\n\n> ${b.excerpt}\n\n${b.content}\n`;

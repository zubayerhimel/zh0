import { useEffect } from "react";

export const SITE_URL = "https://www.zh0.dev";
const SITE_NAME = "Zubayer Alam";

interface SeoProps {
  /** Page title without the site name; omit on the home page. */
  title?: string;
  description: string;
  /** Path starting with "/", used for the canonical and og:url. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

// index.html holds the defaults for crawlers that don't run JS; this keeps them in sync per route.
const setTag = (selector: string, create: () => HTMLElement, attr: string, value: string | undefined) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (value === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const meta = (key: "name" | "property", name: string, value: string | undefined) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(key, name);
      return el;
    },
    "content",
    value,
  );

const Seo = ({ title, description, path, type = "website", publishedTime, noindex }: SeoProps) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Frontend Developer`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    meta("name", "description", description);
    meta("property", "og:title", fullTitle);
    meta("property", "og:description", description);
    meta("property", "og:url", url);
    meta("property", "og:type", type);
    meta("property", "article:published_time", publishedTime);
    meta("name", "robots", noindex ? "noindex" : undefined);
    setTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      },
      "href",
      noindex ? undefined : url,
    );
  }, [title, description, path, type, publishedTime, noindex]);

  return null;
};

export default Seo;

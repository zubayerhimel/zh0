import type { Element, ElementContent, Root, RootContent } from "hast";
import type { HLJSApi, LanguageFn } from "highlight.js";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import diff from "highlight.js/lib/languages/diff";
import ini from "highlight.js/lib/languages/ini";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import powershell from "highlight.js/lib/languages/powershell";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import { createLowlight } from "lowlight";

// highlight.js has no grammar for ~/.ssh/config, so define a small one.
const sshConfig: LanguageFn = (hljs: HLJSApi) => ({
  name: "SSH Config",
  aliases: ["ssh"],
  case_insensitive: true,
  contains: [
    hljs.HASH_COMMENT_MODE,
    {
      begin: [/^\s*/, /(?:Host|Match)\b/, /\s+/, /.+$/],
      beginScope: { 2: "keyword", 4: "title" },
    },
    {
      begin: [/^\s*/, /[A-Za-z]+/, /\s+/],
      beginScope: { 2: "attr" },
      end: /$/,
      contains: [
        { scope: "literal", match: /\b(?:yes|no|ask|confirm|none|any)\b/ },
        { scope: "number", match: /\b\d+\b/ },
        { scope: "string", match: /~?\/\S+/ },
      ],
    },
  ],
});

// Only the languages used in posts are registered. lowlight's `common` set (which rehype-highlight
// always bundles) would more than double the blog chunk.
const lowlight = createLowlight({
  bash,
  css,
  diff,
  ini,
  javascript,
  json,
  plaintext,
  powershell,
  sshConfig,
  typescript,
  xml,
  yaml,
});

lowlight.registerAlias({
  bash: ["sh", "shell", "zsh"],
  plaintext: ["text", "txt"],
  sshConfig: ["ssh-config"],
  typescript: ["ts", "tsx"],
  javascript: ["js", "jsx"],
});

const textOf = (node: ElementContent): string =>
  node.type === "text" ? node.value : node.type === "element" ? node.children.map(textOf).join("") : "";

const highlightCode = (code: Element) => {
  const classes = Array.isArray(code.properties.className) ? code.properties.className.map(String) : [];
  const language = classes.find((name) => name.startsWith("language-"))?.slice("language-".length);
  if (!language || !lowlight.registered(language)) return;

  const tree = lowlight.highlight(language, code.children.map(textOf).join(""));
  code.properties.className = [...classes, "hljs"];
  code.children = tree.children as ElementContent[];
};

const visit = (node: Root | RootContent) => {
  if (node.type !== "root" && node.type !== "element") return;
  if (node.type === "element" && node.tagName === "pre") {
    const code = node.children.find((child): child is Element => child.type === "element" && child.tagName === "code");
    if (code) highlightCode(code);
    return;
  }
  node.children.forEach(visit);
};

/** Rehype plugin: syntax-highlights fenced code blocks (`<pre><code class="language-*">`). */
export const rehypeHighlight = () => (tree: Root) => visit(tree);

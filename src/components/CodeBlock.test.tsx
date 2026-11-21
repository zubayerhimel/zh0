import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rehypeHighlight } from "@/lib/highlight";
import CodeBlock from "./CodeBlock";

const markdown = ["```ssh-config", "# Work account", "Host github.com", "  IdentitiesOnly yes", "```"].join("\n");

describe("CodeBlock", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() =>
      root.render(
        <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={{ pre: CodeBlock }}>
          {markdown}
        </ReactMarkdown>,
      ),
    );
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("highlights tokens, including the custom ssh-config grammar", () => {
    expect(container.querySelector(".hljs-comment")?.textContent).toBe("# Work account");
    expect(container.querySelector(".hljs-keyword")?.textContent).toBe("Host");
    expect(container.querySelector(".hljs-attr")?.textContent).toBe("IdentitiesOnly");
    expect(container.querySelector(".hljs-literal")?.textContent).toBe("yes");
  });

  it("copies the plain source text, not the highlighted markup", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    await act(async () => container.querySelector("button")?.click());
    expect(writeText).toHaveBeenCalledWith("# Work account\nHost github.com\n  IdentitiesOnly yes");
  });
});

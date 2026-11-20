import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { blogs } from "@/data/blogs";

describe("App smoke test", () => {
  let container: HTMLDivElement;
  let root: Root;
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    window.scrollTo = vi.fn();
    consoleError = vi.spyOn(console, "error");
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    expect(consoleError.mock.calls).toEqual([]);
    consoleError.mockRestore();
  });

  const renderAt = async (path: string) => {
    window.history.pushState({}, "", path);
    root = createRoot(container);
    await act(async () => {
      root.render(<App />);
      // Let lazily loaded chunks resolve inside act().
      await Promise.all([import("@/pages/BlogDetail"), import("@/lib/motion-features")]);
    });
  };

  it("renders the home page", async () => {
    await renderAt("/");
    expect(container.textContent).toContain(blogs[0].title);
  });

  it("renders the blog list", async () => {
    await renderAt("/blogs");
    expect(container.querySelector("h1")?.textContent).toContain("Writing");
  });

  it("renders a blog post", async () => {
    await renderAt(`/blog/${blogs[0].slug}`);
    expect(container.querySelector("h1")?.textContent).toBe(blogs[0].title);
  });

  it("renders the 404 page for unknown routes", async () => {
    await renderAt("/does-not-exist");
    expect(container.querySelector("h1")?.textContent).toBe("This page doesn't exist.");
    expect(container.textContent).toContain("/does-not-exist");
  });
});

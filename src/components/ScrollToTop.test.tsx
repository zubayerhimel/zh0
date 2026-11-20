import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  let container: HTMLDivElement;
  let root: Root;
  let router: ReturnType<typeof createMemoryRouter>;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    window.scrollTo = vi.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    router = createMemoryRouter([{ path: "*", element: <ScrollToTop /> }], { initialEntries: ["/blogs"] });
    act(() => root.render(<RouterProvider router={router} />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    document.getElementById("experience")?.remove();
    vi.useRealTimers();
  });

  it("scrolls to a #hash target that mounts after the page transition", async () => {
    await act(() => router.navigate("/#experience"));
    // The old page is still exiting, so the target isn't in the DOM yet.
    act(() => vi.advanceTimersByTime(400));

    const target = document.createElement("section");
    target.id = "experience";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);
    act(() => vi.advanceTimersByTime(50));

    expect(target.scrollIntoView).toHaveBeenCalledOnce();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("falls back to the top when the #hash target never appears", async () => {
    await act(() => router.navigate("/#missing"));
    act(() => vi.advanceTimersByTime(3000));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

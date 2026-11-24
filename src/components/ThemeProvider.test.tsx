import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";

const pressD = (target: EventTarget = window, init: KeyboardEventInit = {}) =>
  act(() => {
    target.dispatchEvent(new KeyboardEvent("keydown", { key: "d", bubbles: true, ...init }));
  });

const isDark = () => document.documentElement.classList.contains("dark");

describe("ThemeProvider D shortcut", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() =>
      root.render(
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <input />
        </ThemeProvider>,
      ),
    );
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("toggles between light and dark and remembers the choice", () => {
    expect(isDark()).toBe(false);
    pressD();
    expect(isDark()).toBe(true);
    expect(localStorage.getItem("test-theme")).toBe("dark");
    pressD();
    expect(isDark()).toBe(false);
  });

  it("ignores D while typing or with a modifier", () => {
    pressD(container.querySelector("input") as HTMLInputElement);
    pressD(window, { metaKey: true });
    pressD(window, { ctrlKey: true });
    expect(isDark()).toBe(false);
  });
});

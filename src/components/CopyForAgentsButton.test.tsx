import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CopyForAgentsButton from "./CopyForAgentsButton";

const mockClipboard = (writeText: (text: string) => Promise<void>) =>
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

describe("CopyForAgentsButton", () => {
  let container: HTMLDivElement;
  let root: Root;
  const button = () => container.querySelector("button") as HTMLButtonElement;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
  });

  it("copies the markdown and confirms, then resets", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    act(() => root.render(<CopyForAgentsButton markdown="# Post" />));
    expect(button().textContent).toBe("Copy for agents");

    await act(async () => button().click());
    expect(writeText).toHaveBeenCalledWith("# Post");
    expect(button().textContent).toBe("Copied");

    act(() => vi.advanceTimersByTime(2000));
    expect(button().textContent).toBe("Copy for agents");
  });

  it("says so when the clipboard is unavailable", async () => {
    mockClipboard(() => Promise.reject(new Error("denied")));
    act(() => root.render(<CopyForAgentsButton markdown="# Post" />));

    await act(async () => button().click());
    expect(button().textContent).toBe("Couldn't copy");
  });
});

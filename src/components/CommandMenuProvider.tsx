import type React from "react";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { CommandMenuContext } from "@/hooks/use-command-menu";

const CommandMenu = lazy(() => import("./CommandMenu"));

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/** Provides the site-wide command menu, opened with ⌘K / Ctrl+K, "/" or `useOpenCommandMenu()` (hooks/use-command-menu). */
export const CommandMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  // The dialog (cmdk + Radix) loads on first open and stays mounted so it can animate closed.
  const [loaded, setLoaded] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (open) setLoaded(true);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !event.metaKey && !event.ctrlKey && !isTyping(event.target)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandMenuContext value={openMenu}>
      {children}
      {loaded && (
        <Suspense fallback={null}>
          <CommandMenu open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </CommandMenuContext>
  );
};

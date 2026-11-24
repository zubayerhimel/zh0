import { useCallback, useEffect, useState } from "react";
import { type ResolvedTheme, type Theme, ThemeProviderContext } from "@/hooks/use-theme";
import { isTyping } from "@/lib/utils";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const darkQuery = "(prefers-color-scheme: dark)";
const isBrowser = typeof window !== "undefined";
const getSystemTheme = (): ResolvedTheme => (isBrowser && window.matchMedia(darkQuery).matches ? "dark" : "light");

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (isBrowser && (localStorage.getItem(storageKey) as Theme)) || defaultTheme,
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const saveTheme = useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);
      setTheme(next);
    },
    [storageKey],
  );

  useEffect(() => {
    const media = window.matchMedia(darkQuery);
    const onChange = () => setSystemTheme(getSystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // "D" flips between light and dark.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "d" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.repeat ||
        event.defaultPrevented ||
        isTyping(event.target)
      )
        return;
      saveTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, saveTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = { theme, resolvedTheme, setTheme: saveTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

import { createContext, useContext, useMemo } from "react";

export const CommandMenuContext = createContext<() => void>(() => {});

/** Opens the site-wide command menu (components/CommandMenuProvider.tsx). */
export const useOpenCommandMenu = () => useContext(CommandMenuContext);

/** "⌘" on Apple devices, "Ctrl" elsewhere. The prerendered HTML assumes Apple. */
export const useModKey = () =>
  useMemo(() => (typeof navigator === "undefined" || /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"), []);

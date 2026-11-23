import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      // Tests never hit the network; build/site-stats.ts serves this module in real builds.
      "virtual:site-stats": path.resolve(import.meta.dirname, "./src/test/site-stats.fixture.ts"),
    },
  },
});

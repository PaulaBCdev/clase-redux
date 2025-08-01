import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
    },
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});

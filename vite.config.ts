import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**"],
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@auth": path.resolve(__dirname, "./src/features/auth"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@copy": path.resolve(__dirname, "./src/copy"),
      "@navigation": path.resolve(__dirname, "./src/features/navigation"),
      "@onboarding": path.resolve(__dirname, "./src/features/onboarding"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});

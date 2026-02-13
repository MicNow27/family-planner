import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@copy": path.resolve(__dirname, "./src/copy"),
      breakpoints: path.resolve(
        __dirname,
        "./src/styles/abstracts/_breakpoints.scss",
      ),
      components: path.resolve(
        __dirname,
        "./src/styles/abstracts/_components.scss",
      ),
      typography: path.resolve(
        __dirname,
        "./src/styles/abstracts/_typography.scss",
      ),
    },
  },
});

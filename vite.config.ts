import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      breakpoints: path.resolve(
        __dirname,
        "./src/styles/abstracts/_breakpoints.scss",
      ),
      cards: path.resolve(__dirname, "./src/styles/abstracts/_cards.scss"),
      typography: path.resolve(
        __dirname,
        "./src/styles/abstracts/_typography.scss",
      ),
    },
  },
});

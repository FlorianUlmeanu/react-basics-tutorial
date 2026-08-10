import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Tailwind v4 nu mai are tailwind.config.js — plugin-ul Vite scanează
  // direct sursele și generează utilitarele la build/dev.
  plugins: [react(), tailwindcss()],
  resolve: {
    // Alias @/ -> src/ — pentru bundler: rezolvarea reală a fișierului la
    // dev (import-uri live) și la build. Fără el, TS/IDE-ul ar accepta
    // "@/..." (vezi tsconfig.app.json), dar Vite n-ar găsi fișierul.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  }
});

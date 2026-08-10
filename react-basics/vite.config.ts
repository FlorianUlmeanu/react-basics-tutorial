import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias @/ -> src/ — pentru bundler: rezolvarea reală a fișierului la
    // dev (import-uri live) și la build. Fără el, TS/IDE-ul ar accepta
    // "@/..." (vezi tsconfig.app.json), dar Vite n-ar găsi fișierul.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  }
});

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    // Fișierele copiate de shadcn/ui exportă și `buttonVariants` (cva) lângă
    // componentă — util pentru a refolosi clasele în afara <Button>, dar
    // strică regula de Fast Refresh care cere "un fișier = doar componente".
    // Codul e al nostru (Pas 11), deci excepția e locală, nu globală.
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off"
    }
  }
]);

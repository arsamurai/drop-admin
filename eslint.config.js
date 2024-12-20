import eslint from "@eslint/js"
import tanstackQuery from "@tanstack/eslint-plugin-query"
import tsparser from "@typescript-eslint/parser"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import jsonc from "jsonc-eslint-parser"
import tseslint from "typescript-eslint"

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react,
      "@tanstack/query": tanstackQuery,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-useless-escape": "off",
      "no-console": "warn",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "no-duplicate-imports": "error",
      "react/prop-types": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".tsx"],
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/stable-query-client": "error",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: ["*.json"],
    languageOptions: {
      parser: jsonc,
    },
    rules: {
      quotes: ["error", "double"],
    },
  },
)

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typescript from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import path from "node:path";
import parse from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "__mocks__/**",
      "coverage",
      "dist",
      "eslint.config.js",
      "jest.setup.ts",
      "node_modules",
      "package.json",
      "package-lock.json",
      "scripts",
      "test-examples",
      "vite.config.js",
      "vite-env.d.ts",
      "vitest.workspace.js",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.jest, ...globals.node },
      parser: parse,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        project: path.resolve("./tsconfig.json"),
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      react: {
        version: "18.3",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      import: importPlugin,
      jest,
      "jsx-a11y": jsxA11y,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...jest.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "no-undef": "off",
      "import/no-unresolved": "error",
    },
  },
];

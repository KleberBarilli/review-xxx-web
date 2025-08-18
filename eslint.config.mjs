import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import i18next from "eslint-plugin-i18next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.{ts,tsx}"],
    plugins: { i18next },
    rules: {
      "i18next/no-literal-string": [
        "warn",
        {
          markupOnly: true,
          onlyAttribute: ["aria-label", "title", "placeholder", "alt"],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,css,md}"],
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "warn",
    },
  },

  {
    files: ["src/messages/**/*.json"],
    rules: { "i18next/no-literal-string": "off" },
  },
];

export default eslintConfig;

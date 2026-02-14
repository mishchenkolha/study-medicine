import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Додаємо Prettier
  ...compat.extends("plugin:prettier/recommended"), // або "prettier" якщо хочеш тільки вимикати правила

  // Тут можна підключати Storybook, якщо потрібно
  // ...storybook.configs["flat/recommended"]
];

export default eslintConfig;

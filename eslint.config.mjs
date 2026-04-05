// eslint.config.mjs
// ESLint 9 uses flat config format — .eslintrc.json is no longer supported.
// next/core-web-vitals includes: eslint:recommended + react + react-hooks + next rules.

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

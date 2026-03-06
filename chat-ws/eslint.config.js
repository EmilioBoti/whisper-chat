import tseslint from "typescript-eslint"
import prettierPlugin from "eslint-plugin-prettier" 
import prettierConfig from "eslint-config-prettier"
import security from "eslint-plugin-security"

export default [
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      prettier: prettierPlugin,
      security
    },
    rules: {
      // Backend strictness
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
        // Clean architecture enforcement
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      //Prisma
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false }
      ],

      // Security plugin
      ...security.configs.recommended.rules,
            // Prettier must be last
      "prettier/prettier": "error"
    }
  },
  prettierConfig
]
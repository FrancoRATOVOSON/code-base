// @ts-check

import functional from 'eslint-plugin-functional/flat'

/** @type {import("./eslint-types").ConfigType} */
export const functionalConfig = rules => [
  functional.configs.recommended,
  {
    plugins: { functional },
    languageOptions: {
      parserOptions: {
        project: true
      }
    },
    rules: {
      'functional/no-throw-statements': ['error', { allowInAsyncFunctions: false }],
      ...rules
    }
  }
]

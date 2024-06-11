// @ts-check

import eslintPluginUnicorn from 'eslint-plugin-unicorn'

/** @type {import("./eslint-types").ConfigType} */
export const unicornConfig = rules => [
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/better-regex': 'warn',
      ...rules
    }
  }
]

// @ts-check

import eslintPluginUnicorn from 'eslint-plugin-unicorn'

export const unicornConfig = [
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/better-regex': 'warn'
    }
  }
]

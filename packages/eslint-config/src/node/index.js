// @ts-check

import nodePlugin from 'eslint-plugin-n'

/** @type {import('../eslint-types').ConfigType} */
export const nodeConfig = rules => [
  nodePlugin.configs['flat/recommended'],
  {
    rules: {
      'n/exports-style': ['error', 'module.exports'],
      ...rules
    }
  }
]

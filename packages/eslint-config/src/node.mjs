// @ts-check

import nodePlugin from 'eslint-plugin-n'

/** @type {import('./eslint-types').ConfigType} */
export const nodeConfig = rules => [
  nodePlugin.configs['flat/recommended'],
  {
    settings: {
      node: {
        version: '>=18.20.0'
      }
    },
    rules: {
      'n/exports-style': ['error', 'module.exports'],
      'n/no-unpublished-import': ['warn', { allowModules: ['eslint-config'] }],
      ...rules
    }
  }
]

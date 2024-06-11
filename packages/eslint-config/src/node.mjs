// @ts-check

import nodePlugin from 'eslint-plugin-n'

export const nodeConfig = [
  nodePlugin.configs['flat/recommended'],
  {
    rules: {
      'n/exports-style': ['error', 'module.exports']
    }
  }
]

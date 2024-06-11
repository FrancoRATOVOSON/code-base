// @ts-check

import json from 'eslint-plugin-json'

export const jsonConfig = [
  {
    files: ['**/*.json'],
    ...json.configs.recommended
  }
]

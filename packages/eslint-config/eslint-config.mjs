// @ts-check

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import path from 'node:path'
import url from 'node:url'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: path.dirname(url.fileURLToPath(import.meta.url))
})

/** @type {import("./types").CreateCustomGroupsFunction} */
export const createCustomGroups = (params)  => {
  /** @type {import("./types").CustomImportGroup} */
  const groups = { list: [], values: {}, types: {} }
  for (const [key, value] of Object.entries(params.groups)) {
    groups.list.push(key)
    groups.values[key] = value
    groups.types[key] = value
  }

  return { groups, internals: params.internals }
}

/** @type {import("./types").PerfectionnistConfig} */
export const perfectionistConfig = ({ groups = { list: [], types: {}, values: {} }, internals = [] }) => {
  return {
      plugins: {
        perfectionist
      },
      rules: {
        'perfectionist/sort-classes': [
          'warn',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'index-signature',
              'static-property',
              'private-property',
              'property',
              'constructor',
              'static-method',
              'private-method',
              'method'
            ]
          }
        ],
        'perfectionist/sort-interfaces': [
          'warn',
          {
            type: 'natural',
            order: 'asc'
          }
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'type',
              ...groups.list,
              ['builtin', 'external'],
              'internal-type',
              'internal',
              ['parent-type', 'sibling-type', 'index-type'],
              ['parent', 'sibling', 'index'],
              'side-effect',
              'style',
              'object',
              'unknown'
            ],
            'custom-groups': {
              value: {
                ...groups.values
              },
              type: {
                ...groups.types
              }
            },
            'newlines-between': 'always',
            'internal-pattern': [...internals]
          }
        ]
      }
    }
}

/** @type {import("./types").CreateConfigFunction} */
export const createConfig = (...rules)  => {
  return tseslint.config(
    eslint.configs.recommended,
    ...compat.extends('eslint-config-standard'),
    ...tseslint.configs.recommended,
    ...rules,
    eslintPluginPrettierRecommended,
    {
      rules: {
        'prettier/prettier': 'warn'
      }
    }
  )
}

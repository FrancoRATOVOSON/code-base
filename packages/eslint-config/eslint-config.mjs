// @ts-check

/**
 * @typedef {Object.<string,string[]>} CustomGroupObject
 */

/**
 * @typedef {object} CustomImportConfig
 * @property {CustomGroupObject} groups
 * @property {string[]} internals
 */

/**
 * @typedef {object} CustomImportGroup
 * @property {string[]} list
 * @property {Object.<string,string[]>} values
 * @property {Object.<string,string[]>} types
 */

/**
 * @typedef {object} CustomConfigParams
 * @property {string[]} internals
 * @property {CustomImportGroup} groups
 */

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

/**
 *
 * @param {CustomImportConfig} params
 * @returns {CustomConfigParams}
 */
export function createCustomGroups(params) {
  /** @type {CustomImportGroup} */
  const groups = { list: [], values: {}, types: {} }
  for (const [key, value] of Object.entries(params.groups)) {
    groups.list.push(key)
    groups.values[key] = value
    groups.types[key] = value
  }

  return { groups, internals: params.internals }
}

/**
 *
 * @param {CustomConfigParams} params
 * @returns
 */
export function createConfig({ groups = { list: [], types: {}, values: {} }, internals = [] }) {
  return tseslint.config(
    eslint.configs.recommended,
    ...compat.extends('eslint-config-standard'),
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
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
          'warn',
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
    },
    {
      rules: {
        'prettier/prettier': 'warn'
      }
    }
  )
}

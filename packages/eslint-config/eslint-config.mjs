// @ts-check

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import path from 'node:path'
import url from 'node:url'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: path.dirname(url.fileURLToPath(import.meta.url))
})

/** @type {import("./types").CreateConfigFunction} */
export const createConfig = (...rules) => {
  return tseslint.config(
    eslint.configs.recommended,
    ...compat.extends('eslint-config-standard'),
    ...tseslint.configs.recommended,
    ...rules,
    // {
    //   files: ['**/*.js', '**/*.mjs', '**/*.cjs', 'eslint.config.mjs'],
    //   ...tseslint.configs.disableTypeChecked
    // },
    eslintPluginPrettierRecommended,
    {
      rules: {
        'prettier/prettier': 'warn'
      }
    }
  )
}

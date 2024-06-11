// @ts-check

import { FlatCompat } from '@eslint/eslintrc'

import path from 'node:path'
import url from 'node:url'

const compat = new FlatCompat({
  baseDirectory: path.dirname(url.fileURLToPath(import.meta.url))
})

export const standardConfig = [...compat.extends('eslint-config-standard')]

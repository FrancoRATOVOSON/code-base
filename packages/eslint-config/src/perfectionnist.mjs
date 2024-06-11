// @ts-check

import perfectionist from 'eslint-plugin-perfectionist'

/** @type {import("../types").CreateCustomGroupsFunction} */
export const createCustomGroups = params => {
  /** @type {import("../types").CustomImportGroup} */
  const groups = { list: [], values: {}, types: {} }
  for (const [key, value] of Object.entries(params.groups)) {
    groups.list.push(key)
    groups.values[key] = value
    groups.types[key] = value
  }

  return { groups, internals: params.internals }
}

/** @type {import("../types").PerfectionnistConfig} */
export const perfectionistConfig = ({
  groups = { list: [], types: {}, values: {} },
  internals = []
}) => {
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

// ts-check

import {
  createCustomGroups,
  createConfig,
  perfectionistConfig,
  functionalConfig,
  jsonConfig,
  nodeConfig,
  securityConfig,
  unicornConfig
} from 'eslint-config'

const customConfig = createCustomGroups({
  groups: {
    fastify: ['fastify'],
    fastifyPlugins: ['@fastify/*'],
    fastifyCustom: ['fastify-*']
  },
  internals: ['#/**', '#utils/**']
})

const perfectionist = perfectionistConfig(customConfig)
const node = nodeConfig({
  'n/no-missing-import': ['off']
})

const unicorn = unicornConfig({
  'unicorn/prevent-abbreviations': [
    'warn',
    {
      allowList: {
        env: true,
        lib: true,
        params: true,
        Params: true
      }
    }
  ]
})

const functional = functionalConfig()

export default createConfig(
  perfectionist,
  ...functional,
  ...jsonConfig,
  ...node,
  ...securityConfig,
  ...unicorn,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
)

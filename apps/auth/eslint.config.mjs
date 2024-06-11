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
  internals: ['#/**', '#utils/**', '#env']
})

const perfectionist = perfectionistConfig(customConfig)
const node = nodeConfig()

export default createConfig(
  perfectionist,
  ...functionalConfig,
  ...jsonConfig,
  ...node,
  ...securityConfig,
  ...unicornConfig
)

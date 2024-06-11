// ts-check

import { createCustomGroups, createConfig, perfectionistConfig } from 'eslint-config'

const customConfig = createCustomGroups({
  groups: {
    fastify: ['fastify'],
    fastifyPlugins: ['@fastify/*'],
    fastifyCustom: ['fastify-*']
  },
  internals: ['#/**', '#utils/**', '#env']
})

const perfectionist = perfectionistConfig(customConfig)

export default createConfig(perfectionist)

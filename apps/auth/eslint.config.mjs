// ts-check

import { createCustomGroups, createConfig } from 'eslint-config'

const customConfig = createCustomGroups({
  groups: {
    fastify: ['fastify'],
    fastifyPlugins: ['@fastify/*'],
    fastifyCustom: ['fastify-*']
  },
  internals: ['#/**', '#utils/**', '#env']
})

export default createConfig(customConfig)

// ts-check

import { createCustomGroups, createConfig, perfectionistConfig } from './index.mjs'

const customConfig = createCustomGroups({
  groups: {},
  internals: []
})

const perfectionist = perfectionistConfig(customConfig)

export default createConfig(perfectionist)

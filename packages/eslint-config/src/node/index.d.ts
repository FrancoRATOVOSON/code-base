import { ConfigRuleType } from '../eslint-types'

type NodeConfig = (rules: ConfigRuleType) => FlatConfig.ConfigArray

export const nodeConfig: NodeConfig

export type EslintRuleLevel = 'error' | 'warn' | 'off'

export type EslintRule = [EslintRuleLevel, ...unknown[]]

export type ConfigRuleType = {
  [rule: string]: EslintRule
}

export type ConfigType = (rules: ConfigRuleType = {}) => FlatConfig.ConfigArray

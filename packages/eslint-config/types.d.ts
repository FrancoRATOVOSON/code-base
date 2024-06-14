import { Linter } from 'eslint'

import { ConfigType } from './src/eslint-types'

export type CustomGroupObject = {
  [x: string]: string[]
}

export type CustomImportConfig = {
  groups: CustomGroupObject
  internals: string[]
}

export type CustomImportGroup = {
  list: string[]
  values: {
    [x: string]: string[]
  }
  types: {
    [x: string]: string[]
  }
}

export type CustomGroupsParams = {
  internals: string[]
  groups: CustomImportGroup
}

export type ExtendedConfigs = Linter.FlatConfig<Linter.RulesRecord>

export type CreateCustomGroupsFunction = (
  params: CustomImportConfig
) => CustomGroups

export type CreateConfigFunction = (
  ...params: ExtendedConfigs[]
) => FlatConfig.ConfigArray

export type PerfectionnistConfig = (
  params: CustomGroupsParams
) => FlatConfig.ConfigArray

export const createCustomGroups: CreateCustomGroupsFunction
export const perfectionistConfig: PerfectionnistConfig
export const createConfig: CreateConfigFunction

export const nodeConfig: ConfigType
export const unicornConfig: ConfigType
export const functionalConfig: ConfigType

export const jsonConfig: FlatConfig.ConfigArray
export const securityConfig: FlatConfig.ConfigArray
export const tailwindConfig: FlatConfig.ConfigArray

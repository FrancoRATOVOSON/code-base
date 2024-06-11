import { Linter } from 'eslint'

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

export type CreateCustomGroupsFunction = (params:CustomImportConfig) => CustomGroups

export type CreateConfigFunction = (...params:ExtendedConfigs[]) => FlatConfig.ConfigArray

export type PerfectionnistConfig = (params:CustomGroupsParams) => FlatConfig.Config

export const createCustomGroups:CreateCustomGroupsFunction
export const perfectionistConfig:PerfectionnistConfig
export const createConfig:CreateConfigFunction

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

export type CustomConfigParams = {
  internals: string[]
  groups: CustomImportGroup
}

export function createCustomGroups(params: CustomImportConfig): CustomConfigParams

export function createConfig({ groups, internals }: CustomConfigParams): FlatConfig.ConfigArray

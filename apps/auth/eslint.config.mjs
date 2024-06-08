import configBase from '../../eslint.config.mjs'
import tseslint from 'typescript-eslint'

export default tseslint.config(...configBase, {
  rules: {
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }]
  }
})

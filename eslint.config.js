import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['node_modules', 'dist'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat['recommended'],
      reactHooks.configs['recommended-latest'],
      jsxA11y.flatConfigs.recommended
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    settings: { react: { version: '18.2' } },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
])

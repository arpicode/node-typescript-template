import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import vitest from '@vitest/eslint-plugin'
import jsdoc from 'eslint-plugin-jsdoc'

export default [
  jsdoc.configs['flat/recommended-typescript'],
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    // General rules to all files
    {
      ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**'],
    },
    // TypeScript-specific rules
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': [
          'warn',
          {
            allowBitwiseExpressions: true,
          },
        ],
      },
    },
    // JSDoc-specific rules
    {
      rules: {
        'jsdoc/require-hyphen-before-param-description': 'warn',
      },
    },
    // Vitest-specific configuration for test files
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      plugins: {
        vitest,
      },
      rules: {
        ...vitest.configs.recommended.rules,
      },
      languageOptions: {
        globals: {
          ...vitest.environments.env.globals,
        },
      },
    }
  ),
]

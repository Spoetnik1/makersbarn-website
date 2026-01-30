import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'

export default [
  { ignores: ['.next/**', 'node_modules/**', 'eslint.config.js'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // ============================================
  // Type-checked TypeScript rules
  // ============================================
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // -- Type safety: prevent `any` leaking through code --
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // -- Promise handling --
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // -- AI anti-slop: force proper typing instead of @ts-ignore --
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          'ts-expect-error': 'allow-with-description',
          minimumDescriptionLength: 10,
        },
      ],
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-require-imports': 'error',

      // -- Security: type-aware eval prevention --
      '@typescript-eslint/no-implied-eval': 'error',

      // -- SOLID: single responsibility signals --
      'max-params': ['warn', 4],
      'max-classes-per-file': ['warn', 1],
    },
  },

  // ============================================
  // General code quality & import hygiene
  // ============================================
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    plugins: {
      'import-x': importX,
    },
    rules: {
      // -- Code quality: prevent AI god-functions --
      complexity: ['warn', 15],
      'max-lines-per-function': [
        'warn',
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      'max-depth': ['warn', 4],
      'no-nested-ternary': 'error',
      'no-else-return': 'warn',
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],

      // -- Consistency --
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',

      // -- Security: baseline eval prevention --
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // -- Prevent hallucinated globals --
      'no-restricted-globals': ['error', 'event', 'fdescribe'],

      // -- Import hygiene --
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
        },
      ],
      'import-x/no-duplicates': 'error',
    },
  },
]

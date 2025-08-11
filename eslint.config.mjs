/** @type {import('eslint').Linter.FlatConfig[]} */
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import vitest from 'eslint-plugin-vitest';

export default [
  { ignores: ['dist/**'] },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },

  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.vitest, 
      },
    },
  },

  prettier,
];

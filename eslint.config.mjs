import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import * as pluginImportResolverTs from 'eslint-import-resolver-typescript';
import pluginNoRelativeImport from 'eslint-plugin-no-relative-import-paths';
import pluginTailwind from 'eslint-plugin-tailwindcss';
import pluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import typescriptEslint from 'typescript-eslint';
import eslint from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default typescriptEslint.config(
  {
    ignores: ['node_modules', '**/out/', '**/next-env.d.ts', '.next'],
  },
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.amd,
      },
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },

      'react': {
        version: 'detect',
      },
    },
  },
  {
    extends: [...typescriptEslint.configs.strictTypeChecked],
    files: ['**/*.ts?(x)'],
  },
  {
    plugins: {
      '@next/next': pluginNext,
      '@typescript-eslint': typescriptEslint.plugin,
      'importResolverTs': pluginImportResolverTs,
      'no-relative-import-paths': pluginNoRelativeImport,
      'typescript-sort-keys': pluginTypescriptSortKeys,
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true,
        },
      ],
    },
  },
  {
    // TODO: enable these rules
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  ...pluginTailwind.configs['flat/recommended'],

  {
    files: ['**/*.js?(x)'],

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  /*
  Prettier plugin must be the last item
  https://github.com/prettier/eslint-plugin-prettier/blob/b307125faeb58b6dbfd5d8812b2dffcfdc8358df/README.md#configuration-new-eslintconfigjs
  */
  pluginPrettier
);

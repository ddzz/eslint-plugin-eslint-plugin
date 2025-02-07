'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'script',
  },
  extends: [
    'not-an-aardvark/node',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'never', // disallow trailing commas in function(es2017)
      },
    ],
    'require-jsdoc': 'error',

    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      // Apply eslint-plugin rules to our own rules/tests (but not docs).
      files: ['lib/**/*.js', 'tests/**/*.js'],
      extends: ['plugin:eslint-plugin/all'],
      rules: {
        'eslint-plugin/report-message-format': ['error', '^[^a-z].*.$'],
        'eslint-plugin/require-meta-docs-url': [
          'error',
          {
            pattern:
              'https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/tree/HEAD/docs/rules/{{name}}.md',
          },
        ],
      },
    },
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      // Markdown JS code samples in documentation:
      files: ['**/*.md/*.js'],
      plugins: ['markdown'],
      noInlineConfig: true,
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        strict: 'off',

        'unicorn/filename-case': 'off',
      },
    },
  ],
};

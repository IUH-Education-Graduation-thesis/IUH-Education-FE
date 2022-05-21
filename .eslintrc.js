/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'], // <<<< Important
    },
    ecmaFeatures: {
      jsx: true,
      modules: true,
      legacyDecorators: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier', '@babel'],
  rules: {
    'template-curly-spacing': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-unused-expressions': 'off',

    '@babel/new-cap': 1,
    '@babel/no-invalid-this': 1,
    '@babel/object-curly-spacing': 1,
    '@babel/semi': 1,
    '@babel/no-unused-expressions': 1,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};

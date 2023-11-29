module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    semi: [2, 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
  },
};

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  extends: ["plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
        requireConfigFile: false,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: [2, "always"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};

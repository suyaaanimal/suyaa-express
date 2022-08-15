module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    // 'plugin:import/recommended',
    // 'plugin:import/typescript',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  "ignorePatterns": ["dist/**"],
}
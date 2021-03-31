module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'kagura',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-undef': [0],
  },
}

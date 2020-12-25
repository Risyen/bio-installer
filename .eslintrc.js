module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // extends: 'eslint:recommended',
  extends: 'kagura',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-undef': [0],
  },
}

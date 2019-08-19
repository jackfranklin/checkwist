module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: ['unobtrusive', 'unobtrusive/react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/no-unescaped-entities': 'error',

    // we want to enforce proptypes in all components
    'react/prop-types': 'warn',

    // this bug is a show stopper for us: https://github.com/yannickcr/eslint-plugin-react/issues/1389
    'react/no-typos': 'off',
  },
}

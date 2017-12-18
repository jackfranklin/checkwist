module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier', 'flowtype'],
  extends: [
    'unobtrusive',
    'unobtrusive/import',
    'unobtrusive/react',
    'prettier',
    'plugin:flowtype/recommended',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'react/no-unescaped-entities': 'error',

    // don't think this is an issue and happens a lot
    // with Redux connected components
    'import/no-named-as-default': 'off',

    // we want to enforce proptypes in all components
    'react/prop-types': 'warn',

    // this bug is a show stopper for us: https://github.com/yannickcr/eslint-plugin-react/issues/1389
    'react/no-typos': 'off',
  },
}

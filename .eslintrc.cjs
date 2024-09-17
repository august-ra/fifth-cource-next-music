module.exports = {
  root: true,
  env: { 'browser': true, 'es2020': true },
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [ 'dist', '.eslintrc.cjs' ],
  parser: '@typescript-eslint/parser',
  parserOptions: { 'ecmaVersion': 'latest', 'sourceType': 'module' },
  settings: { 'react': { 'version': '18.2' } },
  plugins: [
    '@stylistic/js',
    'react-refresh',
  ],
  rules: {
    '@stylistic/js/arrow-parens': [ 'error', 'always' ],
    '@stylistic/js/arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    '@stylistic/js/comma-dangle': [ 'error', 'always-multiline' ],
    '@stylistic/js/function-call-spacing': [ 'error', 'never' ],
    '@stylistic/js/indent': [ 'error', 2, { 'SwitchCase': 1, 'ignoredNodes': [
      'JSXElement',
      'JSXOpeningElement',
      'JSXClosingElement',
    ] } ],
    '@stylistic/js/key-spacing': [ 'error', { 'align': 'value' } ],
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/object-curly-spacing': [ 'error', 'always' ],
    '@stylistic/js/operator-linebreak': [ 'error', 'before', {
      'overrides': {
        '=': 'ignore',
        '+=': 'ignore',
        '-=': 'ignore',
        '*=': 'ignore',
        '/=': 'ignore',
        '%=': 'ignore',
      }
    } ],
    '@stylistic/js/rest-spread-spacing': [ 'error', 'never' ],
    '@stylistic/js/semi': [ 'error', 'never', { 'beforeStatementContinuationChars': 'never' } ],
    'react/jsx-closing-bracket-location': [ 1, 'after-props' ],
    'react/jsx-first-prop-new-line': [ 'error', 'never' ],
    'react/jsx-indent-props': [ 'error', 'first' ],
    'react/jsx-no-target-blank': 'off',
    'react/jsx-tag-spacing': [ 'error', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'always',
      'afterOpening': 'never',
      'beforeClosing': 'never',
    } ],
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [ 'warn', { 'allowConstantExport': true } ],
  },
}

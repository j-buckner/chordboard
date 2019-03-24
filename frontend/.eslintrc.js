module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': 'off',
    'import/extensions': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-plusplus': 'off',
  },
};

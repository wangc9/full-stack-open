module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-unused-vars': 0,
    'no-shadow': 0,
    'react/jsx-no-undef': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'object-shorthand': 0,
    'react/destructuring-assignment': 0,
    'no-else-return': 0,
    'react/forbid-prop-types': 0,
    'no-undef': 0,
  },
};

module.exports = {
  extends: ['airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'space-before-function-paren': ['off', 'always'],
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/space-before-function-paren': ['error'],
    'object-curly-newline': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'space-before-function-paren': 'off',
    'linebreak-style': 'off',
    indent: 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': ['off', 'always'],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/indent': [
      'warn',
      2,
      {
        ignoredNodes: ['JSXElement *', 'JSXElement'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-tabs': [
      'error',
      {
        allowIndentationTabs: true,
      },
    ],
    'class-methods-use-this': [0],
    'consistent-return': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./client'],
        moduleDirectory: ['client/', 'server/'],
      },
    },
  },
};

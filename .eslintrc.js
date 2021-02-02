module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react'
    ],
    parserOptions: {
      ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
      sourceType: 'module',  // Allows for the use of imports
      ecmaFeatures: {
        jsx: true  // Allows for the parsing of JSX
      }
    },
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      'eqeqeq': 0,
      'no-tabs': 0,
      'eol-last': 0,
      'indent': ['error', 'tab'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'padding-line-between-statements': [2,
        // Always require blank lines after directive (like "use-strict"), except between directives
        { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
        { 'blankLine': 'any', 'prev': 'directive', 'next': 'directive' },
        // Always require blank lines after import, except between imports
        { 'blankLine': 'always', 'prev': 'import', 'next': '*' },
        { 'blankLine': 'any', 'prev': 'import', 'next': 'import' },
        // Always require blank lines before and after every sequence of variable declarations and export
        { 'blankLine': 'always', 'prev': '*', 'next': ['const', 'let', 'var', 'export'] },
        { 'blankLine': 'always', 'prev': ['const', 'let', 'var', 'export'], 'next': '*' },
        { 'blankLine': 'any', 'prev': ['const', 'let', 'var', 'export'], 'next': ['const', 'let', 'var', 'export'] },
        // Always require blank lines before and after class declaration, if, do/while, switch, try
        { 'blankLine': 'always', 'prev': '*', 'next': ['if', 'class', 'for', 'do', 'while', 'switch', 'try'] },
        { 'blankLine': 'always', 'prev': ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], 'next': '*' },
        // Always require blank lines before return statements
        { 'blankLine': 'always', 'prev': '*', 'next': 'return' }
      ],
      'standard/no-callback-literal': 0,
      'jsx-quotes': ["error", "prefer-double"],
      "@typescript-eslint/explicit-module-boundary-types": ["error"],
      "@typescript-eslint/no-explicit-any": "off"
    },
    settings: {
      react: {
        version: 'detect'  // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    }
  };
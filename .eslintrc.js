module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [`plugin:react/recommended`, `airbnb`],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: `latest`,
    sourceType: `module`,
  },
  plugins: [`react`, `@typescript-eslint`, `react-hooks`],
  rules: {
    quotes: [`error`, `backtick`],
    "react/jsx-filename-extension": [
      2,
      { extensions: [`.js`, `.jsx`, `.ts`, `.tsx`] },
    ],
    "import/extensions": [`error`, `never`],

    "react-hooks/rules-of-hooks": `error`, // Checks rules of Hooks
    "react-hooks/exhaustive-deps": `warn`, // Checks effect dependencies
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};

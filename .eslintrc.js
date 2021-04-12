const restrictedGlobals = require("confusing-browser-globals");

/* eslint-disable fp/no-mutation */
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
/* eslint-enable fp/no-mutation */

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "prettier",
    "import",
    "fp",
    "ramda",
    "eslint-comments",
    "no-only-tests",
    "sonarjs",
    "filenames",
    "no-switch-statements",
    "react",
    "react-hooks",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:fp/recommended",
    "plugin:ramda/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    curly: ["error", "all"],
    "eslint-comments/no-unused-disable": "error",
    "filenames/match-exported": "error",
    "fp/no-class": "off",
    "fp/no-mutating-methods": [
      "error",
      {
        allowedObjects: ["R"],
      },
    ],
    "fp/no-mutation": [
      "error",
      {
        allowThis: true,
        commonjs: true,
        exceptions: [{ property: "fragments" }],
      },
    ],
    "fp/no-nil": "off",
    "fp/no-rest-parameters": "off",
    "fp/no-this": "off",
    "fp/no-unused-expression": "off",
    "import/no-unresolved": [
      "error",
      {
        caseSensitive: true,
        commonjs: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
      },
    ],
    "max-lines": ["error", 1000],
    "max-lines-per-function": ["error", 200],
    "max-params": ["error", 7],
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-caller": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-empty": "error",
    "no-implicit-coercion": "error",
    "no-nested-ternary": "error",
    "no-only-tests/no-only-tests": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-switch-statements/no-switch": "error",
    "no-undefined": "off",
    "no-unused-expressions": "error",
    "no-useless-catch": "error",
    "no-void": "error",
    "prettier/prettier": "error",
    "require-await": "error",
    "sonarjs/no-duplicate-string": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "sonarjs/cognitive-complexity": ["error", 16],
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": ["error", { args: "none" }],
    "react/display-name": "off",
    "react/prop-types": "off", // TODO: enable this
    "no-template-curly-in-string": "error",
    "no-sparse-arrays": "off",
    "no-undef": "off",
    "no-useless-computed-key": "error",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    eqeqeq: "error",
  },
  overrides: [
    {
      files: ["*.test.{ts,tsx}", "*.stories.{ts,tsx}"],
      rules: {
        "fp/no-let": "off",
        "fp/no-mutation": "off",
        "max-lines-per-function": "off",
      },
    },
    {
      files: ["scripts/**/*.js", "config/**/*.js"],
      rules: {
        "max-lines-per-function": "off",
        "no-console": "off",
      },
    },
    {
      files: ["**/models/**", "**/lib/**"],
      rules: {
        "filenames/match-exported": ["error", "dot"],
      },
    },
    {
      files: ["src/types/apollo.ts"],
      rules: {
        "max-lines": "off",
        "no-use-before-define": "off",
        "no-unused-vars": "off",
        "no-shadow": "off",
      },
    },
    {
      files: ["src/types/graphqlFileModules.d.ts"],
      rules: {
        "import/order": "off",
        "import/no-duplicates": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    __DEV__: "readonly",
  },
};

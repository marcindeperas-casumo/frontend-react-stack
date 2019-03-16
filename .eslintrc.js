// preset-react app requires you to have one of those set
/* eslint-disable fp/no-mutation */
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
/* eslint-enable fp/no-mutation */

module.exports = {
  parser: "babel-eslint",
  plugins: [
    "prettier",
    "import",
    "flowtype",
    "fp",
    "ramda",
    "eslint-comments",
    "no-only-tests",
    "sonarjs",
  ],
  extends: [
    "react-app",
    "prettier",
    "plugin:flowtype/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:fp/recommended",
    "plugin:ramda/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    "fp/no-class": "off",
    "fp/no-nil": "off",
    "fp/no-rest-parameters": "off",
    "fp/no-this": "off",
    "fp/no-unused-expression": "off",
    "fp/no-mutation": [
      "error",
      {
        commonjs: true,
        allowThis: true,
        exceptions: [{ property: "fragments" }],
      },
    ],
    "fp/no-mutating-methods": [
      "error",
      {
        allowedObjects: ["R"],
      },
    ],
    "prettier/prettier": "error",
    "import/no-unresolved": [
      "error",
      {
        commonjs: true,
        caseSensitive: true,
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
    curly: ["error", "all"],
    "eslint-comments/no-unused-disable": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-alert": "error",
    "no-useless-catch": "error",
    "no-caller": "error",
    "no-delete-var": "error",
    "no-implicit-coercion": "error",
    "no-void": "error",
    "no-array-constructor": "error",
    "no-sequences": "error",
    "no-only-tests/no-only-tests": "error",
  },
  overrides: [
    {
      files: ["*.test.js", "*.stories.js"],
      rules: {
        "fp/no-let": "off",
        "fp/no-mutation": "off",
        "sonarjs/no-duplicate-string": "off",
      },
    },
    {
      files: ["scripts/**/*.js", "config/**/*.js"],
      rules: {
        "no-console": "off",
        "sonarjs/no-duplicate-string": "off",
      },
    },
    {
      files: ["*.reducer.js"],
      rules: {
        "sonarjs/no-small-switch": "off",
      },
    },
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
    react: {
      version: "detect",
    },
    "import/resolver": {
      "babel-module": {},
    },
  },
};

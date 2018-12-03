const path = require("path");

module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier", "import", "flowtype", "fp", "ramda"],
  extends: [
    "react-app",
    "prettier",
    "plugin:flowtype/recommended",
    "plugin:flowtype/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:fp/recommended",
    "plugin:ramda/recommended",
  ],
  rules: {
    "fp/no-arguments": "error",
    "fp/no-class": "off",
    "fp/no-loops": "error",
    "fp/no-mutating-assign": "error",
    "fp/no-mutating-methods": "error",
    "fp/no-nil": "off",
    "fp/no-this": "off",
    "fp/no-valueof-field": "error",
    "prettier/prettier": "error",
    "no-implicit-coercion": "error",
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "fp/no-let": "off",
        "fp/no-unused-expression": "off",
      },
    },
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
    "import/resolver": {
      webpack: {
        config: path.resolve("./config/webpack.config.dev.js"),
      },
    },
  },
};

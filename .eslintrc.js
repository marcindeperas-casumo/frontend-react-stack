const path = require("path");

module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier", "import", "flowtype", "fp", "ramda"],
  extends: [
    "react-app",
    "prettier",
    "plugin:flowtype/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:fp/recommended",
    "plugin:ramda/recommended",
  ],
  rules: {
    "fp/no-class": "off",
    "fp/no-nil": "off",
    "fp/no-rest-parameters": "off",
    "fp/no-this": "off",
    "fp/no-unused-expression": "off",
    "prettier/prettier": "error",
    'import/no-unresolved': [
        'error',
        {
            commonjs: true,
            caseSensitive: true,
        },
    ],
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "fp/no-let": "off",
        "fp/no-mutation": "off",
      },
    },
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
    react: {
      version: "detect"
    },
    "import/resolver": {
      "babel-module": {}
    }
  }
};

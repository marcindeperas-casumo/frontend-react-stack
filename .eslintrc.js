const path = require("path");

module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier", "import", "flowtype"],
  extends: [
    "react-app",
    "prettier",
    "plugin:flowtype/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  rules: {
    "prettier/prettier": "error",
  },
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

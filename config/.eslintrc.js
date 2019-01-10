module.exports = {
  rules: {
    "fp/no-throw": "off",
    "fp/no-delete": "off",
    "fp/no-mutation": [
      "error",
      {
        commonjs: true,
        exceptions: [{ object: "process", property: "env" }],
      },
    ],
    "fp/no-mutating-methods": [
      "error",
      {
        allowedObjects: ["loaders"],
      },
    ],
    strict: "off",
  },
};

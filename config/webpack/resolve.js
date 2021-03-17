const path = require("path");
const { ROOT } = require("./utils");

module.exports = (env, brand) => ({
  modules: ["node_modules"],
  alias: {
    Styles: path.resolve(ROOT, "src/styles"),
  },
  extensions: [
    `.${brand}.jsx`,
    `.${brand}.js`,
    ".jsx",
    ".js",
    `.${brand}.tsx`,
    `.${brand}.ts`,
    ".tsx",
    ".ts",
  ],
});

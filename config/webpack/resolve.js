const path = require("path");
const { ROOT } = require("./utils");

module.exports = (env, brand) => ({
  modules: ["node_modules"],
  alias: {
    Styles: path.resolve(ROOT, "src/styles"),
    ...(env.development ? { "react-dom": "@hot-loader/react-dom" } : {}),
  },
  extensions: [`.${brand}.jsx`, `.${brand}.js`, ".jsx", ".js"],
});

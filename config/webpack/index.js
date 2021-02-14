const path = require("path");
const { ROOT, STATIC_DIR } = require("./utils");

const brand = process.env.APP_BRAND;

module.exports = env => {
  const plugins = require("./plugins")(env);
  const module = require("./module")(env);
  const optimization = require("./optimization")(env);
  const resolve = require("./resolve")(env, brand, ROOT);

  return {
    mode: env.production ? "production" : "development",
    entry: path.resolve(ROOT, brand ? `src/index.${brand}.js` : "src/index.js"),
    devtool: env.development ? "cheap-module-source-map" : false,
    resolve,
    output: {
      path: env.production ? path.resolve(ROOT, "build") : undefined,
      pathinfo: env.development,
      filename: `${STATIC_DIR}/js/[name].[${
        env.production ? "contenthash" : "hash"
      }].js`,
      publicPath: "/",
    },
    optimization,
    module,
    plugins,
  };
};

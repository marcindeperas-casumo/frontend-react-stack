const path = require("path");
const { ROOT, STATIC_DIR } = require("./utils");

module.exports = env => {
  const plugins = require("./plugins")(env);
  const module = require("./module")(env);
  const optimization = require("./optimization")(env);

  return {
    mode: env.production ? "production" : "development",
    entry: path.resolve(ROOT, "src/index.js"),
    devtool: env.development ? "cheap-module-source-map" : false,
    resolve: {
      modules: ["node_modules"],
      alias: {
        Styles: path.resolve(ROOT, "src/styles"),
        ...(env.development ? { "react-dom": "@hot-loader/react-dom" } : {}),
      },
    },
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

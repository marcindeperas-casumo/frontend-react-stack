const path = require("path");

const ROOT = path.resolve(__dirname, "../../");
const buildPath = path.resolve(ROOT, "build");

module.exports = env => {
  const plugins = require("./plugins")(env, ROOT);
  const module = require("./module")(env, ROOT);
  const optimization = require("./optimization")(env);

  return {
    mode: env.production ? "production" : "development",
    entry: path.resolve(ROOT, "src/index.js"),
    devtool: env.production ? "source-map" : "cheap-module-source-map",
    resolve: {
      modules: ["node_modules"],
      alias: {
        Styles: path.resolve(ROOT, "src/styles"),
      },
    },
    output: {
      path: buildPath,
      filename: `${env.staticDir}/js/[name].[${
        env.production ? "contenthash" : "hash"
      }].js`,
      publicPath: path.resolve(ROOT, "package.json"),
    },
    devServer: {
      contentBase: buildPath,
      port: 3000,
    },
    optimization,
    module,
    plugins,
  };
};

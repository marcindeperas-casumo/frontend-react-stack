const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, ROOT) => [
  new CleanWebpackPlugin(),
  ...(env.production
    ? [
        new MiniCssExtractPlugin({
          filename: `${env.staticDir}/css/[name].[${
            env.production ? "contenthash" : "hash"
          }].css`,
        }),
      ]
    : []),
  new WebpackManifestPlugin({
    fileName: `${env.staticDir}/manifest.json`,
    publicPath: "/",
    filter: x =>
      x.isChunk &&
      !x.name.endsWith(".map") &&
      !x.name.startsWith(env.staticDir),
  }),
  new HtmlWebpackPlugin({
    filename: `index.html`,
    template: path.resolve(ROOT, "src/index.html"),
  }),
  new HtmlWebpackPlugin({
    filename: `${env.staticDir}/event-bubbler.html`,
    template: path.resolve(ROOT, "src/event-bubbler.html"),
    inject: false,
  }),
  new HtmlWebpackPlugin({
    filename: `${env.staticDir}/navigation-bubbler.html`,
    template: path.resolve(ROOT, "src/navigation-bubbler.html"),
    inject: false,
  }),
];

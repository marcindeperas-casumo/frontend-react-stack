const path = require("path");
const { DefinePlugin } = require("webpack");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = (env, ROOT, STATIC_DIR) => {
  return [
    new DefinePlugin({
      __DEV__: Boolean(env.development),
    }),
    ...(env.production
      ? [
          new MiniCssExtractPlugin({
            filename: `${env.production ? STATIC_DIR : "."}/css/[name].[${
              env.production ? "contenthash" : "hash"
            }].css`,
          }),
        ]
      : [new WebpackBar()]),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      fileName: `${STATIC_DIR}/manifest.json`,
      publicPath: env.production ? STATIC_DIR : "/",
      filter: x =>
        x.isChunk && !x.name.endsWith(".map") && !x.name.startsWith(STATIC_DIR),
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(ROOT, "src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: `${env.production ? STATIC_DIR : "."}/event-bubbler.html`,
      template: path.resolve(ROOT, "src/event-bubbler.html"),
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: `${env.production ? STATIC_DIR : "."}/navigation-bubbler.html`,
      template: path.resolve(ROOT, "src/navigation-bubbler.html"),
      inject: false,
    }),
  ];
};

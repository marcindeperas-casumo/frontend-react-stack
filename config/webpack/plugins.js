const path = require("path");
const { DefinePlugin } = require("webpack");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, ROOT) => {
  return [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      __DEV__: Boolean(env.development),
    }),
    ...(env.production
      ? [
          new MiniCssExtractPlugin({
            filename: `${env.production ? "react-stack" : "."}/css/[name].[${
              env.production ? "contenthash" : "hash"
            }].css`,
          }),
        ]
      : []),
    new WebpackManifestPlugin({
      fileName: `${env.production ? "react-stack" : "."}/manifest.json`,
      publicPath: env.production ? "react-stack" : "/",
      filter: x =>
        x.isChunk &&
        !x.name.endsWith(".map") &&
        !x.name.startsWith(env.production ? "react-stack" : "."),
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(ROOT, "src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: `${env.production ? "react-stack" : "."}/event-bubbler.html`,
      template: path.resolve(ROOT, "src/event-bubbler.html"),
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: `${
        env.production ? "react-stack" : "."
      }/navigation-bubbler.html`,
      template: path.resolve(ROOT, "src/navigation-bubbler.html"),
      inject: false,
    }),
  ];
};

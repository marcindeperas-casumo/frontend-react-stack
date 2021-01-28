const path = require("path");
const cudl = require("@casumo/cudl");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const staticFolderName = "react-stack";
const paths = {
  root: path.resolve(__dirname, "./"),
  entry: path.resolve(__dirname, "src/index.js"),
  indexHtml: path.resolve(__dirname, "src/index.html"),
  eventBubblerHtml: path.resolve(__dirname, "src/event-bubbler.html"),
  navigationBubblerHtml: path.resolve(__dirname, "src/navigation-bubbler.html"),
  cudl: path.resolve(__dirname, "src/styles/_tools.cudl.scss"),
  modules: path.resolve(__dirname, "node_modules"),
  styles: path.resolve(__dirname, "src/styles"),
  build: path.resolve(__dirname, "build"),
};

module.exports = env => {
  const fileNamePattern = `[name].[${env.production ? "contenthash" : "hash"}]`;

  return {
    mode: env.production ? "production" : "development",
    entry: paths.entry,
    devtool: env.production ? "source-map" : "cheap-module-source-map",
    resolve: {
      modules: ["node_modules"],
      alias: {
        Styles: paths.styles,
      },
    },
    output: {
      path: paths.build,
      filename: `${staticFolderName}/js/${fileNamePattern}.js`,
      publicPath: env.production ? staticFolderName : "/",
    },
    devServer: {
      contentBase: paths.build,
      port: 3000,
    },
    optimization: {
      moduleIds: env.production ? "hashed" : false,
      splitChunks: {
        chunks: "async",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](?!@formatjs[\\/]intl-relativetimeformat[\\/])/,
            name(module) {
              if (module.context.includes("@casumo")) {
                return "cudl";
              }

              return "vendors";
            },
            chunks: "all",
          },
        },
      },
      minimize: env.production,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx)$/,
              exclude: /node_modules/,
              use: ["babel-loader"],
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                ...(env.production
                  ? [MiniCssExtractPlugin.loader]
                  : [require.resolve("style-loader")]),
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 2,
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve("sass-loader"),
                  options: {
                    sassOptions: {
                      includePaths: cudl,
                    },
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve("sass-resources-loader"),
                  options: {
                    resources: paths.cudl,
                  },
                },
              ],
            },
            {
              test: /\.(graphql|gql)$/,
              loader: require.resolve("graphql-tag/loader"),
              include: paths.root,
            },
            {
              test: /\.svg$/,
              loader: require.resolve("@svgr/webpack"),
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: 10000,
                name: `${staticFolderName}/media/[name].[hash:8].[ext]`,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...(env.production
        ? [
            new MiniCssExtractPlugin({
              filename: `${staticFolderName}/css/${fileNamePattern}.css`,
            }),
          ]
        : []),
      new WebpackManifestPlugin({
        fileName: `${staticFolderName}/manifest.json`,
        publicPath: "/",
        filter: x =>
          x.isChunk &&
          !x.name.endsWith(".map") &&
          !x.name.startsWith(staticFolderName),
      }),
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: paths.indexHtml,
      }),
      new HtmlWebpackPlugin({
        filename: `${staticFolderName}/event-bubbler.html`,
        template: paths.eventBubblerHtml,
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: `${staticFolderName}/navigation-bubbler.html`,
        template: paths.navigationBubblerHtml,
        inject: false,
      }),
    ],
  };
};

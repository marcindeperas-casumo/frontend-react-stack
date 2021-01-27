const path = require("path");
const cudl = require("@casumo/cudl");

const staticFolderName = "react-stack";

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
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
              resources: path.resolve(__dirname, "src/styles/_tools.cudl.scss"),
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        loader: require.resolve("graphql-tag/loader"),
        include: path.resolve(__dirname, "./"),
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
  resolve: {
    modules: [path.resolve("node_modules"), "node_modules"],
    alias: {
      Styles: path.resolve(__dirname, "src/styles"),
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
};

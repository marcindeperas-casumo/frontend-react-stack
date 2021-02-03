const path = require("path");
const cudl = require("@casumo/cudl");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, ROOT) => ({
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
                resources: path.resolve(ROOT, "src/styles/_tools.cudl.scss"),
              },
            },
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          loader: require.resolve("graphql-tag/loader"),
          include: ROOT,
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
            name: `${
              env.production ? "react-stack" : "."
            }/media/[name].[hash:8].[ext]`,
          },
        },
      ],
    },
  ],
});

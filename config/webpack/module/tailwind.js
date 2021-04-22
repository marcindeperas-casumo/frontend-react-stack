const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { shouldUseSourceMap } = require("../utils");

module.exports = env => ({
  test: /\.css$/i,
  use: [
    ...(env.production
      ? [MiniCssExtractPlugin.loader]
      : [require.resolve("style-loader")]),
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 2,
        sourceMap: env.production && shouldUseSourceMap,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: "postcss",
        plugins: () => [
          require("tailwindcss"),
          require("autoprefixer"),
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009",
            },
            stage: 3,
          }),
        ],
        sourceMap: env.production && shouldUseSourceMap,
      },
    },
  ],
});

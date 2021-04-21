const path = require("path");
const cudl = require("@casumo/cudl");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { shouldUseSourceMap, ROOT } = require("../utils");

module.exports = env => ({
  test: /\.scss$/i,
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
    {
      loader: require.resolve("sass-loader"),
      options: {
        sassOptions: {
          includePaths: cudl,
        },
        sourceMap: env.production && shouldUseSourceMap,
        additionalData: (content, loaderContext) => {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);

          if (/src(\/|\\)styles/.test(relativePath)) {
            return null;
          } else if (/src/.test(relativePath)) {
            return `@import "${path
              .resolve(ROOT, "src/styles/_tools.cudl.scss")
              .replace(new RegExp("\\" + path.sep, "g"), "/")}";\n${content}`;
          }

          return null;
        },
      },
    },
  ],
});

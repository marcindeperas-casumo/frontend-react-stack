const path = require("path");
const cudl = require("@casumo/cudl");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { shouldUseSourceMap, ROOT, STATIC_DIR } = require("./utils");

module.exports = env => ({
  rules: [
    {
      oneOf: [
        {
          test: /\.(mjs|js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                plugins: [
                  env.development && require.resolve("react-refresh/babel"),
                ].filter(Boolean),
              },
            },
          ],
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

                  if (/src\/styles/.test(relativePath)) {
                    return null;
                  } else if (/src/.test(relativePath)) {
                    return `@import "${path.resolve(
                      ROOT,
                      "src/styles/_tools.cudl.scss"
                    )}";\n${content}`;
                  }

                  return null;
                },
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
              env.production ? STATIC_DIR : "."
            }/media/[name].[hash:8].[ext]`,
          },
        },
      ],
    },
  ],
});

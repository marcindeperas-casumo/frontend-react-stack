const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test(".svg")
    );
    // eslint-disable-next-line fp/no-mutation
    fileLoaderRule.exclude = /\.svg$/;

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
    });

    // Make whatever fine-grained changes you need
    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: require.resolve("graphql-tag/loader"),
      include: path.resolve(__dirname, "../"),
    });

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve("url-loader"),
      options: {
        limit: 10000,
        name: `./media/[name].[hash:8].[ext]`,
      },
    });

    // eslint-disable-next-line fp/no-mutation
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    // Return the altered config
    return config;
  },
  stories: [
    "../src/**/*.stories2.mdx",
    "../src/**/*.stories2.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
  ],
};

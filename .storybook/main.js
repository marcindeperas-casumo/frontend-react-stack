const path = require("path");
const fs = require("fs");
const { NormalModuleReplacementPlugin } = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const graphqlLoader = require("../config/webpack/module/graphql");
const imagesLoader = require("../config/webpack/module/images");
const sassLoader = require("../config/webpack/module/sass");
const cssLoader = require("../config/webpack/module/tailwind");
const svgLoader = require("../config/webpack/module/svg");
const defineDevModePlugin = require("../config/webpack/plugins/defineDevMode");

const env = { development: true };

module.exports = {
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Removing default svg loader
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test(".svg")
    );
    // eslint-disable-next-line fp/no-mutation
    fileLoaderRule.exclude = /\.svg$/;

    // Removing default css loader
    const cssLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test(".css")
    );
    // eslint-disable-next-line fp/no-mutation
    cssLoaderRule.exclude = /\.css$/;

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push(svgLoader);

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push(sassLoader(env));

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push(cssLoader(env));

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push(graphqlLoader);

    // eslint-disable-next-line fp/no-mutating-methods
    config.module.rules.push(imagesLoader(env));

    // eslint-disable-next-line fp/no-mutation
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Styles"] = path.resolve(__dirname, "../src/styles");

    // eslint-disable-next-line fp/no-mutating-methods
    config.plugins.push(defineDevModePlugin(env));

    // eslint-disable-next-line fp/no-mutating-methods
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /applicationService\/logger/,
        path.resolve(__dirname, "fakeLogger.js")
      )
    );

    // eslint-disable-next-line fp/no-mutating-methods
    config.plugins.push(
      new NormalModuleReplacementPlugin(/\.tsx?$/, resource => {
        if (/__mocks__/.test(resource.request)) {
          return;
        }

        const resPath = resource.request.split("!")[1];
        if (!resPath) {
          return;
        }

        const dirname = path.dirname(resPath);
        const basename = path.basename(resPath);
        const folderMockPath = `${dirname}/__mocks__/${basename}`;

        if (fs.existsSync(folderMockPath)) {
          // eslint-disable-next-line fp/no-mutation
          resource.request = folderMockPath;
        } else {
          return;
        }
        if (resource.resource) {
          // eslint-disable-next-line fp/no-mutation
          resource.resource = resource.request;
        }
      })
    );

    // Return the altered config
    return config;
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
  ],
};

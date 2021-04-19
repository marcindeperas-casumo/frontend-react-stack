const path = require("path");
const fs = require("fs");
const cudl = require("@casumo/cudl");
const { DefinePlugin, NormalModuleReplacementPlugin } = require("webpack");
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
      use: [
        "style-loader",
        "css-loader",
        {
          loader: require.resolve("sass-loader"),
          options: {
            sassOptions: {
              includePaths: cudl,
            },
            sourceMap: false,
            additionalData: (content, loaderContext) => {
              const { resourcePath, rootContext } = loaderContext;
              const relativePath = path.relative(rootContext, resourcePath);

              if (/src\/styles/.test(relativePath)) {
                return null;
              } else if (/src/.test(relativePath)) {
                return `@import "${path.resolve(
                  path.resolve(__dirname, "../"),
                  "src/styles/_tools.cudl.scss"
                )}";\n${content}`;
              }

              return null;
            },
          },
        },
      ],
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

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Styles"] = path.resolve(__dirname, "../src/styles");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Components"] = path.resolve(
      __dirname,
      "../src/components"
    );

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Services"] = path.resolve(
      __dirname,
      "../src/applicationService"
    );

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Models"] = path.resolve(__dirname, "../src/models");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Lib"] = path.resolve(__dirname, "../src/lib");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Utils"] = path.resolve(__dirname, "../src/utils");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Types"] = path.resolve(__dirname, "../src/types");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Src"] = path.resolve(__dirname, "../src");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Api"] = path.resolve(__dirname, "../src/api");

    // eslint-disable-next-line fp/no-mutation
    config.resolve.alias["Storybook"] = path.resolve(
      __dirname,
      "../src/.storybook"
    );

    // eslint-disable-next-line fp/no-mutating-methods
    config.plugins.push(
      new DefinePlugin({
        __DEV__: true,
      })
    );

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

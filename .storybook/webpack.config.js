const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const ourConfig = require("../config/webpack");

module.exports = ({ config, mode }) => {
  const ourDefaultConfig = ourConfig({ development: true });

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === "development",
      }),
      new webpack.NormalModuleReplacementPlugin(
        /applicationService\/logger/,
        path.resolve(__dirname, "fakeLogger.js")
      ),
      new webpack.NormalModuleReplacementPlugin(/\.tsx?$/, resource => {
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
      }),
    ],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...ourDefaultConfig.resolve.alias,
      },
      extensions: ourDefaultConfig.resolve.extensions,
    },
    module: {
      rules: [
        {
          test: [/\.woff$/, /\.woff2$/, /\.css$/],
          loader: require.resolve("file-loader"),
        },
        ...ourDefaultConfig.module.rules,
      ],
    },
  };
};

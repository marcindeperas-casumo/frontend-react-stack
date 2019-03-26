const webpack = require("webpack");
const ourConfig = require("../config/webpack.config");
const getClientEnvironment = require("../config//env");
const env = getClientEnvironment("casumo.com");

module.exports = ({ config, mode }) => {
  const ourDefaultConfig = ourConfig("development", { isStorybook: true });

  return {
    ...config,
    plugins: [...config.plugins, new webpack.DefinePlugin(env.stringified)],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...ourDefaultConfig.resolve.alias,
      },
      extensions: ourDefaultConfig.resolve.extensions,
    },
    /**
     * when i created this baseConfig had 2 loaders (.md &.js) if something
     * broke after update check what's inside `baseConfig.module.rules`
     */
    module: ourDefaultConfig.module,
  };
};

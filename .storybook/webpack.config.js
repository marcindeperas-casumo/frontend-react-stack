const ourConfig = require("../config/webpack.config");

module.exports = ({ config, mode }) => {
  const ourDefaultConfig = ourConfig("development", { isStorybook: true });

  return {
    ...config,
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

const { DefinePlugin } = require("webpack");

module.exports = env =>
  new DefinePlugin({
    __DEV__: Boolean(env.development),
  });

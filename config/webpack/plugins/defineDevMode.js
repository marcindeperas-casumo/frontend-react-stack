const { DefinePlugin } = require("webpack");

module.exports = env =>
  new DefinePlugin({
    __DEV__: Boolean(env.development),
    __CODE_VERSION__: JSON.stringify(process.env.GIT_COMMIT),
  });

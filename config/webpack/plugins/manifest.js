const WebpackManifestPlugin = require("webpack-manifest-plugin");
const { STATIC_DIR } = require("../utils");

module.exports = env =>
  new WebpackManifestPlugin({
    fileName: `${STATIC_DIR}/manifest.json`,
    publicPath: "/",
    filter: x =>
      x.isChunk && !x.name.endsWith(".map") && !x.name.startsWith(STATIC_DIR),
  });

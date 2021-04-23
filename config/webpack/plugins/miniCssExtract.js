const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { STATIC_DIR } = require("../utils");

module.exports = env =>
  new MiniCssExtractPlugin({
    filename: `${STATIC_DIR}/css/[name].[${
      env.production ? "contenthash" : "hash"
    }].css`,
  });

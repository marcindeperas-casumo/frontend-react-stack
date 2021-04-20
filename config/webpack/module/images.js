const { STATIC_DIR } = require("../utils");

module.exports = env => ({
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve("url-loader"),
  options: {
    limit: 10000,
    name: `${env.production ? STATIC_DIR : "."}/media/[name].[hash:8].[ext]`,
  },
});

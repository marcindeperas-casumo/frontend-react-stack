const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ROOT, STATIC_DIR } = require("../utils");

module.exports = env =>
  new HtmlWebpackPlugin({
    filename: `${env.production ? STATIC_DIR : "."}/event-bubbler.html`,
    template: path.resolve(ROOT, "src/event-bubbler.html"),
    inject: false,
  });

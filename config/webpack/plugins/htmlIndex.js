const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ROOT } = require("../utils");

module.exports = new HtmlWebpackPlugin({
  filename: `index.html`,
  template: path.resolve(ROOT, "src/index.html"),
});

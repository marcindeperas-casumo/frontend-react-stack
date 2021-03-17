const path = require("path");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

module.exports = {
  ROOT: path.resolve(__dirname, "../../"),
  STATIC_DIR: "react-stack",
  shouldUseSourceMap,
  sourceMapDevtool: shouldUseSourceMap ? "source-map" : false,
};

const path = require("path");
const cudl = require("@casumo/cudl");
const { mergeDeepRight } = require("ramda");

/* eslint-disable fp/no-mutating-methods */
module.exports = (baseConfig, env) => {
  // Extend defaultConfig as you need.
  baseConfig.module.rules.push({
    test: /\.scss$/,

    loaders: [
      "style-loader",
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader",
        options: {
          includePaths: cudl,
        },
      },
    ],
    include: path.resolve(__dirname, "../"),
  });

  baseConfig.module.rules.push({
    test: /\.svg$/,

    loaders: [
      {
        loader: "@svgr/webpack",
      },
    ],
    include: path.resolve(__dirname, "../"),
  });

  return mergeDeepRight(baseConfig, {
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".json", ".scss"],
      alias: {
        Styles: path.resolve(__dirname, "../src/styles"),
      },
    },
  });
};

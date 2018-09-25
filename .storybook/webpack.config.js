const path = require("path");
const cudl = require("@casumo/cudl");
const moduleAliases = require("../config/moduleAliases");
const { mergeDeepRight } = require("ramda");

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
        loader: "babel-loader",
      },
      {
        loader: "react-svg-loader",
        options: {
          jsx: true, // true outputs JSX tags
        },
      },
    ],
    include: path.resolve(__dirname, "../"),
  });

  return mergeDeepRight(baseConfig, {
    resolve: {
      alias: moduleAliases,
    },
  });
};

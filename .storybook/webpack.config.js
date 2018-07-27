const path = require("path");
const cudl = require("@casumo/cudl");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  defaultConfig.module.rules.push({
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

  return defaultConfig;
};

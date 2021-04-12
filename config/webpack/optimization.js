const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = env => ({
  moduleIds: env.production ? "hashed" : false,
  splitChunks: {
    chunks: "async",
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/](?!@formatjs[\\/]intl-relativetimeformat[\\/])/,
        name(module) {
          if (module.context.includes("@casumo")) {
            return "cudl";
          }

          return "vendors";
        },
        chunks: "all",
      },
    },
  },
  minimize: env.production,
  minimizer: [new CssMinimizerPlugin()],
});

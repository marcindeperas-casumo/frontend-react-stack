module.exports = env => ({
  test: /\.(mjs|js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: require.resolve("babel-loader"),
      options: {
        plugins: [
          env.development && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
      },
    },
  ],
});

const { ROOT } = require("../utils");

module.exports = {
  test: /\.(graphql|gql)$/,
  loader: require.resolve("graphql-tag/loader"),
  include: ROOT,
};

const schema = require("./codegen.apollo.config").client.service.url;

module.exports = {
  // It fetches the schema from the GraphQL Service instance on test.
  // Make sure that you are on the inner network (by using a VPN or connecting to the office network) otherwise it won't work.
  schema,
  documents: [
    {
      "src/**/*.{graphql,js}": null,
      noRequire: true,
    },
    { "!src/types/apollo.js": null },
  ],
  generates: {
    "src/models/apollo/introspections.json": {
      plugins: ["fragment-matcher"],
    },
  },
};

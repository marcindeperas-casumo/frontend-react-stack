const schema = require("./apollo.config").client.service.url;

module.exports = {
  schema,
  documents: [
    {
      "src/**/*.{graphql,js}": null,
      noRequire: true,
    },
  ],
  generates: {
    "src/models/apollo/introspections.json": {
      plugins: ["fragment-matcher"],
    },
  },
};

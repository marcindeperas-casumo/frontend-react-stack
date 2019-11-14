const schema = require("./apollo.config").client.service.url;

module.exports = {
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

const graphqlLoader = require("./graphql");
const svgLoader = require("./svg");
const imagesLoader = require("./images");
const scriptLoader = require("./script");
const sassLoader = require("./sass");

module.exports = env => ({
  rules: [
    {
      oneOf: [
        scriptLoader(env),
        sassLoader(env),
        graphqlLoader,
        svgLoader,
        imagesLoader(env),
      ],
    },
  ],
});

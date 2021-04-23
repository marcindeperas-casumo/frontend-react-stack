const graphqlLoader = require("./graphql");
const svgLoader = require("./svg");
const imagesLoader = require("./images");
const scriptLoader = require("./script");
const sassLoader = require("./sass");
const cssLoader = require("./tailwind");

module.exports = env => ({
  rules: [
    {
      oneOf: [
        scriptLoader(env),
        sassLoader(env),
        cssLoader(env),
        graphqlLoader,
        svgLoader,
        imagesLoader(env),
      ],
    },
  ],
});

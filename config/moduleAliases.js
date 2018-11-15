const path = require("path");

module.exports = {
  Containers: path.resolve(__dirname, "..", "src", "containers"),
  Components: path.resolve(__dirname, "..", "src", "components"),
  Models: path.resolve(__dirname, "..", "src", "models"),
  Sagas: path.resolve(__dirname, "..", "src", "sagas"),
  Services: path.resolve(__dirname, "..", "src", "applicationService"),
  Clients: path.resolve(__dirname, "..", "src", "serviceClients"),
  Utils: path.resolve(__dirname, "..", "src", "utils"),
  Styles: path.resolve(__dirname, "..", "src", "styles"),
  Lib: path.resolve(__dirname, "..", "src", "lib"),
  Src: path.resolve(__dirname, "..", "src"),
  Storybook: path.resolve(__dirname, "..", ".storybook"),
  Types: path.resolve(__dirname, "..", "src", "types"),
};

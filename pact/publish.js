const path = require("path");
const pact = require("@pact-foundation/pact-node");
const { commit, branch } = require("./utils");

const opts = {
  pactFilesOrDirs: [path.join(__dirname, "pacts")],
  pactBroker: "http://pact-broker.casumo.cloud",
  tags: [branch],
  consumerVersion: commit,
  pactfileWriteMode: "overwrite",
};

pact.publishPacts(opts).catch(err => {
  console.error("Publishing failed!", err);

  return process.exit(1);
});

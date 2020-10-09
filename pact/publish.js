const path = require("path");
const pact = require("@pact-foundation/pact-node");
const { commitSHA, branchName } = require("./utils");

const opts = {
  pactFilesOrDirs: [path.join(__dirname, "pacts")],
  pactBroker: "https://pact-broker.casumotools.cloud/",
  tags: [branchName],
  consumerVersion: commitSHA,
  pactfileWriteMode: "overwrite",
};

pact.publishPacts(opts).catch(err => {
  console.error("Publishing failed!", err);

  return process.exit(1);
});

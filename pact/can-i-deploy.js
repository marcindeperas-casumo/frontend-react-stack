const pact = require("@pact-foundation/pact-node");
const { commitSHA } = require("./utils");

const checkProvider = {
  pactBroker: "https://pact-broker.casumotools.cloud/",
  participant: "frontend-react-stack",
  participantVersion: commitSHA,
  retryWhileUnknown: 5,
  retryInterval: 10,
};

pact.canDeploy(checkProvider).catch(err => {
  console.error("Verification failed!", err);

  return process.exit(1);
});

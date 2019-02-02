import rollbar from "rollbar";
import { getEnv } from "Utils";
import { ENVS } from "Src/constants";

// When enabled Rollbars Telemetry takes over all console messages
// making it difficult to trace messages to their source.
const enableTelemetryInProduction = getEnv() === ENVS.PRODUCTION;
const Rollbar = getRollbar();

export default {
  debug: Rollbar.debug.bind(Rollbar),
  info: Rollbar.info.bind(Rollbar),
  warn: Rollbar.warning.bind(Rollbar),
  error: Rollbar.error.bind(Rollbar),
};

function getRollbar() {
  return new rollbar({
    reportLevel: "error",
    accessToken: "2a7d7f810245499e9250ee718205429a",
    captureUncaught: false,
    captureUnhandledRejections: false,
    autoInstrument: { log: enableTelemetryInProduction },
    payload: {
      environment: "production",
      context: "react-stack",
    },
  });
}

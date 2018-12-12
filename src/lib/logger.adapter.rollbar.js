import rollbar from "rollbar";

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
    autoInstrument: { log: true },
    payload: {
      environment: "production",
      context: "react-stack",
    },
  });
}

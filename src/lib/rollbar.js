import rollbar from "rollbar";

// We want do disable telemetry in development, as when enabled every log/error
// is also wrapped in the console, making hard to find the current file/line
const isTelemetryEnabled = process.env.NODE_ENV === "development" ? true : true;

const Rollbar = new rollbar({
  accessToken: "2a7d7f810245499e9250ee718205429a",
  captureUncaught: true,
  captureUnhandledRejections: true,
  autoInstrument: { log: isTelemetryEnabled },
  payload: {
    environment: process.env.NODE_ENV,
    context: "react-stack",
  },
});

export default Rollbar;

// @flow
import Rollbar from "rollbar";

function checkIgnore(isUncaught, args, payload) {
  if (__DEV__) {
    /**
     * In development we only want to have logs from rollbar
     * without actually sending them to the server.
     */
    console.log("Rollbar log:", { isUncaught, args, payload }); // eslint-disable-line no-console
    return true;
  }
  /**
   * looks like all uncaught exceptions contain error object as second argument
   * based on that we can get raw stacktrace, split it on line break and check
   * if second line contains react-stack in path (first line contains error msg)
   */
  if (isUncaught && /react-stack/.test(args[1].stack.split("\n")[1])) {
    return true;
  }
  return false;
}

const logger = new Rollbar({
  accessToken: "2a7d7f810245499e9250ee718205429a",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
    context: "react-stack",
  },
  autoInstrument: !__DEV__,
  includeItemsInTelemetry: true,
  verbose: __DEV__,
  enabled: !__DEV__,
  checkIgnore,
});

export default logger;

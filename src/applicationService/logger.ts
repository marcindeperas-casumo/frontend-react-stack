import Rollbar from "rollbar";

function checkIgnore(
  isUncaught: boolean,
  args: Rollbar.LogArgument[],
  payload: object
) {
  try {
    if (__DEV__) {
      /**
       * In development we only want to have logs from rollbar
       * without actually sending them to the server.
       */
      console.log("Rollbar log:", { isUncaught, args, payload }); // eslint-disable-line no-console
      return true;
    }

    /**
     * looks like all exceptions contain error object as second argument
     * based on that we can get raw stacktrace, split it on line break and check
     * if second line contains react-stack in path (first line contains error msg)
     */
    const error = args[1];
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stack' does not exist on type 'LogArgume... Remove this comment to see the full error message
    const firstStackTraceLine: string = error.stack.split("\n")[1];
    if (!/react-stack/.test(firstStackTraceLine)) {
      return true;
    }
  } catch (err) {
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
  checkIgnore,
});

export default logger;

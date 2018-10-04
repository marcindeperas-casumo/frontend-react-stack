import rollbar from "rollbar";

const Rollbar = new rollbar({
  accessToken: "2a7d7f810245499e9250ee718205429a",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
  },
});

export default Rollbar;

/* eslint-disable fp/no-let, fp/no-mutation */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "Components/App";

import ErrorBoundary from "Components/ErrorBoundary";
import bridge from "Src/DurandalReactBridge";
import configureStore from "Src/configureStore";
import config from "Src/config";
import storage from "Lib/storage";
import logger from "Services/logger";
import tracker from "Services/tracker";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isEnvProduction, isEnvDevelopment, sanitizeObject } from "Utils";
import Debugger from "Utils/Debugger";
import "./styles/index.scss";

const store = configureStore();
window.bridge = bridge;
bridgeToDispatchService(store);

const renderApp = App =>
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>,
    document.getElementById("root")
  );

renderApp(App);

if (module.hot) {
  // You cannot use alias here! https://github.com/gaearon/react-hot-loader/issues/560
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    renderApp(NextApp);
  });
}

if (isEnvProduction()) {
  disableReactDevTools();
}

if (isEnvDevelopment()) {
  window.Debugger = Debugger;
}

initNumberOfVisits();

// Call this to disable react DevTools integration, meaning that this will
// prevent the react DevTools extension to scan the elements and show anything
// react related in the extension tab.
// We need it to prevent people to look into our React tree with the extension
// in production.
function disableReactDevTools() {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // eslint-disable-next-line fp/no-loops, fp/no-let
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      // eslint-disable-next-line fp/no-mutation
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  }
}

// Log Async Errors
// Only logging errors that are coming from
// this project by checking the filename in the error stack.
window.addEventListener("error", e => {
  const { message, filename, lineno, colno, error } = e;
  const state = store.getState();
  const sanitizedState = sanitizeObject(state, config.sanitizedStateKeys);
  const stringifiedState = JSON.stringify(sanitizedState);
  const isErrorProjectRelated = filename.match("/react-stack/") !== null;

  if (!isErrorProjectRelated) {
    return;
  }

  logger.error(message, error, {
    state: stringifiedState,
    filename,
    lineno,
    colno,
  });
});

function initNumberOfVisits() {
  const numberOfVisits = storage.get("numberOfVisits", 0) + 1;

  tracker.setState({ numberOfVisits });
  storage.set("numberOfVisits", numberOfVisits);
}

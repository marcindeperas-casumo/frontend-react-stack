import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "Components/App";
import ErrorBoundary from "Components/ErrorBoundary";
import bridge from "Src/DurandalReactBridge";
import config from "Src/config";
import * as storage from "Lib/storage";
import logger from "Services/logger";
import { setState } from "Services/tracker";
import reduxStore from "Services/reduxStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isEnvProduction, sanitizeObject } from "Utils";
import "./styles/index.scss";

// eslint-disable-next-line fp/no-mutation
window.bridge = bridge;
bridgeToDispatchService(reduxStore);

const renderApp = App =>
  ReactDOM.render(
    <Provider store={reduxStore}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>,
    document.getElementById("root")
  );

renderApp(AppContainer);

if (module.hot) {
  // You cannot use alias here! https://github.com/gaearon/react-hot-loader/issues/560
  module.hot.accept("./components/App", () => {
    const NextAppContainer = require("./components/App").default;
    renderApp(NextAppContainer);
  });
}

if (isEnvProduction()) {
  disableReactDevTools();
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
  const state = reduxStore.getState();
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

  setState({ numberOfVisits });
  storage.set("numberOfVisits", numberOfVisits);
}

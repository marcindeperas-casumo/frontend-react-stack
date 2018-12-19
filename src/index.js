/* eslint-disable fp/no-let, fp/no-mutation */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "Components/App";
import ErrorBoundary from "Components/ErrorBoundary";
import bridge from "./DurandalReactBridge";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isEnvProduction, isEnvDevelopment } from "Utils";
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
  module.hot.accept("Components/App", () => {
    const NextApp = require("Components/App").default;
    renderApp(NextApp);
  });
}

if (isEnvProduction()) {
  disableReactDevTools();
}

if (isEnvDevelopment()) {
  window.Debugger = Debugger;
}

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

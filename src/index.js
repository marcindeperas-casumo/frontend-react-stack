/* eslint-disable fp/no-let, fp/no-mutation */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "Components/App";
import ErrorBoundary from "Components/ErrorBoundary";
import bridge from "./DurandalReactBridge";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isEnvProduction } from "./utils";
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
  // disable react-dev-tools for this project
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // eslint-disable-next-line fp/no-loops
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  }
}

const isCasumoTest = window.location.hostname === "m.casumotest.com";

if (!isEnvProduction() || isCasumoTest) {
  window.Debugger = Debugger;
}

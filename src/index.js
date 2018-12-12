/* eslint-disable fp/no-let, fp/no-mutation */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "Components/App";
import ErrorBoundary from "Components/ErrorBoundary";
import bridge from "./DurandalReactBridge";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isEnvProduction, disableReactDevTools } from "Utils";
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

const isCasumoTest = window.location.hostname === "m.casumotest.com";

if (!isEnvProduction() || isCasumoTest) {
  window.Debugger = Debugger;
}

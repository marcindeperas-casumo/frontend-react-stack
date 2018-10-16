import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "Containers/AppContainer";
import bridge from "./DurandalReactBridge";
import "./styles/index.scss";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isProduction } from "./utils";

const store = configureStore();
window.bridge = bridge;
bridgeToDispatchService(store);

const renderApp = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );

renderApp(AppContainer);

if (module.hot) {
  module.hot.accept("./containers/AppContainer", () => {
    const NextApp = require("./containers/AppContainer").default;
    renderApp(NextApp);
  });
}

if (isProduction()) {
  // disable react-dev-tools for this project
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  }
}

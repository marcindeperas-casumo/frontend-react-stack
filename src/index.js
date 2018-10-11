import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "Containers/AppContainer";
import bridge from "./DurandalReactBridge";
import "./styles/index.scss";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";

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

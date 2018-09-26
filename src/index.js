import React from "react";
import ReactDOM from "react-dom";
import App from "Containers/App";
import legacyBridge from "./legacyBridge";
import "./styles/index.scss";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";

const store = configureStore();
window.bridge = legacyBridge;
bridgeToDispatchService(store, window.bridge);

// legacyBridge.on(REACT_APP_EVENT_ROUTE_CHANGE, data => {
//   legacyBridge.emit(REACT_APP_EVENT_ALL_PORTALS_CLEAR);
//   legacyBridge.emit(data.config.id);
//   store.dispatch(actions.activateComponent(data.config.id));
// });
const renderApp = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );

renderApp(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    renderApp(NextApp);
  });
}

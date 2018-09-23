import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import legacyBridge from "./legacyBridge";
import {
  REACT_APP_EVENT_ALL_PORTALS_CLEAR,
  REACT_APP_EVENT_ROUTE_CHANGE,
} from "./constants";
import "./styles/index.scss";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

window.bridge = legacyBridge;
legacyBridge.on(REACT_APP_EVENT_ROUTE_CHANGE, data => {
  legacyBridge.emit(REACT_APP_EVENT_ALL_PORTALS_CLEAR);
  legacyBridge.emit(data.config.id);
});

const store = configureStore();
const renderApp = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );

renderApp(App);

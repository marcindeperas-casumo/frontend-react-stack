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
import store from "./configureStore";

window.bridge = legacyBridge;
const root = document.getElementById("root");

legacyBridge.on(REACT_APP_EVENT_ROUTE_CHANGE, data => {
  legacyBridge.emit(REACT_APP_EVENT_ALL_PORTALS_CLEAR);
  legacyBridge.emit(data.config.id);
});

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  root
);

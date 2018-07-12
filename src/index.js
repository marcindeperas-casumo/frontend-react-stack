import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import legacyBridge from "./legacyBridge";
import {
  REACT_APP_EVENT_ALL_PORTALS_GO_BYE_BYE,
  REACT_APP_EVENT_ROUTE_CHANGE
} from "./constants";
// import registerServiceWorker from './registerServiceWorker';

window.bridge = legacyBridge;
const root = document.getElementById("root");

legacyBridge.on(REACT_APP_EVENT_ROUTE_CHANGE, data => {
  legacyBridge.emit(REACT_APP_EVENT_ALL_PORTALS_GO_BYE_BYE);
  legacyBridge.emit(data.config.id);
});

ReactDOM.render(<App />, root);
// registerServiceWorker();

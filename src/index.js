import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import legacyBridge from "./legacyBridge";
// import registerServiceWorker from './registerServiceWorker';

window.bridge = legacyBridge;
const root = document.getElementById("root");

legacyBridge.on("mobile-router:navigation:attached", data => {
  legacyBridge.emit("$RESET");
  legacyBridge.emit(data.config.id);
});

ReactDOM.render(<App />, root);
// registerServiceWorker();

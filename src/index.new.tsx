import React from "react";
import ReactDOM from "react-dom";
import { App } from "Components/App";
import "./styles/index.scss";
import "./styles/index.css";

const renderApp = AppComponent => {
  const root = document.getElementById("root");
  if (root) {
    ReactDOM.render(<AppComponent />, root);
  }
};
renderApp(App);
// In order to be able to properly debug in production, we would need to be able to use the REACT DEVTOOLS
// This isDebugMode flag needs to be set manually on the client via localStorage
const isDebugMode = localStorage.getItem("isDebugMode");
const isReactDevtoolsAvailable =
  typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object";
const isProdAndNotDebugMode = !__DEV__ && !isDebugMode;
// Call this to disable react DevTools integration, meaning that this will
// prevent the react DevTools extension to scan the elements and show anything
// react related in the extension tab.
// We need it to prevent people to look into our React tree with the extension
// in production.
if (isProdAndNotDebugMode && isReactDevtoolsAvailable) {
  Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach(
    ([key, value]) => {
      // eslint-disable-next-line fp/no-mutation
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  );
}

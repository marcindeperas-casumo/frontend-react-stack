// @flow
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "Components/App";
import { apolloClient } from "Models/apollo/apollo.client";
import { ErrorBoundary } from "Components/ErrorBoundary";
import bridge from "Src/DurandalReactBridge";
import * as storage from "Lib/storage";
import tracker from "Services/tracker";
import reduxStore from "Services/reduxStore";
import { BridgeToNavigationService } from "Services/BridgeToNavigationService";
import bridgeToPlayingService from "Services/BridgeToPlayingService";
import { Modal } from "Components/RSModal";
import { bridgeToLaunchModalService } from "Services/LaunchModalService";
import "Services/logger"; // side effect, initializes rollbar
import "./styles/index.scss";

// eslint-disable-next-line fp/no-mutation
window.bridge = bridge;
BridgeToNavigationService();
bridgeToPlayingService(reduxStore);
bridgeToLaunchModalService(reduxStore);

ReactModal.setAppElement("#root");

const renderApp = AppComponent => {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.render(
      <Provider store={reduxStore}>
        <ApolloProvider client={apolloClient}>
          <ErrorBoundary>
            <Modal />
            <AppComponent />
          </ErrorBoundary>
        </ApolloProvider>
      </Provider>,
      root
    );
  }
};

renderApp(App);

initNumberOfVisits();

// Call this to disable react DevTools integration, meaning that this will
// prevent the react DevTools extension to scan the elements and show anything
// react related in the extension tab.
// We need it to prevent people to look into our React tree with the extension
// in production.
if (!__DEV__ && typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach(
    ([key, value]) => {
      // eslint-disable-next-line fp/no-mutation
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  );
}

function initNumberOfVisits() {
  const numberOfVisits = storage.get("numberOfVisits", 0) + 1;

  tracker.setState({ numberOfVisits });
  storage.set("numberOfVisits", numberOfVisits);
}

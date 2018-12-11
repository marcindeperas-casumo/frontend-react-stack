/* eslint-disable fp/no-let, fp/no-mutation */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "Components/App";
import ErrorBoundary from "Components/ErrorBoundary";
import bridge from "./DurandalReactBridge";
import configureStore from "./configureStore";
import bridgeToDispatchService from "Services/BridgeToDispatchService";
import { isEnvProduction } from "./utils";
import Debugger from "Utils/Debugger";
import { updateEntity } from "Models/schema";
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
  // disable react-dev-tools for this project
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // eslint-disable-next-line fp/no-loops
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  }
}

const isCasumoTest = window.location.hostname === "m.casumotest.com";

if (!isEnvProduction() || isCasumoTest) {
  window.Debugger = Debugger;

  /* This is only for showing xmas campaign components whilst we are not live, will be removed after that */
  Debugger.showPromotions = (lang = "en") => {
    store.dispatch(
      updateEntity({
        cms: {
          [`built-pages.top-lists-${lang}`]: {
            id: "87740",
            slug: `top-lists-${lang}`,
            title: `Top Lists ${lang}`,
            content: "",
            attachments: [],
            custom_fields: {},
            fields: {
              critical_for_compliance: false,
              "": false,
              content_builder: [
                { acf_fc_layout: "CURATED_CARD" },
                { acf_fc_layout: "GAMES_LIST", id: "latestPlayedGames" },
                { acf_fc_layout: "GAMES_LIST", id: "popularGames" },
                { acf_fc_layout: "GAMES_LIST", id: "newGames" },
                {
                  acf_fc_layout: "PROMOTION_CARDS_HORIZONTAL",
                  slug: "campaigns.winter-games",
                  title: "All Promotions",
                  titleColor: "white",
                  backgroundColor: "blue",
                },
                { acf_fc_layout: "GAMES_LIST", id: "exclusiveGames" },
                { acf_fc_layout: "GAMES_LIST", id: "casumoFavouriteGames" },
                { acf_fc_layout: "GAMES_LIST", id: "liveCasinoGames" },
                { acf_fc_layout: "JACKPOTS" },
              ],
            },
            children: [],
            childSlugs: [],
          },
        },
      })
    );
  };
}

// @flow
import React from "react";
import { SportsNavigation } from "@casumo/sports-navigation";
import { KambiClient } from "@casumo/sports-client";
// import { SportsSearchInput } from "@casumo/sports-search";
import navData from "./__mocks__/sportsNavData.json";

export const KAMBI_CURRENCY_DEFAULT = "EUR";
export const KAMBI_LOCALE_DEFAULT = "en_GB";
const clientBootstrapUrl =
  "https://c3-static.kambi.com/client/cauk/kambi-bootstrap.js";

export const SportsPage = () => {
  const [isLiveActive, setIsLiveActive] = React.useState(false);
  const isHome = window.location.hash === `#home`;
  const onNavigate = () => {
    if (isHome && isLiveActive) {
      setIsLiveActive(false);
    }
  };

  return (
    <div className="u-margin-top--lg t-background-grey-0">
      <SportsNavigation
        data={navData}
        isLiveActive={isLiveActive}
        setIsLiveActive={setIsLiveActive}
      />
      <KambiClient
        currency={KAMBI_CURRENCY_DEFAULT}
        // urlPrefix={lang}
        bootstrapUrl={clientBootstrapUrl}
        homeRoute={"#home"}
        onNavigate={onNavigate}
      />
    </div>
  );
};

import { SportsNavigation } from "@casumo/sports-navigation";
import { KambiClient } from "@casumo/sports-client";
import React from "react";
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
    <div className="u-margin-top--lg bg-grey-0">
      <SportsNavigation
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'allSportsLabel' is missing in type '{ al... Remove this comment to see the full error message
        data={navData}
        isLiveActive={isLiveActive}
        setIsLiveActive={setIsLiveActive}
      />
      {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ currency: string; bootstrapUrl: string; ho... Remove this comment to see the full error message */}
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

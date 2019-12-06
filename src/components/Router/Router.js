import React from "react";
import { Router as ReachRouter } from "@reach/router";
import { ROUTE_IDS } from "./constants";
import {
  LazyTopLists,
  LazyGameSearch,
  LazyMustDropJackpots,
  LazyGameProviders,
  LazyLiveCasinoDetails,
  LazyPromotions,
  LazyPromotionDetail,
  LazyPlayerValuables,
  LazyPlayerDepositValuables,
  LazyPlayer,
  LazyPlayerSettings,
  LazyPlayerSettingsNotifications,
  LazyPlayerSettingsAccountDetails,
  LazyPlayerSettingsRealityCheck,
  LazySports,
  LazyTransactionHistory,
  LazyAnnualTransactionsOverview,
} from "./routes";
import { routeTranslator } from "./utils";

export const Router = ({ basePath, language }) => {
  const translateRoute = routeTranslator(language);

  return (
    <ReachRouter basepath={basePath}>
      <LazyTopLists path={translateRoute(ROUTE_IDS.TOP_LISTS)} />
      <LazyGameSearch path={translateRoute(ROUTE_IDS.GAMES_SEARCH)} />
      <LazyMustDropJackpots
        path={translateRoute(ROUTE_IDS.MUST_DROP_JACKPOTS)}
      />
      <LazyGameProviders path={translateRoute(ROUTE_IDS.GAME_PROVIDER_GAMES)} />
      <LazyLiveCasinoDetails
        path={translateRoute(ROUTE_IDS.LIVE_CASINO_DETAILS)}
      />
      <LazyPromotions path={translateRoute(ROUTE_IDS.PROMOTIONS)} />
      <LazyPromotionDetail path={translateRoute(ROUTE_IDS.PROMOTION_DETAILS)} />
      <LazyPlayer path={translateRoute(ROUTE_IDS.PLAYER_DASHBOARD)} />
      <LazyPlayerValuables path={translateRoute(ROUTE_IDS.PLAYER_VALUABLES)} />
      <LazyPlayerDepositValuables path={translateRoute(ROUTE_IDS.DEPOSIT)} />
      <LazyPlayerSettings path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS)} />
      <LazyPlayerSettingsNotifications
        path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS_NOTIFICATIONS)}
      />
      <LazyPlayerSettingsAccountDetails
        path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS_ACCOUNT_DETAILS)}
      />
      <LazyPlayerSettingsRealityCheck
        path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS_REALITY_CHECK)}
      />
      <LazySports path={translateRoute(ROUTE_IDS.SPORTS)} />
      <LazyTransactionHistory
        path={translateRoute(ROUTE_IDS.TRANSACTION_HISTORY)}
      />
      <LazyAnnualTransactionsOverview
        path={translateRoute(ROUTE_IDS.TRANSACTION_ANNUAL_OVERVIEW)}
      />
    </ReachRouter>
  );
};

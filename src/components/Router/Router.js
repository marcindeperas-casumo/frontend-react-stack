// @flow
import * as React from "react";
import { Router as ReachRouter } from "@reach/router";
import { useLanguage, useUrlPrefix } from "Utils/hooks";
import { routeTranslator } from "Utils";
import { ROUTE_IDS } from "Src/constants";
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
  LazyRealMoneyGamePage,
  LazyPlayForFunGamePage,
} from "./routes";

export const Router = () => {
  const language = useLanguage();
  const basepath = useUrlPrefix();
  const translateRoute = routeTranslator(language);
  const reachRouterProps = basepath ? { basepath } : {};

  return (
    <ReachRouter {...reachRouterProps}>
      <LazyRealMoneyGamePage path={translateRoute(ROUTE_IDS.PLAY)} />
      <LazyRealMoneyGamePage path={translateRoute(ROUTE_IDS.PLAY_NATIVE)} />
      <LazyPlayForFunGamePage path={translateRoute(ROUTE_IDS.PRACTICE)} />
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

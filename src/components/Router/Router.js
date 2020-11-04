// @flow
import * as React from "react";
import { Router as ReachRouter } from "@reach/router";
import { useLanguage, useUrlPrefix } from "Utils/hooks";
import { routeTranslator } from "Utils";
import { ROUTE_IDS, TRANSLATED_ROUTES } from "Src/constants";
import {
  LazyGameDetails,
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
  LazyCasinoGamesPage,
  LazyCasinoGamesSlotsPage,
  LazyReelRacesPage,
} from "./routes";
import { GameBrowser } from "./GameBrowser";

export const Router = () => {
  const language = useLanguage();
  const basepath = useUrlPrefix();
  const translateRoute = routeTranslator(language);
  const reachRouterProps = basepath ? { basepath } : {};

  return (
    <ReachRouter {...reachRouterProps}>
      <LazyCasinoGamesPage path={translateRoute(ROUTE_IDS.CASINO_GAMES)} />
      <LazyCasinoGamesSlotsPage
        path={translateRoute(ROUTE_IDS.CASINO_GAMES_SLOTS)}
      />
      {Object.values(TRANSLATED_ROUTES.GAMES).map(x => (
        // $FlowIgnore: it is string
        <GameBrowser key={x} path={`${x}/*`} />
      ))}
      <LazyRealMoneyGamePage path={translateRoute(ROUTE_IDS.PLAY)} />
      <LazyRealMoneyGamePage path={translateRoute(ROUTE_IDS.PLAY_NATIVE)} />
      <LazyPlayForFunGamePage path={translateRoute(ROUTE_IDS.PRACTICE)} />
      <LazyPlayForFunGamePage
        path={translateRoute(ROUTE_IDS.PRACTICE_NATIVE)}
      />
      <LazyGameDetails path={translateRoute(ROUTE_IDS.GAME_DETAILS)} />
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
      <LazyReelRacesPage path={translateRoute(ROUTE_IDS.REEL_RACES)} />
    </ReachRouter>
  );
};

import * as React from "react";
import { Router as ReachRouter } from "@reach/router";
import { useLanguage, useUrlPrefix } from "Utils/hooks";
import { routeTranslator } from "Utils";
import { ROUTE_IDS, TRANSLATED_ROUTES } from "Src/constants";
import { MahjongPage } from "Components/MahjongPage/MahjongPage";
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
  LazyLiveCasinoPage,
  LazyTopNav,
  LazyLiveCasinoTopNav,
  LazyJackpotDetail,
  LazyJackpotExplainer,
  LazyExcludedGamePage,
  LazyJackpotsNav,
  LazyCampaignTerms,
  LazyPlayOkayGameTypeExclusions,
  LazyAccountVerification,
  LazyAccountVerificationInstructions,
  LazyAccountVerificationUpload,
} from "./routes";
import { GameBrowser } from "./GameBrowser";

export const Router = () => {
  const language = useLanguage();
  const basepath = useUrlPrefix();
  const translateRoute = routeTranslator(language);
  const reachRouterProps = basepath ? { basepath } : {};

  return (
    <>
      <ReachRouter {...reachRouterProps} primary={false}>
        <LazyTopNav
          path={`${translateRoute(ROUTE_IDS.GAMES)}/*`}
          basepath={basepath}
        />
        <LazyTopNav
          path={translateRoute(ROUTE_IDS.REEL_RACES)}
          basepath={basepath}
        />
        <LazyLiveCasinoTopNav
          path={`${translateRoute(ROUTE_IDS.LIVE_CASINO)}/*`}
          basepath={basepath}
        />
        <LazyJackpotsNav
          path={translateRoute(ROUTE_IDS.JACKPOTS_DETAILS)}
          basepath={basepath}
        />
      </ReachRouter>

      <ReachRouter {...reachRouterProps}>
        <LazyCasinoGamesPage path={translateRoute(ROUTE_IDS.CASINO_GAMES)} />
        <LazyCasinoGamesSlotsPage
          path={translateRoute(ROUTE_IDS.CASINO_GAMES_SLOTS)}
        />
        {Object.values(TRANSLATED_ROUTES.GAMES).map(x => (
          <GameBrowser key={x} path={`${x}/*`} />
        ))}
        <LazyLiveCasinoPage
          path={`${translateRoute(ROUTE_IDS.LIVE_CASINO)}/*`}
        />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; }' is not assignable to type 'I... Remove this comment to see the full error message */}
        <MahjongPage path={translateRoute(ROUTE_IDS.MAHJONG_PAGE)} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; }' is not assignable to type 'I... Remove this comment to see the full error message */}
        <LazyRealMoneyGamePage path={translateRoute(ROUTE_IDS.PLAY)} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; }' is not assignable to type 'I... Remove this comment to see the full error message */}
        <LazyRealMoneyGamePage path={translateRoute(ROUTE_IDS.PLAY_NATIVE)} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; }' is not assignable to type 'I... Remove this comment to see the full error message */}
        <LazyPlayForFunGamePage path={translateRoute(ROUTE_IDS.PRACTICE)} />
        <LazyPlayForFunGamePage
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; }' is not assignable to type 'I... Remove this comment to see the full error message
          path={translateRoute(ROUTE_IDS.PRACTICE_NATIVE)}
        />
        <LazyGameDetails path={translateRoute(ROUTE_IDS.GAME_DETAILS)} />
        <LazyPromotions path={translateRoute(ROUTE_IDS.PROMOTIONS)} />
        <LazyPromotionDetail
          path={translateRoute(ROUTE_IDS.PROMOTION_DETAILS)}
        />
        <LazyJackpotDetail path={translateRoute(ROUTE_IDS.JACKPOTS_DETAILS)} />
        <LazyJackpotExplainer
          path={translateRoute(ROUTE_IDS.JACKPOT_EXPLAINER)}
        />
        <LazyExcludedGamePage path={translateRoute(ROUTE_IDS.GAME_EXCLUDED)} />
        <LazyPlayer path={translateRoute(ROUTE_IDS.PLAYER_DASHBOARD)} />
        <LazyPlayerValuables
          path={translateRoute(ROUTE_IDS.PLAYER_VALUABLES)}
        />
        <LazyPlayerDepositValuables
          path={translateRoute(ROUTE_IDS.CASH_DEPOSIT)}
        />
        <LazyPlayerSettings path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS)} />
        <LazyAccountVerification
          path={translateRoute(ROUTE_IDS.ACCOUNT_VERIFICATION)}
        />
        <LazyAccountVerificationInstructions
          path={translateRoute(ROUTE_IDS.ACCOUNT_VERIFICATION_INSTRUCTIONS)}
        />
        <LazyAccountVerificationUpload
          path={translateRoute(ROUTE_IDS.ACCOUNT_VERIFICATION_UPLOAD)}
        />
        <LazyPlayerSettingsNotifications
          path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS_NOTIFICATIONS)}
        />
        <LazyPlayerSettingsAccountDetails
          path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS_ACCOUNT_DETAILS)}
        />
        <LazyPlayerSettingsRealityCheck
          path={translateRoute(ROUTE_IDS.PLAYER_SETTINGS_REALITY_CHECK)}
        />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: any; }' is not assignable to type 'I... Remove this comment to see the full error message */}
        <LazySports path={translateRoute(ROUTE_IDS.SPORTS)} />
        <LazyTransactionHistory
          path={translateRoute(ROUTE_IDS.TRANSACTION_HISTORY)}
        />
        <LazyAnnualTransactionsOverview
          path={translateRoute(ROUTE_IDS.TRANSACTION_ANNUAL_OVERVIEW)}
        />
        <LazyReelRacesPage path={translateRoute(ROUTE_IDS.REEL_RACES)} />
        <LazyCampaignTerms path={translateRoute(ROUTE_IDS.CAMPAIGN_TERMS)} />
        <LazyPlayOkayGameTypeExclusions
          path={translateRoute(ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS)}
        />
      </ReachRouter>
    </>
  );
};

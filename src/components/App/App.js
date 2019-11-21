// @flow
import React, { PureComponent } from "react";
import { Router } from "@reach/router";
import { TRANSLATED_ROUTES, URL_PREFIXES } from "Src/constants";
import LazyPortal from "Components/LazyPortal";
import {
  LazyTopLists,
  LazyGameSearch,
  LazyMustDropJackpots,
  LazyGameProviders,
  LazyLiveCasinoDetails,
  LazyPromotions,
  LazyPromotionDetail,
  LazyPlayerValuables,
  LazyPlayer,
  LazyPlayerSettings,
  LazyPlayerSettingsNotifications,
  LazyPlayerSettingsAccountDetails,
  LazyPlayerSettingsRealityCheck,
  LazySports,
  LazyTransactionHistory,
  LazyAnnualTransactionsOverview,
} from "./routes";

type Props = {
  onAppStarted: () => void,
  subscribeToPlayerUpdates: Function,
  unsubscribeToPlayerUpdates: Function,
  playerId: string,
  language: string,
  market: string,
  isAuthenticated: boolean,
  activeComponents: Array<string>,
  routeParams: Array<Object>,
};

export class App extends PureComponent<Props> {
  subscribe: Function;

  componentDidMount() {
    const { onAppStarted } = this.props;

    onAppStarted();
    this.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribeToPlayerUpdates();
  }

  componentDidUpdate(props: Props) {
    const { playerId: oldPlayerId } = props;
    const initialPageLoad = !oldPlayerId;

    if (initialPageLoad) {
      this.subscribe();
    }
  }

  subscribe = () => {
    this.props.subscribeToPlayerUpdates();
  };

  render() {
    const { isAuthenticated, language, market } = this.props;
    const translatedGamesRoute = TRANSLATED_ROUTES.GAMES[language] || "games";
    const basePath = URL_PREFIXES[market];

    if (!isAuthenticated) {
      return null;
    }

    return (
      <>
        <Router basepath={basePath}>
          <LazyTopLists path={`${translatedGamesRoute}/top`} />
          <LazyGameSearch path={`${translatedGamesRoute}/search`} />
          <LazyMustDropJackpots
            path={`${translatedGamesRoute}/must-drop-jackpots`}
          />
          <LazyGameProviders
            path={`${translatedGamesRoute}/provider/:provider`}
          />
          <LazyLiveCasinoDetails
            path={`${translatedGamesRoute}/live-casino-details`}
          />
          <LazyPromotions path="promotions" />
          <LazyPromotionDetail path="promotions/:slug" />
          <LazyPlayer path="player" />
          <LazyPlayerValuables path="player/valuables" />
          <LazyPlayerSettings path="player/settings" />
          <LazyPlayerSettingsNotifications path="player/settings/notifications" />
          <LazyPlayerSettingsAccountDetails path="player/settings/account-details" />
          <LazyPlayerSettingsRealityCheck path="player/settings/reality-check" />
          <LazySports path="sports" />
          <LazyTransactionHistory path="cash/history" />
          <LazyAnnualTransactionsOverview path="cash/history/transactions-annual-overview/:selectedYear" />
        </Router>
        <LazyPortal
          hostElementId="react-host-deposit-limits"
          loader={() =>
            import("Components/Compliance/DepositLimits/DepositLimitsView")
          }
          namedExport="DepositLimitsViewContainer"
        />
      </>
    );
  }
}

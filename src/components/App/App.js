// @flow
import React, { PureComponent } from "react";
import { Router } from "@reach/router";
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
  TRANSLATED_ROUTES,
} from "./routes";

type Props = {
  onAppStarted: () => void,
  subscribeToPlayerUpdates: Function,
  unsubscribeToPlayerUpdates: Function,
  playerId: string,
  language: string,
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
    const { isAuthenticated, language } = this.props;
    const translatedGamesRoute = TRANSLATED_ROUTES.GAMES[language] || "games";

    if (!isAuthenticated) {
      return null;
    }

    return (
      <>
        <Router>
          <LazyTopLists path={`${language}/${translatedGamesRoute}/top`} />
          <LazyGameSearch path={`${language}/${translatedGamesRoute}/search`} />
          <LazyMustDropJackpots
            path={`${language}/${translatedGamesRoute}/must-drop-jackpots`}
          />
          <LazyGameProviders
            path={`${language}/${translatedGamesRoute}/provider/:provider`}
          />
          <LazyLiveCasinoDetails
            path={`${language}/${translatedGamesRoute}/live-casino-details`}
          />
          <LazyPromotions path={`${language}/promotions`} />
          <LazyPromotionDetail path={`${language}/promotions/:slug`} />
          <LazyPlayer path={`${language}/player`} />
          <LazyPlayerValuables path={`${language}/player/valuables`} />
          <LazyPlayerSettings path={`${language}/player/settings`} />
          <LazyPlayerSettingsNotifications
            path={`${language}/player/settings/notifications`}
          />
          <LazyPlayerSettingsAccountDetails
            path={`${language}/player/settings/account-details`}
          />
          <LazyPlayerSettingsRealityCheck
            path={`${language}/player/settings/reality-check`}
          />
          <LazySports path={`${language}/sports`} />
          <LazyTransactionHistory path={`${language}/cash/history`} />
          <LazyAnnualTransactionsOverview
            path={`${language}/cash/history/transactions-annual-overview/:selectedYear`}
          />
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

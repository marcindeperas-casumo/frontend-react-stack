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
} from "./routes";

type Props = {
  onAppStarted: () => void,
  subscribeToPlayerUpdates: Function,
  unsubscribeToPlayerUpdates: Function,
  playerId: string,
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
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <>
        <Router>
          <LazyTopLists path=":market/games/top" />
          <LazyGameSearch path=":market/games/search" />
          <LazyMustDropJackpots path=":market/games/must-drop-jackpots" />
          <LazyGameProviders path=":market/games/provider/:provider" />
          <LazyPromotions path=":market/promotions" />
          <LazyPromotionDetail path=":market/promotions/:slug" />
          <LazyPlayer path=":market/player" />
          <LazyPlayerValuables path=":market/player/valuables" />
          <LazyPlayerSettings path=":market/player/settings" />
          <LazyPlayerSettingsNotifications path=":market/player/settings/notifications" />
          <LazyPlayerSettingsAccountDetails path=":market/player/settings/account-details" />
          <LazyPlayerSettingsRealityCheck path=":market/player/settings/reality-check" />
          <LazyLiveCasinoDetails path=":market/games/live-casino-details" />
          <LazySports path=":market/sports" />
          <LazyTransactionHistory path=":market/cash/history" />
          <LazyAnnualTransactionsOverview path=":market/cash/history/transactions-annual-overview/:selectedYear" />
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

// @flow
import React, { PureComponent } from "react";
import { Route, Router } from "Components/Router";
import { TopListsSkeleton } from "Components/TopLists";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import SearchInputSkeleton from "Components/SearchInput/SearchInputSkeleton";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";
import { GraphQLProvider } from "Components/GraphQLProvider";

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

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { isAuthenticated, activeComponents, routeParams } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <Router activePaths={activeComponents}>
        <Route path={["games-top", "games"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-games-lists"
              loader={() => import("Components/TopLists")}
              fallback={<TopListsSkeleton />}
              namedExport="TopLists"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["must-drop-jackpots"]}>
          <LazyPortal
            hostElementId="react-host-must-drop-jackpots"
            loader={() => import("Components/MustDropJackpotList")}
            fallback={<GameListSkeleton hasTitle={false} />}
            namedExport="MustDropJackpotList"
          />
        </Route>
        <Route path="*">
          <LazyPortal
            hostElementId="react-host-deposit-limits"
            loader={() =>
              import("Components/Compliance/DepositLimits/DepositLimitsView")
            }
            namedExport="DepositLimitsViewContainer"
          />
        </Route>
        <Route path="*">
          <LazyPortal
            hostElementId="react-host-dgoj-terms"
            loader={() => import("Components/RSModal/TermsAndConditions")}
            namedExport="TermsAndConditionsContainer"
          />
        </Route>
        <Route path={["live-casino-details"]}>
          <LazyPortal
            hostElementId="react-host-live-casino-details"
            loader={() => import("Components/LiveCasinoDetailPage")}
            fallback={<GameListSkeleton />}
            namedExport="LiveCasinoDetailPage"
          />
        </Route>
        {/* TODO: Change "promotions-detail" to "promotion-detail"  */}
        <Route path={["promotions-detail"]}>
          <LazyPortal
            hostElementId="react-host-promotion-detail"
            loader={() => import("Components/ComponentBuilder")}
            fallback={<PromotionPageSkeleton />}
            props={{ slug: `promotions.${routeParams[0]}` }}
            namedExport="ComponentBuilder"
          />
        </Route>
        {/* TODO: Change the route to "campaign/:slug" instead of "promotions" */}
        {/*
          Right now we are showing a campaign detail 
          page (Winter Games) for the collective promotions page.
          It is going to change in the future, as the /promotions
          page will have a separate content.
        */}
        <Route path={["promotions"]}>
          <LazyPortal
            hostElementId="react-host-promotions"
            loader={() => import("Components/ComponentBuilder")}
            fallback={<PromotionPageSkeleton />}
            props={{ slug: "campaigns.winter-games" }}
            namedExport="ComponentBuilder"
          />
        </Route>
        <Route path={["games-search"]}>
          <LazyPortal
            hostElementId="react-host-games-search"
            loader={() => import("Components/GameSearch")}
            fallback={
              <>
                <SearchInputSkeleton />
                <GameListSkeleton
                  className="u-padding-x--md"
                  hasTitle={false}
                  titleYOffset={20}
                />
              </>
            }
            namedExport="GamesSearch"
          />
        </Route>
        <Route path={["sports"]}>
          <LazyPortal
            hostElementId="react-host-sports-shell"
            loader={() => import("Features/sports/components/SportsShell")}
            fallback={<SportsShellSkeleton />}
            namedExport="SportsShell"
          />
        </Route>
        <Route path={["games-provider"]}>
          <LazyPortal
            hostElementId="react-host-provider-games"
            loader={() => import("Components/ProviderGamesList")}
            fallback={<GameListSkeleton hasTitle={false} />}
            props={{ provider: routeParams[0] }}
            namedExport="ProverGamesList"
          />
        </Route>
        <Route path={["player"]}>
          <LazyPortal
            hostElementId="react-host-adventure"
            loader={() => import("Components/AdventureCard")}
            namedExport="AdventureCard"
          />
        </Route>
        <Route path={["playerV2"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-player-v2"
              loader={() => import("Components/AccountPage")}
              namedExport="AccountPage"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["settings"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-settings"
              loader={() =>
                import(
                  "Components/Settings/SettingsSections/SettingsSectionsContainer"
                )
              }
              namedExport="SettingsSectionsContainer"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["account-details"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-settings-account-details"
              loader={() =>
                import(
                  "Components/Settings/SettingsAccountDetails/SettingsAccountDetailsContainer"
                )
              }
              namedExport="SettingsAccountDetailsContainer"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["notifications"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-settings-notifications"
              loader={() =>
                import(
                  "Components/Settings/SettingsNotifications/SettingsNotificationsContainer"
                )
              }
              namedExport="SettingsNotificationsContainer"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["reality-check"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-settings-reality-check"
              loader={() =>
                import(
                  "Components/Settings/SettingsRealityCheck/SettingsRealityCheckContainer"
                )
              }
              namedExport="SettingsRealityCheckContainer"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["history"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-transactions-annual-overview-year"
              loader={transactionsAnnualOverviewYearSelectorLoader}
              namedExport="TransactionsAnnualOverviewYearSelector"
            />
          </GraphQLProvider>
        </Route>
        <Route path={["history-transactions-annual-overview"]}>
          <GraphQLProvider>
            <LazyPortal
              hostElementId="react-host-transactions-annual-overview"
              props={{ selectedYear: routeParams[0] }}
              loader={() => import("Components/TransactionsAnnualOverview")}
              namedExport="TransactionsAnnualOverview"
            />
            {/* Had to put same portal here because adding another path above didn't work sometimes */}
            <LazyPortal
              hostElementId="react-host-transactions-annual-overview-year"
              loader={transactionsAnnualOverviewYearSelectorLoader}
              namedExport="TransactionsAnnualOverviewYearSelector"
            />
          </GraphQLProvider>
        </Route>
      </Router>
    );
  }
}

function transactionsAnnualOverviewYearSelectorLoader() {
  return import("Components/TransactionsAnnualOverviewYearSelector");
}

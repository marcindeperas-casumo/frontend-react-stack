// @flow
import React, { PureComponent } from "react";
import { Route, Router } from "Components/Router";
import { TopListsSkeleton } from "Components/TopLists";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import SearchInputSkeleton from "Components/SearchInput/SearchInputSkeleton";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";
import { DataProvider } from "Components/DataProvider";

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
    const { isAuthenticated, activeComponents, routeParams } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <Router activePaths={activeComponents}>
        <Route path={["games-top", "games"]}>
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-games-lists"
              loader={() => import("Components/TopLists")}
              fallback={<TopListsSkeleton />}
              namedExport="TopLists"
            />
          </DataProvider>
        </Route>
        <Route path={["must-drop-jackpots"]}>
          <LazyPortal
            hostElementId="react-host-must-drop-jackpots"
            loader={() => import("Components/MustDropJackpotList")}
            fallback={<GameListSkeleton hasTitle={false} />}
            namedExport="MustDropJackpotList"
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
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-player-v2"
              loader={() => import("Components/AccountPage")}
              namedExport="AccountPage"
            />
          </DataProvider>
        </Route>
        <Route path={["settings"]}>
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-settings"
              loader={() =>
                import(
                  "Components/Settings/SettingsSections/SettingsSectionsContainer"
                )
              }
              namedExport="SettingsSectionsContainer"
            />
          </DataProvider>
        </Route>
        <Route path={["account-details"]}>
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-settings-account-details"
              loader={() =>
                import(
                  "Components/Settings/SettingsAccountDetails/SettingsAccountDetailsContainer"
                )
              }
              namedExport="SettingsAccountDetailsContainer"
            />
          </DataProvider>
        </Route>
        <Route path={["notifications"]}>
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-settings-notifications"
              loader={() =>
                import(
                  "Components/Settings/SettingsNotifications/SettingsNotificationsContainer"
                )
              }
              namedExport="SettingsNotificationsContainer"
            />
          </DataProvider>
        </Route>
        <Route path={["reality-check"]}>
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-settings-reality-check"
              loader={() =>
                import(
                  "Components/Settings/SettingsRealityCheck/SettingsRealityCheckContainer"
                )
              }
              namedExport="SettingsRealityCheckContainer"
            />
          </DataProvider>
        </Route>
        <Route path={["history"]}>
          <DataProvider>
            <LazyPortal
              hostElementId="react-host-transactions-annual-overview-year"
              loader={transactionsAnnualOverviewYearSelectorLoader}
              namedExport="TransactionsAnnualOverviewYearSelector"
            />
          </DataProvider>
        </Route>
      </Router>
    );
  }
}

function transactionsAnnualOverviewYearSelectorLoader() {
  return import("Components/TransactionsAnnualOverviewYearSelector");
}

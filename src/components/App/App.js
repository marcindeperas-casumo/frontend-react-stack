import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "Components/MigrationComponent";
import { TopListsSkeleton } from "Components/TopLists";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import SearchInputSkeleton from "Components/SearchInput/SearchInputSkeleton";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

class App extends PureComponent {
  componentDidMount() {
    const { onAppStarted } = this.props;
    onAppStarted();
  }

  render() {
    const { isAuthenticated, activeComponents, routeParams } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <MigrationComponentManager activeKeys={activeComponents}>
        <MigrationComponent migrationKey={["games-top", "games"]}>
          <LazyPortal
            hostElementId="react-host-games-lists"
            loader={() => import("Components/TopLists")}
            fallback={<TopListsSkeleton />}
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["must-drop-jackpots"]}>
          <LazyPortal
            hostElementId="react-host-must-drop-jackpots"
            loader={() => import("Components/MustDropJackpotList")}
            fallback={<GameListSkeleton />}
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["live-casino-details"]}>
          <LazyPortal
            hostElementId="react-host-live-casino-details"
            loader={() => import("Components/LiveCasinoDetailPage")}
            fallback={<GameListSkeleton />}
          />
        </MigrationComponent>
        {/* TODO: Change "promotions-detail" to "promotion-detail"  */}
        <MigrationComponent migrationKey={["promotions-detail"]}>
          <LazyPortal
            hostElementId="react-host-promotion-detail"
            loader={() => import("Components/ComponentBuilder")}
            fallback={<PromotionPageSkeleton />}
            props={{ slug: `promotions.${routeParams[0]}` }}
          />
        </MigrationComponent>
        {/* TODO: Change the route to "campaign/:slug" instead of "promotions" */}
        {/*
          Right now we are showing a campaign detail
          page (Winter Games) for the collective promotions page.
          It is going to change in the future, as the /promotions
          page will have a separate content.
        */}
        <MigrationComponent migrationKey={["promotions"]}>
          <LazyPortal
            hostElementId="react-host-promotions"
            loader={() => import("Components/ComponentBuilder")}
            fallback={<PromotionPageSkeleton />}
            props={{ slug: "campaigns.winter-games" }}
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["games-search"]}>
          <LazyPortal
            hostElementId="react-host-games-search"
            loader={() => import("Components/GameSearch")}
            fallback={
              <>
                <SearchInputSkeleton />
                <GameListSkeleton />
              </>
            }
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["sports"]}>
          <LazyPortal
            hostElementId="react-host-sports-shell"
            loader={() => import("Features/sports/components/SportsShell")}
            fallback={<SportsShellSkeleton />}
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["games-provider"]}>
          <LazyPortal
            hostElementId="react-host-provider-games"
            loader={() => import("Components/ProviderGamesList")}
            fallback={<GameListSkeleton />}
            props={{ provider: routeParams[0] }}
          />
        </MigrationComponent>
      </MigrationComponentManager>
    );
  }
}

export default App;

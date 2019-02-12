/* eslint-disable fp/no-mutation */
// @flow
import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "../MigrationComponent/index";
import { TopListsSkeleton } from "Components/TopLists";
import LazyPortal from "Components/LazyPortal";
import MustDropJackpotListSkeleton from "Components/MustDropJackpotList/MustDropJackpotListSkeleton";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

type props = {
  onAppStarted: () => void,
  subscribeToPlayerUpdates: string => void,
  unsubscribeToPlayerUpdates: string => void,
};

class App extends PureComponent {
  constructor() {
    super();
    this.subscribe = this.subscribe.bind(this);
  }
  componentDidMount() {
    const { onAppStarted } = this.props;

    onAppStarted();
    this.subscribe();
  }

  componentWillUnmount() {
    const { playerId, unsubscribeToPlayerUpdates } = this.props;

    unsubscribeToPlayerUpdates(playerId);
  }

  componentDidUpdate({ playerId: oldPlayerId }) {
    const wasPlayerIdEmpty = !oldPlayerId;

    if (wasPlayerIdEmpty) {
      this.subscribe();
    }
  }

  subscribe() {
    const { playerId, subscribeToPlayerUpdates } = this.props;

    if (playerId) {
      subscribeToPlayerUpdates(playerId);
    }
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
            fallback={<MustDropJackpotListSkeleton />}
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
      </MigrationComponentManager>
    );
  }
}

export default App;

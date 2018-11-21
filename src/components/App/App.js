import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "../MigrationComponent/index";
import { TopListsSkeleton } from "Components/TopLists";
import LazyPortal from "Components/LazyPortal";
import MustDropJackpotListSkeleton from "Components/MustDropJackpotList/MustDropJackpotListSkeleton";

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
            fallback={<MustDropJackpotListSkeleton />}
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["promotions-detail"]}>
          <LazyPortal
            hostElementId="react-host-promotion-detail"
            loader={() => import("Components/ComponentBuilder")}
            props={{ slug: routeParams[0] }}
          />
        </MigrationComponent>
      </MigrationComponentManager>
    );
  }
}

export default App;

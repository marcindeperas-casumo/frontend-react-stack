import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "../MigrationComponent/index";
import { TopListsSkeleton } from "Components/TopLists";
import LazyPortal from "Components/LazyPortal";
import MustDropJackpots from "Components/MustDropJackpots";

class App extends PureComponent {
  componentDidMount() {
    const { onAppStarted } = this.props;
    onAppStarted();
  }

  render() {
    const { isAuthenticated, activeComponents } = this.props;
    return isAuthenticated ? (
      <MigrationComponentManager activeKeys={activeComponents}>
        <MigrationComponent migrationKey={["games-top", "games"]}>
          <LazyPortal
            hostElementId="react-host-games-lists"
            loader={() => import("Components/TopLists")}
            fallback={<TopListsSkeleton />}
          />
        </MigrationComponent>
        <MigrationComponent migrationKey={["must-drop-jackpots"]}>
          <MustDropJackpots />
        </MigrationComponent>
      </MigrationComponentManager>
    ) : null;
  }
}

export default App;

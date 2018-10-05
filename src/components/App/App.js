import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "../MigrationComponent/index";
import GamesListsContainer from "Containers/GamesLists";

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
          <GamesListsContainer />
        </MigrationComponent>
      </MigrationComponentManager>
    ) : null;
  }
}

export default App;

import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "../MigrationComponent/index";
import GamesListsContainer from "Containers/GamesLists";

class App extends PureComponent {
  render() {
    const { activeComponents } = this.props;
    return (
      <MigrationComponentManager activeKeys={activeComponents}>
        <MigrationComponent migrationKey={["games-top", "games"]}>
          <GamesListsContainer />
        </MigrationComponent>
      </MigrationComponentManager>
    );
  }
}

export default App;

import React, { PureComponent } from "react";
import MigrationComponent, {
  MigrationComponentManager,
} from "../MigrationComponent/index";

class Foo extends PureComponent {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 9999,
        }}
      >
        {Array(20)
          .fill("")
          .map((x, i) => (
            <h1 key={i}>hello {i}</h1>
          ))}
      </div>
    );
  }
}
class App extends PureComponent {
  render() {
    const { activeComponents } = this.props;
    return (
      <MigrationComponentManager activeKeys={activeComponents}>
        <MigrationComponent migrationKey="games-top">
          <Foo />
        </MigrationComponent>
      </MigrationComponentManager>
    );
  }
}

export default App;

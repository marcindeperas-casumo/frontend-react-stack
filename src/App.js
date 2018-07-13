import React from "react";
import SettingsContainer from "./containers/SettingsContainer";
import SuggestedGamesContainer from "./containers/SuggestedGamesContainer";
import legacyBridge from "./legacyBridge";

const blankState = () => ({
  settings: false,
  suggestedGames: false,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState();
  }

  componentWillMount() {
    legacyBridge.on("$RESET", () => {
      this.setState(prevState => ({
        ...prevState,
        ...blankState(),
      }));
    });

    legacyBridge.on("new-stack-poc", data => {
      this.setState(prevState => ({
        ...prevState,
        settings: true,
      }));
    });

    legacyBridge.on("games-top", data => {
      this.setState(prevState => ({
        ...prevState,
        suggestedGames: true,
      }));
    });
  }

  render() {
    const { settings, suggestedGames } = this.state;
    return (
      <div>
        Le React App
        {settings && <SettingsContainer />}
        {suggestedGames && <SuggestedGamesContainer />}
      </div>
    );
  }
}

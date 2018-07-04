import React from "react";
import SettingsContainer from "./containers/SettingsContainer";
import SuggestedGamesContainer from "./containers/SuggestedGamesContainer";
import GameBrowserService from "./features/api-concept-2/application-service/GameBrowserService";
import SessionService from "./features/api-concept-2/application-service/SessionService";
import legacyBridge from "./legacyBridge";

const blankState = () => ({
  settings: false,
  suggestedGames: false
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState();
  }

  async componentWillMount() {
    // This needs to move to an "app config" place
    const country = await SessionService.country();
    GameBrowserService.config.set({ country, platform: "mobile" });

    legacyBridge.on("$RESET", () => {
      this.setState(prevState => ({
        ...prevState,
        ...blankState()
      }));
    });

    legacyBridge.on("new-stack-poc", data => {
      this.setState(prevState => ({
        ...prevState,
        settings: true
      }));
    });

    legacyBridge.on("games-top", data => {
      this.setState(prevState => ({
        ...prevState,
        suggestedGames: true
      }));
    });

    window.debug = { session: import("./features/session") };
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

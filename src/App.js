import React from "react";
import SettingsContainer from "./containers/SettingsContainer";
import SuggestedGamesContainer from "./containers/SuggestedGamesContainer";
import legacyBridge from "./legacyBridge";
import GameBrowserService from "./features/api-concept-2/application-service/GameBrowserService";
import SessionService from "./features/api-concept-2/application-service/SessionService";
import CommonService from "./features/api-concept-2/application-service/CommonService";

const blankState = () => ({
  settings: false,
  suggestedGames: false
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState();
  }

  componentWillMount() {
    // DO NOT LEAVE THESE HERE! We should find a better place to place this
    // functionality.
    //
    // Decide if we want to keep the async function to pull in the initial
    // country value, or else refactor the config to start accepting a promise
    // (this might need a bigger to support async configs in services).
    //
    // Also we need to decide where we are going to place these
    // ApplicationEvents to react app binding. And make sure that the bridge
    // works fine with promise callbacks.
    legacyBridge.on("ApplicationEvents/onLogin", async () => {
      CommonService.invalidateHandshake();
      const country = await SessionService.country();
      GameBrowserService.config.set({ country, platform: "mobile" });
    });

    (async () => {
      const country = await SessionService.country();
      GameBrowserService.config.set({ country, platform: "mobile" });
    })();

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

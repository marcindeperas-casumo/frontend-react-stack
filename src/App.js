import React from "react";
import SettingsContainer from "./containers/SettingsContainer";
import SuggestedGamesContainer from "./containers/SuggestedGamesContainer";
import CommonService from "./features/api-concept-2/application-service/CommonService";
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
    this.state = {
      handshakeLoading: false,
      ...blankState()
    };
  }

  componentWillMount() {
    this.setState({
      handshakeLoading: true
    });

    legacyBridge.on("ApplicationEvents/onLogin", async () => {
      CommonService.invalidateHandshake();
      const country = await SessionService.country();
      GameBrowserService.config.set({ country, platform: "mobile" });
    });

    SessionService.country().then(country => {
      GameBrowserService.config.set({ country, platform: "mobile" });
      this.setState({ handshakeLoading: false });
    });

    legacyBridge.on("$RESET", () => {
      this.setState(blankState());
    });

    legacyBridge.on("new-stack-poc", data => {
      this.setState({
        settings: true
      });
    });

    legacyBridge.on("games-top", data => {
      this.setState({
        suggestedGames: true
      });
    });
  }

  render() {
    const { settings, suggestedGames, handshakeLoading } = this.state;
    return (
      <div>
        Le React App
        {!handshakeLoading && settings && <SettingsContainer />}
        {!handshakeLoading && suggestedGames && <SuggestedGamesContainer />}
      </div>
    );
  }
}

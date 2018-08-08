import React from "react";
import {
  REACT_APP_EVENT_ALL_PORTALS_CLEAR,
  REACT_APP_EVENT_ON_LOGIN,
} from "./constants";
import GamesLists from "./containers/GamesLists";
import CommonService from "./applicationService/CommonService";
import GameBrowserService from "./applicationService/GameBrowserService";
import SessionService from "./applicationService/SessionService";
import LiveCasinoLobbyService from "./applicationService/LiveCasinoLobbyService";
import legacyBridge from "./legacyBridge";

const initialPortalsState = () => ({
  gamesLists: false,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      handshakeLoading: false,
      ...initialPortalsState(),
    };
  }

  componentDidMount() {
    this.setState({
      handshakeLoading: true,
    });

    legacyBridge.on(REACT_APP_EVENT_ON_LOGIN, async () => {
      this.setState({ isAuthenticated: true });
      CommonService.invalidateHandshake();
      const country = await SessionService.country();
      GameBrowserService.config.set({ country, platform: "mobile" });
    });

    SessionService.country().then(async country => {
      const isAuthenticated = await SessionService.isAuthenticated();
      GameBrowserService.config.set({ country, platform: "mobile" });
      this.setState({ handshakeLoading: false, isAuthenticated });
    });

    SessionService.iso4217CurrencyCode().then(async currency => {
      LiveCasinoLobbyService.config.set({ currency });
    });

    legacyBridge.on(REACT_APP_EVENT_ALL_PORTALS_CLEAR, () => {
      this.setState(initialPortalsState());
    });

    legacyBridge.on("games-top", data => {
      this.setState({
        gamesLists: true,
      });
    });
  }

  renderGamesLists() {
    const { handshakeLoading, isAuthenticated } = this.state;
    return (
      (handshakeLoading || isAuthenticated) && (
        <GamesLists showSkeleton={handshakeLoading} />
      )
    );
  }

  render() {
    const { gamesLists } = this.state;
    return <div>{gamesLists && this.renderGamesLists()}</div>;
  }
}

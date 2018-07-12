import React from "react";
import {
  REACT_APP_EVENT_ALL_PORTALS_GO_BYE_BYE,
  REACT_APP_EVENT_ON_LOGIN
} from "./constants";
import GamesLists from "./containers/GamesLists";
import CommonService from "./applicationService/CommonService";
import GameBrowserService from "./applicationService/GameBrowserService";
import SessionService from "./applicationService/SessionService";
import legacyBridge from "./legacyBridge";

const blankState = () => ({
  gamesLists: false
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      handshakeLoading: false,
      ...blankState()
    };
  }

  componentWillMount() {
    this.setState({
      handshakeLoading: true
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

    legacyBridge.on(REACT_APP_EVENT_ALL_PORTALS_GO_BYE_BYE, () => {
      this.setState(blankState());
    });

    legacyBridge.on("games-top", data => {
      this.setState({
        gamesLists: true
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

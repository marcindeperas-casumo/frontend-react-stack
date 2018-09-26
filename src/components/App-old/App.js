import React from "react";
import {
  REACT_APP_EVENT_ALL_PORTALS_CLEAR,
  REACT_APP_EVENT_ON_LOGIN,
} from "../../constants";
import { connect } from "react-redux";
import GamesLists from "Containers/GamesLists";
import CommonService from "Services/CommonService";
import GameBrowserService from "Services/GameBrowserService";
import SessionService from "Services/SessionService";
import legacyBridge from "../../legacyBridge";

// const initialPortalsState = () => ({
//   gamesLists: false,
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isAuthenticated: false,
    //   handshakeLoading: false,
    //   ...initialPortalsState(),
    // };
  }

  componentDidMount() {
    this.props.dispatch({ type: "APP_STARTED" });
    // this.setState({
    //   handshakeLoading: true,
    // });

    // legacyBridge.on(REACT_APP_EVENT_ON_LOGIN, async () => {
    //   this.setState({ isAuthenticated: true });
    //   CommonService.invalidateHandshake();
    //   const country = await SessionService.country();
    //   GameBrowserService.config.set({ country, platform: "mobile" });
    // });

    // SessionService.country().then(async country => {
    //   const isAuthenticated = await SessionService.isAuthenticated();
    //   GameBrowserService.config.set({ country, platform: "mobile" });
    //   this.setState({ handshakeLoading: false, isAuthenticated });
    // });

    // legacyBridge.on(REACT_APP_EVENT_ALL_PORTALS_CLEAR, () => {
    //   this.setState(initialPortalsState());
    // });

    // ["games-top", "games"].map(eventName =>
    //   legacyBridge.on(eventName, data => {
    //     this.setState({
    //       gamesLists: true,
    //     });
    //   })
    // );
  }

  renderGamesLists() {
    const { handshakeLoading, isAuthenticated } = this.props;
    return (
      (handshakeLoading || isAuthenticated) && (
        <GamesLists showSkeleton={handshakeLoading} />
      )
    );
  }

  render() {
    const { gamesLists } = this.props;
    return <div>{gamesLists && this.renderGamesLists()}</div>;
  }
}

export default connect(({ migrationComponents: { activeComponents } }) => ({
  activeKeys: ["games-top"],
  isAuthenticated: false,
  handshakeLoading: false,
}))(App);

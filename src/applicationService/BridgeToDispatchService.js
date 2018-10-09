import { actions } from "Reducers/migrationComponents";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../legacyBridge";

export const connect = store => {
  const { dispatch } = store;
  const { on } = bridge;

  on(REACT_APP_EVENT_ROUTE_CHANGE, data => {
    dispatch(actions.activateComponent(data.config.id));
  });

  /*

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

    legacyBridge.on(REACT_APP_EVENT_ALL_PORTALS_CLEAR, () => {
      this.setState(initialPortalsState());
    });

    ["games-top", "games"].map(eventName =>
      legacyBridge.on(eventName, data => {
        this.setState({
          gamesLists: true,
        });
      })
    );
    */
};

export default connect;

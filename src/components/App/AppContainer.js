// @flow
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { appStarted } from "Models/app";
import {
  isAuthenticated,
  playerIdSelector,
  sessionIdSelector,
  isApplicationHandshakeLoaded,
} from "Models/handshake";
import {
  subscribeToPlayerUpdates,
  unsubscribeToPlayerUpdates,
  subscribeToSessionUpdates,
  unsubscribeToSessionUpdates,
} from "Models/cometd";
import { App } from "./App";

export default hot(
  connect(
    state => ({
      isAppHandshakeLoaded: isApplicationHandshakeLoaded(state),
      isAuthenticatedHandshake: isAuthenticated(state),
      playerId: playerIdSelector(state),
      sessionId: sessionIdSelector(state),
    }),
    {
      onAppStarted: appStarted,
      dispatchSubscribeToPlayer: subscribeToPlayerUpdates,
      dispatchUnsubscribeToPlayer: unsubscribeToPlayerUpdates,
      dispatchSubscribeToSession: subscribeToSessionUpdates,
      dispatchUnsubscribeToSession: unsubscribeToSessionUpdates,
    },
    (stateProps, dispatchProps) => {
      const { playerId, sessionId } = stateProps;
      const {
        dispatchSubscribeToPlayer,
        dispatchUnsubscribeToPlayer,
        dispatchSubscribeToSession,
        dispatchUnsubscribeToSession,
        onAppStarted,
      } = dispatchProps;

      return {
        ...stateProps,
        onAppStarted,
        subscribeToUpdates: () => {
          dispatchSubscribeToPlayer(playerId, sessionId);
          dispatchSubscribeToSession(sessionId);
        },
        unsubscribeToUpdates: () => {
          dispatchUnsubscribeToPlayer(playerId);
          dispatchUnsubscribeToSession(playerId);
        },
      };
    }
  )(App)
);

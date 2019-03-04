// @flow
import React from "react";
import { connect } from "react-redux";
import { appStarted } from "Models/app";
import { isAuthenticated, playerId, sessionId } from "Models/handshake";
import {
  activeComponents,
  routeParamsSelector,
} from "Models/migrationComponents";
import App from "Components/App/App";
import {
  subscribeToPlayerUpdates,
  unsubscribeToPlayerUpdates,
} from "Models/cometd";

const AppConnected = connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
    activeComponents: activeComponents(state),
    routeParams: routeParamsSelector(state),
    playerId: playerId(state),
    sessionId: sessionId(state),
  }),
  (dispatch, { playerId, sessionId }) => ({
    onAppStarted: () => dispatch(appStarted()),
    dispatchSubscribe: (playerId, sessionId) =>
      dispatch(subscribeToPlayerUpdates(playerId, sessionId)),
    dispatchUnsubscribe: (playerId, sessionId) =>
      dispatch(unsubscribeToPlayerUpdates(playerId, sessionId)),
  }),
  (stateProps, dispatchProps) => {
    const { playerId, sessionId } = stateProps;
    const { dispatchSubscribe, dispatchUnsubscribe } = dispatchProps;

    return {
      ...stateProps,
      ...dispatchProps,
      subscribeToPlayerUpdates: () => dispatchSubscribe(playerId, sessionId),
      unsubscribeToPlayerUpdates: () =>
        dispatchUnsubscribe(playerId, sessionId),
    };
  }
)(App);

const AppContainer = () => {
  return <AppConnected />;
};

export default AppContainer;

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
  dispatch => ({
    onAppStarted: () => dispatch(appStarted()),
    subscribeToPlayerUpdates: (playerId, sessionId) =>
      dispatch(subscribeToPlayerUpdates(playerId, sessionId)),
    unsubscribeToPlayerUpdates: (playerId, sessionId) =>
      dispatch(unsubscribeToPlayerUpdates(playerId, sessionId)),
  })
)(App);

const AppContainer = () => <AppConnected />;

export default AppContainer;

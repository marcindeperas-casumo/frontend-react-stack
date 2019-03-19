// @flow
import React from "react";
import { connect } from "react-redux";
import { appStarted } from "Models/app";
import {
  isAuthenticated,
  playerIdSelector,
  sessionIdSelector,
} from "Models/handshake";
import { activeComponents, routeParamsSelector } from "Models/router";
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
    playerId: playerIdSelector(state),
    sessionId: sessionIdSelector(state),
  }),
  {
    onAppStarted: appStarted,
    dispatchSubscribe: subscribeToPlayerUpdates,
    dispatchUnsubscribe: unsubscribeToPlayerUpdates,
  },
  (stateProps, dispatchProps) => {
    const { playerId, sessionId } = stateProps;
    const {
      dispatchSubscribe,
      dispatchUnsubscribe,
      onAppStarted,
    } = dispatchProps;

    return {
      ...stateProps,
      onAppStarted,
      subscribeToPlayerUpdates: () => dispatchSubscribe(playerId, sessionId),
      unsubscribeToPlayerUpdates: () => dispatchUnsubscribe(playerId),
    };
  }
)(App);

const AppContainer = () => {
  return <AppConnected />;
};

export default AppContainer;

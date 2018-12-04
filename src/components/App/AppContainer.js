// @flow
import React from "react";
import { connect } from "react-redux";
import { appStarted } from "Models/app";
import { isAuthenticated } from "Models/handshake";
import {
  activeComponents,
  routeParamsSelector,
} from "Models/migrationComponents";
import App from "Components/App/App";

const AppConnected = connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
    activeComponents: activeComponents(state),
    routeParams: routeParamsSelector(state),
  }),
  dispatch => ({
    onAppStarted: () => dispatch(appStarted()),
  })
)(App);

const AppContainer = () => <AppConnected />;

export default AppContainer;

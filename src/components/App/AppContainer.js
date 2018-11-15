// @flow
import React from "react";
import { connect } from "react-redux";
import { appStarted } from "Reducers/app";
import { isAuthenticated } from "Reducers/handshake/selectors";
import { activeComponents } from "Reducers/migrationComponents/selector";
import App from "Components/App/App";

const AppConnected = connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
    activeComponents: activeComponents(state),
  }),
  dispatch => ({
    onAppStarted: () => dispatch(appStarted()),
  })
)(App);

const AppContainer = () => <AppConnected />;

export default AppContainer;

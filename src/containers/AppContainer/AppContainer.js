import { connect } from "react-redux";
import { appStarted } from "Reducers/app";
import { isAuthenticated } from "Reducers/handshake/selectors";
import { activeComponents } from "Reducers/migrationComponents/selector";

import App from "Components/App";

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  activeComponents: activeComponents(state),
});

const mapDispatchToProps = dispatch => ({
  onAppStarted: () => dispatch(appStarted()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

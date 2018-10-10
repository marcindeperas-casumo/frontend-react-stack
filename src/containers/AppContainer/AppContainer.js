import { connect } from "react-redux";
import { appStarted } from "Reducers/app";
import { appContainerSelector } from "Containers/AppContainer/selectors";
import App from "Components/App";

const mapDispatchToProps = dispatch => ({
  onAppStarted: () => dispatch(appStarted()),
});

const AppContainer = connect(
  appContainerSelector,
  mapDispatchToProps
)(App);

export default AppContainer;

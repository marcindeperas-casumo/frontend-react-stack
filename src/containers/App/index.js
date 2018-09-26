import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { appStarted } from "Reducers/app";
import { getAppData } from "./selectors/index";
import App from "Components/App";

class AppContainer extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(appStarted());
  }

  render() {
    const { isAuthenticated, activeComponents } = this.props;
    return isAuthenticated ? <App activeComponents={activeComponents} /> : null;
  }
}

export default connect(getAppData)(AppContainer);

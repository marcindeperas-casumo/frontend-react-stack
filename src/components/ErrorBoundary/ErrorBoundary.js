// @flow

import React from "react";

type Props = {
  logError: (message: String, error: Object, rest: ?Object) => void,
};

type State = {
  hasError: boolean,
};

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const { logError } = this.props;
    const message = error.message || "Error while rendering";

    logError(message, error, info);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

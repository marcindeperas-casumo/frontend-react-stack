// @flow

import React from "react";
import type { Node } from "react";

type Props = {
  logError: (message: string, error: Object, rest: ?Object) => void,
  children: Node,
};

type State = {
  hasError: boolean,
};

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Object, info: ?Object) {
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

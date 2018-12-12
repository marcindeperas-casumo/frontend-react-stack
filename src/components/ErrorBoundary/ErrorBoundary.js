// @flow

import React from "react";
import type { Node } from "react";
import ErrorBoundaryUserFeedback from "./ErrorBoundaryUserFeedback";

type Props = {
  children: Node,
  withoutUserFeedback?: boolean,
  logError: (message: string, error: Object, rest: ?Object) => void,
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
    const { hasError } = this.state;
    const { withoutUserFeedback, children } = this.props;

    if (hasError && withoutUserFeedback) {
      return null;
    }

    if (hasError) {
      return <ErrorBoundaryUserFeedback />;
    }

    return children;
  }
}

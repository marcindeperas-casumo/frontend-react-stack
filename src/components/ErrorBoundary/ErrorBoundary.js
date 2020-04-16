// @flow
import * as React from "react";
import logger from "Services/logger";
import { ErrorBoundaryUserFeedback } from "./ErrorBoundaryUserFeedback";

type Props = {
  children?: React.Node,
  withoutUserFeedback?: boolean,
};

type State = {
  hasError: boolean,
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    logger.error(error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.withoutUserFeedback) {
        return <div>Something went wrong, we are working on it.</div>;
      }
      return <ErrorBoundaryUserFeedback />;
    }

    return this.props.children || null;
  }
}

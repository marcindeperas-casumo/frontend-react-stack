import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

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

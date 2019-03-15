// @flow
import * as React from "react";
import { connect } from "react-redux";
import { logError } from "Models/errors";
import ErrorBoundary from "./ErrorBoundary";

type Props = {
  children?: React.Node,
  withoutUserFeedback?: boolean,
};

const ErrorBoundaryConnected = connect(
  () => ({}),
  { logError }
)(ErrorBoundary);

const ErrorBoundaryContainer = (props: Props) => {
  return <ErrorBoundaryConnected {...props} />;
};

export default ErrorBoundaryContainer;

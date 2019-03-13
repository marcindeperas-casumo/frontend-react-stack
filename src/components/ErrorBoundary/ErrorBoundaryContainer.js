// @flow
import React from "react";
import type { Node } from "react";
import { connect } from "react-redux";
import { logError } from "Models/errors";
import ErrorBoundary from "./ErrorBoundary";

type Props = {
  children: Node,
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

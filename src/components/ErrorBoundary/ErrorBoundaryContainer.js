// @flow
import React from "react";
import type { Node } from "react";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import { logError } from "Models/errors";

type Props = {
  children: Node,
  withoutUserFeedback?: boolean,
};

const ErrorBoundaryConnected = connect(
  () => ({}),
  dispatch => ({
    logError: (...args) => dispatch(logError(...args)),
  })
)(ErrorBoundary);

const ErrorBoundaryContainer = (props: Props) => {
  return <ErrorBoundaryConnected {...props} />;
};

export default ErrorBoundaryContainer;

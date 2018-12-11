// @flow
import React from "react";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import { logError } from "Models/errors";

const ErrorBoundaryConnected = connect(
  () => ({}),
  dispatch => ({
    logError: (...args) => dispatch(logError(...args)),
  })
)(ErrorBoundary);

const ErrorBoundaryContainer = () => {
  return <ErrorBoundaryConnected />;
};

export default ErrorBoundaryContainer;

/**
 * This is loosly based on react-dev-utils/webpackHotDevClient
 * I wanted to use ErrorOverlay with differend client, idea here was to write
 * "dumb" client that adds additional error handling logic without affecting
 * anything else.
 */
const url = require("url");
const SockJS = require("sockjs-client");
const stripAnsi = require("strip-ansi");
const ErrorOverlay = require("react-error-overlay");
const launchEditorEndpoint = require("react-dev-utils/launchEditorEndpoint");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

ErrorOverlay.setEditorHandler(function editorHandler(errorLocation) {
  fetch(
    launchEditorEndpoint +
      "?fileName=" +
      window.encodeURIComponent(errorLocation.fileName) +
      "&lineNumber=" +
      window.encodeURIComponent(errorLocation.lineNumber || 1) +
      "&colNumber=" +
      window.encodeURIComponent(errorLocation.colNumber || 1)
  );
});

ErrorOverlay.startReportingRuntimeErrors({});

const connection = new SockJS(
  url.format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    // Hardcoded in WebpackDevServer
    pathname: "/sockjs-node",
  })
);

// eslint-disable-next-line fp/no-mutation
connection.onmessage = function(e) {
  const message = JSON.parse(e.data);
  ErrorOverlay.dismissBuildError();
  if (message.type === "errors") {
    const formatted = formatWebpackMessages({
      errors: message.data,
      warnings: [],
    });

    ErrorOverlay.reportBuildError(formatted.errors[0]);

    if (typeof console !== "undefined" && typeof console.error === "function") {
      formatted.warnings.forEach(x => console.error(stripAnsi(x)));
    }
  }
};

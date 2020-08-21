"use strict";

const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const paths = require("./paths");

module.exports = {
  // after update dev server was pinging localhost/sockjs-node and it was
  // causing problems with certificate. Setting host to '0.0.0.0' appears
  // to solve it.
  host: "0.0.0.0",
  // by default webpack dev server does host check. It's unfortunate for us
  // because we are using that on differend host via proxy. If you have
  // custom proxy config and you don't reffer to react stack as
  // `host.docker.internal` then you need to change that
  allowedHosts: [
    "mobile.dev",
    "host.docker.internal",
    "site.dev",
    "mobile.local",
  ],
  // Enable gzip compression of generated files.
  compress: true,
  // Silence WebpackDevServer's own logs since they're generally not useful.
  // It will still show compile warnings and errors with this setting.
  clientLogLevel: "none",
  // this option was for serving html and other stuff that doesn't change
  // it's irrevelant for us since we are using mobile.dev for development
  contentBase: false,
  // Enable hot reloading server. It will provide /sockjs-node/ endpoint
  // for the WebpackDevServer client so it can learn when the files were
  // updated. The WebpackDevServer client is included as an entry point
  // in the Webpack development configuration. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,
  // It is important to tell WebpackDevServer to use the same "root" path
  // as we specified in the config. In development, we always serve from /.
  publicPath: "/",
  // WebpackDevServer is noisy by default so we emit custom message instead
  // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
  quiet: true,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebook/create-react-app/issues/293
  // src/node_modules is not ignored to support absolute imports
  // https://github.com/facebook/create-react-app/issues/1065
  watchOptions: {
    ignored: ignoredFiles(paths.appSrc),
  },
  overlay: false,
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebook/create-react-app/issues/387.
    disableDotRule: true,
  },
  before(app, server) {
    // This lets us fetch source contents from webpack for the error overlay
    app.use(evalSourceMapMiddleware(server));
    // This lets us open files from the runtime error overlay.
    app.use(errorOverlayMiddleware());

    // This service worker file is effectively a 'no-op' that will reset any
    // previous service worker registered for the same host:port combination.
    // We do this in development to avoid hitting the production cache if
    // it used the same host and port.
    // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
    app.use(noopServiceWorkerMiddleware("/"));
  },
};

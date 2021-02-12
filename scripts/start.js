// eslint-disable-next-line fp/no-mutation
process.env.BABEL_ENV = "development";
// eslint-disable-next-line fp/no-mutation
process.env.NODE_ENV = "development";

process.on("unhandledRejection", err => {
  // eslint-disable-next-line fp/no-throw
  throw err;
});

const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const clearConsole = require("react-dev-utils/clearConsole");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const {
  choosePort,
  createCompiler,
} = require("react-dev-utils/WebpackDevServerUtils");
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
const configFactory = require("../config/webpack");
const devServerConfig = require("../config/webpack/devserver");

const useYarn = fs.existsSync(path.resolve(__dirname, "../yarn.lock"));
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([path.resolve(__dirname, "../src/index.html")])) {
  process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow("http://bit.ly/CRA-advanced-config")}`
  );
  console.log();
}

// We require that you explictly set browsers and do not fall back to
// browserslist defaults.
checkBrowsers(path.resolve(__dirname, "../"), isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      return;
    }
    const config = configFactory({ development: true });
    const appName = require(path.resolve(__dirname, "../package.json")).name;
    const urls = { localUrlForTerminal: "https://mobile.dev" };
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
      appName,
      config,
      urls,
      useYarn,
      webpack,
    });
    const devServer = new WebpackDevServer(compiler, devServerConfig);

    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan("Starting the development server...\n"));
    });

    ["SIGINT", "SIGTERM"].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

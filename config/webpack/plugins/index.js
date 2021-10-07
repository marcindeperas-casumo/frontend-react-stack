const Dotenv = require('dotenv-webpack');
const defineDevModePlugin = require("./defineDevMode");
const miniCssExtractPlugin = require("./miniCssExtract");
const cleanPlugin = require("./clean");
const reactRefreshPlugin = require("./reactRefresh");
const webpackBarPlugin = require("./webpackBar");
const hotModuleReplacementPlugin = require("./hotModuleReplacement");
const manifestPlugin = require("./manifest");
const htmlIndexPlugin = require("./htmlIndex");
const htmlEventBubblerPlugin = require("./htmlEventBubbler");
const htmlNavigationBubblerPlugin = require("./htmlNavigationBubbler");

module.exports = env => [
  defineDevModePlugin(env),
  ...(env.production
    ? [miniCssExtractPlugin(env)]
    : [webpackBarPlugin, reactRefreshPlugin, hotModuleReplacementPlugin, new Dotenv()]),
  cleanPlugin,
  manifestPlugin(env),
  htmlIndexPlugin,
  htmlEventBubblerPlugin(env),
  htmlNavigationBubblerPlugin(env),
];

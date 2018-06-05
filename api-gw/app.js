var express = require("express");
var router = express.Router();
var httpProxy = require("http-proxy");
var app = express();
var commonProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: "http://common.at.casumotest.local:8080/"
});
var gameBrowserProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: "http://game-browser.at.casumotest.local:8080/"
});

commonProxy.on("error", console.error);
gameBrowserProxy.on("error", console.error);

var trace = function(x) {
  console.log(x);
  return x;
};

router.all("/api/gamebrowser/*", function(req, res) {
  req.url = req.url.replace("/api/gamebrowser/", "/api/");
  gameBrowserProxy.web(req, res);
});

router.all("/*", function(req, res) {
  commonProxy.web(req, res);
});

app.use(router);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;

var express = require("express");
var router = express.Router();
var httpProxy = require("http-proxy");
var app = express();
var fetch = require("node-fetch");

function responseTime() {
  return function(req, res, next) {
    var start = new Date();

    if (res._responseTime) return next();
    res._responseTime = true;

    res.on("finish", function() {
      var duration = new Date() - start;
      console.log({ duration });
    });

    next();
  };
}

const http = require("http");
const keepAliveAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 6000,
});

var testProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: "http://httpbin.org/",
});
var commonProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: "http://common.at.casumotest.local:8080/",
});
var gameBrowserProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: "http://game-browser.at.casumotest.local:8080/",
  // agent: keepAliveAgent
});

commonProxy.on("error", console.error);
gameBrowserProxy.on("error", console.error);

var trace = function(x) {
  console.log(x);
  return x;
};

// Here we have a concept where we are augmenting an endpoint to not expect the
// `playerId` in the endpoint, but will infer it from the session.
//
// For this to work make sure that common is deployed from
// https://github.com/Casumo/Casumo-Engine/tree/request-meta-data
router.get("/api/gamebrowser/latestPlayedGames", function(req, res) {
  fetch(
    "http://common.at.casumotest.local:8080/api/common/query/request-meta-data",
    {
      headers: { Cookie: req.headers.cookie },
    }
  )
    .then(body => body.json())
    .then(({ playerId }) => {
      console.log({ playerId });

      return fetch(
        `http://game-browser.at.casumotest.local:8080/api/latestPlayedGames/player/${playerId}?numberOfGames=10`
      )
        .then(data => data.text())
        .then(trace);
    })
    .then(data => res.send(data));
});
gameBrowserProxy.on("proxyRes", (proxyRes, req, res) => {
  console.log("proxyRes", new Date(), req.url);
});
gameBrowserProxy.on("proxyReq", (proxyReq, req, res, options) => {
  console.log("proxyReq", new Date(), req.url);
});
// router.all("/api/gamebrowser/*", function(req, res) {
//   console.log(new Date(), req.url);

//   req.url = req.url.replace("/api/gamebrowser/", "/api/");
//   gameBrowserProxy.web(req, res);

//   // fetch(
//   //   "http://common.at.casumotest.local:8080/api/common/query/request-meta-data",
//   //   {
//   //     headers: { Cookie: req.headers.cookie }
//   //   }
//   // )
//   //   .then(body => body.json())
//   //   .then(({ playerId }) => {
//   //     req.headers["X-player-id"] = playerId;
//   //     return gameBrowserProxy.web(req, res);
//   //   });
// });

router.all("/api/http/*", function(req, res) {
  req.url = req.url.replace("/api/http/", "/");
  testProxy.web(req, res);
});

router.all("/*", function(req, res) {
  commonProxy.web(req, res);
});

app.use(responseTime());
app.use(router);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;

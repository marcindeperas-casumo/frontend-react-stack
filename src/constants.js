/* eslint-disable max-len */
// 📣📣📣 NOTE 📣📣📣
//
// The contents of this file are meant to be reflected and kept in sync between
// the react-stack-poc and casumo-frontend repositories.
//
// react-stack-poc
// (https://github.com/Casumo/mobile-react-stack-poc/blob/master/src/constants.js)
//
// casumo-frontend
// (https://github.com/Casumo/casumo-frontend/tree/master/web/common-frontend/src/js/utils/react-stack/constants.es6)
//
// If we could keep the same var names across repositories, that would avoid
// unnecessary confusion.

// REACT_APP* events are events that the react app will be responsible to react
// to.
export const REACT_APP_EVENT_ON_LOGIN = "REACT_APP_EVENT/onLogin";
export const REACT_APP_EVENT_ROUTE_CHANGE = "REACT_APP_EVENT/routeChange";

// KO_APP* events are events that the KO app will be responsible to react
// to.
export const KO_APP_EVENT_LAUNCH_GAME = "KO_APP_EVENT/launchGame";

export const LOW_RES_IMAGE_SETTINGS = {
  mark: null,
  dpr: 1,
  imgixOpts: {
    w: 5,
    blur: 2000,
  },
};

export const GAME_LIST_IDS = {
  POPULAR_GAMES: "popularGames",
  LIVE_CASINO_GAMES: "liveCasinoGames",
  // TODO: remove this by using unique ids everywhere in the CMS
  LIVE_CASINO_GAMES_ALIAS: "liveCasino",
  NEW_GAMES: "newGames",
  EXCLUSIVE_GAMES: "exclusiveGames",
  CASUMO_FAVOURITE_GAMES: "casumoFavouriteGames",
  CASUMO_JACKPOT_GAMES: "casumoJackpotGames",
  LATEST_PLAYED_GAMES: "latestPlayedGames",
  MUST_DROP_JACKPOTS_GAMES: "mustDropJackpotGames",
};

export const MARKETS = {
  ___en: "___en",
  ca_en: "ca_en",
  de_de: "de_de",
  dk_da: "dk_da",
  fi_fi: "fi_fi",
  gb_en: "gb_en",
  no_no: "no_no",
  se_sv: "se_sv",
};

export const LANGUAGES = {
  [MARKETS.___en]: "en",
  [MARKETS.ca_en]: "ca",
  [MARKETS.de_de]: "de",
  [MARKETS.dk_da]: "dk",
  [MARKETS.fi_fi]: "fi",
  [MARKETS.gb_en]: "gb",
  [MARKETS.no_no]: "no",
  [MARKETS.se_sv]: "sv",
};

// DEVELOPMENT: the local dev environment
// PRODUCTION: only casumo.com
// AUTOMATED_TESTS: unit tests environment
// TEST: anything which is not the local environment and not casumo.com
export const ENVS = {
  DEVELOPMENT: "DEVELOPMENT",
  PRODUCTION: "PRODUCTION",
  AUTOMATED_TESTS: "AUTOMATED_TESTS",
  TEST: "TEST",
};

export const EVENTS = {
  GAME_LAUNCH: "Game Started",
  GAME_DETAILS: "Game Information",
};

export const EVENT_PROPS = {
  LOCATION: "location",
  GAME_NAME: "name",
};

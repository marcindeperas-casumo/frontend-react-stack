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
  DE: "de",
  DK: "dk",
  EN_CA: "ca_en",
  EN_GB: "gb_en",
  EN: "en",
  FI: "fi",
  NO: "no",
  SV: "sv",
};

export const LANGUAGES = {
  [MARKETS.DE]: "de",
  [MARKETS.DK]: "dk",
  [MARKETS.EN_CA]: "ca",
  [MARKETS.EN_GB]: "gb",
  [MARKETS.EN]: "en",
  [MARKETS.FI]: "fi",
  [MARKETS.NO]: "no",
  [MARKETS.SV]: "sv",
};

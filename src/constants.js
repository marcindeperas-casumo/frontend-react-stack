// @flow
// 📣📣📣 NOTE 📣📣📣
//
// The contents of this file are meant to be reflected and kept in sync between
// the react-stack-poc and casumo-frontend repositories.
//
// react-stack-poc
// (https://github.com/Casumo/frontend-react-stack/blob/master/src/constants.js)
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
export const REACT_APP_EVENT_MENU_OPENED = "REACT_APP_EVENT/menuOpened";
export const REACT_APP_EVENT_MENU_CLOSED = "REACT_APP_EVENT/menuClosed";
export const REACT_APP_EVENT_ON_CALLBACK = "REACT_APP_EVENT/onCallback";
export const REACT_APP_EVENT_ON_OVERLAY_CHANGE =
  "REACT_APP_EVENT/onOverlayChange";
export const REACT_APP_SPORTS_SHOW_SEARCH = "REACT_APP_EVENT/sports/showSearch";
export const REACT_APP_EVENT_OLD_PLAY_OKAY_CLOSED =
  "REACT_APP_EVENT/oldPlayOkayClosed";
export const REACT_APP_EVENT_PLAYING = "REACT_APP_EVENT/playing";

export const REACT_APP_EVENTS = {
  SLOT_CONTROL_SYSTEM: {
    CONFIGURATION_INIT: "REACT_APP_EVENT/SLOT_CONTROL_SYSTEM/configurationInit",
  },
};

// KO_APP* events are events that the KO app will be responsible to react
// to.
export const KO_APP_EVENT_LAUNCH_GAME = "KO_APP_EVENT/launchGame";
export const KO_APP_EVENT_LAUNCH_MODAL = "KO_APP_EVENT/launchModal";
export const KO_APP_EVENT_LAUNCH_ERROR_MODAL = "KO_APP_EVENT/launchErrorModal";
export const KO_APP_EVENT_SHOW_TERMS = "KO_APP_EVENT/showTerms";
export const KO_APP_EVENT_LOGOUT = "KO_APP_EVENT/logout";
export const KO_APP_EVENT_CHANGE_ROUTE = "KO_APP_EVENT/changeRoute";
export const KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW =
  "KO_APP_EVENT/spawnOldPlayOkayView";
export const KO_APP_EVENT_NAVIGATE = "KO_APP_EVENT/navigate";

export const KO_EVENTS = {
  ACCOUNT_SETTINGS: {
    COMMAND_EXECUTED: "ACCOUNT_SETTINGS/COMMAND_EXECUTED",
  },
  VALUABLES: {
    ITEM_CREATED: "VALUABLES/ITEM_CREATED",
  },
  SLOT_CONTROL_SYSTEM: {
    CONFIGURATION_FINISHED:
      "KO_APP_EVENT/SLOT_CONTROL_SYSTEM/configurationFinished",
    CONFIGURATION_EXITED:
      "KO_APP_EVENT/SLOT_CONTROL_SYSTEM/configurationExited",
  },
};

export const STORE_REHYDRATE = "REHYDRATE";
export const STORE_PERSISTED_STATE_KEY = "persistedState";
export const LOW_RES_IMAGE_SETTINGS = {
  mark: "",
  dpr: 1,
  imgixOpts: { w: 5, blur: 2000 },
};
export const GAME_LIST_IDS = {
  POPULAR_GAMES: "popularGames",
  LIVE_CASINO_GAMES: "liveCasinoGames", // TODO: remove this by using unique ids everywhere in the CMS
  LIVE_CASINO_GAMES_ALIAS: "liveCasino",
  NEW_GAMES: "newGames",
  EXCLUSIVE_GAMES: "exclusiveGames",
  CASUMO_FAVOURITE_GAMES: "casumoFavouriteGames",
  CASUMO_JACKPOT_GAMES: "casumoJackpotGames",
  LATEST_PLAYED_GAMES: "latestPlayedGames",
  MUST_DROP_JACKPOTS_GAMES: "mustDropJackpotGames",
  GAME_SEARCH: "gameSearch",
  LATEST_PLAYED: "latestPlayedGames",
  PLAYER_GAMES: "playerGames",
  SUGGESTED_GAMES: "suggestedGames",
  SUGGESTED_GAMES_SEARCH: "suggestedGamesSearch",
};
export const MARKETS = {
  ___en: "___en",
  ca_en: "ca_en",
  de_de: "de_de",
  dk_da: "dk_da",
  fi_fi: "fi_fi",
  gb_en: "gb_en",
  in_en: "in_en",
  no_no: "no_no",
  se_sv: "se_sv",
  es_es: "es_es",
};
export const LANGUAGES = {
  [MARKETS.___en]: "en",
  [MARKETS.ca_en]: "ca",
  [MARKETS.de_de]: "de",
  [MARKETS.dk_da]: "dk",
  [MARKETS.fi_fi]: "fi",
  [MARKETS.gb_en]: "gb",
  [MARKETS.in_en]: "in",
  [MARKETS.no_no]: "no",
  [MARKETS.se_sv]: "sv",
  [MARKETS.es_es]: "es",
};
export const INTL_LOCALES = {
  [MARKETS.___en]: "en",
  [MARKETS.ca_en]: "en-CA",
  [MARKETS.de_de]: "de-DE",
  [MARKETS.dk_da]: "da-DK",
  [MARKETS.fi_fi]: "fi-FI",
  [MARKETS.gb_en]: "en-GB",
  [MARKETS.in_en]: "en-IN",
  [MARKETS.no_no]: "no-NO",
  [MARKETS.se_sv]: "sv-SE",
  [MARKETS.es_es]: "es-ES",
};

export const CURRENCY_SYMBOLS = {
  EUR: "\u20AC", // €
  GBP: "\u00A3", // £
  DKK: "kr.",
  SEK: "kr",
  CAD: "\u0024", // $
  NZD: "\u0024", // $
  INR: "\u20B9", // ₹
  JPY: "\u00A5", // ¥
};

export const CURRENCIES = {
  EUR: "EUR",
  GBP: "GBP",
  DKK: "KR",
  SEK: "KR",
  CAD: "CAD",
  NZD: "NZD",
  INR: "INR",
  JPY: "JPY",
};

export const VERTICALS = {
  SPORTS: "SPORTS",
  CASINO: "CASINO",
};

export const EVENTS = {
  MIXPANEL_GAME_LAUNCH: "Game Started",
  MIXPANEL_GAME_DETAILS: "Game Information",
  MIXPANEL_SEARCH_INTENT: "Search Intent",
  MIXPANEL_SEARCH_INITIATED: "Search Initiated",
  MIXPANEL_CURATED_COMPONENT_CLICKED: "Curated Component Clicked",
  MIXPANEL_CURATED_COMPONENT_VIEWED: "Curated Component Viewed",
  MIXPANEL_REEL_RACE_CLICKED: "Reel Race Card Clicked",
  MIXPANEL_PROMOTION_OPTED_IN: "Promotion opted in",
  MIXPANEL_SPORTS_LIVE_NAV_TOGGLE: "Sports Live Nav Toggled",
  MIXPANEL_SPORTS_NAV_SELECTED: "Sports Nav Selected",
  MIXPANEL_PROMOTION_CLICKED: "Promotion Clicked",
  MIXPANEL_PROMOTION_VIEWED: "Promotion Viewed",
};

export const EVENT_PROPS = {
  LOCATION: "location",
  GAME_NAME: "name",
  CURATED_TYPE: "type",
  CURATED_SLUG: "slug",
  OPTED_IN: "opted in",
  SPORTS_STATE: "State",
  SPORTS_SELECTED_NAV: "Sports",
  SPORTS_IS_LIVE_ACTIVE: "Is Live",
  PROMOTION_TYPE: "promotion type",
};

export const EVENT_LOCATIONS = {
  SEARCH_GAMES: "searchGames",
  ALL_GAMES: "allGames",
  LATEST_PLAYED_GAMES: "latestPlayedGames",
  POPULAR_GAMES: "popularGames",
  SUGGESTED_GAMES: "suggestedGames",
};

export const MODALS = {
  ACCOUNT_SETTINGS: {
    CHANGE_EMAIL: "ACCOUNT_SETTINGS/CHANGE_EMAIL",
    CHANGE_EXTENT_OF_GAMBLING: "ACCOUNT_SETTINGS/CHANGE_EXTENT_OF_GAMBLING",
    CHANGE_PASSWORD: "ACCOUNT_SETTINGS/CHANGE_PASSWORD",
    CHANGE_MOBILE_NUMBER: "ACCOUNT_SETTINGS/CHANGE_MOBILE_NUMBER",
    SHOW_ACCOUNT_ACTIVITY: "ACCOUNT_SETTINGS/SHOW_ACCOUNT_ACTIVITY",
    VALUABLE_DETAILS: "VALUABLE_DETAILS/VALUABLE_DETAILS",
  },
  TOP_LIST: { REEL_RACE_CAVEATS: "TOP_LIST/REEL_RACE_CAVEATS" },
  ERROR: "ERROR",
};

export const EVOLUTION_LOBBY_TYPES = {
  MONEYWHEEL: "MoneyWheel",
  ROULETTE: "Roulette",
  TOPCARD: "TopCard",
  MONOPOLY: "Monopoly",
  BLACKJACK: "Blackjack",
  BACCARAT: "Baccarat",
};

// Make sure that any flags you have here are also listed here, otherwise they will not work:
// https://github.com/Casumo/casumo-frontend/blob/a9ff0a7f4fcbf6141b9f803238be6eece822f708/web/common-frontend/src/js/config/params.js#L107
export const FEATURE_FLAGS = {
  SPORTS: "sports",
  TOP_LIST_CURATED_SHOW_ORIGINAL: "top-list-curated-show-original",
};

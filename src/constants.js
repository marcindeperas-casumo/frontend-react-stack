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
export const REACT_APP_EVENT_LAUNCH_MODAL = "REACT_APP_EVENT/launchModal";
export const REACT_APP_EVENT_INIT_MANUAL_LOGOUT =
  "REACT_APP_EVENT/initManualLogout";

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
export const KO_APP_EVENT_MODAL_HIDDEN = "KO_APP_EVENT/modalHidden";
export const KO_APP_EVENT_DEPOSIT_BONUS_SELECTED =
  "KO_APP_EVENT/depositBonusSelected";
export const KO_APP_EVENT_SHOW_BONUS_TERMS = "KO_APP_EVENT/showBonusTerms";

export const ROOT_SCROLL_ELEMENT_ID = "main-content-wrapper";

export const KO_EVENTS = {
  ACCOUNT_SETTINGS: {
    COMMAND_EXECUTED: "ACCOUNT_SETTINGS/COMMAND_EXECUTED",
  },
  VALUABLES: {
    ITEM_CREATED: "VALUABLES/ITEM_CREATED",
  },
};
export const DEVICES = {
  DESKTOP: "desktop",
  MOBILE: "mobile",
};
export const ENVIRONMENTS = {
  TEST: "test",
  PRODUCTION: "production",
};

export const STORE_REHYDRATE = "REHYDRATE";
export const STORE_PERSISTED_STATE_KEY = "persistedState";
export const LOW_RES_IMAGE_SETTINGS = { w: 5, blur: 2000 };
export const DEVICE_PIXEL_RATIO = Math.ceil(window.devicePixelRatio);
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
  MY_LIST: "myList",
};

export const ROUTE_IDS = {
  LOGIN: "LOGIN",
  PLAY: "PLAY",
  DEPOSIT: "DEPOSIT",
  PRACTICE: "PRACTICE",
  TOP_LISTS: "TOP_LISTS",
  GAMES_SEARCH: "GAMES_SEARCH",
  MUST_DROP_JACKPOTS: "MUST_DROP_JACKPOTS",
  GAME_PROVIDER_GAMES: "GAME_PROVIDER_GAMES",
  LIVE_CASINO_DETAILS: "LIVE_CASINO_DETAILS",
  PROMOTIONS: "PROMOTIONS",
  PROMOTION_DETAILS: "PROMOTION_DETAILS",
  PLAYER_DASHBOARD: "PLAYER_DASHBOARD",
  PLAYER_VALUABLES: "PLAYER_VALUABLES",
  PLAYER_SETTINGS: "PLAYER_SETTINGS",
  PLAYER_SETTINGS_NOTIFICATIONS: "PLAYER_SETTINGS_NOTIFICATIONS",
  PLAYER_SETTINGS_ACCOUNT_DETAILS: "PLAYER_SETTINGS_ACCOUNT_DETAILS",
  PLAYER_SETTINGS_REALITY_CHECK: "PLAYER_SETTINGS_REALITY_CHECK",
  PLAYER_PLAY_OKAY_SETTINGS: "PLAYER_PLAY_OKAY_SETTINGS",
  SPORTS: "SPORTS",
  TRANSACTION_HISTORY: "TRANSACTION_HISTORY",
  TRANSACTION_HISTORY_BETS: "TRANSACTION_HISTORY_BETS",
  TRANSACTION_ANNUAL_OVERVIEW: "TRANSACTION_ANNUAL_OVERVIEW",
  CASH_DEPOSIT: "CASH_DEPOSIT",
  PLAY_OKAY: "PLAY_OKAY",
  FAQ: "FAQ",
  ABOUT_CASUMO: "ABOUT_CASUMO",
};

export const ROUTES = {
  [ROUTE_IDS.LOGIN]: "log-in",
  [ROUTE_IDS.DEPOSIT]: "deposit",
  [ROUTE_IDS.PLAY]: "{{play}}/:slug/launch",
  [ROUTE_IDS.PRACTICE]: "practice/:slug/launch",
  [ROUTE_IDS.TOP_LISTS]: "{{games}}/top",
  [ROUTE_IDS.GAMES_SEARCH]: "{{games}}/search",
  [ROUTE_IDS.MUST_DROP_JACKPOTS]: "{{games}}/must-drop-jackpots",
  [ROUTE_IDS.GAME_PROVIDER_GAMES]: "{{games}}/provider/:provider",
  [ROUTE_IDS.LIVE_CASINO_DETAILS]: "{{games}}/live-casino-details",
  [ROUTE_IDS.PROMOTIONS]: "promotions",
  [ROUTE_IDS.PROMOTION_DETAILS]: "promotions/:slug",
  [ROUTE_IDS.PLAYER_DASHBOARD]: "player",
  [ROUTE_IDS.PLAYER_VALUABLES]: "player/valuables",
  [ROUTE_IDS.PLAYER_SETTINGS]: "player/settings",
  [ROUTE_IDS.PLAYER_SETTINGS_NOTIFICATIONS]: "player/settings/notifications",
  [ROUTE_IDS.PLAYER_SETTINGS_ACCOUNT_DETAILS]:
    "player/settings/account-details",
  [ROUTE_IDS.PLAYER_SETTINGS_REALITY_CHECK]: "player/settings/reality-check",
  [ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS]: "player/play-okay-settings",
  [ROUTE_IDS.SPORTS]: "sports",
  [ROUTE_IDS.TRANSACTION_HISTORY]: "cash/history",
  [ROUTE_IDS.TRANSACTION_HISTORY_BETS]: "cash/history/bets",
  [ROUTE_IDS.TRANSACTION_ANNUAL_OVERVIEW]:
    "cash/history/transactions-annual-overview/:selectedYear",
  [ROUTE_IDS.CASH_DEPOSIT]: "cash/deposit",
  [ROUTE_IDS.PLAY_OKAY]: "play-okay",
  [ROUTE_IDS.FAQ]: "faq",
  [ROUTE_IDS.ABOUT_CASUMO]: "about-casumo",
};

export const TRANSLATED_ROUTES = {
  GAMES: {
    sv: "spel",
    fi: "pelit",
    no: "spillvelger",
    de: "spiele",
    DEFAULT: "games",
  },
  PLAY: {
    sv: "spela",
    fi: "pelaa",
    no: "spill",
    de: "spielen",
    DEFAULT: "play",
  },
};

export const COMPLIANCE_STATE_PROPERTY = {
  DGA: "DGA",
  AML: "AML",
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
  nz_en: "nz_en",
  jp_ja: "jp_ja",
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
  [MARKETS.nz_en]: "nz",
  [MARKETS.jp_ja]: "jp",
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
  [MARKETS.nz_en]: "en-NZ",
  [MARKETS.jp_ja]: "ja-JP",
};
export const URL_PREFIXES = {
  [MARKETS.___en]: "en",
  [MARKETS.ca_en]: "en-ca",
  [MARKETS.de_de]: "de",
  [MARKETS.dk_da]: "da",
  [MARKETS.fi_fi]: "fi",
  [MARKETS.gb_en]: "en-gb",
  [MARKETS.in_en]: "en-in",
  [MARKETS.no_no]: "no",
  [MARKETS.se_sv]: "sv",
  [MARKETS.es_es]: "es",
  [MARKETS.nz_en]: "en-nz",
  [MARKETS.jp_ja]: "ja",
};
export const CURRENCY_SYMBOLS = {
  EUR: "\u20AC", // €
  GBP: "\u00A3", // £
  DKK: "kr.",
  SEK: "kr",
  CAD: "\u0024", // $
  NZD: "\u0024", // $
  INR: "\u20B9", // ₹
  USD: "\u0024", // $
};

export const CURRENCIES = Object.freeze({
  EUR: "EUR",
  GBP: "GBP",
  DKK: "KR",
  SEK: "KR",
  CAD: "CAD",
  NZD: "NZD",
  INR: "INR",
  USD: "USD",
});

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
  MIXPANEL_SPORTS_PAGEVIEW: "Sports Page View",
  MIXPANEL_SPORTS_SEARCH_INTENT: "Sports Search Intent",
  MIXPANEL_SPORTS_SEARCH_INITIATED: "Sports Search Initiated",
  MIXPANEL_SPORTS_SEARCH_CLICKED_SUGGESTION: "Sports Search Clicked Suggestion",
  MIXPANEL_SPORTS_SEARCH_CLICKED_RESULT: "Sports Search Clicked Result",
  MIXPANEL_PROMOTION_CLICKED: "Promotion Clicked",
  MIXPANEL_PROMOTION_VIEWED: "Promotion Viewed",
  MIXPANEL_GAME_FAVOURITE_CLICKED: "Game Favourite Clicked",
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
  SPORTS_PAGE_TYPE: "type",
  SPORTS_PAGE_TITLE: "title",
  SPORTS_PAGE_PATH: "path",
  PROMOTION_TYPE: "promotion type",
  IS_FAVOURITE: "Is Favourite",
};

export const EVENT_LOCATIONS = {
  SEARCH_GAMES: "searchGames",
  ALL_GAMES: "allGames",
  LATEST_PLAYED_GAMES: "latestPlayedGames",
  POPULAR_GAMES: "popularGames",
  SUGGESTED_GAMES: "suggestedGames",
  LIVE_CASINO_DETAILS: "Live Casino - Details Page",
};

// Those modals are implemented on react side. They can be spawned from knockout.
// Event KO_APP_EVENT_MODAL_HIDDEN will contain ID and RETURN_CODE of closed modal
export const REACT_APP_MODAL = {
  RETURN_CODE: {
    ACCEPTED: "ACCEPTED",
    CLOSED: "CLOSED",
    DISMISSED: "DISMISSED",
  },
  ID: {
    TERMS_AND_CONDITIONS_SPAIN: "TERMS_AND_CONDITIONS_SPAIN",
    DANISH_ENTRY_OVERLAY: "DANISH_ENTRY_OVERLAY",
    SLOT_CONTROL_SYSTEM_CONFIGURATION: "SLOT_CONTROL_SYSTEM_CONFIGURATION",
    SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT:
      "SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT",
    SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED:
      "SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED",
  },
};
// Those modals are implemented on knockout side, you can spawn them with Services/LaunchModalService

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
  DEPOSIT: { SHOW_BONUS_TERMS: "DEPOSIT/SHOW_BONUS_TERMS" },
  ERROR: "ERROR",
};

// Make sure that any flags you have here are also listed here, otherwise they will not work:
// https://github.com/Casumo/casumo-frontend/blob/a9ff0a7f4fcbf6141b9f803238be6eece822f708/web/common-frontend/src/js/config/params.js#L107
export const FEATURE_FLAGS = {
  SPORTS: "sports",
  TOP_LIST_CURATED_SHOW_ORIGINAL: "top-list-curated-show-original",
};

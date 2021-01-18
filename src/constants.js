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
export const KO_APP_EVENT_BETSLIP_VISIBLE = "KO_APP_EVENT/betslipVisible";

export const ROOT_SCROLL_ELEMENT_ID = "main-content-wrapper";

export const KO_EVENTS = {
  ACCOUNT_SETTINGS: {
    COMMAND_EXECUTED: "ACCOUNT_SETTINGS/COMMAND_EXECUTED",
  },
  VALUABLES: {
    ITEM_CREATED: "VALUABLES/ITEM_CREATED",
    ITEM_EXPIRED: "VALUABLES/ITEM_EXPIRED",
  },
};
export const DEVICES = {
  DESKTOP: "desktop",
  MOBILE: "mobile",
};

// todo: @chris.ciantar confirm if this is required anymore or not - GTM specific event field
export const APP_SUB_TYPES = {
  IOS_HYBRID: "ios hybrid",
  ANDROID_HYBRID: "android hybrid",
  ANDROID: "android-standalone",
  WEB: "web",
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
  PLAY_NATIVE: "PLAY_NATIVE",
  DEPOSIT: "DEPOSIT",
  PRACTICE: "PRACTICE",
  PRACTICE_NATIVE: "PRACTICE_NATIVE",
  TOP_LISTS: "TOP_LISTS",
  REEL_RACES: "REEL_RACES",
  GAMES: "GAMES",
  GAMES_SEARCH: "GAMES_SEARCH",
  GAME_DETAILS: "GAME_DETAILS",
  MUST_DROP_JACKPOTS: "MUST_DROP_JACKPOTS",
  GAME_PROVIDER_GAMES: "GAME_PROVIDER_GAMES",
  LIVE_CASINO: "LIVE_CASINO",
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
  CASINO_GAMES: "CASINO_GAMES",
  CASINO_GAMES_SLOTS: "CASINO_GAMES_SLOTS",
};

// As Native needs to be able to know about those routes via the Native bridge, if the new route you are
// adding is not present on casumo-frontend, the very route needs to be added here:
// https://github.com/Casumo/casumo-frontend/blob/master/web/mobile/gulp/generate-native-routing-config.js
export const ROUTES = {
  [ROUTE_IDS.LOGIN]: "log-in",
  [ROUTE_IDS.DEPOSIT]: "deposit",
  [ROUTE_IDS.PLAY]: "{{play}}/:slug/launch",
  [ROUTE_IDS.PRACTICE]: "practise/:slug/launch",
  [ROUTE_IDS.PLAY_NATIVE]: "gamelaunchers-play/:slug/launch",
  [ROUTE_IDS.PRACTICE_NATIVE]: "gamelaunchers-practise/:slug/launch",
  [ROUTE_IDS.GAME_DETAILS]: "{{play}}/:slug",
  [ROUTE_IDS.TOP_LISTS]: "{{games}}/top",
  [ROUTE_IDS.REEL_RACES]: "reel-races",
  [ROUTE_IDS.GAMES]: "{{games}}",
  [ROUTE_IDS.GAMES_SEARCH]: "{{games}}/search",
  [ROUTE_IDS.MUST_DROP_JACKPOTS]: "{{games}}/must-drop-jackpots",
  [ROUTE_IDS.GAME_PROVIDER_GAMES]: "{{games}}/provider/:provider",
  [ROUTE_IDS.LIVE_CASINO]: "{{games}}/live-casino",
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
  [ROUTE_IDS.CASINO_GAMES]: "{{casinoGames}}",
  [ROUTE_IDS.CASINO_GAMES_SLOTS]: "{{casinoGames}}/slots",
  [ROUTE_IDS.REEL_RACES]: "reel-races",
};

export const TRANSLATED_ROUTES = {
  GAMES: {
    sv: "spel",
    fi: "pelit",
    no: "spillvelger",
    de: "spiele",
    at: "spiele",
    DEFAULT: "games",
  },
  PLAY: {
    sv: "spela",
    fi: "pelaa",
    no: "spill",
    de: "spielen",
    at: "spielen",
    DEFAULT: "play",
  },
  CASINO_GAMES: {
    sv: "casinospel",
    fi: "kasinopelit",
    no: "casinospill",
    de: "casino-spiele",
    at: "casino-spiele",
    en: "casino-games",
    es: "casino-juegos",
    DEFAULT: "games-information",
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
  at_de: "at_de",
};

export const MARKETS_CONFIG = Object.freeze({
  default: {
    reelRacesHidden: false,
  },
  [MARKETS.se_sv]: {
    reelRacesHidden: true,
  },
});

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
  [MARKETS.at_de]: "at",
};

export const DEFAULT_LANGUAGE = LANGUAGES[MARKETS.___en];
export const DEFAULT_MARKET = MARKETS.___en;

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
  [MARKETS.at_de]: "de-AT",
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
  [MARKETS.at_de]: "at",
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
  DKK: "DKK",
  SEK: "SEK",
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
  MIXPANEL_REEL_RACE_SCHEDULE_CARD_OPT_IN_CLICKED:
    "Reel Race Schedule Card Opt In Clicked",
  MIXPANEL_PROMOTION_OPTED_IN: "Promotion opted in",
  MIXPANEL_SPORTS_LIVE_NAV_TOGGLE: "Sports Live Nav Toggled",
  MIXPANEL_SPORTS_NAV_SELECTED: "Sports Nav Selected",
  MIXPANEL_SPORTS_PAGEVIEW: "Sports Page View",
  MIXPANEL_SPORTS_SEARCH_INTENT: "Sports Search Intent",
  MIXPANEL_SPORTS_SEARCH_INITIATED: "Sports Search Initiated",
  MIXPANEL_SPORTS_SEARCH_CLICKED_SUGGESTION: "Sports Search Clicked Suggestion",
  MIXPANEL_SPORTS_SEARCH_CLICKED_RESULT: "Sports Search Clicked Result",
  MIXPANEL_SPORTS_ONBOARDING_START: "Sports Onboarding - starts",
  MIXPANEL_SPORTS_ONBOARDING_FAVORITE_SPORT_SELECTED:
    "Sports Onboarding - selected a favorite sport",
  MIXPANEL_SPORTS_ONBOARDING_FAVORITE_SPORT_DESELECTED:
    "Sports Onboarding - deselected a favorite sport",
  MIXPANEL_SPORTS_ONBOARDING_FAVORITE_SPORT_SELECTED_ALL:
    "Sports Onboarding - clicked all sports",
  MIXPANEL_SPORTS_ONBOARDING_LEAGUE_INTENT:
    "Sports Onboarding - add a league intent",
  MIXPANEL_SPORTS_ONBOARDING_COMPETITION_REMOVE:
    "Sports Onboarding - removed a league from edit sports",
  MIXPANEL_SPORTS_ONBOARDING_COMPETITION_ADDED:
    "Sports Onboarding - added a league from edit sports",
  MIXPANEL_SPORTS_ONBOARDING_CHOSE_LEAGUES: "Sports Onboarding - chose leagues",
  MIXPANEL_SPORTS_ONBOARDING_LEAGUE_DESELECTED:
    "Sports Onboarding - deselected a league from Edit Leagues",
  MIXPANEL_SPORTS_ONBOARDING_LEAGUE_SELECTED:
    "Sports Onboarding - selected a league from Edit Leagues",
  MIXPANEL_SPORTS_ONBOARDING_COUNTRY_EXPAND:
    "Sports Onboarding - expanded leagues of a Country",
  MIXPANEL_SPORTS_ONBOARDING_CHOSE_SPORTS: "Sports Onboarding - chose sports",
  MIXPANEL_SPORTS_HOME_CARD_CLICKED: "Sports Home - card clicked",
  MIXPANEL_SPORTS_HOME_FILTER_CLICKED: "Sports Home - filter clicked",
  MIXPANEL_SPORTS_HOME_MATCH_CLICKED: "Sports Home - match clicked",
  MIXPANEL_SPORTS_ADD_TO_BETSLIP: "Sports - add to betslip",
  MIXPANEL_SPORTS_BET_PLACED: "Sports - bet placed",
  MIXPANEL_SPORTS_FIRST_BET_PLACED: "Sports - first bet placed",
  MIXPANEL_PROMOTION_CLICKED: "Promotion Clicked",
  MIXPANEL_PROMOTION_VIEWED: "Promotion Viewed",
  MIXPANEL_GAME_FAVOURITE_CLICKED: "Game Favourite Clicked",
  MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED: "In game live chat clicked",
  MIXPANEL_IN_GAME_SUMOTICON_CLICKED: "Sumoticon - in game drawer clicked",
  MIXPANEL_IN_GAME_EXIT_GAME_CLICKED: "RETCAS - In-Game Exit Game Clicked",
  MIXPANEL_IN_GAME_CLOSE_DRAWER_CLICKED: "In game drawer close icon clicked",
  MIXPANEL_IN_GAME_SWIPEUP_DISMISSED: "RETCAS - Dismiss button clicked",
  MIXPANEL_GAME_SET_CLICKED: "Game Set Clicked",
  MIXPANEL_GAME_SET_SORTING_CLICKED: "Sorting Clicked",
  MIXPANEL_GAME_SET_SORTING_OPTION_CLICKED: "Sorting Option Clicked",
  MIXPANEL_GAME_SET_FILTERING_CLICKED: "Filtering Clicked",
  MIXPANEL_GAME_SET_FILTERING_OPTION_CLICKED: "Filtering Option Clicked",
  MIXPANEL_QUICK_DEPOSIT_PROCESS_INITIATED:
    "RETPAY - Quick Deposit Process Initiated",
  MIXPANEL_QUICK_DEPOSIT_CURRENCY_SIGN_CLICKED:
    "RETPAY - Deposit Currency Sign Clicked",
  MIXPANEL_QUICK_DEPOSIT_PRE_DEFINED_AMOUNT_ADJUSTED:
    "RETPAY - Pre Defined Amount Adjusted",
  MIXPANEL_QUICK_DEPOSIT_CARD_NUMBER_CLICKED: "RETPAY - Card Number Clicked",
  MIXPANEL_QUICK_DEPOSIT_ENABLED_BUTTON_CLICKED:
    "RETPAY - Enabled Deposit Button Clicked",
  MIXPANEL_QUICK_DEPOSIT_DISABLED_BUTTON_CLICKED:
    "RETPAY - Disabled Deposit Button Clicked",
  MIXPANEL_QUICK_DEPOSIT_3DS_STEP_STARTED: "RETPAY - 3DSecure Step Started",
  MIXPANEL_QUICK_DEPOSIT_3DS_STEP_SUCCESS: "RETPAY - 3DSecure Step Success",
  MIXPANEL_QUICK_DEPOSIT_3DS_STEP_FAILED: "RETPAY - 3DSecure Step Failed",
  MIXPANEL_QUICK_DEPOSIT_STEP_SUCCESS: "RETPAY - Quick Deposit Process Success",
  MIXPANEL_QUICK_DEPOSIT_STEP_FAILED: "RETPAY - Quick Deposit Process Failed",
  MIXPANEL_EXIT_GAME_STEP_STARTED: "RETPAY - Exit Game Step Started",
  MIXPANEL_CASHIER_LINK_CLICKED: "RETPAY - Cashier Link Clicked",
  MIXPANEL_EXIT_GAME_NOTIFICATION_CLICKED:
    "RETPAY - Close Exit Game Notification Clicked",
  MIXPANEL_MAKE_DEPOSIT_BUTTON_CLICKED: "RETPAY - Make Deposit Button Clicked",
  MIXPANEL_EXIT_GAME_STEP_COMPLETED: "RETPAY - Exit Game Step Completed",
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
  SPORTS_ID: "sport id",
  SPORTS_NAME: "sport name",
  SPORTS_SELECTED: "sports selected",
  SPORTS_SELECTED_NUMBER: "number of sports selected",
  SPORTS_EVENT_NAME: "event name",
  SPORTS_EVENT_ID: "event id",
  LEAGUES_SELECTED: "leagues selected",
  LEAGUES_SELECTED_NUMBER: "number of leagues selected",
  COMPETITION_ID: "league id",
  COMPETITION_NAME: "league name",
  COUNTRY_ID: "country id",
  COUNTRY_NAME: "country name",
  PROMOTION_TYPE: "promotion type",
  IS_FAVOURITE: "Is Favourite",
  GAME_PLAY_TYPE: "Game play type",
  TYPE: "type",
  STAKE: "stake",
  CATEGORY: "category",
};

export const EVENT_LOCATIONS = {
  SEARCH_GAMES: "searchGames",
  ALL_GAMES: "allGames",
  LATEST_PLAYED_GAMES: "latestPlayedGames",
  POPULAR_GAMES: "popularGames",
  SUGGESTED_GAMES: "suggestedGames",
  LIVE_CASINO: "Live Casino - Details Page",
  GAME_DETAILS: "Game details",
  GAME_SET: "Game Set: {{location}}",
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
    PIQ_REDIRECTION_IFRAME_MODAL: "PIQ_REDIRECTION_IFRAME_MODAL",
    SLOT_CONTROL_SYSTEM_CONFIGURATION: "SLOT_CONTROL_SYSTEM_CONFIGURATION",
    SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT:
      "SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT",
    SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED:
      "SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED",
    TIME_LIMITS_FORM: "TIME_LIMITS_FORM",
    REALITY_CHECK: "REALITY_CHECK",
    QUIT_GAME_NOTIFICATION: "QUIT_GAME_NOTIFICATION",
    WAGERING_NOTIFICATION: "WAGERING_NOTIFICATION",
    GAME_PAGE_RR_LEADERBOARD: "GAME_PAGE_RR_LEADERBOARD",
    GGL_POST_PANIC_BUTTON: "GGL_POST_PANIC_BUTTON",
    GGL_PRE_PANIC_BUTTON: "GGL_PRE_PANIC_BUTTON",
    PAYMENT_RESULT: "PAYMENT_RESULT",
    CONTENT_HTML: "CONTENT_HTML",
    REEL_RACES_TAC: "REEL_RACES_TAC",
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

export const GAMES_LIST_HORIZONTAL_ITEMS_LIMIT = 20;
export const GAMES_LIST_HORIZONTAL_JACKPOTS_ITEMS_LIMIT = 21;

export const JURISDICTIONS = {
  DGA: "DGA",
  DGOJ: "DGOJ",
  MGA: "MGA",
  SGA: "SGA",
  UKGC: "UKGC",
  GGL: "GGL",
};

export const POLL_INTERVAL = {
  GAMES_LIST: 30000,
  JACKPOTS: 30000,
  JACKPOTS_MUST_DROP: 30000,
  REEL_RACES: 8000,
};

export const EMBEDDED_GAMES = {
  ACTIVE: false,
  TESTERS: [
    "mariusz.klinger+test@casumo.com",
    "boguslaw.parol@casumo.com",
    "lukasz.kowalski@casumo.com",
    "chris.scicluna@casumo.com",
    "peter.noer@casumo.com",
    "stephen.marshall@casumo.com",
    "ms@50script.com",
    "sebastian.steek@casumo.com",
    "boguslaw.parol+30@casumo.com",
    "andre.formosa@casumo.com",
    "daniel.gauci@gmail.com",
    "peter.noer+TEST00070@casumo.com",
    "mark.busuttil@casumo.com",
    "alessandro.pontes@casumo.com",
    "Elisabeth.isaksson@casumo.com",
    "integrations+7@casumo.com",
    "peter.noer+THERKILD418@casumo.com",
    "theis.warmdahl+dk5@casumo.com",
  ],
};

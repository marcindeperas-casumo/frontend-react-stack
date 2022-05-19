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
export const REACT_APP_EVENT_PAYMENT_METHOD_SELECTED =
  "REACT_APP_EVENT/paymentMethodSelected";
export const REACT_APP_EVENT_GET_PAYMENTS_PERMISSIONS =
  "REACT_APP_EVENT/getPaymentsPermissions";

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
export const KO_APP_EVENT_IGNORE_DEPOSIT_BONUSES =
  "KO_APP_EVENT/ignoreDepositBonuses";
export const KO_APP_EVENT_SHOW_BONUS_TERMS = "KO_APP_EVENT/showBonusTerms";
export const KO_APP_EVENT_BETSLIP_VISIBLE = "KO_APP_EVENT/betslipVisible";
export const KO_APP_EVENT_PAYMENTS_PERMISSIONS_CHANGED =
  "KO_APP_EVENT/paymentsPermissionsChanged";

export const ROOT_SCROLL_ELEMENT_ID = "main-content-wrapper";

export const KO_EVENTS = {
  ACCOUNT_SETTINGS: {
    COMMAND_EXECUTED: "ACCOUNT_SETTINGS/COMMAND_EXECUTED",
  },
  VALUABLES: {
    ITEM_CREATED: "VALUABLES/ITEM_CREATED",
    ITEM_EXPIRED: "VALUABLES/ITEM_EXPIRED",
  },
} as const;
export const DEVICES = {
  DESKTOP: "desktop",
  MOBILE: "mobile",
} as const;

// todo: @chris.ciantar confirm if this is required anymore or not - GTM specific event field
export const APP_SUB_TYPES = {
  IOS_HYBRID: "ios hybrid",
  ANDROID_HYBRID: "android hybrid",
  ANDROID: "android-standalone",
  WEB: "web",
} as const;

export const ENVIRONMENTS = {
  TEST: "test",
  PRODUCTION: "production",
} as const;

export const GAME_CATEGORIES = {
  SLOT_MACHINE: "SLOT_MACHINE",
};

export const GAME_CATEGORIES_MAP = {
  SLOT_MACHINE: "SLOTS",
};

export const STORE_REHYDRATE = "REHYDRATE";
export const STORE_PERSISTED_STATE_KEY = "persistedState";
export const LOW_RES_IMAGE_SETTINGS = { w: 5, blur: 2000 };
export const DEVICE_PIXEL_RATIO = Math.ceil(window.devicePixelRatio);
export const GAME_LIST_IDS = {
  POPULAR_GAMES: "popularGames",
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
} as const;

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
  GAME_EXCLUDED: "GAME_EXCLUDED",
  MUST_DROP_JACKPOTS: "MUST_DROP_JACKPOTS",
  GAME_PROVIDER_GAMES: "GAME_PROVIDER_GAMES",
  LIVE_CASINO: "LIVE_CASINO",
  LIVE_CASINO_SEARCH: "LIVE_CASINO_SEARCH",
  PROMOTIONS: "PROMOTIONS",
  PROMOTION_DETAILS: "PROMOTION_DETAILS",
  JACKPOTS_DETAILS: "JACKPOTS_DETAILS",
  JACKPOT_EXPLAINER: "JACKPOT_EXPLAINER",
  PLAYER_DASHBOARD: "PLAYER_DASHBOARD",
  PLAYER_VALUABLES: "PLAYER_VALUABLES",
  PLAYER_SETTINGS: "PLAYER_SETTINGS",
  PLAYER_SETTINGS_NOTIFICATIONS: "PLAYER_SETTINGS_NOTIFICATIONS",
  PLAYER_SETTINGS_ACCOUNT_DETAILS: "PLAYER_SETTINGS_ACCOUNT_DETAILS",
  PLAYER_SETTINGS_REALITY_CHECK: "PLAYER_SETTINGS_REALITY_CHECK",
  PLAYER_PLAY_OKAY_SETTINGS: "PLAYER_PLAY_OKAY_SETTINGS",
  PLAYER_PLAY_OKAY_SETTINGS_REVIEW: "PLAYER_PLAY_OKAY_SETTINGS_REVIEW",
  SPORTS: "SPORTS",
  TRANSACTION_HISTORY: "TRANSACTION_HISTORY",
  TRANSACTION_HISTORY_BETS: "TRANSACTION_HISTORY_BETS",
  TRANSACTION_ANNUAL_OVERVIEW: "TRANSACTION_ANNUAL_OVERVIEW",
  CASH_DEPOSIT: "CASH_DEPOSIT",
  PLAY_OKAY: "PLAY_OKAY",
  FAQ: "FAQ",
  ABOUT_CASUMO: "ABOUT_CASUMO",
  CASINO_GAMES: "CASINO_GAMES",
  MAHJONG_PAGE: "MAHJONG_PAGE",
  CASINO_GAMES_SLOTS: "CASINO_GAMES_SLOTS",
  CAMPAIGN_TERMS: "CAMPAIGN_TERMS",
} as const;

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
  [ROUTE_IDS.LIVE_CASINO]: "live-casino",
  [ROUTE_IDS.LIVE_CASINO_SEARCH]: "live-casino/search",
  [ROUTE_IDS.PROMOTIONS]: "{{promotions}}",
  [ROUTE_IDS.PROMOTION_DETAILS]: "{{promotions}}/:slug",
  [ROUTE_IDS.JACKPOTS_DETAILS]: "jackpots/:slug",
  [ROUTE_IDS.JACKPOT_EXPLAINER]: "jackpot-explainer/:slug",
  [ROUTE_IDS.GAME_EXCLUDED]: "game-excluded",
  [ROUTE_IDS.PLAYER_DASHBOARD]: "player",
  [ROUTE_IDS.PLAYER_VALUABLES]: "player/valuables",
  [ROUTE_IDS.PLAYER_SETTINGS]: "player/settings",
  [ROUTE_IDS.PLAYER_SETTINGS_NOTIFICATIONS]: "player/settings/notifications",
  [ROUTE_IDS.PLAYER_SETTINGS_ACCOUNT_DETAILS]:
    "player/settings/account-details",
  [ROUTE_IDS.PLAYER_SETTINGS_REALITY_CHECK]: "player/settings/reality-check",
  [ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS]: "player/play-okay-settings",
  [ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS_REVIEW]:
    "player/play-okay-settings-review",
  [ROUTE_IDS.SPORTS]: "sports",
  [ROUTE_IDS.TRANSACTION_HISTORY]: "cash/history",
  [ROUTE_IDS.TRANSACTION_HISTORY_BETS]: "cash/history/bets",
  [ROUTE_IDS.TRANSACTION_ANNUAL_OVERVIEW]:
    "cash/history/transactions-annual-overview/:selectedYear",
  [ROUTE_IDS.CASH_DEPOSIT]: "cash/deposit",
  [ROUTE_IDS.PLAY_OKAY]: "{{playOkay}}",
  [ROUTE_IDS.FAQ]: "faq",
  [ROUTE_IDS.ABOUT_CASUMO]: "about-casumo",
  [ROUTE_IDS.CASINO_GAMES]: "{{casinoGames}}",
  [ROUTE_IDS.MAHJONG_PAGE]: "mahjong",
  [ROUTE_IDS.CASINO_GAMES_SLOTS]: "{{casinoGames}}/slots",
  [ROUTE_IDS.REEL_RACES]: "reel-races",
  [ROUTE_IDS.CAMPAIGN_TERMS]: "terms/campaign/:slug",
} as const;

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
    es: "jugar",
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
  PROMOTIONS: {
    dk: "kampagner",
    sv: "kampanjer",
    no: "kampanjer",
    fi: "kampanjat",
    de: "aktionen",
    at: "aktionen",
    es: "promociones",
    DEFAULT: "promotions",
  },
  PLAY_OKAY: {
    es: "juega-bien",
    DEFAULT: "play-okay",
  },
} as const;

export const COMPLIANCE_STATE_PROPERTY = {
  DGA: "DGA",
  AML: "AML",
} as const;

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
  ie_en: "ie_en",
} as const;
export type TMarket = ValueOf<typeof MARKETS>;

export const MARKETS_CONFIG = {
  default: {
    reelRacesHidden: false,
  },
  [MARKETS.se_sv]: {
    reelRacesHidden: true,
  },
} as const;

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
  [MARKETS.ie_en]: "ie",
  nl_NL: "nl", //quick fix for not showing CuratedCard for the Netherland players
} as const;
export type TLanguage = ValueOf<typeof LANGUAGES>;

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
  [MARKETS.ie_en]: "en-IE",
} as const;

export type TLocale = typeof INTL_LOCALES[keyof typeof INTL_LOCALES];

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
  [MARKETS.ie_en]: "ie",
} as const;

export const STRAPI_LOCALES = {
  [MARKETS.___en]: "en-GB",
  [MARKETS.ca_en]: "en-CA",
  [MARKETS.de_de]: "en-GB",
  [MARKETS.dk_da]: "en-GB",
  [MARKETS.fi_fi]: "fi",
  [MARKETS.gb_en]: "en-GB",
  [MARKETS.in_en]: "en-IN",
  [MARKETS.no_no]: "nn-NO",
  [MARKETS.se_sv]: "sv",
  [MARKETS.es_es]: "es-ES",
  [MARKETS.nz_en]: "en-GB",
  [MARKETS.jp_ja]: "ja",
  [MARKETS.at_de]: "de-AT",
  [MARKETS.ie_en]: "en-IE",
} as const;

export const CURRENCY_SYMBOLS = {
  EUR: "\u20AC", // €
  GBP: "\u00A3", // £
  DKK: "kr.",
  NOK: "kr",
  SEK: "kr",
  CAD: "\u0024", // $
  NZD: "\u0024", // $
  INR: "\u20B9", // ₹
  USD: "\u0024", // $
} as const;

export const CURRENCIES = {
  EUR: "EUR",
  GBP: "GBP",
  DKK: "DKK",
  NOK: "NOK",
  SEK: "SEK",
  CAD: "CAD",
  NZD: "NZD",
  INR: "INR",
  USD: "USD",
} as const;
export type TCurrencyCode = ValueOf<typeof CURRENCIES>; // ISO 4217

export const VERTICALS = {
  SPORTS: "SPORTS",
  CASINO: "CASINO",
} as const;

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
  MIXPANEL_SPORTS_ADD_TO_BETSLIP_CASUMO:
    "Sports - add to betslip by casumo component",
  MIXPANEL_SPORTS_REMOVED_FROM_BETSLIP_CASUMO:
    "Sports - removed from betslip by casumo component",
  MIXPANEL_SPORTS_BET_PLACED: "Sports - bet placed",
  MIXPANEL_SPORTS_FIRST_BET_PLACED: "Sports - first bet placed",
  MIXPANEL_SPORTS_DEPOSIT_CLICKED: "Sports deposit component clicked",
  MIXPANEL_SPORTS_BETSLIP_DEPOSIT_CLICKED: "Sports - betslip deposit clicked",
  MIXPANEL_SPORTS_BET_FAILED: "Sports - bet placement failed for lack of funds",
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
  MIXPANEL_SPORTS_CELEBRATION_MODAL_OPEN: "SPORTS - celebration modal open",
  MIXPANEL_LOW_BALANCE_NOTIFICATION_CTA_DEPOSIT:
    "Low balance notification deposit CTA Started",
  MIXPANEL_VALUABLE_USE_CTA: "Valuable Claimed",
} as const;

export const EVENT_PROPS = {
  LOCATION: "location",
  GAME_NAME: "name",
  CURATED_TYPE: "type",
  CURATED_SLUG: "slug",
  OPTED_IN: "opted in",
  SPORTS_STATE: "State",
  SPORTS_SELECTED_NAV: "Sports",
  SPORTS_IS_LIVE_ACTIVE: "Is Live",
  SPORTS_NAV_BUTTON_ORDER: "order",
  SPORTS_PAGE_TYPE: "type",
  SPORTS_PAGE_TITLE: "title",
  SPORTS_PAGE_PATH: "path",
  SPORTS_ID: "sport id",
  SPORTS_NAME: "sport name",
  SPORTS_SELECTED: "sports selected",
  SPORTS_SELECTED_NUMBER: "number of sports selected",
  SPORTS_EVENT_NAME: "event name",
  SPORTS_EVENT_ID: "event id",
  SPORTS_OUTCOME_ID: "outcome id",
  SPORTS_COMPONENT: "sports component",
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
  BALANCE: "balance",
  BET_VALUE: "bet value",
  MARKET: "market",
} as const;

export const EVENT_LOCATIONS = {
  SEARCH_GAMES: "searchGames",
  ALL_GAMES: "allGames",
  LATEST_PLAYED_GAMES: "latestPlayedGames",
  POPULAR_GAMES: "popularGames",
  SUGGESTED_GAMES: "suggestedGames",
  LIVE_CASINO: "Live Casino - Details Page",
  GAME_DETAILS: "Game details",
  GAME_SET: "Game Set: {{location}}",
} as const;

// Those modals are implemented on react side. They can be spawned from knockout.
// Event KO_APP_EVENT_MODAL_HIDDEN will contain ID and RETURN_CODE of closed modal
export const REACT_APP_MODAL = {
  RETURN_CODE: {
    ACCEPTED: "ACCEPTED",
    CLOSED: "CLOSED",
    DISMISSED: "DISMISSED",
  },
  ID: {
    JACKPOT_TERMS_AND_CONDITIONS: "JACKPOT_TERMS_AND_CONDITIONS",
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
    GGL_FIVE_MINUTE_BREAK_ONGOING: "GGL_FIVE_MINUTE_BREAK_ONGOING",
    GGL_FIVE_MINUTE_BREAK_FINISHED: "GGL_FIVE_MINUTE_BREAK_FINISHED",
    GGL_FIVE_MINUTE_BREAK_REEL_RACE: "GGL_FIVE_MINUTE_BREAK_REEL_RACE",
    PAYMENT_RESULT: "PAYMENT_RESULT",
    CONTENT_HTML: "CONTENT_HTML",
    REEL_RACES_TAC: "REEL_RACES_TAC",
    ARTICLE_MODAL: "ARTICLE_MODAL",
    JACKPOT_INGAME_ONBOARDING: "JACKPOT_INGAME_ONBOARDING",
    EXCLUDED_GAME: "EXCLUDED_GAME",
    ACCOUNT_WARM_UP: "ACCOUNT_WARM_UP",
    PLAY_OKAY_GAME_TYPE_EXCLUSION: "PLAY_OKAY_GAME_TYPE_EXCLUSION",
  },
} as const;
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
} as const;

// Make sure that any flags you have here are also listed here, otherwise they will not work:
// https://github.com/Casumo/casumo-frontend/blob/a9ff0a7f4fcbf6141b9f803238be6eece822f708/web/common-frontend/src/js/config/params.js#L107
export const FEATURE_FLAGS = {
  SPORTS: "sports",
  TOP_LIST_CURATED_SHOW_ORIGINAL: "top-list-curated-show-original",
} as const;

export const GAMES_LIST_HORIZONTAL_ITEMS_LIMIT = 30;
export const GAMES_LIST_HORIZONTAL_JACKPOTS_ITEMS_LIMIT = 31;

export const JURISDICTIONS = {
  DGA: "DGA",
  DGOJ: "DGOJ",
  MGA: "MGA",
  SGA: "SGA",
  UKGC: "UKGC",
  GGL: "GGL",
  GRA: "GRA",
  AGCO: "AGCO",
} as const;
export type TJurisdiction = ValueOf<typeof JURISDICTIONS>;

export const DEFAULT_EXCLUDED_GAME_ERROR_CODE = 601;
export const GAMEPLAY_MODES = {
  FUN: "FUN",
  REAL: "REAL",
};

export const LIVE_CASINO_STATES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};

export const POLL_INTERVAL = {
  GAMES_LIST: 1800000, //30min
  JACKPOTS: 30000,
  JACKPOTS_MUST_DROP: 30000,
  REEL_RACES: 8000,
} as const;

export const EMBEDDED_GAMES = {
  ACTIVE: false,
  TESTERS: [
    "andre.formosa@casumo.com",
    "daniel.gauci@casumo.com",
    "daniel.gauci@gmail.com",
    "mariusz.klinger+valuables@casumo.com",
    "oleksii.pelekh@casumo.com",
    "lukasz.kowalski@casumo.com",
    "chris.scicluna@casumo.com",
    "peter.noer@casumo.com",
    "ms@50script.com",
    "sebastian.steek@casumo.com",
    "andre.formosa@casumo.com",
    "peter.noer+TEST00070@casumo.com",
    "mark.busuttil@casumo.com",
    "alessandro.pontes@casumo.com",
    "Elisabeth.isaksson@casumo.com",
    "integrations+7@casumo.com",
    "peter.noer+THERKILD418@casumo.com",
    "theis.warmdahl+dk5@casumo.com",
  ] as string[],
} as const;

export const topListWidgetWidth = 328;
export const topListWidgetHeight = 304;
export const topListWidgetHeightTwoRows = 198;
export const exclusiveTileHeight = 280;
export const exlusiveTileWidth = 188;
export const promotionsTileHeight = 348;

export const horizontalListsDevicePaddings = {
  default: "md",
  tablet: "3xlg",
  desktop: "none",
};

export const horizontalListDeviceTopMargin = {
  default: "lg",
  tablet: "xlg",
  desktop: "xlg",
};

export const LOCAL_STORAGE_GAME_LAUNCH_LOCATION = "lastGameLaunchLocation";

export const PUSHER_CONSTANTS = {
  CONFIG_URL_STAGING:
    "https://am-events-staging.fasttrack-solutions.com/api/v1/config/casumo",
  CONFIG_URL_PRODUCTION:
    "https://am-events.fasttrack-solutions.com/api/v1/config/casumo",
  externalSessionURL:
    "/casino-player/fasttrack-realtime-integration/api/v1/session-mapping",
  pusherChannelnamePrefix: "private-prisma-16-",
  pusherEvents: [
    "pusher:subscription_succeeded",
    "crm_campaign",
    "system_alerts",
    "player_message",
    "fraud_kyc",
  ],
  pageLoadControllerEndPoint:
    "/casino-player/fasttrack-realtime-integration/api/v1/page-load",
  pusherSubscriptionSuccessEvent: "pusher:subscription_succeeded",
  backGroundImageColors: {
    top_card_pink:
      "https://cms.casumo.com/wp-content/uploads/2021/11/05-Modal-Artwork_Message-C.png",
    top_card_orange:
      "https://cms.casumo.com/wp-content/uploads/2021/11/07-Modal-Artwork_Message-D.png",
    top_card_purple:
      "https://cms.casumo.com/wp-content/uploads/2021/11/01-Modal-Artwork_Message-A.png",
    top_card_light_purple:
      "https://cms.casumo.com/wp-content/uploads/2021/11/03-Modal-Artwork_Message-B.png",
  },
};

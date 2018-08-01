// REACT_APP* events are events that the react app will be responsible to react
// to.
export const REACT_APP_EVENT_ON_LOGIN = "REACT_APP_EVENT/onLogin";
export const REACT_APP_EVENT_ALL_PORTALS_CLEAR =
  "REACT_APP_EVENT/allPortalsClear";
export const REACT_APP_EVENT_ROUTE_CHANGE = "REACT_APP_EVENT/routeChange";

// KO_APP* events are events that the KO app will be responsible to react
// to.
export const KO_APP_EVENT_LAUNCH_GAME = "KO_APP_EVENT/launchGame";

// Skeleton needs to be guessed for redenring before the data kicks in
export const SKELETON_LIST_MOCK = [
  { id: "popularGames", display: "tiles" },
  { id: "liveCasinoGames", display: "cards" },
  { id: "newGames", display: "tiles" },
  { id: "casumoFavouriteGames", display: "tiles" },
  { id: "casumoJackpotGames", display: "tiles" },
];

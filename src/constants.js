// REACT_APP* events are events that the react app will be responsible to react
// to.
export const REACT_APP_EVENT_ON_LOGIN = "REACT_APP_EVENT/onLogin";
export const REACT_APP_EVENT_ALL_PORTALS_CLEAR =
  "REACT_APP_EVENT/allPortalsClear";
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

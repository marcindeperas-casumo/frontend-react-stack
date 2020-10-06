// @flow
export const urls = {
  sdkBundle: "https://sdk.bluerbn.com/br-sdk-1.2.57.js",
  baseService: "api.demo00.bluerbn.com",
  loginAnonymous:
    "/casino-player/blueribbon-jackpot-integration/api/v1/login/anonymous",
  loginAuthenticated:
    "/casino-player/blueribbon-jackpot-integration/api/v1/login/player",
  handshake: "/casino-player/blueribbon-jackpot-integration/api/v1/handshake",
};
export const operatorId = "Vuodd1597935177986";
export const jackpotWidgetContentPage = "blue-ribbon-christmas.jackpots-widget";
export type JackpotWidgetContentPage = {
  mini: string,
  mini_icon: string,
  major: string,
  major_icon: string,
  mega_community: string,
  mega_community_explanation: string,
  mega_community_icon: string,
  mega_single_winner: string,
  mega_single_winner_explanation: string,
  mega_single_winner_icon: string,
  section_title: string,
};
export const jackpotWidgetWidth = 313;
export const colors = {
  jackpotWidgetPurpleDark: "#0A0449",
  jackpotWidgetPurpleLight: "#330887",
};

// @flow
export const urls = {
  sdkBundle: "https://sdk.bluerbn.com/br-sdk-1.2.59.js",
  loginAnonymous:
    "/casino-player/blueribbon-jackpot-integration/api/v1/login/anonymous",
  loginAuthenticated:
    "/casino-player/blueribbon-jackpot-integration/api/v1/login/player",
  handshake: "/casino-player/blueribbon-jackpot-integration/api/v1/handshake",
};
export const blueRibbonGamesListId = "blueRibbonChristmas";
export const baseConfig = {
  development: {
    operatorId: "Vuodd1597935177986",
    baseServiceUrl: "https://api.demo00.bluerbn.com",
  },
  production: {
    operatorId: "dddJB1601558248862",
    baseServiceUrl: "https://api.bluerbn.com",
  },
};
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
  continue_playing: string,
  jackpot_win_mini: string,
  jackpot_win_major: string,
  jackpot_win_mega: string,
  community_jackpot_win: string,
  community_jackpot_win_amount: string,
  community_jackpot_win_icon: string,
  community_jackpot_win_pot_restart: string,
  blizzard_campaign_image: string,
  blizzard_campaign_content: string,
  campaign_logo: string,
  eligible_games_cta_label: string,
  jackpot_split_explanation: string,
};
export const jackpotWidgetWidth = 313;
export const jackpotWidgetInGameWidth = 359;
export const colors = {
  jackpotWidgetPurpleDark: "#0A0449",
  jackpotWidgetPurpleLight: "#330887",
  jackpotWinAmountBorder: "#955A04",
  jackpotWinBackground: "rgba(39, 12, 90, 0.8)",
};

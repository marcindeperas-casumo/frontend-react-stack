// @flow
import type { JackpotInfo } from "./jackpotInfo";
import type { liveCasinoLobby } from "./liveCasinoLobby";
export type Game = {
  name: string,
  title: string, // new api, can be renamed?
  slug: string,
  logoBackground: string,
  backgroundImage: string, // new api, can be renamed?
  logo: string,
  hasPlayForFun: boolean,
  inMaintenanceMode: boolean,
  jackpotInfo: void | JackpotInfo,
  jackpotId: void | string,
  tableId: void | string,
  lobby: liveCasinoLobby,
};

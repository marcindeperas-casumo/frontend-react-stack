// @flow
import type { JackpotInfo } from "./jackpotInfo";
import type { liveCasinoLobby } from "./liveCasinoLobby";
export type Game = {
  name: string, // deprecated
  title: string, // new api
  slug: string,
  logoBackground: string, // deprecated
  backgroundImage: string, // new api
  logo: string,
  hasPlayForFun: boolean,
  inMaintenanceMode: boolean,
  jackpotInfo: void | JackpotInfo,
  jackpotId: void | string,
  tableId: void | string,
  lobby: liveCasinoLobby,
};

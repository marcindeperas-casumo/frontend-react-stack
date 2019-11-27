// @flow
import type { Jackpot } from "./jackpot";
import type { liveCasinoLobby } from "./liveCasinoLobby";
export type Game = {
  name: string,
  slug: string,
  logoBackground: string,
  logo: string,
  hasPlayForFun: boolean,
  inMaintenanceMode: boolean,
  jackpot: ?Jackpot,
  jackpotId: void | string,
  tableId: void | string,
  lobby: liveCasinoLobby,
};

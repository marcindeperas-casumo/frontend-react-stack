// @flow
import type { JackpotInfo } from "./jackpotInfo";
export type Game = {
  name: string,
  slug: string,
  logoBackground: string,
  logo: string,
  hasPlayForFun: boolean,
  inMaintenanceMode: boolean,
  jackpotInfo: void | JackpotInfo,
  jackpotId: void | string,
  tableId: void | string,
};

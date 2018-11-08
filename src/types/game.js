// @flow
export type Game = {
  name: string,
  slug: string,
  logoBackground: string,
  logo: string,
  hasPlayForFun: boolean,
  inMaintenanceMode: boolean,
  jackpotInfo: void | Object,
  jackpotId: void | string,
  tableId: void | string,
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GameRow_Game
// ====================================================

export type GameRow_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};

export type GameRow_Game_lobby = {
  bets: ?GameRow_Game_lobby_bets
};

export type GameRow_Game_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};

export type GameRow_Game = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?GameRow_Game_lobby,
  jackpotInfo: ?GameRow_Game_jackpotInfo,
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type PlayerValuableState = "Consumed" | "Expired" | "Fresh" | "Locked" | "Used";

/**
 * 
 */
export type ValuableType = "cash" | "deposit" | "spins" | "sport";

/**
 * 
 */
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";

/**
 * 
 */
export type RequirementType = "deposit" | "wager";

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================
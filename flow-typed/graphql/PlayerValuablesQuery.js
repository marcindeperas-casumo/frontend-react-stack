/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game = {
  name: string,
  backgroundImage: string,
};

export type PlayerValuablesQuery_player_valuables = {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: SimplePlayerValuableType,
  title: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: SimplePlayerValuableType,
  title: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  coinValue: number,
  game: PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game,
};

export type PlayerValuablesQuery_player = {
  valuables: Array<?PlayerValuablesQuery_player_valuables>
};

export type PlayerValuablesQuery = {
  listTitle: string,
  player: PlayerValuablesQuery_player,
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type PlayerValuableState = "Consumed" | "Expired" | "Fresh" | "Used";

/**
 * 
 */
export type SimplePlayerValuableType = "cash" | "deposit" | "spins";

/**
 * 
 */
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================
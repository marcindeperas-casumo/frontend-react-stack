/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PLAYER_LOGIN_HISTORY_QUERY
// ====================================================

export type PLAYER_LOGIN_HISTORY_QUERY_player_loginHistory = {
  loginTime: any
};

export type PLAYER_LOGIN_HISTORY_QUERY_player = {
  id: string,
  loginHistory: Array<PLAYER_LOGIN_HISTORY_QUERY_player_loginHistory>,
};

export type PLAYER_LOGIN_HISTORY_QUERY = {
  player: PLAYER_LOGIN_HISTORY_QUERY_player
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
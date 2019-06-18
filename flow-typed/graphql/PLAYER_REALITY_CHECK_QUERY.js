/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PLAYER_REALITY_CHECK_QUERY
// ====================================================

export type PLAYER_REALITY_CHECK_QUERY_player_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};

export type PLAYER_REALITY_CHECK_QUERY_player_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: PLAYER_REALITY_CHECK_QUERY_player_playOk_realityCheck,
};

export type PLAYER_REALITY_CHECK_QUERY_player = {
  id: string,
  __typename: "Player",
  playOk: PLAYER_REALITY_CHECK_QUERY_player_playOk,
};

export type PLAYER_REALITY_CHECK_QUERY = {
  player: PLAYER_REALITY_CHECK_QUERY_player
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
/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PLAYER_SETTINGS_LABELS_QUERY
// ====================================================

export type PLAYER_SETTINGS_LABELS_QUERY = {
  name: string,
  email: string,
  password: string,
  mobileNumber: string,
  address: string,
  edit: string,
  gamblingExtent: string,
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
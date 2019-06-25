/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetContactByPhone
// ====================================================

export type SetContactByPhone = {
  setContactByPhone: ?boolean
};

export type SetContactByPhoneVariables = {
  input?: ?ContactSettingsInput
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
/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Contact_Settings_Player_adventurerPublic
// ====================================================

export type Contact_Settings_Player_adventurerPublic_details_contactSettings = {
  adventurerPublic: boolean
};

export type Contact_Settings_Player_adventurerPublic_details = {
  contactSettings: Contact_Settings_Player_adventurerPublic_details_contactSettings
};

export type Contact_Settings_Player_adventurerPublic = {
  __typename: "Player",
  details: Contact_Settings_Player_adventurerPublic_details,
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
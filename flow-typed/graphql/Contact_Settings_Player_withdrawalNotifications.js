/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Contact_Settings_Player_withdrawalNotifications
// ====================================================

export type Contact_Settings_Player_withdrawalNotifications_details_contactSettings = {
  withdrawalNotifications: boolean
};

export type Contact_Settings_Player_withdrawalNotifications_details = {
  contactSettings: Contact_Settings_Player_withdrawalNotifications_details_contactSettings
};

export type Contact_Settings_Player_withdrawalNotifications = {
  __typename: "Player",
  details: Contact_Settings_Player_withdrawalNotifications_details,
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

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================
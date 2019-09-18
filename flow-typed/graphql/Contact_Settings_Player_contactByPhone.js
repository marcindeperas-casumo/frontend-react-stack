/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Contact_Settings_Player_contactByPhone
// ====================================================

export type Contact_Settings_Player_contactByPhone_details_contactSettings = {
  contactByPhone: boolean
};

export type Contact_Settings_Player_contactByPhone_details = {
  contactSettings: Contact_Settings_Player_contactByPhone_details_contactSettings
};

export type Contact_Settings_Player_contactByPhone = {
  __typename: "Player",
  details: Contact_Settings_Player_contactByPhone_details,
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

/**
 * 
 */
export type Vertical = "CASINO" | "SPORTS";

/**
 * 
 */
export type SearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";

/**
 * 
 */
export type Modal = "BETTING_GLOSSARY" | "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================
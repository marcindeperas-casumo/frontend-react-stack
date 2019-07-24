/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SETTINGS_PLAYER
// ====================================================

export type SETTINGS_PLAYER_details_name = {
  __typename: "PlayerName",
  first: string,
  last: string,
};

export type SETTINGS_PLAYER_details_extentOfGambling = {
  __typename: "PlayerExtentOfGambling",
  canChange: boolean,
  label: ?string,
};

export type SETTINGS_PLAYER_details_phoneNumber = {
  __typename: "PhoneNumber",
  prefix: string,
  number: string,
  verified: boolean,
};

export type SETTINGS_PLAYER_details_address_country = {
  __typename: "Country",
  code: string,
  name: string,
};

export type SETTINGS_PLAYER_details_address = {
  __typename: "PlayerAddress",
  city: string,
  street: string,
  postCode: string,
  country: SETTINGS_PLAYER_details_address_country,
};

export type SETTINGS_PLAYER_details = {
  __typename: "PlayerDetails",
  name: SETTINGS_PLAYER_details_name,
  canChangePassword: boolean,
  extentOfGambling: SETTINGS_PLAYER_details_extentOfGambling,
  phoneNumber: SETTINGS_PLAYER_details_phoneNumber,
  address: SETTINGS_PLAYER_details_address,
  email: string,
};

export type SETTINGS_PLAYER = {
  id: string,
  __typename: "Player",
  details: SETTINGS_PLAYER_details,
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
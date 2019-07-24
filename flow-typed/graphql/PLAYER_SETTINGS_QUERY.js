/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PLAYER_SETTINGS_QUERY
// ====================================================

export type PLAYER_SETTINGS_QUERY_player_details_name = {
  __typename: "PlayerName",
  first: string,
  last: string,
};

export type PLAYER_SETTINGS_QUERY_player_details_extentOfGambling = {
  __typename: "PlayerExtentOfGambling",
  canChange: boolean,
  label: ?string,
};

export type PLAYER_SETTINGS_QUERY_player_details_phoneNumber = {
  __typename: "PhoneNumber",
  prefix: string,
  number: string,
  verified: boolean,
};

export type PLAYER_SETTINGS_QUERY_player_details_address_country = {
  __typename: "Country",
  code: string,
  name: string,
};

export type PLAYER_SETTINGS_QUERY_player_details_address = {
  __typename: "PlayerAddress",
  city: string,
  street: string,
  postCode: string,
  country: PLAYER_SETTINGS_QUERY_player_details_address_country,
};

export type PLAYER_SETTINGS_QUERY_player_details = {
  __typename: "PlayerDetails",
  name: PLAYER_SETTINGS_QUERY_player_details_name,
  canChangePassword: boolean,
  extentOfGambling: PLAYER_SETTINGS_QUERY_player_details_extentOfGambling,
  phoneNumber: PLAYER_SETTINGS_QUERY_player_details_phoneNumber,
  address: PLAYER_SETTINGS_QUERY_player_details_address,
  email: string,
};

export type PLAYER_SETTINGS_QUERY_player = {
  id: string,
  __typename: "Player",
  details: PLAYER_SETTINGS_QUERY_player_details,
};

export type PLAYER_SETTINGS_QUERY = {
  player: PLAYER_SETTINGS_QUERY_player
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
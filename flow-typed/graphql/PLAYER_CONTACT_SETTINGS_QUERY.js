/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PLAYER_CONTACT_SETTINGS_QUERY
// ====================================================

export type PLAYER_CONTACT_SETTINGS_QUERY_player_details_contactSettings = {
  withdrawalNotifications: boolean,
  adventurerPublic: boolean,
  subscribedToNewsletters: boolean,
  subscribedToSMSNewsletters: boolean,
  contactByPhone: boolean,
  contactByPost: boolean,
};

export type PLAYER_CONTACT_SETTINGS_QUERY_player_details = {
  contactSettings: PLAYER_CONTACT_SETTINGS_QUERY_player_details_contactSettings
};

export type PLAYER_CONTACT_SETTINGS_QUERY_player_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};

export type PLAYER_CONTACT_SETTINGS_QUERY_player_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: PLAYER_CONTACT_SETTINGS_QUERY_player_playOk_realityCheck,
};

export type PLAYER_CONTACT_SETTINGS_QUERY_player = {
  id: string,
  __typename: "Player",
  details: PLAYER_CONTACT_SETTINGS_QUERY_player_details,
  playOk: PLAYER_CONTACT_SETTINGS_QUERY_player_playOk,
};

export type PLAYER_CONTACT_SETTINGS_QUERY = {
  player: PLAYER_CONTACT_SETTINGS_QUERY_player
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
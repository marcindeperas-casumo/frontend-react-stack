/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NOTIFICATIONS_LABELS_QUERY
// ====================================================

export type NOTIFICATIONS_LABELS_QUERY = {
  subscriptionsTitle: string,
  subscriptionsDescription: string,
  subscriptionsEmailLabel: string,
  subscriptionsSMSLabel: string,
  subscriptionsPhoneLabel: string,
  subscriptionsPostLabel: string,
  notificationsApprovedWithdrawalsEmailLabel: string,
  notificationsInGameSessionUpdatesLabel: string,
  inGameSessionUpdatesOffLabel: string,
  inGameSessionUpdatesFrequencyLabel: string,
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

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================
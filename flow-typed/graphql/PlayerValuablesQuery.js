

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type PlayerValuablesQuery_player_valuables_PlayerValuableDeposit_amount_maxBonusAmount = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDeposit_amount = {
  percent: number,
  maxBonusAmount: ?PlayerValuablesQuery_player_valuables_PlayerValuableDeposit_amount_maxBonusAmount,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDeposit_minDepositAmount = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_minDepositAmount = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_maxDepositAmount = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward_usables_freeSpinsTemplate = {
  numberOfFreeSpins: number
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward_usables = {
  freeSpinsTemplate: ?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward_usables_freeSpinsTemplate
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward = {
  /**
   * It turns out usables present here can now be only free spins with slightly
   * changed structure (i.e. no promoCodeOrTemplate JSON field but template)
   */
  usables: ?Array<?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward_usables>
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder = {
  minDepositAmount: ?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_minDepositAmount,
  maxDepositAmount: ?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_maxDepositAmount,
  itemsToAward: Array<?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward>,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_freeSpinsTemplate_betLevels = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_freeSpinsTemplate = {
  numberOfFreeSpins: number,
  validFrom: ?string,
  betLevels: ?Array<?PlayerValuablesQuery_player_valuables_PlayerValuableSpins_freeSpinsTemplate_betLevels>,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableCash_cash = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables = {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: PlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  amount: PlayerValuablesQuery_player_valuables_PlayerValuableDeposit_amount,
  minDepositAmount: PlayerValuablesQuery_player_valuables_PlayerValuableDeposit_minDepositAmount,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: PlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  itemsToAwardLadder: ?Array<?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder>,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: PlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  source: ?PlayerValuableUsable_Platform,
  promoCode: ?string,
  gameName: string,
  freeSpinsTemplate: ?PlayerValuablesQuery_player_valuables_PlayerValuableSpins_freeSpinsTemplate,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: PlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  cash: PlayerValuablesQuery_player_valuables_PlayerValuableCash_cash,
};

export type PlayerValuablesQuery_player = {
  valuables: Array<?PlayerValuablesQuery_player_valuables>
};

export type PlayerValuablesQuery = {
  player: PlayerValuablesQuery_player
};

/* @flow */
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
export type PlayerValuableType = "PlayerValuableCash" | "PlayerValuableDeposit" | "PlayerValuableDepositLadder" | "PlayerValuableSpins";

/**
 * 
 */
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";

/**
 * 
 */
export type PlayerValuableUsable_Platform = "desktop" | "mobile";

//==============================================================
// END Enums and Input Objects
//==============================================================
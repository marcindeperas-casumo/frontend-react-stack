

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_minDepositAmount = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_maxDepositAmount = {
  amount: number,
  currency: Currency,
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder_itemsToAward_usables = {
  id: string
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

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game = {
  name: string
};

export type PlayerValuablesQuery_player_valuables = {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: SimplePlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  currency: Currency,
  maxBonusValue: number,
  minDepositValue: number,
  magnitude: number,
  wageringFactor: ?number,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: SimplePlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  itemsToAwardLadder: ?Array<?PlayerValuablesQuery_player_valuables_PlayerValuableDepositLadder_itemsToAwardLadder>,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: SimplePlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  source: ?Platform,
  magnitude: number,
  coinValue: number,
  currency: Currency,
  wageringFactor: ?number,
  game: PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game,
} | {
  id: string,
  state: PlayerValuableState,
  expirationTime: any,
  valuableType: SimplePlayerValuableType,
  title: string,
  caveat: ?string,
  content: string,
  magnitude: number,
  currency: Currency,
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
export type SimplePlayerValuableType = "cash" | "deposit" | "spins";

/**
 * 
 */
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";

/**
 * 
 */
export type Platform = "desktop" | "mobile";

//==============================================================
// END Enums and Input Objects
//==============================================================
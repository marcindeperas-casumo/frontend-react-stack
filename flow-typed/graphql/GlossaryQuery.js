/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GlossaryQuery
// ====================================================

export type GlossaryQuery_glossary = {
  id: string,
  term: string,
  aka: ?string,
  definition: string,
};

export type GlossaryQuery = {
  glossary: Array<GlossaryQuery_glossary>
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
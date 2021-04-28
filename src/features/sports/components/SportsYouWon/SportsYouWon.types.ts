import { TCurrencyCode } from "Src/constants";

export type SportsYouWonTranslations = {
  "logo-image": string;
  "background-image": string;
  animation1: string;
  animation2: string;
  bet: string;
  text: string;
  single: string;
  double: string;
  tripple: string;
  four: string;
  multi: string;
};

export type BetCombinationRefOutcomes = {
  eventGroupPath: string;
  eventName: string;
  criterionName: string;
  outcomeLabel: string;
};

export type BetCombinationRefLeg = {
  odds: number;
  outcomes: Array<BetCombinationRefOutcomes>;
};

export type BetCombinationRefType = {
  combinationRef: number;
  playerId: string;
  placedDate: string;
  stake: number;
  payout: number;
  currency: TCurrencyCode;
  odds: number;
  status: string;
  legs: Array<BetCombinationRefLeg>;
};

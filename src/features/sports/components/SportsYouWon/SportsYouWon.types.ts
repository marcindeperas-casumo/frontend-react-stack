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
  username: string;
  payout: number;
  currency: TCurrencyCode;
  status: string;
  legs: Array<BetCombinationRefLeg>;
};

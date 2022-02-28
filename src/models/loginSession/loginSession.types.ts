import { TCurrencyCode, TMarket } from "Src/constants";

export type TGetSummaryArgs = {
  market: TMarket;
  sessionId: string;
};

type TGetSummaryResponseBasic = {
  currency: TCurrencyCode;
};

export type TSlotSessionSummary = {
  totalBets: number;
  totalWins: number;
  remainingBalance: number;
  /** Unix timestamp */
  startedTime: number;
  /** Unix timestamp */
  endedTime: number;
};

export type TLoginSessionSummary = {
  bets: number;
  winnings: number;
};

type TGetSummaryResponseEs = TGetSummaryResponseBasic & {
  loginSessionSummary: TLoginSessionSummary;
  slotSessionSummary?: TSlotSessionSummary;
};

export type TGetSummaryResponse =
  | TGetSummaryResponseBasic
  | TGetSummaryResponseEs;

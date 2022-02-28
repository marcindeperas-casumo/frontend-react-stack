import { TGetSummaryResponse } from "../loginSession.types";

export const basicSummary: TGetSummaryResponse = {
  currency: "EUR",
  loginSessionSummary: {
    bets: 10,
    winnings: 5,
  }
};

export const summaryWithSlotSession: TGetSummaryResponse = {
  currency: "EUR",
  loginSessionSummary: {
    bets: 10,
    winnings: 5,
  },
  slotSessionSummary: {
    totalBets: 10,
    totalWins: 5,
    remainingBalance: 111,
    /** Unix timestamp */
    startedTime: 1644310044841,
    /** Unix timestamp */
    endedTime: 1644312244841,
  }
};
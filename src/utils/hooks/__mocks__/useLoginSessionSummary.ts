import type { UseLoginSessionSummary } from "../useLoginSessionSummary";

export function useLoginSessionSummary(): UseLoginSessionSummary {
  return {
    loginSessionSummary: {
      bets: 10,
      winnings: 5
    }
  };
}
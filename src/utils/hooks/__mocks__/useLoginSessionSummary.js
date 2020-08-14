// @flow
import { type UseLoginSessionSummary } from "../useLoginSessionSummary";

export function useLoginSessionSummary(): UseLoginSessionSummary {
  return {
    loginSessionSummary: {
      totalBets: 10,
      totalWins: 5
    }
  };
}
import { gql } from "@apollo/client";

export const BET_DETAILS_QUERY = gql`
  query BetDetailsQuery($combinationRef: BigInt!) {
    betDetails(combinationRef: $combinationRef) {
      combinationRef
      playerId
      placedDate
      stake
      payout
      currency
      odds
      status
    }
  }
`;

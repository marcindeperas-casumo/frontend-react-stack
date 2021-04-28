import { gql } from "@apollo/client";

export const BET_DETAILS_QUERY = gql`
  query BetDetailsQuery($combinationRef: BigInt!, $playerId: String!) {
    betDetails(combinationRef: $combinationRef, playerId: $playerId) {
      payout
      currency
      status
      legs {
        outcomes {
          eventName
          criterionName
          outcomeLabel
        }
      }
    }
  }
`;

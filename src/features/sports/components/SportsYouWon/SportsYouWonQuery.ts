import { gql } from "@apollo/client";

export const BET_DETAILS_QUERY = gql`
  query BetDetailsQuery($combinationRef: BigInt!) {
    betDetails(combinationRef: $combinationRef) {
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

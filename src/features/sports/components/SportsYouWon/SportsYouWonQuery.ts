import { gql } from "@apollo/client";

export const BET_DETAILS_QUERY = gql`
  query BetDetailsQuery($combinationRef: BigInt!) {
    betDetails(combinationRef: $combinationRef) {
      username
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

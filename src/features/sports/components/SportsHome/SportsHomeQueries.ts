import { gql } from "@apollo/client";

export const SPORTS_POPULAR_BETS_QUERY = gql`
  query PopularBets(
    $market: String!
    $numberOfEvents: Int!
    $sports: String!
  ) {
    sportsPopularBets(market: $market, numberOfEvents: $numberOfEvents, sports: $sports) {
      popularEvents {
        name
        events {
          eventId
          sport
        }
      }
    }
  }
`;

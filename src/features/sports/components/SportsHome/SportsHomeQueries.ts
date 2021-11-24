import { gql } from "@apollo/client";

export const SPORTS_POPULAR_BETS_QUERY = gql`
  query PopularBets(
    $market: String!
    $numberOfEvents: Int!
    $sports: String!
    $startingWithinDays: Int!
  ) {
    sportsPopularBets(
      market: $market
      numberOfEvents: $numberOfEvents
      sports: $sports
      startingWithinDays: $startingWithinDays
    ) {
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

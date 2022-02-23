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

export const SPORTS_PROMO_CARDS_QUERY = gql`
  query PromoCardsData($locale: String!) {
    promoCards(locale: $locale) {
      data {
        id
        attributes {
          locale
          PromoCards {
            Type
            URL
            Enabled
            RequiresUserLogin
            StartDate
            EndDate
            DesktopBgUrl
            MobileBgUrl
            Title
            Description
            Fragment
          }
        }
      }
    }
  }
`;

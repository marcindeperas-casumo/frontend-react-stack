// @flow
import gql from "graphql-tag";

export const USE_VALUABLE_MUTATION = gql`
  mutation UseValuable($id: String!, $source: String) {
    useValuable(id: $id, source: $source)
  }
`;

export const PLAYER_VALUABLE_LIST_FRAGMENT = gql`
  fragment PlayerValuableList_PlayerValuable on PlayerValuable {
    __typename
    id
    valuableState
    expirationTimeInHours
    expiryDate
    valuableType
    title
    content
    caveat
    currency
    market
    backgroundImage
    wageringThreshold
    leftToWager
    ... on PlayerValuableSpins {
      description
      coinValue
      requirementType
      game {
        slug
      }
    }
    ... on PlayerValuableCash {
      requirementType
    }
  }
`;

export const PLAYER_VALUABLES_QUERY = gql`
  query PlayerValuablesQuery {
    translations {
      playerValuableTranslations {
        hoursLabel
        listTitleLabel
        minutesLabel
      }
    }
    player {
      valuables {
        __typename
        id
        valuableState
        expirationTimeInHours
        expiryDate
        valuableType
        title
        content
        caveat
        currency
        market
        backgroundImage
        wageringThreshold
        leftToWager
        ... on PlayerValuableSpins {
          description
          coinValue
          requirementType
          game {
            slug
          }
        }
        ... on PlayerValuableCash {
          requirementType
        }
      }
    }
  }
  ${PLAYER_VALUABLE_LIST_FRAGMENT}
`;

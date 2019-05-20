import gql from "graphql-tag";

export const SETTINGS_PLAYER_FRAGMENT = gql`
  fragment SETTINGS_PLAYER on Player {
    id
    __typename
    details {
      __typename
      name {
        __typename
        first
        last
      }
      canChangePassword
      extentOfGambling {
        __typename
        canChange
        label
      }
      phoneNumber {
        __typename
        prefix
        number
        verified
      }
      address {
        __typename
        city
        street
        postCode
        country {
          __typename
          code
          name
        }
      }
      email
    }
  }
`;

export const PLAYER_SETTINGS_QUERY = gql`
  query PLAYER_SETTINGS_QUERY {
    player {
      ...SETTINGS_PLAYER
    }
  }
  ${SETTINGS_PLAYER_FRAGMENT}
`;

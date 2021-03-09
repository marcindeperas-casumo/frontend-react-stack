import { gql } from "@apollo/client";

//.graphql extension doesn't allow export fragments properly (for now), so they need to be in a js file
export const REALITY_CHECK_FRAGMENT = gql`
  fragment Contact_Settings_Player_realityCheck on Player {
    __typename
    playOk {
      __typename
      realityCheck {
        __typename
        canChangeInterval
        isZeroIntervalAllowed
        intervalInMinutes
      }
    }
  }
`;

export const PLAYER_REALITY_CHECK_QUERY = gql`
  query PLAYER_REALITY_CHECK_QUERY {
    player {
      id
      ...Contact_Settings_Player_realityCheck
    }
  }
  ${REALITY_CHECK_FRAGMENT}
`;

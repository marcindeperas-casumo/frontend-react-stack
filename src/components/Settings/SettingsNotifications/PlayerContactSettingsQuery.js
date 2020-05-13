import gql from "graphql-tag";
import { REALITY_CHECK_FRAGMENT } from "Components/Settings/SettingsRealityCheck/SettingsRealityCheckQuery";

//.graphql extension doesn't allow export fragments properly (for now), so they need to be in a js file

export const ADVENTURER_PUBLIC_FRAGMENT = gql`
  fragment Contact_Settings_Player_adventurerPublic on Player {
    __typename
    details {
      contactSettings {
        adventurerPublic
      }
    }
  }
`;

export const PLAYER_CONTACT_SETTINGS_QUERY = gql`
  query PLAYER_CONTACT_SETTINGS_QUERY {
    player {
      id
      ...Contact_Settings_Player_adventurerPublic
      ...Contact_Settings_Player_realityCheck
    }
  }
  ${ADVENTURER_PUBLIC_FRAGMENT}
  ${REALITY_CHECK_FRAGMENT}
`;

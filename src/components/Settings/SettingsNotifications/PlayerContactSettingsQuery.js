import gql from "graphql-tag";
import { REALITY_CHECK_FRAGMENT } from "Components/Settings/SettingsRealityCheck/SettingsRealityCheckQuery";

//.graphql extension doesn't allow export fragments properly (for now), so they need to be in a js file
export const WITHDRAWAL_NOTIFICATION_FRAGMENT = gql`
  fragment Contact_Settings_Player_withdrawalNotifications on Player {
    __typename
    details {
      contactSettings {
        withdrawalNotifications
      }
    }
  }
`;

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

export const SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT = gql`
  fragment Contact_Settings_Player_subscribedToSMSNewsletters on Player {
    __typename
    details {
      contactSettings {
        subscribedToSMSNewsletters
      }
    }
  }
`;

export const PLAYER_CONTACT_SETTINGS_QUERY = gql`
  query PLAYER_CONTACT_SETTINGS_QUERY {
    player {
      id
      ...Contact_Settings_Player_withdrawalNotifications
      ...Contact_Settings_Player_adventurerPublic
      ...Contact_Settings_Player_realityCheck
      ...Contact_Settings_Player_subscribedToSMSNewsletters
    }
  }
  ${WITHDRAWAL_NOTIFICATION_FRAGMENT}
  ${ADVENTURER_PUBLIC_FRAGMENT}
  ${REALITY_CHECK_FRAGMENT}
  ${SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT}
`;

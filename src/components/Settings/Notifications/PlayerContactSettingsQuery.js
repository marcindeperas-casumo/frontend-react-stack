import gql from "graphql-tag";
import { REALITY_CHECK_FRAGMENT } from "Components/Settings/RealityCheck/RealityCheckQuery";

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

export const SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT = gql`
  fragment Contact_Settings_Player_subscribedToNewsletters on Player {
    __typename
    details {
      contactSettings {
        subscribedToNewsletters
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

export const CONTACT_BY_PHONE_FRAGMENT = gql`
  fragment Contact_Settings_Player_contactByPhone on Player {
    __typename
    details {
      contactSettings {
        contactByPhone
      }
    }
  }
`;

export const CONTACT_BY_POST_FRAGMENT = gql`
  fragment Contact_Settings_Player_contactByPost on Player {
    __typename
    details {
      contactSettings {
        contactByPost
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
      ...Contact_Settings_Player_subscribedToNewsletters
      ...Contact_Settings_Player_subscribedToSMSNewsletters
      ...Contact_Settings_Player_contactByPhone
      ...Contact_Settings_Player_contactByPost
    }
  }
  ${WITHDRAWAL_NOTIFICATION_FRAGMENT}
  ${ADVENTURER_PUBLIC_FRAGMENT}
  ${REALITY_CHECK_FRAGMENT}
  ${SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT}
  ${SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT}
  ${CONTACT_BY_PHONE_FRAGMENT}
  ${CONTACT_BY_POST_FRAGMENT}
`;

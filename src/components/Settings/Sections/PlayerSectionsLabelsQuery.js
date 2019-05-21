import gql from "graphql-tag";

export const PLAYER_SECTIONS_LABELS_QUERY = gql`
  query PLAYER_SECTIONS_LABELS_QUERY {
    accountDetailsTitle: getText(
      id: "root:player-settings-component:fields.account_details_title"
    )
    accountDetailsDescription: getText(
      id: "root:player-settings-component:fields.account_details_description"
    )
    notificationsTitle: getText(
      id: "root:player-settings-component:fields.notifications_title"
    )
    notificationsDescription: getText(
      id: "root:player-settings-component:fields.notifications_description"
    )
    currentSessionMessage: getText(
      id: "root:player-settings-component:fields.current_session_length"
    )
    lastSessionMessage: getText(
      id: "root:player-settings-component:fields.last_session_message"
    )
  }
`;

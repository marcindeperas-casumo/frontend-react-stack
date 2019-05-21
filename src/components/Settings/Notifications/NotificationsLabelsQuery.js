import gql from "graphql-tag";

export const NOTIFICATIONS_LABELS_QUERY = gql`
  query NOTIFICATIONS_LABELS_QUERY {
    subscriptionsTitle: getText(
      id: "root:player-settings-component:fields.subscriptions_title"
    )
    subscriptionsDescription: getText(
      id: "root:player-settings-component:fields.subscriptions_description"
    )
    subscriptionsEmailLabel: getText(
      id: "root:player-settings-component:fields.subscriptions_email_label"
    )
    subscriptionsSMSLabel: getText(
      id: "root:player-settings-component:fields.subscriptions_sms_label"
    )
    subscriptionsPhoneLabel: getText(
      id: "root:player-settings-component:fields.subscriptions_phone_label"
    )
    subscriptionsPostLabel: getText(
      id: "root:player-settings-component:fields.subscriptions_post_label"
    )
    notificationsApprovedWithdrawalsEmailLabel: getText(
      id: "root:player-settings-component:fields.notifications_approved_withdrawals_email_label"
    )
    notificationsInGameSessionUpdatesLabel: getText(
      id: "root:player-settings-component:fields.notifications_ingame_session_updates_label"
    )
  }
`;

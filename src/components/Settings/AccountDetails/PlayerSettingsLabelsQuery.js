import gql from "graphql-tag";

export const PLAYER_SETTINGS_LABELS_QUERY = gql`
  query PLAYER_SETTINGS_LABELS_QUERY {
    name: getText(
      id: "root:player-settings-component:fields.account_settings_name_label"
    )
    email: getText(
      id: "root:player-settings-component:fields.account_settings_email_label"
    )
    password: getText(
      id: "root:player-settings-component:fields.account_settings_password_label"
    )
    mobileNumber: getText(
      id: "root:player-settings-component:fields.account_settings_mobile_number_label"
    )
    address: getText(
      id: "root:player-settings-component:fields.account_settings_address_label"
    )
    edit: getText(
      id: "root:player-settings-component:fields.account_settings_edit_label"
    )
    gamblingExtent: getText(
      id: "root:mobile.settings:fields.gambling_extent_label"
    )
  }
`;

import gql from "graphql-tag";
import { PLAYER_SETTINGS_QUERY } from "../PlayerSettingsQuery.graphql";

export const playerSettingsQueryMock = {
  request: {
    query: PLAYER_SETTINGS_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        details: {
          __typename: "PlayerDetails",
          address: {
            __typename: "PlayerAddress",
            city: "Swieqi",
            country: {
              __typename: "Country",
              code: "gb",
              name: "United Kingdom",
            },
            postCode: "3333",
            street: "sssss",
          },
          canChangePassword: true,
          email: "foo.bar@casumo.com",
          extentOfGambling: {
            __typename: "PlayerExtentOfGambling",
            canChange: true,
            label: "≤ 50 €",
          },
          name: {
            __typename: "PlayerName",
            first: "Foo",
            last: "Bar",
          },
          phoneNumber: {
            __typename: "PhoneNumber",
            number: "",
            prefix: "+123",
            verified: false,
          },
        },
      },
    },
  },
};

export const playerSettingsQueryErrorMock = {
  ...playerSettingsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

const LABELS_QUERY = gql`
  query TranslationsQuery {
    name: getCMSField(
      id: "root:player-settings-component:fields.account_settings_name_label"
    ) { id, text }
    email: getCMSField(
      id: "root:player-settings-component:fields.account_settings_email_label"
    ) { id, text }
    password: getCMSField(
      id: "root:player-settings-component:fields.account_settings_password_label"
    ) { id, text }
    mobileNumber: getCMSField(
      id: "root:player-settings-component:fields.account_settings_mobile_number_label"
    ) { id, text }
    address: getCMSField(
      id: "root:player-settings-component:fields.account_settings_address_label"
    ) { id, text }
    edit: getCMSField(
      id: "root:player-settings-component:fields.account_settings_edit_label"
    ) { id, text }
    verify: getCMSField(
      id: "root:player-settings-component:fields.account_settings_verify_label"
    ) { id, text }
    gamblingExtent: getCMSField(
      id: "root:mobile.settings:fields.gambling_extent_label"
    ) { id, text }
  }
`;

export const playerSettingsLabelsQueryMock = {
  request: {
    query: LABELS_QUERY,
  },
  result: {
    data: {
      name: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_name_label",
        text: "Name"
      },
      email: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_email_label",
        text: "Email"
      },
      password: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_password_label",
        text: "Password"
      },
      mobileNumber: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_mobile_number_label",
        text: "Mobile number"
      },
      address: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_name_label",
        text: "Address"
      },
      edit: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_edit_label",
        text: ""
      },
      verify: {
        __typename: "CmsText",
        id: "root:player-settings-component:fields.account_settings_verify_label",
        text: "Verify"
      },
      gamblingExtent: {
        __typename: "CmsText",
        id: "root:mobile.settings:fields.gambling_extent_label",
        text: "Estimated monthly deposit"
      },
    },
  },
};

export const playerSettingsLabelsQueryErrorMock = {
  ...playerSettingsLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

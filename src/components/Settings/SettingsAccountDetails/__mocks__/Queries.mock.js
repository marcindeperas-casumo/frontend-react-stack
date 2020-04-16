// @flow
import gql from "graphql-tag";
import { generateTranslationsQuery, generateTranslationsQueryMock } from "Utils/apolloTestUtils";
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

const labelsKeyIdMap = {
  name: "root:player-settings-component:fields.account_settings_name_label",
  email: "root:player-settings-component:fields.account_settings_email_label",
  password: "root:player-settings-component:fields.account_settings_password_label",
  mobileNumber: "root:player-settings-component:fields.account_settings_mobile_number_label",
  address: "root:player-settings-component:fields.account_settings_address_label",
  edit: "root:player-settings-component:fields.account_settings_edit_label",
  verify: "root:player-settings-component:fields.account_settings_verify_label",
  gamblingExtent: "root:mobile.settings:fields.gambling_extent_label",
};

export const LABELS_QUERY = generateTranslationsQuery(labelsKeyIdMap);

export const playerSettingsLabelsQueryMock = generateTranslationsQueryMock(
  LABELS_QUERY,
  labelsKeyIdMap,
  {
    name: "Name",
    email: "Email",
    password: "Password",
    mobileNumber: "Mobile Number",
    address: "Address",
    edit: "Edit",
    verify: "Verify",
    gamblingExtent: "Gambling Extent",
  }
);

export const playerSettingsLabelsQueryErrorMock = {
  ...playerSettingsLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

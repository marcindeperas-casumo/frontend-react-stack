import { PLAYER_SETTINGS_QUERY } from "../PlayerSettingsQuery.graphql";
import PLAYER_SETTINGS_LABELS_QUERY from "../PlayerSettingsLabelsQuery.graphql";

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

export const playerSettingsLabelsQueryMock = {
  request: {
    query: PLAYER_SETTINGS_LABELS_QUERY,
  },
  result: {
    data: {
      address: "Address",
      edit: "",
      email: "Email",
      verify: "Verify",
      gamblingExtent: "Estimated monthly deposit",
      mobileNumber: "Mobile number",
      name: "Name",
      password: "Password",
    },
  },
};

export const playerSettingsLabelsQueryErrorMock = {
  ...playerSettingsLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

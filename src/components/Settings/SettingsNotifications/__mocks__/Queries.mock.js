import NOTIFICATIONS_LABELS_QUERY from "../SettingsNotificationsLabelsQuery.graphql";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "../PlayerContactSettingsQuery";
import { SettingsNotificationsContactByPhoneQuery } from "../ContactByPhone.graphql";

export const playerContactSettingsQueryMock = {
  request: {
    query: PLAYER_CONTACT_SETTINGS_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        details: {
          __typename: "PlayerDetails",
          contactSettings: {
            __typename: "PlayerContactSettings",
            withdrawalNotifications: true,
            adventurerPublic: true,
            subscribedToNewsletters: true,
            subscribedToSMSNewsletters: true,
            contactByPhone: true,
            contactByPost: true,
          },
        },
        playOk: {
          __typename: "PlayerPlayOkSettings",
          realityCheck: {
            __typename: "PlayerRealityCheckSettings",
            canChangeInterval: true,
            intervalInMinutes: 15,
            isZeroIntervalAllowed: true,
          },
        },
      },
    },
  },
};

export const playerContactSettingsQueryErrorMock = {
  ...playerContactSettingsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

export const getPlayerSettingQueryMock = (query, name, value) => ({
  request: {
    query,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        details: {
          __typename: "PlayerDetails",
          contactSettings: {
            __typename: "PlayerContactSettings",
            [name]: value,
          },
        },
      },
    },
  },
});

export const notificationsLabelsQueryMock = {
  request: {
    query: NOTIFICATIONS_LABELS_QUERY,
  },
  result: {
    data: {
      subscriptionsTitle: "foo",
      subscriptionsDescription: "foo",
      subscriptionsEmailLabel: "foo",
      subscriptionsSMSLabel: "foo",
      subscriptionsPhoneLabel: "foo",
      subscriptionsPostLabel: "foo",
      notificationsApprovedWithdrawalsEmailLabel: "foo",
      notificationsInGameSessionUpdatesLabel: "foo",
      inGameSessionUpdatesOffLabel: "foo",
      inGameSessionUpdatesFrequencyLabel: "foo",
    },
  },
};

export const notificationsLabelsQueryErrorMock = {
  ...notificationsLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

export const withMockQueries = mock => [
  ...mock,
  playerContactSettingsQueryMock,
  notificationsLabelsQueryMock,
];

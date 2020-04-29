// @flow
import { generateTranslationsQuery, generateTranslationsQueryMock } from "Utils/apolloTestUtils";
import PLAYER_LOGIN_HISTORY_QUERY from "../PlayerLoginHistoryQuery.graphql";

export const labels = {
  accountDetailsDescription: "Manage your personal and account info",
  accountDetailsTitle: "Account details",
  currentSessionMessage: "Your current session length is:",
  lastSessionMessage:
    "Your last session was on <strong>{{lastLoginDate}}</strong>, at <strong>{{lastLoginTime}}</strong>",
  notificationsDescription: "Manage your notification preferences",
  notificationsTitle: "Notifications",
  accountActivity: "Account Activity",
  logout: "Logout",
};

export const playerSectionsQueryMock = {
  request: {
    query: PLAYER_LOGIN_HISTORY_QUERY,
  },
  result: {
    data: {
      player: {
        id: "c9bf9550-0df9-11e2-bd1a-0050568c7151",
        loginHistory: [
          { loginTime: 1583472493000, __typename: "PlayerLoginHistoryRecord" },
          { loginTime: 1583327798000, __typename: "PlayerLoginHistoryRecord" },
          { loginTime: 1583233118000, __typename: "PlayerLoginHistoryRecord" },
        ],
        __typename: "Player",
      },
    },
  },
};

export const playerSectionsQueryErrorMock = {
  ...playerSectionsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

const labelsKeyIdMap = {
  accountDetailsTitle: "root:player-settings-component:fields.account_details_title",
  accountDetailsDescription: "root:player-settings-component:fields.account_details_description",
  notificationsTitle: "root:player-settings-component:fields.notifications_title",
  notificationsDescription: "root:player-settings-component:fields.notifications_description",
  currentSessionMessage: "root:player-settings-component:fields.current_session_length",
  lastSessionMessage: "root:player-settings-component:fields.last_session_message",
  accountActivity: "root:player-settings-component:fields.account_activity",
  logout: "root:player-settings-component:fields.logout",
};

export const PLAYER_SECTIONS_LABELS_QUERY = generateTranslationsQuery(labelsKeyIdMap);

export const playerSectionsLabelsQueryMock = generateTranslationsQueryMock(PLAYER_SECTIONS_LABELS_QUERY, labelsKeyIdMap, labels);

export const playerSectionsLabelsQueryErrorMock = {
  ...playerSectionsLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

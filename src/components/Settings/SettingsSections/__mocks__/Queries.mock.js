// @flow
import PLAYER_LOGIN_HISTORY_QUERY from "../PlayerLoginHistoryQuery.graphql";

export const labels = {
  account_details_description: "Manage your personal and account info",
  account_details_title: "Account details",
  current_session_length: "Your current session length is:",
  last_session_message:
    "Your last session was on <strong>{{lastLoginDate}}</strong>, at <strong>{{lastLoginTime}}</strong>",
  notifications_description: "Manage your notification preferences",
  notifications_title: "Notifications",
  account_activity: "Account Activity",
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

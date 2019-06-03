import PLAYER_SECTIONS_QUERY from "../PlayerSectionsQuery.graphql";
import PLAYER_SECTIONS_LABELS_QUERY from "../PlayerSectionsLabelsQuery.graphql";

export const playerSectionsQueryMock = {
  request: {
    query: PLAYER_SECTIONS_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        loginHistory: {
          __typename: "[PlayerLoginHistoryRecord]",
          loginTime: "1558430103000",
        },
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

export const playerSectionsLabelsQueryMock = {
  request: {
    query: PLAYER_SECTIONS_LABELS_QUERY,
  },
  result: {
    data: {
      accountDetailsDescription: "Manage your personal and account info",
      accountDetailsTitle: "Account details",
      currentSessionMessage: "Your current session length is:",
      lastSessionMessage:
        "Your last session was on <strong>{{lastLoginDate}}</strong>, at <strong>{{lastLoginTime}}</strong>",
      notificationsDescription: "Manage your notification preferences",
      notificationsTitle: "Notifications",
      accountActivity: "Account Activity",
      logout: "Logout"
    },
  },
};

export const playerSectionsLabelsQueryErrorMock = {
  ...playerSectionsLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

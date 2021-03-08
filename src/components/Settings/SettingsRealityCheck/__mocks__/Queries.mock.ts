import { REALITY_CHECK_LABELS_QUERY } from "../SettingsRealityCheckLabelsQuery.graphql";
import { PLAYER_REALITY_CHECK_QUERY } from "../SettingsRealityCheckQuery";

export const labels = {
  cancel: "Cancel",
  inGameSessionUpdatesFrequencyLabel:
    "How frequently would you like to receive them?",
  inGameSessionUpdatesLabel: "In-game session updates",
  save: "Save",
};

export const playerRealityCheckQueryMock = {
  request: {
    query: PLAYER_REALITY_CHECK_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
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

export const playerRealityCheckQueryCantChangeIntervalMock = {
  request: {
    query: PLAYER_REALITY_CHECK_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        playOk: {
          __typename: "PlayerPlayOkSettings",
          realityCheck: {
            __typename: "PlayerRealityCheckSettings",
            canChangeInterval: false,
            intervalInMinutes: 15,
            isZeroIntervalAllowed: true,
          },
        },
      },
    },
  },
};

export const playerRealityCheckQueryNoZeroIntervalMock = {
  request: {
    query: PLAYER_REALITY_CHECK_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        playOk: {
          __typename: "PlayerPlayOkSettings",
          realityCheck: {
            __typename: "PlayerRealityCheckSettings",
            canChangeInterval: true,
            intervalInMinutes: 15,
            isZeroIntervalAllowed: false,
          },
        },
      },
    },
  },
};

export const playerRealityCheckQueryErrorMock = {
  ...playerRealityCheckQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

export const realityCheckLabelsQueryMock = {
  request: {
    query: REALITY_CHECK_LABELS_QUERY,
  },
  result: {
    data: labels,
  },
};

export const realityCheckLabelsQueryErrorMock = {
  ...realityCheckLabelsQueryMock,
  result: {
    errors: [{ foo: "bar" }],
  },
};

export const playerRealityCheckQueryWithInterval = intervalInMinutes => ({
  request: {
    query: PLAYER_REALITY_CHECK_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        id: 1,
        playOk: {
          __typename: "PlayerPlayOkSettings",
          realityCheck: {
            __typename: "PlayerRealityCheckSettings",
            canChangeInterval: true,
            intervalInMinutes: intervalInMinutes,
            isZeroIntervalAllowed: true,
          },
        },
      },
    },
  },
});

export const withMockQueries = mock => [
  ...mock,
  playerRealityCheckQueryMock,
  realityCheckLabelsQueryMock,
];

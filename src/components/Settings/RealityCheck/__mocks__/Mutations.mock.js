import { UPDATE_REALITY_CHECK_INTERVAL } from "../Mutations.graphql";

export const updateRealityCheckIntervalMock = [0, 600, 900].map(
  intervalSeconds => ({
    request: {
      query: UPDATE_REALITY_CHECK_INTERVAL,
      variables: { input: { intervalSeconds } },
    },
    result: {
      data: { updateRealityCheckInterval: intervalSeconds },
    },
  })
);

export const updateRealityCheckIntervalErrorMock = updateRealityCheckIntervalMock.map(
  payload => ({
    ...payload,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

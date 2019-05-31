import { UpdateRealityCheckInterval } from "../Mutations.graphql";

export const updateRealityCheckIntervalMock = [0, 600, 900].map(
  intervalSeconds => ({
    request: {
      query: UpdateRealityCheckInterval,
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

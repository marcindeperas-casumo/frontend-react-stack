// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../Mutations.graphql' or its c... Remove this comment to see the full error message
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

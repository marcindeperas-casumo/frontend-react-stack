import { GraphQLError } from "graphql";
import { UpdateRealityCheckInterval } from "../Mutations.graphql";

export const updateRealityCheckIntervalMock = [0, 600, 900].map(
  intervalSeconds => ({
    request: {
      query: UpdateRealityCheckInterval,
      variables: { input: { intervalSeconds } },
    },
    result: jest.fn(() => ({
      data: { updateRealityCheckInterval: intervalSeconds },
    })),
  })
);

export const updateRealityCheckIntervalErrorMock = updateRealityCheckIntervalMock.map(
  payload => ({
    ...payload,
    result: jest.fn(() => ({
      errors: [new GraphQLError("bar")],
    })),
  })
);

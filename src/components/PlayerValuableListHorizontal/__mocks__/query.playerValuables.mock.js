
import { PlayerValuablesQuery } from "../PlayerValuables.graphql";
import { valuables } from "./response.playerValuables.mock";

export const normalQuery = {
  request: {
    query: PlayerValuablesQuery,
    variables: {},
  },
  result: {
    data: {
      listTitle: "Your Valuables",
      player: {
        valuables
      },
    },
  },
};

export const failedQuery = {
    request: {
      query: PlayerValuablesQuery,
      variables: {},
    },
    result: {
      errors: [
        new Error('Failed GraphQL query.')
      ]
    },
  };

import { PlayerValuablesQuery } from "../PlayerValuables.graphql";
import valuables from "Components/ValuableCard/__mocks__/Valuable.json";
import playerValuableTranslations from "Components/PlayerValuableList/__mocks__/translations.mock.json";

export const normalQuery = {
  request: {
    query: PlayerValuablesQuery,
    variables: {},
  },
  result: {
    data: {
      ...playerValuableTranslations,
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
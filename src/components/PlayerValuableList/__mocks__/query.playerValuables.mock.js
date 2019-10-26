// @flow
import { PLAYER_VALUABLES_QUERY } from "../playerValuableGQL";
import valuables from "Components/ValuableCard/__mocks__/Valuable.json";
import playerValuableTranslations from "Components/PlayerValuableList/__mocks__/translations.mock.json";

export const normalQuery = {
  request: {
    query: PLAYER_VALUABLES_QUERY,
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
      query: PLAYER_VALUABLES_QUERY,
      variables: {},
    },
    result: {
      errors: [
        new Error('Failed GraphQL query.')
      ]
    },
  };
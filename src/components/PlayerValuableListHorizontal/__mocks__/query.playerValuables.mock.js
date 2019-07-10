
import { PlayerValuablesQuery } from "../PlayerValuables.graphql";
// import { valuables } from "./response.playerValuables.mock";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import playerValuableTranslations from "Components/PlayerValuableListHorizontal/__mocks__/translations.mock.json";

const valuables = mockValuables();

export const normalQuery = {
  request: {
    query: PlayerValuablesQuery,
    variables: {},
  },
  result: {
    data: {
      translations: {
        playerValuableTranslations
      },
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
// @flow
import gql from "graphql-tag";
import { PlayerValuablesQuery } from "../PlayerValuables.graphql";
import valuables from "Components/ValuableCard/__mocks__/Valuable";
import translationsMock from "./translations.mock.json";

const mockedValuables = [
  {
    request: {
      query: PlayerValuablesQuery,
    },
    result: {
      data: {
        ...translationsMock,
        player: {
          __typename: "Player",
          valuables,
        },
      }
    },
  },
];

const emptyValuables = [
  {
    request: {
      query: PlayerValuablesQuery,
    },
    result: {
      data: {
        ...translationsMock,
        player: {
          __typename: "Player",
          valuables: [],
        },
      }
    },
  },
];

const loading = [
  {
    request: {
      query: PlayerValuablesQuery,
    },
    result: {
      data: false,
    },
  },
];

const error = [
  {
    request: {
      query: PlayerValuablesQuery,
    },
    errors: [new Error("Failed GraphQL query.")],
  },
];

export const mocks = {
  mockedValuables,
  emptyValuables,
  loading,
  error,
};

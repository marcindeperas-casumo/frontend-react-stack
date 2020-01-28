// @flow
import gql from "graphql-tag";
import { PlayerValuablesQuery } from "../PlayerValuables.graphql";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import translationsMock from "./translations.mock.json";
import { VALUABLE_TYPES } from "Models/valuables";

const mockedDepositValuables = [
  {
    request: {
      query: PlayerValuablesQuery,
      variables: { valuableType: VALUABLE_TYPES.DEPOSIT }
    },
    result: {
      data: {
        ...translationsMock,
        player: {
          __typename: "Player",
          valuables: mockValuables(VALUABLE_TYPES.DEPOSIT),
        },
      }
    },
  },
];

const mockedValuables = [
  {
    request: {
      query: PlayerValuablesQuery,
      variables: {}
    },
    result: {
      data: {
        ...translationsMock,
        player: {
          __typename: "Player",
          valuables: mockValuables(),
        },
      }
    },
  },
];

const emptyValuables = [
  {
    request: {
      query: PlayerValuablesQuery,
      variables: {}
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
  allValuables: mockValuables(),
  mockedValuables,
  mockedDepositValuables,
  emptyValuables,
  loading,
  error,
};

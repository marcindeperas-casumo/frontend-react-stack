// @flow
import { gql } from "@apollo/client";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../PlayerValuables.graphql' or... Remove this comment to see the full error message
import { PlayerValuablesQuery } from "../PlayerValuables.graphql";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import translationsMock from "./translations.mock.json";
import { VALUABLE_TYPES } from "Models/valuables";

const mockedDepositValuables = [
  {
    request: {
      query: PlayerValuablesQuery,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
      variables: { valuableType: VALUABLE_TYPES.DEPOSIT }
    },
    result: {
      data: {
        ...translationsMock,
        player: {
          __typename: "Player",
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
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

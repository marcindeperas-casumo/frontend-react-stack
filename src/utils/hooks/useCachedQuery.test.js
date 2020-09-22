// @flow
import * as React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { HookWrapper, getHookValue } from "Utils/HookWrapper";
import { useCachedQuery } from "./useCachedQuery";

const query = gql`
  query GetAlphabet {
    alphabet {
      letters
    }
  }
`;
const mockSameChunk = [
  {
    request: {
      query,
    },
    result: {
      data: {
        alphabet: {
          letters: [
            { letter: "a", id: 0 },
            { letter: "b", id: 1 },
            { letter: "c", id: 2 },
            { letter: "d", id: 3 },
            { letter: "e", id: 4 },
          ],
        },
      },
    },
  },
];
const mockDifferentChunk = [
  {
    request: {
      query,
    },
    result: {
      data: {
        alphabet: {
          letters: [
            { letter: "X", id: 0 },
            { letter: "b", id: 1 },
            { letter: "c", id: 2 },
            { letter: "d", id: 3 },
            { letter: "e", id: 4 },
          ],
        },
      },
    },
  },
];

const cacheData = {
  alphabet: {
    letters: [
      { letter: "a", id: 0 },
      { letter: "b", id: 1 },
      { letter: "c", id: 2 },
      { letter: "d", id: 3 },
      { letter: "e", id: 4 },
      { letter: "f", id: 5 },
      { letter: "g", id: 6 },
      { letter: "h", id: 7 },
      { letter: "i", id: 8 },
      { letter: "j", id: 9 },
    ],
  },
};

function mountHook(mocks, hook, withCache = true) {
  const cache = new InMemoryCache({ addTypename: false });
  if (withCache) {
    cache.writeQuery({ query, data: cacheData });
  }

  return mount(
    <MockedProvider mocks={mocks} cache={cache} addTypename={false}>
      <HookWrapper
        hook={hook}
        args={[
          query,
          { fetchPolicy: "cache-and-network" },
          ["alphabet", "letters"],
        ]}
      />
    </MockedProvider>
  );
}
function initializeHooks(mocks) {
  const cachedQueryWrapper = mountHook(mocks, useCachedQuery);
  const defaultQueryWrapper = mountHook(mocks, useQuery);

  return {
    cachedQueryWrapper,
    defaultQueryWrapper,
  };
}

describe("useCachedQuery", () => {
  test("shouldn't loose cache outside of fetched indexes", async () => {
    const { cachedQueryWrapper, defaultQueryWrapper } = initializeHooks(
      mockSameChunk
    );

    // By default both hooks will return data from cache:
    expect(getHookValue(cachedQueryWrapper).data).toEqual(cacheData);
    expect(getHookValue(defaultQueryWrapper).data).toEqual(cacheData);

    // What is different is that default useQuery will drop all the data after getting update
    await waitAndUpdateWrapper(cachedQueryWrapper);
    await waitAndUpdateWrapper(defaultQueryWrapper);
    expect(getHookValue(cachedQueryWrapper).data).toEqual(cacheData);
    expect(getHookValue(defaultQueryWrapper).data).toEqual(
      mockSameChunk[0].result.data
    );
  });

  describe("proof that useCachedQuery isn't just returning cache", () => {
    const { cachedQueryWrapper } = initializeHooks(mockDifferentChunk);

    test("first it returns what's in cache", () => {
      expect(getHookValue(cachedQueryWrapper).data).toEqual(cacheData);
    });

    test("if response is different than cache it'll get updated", async () => {
      await waitAndUpdateWrapper(cachedQueryWrapper);
      expect(
        getHookValue(cachedQueryWrapper).data.alphabet.letters[0].letter
      ).toEqual(mockDifferentChunk[0].result.data.alphabet.letters[0].letter);
    });

    test("but rest of the data will not be removed", () => {
      expect(
        getHookValue(cachedQueryWrapper).data.alphabet.letters.slice(1)
      ).toEqual(cacheData.alphabet.letters.slice(1));
    });
  });
});

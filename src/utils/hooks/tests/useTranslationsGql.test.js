import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/react-testing";
import gql from "graphql-tag";
import { useTranslationsGql } from "../useTranslationsGql";

// We need this because Apollo's useQuery hook works in an async manner.
// Unfortunately waitForNextUpdate() didn't work, so we ended up going this way.
jest.useFakeTimers();

const QUERY = gql`
  query TranslationsTestQuery {
    one: getCMSField(
      id: "root:built-pages.top-lists-translations:fields.more_link"
    ) {
      id
      text
    }
    two: getCMSField(
      id: "root:built-pages.top-lists-translations:fields.more_link"
    ) {
      id
      text
    }
  }
`;

const mock = {
  request: { query: QUERY },
  result: {
    data: {
      one: {
        id: "one",
        text: "See More",
      },
      two: {
        id: "two",
        text: "See More",
      },
    },
  },
};

const wrapper = ({ children }) => (
  <MockedProvider mocks={[mock]} addTypename={false}>
    {children}
  </MockedProvider>
);

const renderTranslationsHook = () =>
  renderHook(
    () =>
      useTranslationsGql({
        one: "root:built-pages.top-lists-translations:fields.more_link",
        two: "root:built-pages.top-lists-translations:fields.more_link",
      }),
    {
      wrapper,
    }
  );

describe("Hooks/useTranlationsGql", () => {
  test("should get translations if they exist", () => {
    const { result } = renderTranslationsHook();

    expect(result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.t).toEqual({
      one: "See More",
      two: "See More",
    });
  });

  test("should return null for translations which are still loading", () => {
    const { result } = renderTranslationsHook();

    expect(result.current.loading).toBe(true);

    expect(result.current.t).toEqual({
      one: null,
      two: null,
    });
  });
});

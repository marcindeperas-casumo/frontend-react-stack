import React from "react";
import { shallow, mount } from "enzyme";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import { SearchNotFoundContainer } from "Components/SearchNotFound";
import { GameSearch } from "./GameSearch";

jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

jest.mock("Components/GoogleTagManager", () => ({
  useGoogleTagManager: () => ({
    trackEvent: () => {},
    loading: false,
  }),
}));

const suggestions = {
  games: ["game", "suggestions"],
  location: "latestPlayedGames",
  title: "Continue playing",
  type: "latest",
};

describe("GameSearch", () => {
  const clearSearch = jest.fn();
  const inputPromptPlaceholder = "whatever";

  test("Should render a search input", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={[]}
        searchResultsCount={0}
        loading={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"ooo"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ games: string[]; location: string; title: ... Remove this comment to see the full error message
        suggestions={suggestions}
        loadingSuggestions={true}
      />
    );

    expect(rendered.find("GameSearchInput")).toHaveLength(1);
  });

  test("should render a skeleton if loading is equal to true", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={[]}
        searchResultsCount={0}
        loading={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"ooo"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ games: string[]; location: string; title: ... Remove this comment to see the full error message
        suggestions={suggestions}
        loadingSuggestions={true}
      />
    );

    expect(rendered.find(GameListSkeleton)).toHaveLength(1);
  });

  test("should render a not found component if no match and query", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={[]}
        searchResultsCount={0}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"ooo"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ games: string[]; location: string; title: ... Remove this comment to see the full error message
        suggestions={suggestions}
        loadingSuggestions={true}
      />
    );

    expect(rendered.find(SearchNotFoundContainer)).toHaveLength(1);
  });

  test("should render search results", () => {
    const searchResults = ["I", "am", "search", "results"];

    const rendered = mount(
      <GameSearch
        clearSearch={clearSearch}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'GameRow... Remove this comment to see the full error message
        searchResults={searchResults}
        searchResultsCount={4}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ games: string[]; location: string; title: ... Remove this comment to see the full error message
        suggestions={suggestions}
        loadingSuggestions={true}
      />
    );

    expect(rendered.find("GamesVirtualList")).toHaveLength(1);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'games' does not exist on type 'HTMLAttri... Remove this comment to see the full error message
    expect(rendered.find("GamesVirtualList").props().games).toEqual(
      searchResults
    );
  });

  test("should render 1 search result and suggested games list", () => {
    const rendered = mount(
      <GameSearch
        clearSearch={clearSearch}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'GameRow_G... Remove this comment to see the full error message
        searchResults={["game"]}
        searchResultsCount={1}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ games: string[]; location: string; title: ... Remove this comment to see the full error message
        suggestions={suggestions}
        loadingSuggestions={false}
      />
    );

    expect(rendered.find("GamesVirtualList")).toHaveLength(2);
    expect(
      rendered
        .find("GamesVirtualList")
        .at(0)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowCount' does not exist on type 'HTMLAt... Remove this comment to see the full error message
        .props().rowCount
    ).toEqual(1);
    expect(
      rendered
        .find("GamesVirtualList")
        .at(1)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowCount' does not exist on type 'HTMLAt... Remove this comment to see the full error message
        .props().rowCount
    ).toEqual(2);
  });
});

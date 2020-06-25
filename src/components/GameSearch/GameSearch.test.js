// @flow
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
        searchResults={searchResults}
        searchResultsCount={4}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        suggestions={suggestions}
        loadingSuggestions={true}
      />
    );

    expect(rendered.find("GamesVirtualList")).toHaveLength(1);
    expect(rendered.find("GamesVirtualList").props().games).toEqual(
      searchResults
    );
  });

  test("should render 1 search result and suggested games list", () => {
    const rendered = mount(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={["game"]}
        searchResultsCount={1}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
        suggestions={suggestions}
        loadingSuggestions={false}
      />
    );

    expect(rendered.find("GamesVirtualList")).toHaveLength(2);
    expect(
      rendered
        .find("GamesVirtualList")
        .at(0)
        .props().rowCount
    ).toEqual(1);
    expect(
      rendered
        .find("GamesVirtualList")
        .at(1)
        .props().rowCount
    ).toEqual(2);
  });
});

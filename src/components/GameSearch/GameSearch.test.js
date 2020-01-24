// @flow
import React from "react";
import List from "@casumo/cmp-list";
import { shallow } from "enzyme";
import { GameSearch } from "Components/GameSearch/GameSearch";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import { SearchNotFoundWithGameSuggestions } from "Components/SearchNotFoundWithGameSuggestions";
import { GamesVirtualList } from "Components/GamesVirtualList/GamesVirtualList";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList";

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
      />
    );

    expect(rendered.find(SearchNotFoundWithGameSuggestions)).toHaveLength(1);
  });

  test("should render all games if query is empty", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={[]}
        searchResultsCount={0}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
      />
    );

    expect(rendered.find(GamesVirtualList)).toHaveLength(1);
  });

  test("should render search results", () => {
    const searchResults = ["I", "am", "search", "results"];

    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={searchResults}
        searchResultsCount={4}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
      />
    );

    expect(rendered.find(List)).toHaveLength(1);
    expect(rendered.find(List).props().items).toEqual(searchResults);
  });

  test("should render 1 search result and suggested games list", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        searchResults={["game"]}
        searchResultsCount={1}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
        fetchMore={() => Promise.resolve([])}
        queryChanged={() => {}}
      />
    );

    expect(rendered.find(GameSearchSuggestionsList)).toHaveLength(1);
  });
});

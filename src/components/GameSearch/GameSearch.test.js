// @flow
import React from "react";
import { shallow } from "enzyme";
import { GameSearch } from "Components/GameSearch/GameSearch";

describe("GameSearch", () => {
  const clearSearch = jest.fn();
  const initFetchGameSearchCount = jest.fn();
  const preloadFetchPlayerGames = jest.fn();
  const fetchPageBySlug = jest.fn();
  const inputPromptPlaceholder = "whatever";

  test("Should render a search input", () => {
    const rendered = shallow(
      <GameSearch
        initFetchGameSearchCount={initFetchGameSearchCount}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        searchResults={[]}
        searchResultsCount={0}
        loading={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
      />
    );

    expect(rendered.find("GameSearchInput")).toHaveLength(1);
  });

  test("should render a skeleton if loading is equal to true", () => {
    const rendered = shallow(
      <GameSearch
        initFetchGameSearchCount={initFetchGameSearchCount}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        searchResults={[]}
        searchResultsCount={0}
        loading={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("should render a not found component if no match and query", () => {
    const rendered = shallow(
      <GameSearch
        initFetchGameSearchCount={initFetchGameSearchCount}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        searchResults={[]}
        searchResultsCount={0}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"ooo"}
      />
    );

    expect(rendered.find("SearchNotFoundContainer")).toHaveLength(1);
  });

  test("should render all games if searchResults is empty", () => {
    const rendered = shallow(
      <GameSearch
        initFetchGameSearchCount={initFetchGameSearchCount}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        searchResults={[]}
        searchResultsCount={0}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
      />
    );

    expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
  });

  test("should render search results", () => {
    const searchResults = ["I", "am", "search", "results"];

    const rendered = shallow(
      <GameSearch
        initFetchGameSearchCount={initFetchGameSearchCount}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        searchResults={searchResults}
        searchResultsCount={4}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"hola"}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("List").props().items).toEqual(searchResults);
  });

  test("should render 1 search result and suggested games list", () => {
    const rendered = shallow(
      <GameSearch
        initFetchGameSearchCount={initFetchGameSearchCount}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        searchResults={["game"]}
        searchResultsCount={1}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("Connect(GameSearchSuggestionsList)")).toHaveLength(1);
  });
});

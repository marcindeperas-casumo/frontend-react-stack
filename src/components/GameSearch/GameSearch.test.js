// @flow
import React from "react";
import { shallow } from "enzyme";
import GameSearch from "Components/GameSearch/GameSearch";

describe("GameSearch", () => {
  const clearSearch = jest.fn();
  const initFetchQuerySearch = jest.fn();
  const preloadFetchPlayerGames = jest.fn();
  const fetchPageBySlug = jest.fn();
  const inputPromptPlaceholder = "whatever";

  test("Should render a search input", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        loading={true}
        noResults={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
      />
    );

    expect(rendered.find("GameSearchInput")).toHaveLength(1);
  });

  test("should render a skeleton if loading is equal to true", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        loading={true}
        noResults={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("should render a not found component and lastPlayedGames if noResults is equal true", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        loading={false}
        noResults={true}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
      />
    );

    expect(rendered.find("SearchNotFoundContainer")).toHaveLength(1);
  });

  test("should render all games if searchResults is empty", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        loading={false}
        noResults={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
      />
    );

    expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
  });

  test("should render search results", () => {
    const searchResults = ["I", "am", "search", "results"];

    const rendered = shallow(
      <GameSearch
        searchResults={searchResults}
        loading={false}
        noResults={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("List").props().items).toEqual(searchResults);
  });

  test("should render 1 search result and suggested games list", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        loading={false}
        noResults={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("Connect(GameSearchSuggestionsList)")).toHaveLength(1);
  });
});

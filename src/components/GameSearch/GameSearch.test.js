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

  test("should render a not found component if no match and query", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={"oooo"}
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

  test("should render 1 search result and Game List Skeleton if suggested games are not ready", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        suggestedGames={[]}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("List").prop("items")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(0);
    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("should render 1 search result and suggested games", () => {
    const suggestedGames = ["game"];
    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        loading={false}
        inputPromptPlaceholder={inputPromptPlaceholder}
        query={""}
        initFetchQuerySearch={initFetchQuerySearch}
        clearSearch={clearSearch}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        fetchPageBySlug={fetchPageBySlug}
        suggestedGames={suggestedGames}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("List").prop("items")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")[0].data).toEqual(
      suggestedGames
    );
    expect(rendered.find("GameListSkeleton")).toHaveLength(0);
  });
});

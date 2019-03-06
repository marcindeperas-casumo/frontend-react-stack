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
  const latestPlayedGamesTitle = "whatever";
  const popularGamesTitle = "whatever";

  test("Should render a search input", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        hasNoLatestPlayed={true}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        latestPlayedGames={[]}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        noResults={true}
        popularGames={[]}
        popularGamesTitle={popularGamesTitle}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        searchResults={[]}
        fetchPageBySlug={fetchPageBySlug}
        loading={true}
      />
    );

    expect(rendered.find("GameSearchInput")).toHaveLength(1);
  });

  test("should render a skeleton if loading is equal to true", () => {
    const rendered = shallow(
      <GameSearch
        clearSearch={clearSearch}
        hasNoLatestPlayed={true}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        latestPlayedGames={[]}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        noResults={true}
        popularGames={[]}
        popularGamesTitle={popularGamesTitle}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        searchResults={[]}
        fetchPageBySlug={fetchPageBySlug}
        loading={true}
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("should render a not found component and lastPlayedGames if noResults is equal true", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        latestPlayedGames={["starburst"]}
        fetchPageBySlug={fetchPageBySlug}
        noResults={true}
        clearSearch={clearSearch}
        hasNoLatestPlayed={false}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        popularGames={[]}
        popularGamesTitle={popularGamesTitle}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        loading={false}
      />
    );

    expect(rendered.find("SearchNotFoundContainer")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(1);
  });

  test("should render all games if searchResults does not exist", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        latestPlayedGames={["starburst"]}
        clearSearch={clearSearch}
        hasNoLatestPlayed={true}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        noResults={false}
        popularGames={[]}
        popularGamesTitle={popularGamesTitle}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        fetchPageBySlug={fetchPageBySlug}
        loading={false}
      />
    );

    expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
  });

  test("should render search results", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={["I", "am", "search", "results"]}
        latestPlayedGames={["starburst"]}
        clearSearch={clearSearch}
        hasNoLatestPlayed={true}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        noResults={false}
        popularGames={[]}
        popularGamesTitle={popularGamesTitle}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        fetchPageBySlug={fetchPageBySlug}
        loading={false}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
  });

  test("should render 1 search result and popular games if direct hit and player has no latest played games history", () => {
    const popularGames = ["whatever"];

    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        popularGames={popularGames}
        hasNoLatestPlayed={true}
        popularGamesTitle={popularGamesTitle}
        clearSearch={clearSearch}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        latestPlayedGames={[]}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        noResults={false}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        fetchPageBySlug={fetchPageBySlug}
        loading={false}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")).toEqual([
      { data: popularGames, title: popularGamesTitle },
    ]);
  });

  test("should render 1 search result and latest played games if direct hit and player has latest played games history", () => {
    const latestPlayedGames = ["I'm a latest played game"];

    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        latestPlayedGames={latestPlayedGames}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
        popularGames={[]}
        hasNoLatestPlayed={false}
        popularGamesTitle={popularGamesTitle}
        clearSearch={clearSearch}
        initFetchQuerySearch={initFetchQuerySearch}
        inputPromptPlaceholder={inputPromptPlaceholder}
        noResults={false}
        preloadFetchPlayerGames={preloadFetchPlayerGames}
        query={""}
        fetchPageBySlug={fetchPageBySlug}
        loading={false}
      />
    );

    expect(rendered.find("List")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")).toEqual([
      { data: latestPlayedGames, title: latestPlayedGamesTitle },
    ]);
  });
});

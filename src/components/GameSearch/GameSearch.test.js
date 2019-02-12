import React from "react";
import { shallow } from "enzyme";
import GameSearch from "Components/GameSearch/GameSearch";

describe("GameSearch", () => {
  test("Should render a search input", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        startFetchCmsPage={() => {}}
        loading={true}
      />
    );

    expect(rendered.find("GameSearchInput")).toHaveLength(1);
  });

  test("should render a skeleton if loading is equal to true", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[]}
        startFetchCmsPage={() => {}}
        loading={true}
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("should render a not found component and lastPlayedGames if hasNoResults is equal true", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={[""]}
        latestPlayedGames={["starburst"]}
        startFetchCmsPage={() => {}}
        loading={false}
        hasNoResults={true}
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
        startFetchCmsPage={() => {}}
        loading={false}
        hasNoResults={false}
      />
    );

    expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
  });

  test("should render search results", () => {
    const rendered = shallow(
      <GameSearch
        searchResults={["I", "am", "search", "results"]}
        latestPlayedGames={["starburst"]}
        startFetchCmsPage={() => {}}
        loading={false}
        hasNoResults={false}
      />
    );

    expect(rendered.find("List")).toHaveLength(1); // this will become expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
  });

  test("should render 1 search result and popular games if direct hit and player has no latest played games history", () => {
    const popularGames = ["whatever"];
    const popularGamesTitle = "I'm popular games";

    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        popularGames={popularGames}
        startFetchCmsPage={() => {}}
        loading={false}
        hasNoResults={false}
        hasNoLatestPlayed={true}
        popularGamesTitle={popularGamesTitle}
      />
    );

    expect(rendered.find("List")).toHaveLength(1); // this will become expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")).toEqual([
      { data: popularGames, title: popularGamesTitle },
    ]);
  });

  test("should render 1 search result and latest played games if direct hit and player has latest played games history", () => {
    const latestPlayedGames = ["I'm a latest played game"];
    const latestPlayedGamesTitle = "I'm latest playes games games";

    const rendered = shallow(
      <GameSearch
        searchResults={["I"]}
        latestPlayedGames={latestPlayedGames}
        startFetchCmsPage={() => {}}
        loading={false}
        hasNoResults={false}
        hasNoLatestPlayed={false}
        latestPlayedGamesTitle={latestPlayedGamesTitle}
      />
    );

    expect(rendered.find("List")).toHaveLength(1); // this will become expect(rendered.find("GamesVirtualListContainer")).toHaveLength(1);
    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")).toEqual([
      { data: latestPlayedGames, title: latestPlayedGamesTitle },
    ]);
  });
});

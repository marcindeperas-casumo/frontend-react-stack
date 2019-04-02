// @flow
import React from "react";
import { shallow } from "enzyme";
import GameSearchSuggestionsList from "./GameSearchSuggestionsList";

describe("GameSearch", () => {
  test("Should render a SectionList", () => {
    const rendered = shallow(
      <GameSearchSuggestionsList
        gameSearchSuggestedList={{
          title: "Latest Played",
          games: ["starburst"],
          location: "latestPlayedGames",
        }}
        gameSearchSuggestedLoading={false}
      />
    );

    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")).toEqual([
      {
        title: "Latest Played",
        data: ["starburst"],
      },
    ]);
  });

  test("Should render a skeleton if games are not fetched yet", () => {
    const rendered = shallow(
      <GameSearchSuggestionsList
        gameSearchSuggestedList={{
          games: [],
          title: "",
          location: "whatever",
        }}
        gameSearchSuggestedLoading={false}
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });
});

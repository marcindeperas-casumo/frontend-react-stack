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
          location: "whatever",
        }}
      />
    );

    expect(rendered.find("SectionList")).toHaveLength(1);
    expect(rendered.find("SectionList").prop("sections")).toEqual([
      {
        title: "Latest Played",
        data: ["starburst"],
        location: "whatever",
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
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });
});

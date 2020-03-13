// @flow
import React from "react";
import { shallow } from "enzyme";
import { GameSearchSuggestionsList } from "./GameSearchSuggestionsList";

describe("GameSearchSuggestionsList", () => {
  test("Should render a SectionList", () => {
    const rendered = shallow(
      <GameSearchSuggestionsList
        list={{
          title: "Latest Played",
          games: ["starburst"],
          location: "latestPlayedGames",
          type: "",
        }}
        loading={false}
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
        list={{
          games: [],
          title: "",
          location: "whatever",
          type: "",
        }}
        loading={false}
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });

  test("Should render a skeleton if loading is equal to true", () => {
    const rendered = shallow(
      <GameSearchSuggestionsList
        list={{
          games: ["whatever"],
          title: "",
          location: "whatever",
          type: "",
        }}
        loading
      />
    );

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
  });
});

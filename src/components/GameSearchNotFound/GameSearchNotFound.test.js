import React from "react";
import { shallow } from "enzyme";
import { GameSearchNotFound } from "Components/GameSearchNotFound/GameSearchNotFound";
import { SearchNotFound } from "Components/SearchNotFound";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList";

describe("GameSearchNotFound", () => {
  test("should render a SearchNotFound and a GameSearchSuggestionsList components", () => {
    const rendered = shallow(
      <GameSearchNotFound
        image={"Im a beautiful image"}
        title={"Im a beautiful title"}
        content={"Im a beautiful content"}
        list={[]}
        loading={false}
      />
    );

    expect(rendered.find(SearchNotFound)).toHaveLength(1);
    expect(rendered.find(GameSearchSuggestionsList)).toHaveLength(1);
  });
});

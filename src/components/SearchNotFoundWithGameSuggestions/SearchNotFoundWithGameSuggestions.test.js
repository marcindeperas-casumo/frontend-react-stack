import React from "react";
import { shallow } from "enzyme";
import { SearchNotFound } from "Components/SearchNotFound";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList/GameSearchSuggestionsList";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";

describe("SearchNotFoundWithGameSuggestions", () => {
  test("should render a SearchNotFound and a GameSearchSuggestionsList components", () => {
    const rendered = shallow(
      <SearchNotFoundWithGameSuggestions
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

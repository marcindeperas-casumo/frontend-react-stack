// @flow
import React from "react";
import { shallow } from "enzyme";
import FavouriteSportsAndCompetitionsSelectorModal from "./FavouriteSportsAndCompetitionsSelectorModal";

describe("<FavouriteSportsAndCompetitionsSelectorModal />", () => {
  test("should show sports selector by default", () => {
    const rendered = shallow(
      <FavouriteSportsAndCompetitionsSelectorModal onClose={() => {}} />
    );

    expect(rendered.find("FavouriteSportsSelectorModal")).toHaveLength(1);
    expect(rendered.find("FavouriteCompetitionsSelectorModal")).toHaveLength(0);
  });
});

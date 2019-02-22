// @flow
import React from "react";
import { shallow } from "enzyme";

import FavouriteSportsSelectorCompetitionsIntro from "./FavouriteSportsSelectorCompetitionsIntro";

describe("<FavouriteSportsSelectorCompetitionsIntro />", () => {
  test("should call onAdd when clicking on the add button", () => {
    const onAdd = jest.fn();
    const rendered = shallow(
      <FavouriteSportsSelectorCompetitionsIntro onAdd={onAdd} />
    );
    rendered.find("Button").simulate("click");
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});

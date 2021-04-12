import { ButtonPrimary } from "@casumo/cmp-button";
import React from "react";
import { shallow } from "enzyme";
import FavouriteSportsSelectorCompetitionsIntro from "./FavouriteSportsSelectorCompetitionsIntro";

describe("<FavouriteSportsSelectorCompetitionsIntro />", () => {
  test("should call onAdd when clicking on the add button", () => {
    const onAdd = jest.fn();
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteSportsSelectorCompetitionsIntro' cannot ... Remove this comment to see the full error message
      <FavouriteSportsSelectorCompetitionsIntro onAdd={onAdd} />
    );
    rendered.find(ButtonPrimary).simulate("click");
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});

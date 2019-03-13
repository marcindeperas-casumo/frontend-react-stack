import React from "react";
import { shallow } from "enzyme";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

describe("<FavouriteCompetitionsCount/>", () => {
  test("should render badge with correct count", () => {
    const rendered = shallow(<FavouriteCompetitionsCount count={5} />);

    expect(rendered.find("Badge").props().children).toBe(5);
  });

  test("should not render if count is 0 or not provided", () => {
    const rendered0 = shallow(<FavouriteCompetitionsCount count={0} />);
    const renderedUndefined = shallow(<FavouriteCompetitionsCount />);
    const renderedNull = shallow(<FavouriteCompetitionsCount count={null} />);

    expect(rendered0.html()).toBeNull();
    expect(renderedUndefined.html()).toBeNull();
    expect(renderedNull.html()).toBeNull();
  });
});

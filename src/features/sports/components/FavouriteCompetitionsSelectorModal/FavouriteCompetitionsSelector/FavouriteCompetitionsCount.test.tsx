import React from "react";
import { shallow } from "enzyme";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

describe("<FavouriteCompetitionsCount/>", () => {
  test("should render badge with correct count", () => {
    // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsCount' cannot be used as a J... Remove this comment to see the full error message
    const rendered = shallow(<FavouriteCompetitionsCount count={5} />);

    expect(rendered.find("Badge").props().children).toBe(5);
  });

  test("should not render if count is 0 or not provided", () => {
    // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsCount' cannot be used as a J... Remove this comment to see the full error message
    const rendered0 = shallow(<FavouriteCompetitionsCount count={0} />);
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'count' is missing in type '{}' but requi... Remove this comment to see the full error message
    const renderedUndefined = shallow(<FavouriteCompetitionsCount />);
    // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsCount' cannot be used as a J... Remove this comment to see the full error message
    const renderedNull = shallow(<FavouriteCompetitionsCount count={null} />);

    expect(rendered0.html()).toBeNull();
    expect(renderedUndefined.html()).toBeNull();
    expect(renderedNull.html()).toBeNull();
  });
});

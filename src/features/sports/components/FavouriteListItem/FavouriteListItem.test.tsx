// @flow

import React from "react";
import { shallow } from "enzyme";
import FavouriteListItem from "./FavouriteListItem";

describe("<FavouriteListItem />", () => {
  test("should render without error", () => {
    const rendered = shallow(<FavouriteListItem label="Test label" />);

    expect(rendered.contains("Test label")).toBe(true);
  });

  test("should call onClick when clicked", () => {
    const onClick = jest.fn();
    const rendered = shallow(
      <FavouriteListItem label="Test label" onClick={onClick} />
    );

    rendered.simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should display as favourited when isFavourited is true", () => {
    const renderedNotFavourite = shallow(
      <FavouriteListItem label="Test label" isFavourite={false} />
    );
    const renderedFavourite = shallow(
      <FavouriteListItem label="Test label" isFavourite={true} />
    );
    const notFavouritedIndicator = renderedNotFavourite.find(
      '[data-test="favourite-list-item-indicator"]'
    );
    const favouritedIndicator = renderedFavourite.find(
      '[data-test="favourite-list-item-indicator"]'
    );

    expect(notFavouritedIndicator.hasClass("t-background-grey-0")).toBe(true);
    expect(notFavouritedIndicator.hasClass("t-background-purple-60")).toBe(
      false
    );
    expect(favouritedIndicator.hasClass("t-background-grey-0")).toBe(false);
    expect(favouritedIndicator.hasClass("t-background-purple-60")).toBe(true);
  });

  test("should not render the indicator if list item is not favouritable", () => {
    const rendered = shallow(
      <FavouriteListItem label="Test label" isFavouritable={false} />
    );

    expect(
      rendered.find('[data-test="favourite-list-item-indicator"]')
    ).toHaveLength(0);
  });
});

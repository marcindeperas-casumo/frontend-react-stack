import React from "react";
import { shallow, mount } from "enzyme";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import { VALUABLE_TYPES } from "Models/valuables";
import ImageLazy from "Components/Image/ImageLazy";
import { ValuableRow } from "./ValuableRow";
import { mockValuable as mockData } from "./__mocks__/Valuable.mock";

const onCardClick = jest.fn();

describe("ValuableRow", () => {
  test("should always pass an image url to ValuableThumbnail if type is not SPINS", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const { backgroundImage: expectedValue } = mockValuable;
    const rendered = mount(
      <ValuableRow {...mockValuable} onCardClick={onCardClick} />
    );
    const actualValue = rendered
      .find(ValuableThumbnail)
      .find(ImageLazy)
      .prop("src");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should not display any description if valuableType is not SPINS", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const rendered = shallow(
      <ValuableRow {...mockValuable} onCardClick={onCardClick} />
    );

    expect(
      rendered.find({ "data-test": "valuable-row-description" })
    ).toHaveLength(0);
  });

  test("should call the onClick function on click of card", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const rendered = shallow(
      <ValuableRow {...mockValuable} onCardClick={onCardClick} />
    );

    rendered.find({ "data-test": "valuable-row" }).simulate("click");

    expect(onCardClick).toBeCalledTimes(1);
  });

  test("should add css class if provided", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const mockCssClass = "my-css-class";
    const rendered = shallow(
      <ValuableRow
        {...mockValuable}
        onCardClick={onCardClick}
        className={mockCssClass}
      />
    );

    expect(rendered.hasClass(mockCssClass));
  });
});

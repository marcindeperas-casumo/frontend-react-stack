import React from "react";
import { shallow, mount } from "enzyme";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import { VALUABLE_TYPES } from "Models/valuables";
import MaskImage from "Components/MaskImage";
import { ValuableCard } from "./ValuableCard";
import { mockValuable as mockData } from "./__mocks__/Valuable.mock";

const onCardClick = jest.fn();

describe("ValuableCard", () => {
  test("should always pass an image url to ValuableThumbnail if type is not SPINS", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const { backgroundImage: expectedValue } = mockValuable;
    const rendered = mount(
      <ValuableCard {...mockValuable} onCardClick={onCardClick} />
    );
    const actualValue = rendered
      .find(ValuableThumbnail)
      .find(MaskImage)
      .prop("imageUrl");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should not display any description if valuableType is not SPINS", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const rendered = shallow(
      <ValuableCard {...mockValuable} onCardClick={onCardClick} />
    );

    expect(
      rendered.find('[data-test="valuable-card-description"]')
    ).toHaveLength(0);
  });

  test("should call the onClick function on click of card", () => {
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const rendered = shallow(
      <ValuableCard {...mockValuable} onCardClick={onCardClick} />
    );

    rendered.find('[data-test="valuable-card"]').simulate("click");

    expect(onCardClick).toBeCalledTimes(1);
  });
});

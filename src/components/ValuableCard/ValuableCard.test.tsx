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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'backgroundImage' does not exist on type ... Remove this comment to see the full error message
    const { backgroundImage: expectedValue } = mockValuable;
    const rendered = mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ValuableCard {...mockValuable} onCardClick={onCardClick} />
    );
    const actualValue = rendered
      .find(ValuableThumbnail)
      .find(MaskImage)
      .prop("imageUrl");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should not display any description if valuableType is not SPINS", () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    const mockValuable = mockData(VALUABLE_TYPES.CASH);
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ValuableCard {...mockValuable} onCardClick={onCardClick} />
    );

    expect(
      rendered.find('[data-test="valuable-card-description"]')
    ).toHaveLength(0);
  });

  test("should call the onClick function on click of card", () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    const mockValuable = mockData(VALUABLE_TYPES.CASH);

    const rendered = shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ValuableCard {...mockValuable} onCardClick={onCardClick} />
    );

    rendered.find('[data-test="valuable-card"]').simulate("click");

    expect(onCardClick).toBeCalledTimes(1);
  });
});

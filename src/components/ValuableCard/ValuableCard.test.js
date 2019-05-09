import React from "react";
import { shallow } from "enzyme";
import { compose, prop } from "ramda";
import mockData from "Components/ValuableCard/__mocks__/Valuable.mock";
import ValuableCard from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import { CoinValueToSpinType } from "./ValuableCard.utils";

describe("ValuableCard", () => {
  let rendered;
  let mockValuable;

  beforeEach(() => {
    mockValuable = mockData(VALUABLE_TYPES.CASH);

    rendered = shallow(<ValuableCard {...mockValuable} />);
  });

  test("should pass on game image url to valuable header if type is SPINS", () => {
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedValue = compose(
      prop("gameImageUrl"),
      prop("game")
    )(mockValuable);

    rendered = shallow(<ValuableCard {...mockValuable} />);

    const actualValue = rendered
      .find("ValuableHeaderBackground")
      .prop("imageUrl");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should not pass any image url to ValuableHeader if type is not SPINS", () => {
    const expectedValue = "";

    const actualValue = rendered
      .find("ValuableHeaderBackground")
      .prop("imageUrl");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should justify reward content if type is CASH", () => {
    expect(rendered.find("ValuableReward").prop("justifyCenter")).toBe(true);
  });

  test("should not justify reward content if type is not CASH", () => {
    mockValuable = mockData(VALUABLE_TYPES.DEPOSIT);

    rendered = shallow(<ValuableCard {...mockValuable} />);

    expect(rendered.find("ValuableReward").prop("justifyCenter")).toBe(false);
  });

  test("should display game title as description if valuableType is SPINS", () => {
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedGameDetails = mockValuable.game;

    rendered = shallow(<ValuableCard {...mockValuable} />);

    expect(rendered.find(".c-valuable-card__content-description").text()).toBe(
      expectedGameDetails.title
    );
  });

  test("should not display any description if valuableType is not SPINS", () => {
    const contentDescriptionIdentifier =
      ".c-valuable-card__content-description";

    expect(rendered.find(contentDescriptionIdentifier)).toHaveLength(0);
  });

  test("should include spinType in class if valuableType is SPINS", () => {
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedValue = CoinValueToSpinType(mockValuable.coinValue);

    rendered = shallow(<ValuableCard {...mockValuable} />);

    expect(rendered.find("ValuableHeaderBackground").hasClass(expectedValue));
  });
});

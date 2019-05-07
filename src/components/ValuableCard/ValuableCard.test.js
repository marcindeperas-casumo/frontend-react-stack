import React from "react";
import { shallow, mount } from "enzyme";
import { compose, prop } from "ramda";
import mockData from "Components/ValuableCard/__mocks__/Valuable.mock";
import ValuableCard from "Components/ValuableCard";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import ValuableHeaderBackground from "./ValuableHeaderBackground";

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
});

describe("ValubaleHeaderBackground", () => {
  let rendered;

  test("should render content inside valuable header", () => {
    rendered = shallow(
      <ValuableHeaderBackground>
        <div className="foo-bar">Foo</div>
      </ValuableHeaderBackground>
    );

    expect(rendered.find(".foo-bar")).toHaveLength(1);
  });
});

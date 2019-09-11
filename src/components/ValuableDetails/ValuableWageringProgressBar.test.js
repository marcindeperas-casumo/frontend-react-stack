import React from "react";
import { shallow } from "enzyme";
import { ValuableWageringProgressBar } from "./ValuableWageringProgressBar";

describe("ValuableWageringProgressBar", () => {
  let rendered;
  const props = {
    leftToWager: 90,
    wageringThreshold: 100,
    currency: "EUR",
    market: "en",
    label: "You have {{amount}} left to wager",
  };
  const amountWagered = (1 - props.leftToWager / props.wageringThreshold) * 100;

  beforeEach(() => {
    rendered = shallow(<ValuableWageringProgressBar {...props} />);
  });

  test("should render a progress bar with correct props", () => {
    expect(
      rendered
        .find("[data-test='valuable-wagering-progress-bar']")
        .prop("progress")
    ).toBe(amountWagered);
  });

  test("should render text where amount replaced with correct value", () => {
    expect(
      rendered
        .find("[data-test='valuable-wagering-progress-text']")
        .find("DangerousHtml")
        .prop("html")
    ).toBe(`You have €${props.leftToWager} left to wager`);
  });
});

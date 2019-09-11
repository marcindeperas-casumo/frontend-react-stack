import React from "react";
import { shallow } from "enzyme";
import mockTranslations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock.json";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableDetails, expirationBadgeClasses } from "./ValuableDetails";
import mockValuables from "./__mocks__/Valuables.json";
import OpenPadlock from "./open-padlock.svg";

describe("ValuableDetails", () => {
  let rendered;
  let mockValuable = mockValuables[0];
  const Foo = () => <div>baz</div>;
  let onConsume;

  beforeEach(() => {
    onConsume = jest.fn().mockResolvedValue(true);

    rendered = shallow(
      <ValuableDetails
        valuableDetails={mockValuable}
        translations={mockTranslations}
        onConsumeValuable={onConsume}
      >
        <Foo />
      </ValuableDetails>
    );
  });

  test("should render a given component with it's props in the header", () => {
    const foo = rendered.find(Foo);

    expect(foo).toHaveLength(1);
  });

  test("should render red expiration badge if expirationInHours is > 24", () => {
    expect(
      rendered.find("[data-test='valuable-expiration-badge']").prop("bgColor")
    ).toBe(expirationBadgeClasses.default);
  });

  test("should not render wagering progress bar if no wagering details are provided", () => {
    expect(
      rendered.find({ "data-test": "valuable-details-wagering-progress-bar" })
    ).toHaveLength(0);
  });

  test("should render wagering progress bar if wagering details are provided", () => {
    rendered = shallow(
      <ValuableDetails
        valuableDetails={{
          ...mockValuable,
          leftToWager: 90,
          wageringThreshold: 100,
        }}
        translations={mockTranslations}
      />
    );
    expect(
      rendered.find({ "data-test": "valuable-details-wagering-progress-bar" })
    ).toHaveLength(1);
  });

  test("should render red expiration badge if expirationInHours is <= 24", () => {
    const expirationHours = 5;

    rendered = shallow(
      <ValuableDetails
        valuableDetails={{
          ...mockValuable,
          expirationTimeInHours: expirationHours,
        }}
        translations={mockTranslations}
      >
        <Foo />
      </ValuableDetails>
    );

    expect(
      rendered
        .find({ "data-test": "valuable-expiration-badge" })
        .prop("bgColor")
    ).toBe(expirationBadgeClasses.expiresToday);
  });

  test("should display the expiration in hours if expiration is <= 24 hours", () => {
    const expirationHours = 5;
    const expectedExpirationText = `${mockTranslations.expirationTimeLabel} ${expirationHours} Hours`;
    rendered = shallow(
      <ValuableDetails
        valuableDetails={{
          ...mockValuable,
          expirationTimeInHours: expirationHours,
        }}
        translations={mockTranslations}
      >
        <Foo />
      </ValuableDetails>
    );

    expect(
      rendered
        .find({ "data-test": "valuable-expiration-badge" })
        .dive()
        .find("span")
        .text()
    ).toEqual(expectedExpirationText);
  });

  test("should display the expiration in days if expiration is >= 24 hours", () => {
    const expirationHours = 300;
    const days = Math.floor(expirationHours / 24);
    const expectedExpirationText = `${mockTranslations.expirationTimeLabel} ${days} Days`;

    rendered = shallow(
      <ValuableDetails
        valuableDetails={{
          ...mockValuable,
          expirationTimeInHours: expirationHours,
        }}
        expirationTimeInHours={expirationHours}
        translations={mockTranslations}
      >
        <Foo />
      </ValuableDetails>
    );

    expect(
      rendered
        .find({ "data-test": "valuable-expiration-badge" })
        .dive()
        .find("span")
        .text()
    ).toEqual(expectedExpirationText);
  });

  test("should display open padlock icon when valuable is LOCKED", () => {
    rendered = shallow(
      <ValuableDetails
        valuableDetails={{
          ...mockValuable,
          valuableState: VALUABLE_STATES.LOCKED,
        }}
        translations={mockTranslations}
      >
        <Foo />
      </ValuableDetails>
    );

    expect(
      rendered
        .find({ "data-test": "expiration-badge-content" })
        .dive()
        .find(OpenPadlock)
    ).toHaveLength(1);
  });

  test("should not display open padlock icon if valuable is NOT LOCKED", () => {
    expect(
      rendered
        .find({ "data-test": "expiration-badge-content" })
        .dive()
        .find(OpenPadlock)
    ).toHaveLength(0);
  });

  test("should call the onConsume and onlaunch if type is spins and unlocked", async () => {
    mockValuable = mockValuables[2];

    rendered = shallow(
      <ValuableDetails
        valuableDetails={mockValuable}
        translations={mockTranslations}
        onConsumeValuable={onConsume}
      >
        <Foo />
      </ValuableDetails>
    );

    const actionButton = rendered.find({
      "data-test": "valuable-action-button",
    });
    actionButton.simulate("click");

    await expect(onConsume).toHaveBeenCalledTimes(1);
  });

  test("should call not neither onConsume and onlaunch if type is deposit", () => {
    mockValuable = mockValuables[1];

    rendered = shallow(
      <ValuableDetails
        valuableDetails={mockValuable}
        translations={mockTranslations}
        onConsumeValuable={onConsume}
      >
        <Foo />
      </ValuableDetails>
    );

    const actionButton = rendered.find({
      "data-test": "valuable-action-button",
    });
    actionButton.simulate("click");

    expect(onConsume).toHaveBeenCalledTimes(0);
  });

  test("should only call on consume if type is cash", () => {
    mockValuable = mockValuables[0];

    rendered = shallow(
      <ValuableDetails
        valuableDetails={mockValuable}
        translations={mockTranslations}
        onConsumeValuable={onConsume}
      >
        <Foo />
      </ValuableDetails>
    );

    const actionButton = rendered.find({
      "data-test": "valuable-action-button",
    });
    actionButton.simulate("click");

    expect(onConsume).toHaveBeenCalledTimes(1);
  });
});

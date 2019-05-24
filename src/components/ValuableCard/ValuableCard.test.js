import React from "react";
import { shallow } from "enzyme";
import { compose, prop } from "ramda";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import ValuableCard from "./ValuableCard";
import {
  mockValuable as mockData,
  mockExpiryDate,
} from "./__mocks__/Valuable.mock";
import { CoinValueToSpinType } from "./ValuableCard.utils";

describe("ValuableCard", () => {
  const valuableCardStateBadgeSelector = "ValuableCardStateBadge";
  let rendered;
  let mockValuable;
  let mockedExpiryDate;

  beforeEach(() => {
    mockValuable = mockData(VALUABLE_TYPES.CASH);
    mockedExpiryDate = mockExpiryDate(100);

    rendered = shallow(
      <ValuableCard {...mockValuable} expiryDate={mockedExpiryDate} />
    );
  });

  test("should pass on game image url to valuable header if type is SPINS", () => {
    mockedExpiryDate = mockExpiryDate(100);

    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedValue = compose(
      prop("backgroundImage"),
      prop("game")
    )(mockValuable);

    rendered = shallow(
      <ValuableCard {...mockValuable} expiryDate={mockedExpiryDate} />
    );

    const actualValue = rendered
      .find("ValuableHeaderBackground")
      .prop("imageUrl");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should always have an image url to ValuableHeader if type is not SPINS", () => {
    const { backgroundImageUrl: expectedValue } = mockValuable;

    const actualValue = rendered
      .find("ValuableHeaderBackground")
      .prop("imageUrl");

    expect(actualValue).toEqual(expectedValue);
  });

  test("should justify reward content if type is CASH", () => {
    expect(rendered.find("ValuableReward").prop("justifyCenter")).toBe(true);
  });

  test("should not justify reward content if type is not CASH", () => {
    mockedExpiryDate = mockExpiryDate(50);
    mockValuable = mockData(VALUABLE_TYPES.DEPOSIT);

    rendered = shallow(
      <ValuableCard {...mockValuable} expiryDate={mockedExpiryDate} />
    );

    expect(rendered.find("ValuableReward").prop("justifyCenter")).toBe(false);
  });

  test("should display game name as description if valuableType is SPINS", () => {
    mockedExpiryDate = mockExpiryDate(50);
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedGameDetails = mockValuable.game;

    rendered = shallow(
      <ValuableCard {...mockValuable} expiryDate={mockedExpiryDate} />
    );

    expect(rendered.find(".c-valuable-card__content-description").text()).toBe(
      expectedGameDetails.name
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
    mockedExpiryDate = mockExpiryDate(100);

    rendered = shallow(
      <ValuableCard {...mockValuable} expiryDate={mockedExpiryDate} />
    );

    expect(rendered.find("ValuableHeaderBackground").hasClass(expectedValue));
  });

  test("should render caveat", () => {
    const expectedValue = mockValuable.caveat;

    expect(rendered.find('[data-test="valuableCard-caveat"]').text()).toEqual(
      expectedValue
    );
  });

  test("should show locked if valuable state is LOCKED", () => {
    mockedExpiryDate = mockExpiryDate(100);
    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        valuableState={VALUABLE_STATES.LOCKED}
      />
    );

    const stateBadge = rendered.find(valuableCardStateBadgeSelector);
    expect(stateBadge.prop("text")).toEqual(VALUABLE_STATES.LOCKED);
  });

  test("should not show anything if state expiry date is more than 24hrs", () => {
    mockedExpiryDate = mockExpiryDate(30);

    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        valuableState={VALUABLE_STATES.DEFAULT}
      />
    );

    expect(rendered.find(valuableCardStateBadgeSelector)).toHaveLength(0);
  });

  test("should show expiry in hours if state is DEFAULT and expiry date is less than 24hrs", () => {
    mockedExpiryDate = mockExpiryDate(5);
    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        valuableState={VALUABLE_STATES.DEFAULT}
      />
    );

    expect(rendered.find(valuableCardStateBadgeSelector)).toHaveLength(1);
  });
});

import React from "react";
import { shallow } from "enzyme";
import { compose, prop } from "ramda";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import translationsMock from "Components/PlayerValuableListHorizontal/__mocks__/translations.mock.json";
import { ValuableCard } from "./ValuableCard";
import {
  mockValuable as mockData,
  mockExpiryDate,
} from "./__mocks__/Valuable.mock";
import { coinValueToSpinType } from "./ValuableCard.utils";

describe("ValuableCard", () => {
  const valuableCardStateBadgeSelector = "ValuableCardStateBadge";
  const onCardClick = jest.fn();
  let rendered;
  let mockValuable;
  let mockedExpiryDate;

  beforeEach(() => {
    mockValuable = mockData(VALUABLE_TYPES.CASH);
    mockedExpiryDate = mockExpiryDate(100);

    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        onCardClick={onCardClick}
        hoursUnit={translationsMock.hoursUnit}
      />
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
    const { backgroundImage: expectedValue } = mockValuable;

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
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        hoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find("ValuableReward").prop("justifyCenter")).toBe(false);
  });

  test("should display game name as description if valuableType is SPINS", () => {
    mockedExpiryDate = mockExpiryDate(50);
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedGameDetails = mockValuable.game;

    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        hoursUnit={translationsMock.hoursUnit}
      />
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
    const expectedValue = coinValueToSpinType(mockValuable.coinValue);
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
        hoursUnit={translationsMock.hoursUnit}
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
        valuableState={VALUABLE_STATES.FRESH}
        hoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find(valuableCardStateBadgeSelector)).toHaveLength(0);
  });

  test("should show expiry in hours if state is FRESH and expiry date is less than 24hrs", () => {
    mockedExpiryDate = mockExpiryDate(5);
    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        valuableState={VALUABLE_STATES.FRESH}
        hoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find(valuableCardStateBadgeSelector)).toHaveLength(1);
  });

  test("should call the onClick function on click of card", () => {
    rendered.find('[data-test="valuable-card"]').simulate("click");

    expect(onCardClick).toBeCalledTimes(1);
  });

  test("should display hours with hours unit for bonus time remaining", () => {
    const mockedHours = 2;
    const expectedText = translationsMock.hoursUnit.replace(
      "{{hours}}",
      mockedHours
    );
    mockedExpiryDate = mockExpiryDate(mockedHours);
    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        expiryDate={mockedExpiryDate}
        valuableState={VALUABLE_STATES.FRESH}
        hoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find("ValuableCardStateBadge").prop("text")).toEqual(
      expectedText
    );
  });
});

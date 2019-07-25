import React from "react";
import { shallow } from "enzyme";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import translationsMock from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { ValuableCard } from "./ValuableCard";
import { mockValuable as mockData } from "./__mocks__/Valuable.mock";
import { coinValueToSpinType } from "./ValuableCard.utils";

describe("ValuableCard", () => {
  const valuableCardStateBadgeSelector = "ValuableCardStateBadge";
  const onCardClick = jest.fn();
  let rendered;
  let mockValuable;

  beforeEach(() => {
    mockValuable = mockData(VALUABLE_TYPES.CASH);

    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        onCardClick={onCardClick}
        translatedHoursUnit={translationsMock.hoursUnit}
      />
    );
  });

  test("should pass on game image url to valuable header if type is SPINS", () => {
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const { backgroundImage: expectedValue } = mockValuable;

    rendered = shallow(<ValuableCard {...mockValuable} />);

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
    mockValuable = mockData(VALUABLE_TYPES.DEPOSIT);

    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        translatedHoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find("ValuableReward").prop("justifyCenter")).toBe(false);
  });

  test("should display game name as description if valuableType is SPINS", () => {
    mockValuable = mockData(VALUABLE_TYPES.SPINS);
    const expectedGameDetails = mockValuable.game;

    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        translatedHoursUnit={translationsMock.hoursUnit}
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

    rendered = shallow(<ValuableCard {...mockValuable} />);

    expect(rendered.find("ValuableHeaderBackground").hasClass(expectedValue));
  });

  test("should render caveat", () => {
    const expectedValue = mockValuable.caveat;

    expect(rendered.find('[data-test="valuableCard-caveat"]').text()).toEqual(
      expectedValue
    );
  });

  test("should show locked if valuable state is LOCKED", () => {
    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        valuableState={VALUABLE_STATES.LOCKED}
        translatedHoursUnit={translationsMock.hoursUnit}
      />
    );

    const stateBadge = rendered.find(valuableCardStateBadgeSelector);
    expect(stateBadge.prop("text")).toEqual(VALUABLE_STATES.LOCKED);
  });

  test("should not show anything if state expiry date is more than 24hrs", () => {
    const valuable = {
      ...mockValuable,
      expirationTimeInHours: 30,
    };

    rendered = shallow(
      <ValuableCard
        {...valuable}
        valuableState={VALUABLE_STATES.FRESH}
        translatedHoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find(valuableCardStateBadgeSelector)).toHaveLength(0);
  });

  test("should show expiry in hours if state is FRESH and expiry date is less than 24hrs", () => {
    const valuable = {
      ...mockValuable,
      expirationTimeInHours: 5,
    };
    rendered = shallow(
      <ValuableCard
        {...valuable}
        valuableState={VALUABLE_STATES.FRESH}
        translatedHoursUnit={translationsMock.hoursUnit}
      />
    );

    expect(rendered.find(valuableCardStateBadgeSelector)).toHaveLength(1);
  });

  test("should call the onClick function on click of card", () => {
    rendered.find('[data-test="valuable-card"]').simulate("click");

    expect(onCardClick).toBeCalledTimes(1);
  });

  test("should render a € cash symbol when passed 'en' market and EUR currency", () => {
    const renderedCashSymbol = shallow(rendered.instance().cashSymbol());

    expect(renderedCashSymbol.prop("children")).toEqual("€");
  });

  test("should render a £ cash symbol when passed 'gb' market and GBP currency", () => {
    rendered = shallow(
      <ValuableCard
        {...mockValuable}
        market="gb"
        currency="GBP"
        translatedHoursUnit={translationsMock.hoursUnit}
      />
    );
    const renderedCashSymbol = shallow(rendered.instance().cashSymbol());

    expect(renderedCashSymbol.prop("children")).toEqual("£");
  });
});

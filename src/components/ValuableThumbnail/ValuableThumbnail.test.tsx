import React from "react";
import { shallow, mount } from "enzyme";
import mockTranslations from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { VALUABLE_TYPES } from "Models/valuables";
import * as utils from "Utils";
import { mockValuable as mockData } from "../ValuableCard/__mocks__/Valuable.mock";
import { ValuableThumbnail } from "./ValuableThumbnail";
import { CashbackIcon } from "./icons";

jest.mock("Utils", () => ({
  //  apply fix if you know the context (there is no need to add TEE "Ts-Expect-Error" in this case)
  ...jest.requireActual("../../utils/utils"),
  interpolate: jest.fn(),
}));

describe("ValuableThumbnail", () => {
  let rendered;
  let mockCashValuable = mockData(VALUABLE_TYPES.CASH);
  let mockCashbackValuable = mockData(VALUABLE_TYPES.CASHBACK);
  let expiryTimeLeft = { hours: 10, minutes: 10 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render in hours when time left to expire is less than 24", () => {
    shallow(
      <ValuableThumbnail
        {...mockCashValuable}
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'seconds' is missing in type '{ hours: nu... Remove this comment to see the full error message
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );
    const interpoloated = jest.spyOn(utils, "interpolate");

    expect(interpoloated).toHaveBeenCalledWith(mockTranslations.hoursLabel, {
      value: expiryTimeLeft.hours,
    });
  });

  test("should render in minutes when time left to expire is less than an hour", () => {
    expiryTimeLeft = { hours: 0, minutes: 30 };
    shallow(
      <ValuableThumbnail
        {...mockCashValuable}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ hours: number; minutes: number; }' is not ... Remove this comment to see the full error message
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );

    const interpoloated = jest.spyOn(utils, "interpolate");

    expect(interpoloated).toHaveBeenCalledWith(mockTranslations.minutesLabel, {
      value: expiryTimeLeft.minutes,
    });
  });

  test("should not get text for expiry if expiry is not within 24 hours", () => {
    expiryTimeLeft = { hours: 30, minutes: 0 };
    shallow(
      <ValuableThumbnail
        {...mockCashValuable}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ hours: number; minutes: number; }' is not ... Remove this comment to see the full error message
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );

    const interpoloated = jest.spyOn(utils, "interpolate");

    expect(interpoloated).toHaveBeenCalledTimes(0);
  });

  test("should render cashback svg icon if valuable type is Cashback", () => {
    rendered = mount(
      <ValuableThumbnail
        {...mockCashbackValuable}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ hours: number; minutes: number; }' is not ... Remove this comment to see the full error message
        expiryTimeLeft={expiryTimeLeft}
        translations={mockTranslations}
      />
    );

    expect(rendered.find(CashbackIcon).exists()).toBe(true);
  });
});

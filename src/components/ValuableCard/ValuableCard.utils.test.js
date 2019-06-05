import {
  VALUABLE_SPIN_TYPES,
  VALUABLE_TYPES,
  VALUABLE_STATES,
} from "Models/valuables";
import {
  coinValueToSpinType,
  getCardUrl,
  VALUABLE_LOCKED_URL,
  VALUABLE_SPINS_URL,
  VALUABLE_DEPOSIT_URL,
  formatHoursRemainig,
} from "./ValuableCard.utils";

describe("ValuableCard.utils", () => {
  test("should return BASIC spinType when coinValue < 0.3", () => {
    const coinValue = 0.2;
    const expectedValue = VALUABLE_SPIN_TYPES.BASIC_SPINS;

    expect(coinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return BONUS spinType when 0.3 < coinValue <= 0.9", () => {
    const coinValue = 0.5;
    const expectedValue = VALUABLE_SPIN_TYPES.BONUS;

    expect(coinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return SUPER spinType when 0.9 < coinValue <= 3", () => {
    const coinValue = 2;
    const expectedValue = VALUABLE_SPIN_TYPES.SUPER;

    expect(coinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return MEGA spinType coinValue > 3", () => {
    const coinValue = 4;
    const expectedValue = VALUABLE_SPIN_TYPES.MEGA;

    expect(coinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return the lock url if valuable type is locked and type is spins", () => {
    expect(getCardUrl(VALUABLE_STATES.LOCKED, VALUABLE_TYPES.SPINS)).toEqual(
      VALUABLE_LOCKED_URL
    );
  });

  test("should return the deposit url when state is not locked and type is deposit", () => {
    expect(getCardUrl(VALUABLE_STATES.FRESH, VALUABLE_TYPES.DEPOSIT)).toEqual(
      VALUABLE_DEPOSIT_URL
    );
  });

  test("should return null when state is not locked and type is cash", () => {
    expect(getCardUrl(VALUABLE_STATES.FRESH, VALUABLE_TYPES.CASH)).toEqual(
      null
    );
  });

  test("should return spins url when state is not locked and type is spins", () => {
    expect(getCardUrl(VALUABLE_STATES.FRESH, VALUABLE_TYPES.SPINS)).toEqual(
      VALUABLE_SPINS_URL
    );
  });

  test("shohuld format time when hours is > 0", () => {
    const mockedHours = 2;
    const mockedUnit = "{{hours}}foo";
    const expectedFormat = mockedUnit.replace("{{hours}}", mockedHours);

    expect(formatHoursRemainig(mockedHours, mockedUnit)).toEqual(
      expectedFormat
    );
  });

  test("should display -1 if time is less than 1", () => {
    const mockedHours = 0;
    const mockedUnit = "{{hours}}foo";

    expect(formatHoursRemainig(mockedHours, mockedUnit)).toEqual(
      mockedUnit.replace("{{hours}}", "-1")
    );
  });
});

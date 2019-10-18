// @flow
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
  VALUABLE_SPIN_TYPES,
  type ValuableActionProps,
} from "Models/valuables";
import {
  getValuableDetailsAction,
  gameBrowserRouteId,
  durationToTranslationKey,
  coinValueToSpinType,
  isAboutToExpire,
  showStateBadge,
  getValuablesByState,
} from "./valuables.utils";
import translations from "./__mocks__/valuableDetailsTranslations.mock.json";

describe("Valuables.utils", () => {
  let valuableType;
  let valuableState;
  let requirementType;

  beforeEach(() => {
    valuableType = VALUABLE_TYPES.DEPOSIT;
    valuableState = VALUABLE_STATES.FRESH;
    requirementType = VALUABLE_REQUIREMENT_TYPES.DEPOSIT;
  });

  test("should return an empty url and deposit translations when type is DEPOSIT un/locked and set deposit selected", () => {
    const expectedValue = getExpectedActionValue(
      translations.depositNowLabel,
      true
    );

    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return gamebrowser url and play now translation when type is CASH unlocked", () => {
    valuableType = VALUABLE_TYPES.CASH;

    const expectedValue = getExpectedActionValue(
      translations.cashUnlockedActionLabel,
      false,
      gameBrowserRouteId
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return gamebrowser url and play now translation when type is SPINS unlocked", () => {
    valuableType = VALUABLE_TYPES.SPINS;

    const expectedValue = getExpectedActionValue(
      translations.spinsUnlockedActionLabel
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return an empty url and depositToUnlock label when CASH, locked with deposit req.", () => {
    valuableType = VALUABLE_TYPES.CASH;
    valuableState = VALUABLE_STATES.LOCKED;
    requirementType = VALUABLE_REQUIREMENT_TYPES.DEPOSIT;

    const expectedValue = getExpectedActionValue(
      translations.depositToUnlockLabel,
      true
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return gamebrowser url and playToUnlock label when CASH, locked with wager req.", () => {
    valuableType = VALUABLE_TYPES.CASH;
    valuableState = VALUABLE_STATES.LOCKED;
    requirementType = VALUABLE_REQUIREMENT_TYPES.WAGER;

    const expectedValue = getExpectedActionValue(
      translations.playToUnlockLabel,
      false,
      gameBrowserRouteId
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return an empty url and depositToUnlock label when SPINS, locked with deposit req.", () => {
    valuableType = VALUABLE_TYPES.SPINS;
    valuableState = VALUABLE_STATES.LOCKED;
    requirementType = VALUABLE_REQUIREMENT_TYPES.DEPOSIT;

    const expectedValue = getExpectedActionValue(
      translations.depositToUnlockLabel,
      true
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return empty url and playToUnlock label when SPINS, locked with wager req.", () => {
    valuableType = VALUABLE_TYPES.SPINS;
    valuableState = VALUABLE_STATES.LOCKED;
    requirementType = VALUABLE_REQUIREMENT_TYPES.WAGER;

    const expectedValue = getExpectedActionValue(
      translations.playToUnlockLabel,
      false,
      gameBrowserRouteId
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return the singular translation of the correct duration", () => {
    const expiration = 1;
    const key = "hours";
    const expectedValue = "hour_singular";

    const actualValue = durationToTranslationKey(key, expiration);

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return the plural translation of the correct duration", () => {
    const expiration = 5;
    const key = "hours";
    const expectedValue = "hour_plural";

    const actualValue = durationToTranslationKey(key, expiration);

    expect(actualValue).toEqual(expectedValue);
  });

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

  describe("isAboutToExpire", () => {
    test("should return true if less than 24 hours to expiry", () => {
      expect(isAboutToExpire(10)).toBe(true);
    });

    test("should return false if greater than 24 hours to expiry", () => {
      expect(isAboutToExpire(100)).toBe(false);
    });
  });

  describe("showStateBadge", () => {
    test("should return true if locked but not close to expiry", () => {
      expect(showStateBadge(VALUABLE_STATES.LOCKED, 100)).toBe(true);
    });

    test("should return true if not locked but close to expiry", () => {
      expect(showStateBadge(VALUABLE_STATES.FRESH, 10)).toBe(true);
    });

    test("should return false if not locked and not close to expiry", () => {
      expect(showStateBadge(VALUABLE_STATES.FRESH, 100)).toBe(false);
    });
  });

  describe("getValuablesByState", () => {
    test("should filter based on state provided", () => {
      const valuables = [
        {
          valuableState: VALUABLE_STATES.LOCKED,
        },
        {
          valuableState: VALUABLE_STATES.FRESH,
        },
        {
          valuableState: VALUABLE_STATES.FRESH,
        },
      ];
      expect(
        getValuablesByState(VALUABLE_STATES.LOCKED)(valuables)
      ).toHaveLength(1);
      expect(
        getValuablesByState(VALUABLE_STATES.FRESH)(valuables)
      ).toHaveLength(2);
    });
  });
});

const getExpectedActionValue = (
  text = "",
  isDepositBonusSelected = false,
  url = ""
): ValuableActionProps => ({
  text,
  isDepositBonusSelected,
  url,
});

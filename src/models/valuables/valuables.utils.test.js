// @flow
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
  VALUABLE_SPIN_TYPES,
  VALUABLE_LOCKED_URL,
  VALUABLE_DEPOSIT_URL,
} from "Models/valuables";
import {
  getValuableDetailsAction,
  depositUrl,
  gameBrowserUrl,
  durationToTranslationKey,
  coinValueToSpinType,
  getCardUrl,
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

  test("should return deposit url and deposit translations when type is DEPOSIT un/locked", () => {
    const expectedValue = getExpectedActionValue(
      translations.depositToUnlockLabel,
      depositUrl
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return gamebrowser url and play now translation when type is CASH unclocked", () => {
    valuableType = VALUABLE_TYPES.CASH;

    const expectedValue = getExpectedActionValue(
      translations.playNowLabel,
      gameBrowserUrl
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return gamebrowser url and play now translation when type is SPINS unclocked", () => {
    valuableType = VALUABLE_TYPES.SPINS;

    const expectedValue = getExpectedActionValue(translations.playNowLabel, "");
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return deposit url and depositToUnlock label when CASH, locked with deposit req.", () => {
    valuableType = VALUABLE_TYPES.CASH;
    valuableState = VALUABLE_STATES.LOCKED;
    requirementType = VALUABLE_REQUIREMENT_TYPES.DEPOSIT;

    const expectedValue = getExpectedActionValue(
      translations.depositToUnlockLabel,
      depositUrl
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
      gameBrowserUrl
    );
    const actualValue = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    expect(actualValue).toEqual(expectedValue);
  });

  test("should return deposit url and depositToUnlock label when SPINS, locked with deposit req.", () => {
    valuableType = VALUABLE_TYPES.SPINS;
    valuableState = VALUABLE_STATES.LOCKED;
    requirementType = VALUABLE_REQUIREMENT_TYPES.DEPOSIT;

    const expectedValue = getExpectedActionValue(
      translations.depositToUnlockLabel,
      depositUrl
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
      gameBrowserUrl
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

  test("should return null when state is not locked and type is spins", () => {
    expect(getCardUrl(VALUABLE_STATES.FRESH, VALUABLE_TYPES.SPINS)).toEqual(
      null
    );
  });
});

const getExpectedActionValue = (text, url) => ({
  text,
  url,
});
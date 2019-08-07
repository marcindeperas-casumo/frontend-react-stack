import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
} from "Models/valuables";
import {
  getValuableDetailsAction,
  depositUrl,
  gameBrowserUrl,
  durationToTranslationKey,
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
});

const getExpectedActionValue = (text, url) => ({
  text,
  url,
});

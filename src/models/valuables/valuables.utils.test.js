import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
} from "Models/valuables";
import {
  getValuableDetailsAction,
  depositUrl,
  gameBrowserUrl,
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
    const expectedValue = getExpectedValue(
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

    const expectedValue = getExpectedValue(
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

    const expectedValue = getExpectedValue(translations.playNowLabel, "");
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

    const expectedValue = getExpectedValue(
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

    const expectedValue = getExpectedValue(
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

    const expectedValue = getExpectedValue(
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

    const expectedValue = getExpectedValue(
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
});

const getExpectedValue = (text, url) => ({
  text,
  url,
});

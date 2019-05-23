import { VALUABLE_SPIN_TYPES } from "Models/valuables";
import { CoinValueToSpinType } from "./ValuableCard.utils";

describe("ValuableCard.utils", () => {
  test("should return BASIC spinType when coinValue < 0.3", () => {
    const coinValue = 0.2;
    const expectedValue = VALUABLE_SPIN_TYPES.BASIC_SPINS;

    expect(CoinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return BONUS spinType when 0.3 < coinValue <= 0.9", () => {
    const coinValue = 0.5;
    const expectedValue = VALUABLE_SPIN_TYPES.BONUS;

    expect(CoinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return SUPER spinType when 0.9 < coinValue <= 3", () => {
    const coinValue = 2;
    const expectedValue = VALUABLE_SPIN_TYPES.SUPER;

    expect(CoinValueToSpinType(coinValue)).toBe(expectedValue);
  });

  test("should return MEGA spinType coinValue > 3", () => {
    const coinValue = 4;
    const expectedValue = VALUABLE_SPIN_TYPES.MEGA;

    expect(CoinValueToSpinType(coinValue)).toBe(expectedValue);
  });
});

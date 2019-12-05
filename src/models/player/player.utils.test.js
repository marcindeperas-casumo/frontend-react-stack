import { balanceAmountDisplay, balanceBonusDisplay } from "Models/player";

describe("Models/player/utils", () => {
  describe("balanceAmountDisplay", () => {
    test("Propper data", () => {
      expect(balanceAmountDisplay(123.456, "EUR", "de-DE")).toEqual("€ 123.46");
    });

    test("Returning empty string if NaN", () => {
      expect(balanceAmountDisplay("1233.456HWDP")).toEqual("");
    });

    test("Returning DKK", () => {
      expect(balanceAmountDisplay(12345.6789, "DKK", "da-DK")).toEqual(
        "DKK 12,345.68"
      );
    });
  });

  describe("balanceBonusDisplay", () => {
    test("Propper data", () => {
      expect(balanceBonusDisplay(1233.456, "EUR", "Bonus")).toEqual(
        "+€ 1,233.46 Bonus"
      );
    });

    test("Return no value", () => {
      expect(balanceBonusDisplay(undefined, "EUR", "Bonus")).toEqual(undefined);
    });
  });
});

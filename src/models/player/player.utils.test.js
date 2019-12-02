import { balanceAmountDisplay, balanceBonusDisplay } from "Models/player";

describe("Models/player/utils", () => {
  describe("balanceAmountDisplay", () => {
    test("Propper data", () => {
      expect(balanceAmountDisplay(123.456, "EUR")).toEqual("€123.46");
    });

    test("Defaulting to EUR if unknown currency", () => {
      expect(balanceAmountDisplay(123.456, "XXX")).toEqual("€123.46");
    });

    test("Defaulting to EUR if no 2nd param", () => {
      expect(balanceAmountDisplay(1233.456)).toEqual("€1,233.46");
    });

    test("Returning empty string if NaN", () => {
      expect(balanceAmountDisplay("1233.456HWDP")).toEqual("");
    });

    test("Returning no decimals for YEN", () => {
      expect(balanceAmountDisplay(12345.6789, "JPY")).toEqual("¥12,346");
    });

    test("Returning kr. at end", () => {
      expect(balanceAmountDisplay(12345.6789, "DKK")).toEqual("12,345.68 kr.");
    });
  });

  describe("balanceBonusDisplay", () => {
    test("Propper data", () => {
      expect(balanceBonusDisplay(1233.456, "EUR", "Bonus")).toEqual(
        "+€1,233.46 Bonus"
      );
    });

    test("Return no value", () => {
      expect(balanceBonusDisplay(undefined, "EUR", "Bonus")).toEqual(undefined);
    });
  });
});

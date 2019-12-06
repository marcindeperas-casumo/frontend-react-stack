import { balanceBonusDisplay } from "Models/player";

describe("Models/player/utils", () => {
  describe("balanceBonusDisplay", () => {
    test("Propper data", () => {
      expect(balanceBonusDisplay(1233.456, "EUR", "Bonus")).toEqual(
        "+€1,233.46 Bonus"
      );
    });

    test("Return 0 bonus", () => {
      expect(balanceBonusDisplay(undefined, "EUR", "Bonus")).toEqual(
        "+€0 Bonus"
      );
    });
  });
});

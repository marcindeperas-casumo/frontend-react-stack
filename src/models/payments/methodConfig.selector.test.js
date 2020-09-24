import { methodConfigSelector } from "Models/payments";
import defaultState from "Models/__mocks__/state.mock";

describe("CMS Selectors", () => {
  describe("getMethodConfig()", () => {
    test("returns the method config from state", () => {
      const visa = "VISA_CARD";
      const visa_config = defaultState.paymentMethodConfigs[visa];

      expect(methodConfigSelector("VISA_CARD")(defaultState)).toEqual(
        visa_config
      );
    });
  });
});

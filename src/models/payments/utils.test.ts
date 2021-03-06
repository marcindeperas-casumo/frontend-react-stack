import { extractErrorKeys } from "./utils";
import { piqErrorResponse } from "./__mocks__/piqResponseMocks";

describe("Payments utils", () => {
  describe("extractErrorKeys", () => {
    test("it should extract properly all error keys from piq error response", () => {
      const expectedValues = [
        "optional_key",
        "error_0_1",
        "error_0_2",
        "error_1_1",
        "error_1_2",
      ];

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ txState: string; errors: ({ fi... Remove this comment to see the full error message
      expect(extractErrorKeys(piqErrorResponse)).toEqual(expectedValues);
    });
  });
});

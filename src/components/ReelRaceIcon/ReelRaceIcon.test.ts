// @flow
import { getNextView } from "./ReelRaceIcon";

describe("ReelRaceIcon", () => {
  describe("getNextView", () => {
    test("1 view - get next view after initial - the same", () => {
      expect(getNextView(0, 1)).toEqual(0);
    });
    test("2 views - get next view after initial", () => {
      expect(getNextView(0, 2)).toEqual(1);
    });
    test("2 views - get next view afer the last one", () => {
      expect(getNextView(1, 2)).toEqual(1);
    });
    test("3 views - get next view after initial", () => {
      expect(getNextView(0, 3)).toEqual(1);
    });
    test("3 views - get next view after the second one", () => {
      expect(getNextView(1, 3)).toEqual(2);
    });
    test("3 views - get next view after the last one", () => {
      expect(getNextView(2, 3)).toEqual(1);
    });
  });
});

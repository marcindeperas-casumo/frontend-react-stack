// @flow

import { getPrice } from "./ReelRaceLeaderboardResults";

describe("ReelRaceLeaderboardResults", () => {
  describe("getPrice", () => {
    const prices = ["1", "2", "3"];
    test("no price", () => {
      expect(getPrice(4, prices)).toBeNull();
    });
    test("first price", () => {
      expect(getPrice(1, prices)).toEqual(prices[0]);
    });
    test("second price", () => {
      expect(getPrice(2, prices)).toEqual(prices[1]);
    });
    test("third price", () => {
      expect(getPrice(3, prices)).toEqual(prices[2]);
    });
  });
});

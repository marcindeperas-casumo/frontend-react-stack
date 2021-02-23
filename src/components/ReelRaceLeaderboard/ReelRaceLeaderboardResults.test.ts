// @flow

import { getPrize } from "./ReelRaceLeaderboardResults";

describe("ReelRaceLeaderboardResults", () => {
  describe("getPrize", () => {
    const prizes = ["1", "2", "3"];
    test("no prize", () => {
      expect(getPrize(4, prizes)).toBeNull();
    });
    test("first prize", () => {
      expect(getPrize(1, prizes)).toEqual(prizes[0]);
    });
    test("second prize", () => {
      expect(getPrize(2, prizes)).toEqual(prizes[1]);
    });
    test("third prize", () => {
      expect(getPrize(3, prizes)).toEqual(prizes[2]);
    });
  });
});

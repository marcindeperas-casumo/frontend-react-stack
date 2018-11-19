import {
  jackpotEntitySelector,
  jackpotSelectorFactory,
} from "./jackpots.selectors";

describe("Models/Jackpots/Selectors", () => {
  const state = {
    schema: {
      jackpot: {
        one: { gameId: "one" },
        two: { gameId: "two" },
        three: { gameId: "three" },
        four: { gameId: "four" },
      },
      game: {
        one: { gameId: "one" },
        two: { gameId: "two" },
        three: { gameId: "three" },
      },
    },
  };

  describe(".jackpotEntitySelector()", () => {
    test("selects the jackpots from the state", async () => {
      expect(jackpotEntitySelector(state)).toEqual(state.schema.jackpot);
    });

    test("returns an empty array if there are no jackpots yet", () => {
      expect(jackpotEntitySelector({})).toEqual({});
    });
  });

  describe(".jackpotSelector()", () => {
    test("returns a jackpot object by its id", () => {
      const id = "one";
      const jackpot = jackpotSelectorFactory(id)(state);
      const expectedJackpot = state.schema.jackpot[id];

      expect(jackpot).toEqual(expectedJackpot);
    });

    test("returns 'null' if jackpot doesn not exist", () => {
      const id = "one";
      const jackpot = jackpotSelectorFactory(id)({});

      expect(jackpot).toEqual(null);
    });
  });
});

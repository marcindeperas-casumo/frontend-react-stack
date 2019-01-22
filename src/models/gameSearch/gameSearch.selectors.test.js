import {
  playerGamesAllSelector,
  isGameSearchLoadedFactory,
} from "Models/gameSearch";

describe("Models/GameSearch/Selectors", () => {
  describe("playerGamesAllSelector()", () => {
    test("returns gameList playerGamesAll", () => {
      const games = ["foo"];
      const gameList = {
        playerGamesAll: {
          id: "playerGamesAll",
          games,
        },
      };
      const state = { schema: { gameList } };

      expect(playerGamesAllSelector(state)).toEqual(games);
    });

    test("returns empty array if not in state", () => {
      const state = {};

      expect(playerGamesAllSelector(state)).toEqual([]);
    });
  });

  describe("isGameSearchLoadedFactory()", () => {
    test("returns true if playerGamesAll gameList is in state", () => {
      const games = ["foo"];
      const gameList = {
        playerGamesAll: {
          id: "playerGamesAll",
          games,
        },
      };
      const state = { schema: { gameList } };

      expect(isGameSearchLoadedFactory(state)).toBe(true);
    });

    test("returns false if playerGamesAll gameList is not in state", () => {
      const state = { schema: { gameList: {} } };

      expect(isGameSearchLoadedFactory(state)).toBe(false);
    });
  });
});

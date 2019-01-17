import {
  gameSearchSelector,
  isGameSearchLoadedFactory,
} from "Models/gameSearch";

describe("CMS Selectors", () => {
  describe("gameSearchSelector()", () => {
    test("returns gameList allGames", () => {
      const games = ["foo"];
      const gameList = {
        allGames: {
          id: "allGames",
          games,
        },
      };
      const state = { schema: { gameList } };

      expect(gameSearchSelector(state)).toEqual(games);
    });

    test("returns empty array if not in state", () => {
      const state = {};

      expect(gameSearchSelector(state)).toEqual([]);
    });
  });

  describe("isGameSearchLoadedFactory()", () => {
    test("returns true if allGames gameList is in state", () => {
      const games = ["foo"];
      const gameList = {
        allGames: {
          id: "allGames",
          games,
        },
      };
      const state = { schema: { gameList } };

      expect(isGameSearchLoadedFactory(state)).toBe(true);
    });

    test("returns false if allGames gameList is not in state", () => {
      const state = { schema: { gameList: {} } };

      expect(isGameSearchLoadedFactory(state)).toBe(false);
    });
  });
});

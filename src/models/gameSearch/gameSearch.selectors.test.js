import {
  playerGamesAllSelector,
  isGameSearchLoadedFactory,
  PLAYER_ALL_GAMES_LIST_ID,
} from "Models/gameSearch";

describe("Models/GameSearch/Selectors", () => {
  const id = PLAYER_ALL_GAMES_LIST_ID;

  describe("playerGamesAllSelector()", () => {
    test("returns gameList", () => {
      const games = ["foo"];
      const gameList = {
        [id]: {
          id,
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
    test("returns true if gameList is in state", () => {
      const games = ["foo"];
      const gameList = {
        [id]: {
          id,
          games,
        },
      };
      const state = { schema: { gameList } };

      expect(isGameSearchLoadedFactory(state)).toBe(true);
    });

    test("returns false if gameList is not in state", () => {
      const state = { schema: { gameList: {} } };

      expect(isGameSearchLoadedFactory(state)).toBe(false);
    });
  });
});

import {
  playerGamesAllSelector,
  isGameSearchLoading,
  isGameSearchNoMatch,
  isGameSearchLoadedFactory,
  gameSearchResultsSelector,
  PLAYER_ALL_GAMES_LIST_ID,
  gameSearchEntities,
} from "Models/gameSearch";
import { ENTITY_KEYS } from "Models/schema";

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
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesAllSelector(state)).toEqual(games);
    });

    test("returns empty array if not in state", () => {
      const state = {};

      expect(playerGamesAllSelector(state)).toEqual([]);
    });
  });

  describe("isGameSearchLoading()", () => {
    test("returns true if gameList is in state", () => {
      const state = {
        schema: {
          [ENTITY_KEYS.GAME_LIST]: {
            gameSearch: {
              loading: true,
            }
          }
        }
      };

      expect(isGameSearchLoading(state)).toBe(true);
    });

    test("returns false if gameList is not in state", () => {
      const state = {
        schema: {
          [ENTITY_KEYS.GAME_LIST]: {
            gameSearch: {
              loading: false,
            }
          }
        }
      };

      expect(isGameSearchLoading(state)).toBe(false);
    });
  });

  describe("isGameSearchNoMatch()", () => {
    test("returns true if gameList is in state", () => {
      const state = {
        schema: {
          [ENTITY_KEYS.GAME_LIST]: {
            gameSearch: {
              noMatch: true,
            }
          }
        }
      };

      expect(isGameSearchNoMatch(state)).toBe(true);
    });

    test("returns false if gameList is not in state", () => {
      const state = {
        schema: {
          [ENTITY_KEYS.GAME_LIST]: {
            gameSearch: {
              noMatch: false,
            }
          }
        }
      };

      expect(isGameSearchNoMatch(state)).toBe(false);
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
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isGameSearchLoadedFactory(state)).toBe(true);
    });

    test("returns false if gameList is not in state", () => {
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: {} } };

      expect(isGameSearchLoadedFactory(state)).toBe(false);
    });
  });

  describe("gameSearchResultsSelector()", () => {
    test("returns gameList", () => {
      const state = {
        schema: {
          [ENTITY_KEYS.GAME_LIST]: {
            gameSearch: {
              games: ["foo"],
            }
          }
        }
      };

      expect(gameSearchResultsSelector(state)).toEqual(["foo"]);
    });

    test("returns empty gameList is not in state", () => {
      const state = {
        schema: {
          [ENTITY_KEYS.GAME_LIST]: {
            gameSearch: {
              games: [],
            }
          }
        }
      };

      expect(gameSearchResultsSelector(state)).toEqual([]);
    });
  });
});

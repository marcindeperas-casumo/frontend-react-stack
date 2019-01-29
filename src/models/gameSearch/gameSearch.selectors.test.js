import {
  playerGamesAll,
  isGameSearchLoading,
  isGameSearchNoMatch,
  isGameSearchLoaded,
  gameSearchResults,
  hasNoLatestPlayed,
  listTypes,
  gameSearchQuery,
} from "Models/gameSearch";
import { ENTITY_KEYS } from "Models/schema";

describe("Models/GameSearch/Selectors", () => {
  describe("playerGamesAll()", () => {
    test("returns gameList", () => {
      const games = ["foo"];
      const gameList = { [listTypes.PLAYER_GAMES_ID]: { games } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesAll(state)).toEqual(games);
    });

    test("returns empty array if not in state", () => {
      const state = {};

      expect(playerGamesAll(state)).toEqual([]);
    });
  });

  describe("hasNoLatestPlayed()", () => {
    test("returns false if hasNoLatestPlayed is set to false", () => {
      const gameList = {
        [listTypes.GAME_SEARCH_ID]: {
          hasNoLatestPlayed: false,
        },
      };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(hasNoLatestPlayed(state)).toEqual(false);
    });

    test("returns true if hasNoLatestPlayed", () => {
      const gameList = {
        [listTypes.GAME_SEARCH_ID]: {
          hasNoLatestPlayed: true,
        },
      };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(hasNoLatestPlayed(state)).toEqual(true);
    });
  });

  describe("isGameSearchLoading()", () => {
    test("returns true if in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { loading: true } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isGameSearchLoading(state)).toBe(true);
    });

    test("returns false if gameList not in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { loading: false } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isGameSearchLoading(state)).toBe(false);
    });
  });

  describe("isGameSearchNoMatch()", () => {
    test("returns true if the list is in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { noMatch: true } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isGameSearchNoMatch(state)).toBe(true);
    });

    test("returns false if list is not in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { noMatch: false } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isGameSearchNoMatch(state)).toBe(false);
    });
  });

  describe("isGameSearchLoaded()", () => {
    test("returns true if list is in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isGameSearchLoaded(state)).toBe(true);
    });

    test("returns false if list not in state", () => {
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: {} } };

      expect(isGameSearchLoaded(state)).toBe(false);
    });
  });

  describe("gameSearchResults()", () => {
    test("returns gameList", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchResults(state)).toEqual(["foo"]);
    });

    test("returns empty gameList is not in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { games: [] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchResults(state)).toEqual([]);
    });
  });

  describe("gameSearchQuery()", () => {
    test("returns search query", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: { query: "foo" } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchQuery(state)).toEqual("foo");
    });

    test("returns empty gameList is not in state", () => {
      const gameList = { [listTypes.GAME_SEARCH_ID]: {} };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchQuery(state)).toEqual("");
    });
  });
});

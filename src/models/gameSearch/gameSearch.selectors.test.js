import {
  gameSearch,
  playerGamesSelector,
  isLoadingSelector,
  hasNoResultsSelector,
  isPlayerGamesLoaded,
  gameSearchResults,
  hasNoLatestPlayedSelector,
  listTypes,
} from "Models/gameSearch";
import { ENTITY_KEYS } from "Models/schema";

describe("Models/GameSearch/Selectors", () => {
  test("gameSearch", () => {
    const state = {
      gameSearch: { foo: "bar" },
    };

    expect(gameSearch(state)).toEqual({ foo: "bar" });
  });

  test("isLoadingSelector", () => {
    const state = {
      gameSearch: {
        loading: true,
      },
    };

    expect(isLoadingSelector(state)).toBe(true);
  });

  test("hasNoResultsSelector", () => {
    const state = {
      gameSearch: {
        hasNoResults: true,
      },
    };

    expect(hasNoResultsSelector(state)).toBe(true);
  });

  test("hasNoLatestPlayedSelector", () => {
    const state = {
      gameSearch: {
        hasNoLatestPlayed: true,
      },
    };

    expect(hasNoLatestPlayedSelector(state)).toBe(true);
  });

  describe("playerGamesSelector()", () => {
    test("returns gameList", () => {
      const games = ["foo"];
      const gameList = { [listTypes.PLAYER_GAMES]: { games } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesSelector(state)).toEqual(games);
    });

    test("returns empty array if not in state", () => {
      const state = {};

      expect(playerGamesSelector(state)).toEqual([]);
    });
  });

  describe("isPlayerGamesLoaded()", () => {
    test("returns true if list is in state", () => {
      const gameList = { [listTypes.PLAYER_GAMES]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isPlayerGamesLoaded(state)).toBe(true);
    });

    test("returns false if list not in state", () => {
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: {} } };

      expect(isPlayerGamesLoaded(state)).toBe(false);
    });
  });

  describe("gameSearchResults()", () => {
    test("returns gameList", () => {
      const gameList = { [listTypes.GAME_SEARCH]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchResults(state)).toEqual(["foo"]);
    });

    test("returns empty gameList is not in state", () => {
      const gameList = { [listTypes.GAME_SEARCH]: { games: [] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchResults(state)).toEqual([]);
    });
  });
});

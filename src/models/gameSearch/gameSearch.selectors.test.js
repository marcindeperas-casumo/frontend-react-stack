import {
  gameSearch,
  isLoadingSelector,
  hasNoResultsSelector,
  gameSearchResults,
  hasNoLatestPlayedSelector,
  gameSearchQuerySelector,
} from "Models/gameSearch";
import { ENTITY_KEYS } from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";

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

  describe("gameSearchResults", () => {
    test("returns gameList", () => {
      const gameList = { [GAME_LIST_IDS.GAME_SEARCH]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchResults(state)).toEqual(["foo"]);
    });

    test("returns empty gameList is not in state", () => {
      const gameList = { [GAME_LIST_IDS.GAME_SEARCH]: { games: [] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchResults(state)).toEqual([]);
    });
  });

  describe("gameSearchQuerySelector", () => {
    test("returns search query", () => {
      const state = {
        gameSearch: {
          query: "whatever",
        },
      };

      expect(gameSearchQuerySelector(state)).toBe("whatever");
    });
  });
});

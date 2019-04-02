import {
  gameSearch,
  isLoadingSelector,
  gameSearchResults,
  suggestedGames,
  gameSearchQuerySelector,
  gameSearchSuggestedList,
  searchNotFoundContent,
  isSuggestedLoadingSelector,
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

  test("isSuggestedLoadingSelector", () => {
    const state = {
      gameSearch: {
        loadingSuggested: true,
      },
    };

    expect(isSuggestedLoadingSelector(state)).toBe(true);
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

  describe("suggestedGamesSelector", () => {
    test("returns suggested games list", () => {
      const gameList = { [GAME_LIST_IDS.SUGGESTED_GAMES]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(suggestedGames(state)).toEqual(["foo"]);
    });
  });

  describe("gameSearchSuggestedList", () => {
    test("returns suggestedGames if gameSearchResults exists, its length is 1 and suggested games length > 0", () => {
      const gameList = {
        [GAME_LIST_IDS.SUGGESTED_GAMES]: { games: ["foo"] },
        [GAME_LIST_IDS.GAME_SEARCH]: { games: ["foo"] },
      };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchSuggestedList(state)).toEqual({
        games: ["foo"],
        title: "You might also like",
        location: "suggestedGames",
      });
    });

    test("returns latestPlayed gameList if gameSearchResults exists, its length is 1 but suggested games length === 0", () => {
      const gameList = {
        [GAME_LIST_IDS.GAME_SEARCH]: { games: ["foo"] },
        [GAME_LIST_IDS.LATEST_PLAYED]: { games: ["foo"] },
      };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchSuggestedList(state)).toEqual({
        games: ["foo"],
        title: "Continue Playing",
        location: "latestPlayedGames",
      });
    });

    test("returns latestPlayed gameList if in state and gameSearchResults is not existing or greater than 1", () => {
      const gameList = { [GAME_LIST_IDS.LATEST_PLAYED]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchSuggestedList(state)).toEqual({
        games: ["foo"],
        title: "Continue Playing",
        location: "latestPlayedGames",
      });
    });

    test("returns popularGames gameList if latestPlayed not in state and gameSearchResults is not existing or greater than 1", () => {
      const gameList = { [GAME_LIST_IDS.POPULAR_GAMES]: { games: ["bar"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(gameSearchSuggestedList(state)).toEqual({
        games: ["bar"],
        title: "Popular Games",
        location: "popularGames",
      });
    });
  });

  describe("searchNotFoundContent", () => {
    test("returns contentContinuePlaying gameList if latestPlayed exists and contains games", () => {
      const gameList = { [GAME_LIST_IDS.LATEST_PLAYED]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(searchNotFoundContent(state)).toEqual(
        "Find another game or continue playing your last played games"
      );
    });

    test("returns contentPopular if latestPlayed not in state", () => {
      const state = {};

      expect(searchNotFoundContent(state)).toEqual(
        "Find another game or try something popular"
      );
    });

    test("returns contentPopular if latestPlayed is in state but empty", () => {
      const gameList = { [GAME_LIST_IDS.LATEST_PLAYED]: { games: [] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(searchNotFoundContent(state)).toEqual(
        "Find another game or try something popular"
      );
    });
  });
});

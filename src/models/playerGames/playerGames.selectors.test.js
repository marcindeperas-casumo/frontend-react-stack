import {
  playerGamesLetterTitlesCountSelector,
  playerGamesLetterTitlesSelector,
  isPlayerGamesPageLoaded,
  playerGamesCountSelector,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";
import { ENTITY_KEYS } from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/PlayerGames/Selectors", () => {
  describe("playerGamesLetterTitlesSelector()", () => {
    test("returns gameList", () => {
      const games = ["foo"];
      const gameList = { [GAME_LIST_IDS.PLAYER_GAMES]: { games } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesLetterTitlesSelector(state)).toEqual([
        { sectionTitle: "F" },
        { game: "foo" },
      ]);
    });

    test("returns empty array if not in state", () => {
      const gameList = {};
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesLetterTitlesSelector(state)).toEqual([]);
    });
  });

  describe("isPlayerGamesPageLoaded()", () => {
    test("returns true if list is in state", () => {
      const gameList = { [getPlayerGamesListIdByPage(0)]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isPlayerGamesPageLoaded(0)(state)).toBe(true);
    });

    test("returns false if list not in state", () => {
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: {} } };

      expect(isPlayerGamesPageLoaded()(state)).toBe(false);
    });
  });

  describe("playerGamesCountSelector()", () => {
    test("should return games count", () => {
      const state = { [ENTITY_KEYS.PLAYER_GAMES]: { count: 123 } };

      expect(playerGamesCountSelector(state)).toBe(123);
    });
  });

  describe("playerGamesLetterTitlesCountSelector()", () => {
    test("should return games count plus 26 alphabet letters", () => {
      const games = ["foo", "bar"];
      const gameList = { [getPlayerGamesListIdByPage(0)]: { games } };
      const state = {
        [ENTITY_KEYS.PLAYER_GAMES]: { count: 2 },
        schema: {
          [ENTITY_KEYS.GAME_LIST]: gameList,
        },
      };

      expect(playerGamesLetterTitlesCountSelector(state)).toBe(4);
    });
  });
});

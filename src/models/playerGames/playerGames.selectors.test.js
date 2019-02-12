import {
  playerGamesSelector,
  isPlayerGamesPageLoaded,
} from "Models/playerGames";
import { ENTITY_KEYS } from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/PlayerGames/Selectors", () => {
  describe("playerGamesSelector()", () => {
    test("returns gameList", () => {
      const games = ["foo"];
      const gameList = { [GAME_LIST_IDS.PLAYER_GAMES]: { games } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesSelector(state)).toEqual(games);
    });

    test("returns empty array if not in state", () => {
      const gameList = {};
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(playerGamesSelector(state)).toEqual([]);
    });
  });

  describe("isPlayerGamesPageLoaded()", () => {
    test("returns true if list is in state", () => {
      const gameList = { [GAME_LIST_IDS.PLAYER_GAMES]: { games: ["foo"] } };
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: gameList } };

      expect(isPlayerGamesPageLoaded(0)(state)).toBe(true);
    });

    test("returns false if list not in state", () => {
      const state = { schema: { [ENTITY_KEYS.GAME_LIST]: {} } };

      expect(isPlayerGamesPageLoaded()(state)).toBe(false);
    });
  });
});

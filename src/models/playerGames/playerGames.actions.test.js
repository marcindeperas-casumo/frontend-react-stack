import { types as fetchTypes } from "Models/fetch";
import {
  preloadFetchPlayerGames,
  fetchPlayerGames,
  types,
  fetchPlayerGamesCount,
  getFetchCompleteTypeByPage,
} from "Models/playerGames";

describe("Models/PlayerGames/Actions", () => {
  describe("fetchPlayerGames()", () => {
    const page = 0;
    const pageSize = 100;
    const sessionId = "123";
    const action = fetchPlayerGames({ page, pageSize, sessionId });

    test("init fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.PLAYER_GAMES_FETCH_START,
      });
    });

    test("fires completed action when finished", () => {
      expect(action).toMatchObject({
        postFetch: getFetchCompleteTypeByPage(0),
      });
    });

    test("passes the fetch function to the action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });
  });

  describe("fetchPlayerGamesCount()", () => {
    const sessionId = "123";
    const action = fetchPlayerGamesCount({ sessionId });

    test("init fetch", () => {
      expect(action).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.PLAYER_GAMES_FETCH_COUNT_START,
      });
    });

    test("fires completed action when finished", () => {
      expect(action).toMatchObject({
        postFetch: types.PLAYER_GAMES_FETCH_COUNT_COMPLETE,
      });
    });

    test("passes the fetch function to the action", () => {
      expect(typeof action.asyncCall).toBe("function");
    });
  });

  describe("preloadFetchPlayerGames()", () => {
    const startIndex = 0;
    const pageSize = 100;
    const action = preloadFetchPlayerGames({ startIndex, pageSize });

    test("returns an action with the correct type", () => {
      expect(action).toEqual({
        startIndex: 0,
        pageSize: 100,
        type: types.PLAYER_GAMES_FETCH,
      });
    });
  });
});
